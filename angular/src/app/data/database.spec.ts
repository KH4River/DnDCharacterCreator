import { DatabaseSync, type SQLInputValue } from 'node:sqlite';

import type { DatabasePort } from '@/db/DatabasePort';
import { runMigrations } from '@/db/migrate';
import { MIGRATIONS } from '@/db/migrations.generated';
import { listAbilities } from '@/db/repositories/abilities';

class NodeSqlitePort implements DatabasePort {
  private readonly db = new DatabaseSync(':memory:');
  private readonly bind = (params: readonly unknown[]) => params as unknown as SQLInputValue[];

  async open(): Promise<void> {
    // Per connection. The runner repeats it before the first transaction,
    // which is the point where SQLite will still honour it.
    this.db.exec('PRAGMA foreign_keys = ON');
  }
  async exec(sql: string): Promise<void> {
    this.db.exec(sql);
  }
  async run(sql: string, params: readonly unknown[] = []): Promise<void> {
    this.db.prepare(sql).run(...this.bind(params));
  }
  async all<T>(sql: string, params: readonly unknown[] = []): Promise<T[]> {
    return this.db.prepare(sql).all(...this.bind(params)) as T[];
  }
  async get<T>(sql: string, params: readonly unknown[] = []): Promise<T | undefined> {
    return this.db.prepare(sql).get(...this.bind(params)) as T | undefined;
  }
  async close(): Promise<void> {
    this.db.close();
  }
}

describe('database bridge', () => {
  let port: NodeSqlitePort;

  beforeEach(async () => {
    port = new NodeSqlitePort();
    await port.open();
    await runMigrations(port, MIGRATIONS);
  });

  afterEach(async () => {
    await port.close();
  });

  it('enables foreign keys: SQLite ignores every FK without the pragma', async () => {
    const row = await port.get<{ foreign_keys: number }>('PRAGMA foreign_keys');
    expect(row?.foreign_keys).toBe(1);
  });

  it('records the applied schema version in user_version', async () => {
    const row = await port.get<{ user_version: number }>('PRAGMA user_version');
    expect(row?.user_version).toBe(1);
  });

  it('is idempotent: a second migration run changes nothing', async () => {
    await runMigrations(port, MIGRATIONS);
    const row = await port.get<{ user_version: number }>('PRAGMA user_version');
    expect(row?.user_version).toBe(1);
    expect(await listAbilities(port)).toHaveLength(6);
  });

  it('reads the six seeded abilities through the port', async () => {
    const abilities = await listAbilities(port);
    expect(abilities.map((a) => a.code)).toEqual(['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA']);
    expect(abilities[0].name).toBe('Strength');
  });

  it('enforces foreign keys at DML time (dangling species rejected)', async () => {
    const uuid = 'a'.repeat(8) + '-1111-1111-1111-' + 'a'.repeat(12);
    await expect(
      port.run(
        `INSERT INTO player_character (uuid, name, species_id, background_id, hp_max, hp_current)
         VALUES (?, 'Orphan', 999, 999, 1, 1)`,
        [uuid],
      ),
    ).rejects.toThrow();
  });
});

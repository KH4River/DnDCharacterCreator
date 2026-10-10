import { Capacitor } from '@capacitor/core';
import { CapacitorSQLite, SQLiteConnection, type SQLiteDBConnection } from '@capacitor-community/sqlite';

import type { DatabasePort } from '@/db/DatabasePort';

const DATABASE = 'dnd';
const READ_ONLY = false;

/**
 * Mobile and web adapter: the Capacitor SQLite plugin. Native platforms run
 * device SQLite; the web build runs jeep-sqlite (sql.js over IndexedDB).
 *
 * open() is idempotent. The service imports this module lazily so neither the
 * plugin nor its web dependency reaches the initial bundle.
 */
export class CapacitorSqliteDriver implements DatabasePort {
  private readonly sqlite = new SQLiteConnection(CapacitorSQLite);
  private connection?: SQLiteDBConnection;

  async open(): Promise<void> {
    if (this.connection) {
      return;
    }

    if (Capacitor.getPlatform() === 'web') {
      await this.initWebStore();
    }

    const consistent = (await this.sqlite.checkConnectionsConsistency()).result ?? false;
    const exists = (await this.sqlite.isConnection(DATABASE, READ_ONLY)).result ?? false;
    this.connection =
      consistent && exists
        ? await this.sqlite.retrieveConnection(DATABASE, READ_ONLY)
        : await this.sqlite.createConnection(DATABASE, false, 'no-encryption', 1, READ_ONLY);

    await this.connection.open();
    // Per connection. SQLite ignores every FOREIGN KEY without it. Pass
    // transaction=false because the plugin wraps execute() in its own
    // transaction by default, and the pragma is a NO-OP inside one.
    await this.connection.execute('PRAGMA foreign_keys = ON', false);
  }

  async exec(sql: string): Promise<void> {
    // transaction=false: the migration runner issues its own BEGIN/COMMIT
    // around each migration, and the plugin's implicit transaction around
    // execute() would collide with it.
    await this.requireConnection().execute(sql, false);
  }

  async run(sql: string, params: readonly unknown[] = []): Promise<void> {
    await this.requireConnection().run(sql, [...params]);
  }

  async all<T>(sql: string, params: readonly unknown[] = []): Promise<T[]> {
    const result = await this.requireConnection().query(sql, [...params]);
    return (result.values ?? []) as T[];
  }

  async get<T>(sql: string, params: readonly unknown[] = []): Promise<T | undefined> {
    const rows = await this.all<T>(sql, params);
    return rows[0];
  }

  async close(): Promise<void> {
    if (!this.connection) {
      return;
    }
    await this.sqlite.closeConnection(DATABASE, READ_ONLY);
    this.connection = undefined;
  }

  /**
   * The web build needs the jeep-sqlite custom element registered before the
   * plugin can open a connection, plus an explicit store so the database
   * survives a page reload.
   */
  private async initWebStore(): Promise<void> {
    const { defineCustomElements } = await import('jeep-sqlite/loader');
    defineCustomElements(window);
    if (!document.querySelector('jeep-sqlite')) {
      document.body.appendChild(document.createElement('jeep-sqlite'));
    }
    await customElements.whenDefined('jeep-sqlite');
    await this.sqlite.initWebStore();
  }

  private requireConnection(): SQLiteDBConnection {
    if (!this.connection) {
      throw new Error('database not open; call open() first');
    }
    return this.connection;
  }
}

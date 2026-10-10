import type { DatabasePort } from '@/db/DatabasePort';

/**
 * Desktop adapter: forwards to node:sqlite in the Electron main process over
 * IPC. The connection is owned by main and opens with the app, so open() and
 * close() are no-ops here.
 */
export class ElectronIpcDriver implements DatabasePort {
  constructor(private readonly db: ElectronDatabaseApi) {}

  async open(): Promise<void> {
    // main opens the connection when the app is ready
  }

  async exec(sql: string): Promise<void> {
    await this.db.exec(sql);
  }

  async run(sql: string, params: readonly unknown[] = []): Promise<void> {
    await this.db.run(sql, [...params]);
  }

  async all<T>(sql: string, params: readonly unknown[] = []): Promise<T[]> {
    return (await this.db.all(sql, [...params])) as T[];
  }

  async get<T>(sql: string, params: readonly unknown[] = []): Promise<T | undefined> {
    return (await this.db.get(sql, [...params])) as T | undefined;
  }

  async close(): Promise<void> {
    // the connection lives in main and closes with the app
  }
}

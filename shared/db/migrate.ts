import type { DatabasePort } from './DatabasePort';

/**
 * Applies each pending migration, in order, exactly once.
 *
 * `user_version` is the applied count: `migrations[i]` moves the database to
 * version `i + 1`, and each migration file sets that value itself with its
 * trailing `PRAGMA user_version = N`. tools/verify-migration.mjs asserts the
 * ordinal matches the file, so this count-based gate cannot silently drift.
 *
 * `foreign_keys` is set BEFORE the first transaction. The pragma is a no-op
 * inside one, which is exactly why it is not in the migration file itself.
 */
export async function runMigrations(
  port: DatabasePort,
  migrations: readonly string[],
): Promise<void> {
  await port.exec('PRAGMA foreign_keys = ON');

  const row = await port.get<{ user_version: number }>('PRAGMA user_version');
  const applied = row?.user_version ?? 0;
  if (applied >= migrations.length) {
    return;
  }

  for (let i = applied; i < migrations.length; i++) {
    await port.exec('BEGIN');
    try {
      await port.exec(migrations[i]);
      await port.exec('COMMIT');
    } catch (error) {
      await port.exec('ROLLBACK');
      throw error;
    }
  }
}

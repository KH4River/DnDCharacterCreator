import type { DatabasePort } from '../DatabasePort';

export interface Ability {
  id: number;
  code: 'STR' | 'DEX' | 'CON' | 'INT' | 'WIS' | 'CHA';
  name: string;
}

/**
 * The six ability scores. This is fixed vocabulary seeded by the migration, so
 * it is readable before any content pack is imported -- which makes it the
 * proof that the schema is open and migrated.
 */
export async function listAbilities(port: DatabasePort): Promise<Ability[]> {
  return port.all<Ability>('SELECT id, code, name FROM ability ORDER BY id');
}

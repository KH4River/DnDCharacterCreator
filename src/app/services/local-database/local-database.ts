import { Character } from '@/models/Character';
import { Injectable } from '@angular/core';
import { IDBPDatabase, openDB } from 'idb';

@Injectable({
  providedIn: 'root',
})
export class LocalDatabase {
  private DB_NAME = 'local-db';
  private DB_VERSION = 1;

  constructor() {
    (async () => {
      try {
        const db = await this._initializeDb();
        await this._addClasses(db);
        await this._addClassAbilities(db);
        await this._addCharacterFeats(db);
      } catch (err) {
        console.error('Error setting up database.', err);
      }
    })();
  }

  private _makeDefaultTable(db: IDBPDatabase, tableName: string) {
    if (!db.objectStoreNames.contains(tableName))
      db.createObjectStore(tableName, { keyPath: 'id', autoIncrement: true });
  }

  private async _initializeDb() {
    const db = await openDB(this.DB_NAME, this.DB_VERSION, {
      upgrade: (db) => {
        this._makeDefaultTable(db, 'characters');
        this._makeDefaultTable(db, 'classes');
        this._makeDefaultTable(db, 'abilities');
        this._makeDefaultTable(db, 'feats-abilities');
        this._makeDefaultTable(db, 'characters-feats');
        this._makeDefaultTable(db, 'characters-classes');
      },
    });

    return db;
  }

  private async _addClasses(db: IDBPDatabase) {
    let tx = db.transaction('classes', 'readwrite');

    const classes = [
      'Barbarian',
      'Bard',
      'Cleric',
      'Druid',
      'Fighter',
      'Monk',
      'Paladin',
      'Ranger',
      'Rogue',
      'Sorcerer',
      'Warlock',
      'Wizard',
    ];

    await Promise.all([...classes.map((name) => tx.store.add({ name })), tx.done]);
  }

  private async _addCharacterFeats(db: IDBPDatabase) {}
  private async _addClassAbilities(db: IDBPDatabase) {}

  private async _getDB() {
    return await openDB(this.DB_NAME, this.DB_VERSION);
  }

  async addNewCharacter(character: Character) {
    const db = await this._getDB();
    const { store } = db.transaction('characters', 'readwrite');
    await store.add(character);
  }

  async addNewCharacterLevelInClass(characterId: string, classId: string) {
    const db = await this._getDB();
    const { store } = db.transaction('characters', 'readwrite');
  }
}

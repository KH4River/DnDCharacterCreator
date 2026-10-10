import { Component, inject, signal } from '@angular/core';

import { DatabaseService } from '@/data/database.service';
import type { Ability } from '@/db/repositories/abilities';

/**
 * Proof that the database is wired end to end: reads the six seeded abilities
 * through the service, on whichever platform the app is running. It is also the
 * seed of the ability-score step.
 */
@Component({
  selector: 'app-character-creator-abilities',
  templateUrl: './character-creator-abilities.html',
  styleUrl: './character-creator-abilities.scss',
})
export class CharacterCreatorAbilities {
  private readonly database = inject(DatabaseService);

  readonly abilities = signal<Ability[]>([]);
  readonly error = signal<string | null>(null);

  constructor() {
    void this.load();
  }

  private async load(): Promise<void> {
    try {
      this.abilities.set(await this.database.abilities());
    } catch (cause) {
      this.error.set(cause instanceof Error ? cause.message : 'Database unavailable');
    }
  }
}

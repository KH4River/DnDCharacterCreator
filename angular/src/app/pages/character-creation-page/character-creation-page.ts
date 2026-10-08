import { Component, inject, signal } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';

import { CharacterCreatorRules } from '@/components/character-creator-rules/character-creator-rules';
import { CharacterCreatorSummary } from '@/components/character-creator-summary/character-creator-summary';
import { CharacterCreatorClassSelector } from '@/components/character-creator-class-selector/character-creator-class-selector';
import { Character } from '@/models/Character';
import { MatAnchor } from "@angular/material/button";

@Component({
  selector: 'app-character-creation-page',
  imports: [
    MatTabsModule,
    CharacterCreatorRules,
    CharacterCreatorSummary,
    CharacterCreatorClassSelector,
    MatAnchor
],
  templateUrl: './character-creation-page.html',
  styleUrl: './character-creation-page.scss',
})
export class CharacterCreationPage {

  static initialCharacter: Character = {
    baseData: {
      name: '',
      imgSrc: 'https://placehold.co/100x100',
      imgAltText: 'Placeholder image',
    },
    creationRules: {
      levelingType: 'xp',
      // 2024 has no averaged HP: fixed species die + CON, or roll per level
      // after 1st.
      hpType: 'fixed',
      obeyMulticlassRequirements: false,
    },
  };

  character = signal<Character>(CharacterCreationPage.initialCharacter);

  updateInfo(field: keyof Character, value: Character[keyof Character]) {
    this.character.update((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

}

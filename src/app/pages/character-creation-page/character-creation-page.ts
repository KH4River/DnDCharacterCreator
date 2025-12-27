import { Component, signal } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';

interface CharacterCreationRules {
  levelingType: 'xp' | 'milestone';
  hpType: 'average' | 'rolled';
  ignoreCoinWeight: boolean;
  obeyMulticlassRequirements: boolean;
  ruleYear: '2014' | '2024';
  characterPrivacy: 'public' | 'private' | 'campaign-only';
}

@Component({
  selector: 'app-character-creation-page',
  imports: [MatButtonToggleModule, MatSlideToggleModule, MatSelectModule],
  templateUrl: './character-creation-page.html',
  styleUrl: './character-creation-page.scss',
})
export class CharacterCreationPage {
  rules = signal<CharacterCreationRules>({
    levelingType: 'xp',
    hpType: 'average',
    ignoreCoinWeight: true,
    obeyMulticlassRequirements: false,
    ruleYear: '2014',
    characterPrivacy: 'private',
  });

  changeRules<T>(field: string, value: T) {
    this.rules.update((prev) => ({
      ...prev,
      [field]: value,
    }));
  }
}

import { Component, input, output } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';

import { CharacterCreationRules } from '@/models/Character';

@Component({
  selector: 'app-character-creator-rules',
  imports: [MatButtonToggleModule, MatSlideToggleModule, MatSelectModule],
  templateUrl: './character-creator-rules.html',
  styleUrl: './character-creator-rules.scss',
})
export class CharacterCreatorRules {
  rules = input.required<CharacterCreationRules>();
  ruleUpdated = output<CharacterCreationRules>();

  updateRule(
    field: keyof CharacterCreationRules,
    value: CharacterCreationRules[keyof CharacterCreationRules]
  ) {
    this.ruleUpdated.emit({
      ...this.rules(),
      [field]: value,
    });
  }
}

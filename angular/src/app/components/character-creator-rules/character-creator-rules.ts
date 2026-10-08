import { Component, input, output } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { CharacterCreationRules } from '@/models/Character';

@Component({
  selector: 'app-character-creator-rules',
  // No MatSelectModule: the privacy dropdown was removed, and MatSelect
  // pulls the CDK overlay/listbox machinery into the initial bundle for
  // nothing. Re-add it alongside a mat-select if one is ever needed.
  imports: [MatButtonToggleModule, MatSlideToggleModule],
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

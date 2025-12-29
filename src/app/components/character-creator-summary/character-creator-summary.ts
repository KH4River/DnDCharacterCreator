import { Component, input, output } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { CharacterBaseData } from '@/models/Character';

@Component({
  selector: 'app-character-creator-summary',
  imports: [MatFormFieldModule, MatInputModule],
  templateUrl: './character-creator-summary.html',
  styleUrl: './character-creator-summary.scss',
})
export class CharacterCreatorSummary {
  baseData = input.required<CharacterBaseData>();
  dataUpdated = output<CharacterBaseData>();

  updateCharacterName(name: string) {
    this.dataUpdated.emit({
      ...this.baseData(),
      name,
    });
  }
}

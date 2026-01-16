import { Component, signal } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-character-creator-class-selector',
  imports: [MatSelectModule],
  templateUrl: './character-creator-class-selector.html',
  styleUrl: './character-creator-class-selector.scss',
})
export class CharacterCreatorClassSelector {
  characterClass = signal<string | null>(null);
}

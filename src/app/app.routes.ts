import { Routes } from '@angular/router';

import { CharacterCreationPage } from './pages/character-creation-page/character-creation-page';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'character-creator',
  },
  {
    path: 'character-creator',
    component: CharacterCreationPage,
  },
];

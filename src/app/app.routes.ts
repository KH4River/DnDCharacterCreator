import { Routes } from '@angular/router';

import { Homepage } from './pages/homepage/homepage';
import { CharacterListPage } from './pages/character-list-page/character-list-page';
import { CharacterCreationPage } from './pages/character-creation-page/character-creation-page';

export const routes: Routes = [
  {
    path: '',
    component: Homepage,
  },
  {
    path: 'characters',
    component: CharacterListPage,
  },
  {
    path: 'character/new',
    component: CharacterCreationPage,
  },
];

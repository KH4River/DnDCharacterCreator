import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterCreationPage } from './character-creation-page';

describe('CharacterCreationPage', () => {
  let component: CharacterCreationPage;
  let fixture: ComponentFixture<CharacterCreationPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterCreationPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharacterCreationPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

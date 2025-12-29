import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterCreatorClassSelector } from './character-creator-class-selector';

describe('CharacterCreatorClassSelector', () => {
  let component: CharacterCreatorClassSelector;
  let fixture: ComponentFixture<CharacterCreatorClassSelector>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterCreatorClassSelector]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharacterCreatorClassSelector);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

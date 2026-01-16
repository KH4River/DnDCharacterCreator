import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterCreatorRules } from './character-creator-rules';

describe('CharacterCreatorRules', () => {
  let component: CharacterCreatorRules;
  let fixture: ComponentFixture<CharacterCreatorRules>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterCreatorRules]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharacterCreatorRules);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

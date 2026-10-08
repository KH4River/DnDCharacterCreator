import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterCreationRules } from '@/models/Character';

import { CharacterCreatorRules } from './character-creator-rules';

describe('CharacterCreatorRules', () => {
  let component: CharacterCreatorRules;
  let fixture: ComponentFixture<CharacterCreatorRules>;

  const initialRules: CharacterCreationRules = {
    levelingType: 'xp',
    hpType: 'fixed',
    obeyMulticlassRequirements: false,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterCreatorRules],
    }).compileComponents();

    fixture = TestBed.createComponent(CharacterCreatorRules);
    component = fixture.componentInstance;

    // rules is input.required(), so rendering without a value throws NG0950.
    // setInput() supplies it on the component ref, which is the Angular 17+
    // way and also exercises the required-input binding.
    fixture.componentRef.setInput('rules', initialRules);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('emits an updated rules object when a rule changes', () => {
    let emitted: CharacterCreationRules | undefined;
    component.ruleUpdated.subscribe((r) => (emitted = r));

    component.updateRule('hpType', 'rolled');

    expect(emitted).toEqual({ ...initialRules, hpType: 'rolled' });
  });
});
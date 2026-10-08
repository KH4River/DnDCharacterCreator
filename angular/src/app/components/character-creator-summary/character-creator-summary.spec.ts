import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterBaseData } from '@/models/Character';

import { CharacterCreatorSummary } from './character-creator-summary';

describe('CharacterCreatorSummary', () => {
  let component: CharacterCreatorSummary;
  let fixture: ComponentFixture<CharacterCreatorSummary>;

  const baseData: CharacterBaseData = {
    name: 'Test Character',
    imgSrc: '',
    imgAltText: '',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterCreatorSummary],
    }).compileComponents();

    fixture = TestBed.createComponent(CharacterCreatorSummary);
    component = fixture.componentInstance;

    // baseData is input.required(); without it the template throws NG0950.
    fixture.componentRef.setInput('baseData', baseData);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('emits an updated name when the name field changes', () => {
    let emitted: CharacterBaseData | undefined;
    component.dataUpdated.subscribe((d) => (emitted = d));

    component.updateCharacterName('Renamed');

    expect(emitted).toEqual({ ...baseData, name: 'Renamed' });
  });
});
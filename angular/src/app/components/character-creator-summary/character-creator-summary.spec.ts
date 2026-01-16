import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterCreatorSummary } from './character-creator-summary';

describe('CharacterCreatorSummary', () => {
  let component: CharacterCreatorSummary;
  let fixture: ComponentFixture<CharacterCreatorSummary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterCreatorSummary]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharacterCreatorSummary);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

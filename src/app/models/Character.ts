export interface CharacterBaseData {
  name: string;
  imgSrc: string;
  imgAltText: string;
}

export interface CharacterCreationRules {
  levelingType: 'xp' | 'milestone';
  hpType: 'average' | 'rolled';
  ignoreCoinWeight: boolean;
  obeyMulticlassRequirements: boolean;
  ruleYear: '2014' | '2024';
  characterPrivacy: 'public' | 'private' | 'campaign-only';
}

export interface Character {
  baseData: CharacterBaseData;
  creationRules: CharacterCreationRules;
}


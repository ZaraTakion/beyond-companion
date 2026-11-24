import { describe, expect, it } from 'vitest';
import {
  calculatePaxLedger,
  deriveCharacterStats,
  validateCharacter,
  type CharacterDraft,
} from './character';

const baseAttributes = {
  agility: 0,
  force: 0,
  mind: 0,
  precision: 0,
  resistance: 0,
  spirit: 0,
};

function createSkipDraft(): CharacterDraft {
  return {
    name: 'Skip fixture',
    speciesId: 'kineceleran',
    archetypeId: 'prodigy',
    evolutionaryPath: 'Surface Skimmer',
    archetypeAbilities: ['Going Hero!', 'What Does This Button Do?!'],
    attributes: { ...baseAttributes, agility: 3, mind: 1, precision: 1 },
    energyBought: 1,
    aptitudePurchases: [
      { name: 'Enhanced Agility', grade: 1 },
      { name: 'Frictionless Acceleration', grade: 1 },
    ],
    skills: [{ name: 'Acrobatics', source: 'purchased' }],
    traits: [],
    gear: [
      { name: 'Blaster', source: 'purchased' },
      { name: 'Plumber Badge', source: 'plumber-issue' },
    ],
    plumberAffiliated: true,
  };
}

function createTikkDraft(): CharacterDraft {
  return {
    name: 'Tikk fixture',
    speciesId: 'galvan',
    archetypeId: 'techno-brain',
    evolutionaryPath: 'Master Architect',
    archetypeAbilities: ['Have You Tried Turning It Off and On Again?', 'Jury-Rigged Invention'],
    attributes: { ...baseAttributes, mind: 3, precision: 1 },
    energyBought: 0,
    aptitudePurchases: [
      { name: 'Enhanced Senses', grade: 1 },
      { name: 'Hyper-Cognition', grade: 1 },
    ],
    skills: [
      { name: 'Alien Tech', source: 'purchased' },
      { name: 'Tech', source: 'archetype' },
    ],
    traits: [{ name: 'Alien Utility Bag', category: 'intermediary', source: 'purchased' }],
    gear: [
      { name: 'Blaster', source: 'purchased' },
      { name: 'Holo-Viewer', source: 'purchased' },
      { name: 'Plumber Badge', source: 'plumber-issue' },
    ],
    plumberAffiliated: true,
  };
}

describe('Tier D character domain', () => {
  it('reconciles a Skip-like character to exactly 30 PAX', () => {
    const result = validateCharacter(createSkipDraft());
    expect(result.valid).toBe(true);
    expect(result.ledger.spent).toBe(30);
    expect(result.ledger.remaining).toBe(0);
    expect(result.derivedStats).toMatchObject({
      energy: 11,
      defense: 12,
      initiative: 21,
      attackBonus: 0,
      tierDie: '1d6',
    });
  });

  it('reconciles Tikk Mind and Initiative using Aptitude bonuses', () => {
    const result = validateCharacter(createTikkDraft());
    expect(result.valid).toBe(true);
    expect(result.ledger.spent).toBe(30);
    expect(result.derivedStats.effectiveAttributes.mind).toBe(6);
    expect(result.derivedStats.initiative).toBe(9);
  });

  it('rejects Aptitudes not available to the selected species and Grade above 1', () => {
    const draft = createSkipDraft();
    draft.aptitudePurchases.push({ name: 'Molecular Phasing', grade: 1 });
    draft.aptitudePurchases.push({ name: 'Enhanced Durability', grade: 2 });
    const result = validateCharacter(draft);
    expect(result.valid).toBe(false);
    expect(result.issues.some((issue) => issue.code === 'APTITUDE_NOT_AVAILABLE')).toBe(true);
    expect(result.issues.some((issue) => issue.code === 'TIER_D_GRADE_LIMIT')).toBe(true);
  });

  it('rejects invalid Archetype ability combinations', () => {
    const draft = createSkipDraft();
    draft.archetypeAbilities = ['Clustered Clasp', 'Cheap Shot'];
    const result = validateCharacter(draft);
    expect(result.valid).toBe(false);
    expect(result.issues.some((issue) => issue.code === 'ARCHETYPE_ABILITY_MISMATCH')).toBe(true);
  });

  it('charges an unaffiliated Hero 1 PAX for the Plumber Badge', () => {
    const draft = createSkipDraft();
    draft.plumberAffiliated = false;
    draft.gear = draft.gear.map((item) =>
      item.name === 'Plumber Badge' ? { ...item, source: 'purchased' } : item,
    );
    const ledger = calculatePaxLedger(draft);
    expect(ledger.entries.find((entry) => entry.label === 'Plumber Badge')?.cost).toBe(1);
    expect(ledger.spent).toBe(31);
  });

  it('includes the Reckless Youth +1 Energy benefit in derived Energy', () => {
    const draft = createSkipDraft();
    draft.traits = [{ name: 'Reckless Youth', category: 'basic', source: 'purchased' }];
    const stats = deriveCharacterStats(draft);
    expect(stats.energy).toBe(12);
    expect(stats.energyBreakdown).toContain('Reckless Youth: +1 Energy.');
  });

  it('does not charge free species/archetype benefits to PAX', () => {
    const draft = createTikkDraft();
    const ledger = calculatePaxLedger(draft);
    expect(ledger.spent).toBe(30);
    expect(ledger.entries.find((entry) => entry.label === 'Tech')?.cost).toBe(0);
    expect(ledger.entries.find((entry) => entry.label === 'Plumber Badge')?.cost).toBe(0);
  });
});

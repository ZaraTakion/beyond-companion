import { describe, expect, it } from 'vitest';
import speciesCatalog from '../../data/rulesets/quickstart-v1/species.json';
import archetypeCatalog from '../../data/rulesets/quickstart-v1/archetypes.json';
import aptitudeCatalog from '../../data/rulesets/quickstart-v1/aptitudes.json';

describe('Quickstart v1 catalog audit', () => {
  it('contains the seven playable species with source pages', () => {
    expect(speciesCatalog.species).toHaveLength(7);
    expect(new Set(speciesCatalog.species.map((item) => item.id)).size).toBe(7);
    for (const item of speciesCatalog.species) {
      expect(item.sourcePages.length).toBeGreaterThan(0);
      expect(item.aptitudes.length).toBeGreaterThan(0);
      expect(item.paths).toHaveLength(3);
      expect(item.complication.name).not.toBe('');
      expect(item.uniquePerception.name).not.toBe('');
    }
  });

  it('contains five Archetypes with four abilities each', () => {
    expect(archetypeCatalog.archetypes).toHaveLength(5);
    expect(new Set(archetypeCatalog.archetypes.map((item) => item.id)).size).toBe(5);
    for (const item of archetypeCatalog.archetypes) {
      expect(item.abilities).toHaveLength(4);
      expect(item.sourcePages.length).toBeGreaterThan(0);
    }
  });

  it('contains all 26 Grade 1 Aptitudes and 77 ability entries', () => {
    expect(aptitudeCatalog.aptitudes).toHaveLength(26);
    const allAbilities = aptitudeCatalog.aptitudes.flatMap((item) => item.abilities);
    expect(allAbilities).toHaveLength(77);
    for (const aptitude of aptitudeCatalog.aptitudes) {
      expect(aptitude.paxPerGrade).toBeGreaterThan(0);
      expect(aptitude.sourcePages.length).toBeGreaterThan(0);
      expect(aptitude.abilities.length).toBeGreaterThan(0);
      for (const ability of aptitude.abilities) {
        expect(ability.name).not.toBe('');
        expect(ability.effect).not.toBe('');
        expect(ability.sourcePage).toBeGreaterThan(0);
      }
    }
  });

  it('keeps exceptional aptitude choices visible in the data', () => {
    expect(aptitudeCatalog.aptitudes.find((item) => item.name === 'Energy Blast')).toBeDefined();
    expect(aptitudeCatalog.aptitudes.find((item) => item.name === 'Pyrokinesis')).toBeDefined();
    expect(aptitudeCatalog.aptitudes.find((item) => item.name === 'Omni-Tech Arsenal')).toBeDefined();
  });
});

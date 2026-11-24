import { describe, expect, it } from 'vitest';
import skillsCatalog from '../../data/rulesets/quickstart-v1/skills.json';
import traitsCatalog from '../../data/rulesets/quickstart-v1/traits.json';
import gearCatalog from '../../data/rulesets/quickstart-v1/gear.json';

describe('Quickstart v1 skills, traits and gear catalog', () => {
  it('contains 12 Skills with three benefits each', () => {
    expect(skillsCatalog.skills).toHaveLength(12);
    for (const skill of skillsCatalog.skills) {
      expect(skill.benefits).toHaveLength(3);
      expect(skill.sourcePage).toBeGreaterThan(0);
    }
  });

  it('contains eight Basic and four Intermediary Traits', () => {
    expect(traitsCatalog.traits.basic).toHaveLength(8);
    expect(traitsCatalog.traits.intermediary).toHaveLength(4);
    expect(traitsCatalog.traits.basic.every((item) => item.pax === 2)).toBe(true);
    expect(traitsCatalog.traits.intermediary.every((item) => item.pax === 4)).toBe(true);
  });

  it('keeps core purchasable gear separate from adventure rewards', () => {
    expect(gearCatalog.coreWeaponsAndGear).toHaveLength(7);
    expect(gearCatalog.adventureRewards).toHaveLength(4);
    expect(gearCatalog.coreWeaponsAndGear.find((item) => item.id === 'plumber-badge')?.conditionalPax).toBe(1);
  });
});

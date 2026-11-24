import { describe, expect, it } from 'vitest';
import catalog from '../../data/rulesets/quickstart-v1/pregenerated-heroes.json';

describe('Quickstart v1 pre-generated Hero fixtures', () => {
  it('contains the five ready-to-play Heroes', () => {
    expect(catalog.heroes).toHaveLength(5);
  });

  it('reconciles the explicitly listed initiative examples', () => {
    const skip = catalog.heroes.find((hero) => hero.id === 'skip');
    const tikk = catalog.heroes.find((hero) => hero.id === 'tikk');
    expect(skip?.reported.initiative).toBe(21);
    expect(tikk?.reported.initiative).toBe(9);
  });

  it('records the character sheets with page references and PAX breakdowns', () => {
    for (const hero of catalog.heroes) {
      expect(hero.sourcePages.length).toBeGreaterThan(0);
      expect(hero.purchases.total + hero.unallocatedPax).toBe(30);
      expect(hero.reported.tierDie).toBe('1d6');
    }
  });
});

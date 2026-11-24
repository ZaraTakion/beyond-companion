import { describe, expect, it } from 'vitest';
import catalog from '../../data/rulesets/quickstart-v1/power-ups.json';
import squadThreats from '../../data/rulesets/quickstart-v1/squad-threats.json';

describe('Quickstart v1 Power-Ups and Squad catalog', () => {
  it('contains five Power-Up profiles', () => {
    expect(catalog.items).toHaveLength(5);
    for (const item of catalog.items) {
      expect(item.grade1Aptitudes).toHaveLength(2);
      expect(item.sourcePages.length).toBeGreaterThan(0);
      expect(item.drawback.summary).not.toBe('');
      expect(item.danger.summary).not.toBe('');
    }
  });

  it('records Power-Up activation and overload rules', () => {
    expect(catalog.rules.plugIn.actionPointCost).toBe(1);
    expect(catalog.rules.oneAtATime).toContain('apenas um');
    expect(catalog.rules.overload.triggers).toHaveLength(2);
  });

  it('records one Quickstart squad type and three Threat Archetypes', () => {
    expect(squadThreats.squad.plumberSquad.chooseOneSpecialAbility).toHaveLength(3);
    expect(squadThreats.threatArchetypes).toHaveLength(3);
  });
});

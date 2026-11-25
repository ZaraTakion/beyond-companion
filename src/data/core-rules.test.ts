import { describe, expect, it } from 'vitest';
import core from '../../data/rulesets/quickstart-v1/core-rules.json';

describe('Quickstart v1 core rules catalog', () => {
  it('records Tier D baselines and limits', () => {
    expect(core.tiers.tierD).toMatchObject({
      pax: 30,
      baseEnergy: 10,
      baseDefense: 12,
      attackBonus: 0,
      tierDie: '1d6',
      aptitudeGradeLimit: 1,
      attributeCap: 3,
    });
    expect(core.tiers.attributeNames).toHaveLength(6);
  });

  it('records action economy and all status conditions', () => {
    expect(core.battle.actionPointsPerTurn).toBe(3);
    expect(core.battle.reactions.perRound).toBe(1);
    expect(Object.keys(core.statusConditions)).toHaveLength(15);
  });

  it('records rescue and interlude structure', () => {
    expect(core.rescue.clocks.fastLethal.segments).toBe(4);
    expect(core.rescue.clocks.standard.segments).toBe(6);
    expect(core.rescue.clocks.macroCrisis.segments).toBe(8);
    expect(core.interlude.actionsPerHero).toBe(2);
    expect(core.interlude.options).toHaveLength(4);
  });

  it('records the five damage types and core dice rules', () => {
    expect(Object.keys(core.damage.types)).toEqual(['elemental', 'pulse', 'magical', 'physical', 'psychic']);
    expect(core.tests.formula).toContain('1d20');
    expect(core.resources.omniDie.die).toBe('d10');
  });
});

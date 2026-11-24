import { describe, expect, it } from 'vitest';
import adventure from '../../data/rulesets/quickstart-v1/adventure-rush-hour.json';

describe('Rush Hour in Undertown adventure reference', () => {
  it('contains the three alternate Truths and three Act I locations', () => {
    expect(adventure.truths).toHaveLength(3);
    expect(adventure.acts.actI.locations).toHaveLength(3);
  });

  it('contains the six-segment clock and three threshold stages', () => {
    expect(adventure.acts.actII.dangerClock.segments).toBe(6);
    expect(adventure.acts.actII.dangerClock.thresholds).toHaveLength(3);
  });

  it('contains three Rescue Clocks and three threat blocks', () => {
    expect(adventure.acts.actII.rescueClocks).toHaveLength(3);
    expect(adventure.threats).toHaveLength(3);
  });

  it('records the stated 50-PAX Tier C advancement trigger without enabling Tier C creation', () => {
    expect(adventure.rewards.tierAdvance).toContain('50 PAX');
    expect(adventure.rewards.tierAdvance).toContain('Core Rulebook');
  });
});

import { describe, expect, it } from 'vitest';
import type { CharacterDraft } from './character';
import {
  CHARACTER_STORAGE_KEY,
  decodeCharacterBackup,
  encodeCharacterBackup,
  loadSavedDraft,
  saveDraftLocally,
} from './character-storage';

const draft: CharacterDraft = {
  name: 'Test Hero',
  speciesId: 'human',
  archetypeId: 'protector',
  evolutionaryPath: 'Universal Adaptor',
  archetypeAbilities: ['I Got Your Back!', "You'll Have to Get Through Me!"],
  attributes: { agility: 1, force: 0, mind: 1, precision: 1, resistance: 0, spirit: 1 },
  energyBought: 1,
  aptitudePurchases: [{ name: 'Omni-Tech Arsenal', grade: 1 }],
  skills: [{ name: 'Piloting', source: 'purchased' }],
  traits: [{ name: 'Brave', category: 'basic', source: 'versatility' }],
  gear: [{ name: 'Plumber Badge', source: 'plumber-issue' }],
  plumberAffiliated: true,
};

function createMemoryStorage() {
  const values = new Map<string, string>();
  return {
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => { values.set(key, value); },
  };
}

describe('character backup and local persistence', () => {
  it('serializes and restores the full Quickstart character draft', () => {
    const serialized = encodeCharacterBackup(draft, '2026-11-24T12:00:00.000Z');
    expect(decodeCharacterBackup(serialized)).toEqual(draft);
  });

  it('rejects malformed JSON and unknown backup versions', () => {
    expect(() => decodeCharacterBackup('{')).toThrow(/JSON válido/);

    const backup = JSON.parse(encodeCharacterBackup(draft)) as Record<string, unknown>;
    backup.schemaVersion = 99;
    expect(() => decodeCharacterBackup(JSON.stringify(backup))).toThrow(/incompatível/);
  });

  it('rejects backups from another ruleset', () => {
    const backup = JSON.parse(encodeCharacterBackup(draft)) as Record<string, unknown>;
    backup.rulesetId = 'another-ruleset';
    expect(() => decodeCharacterBackup(JSON.stringify(backup))).toThrow(/incompatível/);
  });

  it('saves and loads a draft using the versioned storage key', () => {
    const storage = createMemoryStorage();
    saveDraftLocally(draft, storage);
    expect(loadSavedDraft(storage)).toEqual({ status: 'loaded', draft });
    expect(storage.getItem(CHARACTER_STORAGE_KEY)).not.toBeNull();
  });

  it('distinguishes an empty store from an invalid saved value', () => {
    const storage = createMemoryStorage();
    expect(loadSavedDraft(storage)).toEqual({ status: 'empty' });
    storage.setItem(CHARACTER_STORAGE_KEY, 'not-json');
    expect(loadSavedDraft(storage)).toEqual({ status: 'invalid' });
  });
});

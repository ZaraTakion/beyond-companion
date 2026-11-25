import { describe, expect, it } from 'vitest';
import speciesCatalog from '../../data/rulesets/quickstart-v1/species.json';
import archetypeCatalog from '../../data/rulesets/quickstart-v1/archetypes.json';
import { parseCharacterExport, MAX_CHARACTER_FILE_BYTES } from './character-io';
import type { CharacterDraft } from './character';

const species = speciesCatalog.species[0];
const archetype = archetypeCatalog.archetypes[0];

function createDraft(): CharacterDraft {
  return {
    name: 'Teste de importação',
    speciesId: species.id,
    archetypeId: archetype.id,
    evolutionaryPath: species.paths[0].name,
    archetypeAbilities: archetype.abilities.slice(0, 2).map((ability) => ability.name),
    attributes: {
      agility: 1,
      force: 0,
      mind: 0,
      precision: 0,
      resistance: 0,
      spirit: 0,
    },
    energyBought: 0,
    aptitudePurchases: [],
    skills: [],
    traits: [],
    gear: [],
    plumberAffiliated: true,
  };
}

function serialize(character: CharacterDraft): string {
  return JSON.stringify({
    format: 'beyond-companion-character',
    schemaVersion: 1,
    ruleset: 'Quickstart v1',
    exportedAt: '2026-11-25T00:00:00.000Z',
    character,
  });
}

describe('character export parser', () => {
  it('accepts a structurally valid Quickstart v1 character export', () => {
    const draft = createDraft();
    expect(parseCharacterExport(serialize(draft))).toEqual(draft);
  });

  it('rejects malformed JSON with a controlled error', () => {
    expect(() => parseCharacterExport('{not-json')).toThrow('JSON válido');
  });

  it('rejects unknown formats and schema versions', () => {
    const payload = JSON.parse(serialize(createDraft())) as Record<string, unknown>;
    payload.format = 'another-format';
    expect(() => parseCharacterExport(JSON.stringify(payload))).toThrow('incompatível');

    payload.format = 'beyond-companion-character';
    payload.schemaVersion = 2;
    expect(() => parseCharacterExport(JSON.stringify(payload))).toThrow('incompatível');
  });

  it('rejects unknown species, archetypes and evolutionary paths', () => {
    const payload = JSON.parse(serialize(createDraft()));
    payload.character.speciesId = 'not-a-species';
    expect(() => parseCharacterExport(JSON.stringify(payload))).toThrow('incompatível');

    const validPayload = JSON.parse(serialize(createDraft()));
    validPayload.character.evolutionaryPath = 'not-a-path';
    expect(() => parseCharacterExport(JSON.stringify(validPayload))).toThrow('incompatível');
  });

  it('rejects malformed attributes and oversized collections', () => {
    const payload = JSON.parse(serialize(createDraft()));
    delete payload.character.attributes.agility;
    expect(() => parseCharacterExport(JSON.stringify(payload))).toThrow('incompatível');

    const largeCollectionPayload = JSON.parse(serialize(createDraft()));
    largeCollectionPayload.character.skills = Array.from({ length: 101 }, () => ({
      name: 'Skill',
      source: 'purchased',
    }));
    expect(() => parseCharacterExport(JSON.stringify(largeCollectionPayload))).toThrow('incompatível');
  });

  it('rejects exports larger than the parser safety limit', () => {
    expect(() => parseCharacterExport(' '.repeat(MAX_CHARACTER_FILE_BYTES + 1))).toThrow('1 MB');
  });

  it('keeps mechanically invalid but structurally valid choices for domain validation', () => {
    const draft = createDraft();
    draft.attributes.agility = 4;
    expect(parseCharacterExport(serialize(draft)).attributes.agility).toBe(4);
  });
});

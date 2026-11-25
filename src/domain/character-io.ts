import speciesCatalog from '../../data/rulesets/quickstart-v1/species.json';
import archetypeCatalog from '../../data/rulesets/quickstart-v1/archetypes.json';
import type { AttributeName, CharacterDraft } from './character';

export const MAX_CHARACTER_FILE_BYTES = 1024 * 1024;

const attributeNames: AttributeName[] = [
  'agility',
  'force',
  'mind',
  'precision',
  'resistance',
  'spirit',
];

type UnknownRecord = Record<string, unknown>;

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isBoundedString(value: unknown, maxLength = 120): value is string {
  return typeof value === 'string' && value.length <= maxLength;
}

function isStringArray(value: unknown, maxItems = 100): value is string[] {
  return Array.isArray(value)
    && value.length <= maxItems
    && value.every((item) => isBoundedString(item));
}

function isCharacterDraft(value: unknown): value is CharacterDraft {
  if (!isRecord(value) || !isRecord(value.attributes)) return false;

  const species = speciesCatalog.species.find((item) => item.id === value.speciesId);
  const archetype = archetypeCatalog.archetypes.find((item) => item.id === value.archetypeId);
  if (
    !species
    || !archetype
    || !isBoundedString(value.evolutionaryPath)
    || !species.paths.some((path) => path.name === value.evolutionaryPath)
  ) return false;

  const attributes = value.attributes;
  const validAttributes = Object.keys(attributes).length === attributeNames.length
    && attributeNames.every((name) =>
      Number.isInteger(attributes[name]) && Number(attributes[name]) >= 0 && Number(attributes[name]) <= 100,
    );

  const validAptitudes = Array.isArray(value.aptitudePurchases)
    && value.aptitudePurchases.length <= 100
    && value.aptitudePurchases.every((item) =>
      isRecord(item)
      && isBoundedString(item.name)
      && Number.isInteger(item.grade)
      && Number(item.grade) >= 1
      && Number(item.grade) <= 10,
    );

  const validSkills = Array.isArray(value.skills)
    && value.skills.length <= 100
    && value.skills.every((item) =>
      isRecord(item)
      && isBoundedString(item.name)
      && ['purchased', 'versatility', 'archetype'].includes(String(item.source)),
    );

  const validTraits = Array.isArray(value.traits)
    && value.traits.length <= 100
    && value.traits.every((item) =>
      isRecord(item)
      && isBoundedString(item.name)
      && ['basic', 'intermediary'].includes(String(item.category))
      && ['purchased', 'versatility'].includes(String(item.source)),
    );

  const validGear = Array.isArray(value.gear)
    && value.gear.length <= 100
    && value.gear.every((item) =>
      isRecord(item)
      && isBoundedString(item.name)
      && ['purchased', 'outlaw-bonus', 'plumber-issue'].includes(String(item.source)),
    );

  return isBoundedString(value.name, 80)
    && validAttributes
    && Number.isInteger(value.energyBought)
    && Number(value.energyBought) >= 0
    && Number(value.energyBought) <= 1000
    && isStringArray(value.archetypeAbilities, 4)
    && validAptitudes
    && validSkills
    && validTraits
    && validGear
    && typeof value.plumberAffiliated === 'boolean';
}

/**
 * Parses and structurally validates a Beyond Companion character export.
 * Mechanical rule violations remain for validateCharacter() to report in the UI.
 */
export function parseCharacterExport(serialized: string): CharacterDraft {
  if (serialized.length > MAX_CHARACTER_FILE_BYTES) {
    throw new RangeError('O arquivo de ficha excede o limite de 1 MB.');
  }

  let payload: unknown;
  try {
    payload = JSON.parse(serialized);
  } catch {
    throw new TypeError('O arquivo não contém JSON válido.');
  }

  if (
    !isRecord(payload)
    || payload.format !== 'beyond-companion-character'
    || payload.schemaVersion !== 1
    || payload.ruleset !== 'Quickstart v1'
    || !isCharacterDraft(payload.character)
  ) {
    throw new TypeError('Formato de ficha incompatível ou estrutura inválida.');
  }

  return payload.character;
}

import type { CharacterDraft } from './character';

export const CHARACTER_BACKUP_SCHEMA = 'beyond-companion.character';
export const CHARACTER_BACKUP_VERSION = 1;
export const QUICKSTART_RULESET_ID = 'ben10-beyond-quickstart-v1';
export const CHARACTER_STORAGE_KEY = 'beyond-companion:quickstart-v1:character-draft';

export interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

export type SavedDraftResult =
  | { status: 'empty' }
  | { status: 'loaded'; draft: CharacterDraft }
  | { status: 'invalid' };

interface CharacterBackup {
  schema: typeof CHARACTER_BACKUP_SCHEMA;
  schemaVersion: typeof CHARACTER_BACKUP_VERSION;
  rulesetId: typeof QUICKSTART_RULESET_ID;
  exportedAt: string;
  character: CharacterDraft;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === 'string');
}

function isAptitudeSelection(value: unknown): boolean {
  return isRecord(value)
    && typeof value.name === 'string'
    && Number.isInteger(value.grade);
}

function isSkillSelection(value: unknown): boolean {
  return isRecord(value)
    && typeof value.name === 'string'
    && ['purchased', 'versatility', 'archetype'].includes(String(value.source));
}

function isTraitSelection(value: unknown): boolean {
  return isRecord(value)
    && typeof value.name === 'string'
    && ['basic', 'intermediary'].includes(String(value.category))
    && ['purchased', 'versatility'].includes(String(value.source));
}

function isGearSelection(value: unknown): boolean {
  return isRecord(value)
    && typeof value.name === 'string'
    && ['purchased', 'outlaw-bonus', 'plumber-issue'].includes(String(value.source));
}

export function isCharacterDraft(value: unknown): value is CharacterDraft {
  if (!isRecord(value) || !isRecord(value.attributes)) return false;

  const attributes = value.attributes;
  const attributeNames = ['agility', 'force', 'mind', 'precision', 'resistance', 'spirit'];
  const attributesValid = attributeNames.every((name) =>
    typeof attributes[name] === 'number' && Number.isFinite(attributes[name]),
  );

  return typeof value.name === 'string'
    && typeof value.speciesId === 'string'
    && typeof value.archetypeId === 'string'
    && typeof value.evolutionaryPath === 'string'
    && isStringArray(value.archetypeAbilities)
    && attributesValid
    && typeof value.energyBought === 'number'
    && Number.isFinite(value.energyBought)
    && Array.isArray(value.aptitudePurchases)
    && value.aptitudePurchases.every(isAptitudeSelection)
    && Array.isArray(value.skills)
    && value.skills.every(isSkillSelection)
    && Array.isArray(value.traits)
    && value.traits.every(isTraitSelection)
    && Array.isArray(value.gear)
    && value.gear.every(isGearSelection)
    && typeof value.plumberAffiliated === 'boolean';
}

export function encodeCharacterBackup(
  draft: CharacterDraft,
  exportedAt = new Date().toISOString(),
): string {
  if (!isCharacterDraft(draft)) {
    throw new TypeError('A ficha contém uma estrutura inválida e não pode ser exportada.');
  }

  const backup: CharacterBackup = {
    schema: CHARACTER_BACKUP_SCHEMA,
    schemaVersion: CHARACTER_BACKUP_VERSION,
    rulesetId: QUICKSTART_RULESET_ID,
    exportedAt,
    character: draft,
  };

  return JSON.stringify(backup, null, 2);
}

export function decodeCharacterBackup(serialized: string): CharacterDraft {
  let parsed: unknown;

  try {
    parsed = JSON.parse(serialized);
  } catch {
    throw new TypeError('O arquivo não contém um JSON válido.');
  }

  if (!isRecord(parsed)
    || parsed.schema !== CHARACTER_BACKUP_SCHEMA
    || parsed.schemaVersion !== CHARACTER_BACKUP_VERSION
    || parsed.rulesetId !== QUICKSTART_RULESET_ID
    || typeof parsed.exportedAt !== 'string'
    || !isCharacterDraft(parsed.character)) {
    throw new TypeError('Arquivo incompatível: esperado um backup de personagem do Quickstart v1.');
  }

  return parsed.character;
}

export function loadSavedDraft(storage: StorageLike, key = CHARACTER_STORAGE_KEY): SavedDraftResult {
  let serialized: string | null;

  try {
    serialized = storage.getItem(key);
  } catch {
    return { status: 'invalid' };
  }

  if (serialized === null) return { status: 'empty' };

  try {
    return { status: 'loaded', draft: decodeCharacterBackup(serialized) };
  } catch {
    return { status: 'invalid' };
  }
}

export function saveDraftLocally(
  draft: CharacterDraft,
  storage: StorageLike,
  key = CHARACTER_STORAGE_KEY,
): void {
  storage.setItem(key, encodeCharacterBackup(draft));
}

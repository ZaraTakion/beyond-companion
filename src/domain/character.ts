import speciesCatalog from '../../data/rulesets/quickstart-v1/species.json';
import archetypeCatalog from '../../data/rulesets/quickstart-v1/archetypes.json';
import aptitudeCatalog from '../../data/rulesets/quickstart-v1/aptitudes.json';
import skillsCatalog from '../../data/rulesets/quickstart-v1/skills.json';
import traitsCatalog from '../../data/rulesets/quickstart-v1/traits.json';
import gearCatalog from '../../data/rulesets/quickstart-v1/gear.json';
import { summarizePax, type PaxPurchase } from './pax';

export type AttributeName =
  | 'agility'
  | 'force'
  | 'mind'
  | 'precision'
  | 'resistance'
  | 'spirit';

export type Attributes = Record<AttributeName, number>;
export type SkillSource = 'purchased' | 'versatility' | 'archetype';
export type TraitSource = 'purchased' | 'versatility';
export type GearSource = 'purchased' | 'outlaw-bonus' | 'plumber-issue';

export interface SkillSelection {
  name: string;
  source: SkillSource;
}

export interface TraitSelection {
  name: string;
  category: 'basic' | 'intermediary';
  source: TraitSource;
}

export interface GearSelection {
  name: string;
  source: GearSource;
}

export interface AptitudeSelection {
  name: string;
  grade: number;
}

export interface CharacterDraft {
  name: string;
  speciesId: string;
  archetypeId: string;
  evolutionaryPath: string;
  archetypeAbilities: string[];
  attributes: Attributes;
  energyBought: number;
  aptitudePurchases: AptitudeSelection[];
  skills: SkillSelection[];
  traits: TraitSelection[];
  gear: GearSelection[];
  plumberAffiliated: boolean;
}

export interface ValidationIssue {
  code: string;
  message: string;
}

export interface LedgerEntry extends PaxPurchase {
  detail: string;
}

export interface PaxLedger {
  budget: number;
  spent: number;
  remaining: number;
  valid: boolean;
  entries: LedgerEntry[];
  issues: ValidationIssue[];
}

export interface DerivedStats {
  tier: 'D';
  energy: number;
  energyBreakdown: string[];
  defense: number;
  initiative: number;
  attackBonus: number;
  tierDie: '1d6';
  effectiveAttributes: Attributes;
  initiativeBreakdown: string[];
  defenseBreakdown: string[];
}

export interface CharacterValidation {
  valid: boolean;
  issues: ValidationIssue[];
  ledger: PaxLedger;
  derivedStats: DerivedStats;
}

const ATTRIBUTE_NAMES: AttributeName[] = [
  'agility', 'force', 'mind', 'precision', 'resistance', 'spirit',
];
const TIER_D_PAX = 30;

const speciesById = new Map(speciesCatalog.species.map((item) => [item.id, item]));
const archetypesById = new Map(archetypeCatalog.archetypes.map((item) => [item.id, item]));
const aptitudeByName = new Map(aptitudeCatalog.aptitudes.map((item) => [item.name, item]));
const skillByName = new Map(skillsCatalog.skills.map((item) => [item.name, item]));
const basicTraitByName = new Map(traitsCatalog.traits.basic.map((item) => [item.name, item]));
const intermediaryTraitByName = new Map(traitsCatalog.traits.intermediary.map((item) => [item.name, item]));
const gearByName = new Map(gearCatalog.coreWeaponsAndGear.map((item) => [item.name, item]));

function addIssue(issues: ValidationIssue[], code: string, message: string): void {
  issues.push({ code, message });
}

function isNonNegativeInteger(value: number): boolean {
  return Number.isInteger(value) && value >= 0;
}

function isUnique<T>(values: readonly T[]): boolean {
  return new Set(values).size === values.length;
}

export function calculatePaxLedger(draft: CharacterDraft): PaxLedger {
  const issues: ValidationIssue[] = [];
  const entries: LedgerEntry[] = [];

  for (const attribute of ATTRIBUTE_NAMES) {
    const value = draft.attributes[attribute];
    if (!Number.isInteger(value) || value < 0) {
      addIssue(issues, 'INVALID_ATTRIBUTE', `${attribute} deve ser um inteiro não negativo.`);
      continue;
    }
    if (value > 0) {
      entries.push({
        id: `attribute-${attribute}`,
        label: `${attribute} +${value}`,
        detail: `Atributo base: ${value} ponto(s) x 3 PAX.`,
        cost: value * 3,
        source: 'attribute',
      });
    }
  }

  if (!isNonNegativeInteger(draft.energyBought)) {
    addIssue(issues, 'INVALID_ENERGY_PURCHASE', 'Energy comprado deve ser um inteiro não negativo.');
  } else if (draft.energyBought > 0) {
    entries.push({
      id: 'energy-purchase',
      label: `Energy +${draft.energyBought}`,
      detail: 'Cada ponto adicional de Energy custa 2 PAX.',
      cost: draft.energyBought * 2,
      source: 'energy',
    });
  }

  for (const selection of draft.aptitudePurchases) {
    const aptitude = aptitudeByName.get(selection.name);
    if (!aptitude) {
      addIssue(issues, 'UNKNOWN_APTITUDE', `Aptitude desconhecida: ${selection.name}.`);
      continue;
    }
    if (!Number.isInteger(selection.grade) || selection.grade < 1) {
      addIssue(issues, 'INVALID_APTITUDE_GRADE', `Grade inválido para ${selection.name}.`);
      continue;
    }
    entries.push({
      id: `aptitude-${selection.name.toLowerCase().replaceAll(' ', '-')}`,
      label: `${selection.name} — Grade ${selection.grade}`,
      detail: `Custo de ${aptitude.paxPerGrade} PAX por Grade.`,
      cost: aptitude.paxPerGrade * selection.grade,
      source: 'aptitude',
    });
  }

  for (const selection of draft.skills) {
    const skill = skillByName.get(selection.name);
    if (!skill) {
      addIssue(issues, 'UNKNOWN_SKILL', `Skill desconhecida: ${selection.name}.`);
      continue;
    }
    const free = selection.source !== 'purchased';
    entries.push({
      id: `skill-${selection.name.toLowerCase().replaceAll(' ', '-')}-${selection.source}`,
      label: selection.name,
      detail: free ? `Concedida gratuitamente por ${selection.source}.` : 'Skill comprada.',
      cost: free ? 0 : 4,
      source: 'skill',
      free,
    });
  }

  for (const selection of draft.traits) {
    const trait = selection.category === 'basic'
      ? basicTraitByName.get(selection.name)
      : intermediaryTraitByName.get(selection.name);
    if (!trait) {
      addIssue(issues, 'UNKNOWN_TRAIT', `Trait desconhecida ou categoria incorreta: ${selection.name}.`);
      continue;
    }
    const free = selection.source === 'versatility';
    entries.push({
      id: `trait-${selection.name.toLowerCase().replaceAll(' ', '-')}-${selection.source}`,
      label: selection.name,
      detail: free ? 'Basic Trait concedida gratuitamente por Versatility.' : `Trait ${selection.category} comprada.`,
      cost: free ? 0 : trait.pax,
      source: 'trait',
      free,
    });
  }

  for (const selection of draft.gear) {
    const item = gearByName.get(selection.name);
    if (!item) {
      addIssue(issues, 'UNKNOWN_GEAR', `Item de gear desconhecido: ${selection.name}.`);
      continue;
    }

    const free = selection.source !== 'purchased';
    const cost = free
      ? 0
      : selection.name === 'Plumber Badge' && !draft.plumberAffiliated
        ? (item.conditionalPax ?? 1)
        : item.pax;
    entries.push({
      id: `gear-${selection.name.toLowerCase().replaceAll(' ', '-')}-${selection.source}`,
      label: selection.name,
      detail: free
        ? `Concedido gratuitamente por ${selection.source}.`
        : selection.name === 'Plumber Badge' && !draft.plumberAffiliated
          ? 'Plumber Badge para personagem não afiliado: custo condicional de 1 PAX.'
          : 'Equipamento comprado.',
      cost,
      source: 'gear',
      free,
    });
  }

  const paxPurchases: PaxPurchase[] = entries.map(({ detail: _detail, ...purchase }) => purchase);
  const summary = summarizePax(paxPurchases, TIER_D_PAX);
  if (!summary.valid) {
    addIssue(issues, 'PAX_BUDGET_EXCEEDED', `Orçamento excedido em ${Math.abs(summary.remaining)} PAX.`);
  }

  return {
    budget: TIER_D_PAX,
    spent: summary.spent,
    remaining: summary.remaining,
    valid: summary.valid && issues.length === 0,
    entries,
    issues,
  };
}

export function deriveCharacterStats(draft: CharacterDraft): DerivedStats {
  const effectiveAttributes: Attributes = { ...draft.attributes };
  const selectedAptitudes = new Set(
    draft.aptitudePurchases.filter((item) => item.grade >= 1).map((item) => item.name),
  );

  if (selectedAptitudes.has('Hyper-Cognition')) {
    effectiveAttributes.mind += 3;
  }
  if (selectedAptitudes.has('Enhanced Durability')) {
    effectiveAttributes.resistance += 1;
  }

  const archetype = archetypesById.get(draft.archetypeId);
  let initiative = archetype?.id === 'techno-brain'
    ? 10 + draft.attributes.agility - effectiveAttributes.mind
    : 10 + draft.attributes.agility;
  const initiativeBreakdown = [
    archetype?.id === 'techno-brain'
      ? `Overthinking: 10 + Agility ${draft.attributes.agility} − Mind ${effectiveAttributes.mind}.`
      : `Base: 10 + Agility ${draft.attributes.agility}.`,
  ];

  if (selectedAptitudes.has('Enhanced Agility')) {
    initiative += 3;
    initiativeBreakdown.push('Enhanced Agility: +3 Initiative (Cat-Like Reflexes).');
  }
  if (selectedAptitudes.has('Enhanced Senses')) {
    initiative += 5;
    initiativeBreakdown.push('Enhanced Senses: +5 Initiative (Sensory Radar).');
  }
  if (selectedAptitudes.has('Frictionless Acceleration')) {
    initiative += 5;
    initiativeBreakdown.push('Frictionless Acceleration: +5 Initiative (Enhanced Reflexes).');
  }

  const hasTinyScale = draft.traits.some((item) => item.name === 'Tiny Scale');
  const hasRecklessYouth = draft.traits.some((item) => item.name === 'Reckless Youth');
  const energy = 10
    + (isNonNegativeInteger(draft.energyBought) ? draft.energyBought : 0)
    + (hasRecklessYouth ? 1 : 0);
  const energyBreakdown = [
    'Tier D base Energy: 10.',
    ...(draft.energyBought > 0 ? [`Energy comprado: +${draft.energyBought}.`] : []),
    ...(hasRecklessYouth ? ['Reckless Youth: +1 Energy.'] : []),
  ];
  const defense = 12 + (hasTinyScale ? 1 : 0);
  const defenseBreakdown = [
    'Tier D base Defense: 12.',
    ...(hasTinyScale ? ['Tiny Scale: +1 Defense.'] : []),
  ];

  return {
    tier: 'D',
    energy,
    energyBreakdown,
    defense,
    initiative,
    attackBonus: 0,
    tierDie: '1d6',
    effectiveAttributes,
    initiativeBreakdown,
    defenseBreakdown,
  };
}

export function validateCharacter(draft: CharacterDraft): CharacterValidation {
  const issues: ValidationIssue[] = [];
  const species = speciesById.get(draft.speciesId);
  const archetype = archetypesById.get(draft.archetypeId);
  const ledger = calculatePaxLedger(draft);
  issues.push(...ledger.issues);

  if (!species) {
    addIssue(issues, 'UNKNOWN_SPECIES', `Species desconhecida: ${draft.speciesId}.`);
  }
  if (!archetype) {
    addIssue(issues, 'UNKNOWN_ARCHETYPE', `Archetype desconhecido: ${draft.archetypeId}.`);
  }

  for (const [name, value] of Object.entries(draft.attributes)) {
    if (!Number.isInteger(value) || value < 0 || value > 3) {
      addIssue(issues, 'ATTRIBUTE_CAP', `${name} deve ficar entre 0 e +3 no Tier D, antes de bônus de Aptitudes.`);
    }
  }

  if (!isNonNegativeInteger(draft.energyBought)) {
    addIssue(issues, 'INVALID_ENERGY_PURCHASE', 'Energy comprado deve ser um inteiro não negativo.');
  }

  if (species) {
    if (!species.paths.some((path) => path.name === draft.evolutionaryPath)) {
      addIssue(issues, 'INVALID_SPECIES_PATH', `${draft.evolutionaryPath} não pertence à espécie ${species.name}.`);
    }

    const allowedAptitudes = new Set([...species.aptitudes, 'Omni-Tech Arsenal']);
    for (const purchase of draft.aptitudePurchases) {
      if (!allowedAptitudes.has(purchase.name)) {
        addIssue(issues, 'APTITUDE_NOT_AVAILABLE', `${purchase.name} não está disponível para ${species.name} no Quickstart.`);
      }
      if (purchase.grade > 1) {
        addIssue(issues, 'TIER_D_GRADE_LIMIT', 'Heroes Tier D não podem adquirir Grade acima de 1.');
      }
    }
  }

  if (!isUnique(draft.aptitudePurchases.map((item) => item.name))) {
    addIssue(issues, 'DUPLICATE_APTITUDE', 'Cada Evolutionary Aptitude pode ser comprada apenas uma vez na criação Tier D.');
  }

  if (archetype) {
    if (draft.archetypeAbilities.length !== 2 || !isUnique(draft.archetypeAbilities)) {
      addIssue(issues, 'ARCHETYPE_ABILITY_COUNT', 'No Tier D, escolha exatamente duas Archetype Abilities diferentes.');
    }
    for (const ability of draft.archetypeAbilities) {
      if (!archetype.abilities.some((available) => available.name === ability)) {
        addIssue(issues, 'ARCHETYPE_ABILITY_MISMATCH', `${ability} não pertence ao Archetype ${archetype.name}.`);
      }
    }

    const archetypeSkills = draft.skills.filter((item) => item.source === 'archetype');
    if (archetype.id === 'techno-brain') {
      if (archetypeSkills.length !== 1 || archetypeSkills[0]?.name !== 'Tech') {
        addIssue(issues, 'TECHNO_BRAIN_SKILL', 'Techno-Brain recebe a Skill Tech gratuitamente pelo Archetype.');
      }
    } else if (archetypeSkills.length > 0) {
      addIssue(issues, 'UNEXPECTED_ARCHETYPE_SKILL', 'Somente Techno-Brain concede Skill gratuitamente por Archetype.');
    }

    const outlawFreeGear = draft.gear.filter((item) => item.source === 'outlaw-bonus');
    if (archetype.id === 'outlaw') {
      if (outlawFreeGear.length !== 1) {
        addIssue(issues, 'OUTLAW_FREE_GEAR', 'Outlaw deve selecionar exatamente um item gratuito de Weapons and Gear.');
      }
    } else if (outlawFreeGear.length > 0) {
      addIssue(issues, 'UNEXPECTED_OUTLAW_GEAR', 'A aquisição gratuita de gear é exclusiva do Archetype Outlaw.');
    }
  }

  if (!isUnique(draft.skills.map((item) => item.name))) {
    addIssue(issues, 'DUPLICATE_SKILL', 'A mesma Skill não pode ser selecionada duas vezes.');
  }
  if (!isUnique(draft.traits.map((item) => item.name))) {
    addIssue(issues, 'DUPLICATE_TRAIT', 'A mesma Trait não pode ser selecionada duas vezes.');
  }
  if (!isUnique(draft.gear.map((item) => item.name))) {
    addIssue(issues, 'DUPLICATE_GEAR', 'O mesmo item de gear não pode ser selecionado duas vezes na criação.');
  }

  const versatilitySkills = draft.skills.filter((item) => item.source === 'versatility');
  const versatilityTraits = draft.traits.filter((item) => item.source === 'versatility');
  if (species?.id === 'human') {
    if (versatilitySkills.length !== 1) {
      addIssue(issues, 'VERSATILITY_SKILL', 'Human Versatility concede exatamente uma Skill gratuita.');
    }
    if (versatilityTraits.length !== 1 || versatilityTraits[0]?.category !== 'basic') {
      addIssue(issues, 'VERSATILITY_TRAIT', 'Human Versatility concede exatamente um Basic Trait gratuito.');
    }
  } else if (versatilitySkills.length > 0 || versatilityTraits.length > 0) {
    addIssue(issues, 'UNEXPECTED_VERSATILITY', 'Versatility gratuita é exclusiva da espécie Human.');
  }

  for (const selection of draft.skills) {
    if (selection.source === 'archetype' && selection.name !== 'Tech') {
      addIssue(issues, 'INVALID_ARCHETYPE_SKILL', 'A Skill concedida pelo Archetype Techno-Brain é Tech.');
    }
  }

  if (draft.plumberAffiliated) {
    const badge = draft.gear.find((item) => item.name === 'Plumber Badge');
    if (badge && badge.source !== 'plumber-issue' && !(archetype?.id === 'outlaw' && badge.source === 'outlaw-bonus')) {
      addIssue(issues, 'PLUMBER_BADGE_SOURCE', 'Plumber Badge de personagem afiliado deve ser concedido por Plumber Issue ou pelo bônus gratuito de Outlaw.');
    }
  } else {
    const badge = draft.gear.find((item) => item.name === 'Plumber Badge' && item.source === 'plumber-issue');
    if (badge) {
      addIssue(issues, 'UNAFFILIATED_PLUMBER_BADGE', 'Personagem não afiliado não recebe Plumber Badge gratuitamente.');
    }
  }

  if (draft.traits.some((item) => item.name === 'Tiny Scale') && species?.id !== 'galvan') {
    addIssue(issues, 'TINY_SCALE_REQUIREMENT', 'Tiny Scale exige Galvan ou espécie pequena; no catálogo do Quickstart, Galvan é a opção pequena confirmada.');
  }

  const derivedStats = deriveCharacterStats(draft);
  return {
    valid: issues.length === 0 && ledger.spent <= ledger.budget,
    issues,
    ledger,
    derivedStats,
  };
}

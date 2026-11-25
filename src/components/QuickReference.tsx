import { useMemo, useState, type ReactNode } from 'react';
import speciesCatalog from '../../data/rulesets/quickstart-v1/species.json';
import archetypeCatalog from '../../data/rulesets/quickstart-v1/archetypes.json';
import aptitudeCatalog from '../../data/rulesets/quickstart-v1/aptitudes.json';
import skillsCatalog from '../../data/rulesets/quickstart-v1/skills.json';
import traitsCatalog from '../../data/rulesets/quickstart-v1/traits.json';
import gearCatalog from '../../data/rulesets/quickstart-v1/gear.json';
import coreRulesCatalog from '../../data/rulesets/quickstart-v1/core-rules.json';
import powerUpsCatalog from '../../data/rulesets/quickstart-v1/power-ups.json';
import squadCatalog from '../../data/rulesets/quickstart-v1/squad-threats.json';
import heroesCatalog from '../../data/rulesets/quickstart-v1/pregenerated-heroes.json';
import adventureCatalog from '../../data/rulesets/quickstart-v1/adventure-rush-hour.json';

type DataRecord = Record<string, unknown>;
type SectionId = 'species' | 'archetypes' | 'aptitudes' | 'skills' | 'traits' | 'gear' | 'rules' | 'power-ups' | 'squad' | 'heroes' | 'adventure';
type ReferenceSection = { id: SectionId; label: string; title: string; description: string; items: DataRecord[] };

const labels: Record<string, string> = {
  species: 'Espécies', archetypes: 'Archetypes', aptitudes: 'Evolutionary Aptitudes',
  skills: 'Skills', traits: 'Traits', gear: 'Armas e equipamentos',
  rules: 'Regras básicas', 'power-ups': 'Power-Ups', squad: 'Squad e ameaças',
  heroes: 'Heroes prontos', adventure: 'Rush Hour in Undertown',
};

const fieldLabels: Record<string, string> = {
  homeworld: 'Mundo natal', aptitudes: 'Evolutionary Aptitudes', complication: 'Complication',
  uniquePerception: 'Unique Perception', groups: 'Grupos', sophornithNote: 'Nota sobre os Sophorniths',
  paths: 'Evolutionary Paths', bonus: 'Bônus do Archetype', flaw: 'Flaw', abilities: 'Abilities',
  activation: 'Ativação', actionPointCost: 'Custo em Action Points', energyCost: 'Custo em Energy',
  frequency: 'Frequência', effect: 'Efeito', summary: 'Resumo', paxPerGrade: 'Custo por Grade',
  grade1EnergyRule: 'Custo de Energy', benefits: 'Benefícios', pax: 'Custo em PAX',
  conditionalCost: 'Custo condicional', category: 'Categoria', coreWeaponsAndGear: 'Armas e equipamentos do Quickstart',
  adventureRewards: 'Recompensas da aventura', sourceSpecies: 'Espécie de origem', grade1Aptitudes: 'Aptitudes Grade 1',
  creativeUsesOnly: 'Usos criativos', drawback: 'Desvantagem', danger: 'Perigo',
  unexpectedComplication: 'Complicação inesperada', physicalForm: 'Forma física',
  threatArchetypes: 'Threat Archetypes', squad: 'Plumber Squad', bases: 'Bases disponíveis',
  chooseOneSpecialAbility: 'Escolha uma Special Ability', trait: 'Trait', attributes: 'Attributes',
  reported: 'Valores apresentados na ficha', purchases: 'Distribuição de PAX', equipment: 'Equipamentos',
  sourcePages: 'Páginas do PDF', sourcePage: 'Página do PDF', whatHappened: 'O que aconteceu',
  ifDiscoveredEarly: 'Se descoberta antecipadamente', climax: 'Clímax', truths: 'Truths', acts: 'Atos',
  threats: 'Ameaças da aventura', rewards: 'Recompensas', environmentalHazards: 'Hazards ambientais',
  setup: 'Preparação', escalation: 'Escalada', tier: 'Tier', intendedPlayers: 'Número de jogadores sugerido',
  test: 'Test', criticalSuccess: 'Sucesso crítico', advantage: 'Advantage', disadvantage: 'Disadvantage',
  damage: 'Damage', statusConditions: 'Status e Conditions', battle: 'Battle', resources: 'Recursos',
  tests: 'Tests', characterCreation: 'Criação de personagem', interlude: 'Interlude', rescue: 'Rescue',
  squadBonding: 'Squad Bonding', perspectiveSplice: 'Perspective Splice', rules: 'Regras', items: 'Itens',
  instructions: 'Instruções', level: 'Nível', sceneTension: 'Scene Tension', locations: 'Locais',
  zones: 'Zones', dangerClock: 'Danger Clock', rescueClocks: 'Rescue Clocks', thresholds: 'Limites do clock',
  attacks: 'Ataques', roleLabel: 'Função apresentada', path: 'Path', archetype: 'Archetype',
  notes: 'Observações', unallocatedPax: 'PAX não alocados', total: 'Total', name: 'Nome', id: 'Identificador',
};

const hiddenKeys = new Set(['id', 'rulesetId', 'status', 'confidence', 'file', 'access', 'policy']);

function isRecord(value: unknown): value is DataRecord {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function labelFor(key: string): string {
  return fieldLabels[key] ?? key.replace(/([A-Z])/g, ' $1').replace(/^./, (letter) => letter.toUpperCase());
}

function displayTitle(value: DataRecord, fallback: string): string {
  for (const key of ['name', 'title', 'id']) {
    const candidate = value[key];
    if (typeof candidate === 'string' && candidate.trim()) return candidate;
  }
  return fallback;
}

function searchableText(value: unknown): string {
  if (value === null || value === undefined) return '';
  if (Array.isArray(value)) return value.map(searchableText).join(' ');
  if (isRecord(value)) {
    return Object.entries(value).filter(([key]) => !hiddenKeys.has(key))
      .map(([key, child]) => key + ' ' + searchableText(child)).join(' ');
  }
  return String(value);
}

function pageReference(value: DataRecord): string {
  const pages = value.sourcePages;
  if (Array.isArray(pages) && pages.length > 0 && pages.every((page) => typeof page === 'number')) {
    return pages.length > 1 ? 'PDF · p. ' + pages.join(', ') : 'PDF · p. ' + pages[0];
  }
  return typeof value.sourcePage === 'number' ? 'PDF · p. ' + value.sourcePage : '';
}

function renderPrimitive(value: string | number | boolean): ReactNode {
  if (typeof value === 'boolean') return value ? 'Sim' : 'Não';
  return String(value);
}

function renderRecordFields(record: DataRecord, depth: number): ReactNode {
  const entries = Object.entries(record).filter(([key, value]) =>
    !hiddenKeys.has(key) && key !== 'sourcePage' && key !== 'sourcePages' && value !== null && value !== undefined,
  );
  return (
    <div className={depth === 0 ? 'reference-fields' : 'reference-nested-fields'}>
      {entries.map(([key, value]) => (
        <div className="reference-field" key={key}>
          <div className="reference-field-label">{labelFor(key)}</div>
          {renderValue(value, key, depth + 1)}
        </div>
      ))}
    </div>
  );
}

function renderValue(value: unknown, label: string, depth: number): ReactNode {
  if (value === null || value === undefined) return null;

  if (Array.isArray(value)) {
    if (value.length === 0) return <span className="reference-muted">Não informado no catálogo.</span>;
    const primitives = value.every((item) => ['string', 'number', 'boolean'].includes(typeof item));
    if (primitives) {
      const longText = value.some((item) => typeof item === 'string' && item.length > 48);
      return longText ? (
        <ul className="reference-bullets">{value.map((item, index) => <li key={index}>{renderPrimitive(item as string | number | boolean)}</li>)}</ul>
      ) : (
        <div className="reference-tags">{value.map((item, index) => <span className="reference-tag" key={index}>{renderPrimitive(item as string | number | boolean)}</span>)}</div>
      );
    }
    return (
      <details className="reference-collection" open={depth < 2}>
        <summary>{labelFor(label)} · {value.length}</summary>
        <div className="reference-collection-items">
          {value.map((item, index) => {
            if (!isRecord(item)) return <div key={index}>{String(item)}</div>;
            const title = displayTitle(item, labelFor(label) + ' ' + (index + 1));
            return (
              <article className="reference-subcard" key={String(item.id ?? title) + '-' + index}>
                <h5>{title}</h5>
                {renderRecordFields(item, depth + 1)}
                {pageReference(item) && <small className="reference-source">{pageReference(item)}</small>}
              </article>
            );
          })}
        </div>
      </details>
    );
  }

  if (isRecord(value)) {
    const entries = Object.entries(value).filter(([key, child]) =>
      !hiddenKeys.has(key) && key !== 'sourcePage' && key !== 'sourcePages' && child !== null && child !== undefined,
    );
    const flat = entries.every(([, child]) => ['string', 'number', 'boolean'].includes(typeof child));
    if (flat) {
      return (
        <dl className="reference-definition-grid">
          {entries.map(([key, child]) => (
            <div key={key}><dt>{labelFor(key)}</dt><dd>{renderPrimitive(child as string | number | boolean)}</dd></div>
          ))}
        </dl>
      );
    }
    return (
      <details className="reference-object" open={depth < 2}>
        <summary>{labelFor(label)}</summary>
        {renderRecordFields(value, depth + 1)}
        {pageReference(value) && <small className="reference-source">{pageReference(value)}</small>}
      </details>
    );
  }

  return <p className="reference-value">{renderPrimitive(value as string | number | boolean)}</p>;
}

const coreRuleEntries = Object.entries(coreRulesCatalog)
  .filter(([key]) => !['rulesetId', 'status'].includes(key))
  .map(([key, value]) => ({ name: labelFor(key), content: value }));

const sections: ReferenceSection[] = [
  { id: 'species', label: labels.species, title: labels.species, description: 'Mundos natais, Evolutionary Aptitudes, Unique Perception, Complications, grupos e Evolutionary Paths.', items: speciesCatalog.species as unknown as DataRecord[] },
  { id: 'archetypes', label: labels.archetypes, title: labels.archetypes, description: 'Bônus, Flaws e habilidades disponíveis para cada Archetype no Quickstart.', items: archetypeCatalog.archetypes as unknown as DataRecord[] },
  { id: 'aptitudes', label: labels.aptitudes, title: labels.aptitudes, description: 'Custos de PAX por Grade e habilidades catalogadas, com ativação, custos e efeitos resumidos.', items: aptitudeCatalog.aptitudes as unknown as DataRecord[] },
  { id: 'skills', label: labels.skills, title: labels.skills, description: 'As Skills apresentadas no Quickstart e seus benefícios.', items: skillsCatalog.skills as unknown as DataRecord[] },
  { id: 'traits', label: labels.traits, title: labels.traits, description: 'Traits Basic e Intermediary, custos em PAX e respectivos efeitos.', items: [
    { name: 'Basic Traits', entries: traitsCatalog.traits.basic },
    { name: 'Intermediary Traits', entries: traitsCatalog.traits.intermediary },
  ] as unknown as DataRecord[] },
  { id: 'gear', label: labels.gear, title: labels.gear, description: 'Itens de Weapons and Gear e recompensas catalogadas da aventura introdutória.', items: [
    { name: 'Weapons and Gear', entries: gearCatalog.coreWeaponsAndGear },
    { name: 'Adventure Rewards', entries: gearCatalog.adventureRewards },
  ] as unknown as DataRecord[] },
  { id: 'rules', label: labels.rules, title: labels.rules, description: 'Criação, Tests, recursos, Battle, Damage, Conditions, Rescue, Interlude e regras de grupo.', items: coreRuleEntries as unknown as DataRecord[] },
  { id: 'power-ups', label: labels['power-ups'], title: labels['power-ups'], description: 'Regras de obtenção e uso, espécies de origem, Aptitudes, benefícios, riscos e complicações.', items: [
    { name: 'Regras gerais de Power-Ups', content: powerUpsCatalog.rules },
    ...powerUpsCatalog.items,
  ] as unknown as DataRecord[] },
  { id: 'squad', label: labels.squad, title: labels.squad, description: 'Bases e Special Abilities do Plumber Squad, além dos Threat Archetypes.', items: [
    { name: 'Plumber Squad', content: squadCatalog.squad },
    ...squadCatalog.threatArchetypes,
  ] as unknown as DataRecord[] },
  { id: 'heroes', label: labels.heroes, title: labels.heroes, description: 'As cinco fichas prontas do Quickstart, incluindo Attributes, escolhas, valores apresentados e distribuição de PAX.', items: heroesCatalog.heroes as unknown as DataRecord[] },
  { id: 'adventure', label: labels.adventure, title: labels.adventure, description: 'Preparação, Truths, atos, locais, Zones, clocks, Rescue objectives, ameaças e recompensas.', items: [adventureCatalog as unknown as DataRecord] },
];

export default function QuickReference() {
  const [activeSection, setActiveSection] = useState<SectionId>('species');
  const [query, setQuery] = useState('');
  const section = sections.find((item) => item.id === activeSection) ?? sections[0];
  const filteredItems = useMemo(() => {
    const term = query.trim().toLocaleLowerCase('pt-BR');
    return term ? section.items.filter((item) => searchableText(item).toLocaleLowerCase('pt-BR').includes(term)) : section.items;
  }, [query, section]);

  return (
    <section className="reference-explorer">
      <div className="reference-heading">
        <div>
          <div className="panel-kicker">CONSULTA · QUICKSTART V1</div>
          <h2>Guia de consulta</h2>
          <p>Selecione uma seção para consultar os registros e use a busca para localizar informações dentro dela.</p>
        </div>
        <label className="reference-search">
          <span className="sr-only">Buscar na seção atual</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar nome, regra, efeito..." />
        </label>
      </div>

      <nav className="reference-nav" aria-label="Seções do Guia Rápido">
        {sections.map((item) => (
          <button type="button" key={item.id}
            className={activeSection === item.id ? 'reference-nav-item active' : 'reference-nav-item'}
            onClick={() => { setActiveSection(item.id); setQuery(''); }}
            aria-pressed={activeSection === item.id}>
            {item.label}
          </button>
        ))}
      </nav>

      <div className="reference-section-heading">
        <div><h3>{section.title}</h3><p>{section.description}</p></div>
        <span>{filteredItems.length} {filteredItems.length === 1 ? 'registro' : 'registros'}</span>
      </div>

      {filteredItems.length > 0 ? (
        <div className="reference-cards">
          {filteredItems.map((item, index) => {
            const title = displayTitle(item, section.title + ' ' + (index + 1));
            return (
              <article className="reference-card" key={String(item.id ?? title) + '-' + index}>
                <div className="reference-card-heading">
                  <h4>{title}</h4>
                  {pageReference(item) && <span>{pageReference(item)}</span>}
                </div>
                {renderRecordFields(item, 0)}
              </article>
            );
          })}
        </div>
      ) : <p className="empty">Nenhum registro desta seção corresponde à busca.</p>}

      <p className="reference-disclaimer">Os textos são resumos de consulta do Quickstart v1. Consulte a página indicada no PDF para conferir o contexto original. Uma informação ausente do catálogo não deve ser tratada como regra inexistente.</p>
    </section>
  );
}

import { useMemo, useRef, useState } from 'react';
import speciesCatalog from '../../data/rulesets/quickstart-v1/species.json';
import archetypeCatalog from '../../data/rulesets/quickstart-v1/archetypes.json';
import aptitudeCatalog from '../../data/rulesets/quickstart-v1/aptitudes.json';
import skillsCatalog from '../../data/rulesets/quickstart-v1/skills.json';
import traitsCatalog from '../../data/rulesets/quickstart-v1/traits.json';
import gearCatalog from '../../data/rulesets/quickstart-v1/gear.json';
import {
  validateCharacter,
  type AttributeName,
  type CharacterDraft,
  type GearSelection,
  type SkillSelection,
  type TraitSelection,
} from '../domain/character';

const attributeLabels: Record<AttributeName, string> = {
  agility: 'Agility (AGI)',
  force: 'Force (FOR)',
  mind: 'Mind (MND)',
  precision: 'Precision (PRE)',
  resistance: 'Resistance (RES)',
  spirit: 'Spirit (SPI)',
};

const attributeNames = Object.keys(attributeLabels) as AttributeName[];

function makeInitialDraft(): CharacterDraft {
  const species = speciesCatalog.species[0];
  const archetype = archetypeCatalog.archetypes[0];
  return {
    name: '',
    speciesId: species.id,
    archetypeId: archetype.id,
    evolutionaryPath: species.paths[0].name,
    archetypeAbilities: archetype.abilities.slice(0, 2).map((item) => item.name),
    attributes: {
      agility: 0,
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
    gear: [{ name: 'Plumber Badge', source: 'plumber-issue' }],
    plumberAffiliated: true,
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isCharacterDraft(value: unknown): value is CharacterDraft {
  if (!isRecord(value) || !isRecord(value.attributes)) return false;

  const species = speciesCatalog.species.find((item) => item.id === value.speciesId);
  const archetype = archetypeCatalog.archetypes.find((item) => item.id === value.archetypeId);
  if (!species || !archetype || !species.paths.some((path) => path.name === value.evolutionaryPath)) return false;

  const attributes = value.attributes;
  const validAttributes = attributeNames.every((name) =>
    Number.isInteger(attributes[name]) && Number(attributes[name]) >= 0,
  );
  const validAbilities = Array.isArray(value.archetypeAbilities)
    && value.archetypeAbilities.length <= 2
    && value.archetypeAbilities.every((name) =>
      typeof name === 'string' && archetype.abilities.some((ability) => ability.name === name),
    );
  const validAptitudes = Array.isArray(value.aptitudePurchases)
    && value.aptitudePurchases.every((item) =>
      isRecord(item) && typeof item.name === 'string' && Number.isInteger(item.grade),
    );
  const validSkills = Array.isArray(value.skills)
    && value.skills.every((item) =>
      isRecord(item) && typeof item.name === 'string'
      && ['purchased', 'versatility', 'archetype'].includes(String(item.source)),
    );
  const validTraits = Array.isArray(value.traits)
    && value.traits.every((item) =>
      isRecord(item) && typeof item.name === 'string'
      && ['basic', 'intermediary'].includes(String(item.category))
      && ['purchased', 'versatility'].includes(String(item.source)),
    );
  const validGear = Array.isArray(value.gear)
    && value.gear.every((item) =>
      isRecord(item) && typeof item.name === 'string'
      && ['purchased', 'outlaw-bonus', 'plumber-issue'].includes(String(item.source)),
    );

  return typeof value.name === 'string'
    && validAttributes
    && Number.isInteger(value.energyBought) && Number(value.energyBought) >= 0
    && validAbilities
    && validAptitudes
    && validSkills
    && validTraits
    && validGear
    && typeof value.plumberAffiliated === 'boolean';
}

export default function CharacterBuilder() {
  const [draft, setDraft] = useState<CharacterDraft>(makeInitialDraft);
  const [showAllIssues, setShowAllIssues] = useState(false);
  const [importMessage, setImportMessage] = useState('');
  const importInputRef = useRef<HTMLInputElement>(null);

  const species = speciesCatalog.species.find((item) => item.id === draft.speciesId)!;
  const archetype = archetypeCatalog.archetypes.find((item) => item.id === draft.archetypeId)!;
  const validation = useMemo(() => validateCharacter(draft), [draft]);

  const aptitudeOptions = useMemo(() => {
    const speciesAptitudes = species.aptitudes.filter((name) =>
      aptitudeCatalog.aptitudes.some((item) => item.name === name),
    );
    return [...new Set([...speciesAptitudes, 'Omni-Tech Arsenal'])].map((name) =>
      aptitudeCatalog.aptitudes.find((item) => item.name === name)!,
    );
  }, [species]);

  const versatilitySkill = draft.skills.find((item) => item.source === 'versatility')?.name ?? '';
  const versatilityTrait = draft.traits.find((item) => item.source === 'versatility')?.name ?? '';
  const outlawBonusGear = draft.gear.find((item) => item.source === 'outlaw-bonus')?.name ?? '';

  function changeSpecies(speciesId: string) {
    const nextSpecies = speciesCatalog.species.find((item) => item.id === speciesId);
    if (!nextSpecies) return;
    const permittedAptitudes = new Set([
      ...nextSpecies.aptitudes.filter((name) => aptitudeCatalog.aptitudes.some((item) => item.name === name)),
      'Omni-Tech Arsenal',
    ]);
    setDraft((current) => ({
      ...current,
      speciesId,
      evolutionaryPath: nextSpecies.paths[0].name,
      aptitudePurchases: current.aptitudePurchases.filter((item) => permittedAptitudes.has(item.name)),
      skills: speciesId === 'human'
        ? current.skills
        : current.skills.filter((item) => item.source !== 'versatility'),
      traits: speciesId === 'human'
        ? current.traits
        : current.traits.filter((item) => item.source !== 'versatility'),
    }));
  }

  function changeArchetype(archetypeId: string) {
    const nextArchetype = archetypeCatalog.archetypes.find((item) => item.id === archetypeId);
    if (!nextArchetype) return;
    setDraft((current) => {
      let nextSkills = current.skills.filter((item) =>
        item.source !== 'archetype' && !(archetypeId === 'techno-brain' && item.name === 'Tech'),
      );
      if (archetypeId === 'techno-brain') {
        nextSkills = [...nextSkills, { name: 'Tech', source: 'archetype' }];
      }

      const nextGear: GearSelection[] = current.gear.flatMap((item): GearSelection[] => {
        if (item.source !== 'outlaw-bonus') return [item];
        if (item.name === 'Plumber Badge' && current.plumberAffiliated) {
          return [{ name: item.name, source: 'plumber-issue' }];
        }
        return [];
      });

      return {
        ...current,
        archetypeId,
        archetypeAbilities: nextArchetype.abilities.slice(0, 2).map((item) => item.name),
        skills: nextSkills,
        gear: nextGear,
      };
    });
  }

  function toggleArchetypeAbility(name: string, checked: boolean) {
    setDraft((current) => {
      if (checked && current.archetypeAbilities.length >= 2) return current;
      return {
        ...current,
        archetypeAbilities: checked
          ? [...current.archetypeAbilities, name]
          : current.archetypeAbilities.filter((item) => item !== name),
      };
    });
  }

  function toggleAptitude(name: string, checked: boolean) {
    setDraft((current) => ({
      ...current,
      aptitudePurchases: checked
        ? [...current.aptitudePurchases, { name, grade: 1 }]
        : current.aptitudePurchases.filter((item) => item.name !== name),
    }));
  }

  function toggleSkill(name: string, checked: boolean) {
    setDraft((current) => {
      const existing = current.skills.find((item) => item.name === name);
      if (checked) {
        if (existing) return current;
        return { ...current, skills: [...current.skills, { name, source: 'purchased' }] };
      }
      return {
        ...current,
        skills: current.skills.filter((item) => !(item.name === name && item.source === 'purchased')),
      };
    });
  }

  function chooseVersatilitySkill(name: string) {
    setDraft((current) => {
      if (name && current.skills.some((item) => item.name === name && item.source !== 'versatility')) return current;
      const remaining = current.skills.filter((item) => item.source !== 'versatility');
      const nextSkills: SkillSelection[] = name
        ? [...remaining, { name, source: 'versatility' }]
        : remaining;
      return { ...current, skills: nextSkills };
    });
  }

  function toggleTrait(name: string, category: 'basic' | 'intermediary', checked: boolean) {
    setDraft((current) => {
      const existing = current.traits.find((item) => item.name === name);
      if (checked) {
        if (existing) return current;
        return { ...current, traits: [...current.traits, { name, category, source: 'purchased' }] };
      }
      return {
        ...current,
        traits: current.traits.filter((item) => !(item.name === name && item.source === 'purchased')),
      };
    });
  }

  function chooseVersatilityTrait(name: string) {
    setDraft((current) => {
      if (name && current.traits.some((item) => item.name === name && item.source !== 'versatility')) return current;
      const remaining = current.traits.filter((item) => item.source !== 'versatility');
      const nextTraits: TraitSelection[] = name
        ? [...remaining, { name, category: 'basic', source: 'versatility' }]
        : remaining;
      return { ...current, traits: nextTraits };
    });
  }

  function toggleGear(name: string, checked: boolean) {
    setDraft((current) => {
      const existing = current.gear.find((item) => item.name === name);
      if (checked) {
        if (existing) return current;
        return { ...current, gear: [...current.gear, { name, source: 'purchased' }] };
      }
      return {
        ...current,
        gear: current.gear.filter((item) =>
          item.name !== name || item.source === 'plumber-issue' || item.source === 'outlaw-bonus',
        ),
      };
    });
  }

  function chooseOutlawGear(name: string) {
    setDraft((current) => {
      let nextGear: GearSelection[] = current.gear.flatMap((item): GearSelection[] => {
        if (item.source !== 'outlaw-bonus') return [item];
        if (item.name === 'Plumber Badge' && current.plumberAffiliated) {
          return [{ name: item.name, source: 'plumber-issue' }];
        }
        return [];
      });
      if (name) {
        const existing = nextGear.find((item) => item.name === name);
        if (existing) {
          nextGear = nextGear.map((item) =>
            item.name === name ? { name: item.name, source: 'outlaw-bonus' } as GearSelection : item,
          );
        } else {
          nextGear = [...nextGear, { name, source: 'outlaw-bonus' }];
        }
      }
      return { ...current, gear: nextGear };
    });
  }

  function setAffiliation(plumberAffiliated: boolean) {
    setDraft((current) => {
      const badge = current.gear.find((item) => item.name === 'Plumber Badge');
      let nextGear = [...current.gear];
      if (badge?.source !== 'outlaw-bonus') {
        if (badge) {
          nextGear = nextGear.map((item) =>
            item.name === 'Plumber Badge'
              ? { name: item.name, source: plumberAffiliated ? 'plumber-issue' : 'purchased' } as GearSelection
              : item,
          );
        } else if (plumberAffiliated) {
          nextGear.push({ name: 'Plumber Badge', source: 'plumber-issue' });
        }
      }
      return { ...current, plumberAffiliated, gear: nextGear };
    });
  }

  const issues = [
    ...(!draft.name.trim() ? [{ code: 'NAME_REQUIRED', message: 'Informe o nome do personagem.' }] : []),
    ...validation.issues,
  ];
  const visibleIssues = showAllIssues ? issues : issues.slice(0, 4);
  const remainingPax = validation.ledger.remaining;

  function exportCharacter() {
    const payload = {
      format: 'beyond-companion-character',
      schemaVersion: 1,
      ruleset: 'Quickstart v1',
      exportedAt: new Date().toISOString(),
      character: draft,
      derivedStats: validation.derivedStats,
      paxLedger: validation.ledger,
      validation: { valid: issues.length === 0, issues },
    };
    const filename = (draft.name.trim() || 'hero')
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '') || 'hero';
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `beyond-companion-${filename}.json`;
    link.style.display = 'none';
    document.body.append(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  async function importCharacter(file: File) {
    try {
      const payload: unknown = JSON.parse(await file.text());
      if (
        !isRecord(payload)
        || payload.format !== 'beyond-companion-character'
        || payload.schemaVersion !== 1
        || !isCharacterDraft(payload.character)
      ) {
        throw new Error('Formato de ficha não reconhecido.');
      }
      setDraft(payload.character);
      setShowAllIssues(false);
      setImportMessage('Ficha importada com sucesso. Revise as validações antes de usar.');
    } catch {
      setImportMessage('Não foi possível importar. Selecione um JSON exportado pelo Beyond Companion.');
    }
  }

  function resetCharacter() {
    if (!window.confirm('Reiniciar a ficha e descartar as escolhas atuais?')) return;
    setDraft(makeInitialDraft());
    setShowAllIssues(false);
    setImportMessage('');
  }

  return (
    <section className="builder">
      <div className="builder-intro">
        <div>
          <div className="panel-kicker">CONSTRUTOR · QUICKSTART V1</div>
          <h2>Crie seu Hero Tier D</h2>
          <p>As escolhas são validadas com base no pacote Quickstart v1. Benefícios gratuitos aparecem separados do gasto em PAX.</p>
        </div>
        <div className={remainingPax < 0 ? 'pax-meter over-budget' : 'pax-meter'} aria-live="polite">
          <span>PAX usados</span>
          <strong>{validation.ledger.spent}<small> / 30</small></strong>
          <span className={remainingPax < 0 ? 'negative' : 'remaining'}>{remainingPax} restantes</span>
          <div
            className="pax-meter-track"
            role="progressbar"
            aria-label="Orçamento de PAX utilizado"
            aria-valuemin={0}
            aria-valuemax={30}
            aria-valuenow={Math.min(30, Math.max(0, validation.ledger.spent))}
            aria-valuetext={`${validation.ledger.spent} de 30 PAX utilizados`}
          >
            <span style={{ width: `${Math.min(100, Math.max(0, validation.ledger.spent / 30 * 100))}%` }} />
          </div>
        </div>
      </div>

      <div className="builder-toolbar" aria-label="Ações da ficha">
        <button type="button" className="builder-action" onClick={() => importInputRef.current?.click()}>Importar JSON</button>
        <button type="button" className="builder-action" onClick={exportCharacter}>Exportar JSON</button>
        <button type="button" className="builder-action builder-action-primary" onClick={() => window.print()}>Imprimir / Salvar PDF</button>
        <button type="button" className="builder-action builder-action-reset" onClick={resetCharacter}>Reiniciar ficha</button>
        <input
          ref={importInputRef}
          className="sr-only"
          type="file"
          accept="application/json,.json"
          aria-label="Selecionar arquivo JSON de personagem"
          onChange={(event) => {
            const file = event.currentTarget.files?.[0];
            if (file) void importCharacter(file);
            event.currentTarget.value = '';
          }}
        />
      </div>
      {importMessage && <p className="builder-import-message" role="status">{importMessage}</p>}

      <div className="builder-layout">
        <div className="builder-main">
          <section className="builder-section builder-step-identity">
            <div className="section-heading"><span>01</span><div><h3>Identidade</h3><p>Defina a identidade e a forma de atuação do Hero.</p></div></div>
            <div className="form-grid">
              <label className="field field-wide">Nome do personagem
                <input value={draft.name} onChange={(event) => setDraft((current) => ({ ...current, name: event.target.value }))} placeholder="Digite o nome..." />
              </label>
              <label className="field">Espécie
                <select value={draft.speciesId} onChange={(event) => changeSpecies(event.target.value)}>
                  {speciesCatalog.species.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
                </select>
              </label>
              <label className="field">Archetype
                <select value={draft.archetypeId} onChange={(event) => changeArchetype(event.target.value)}>
                  {archetypeCatalog.archetypes.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
                </select>
              </label>
              <label className="field field-wide">Evolutionary Path
                <select value={draft.evolutionaryPath} onChange={(event) => setDraft((current) => ({ ...current, evolutionaryPath: event.target.value }))}>
                  {species.paths.map((path) => <option key={path.name} value={path.name}>{path.name}</option>)}
                </select>
              </label>
            </div>
            <div className="selection-block">
              <div className="selection-heading"><strong>Archetype Abilities</strong><span>{draft.archetypeAbilities.length}/2 selecionadas</span></div>
              <div className="option-grid">
                {archetype.abilities.map((ability) => (
                  <label className="option-card" key={ability.name}>
                    <input
                      type="checkbox"
                      checked={draft.archetypeAbilities.includes(ability.name)}
                      onChange={(event) => toggleArchetypeAbility(ability.name, event.target.checked)}
                      disabled={!draft.archetypeAbilities.includes(ability.name) && draft.archetypeAbilities.length >= 2}
                    />
                    <span><strong>{ability.name}</strong><small>{ability.summary}</small></span>
                  </label>
                ))}
              </div>
            </div>
          </section>

          <section className="builder-section builder-step-attributes">
            <div className="section-heading"><span>02</span><div><h3>Attributes</h3><p>No Tier D, cada ponto base custa 3 PAX e o limite é +3 por atributo.</p></div></div>
            <div className="attribute-grid">
              {attributeNames.map((name) => (
                <label className="attribute-control" key={name}>
                  <span>{attributeLabels[name]}</span>
                  <input
                    type="number"
                    min="0"
                    max="3"
                    step="1"
                    value={draft.attributes[name]}
                    onChange={(event) => setDraft((current) => ({
                      ...current,
                      attributes: { ...current.attributes, [name]: event.target.value === '' ? 0 : Number(event.target.value) },
                    }))}
                  />
                  <small>{draft.attributes[name] * 3} PAX</small>
                </label>
              ))}
            </div>
            <label className="field energy-field">Energy adicional
              <input
                type="number"
                min="0"
                step="1"
                value={draft.energyBought}
                onChange={(event) => setDraft((current) => ({ ...current, energyBought: event.target.value === '' ? 0 : Number(event.target.value) }))}
              />
              <small>2 PAX por ponto. Energy inicial: {validation.derivedStats.energy}.</small>
            </label>
          </section>

          <section className="builder-section builder-step-aptitudes">
            <div className="section-heading"><span>03</span><div><h3>Evolutionary Aptitudes</h3><p>As Creative Uses da espécie são gratuitas. Marque as Aptitudes em que você comprou Grade 1.</p></div></div>
            <div className="catalogue-picks">
              {aptitudeOptions.map((item) => {
                const checked = draft.aptitudePurchases.some((purchase) => purchase.name === item.name);
                return (
                  <label className="catalogue-pick" key={item.name}>
                    <input type="checkbox" checked={checked} onChange={(event) => toggleAptitude(item.name, event.target.checked)} />
                    <span><strong>{item.name}</strong><small>{item.paxPerGrade} PAX · Grade 1</small></span>
                  </label>
                );
              })}
            </div>
            <p className="builder-hint">Omni-Tech Arsenal aparece para qualquer espécie. Versatility, para Human, é um benefício gratuito e não uma compra de Grade.</p>
          </section>

          <section className="builder-section builder-step-training">
            <div className="section-heading"><span>04</span><div><h3>Skills e Traits</h3><p>Escolha treinamentos e qualidades. Benefícios gratuitos são identificados na origem.</p></div></div>
            {species.id === 'human' && <label className="field">Skill gratuita de Versatility
              <select value={versatilitySkill} onChange={(event) => chooseVersatilitySkill(event.target.value)}>
                <option value="">Selecione uma Skill...</option>
                {skillsCatalog.skills.map((item) => <option key={item.id} value={item.name} disabled={(archetype.id === 'techno-brain' && item.name === 'Tech') || draft.skills.some((skill) => skill.name === item.name && skill.source !== 'versatility')}>{item.name}</option>)}
              </select>
            </label>}
            {archetype.id === 'techno-brain' && <div className="free-note">Tech é concedida gratuitamente pelo Archetype Techno-Brain.</div>}
            <div className="selection-heading"><strong>Skills compradas</strong><span>4 PAX cada</span></div>
            <div className="compact-check-grid">
              {skillsCatalog.skills.map((item) => {
                const existing = draft.skills.find((skill) => skill.name === item.name);
                const isFree = Boolean(existing && existing.source !== 'purchased');
                const autoTech = archetype.id === 'techno-brain' && item.name === 'Tech';
                return (
                  <label className="compact-check" key={item.id}>
                    <input
                      type="checkbox"
                      checked={Boolean(existing)}
                      disabled={isFree || autoTech}
                      onChange={(event) => toggleSkill(item.name, event.target.checked)}
                    />
                    <span>{item.name}{isFree ? ' · gratuita' : autoTech ? ' · Archetype' : ''}</span>
                  </label>
                );
              })}
            </div>

            {species.id === 'human' && <label className="field">Basic Trait gratuita de Versatility
              <select value={versatilityTrait} onChange={(event) => chooseVersatilityTrait(event.target.value)}>
                <option value="">Selecione um Basic Trait...</option>
                {traitsCatalog.traits.basic.map((item) => <option key={item.id} value={item.name} disabled={draft.traits.some((trait) => trait.name === item.name && trait.source === 'purchased')}>{item.name}</option>)}
              </select>
            </label>}
            <div className="selection-heading"><strong>Basic Traits compradas</strong><span>2 PAX cada</span></div>
            <div className="compact-check-grid">
              {traitsCatalog.traits.basic.map((item) => {
                const existing = draft.traits.find((trait) => trait.name === item.name);
                const isFree = existing?.source === 'versatility';
                const tinyRestricted = item.id === 'tiny-scale' && species.id !== 'galvan';
                return (
                  <label className="compact-check" key={item.id}>
                    <input
                      type="checkbox"
                      checked={Boolean(existing)}
                      disabled={isFree || tinyRestricted}
                      onChange={(event) => toggleTrait(item.name, 'basic', event.target.checked)}
                    />
                    <span>{item.name}{isFree ? ' · gratuita' : tinyRestricted ? ' · Galvan no Quickstart' : ''}</span>
                  </label>
                );
              })}
            </div>
            <div className="selection-heading"><strong>Intermediary Traits</strong><span>4 PAX cada</span></div>
            <div className="compact-check-grid">
              {traitsCatalog.traits.intermediary.map((item) => {
                const existing = draft.traits.some((trait) => trait.name === item.name);
                return (
                  <label className="compact-check" key={item.id}>
                    <input type="checkbox" checked={existing} onChange={(event) => toggleTrait(item.name, 'intermediary', event.target.checked)} />
                    <span>{item.name}</span>
                  </label>
                );
              })}
            </div>
          </section>

          <section className="builder-section builder-step-gear">
            <div className="section-heading"><span>05</span><div><h3>Weapons and Gear</h3><p>Selecione equipamentos e indique afiliação Plumber.</p></div></div>
            <label className="toggle-row">
              <input type="checkbox" checked={draft.plumberAffiliated} onChange={(event) => setAffiliation(event.target.checked)} />
              <span><strong>Plumber afiliado</strong><small>Plumber Badge é gratuito para afiliados; custa 1 PAX para não afiliados.</small></span>
            </label>
            {archetype.id === 'outlaw' && <label className="field outlaw-select">Item gratuito do Outlaw
              <select value={outlawBonusGear} onChange={(event) => chooseOutlawGear(event.target.value)}>
                <option value="">Selecione um item gratuito...</option>
                {gearCatalog.coreWeaponsAndGear.filter((item) => {
                  const existing = draft.gear.find((gear) => gear.name === item.name);
                  return !existing || existing.source === 'outlaw-bonus' || (item.name === 'Plumber Badge' && !draft.plumberAffiliated && existing.source === 'purchased');
                }).map((item) => <option key={item.id} value={item.name}>{item.name}</option>)}
              </select>
            </label>}
            <div className="catalogue-picks">
              {gearCatalog.coreWeaponsAndGear.map((item) => {
                const selected = draft.gear.find((gear) => gear.name === item.name);
                const free = Boolean(selected && selected.source !== 'purchased');
                const badgeLocked = item.name === 'Plumber Badge' && draft.plumberAffiliated;
                const controlledByOutlaw = selected?.source === 'outlaw-bonus';
                return (
                  <label className="catalogue-pick" key={item.id}>
                    <input
                      type="checkbox"
                      checked={Boolean(selected)}
                      disabled={badgeLocked || controlledByOutlaw}
                      onChange={(event) => toggleGear(item.name, event.target.checked)}
                    />
                    <span><strong>{item.name}</strong><small>{free ? 'Gratuito' : item.name === 'Plumber Badge' && !draft.plumberAffiliated ? '1 PAX para não afiliado' : item.pax + ' PAX'}</small></span>
                  </label>
                );
              })}
            </div>
          </section>
        </div>

        <aside className="builder-sidebar">
          <section className="summary-card">
            <div className="panel-kicker">RESUMO DA FICHA</div>
            <h3>{draft.name.trim() || 'Novo Hero'}</h3>
            <p>{species.name} · {archetype.name}</p>
            <div className="summary-stats">
              <div><span>Energy</span><strong>{validation.derivedStats.energy}</strong></div>
              <div><span>Defense</span><strong>{validation.derivedStats.defense}</strong></div>
              <div><span>Initiative</span><strong>{validation.derivedStats.initiative}</strong></div>
              <div><span>Attack Bonus</span><strong>+{validation.derivedStats.attackBonus}</strong></div>
              <div><span>Tier Die</span><strong>{validation.derivedStats.tierDie}</strong></div>
              <div><span>PAX livre</span><strong>{remainingPax}</strong></div>
            </div>
            <div className="summary-breakdown">
              <strong>Initiative e Energy</strong>
              {validation.derivedStats.initiativeBreakdown.map((line) => <small key={line}>{line}</small>)}
              {validation.derivedStats.energyBreakdown.map((line) => <small key={line}>{line}</small>)}
            </div>
            <div className="pax-ledger">
              <div className="selection-heading"><strong>Ledger de PAX</strong><span>{validation.ledger.spent}/30</span></div>
              {validation.ledger.entries.length === 0 && <small>Nenhuma compra registrada.</small>}
              {validation.ledger.entries.map((entry) => (
                <div className="ledger-line" key={entry.id}><span>{entry.label}</span><strong>{entry.cost}</strong></div>
              ))}
            </div>
          </section>

          <section className={issues.length === 0 ? 'validation-card valid' : 'validation-card'}>
            <div className="validation-title">
              <strong>{issues.length === 0 ? 'Ficha válida' : 'Revisar escolhas'}</strong>
              <span>{issues.length === 0 ? '✓' : String(issues.length)}</span>
            </div>
            {issues.length === 0
              ? <p>As escolhas atuais respeitam as validações implementadas do Quickstart v1.</p>
              : <ul>{visibleIssues.map((issue, index) => <li key={issue.code + '-' + index}>{issue.message}</li>)}</ul>}
            {issues.length > 4 && <button className="text-button" onClick={() => setShowAllIssues((value) => !value)}>{showAllIssues ? 'Mostrar menos' : 'Mostrar todas as pendências'}</button>}
          </section>
          <p className="builder-disclaimer">A validação cobre as regras de criação já catalogadas. Interações ambíguas e efeitos situacionais continuam dependendo do GM.</p>
        </aside>
      </div>

      <section className="print-sheet" aria-label="Ficha de personagem para impressão">
        <header className="print-sheet-header">
          <div>
            <span>BEYOND COMPANION · QUICKSTART V1</span>
            <h1>{draft.name.trim() || 'Hero sem nome'}</h1>
            <p>Ficha de personagem · Tier D · Projeto independente de fãs</p>
          </div>
          <div className="print-sheet-budget">
            <strong>{validation.ledger.spent} / 30</strong>
            <span>PAX utilizados</span>
            <b>{remainingPax} restantes</b>
          </div>
        </header>

        <section className="print-sheet-stat-grid" aria-label="Estatísticas derivadas">
          <div><span>Energy</span><strong>{validation.derivedStats.energy}</strong></div>
          <div><span>Defense</span><strong>{validation.derivedStats.defense}</strong></div>
          <div><span>Initiative</span><strong>{validation.derivedStats.initiative}</strong></div>
          <div><span>Attack Bonus</span><strong>+{validation.derivedStats.attackBonus}</strong></div>
          <div><span>Tier Die</span><strong>{validation.derivedStats.tierDie}</strong></div>
        </section>

        <div className="print-sheet-columns">
          <section className="print-sheet-section">
            <h2>Identidade</h2>
            <dl>
              <div><dt>Espécie</dt><dd>{species.name}</dd></div>
              <div><dt>Archetype</dt><dd>{archetype.name}</dd></div>
              <div><dt>Evolutionary Path</dt><dd>{draft.evolutionaryPath}</dd></div>
              <div><dt>Plumber afiliado</dt><dd>{draft.plumberAffiliated ? 'Sim' : 'Não'}</dd></div>
            </dl>
            <h3>Archetype Abilities</h3>
            <ul>{draft.archetypeAbilities.map((name) => <li key={name}>{name}</li>)}</ul>
          </section>

          <section className="print-sheet-section">
            <h2>Attributes</h2>
            <dl>
              {attributeNames.map((name) => (
                <div key={name}><dt>{attributeLabels[name]}</dt><dd>{draft.attributes[name]}</dd></div>
              ))}
              <div><dt>Energy adicional</dt><dd>{draft.energyBought}</dd></div>
            </dl>
          </section>

          <section className="print-sheet-section">
            <h2>Evolutionary Aptitudes</h2>
            <ul>{draft.aptitudePurchases.length
              ? draft.aptitudePurchases.map((item) => <li key={item.name}>{item.name} · Grade {item.grade}</li>)
              : <li>Nenhuma selecionada</li>}</ul>
          </section>

          <section className="print-sheet-section">
            <h2>Skills</h2>
            <ul>{draft.skills.length
              ? draft.skills.map((item) => <li key={item.name}>{item.name}{item.source === 'purchased' ? '' : ' · gratuita'}</li>)
              : <li>Nenhuma selecionada</li>}</ul>
            <h2>Traits</h2>
            <ul>{draft.traits.length
              ? draft.traits.map((item) => <li key={item.name}>{item.name}{item.source === 'versatility' ? ' · gratuita' : ''}</li>)
              : <li>Nenhuma selecionada</li>}</ul>
          </section>

          <section className="print-sheet-section">
            <h2>Weapons and Gear</h2>
            <ul>{draft.gear.length
              ? draft.gear.map((item) => <li key={item.name}>{item.name}{item.source === 'purchased' ? '' : ' · gratuita'}</li>)
              : <li>Nenhum item selecionado</li>}</ul>
          </section>

          <section className="print-sheet-section">
            <h2>Ledger de PAX</h2>
            {validation.ledger.entries.length
              ? <dl>{validation.ledger.entries.map((entry) => (
                  <div key={entry.id}><dt>{entry.label}</dt><dd>{entry.cost}</dd></div>
                ))}</dl>
              : <p>Nenhuma compra registrada.</p>}
            <div className="print-sheet-total"><strong>Total</strong><strong>{validation.ledger.spent} / 30 PAX</strong></div>
          </section>
        </div>

        <footer className="print-sheet-footer">
          <span>{issues.length === 0 ? 'Validações implementadas: sem pendências.' : `Atenção: ${issues.length} pendência(s) na ficha.`}</span>
          <span>Os efeitos situacionais continuam sujeitos à interpretação do GM · Quickstart v1</span>
        </footer>
      </section>
    </section>
  );
}

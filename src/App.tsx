import { useMemo, useState } from 'react';
import { ruleset } from './data/ruleset';
import CharacterBuilder from './components/CharacterBuilder';
import './styles.css';

type Tab = 'overview' | 'builder' | 'species' | 'archetypes' | 'aptitudes';

export default function App() {
  const [tab, setTab] = useState<Tab>('overview');
  const [query, setQuery] = useState('');

  const species = useMemo(() => ruleset.species.filter((item) =>
    (item.name + ' ' + item.homeworld + ' ' + item.aptitudes.join(' ') + ' ' + item.paths.join(' '))
      .toLowerCase().includes(query.toLowerCase()),
  ), [query]);

  const archetypes = useMemo(() => ruleset.archetypes.filter((item) =>
    (item.name + ' ' + item.bonus + ' ' + item.flaw + ' ' + item.abilities.join(' '))
      .toLowerCase().includes(query.toLowerCase()),
  ), [query]);

  const aptitudes = useMemo(() => ruleset.aptitudes.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase()),
  ), [query]);

  return (
    <main className="shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Beyond Companion, início">
          <span className="brand-mark" aria-hidden="true">B</span>
          <span>BEYOND <b>COMPANION</b></span>
        </a>
        <span className="version-pill">{ruleset.displayName}</span>
      </header>

      <section className="hero" id="top">
        <div className="eyebrow">COMPANION DE MESA · PROTÓTIPO</div>
        <h1>Seu próximo herói<br /><em>começa aqui.</em></h1>
        <p>Consulte o Quickstart, compare opções e prepare a criação do seu personagem. Cada regra catalogada aponta para sua página de origem.</p>
        <div className="hero-meta">
          <span><strong>{ruleset.species.length}</strong> espécies</span>
          <span><strong>{ruleset.archetypes.length}</strong> Archetypes</span>
          <span><strong>{ruleset.aptitudes.length}</strong> Aptitudes catalogadas</span>
        </div>
      </section>

      <nav className="tabs" aria-label="Navegação principal">
        {([
          ['overview', 'Visão geral'],
          ['builder', 'Criar ficha'],
          ['species', 'Espécies'],
          ['archetypes', 'Archetypes'],
          ['aptitudes', 'Aptitudes'],
        ] as const).map(([id, label]) => (
          <button key={id} className={tab === id ? 'tab active' : 'tab'} onClick={() => { setTab(id); setQuery(''); }} aria-current={tab === id ? 'page' : undefined}>
            {label}
          </button>
        ))}
      </nav>

      {tab === 'overview' && (
        <section className="content-grid">
          <article className="panel feature-panel">
            <div className="panel-kicker">REGRAS DO QUICKSTART</div>
            <h2>Uma base rastreável.<br />Sem regras inventadas.</h2>
            <p>Este protótipo usa um pacote de regras separado da interface. Revisões futuras poderão entrar como outra versão sem alterar fichas já criadas.</p>
            <div className="stat-row">
              <div><strong>{ruleset.tierD.pax}</strong><span>PAX iniciais</span></div>
              <div><strong>{ruleset.tierD.baseEnergy}</strong><span>Energy base</span></div>
              <div><strong>{ruleset.tierD.baseDefense}</strong><span>Defense base</span></div>
            </div>
          </article>
          <article className="panel status-panel">
            <div className="panel-kicker">PRÓXIMO MARCO</div>
            <h2>Criador Tier D</h2>
            <p>Primeira versão do construtor guiado: escolhas de espécie e Archetype, ledger de PAX, limites de Tier D e estatísticas derivadas.</p>
            <span className="status-tag">Em implementação · Fase 1</span>
          </article>
          <article className="panel note-panel">
            <div className="panel-kicker">FIDELIDADE</div>
            <p>Interações sem esclarecimento oficial aparecem como pendências. Exemplo: o Quickstart não esclarece explicitamente se Frost Stream pode ser usado durante Molecular Phasing.</p>
          </article>
          <article className="panel note-panel">
            <div className="panel-kicker">FONTE ATUAL</div>
            <p>Somente o PDF Quickstart v1 fornecido pelo usuário. Grades acima de 1 e progressão além do Tier D não serão presumidas.</p>
          </article>
        </section>
      )}

      {tab === 'builder' && <CharacterBuilder />}

      {tab !== 'overview' && tab !== 'builder' && (
        <section className="catalogue">
          <div className="catalogue-heading">
            <div>
              <div className="panel-kicker">COMPÊNDIO · QUICKSTART V1</div>
              <h2>{tab === 'species' ? 'Espécies' : tab === 'archetypes' ? 'Archetypes' : 'Evolutionary Aptitudes'}</h2>
            </div>
            <label className="search-label">
              <span className="sr-only">Buscar no catálogo</span>
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar..." />
            </label>
          </div>

          {tab === 'species' && <div className="cards">{species.map((item) => <article className="catalogue-card" key={item.id}>
            <div className="card-top"><h3>{item.name}</h3><span>{item.homeworld}</span></div>
            <p className="card-label">EVOLUTIONARY APTITUDES</p><p>{item.aptitudes.join(' · ')}</p>
            <p className="card-label">UNIQUE PERCEPTION</p><p>{item.uniquePerception}</p>
            <p className="card-label">COMPLICATION</p><p>{item.complication}</p>
            <p className="card-label">EVOLUTIONARY PATHS</p><p>{item.paths.join(' · ')}</p>
            <small>PDF · p. {item.sourcePages.join('–')}</small>
          </article>)}</div>}

          {tab === 'archetypes' && <div className="cards">{archetypes.map((item) => <article className="catalogue-card" key={item.id}>
            <div className="card-top"><h3>{item.name}</h3><span>2 habilidades no Tier D</span></div>
            <p className="card-label">ARCHETYPE BONUS</p><p>{item.bonus}</p>
            <p className="card-label">FLAW / CODE</p><p>{item.flaw}</p>
            <p className="card-label">ABILITIES</p><p>{item.abilities.join(' · ')}</p>
            <small>PDF · p. {item.sourcePages.join('–')}</small>
          </article>)}</div>}

          {tab === 'aptitudes' && <div className="aptitude-list">{aptitudes.map((item) => <article className="aptitude-row" key={item.name}>
            <strong>{item.name}</strong><span>{item.paxPerGrade} PAX / Grade</span><small>PDF · p. {item.sourcePages.join('–')}</small>
          </article>)}</div>}

          {(tab === 'species' && species.length === 0 || tab === 'archetypes' && archetypes.length === 0 || tab === 'aptitudes' && aptitudes.length === 0) && <p className="empty">Nenhum resultado encontrado.</p>}
        </section>
      )}

      <footer className="footer">
        <span>Beyond Companion · protótipo não oficial</span>
        <span>Regras: Quickstart v1 · referência de páginas incluída</span>
      </footer>
    </main>
  );
}

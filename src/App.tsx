import { useState } from 'react';
import { ruleset } from './data/ruleset';
import CharacterBuilder from './components/CharacterBuilder';
import QuickReference from './components/QuickReference';
import './styles.css';

type Tab = 'overview' | 'guide' | 'builder';

export default function App() {
  const [tab, setTab] = useState<Tab>('overview');

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
        <div className="eyebrow">GUIA RÁPIDO DIGITAL · QUICKSTART V1</div>
        <h1>Consulte o universo.<br /><em>Prepare seu Hero.</em></h1>
        <p>Um guia digital de consulta rápida com o conteúdo organizado a partir do PDF Quickstart v1. Esta versão não acrescenta regras externas ao documento.</p>
        <div className="hero-meta">
          <span><strong>{ruleset.species.length}</strong> espécies</span>
          <span><strong>{ruleset.archetypes.length}</strong> Archetypes</span>
          <span><strong>{ruleset.aptitudes.length}</strong> Aptitudes</span>
        </div>
      </section>

      <nav className="tabs" aria-label="Navegação principal">
        {([
          ['overview', 'Visão geral'],
          ['guide', 'Guia de consulta'],
          ['builder', 'Criar ficha Tier D'],
        ] as const).map(([id, label]) => (
          <button key={id} className={tab === id ? 'tab active' : 'tab'} onClick={() => setTab(id)} aria-current={tab === id ? 'page' : undefined}>
            {label}
          </button>
        ))}
      </nav>

      {tab === 'overview' && (
        <section className="content-grid">
          <article className="panel feature-panel">
            <div className="panel-kicker">QUICKSTART V1</div>
            <h2>O conteúdo do PDF em um só lugar.</h2>
            <p>Consulte opções de personagem, regras de jogo, equipamentos, Power-Ups, ameaças, Heroes prontos e a aventura introdutória.</p>
            <div className="stat-row">
              <div><strong>{ruleset.tierD.pax}</strong><span>PAX iniciais</span></div>
              <div><strong>{ruleset.tierD.baseEnergy}</strong><span>Energy base</span></div>
              <div><strong>{ruleset.tierD.baseDefense}</strong><span>Defense base</span></div>
            </div>
          </article>
          <article className="panel status-panel">
            <div className="panel-kicker">CONSULTA</div>
            <h2>Guia organizado por seção</h2>
            <p>Use a busca para localizar nomes, efeitos, custos e termos dentro da seção selecionada. As referências de página acompanham cada registro.</p>
            <span className="status-tag">Fonte única · Quickstart v1</span>
          </article>
          <article className="panel note-panel">
            <div className="panel-kicker">CRIAÇÃO DE HERO</div>
            <p>O construtor permanece limitado à criação Tier D e às opções descritas no Quickstart. Ele valida o orçamento de PAX e os limites catalogados.</p>
          </article>
          <article className="panel note-panel">
            <div className="panel-kicker">FIDELIDADE À FONTE</div>
            <p>Informações resumidas mantêm a indicação das páginas do PDF. Ambiguidades e interações não esclarecidas permanecem identificadas como pendências, sem criar decisões de regra.</p>
          </article>
        </section>
      )}

      {tab === 'guide' && <QuickReference />}
      {tab === 'builder' && <CharacterBuilder />}

      <footer className="footer">
        <span>Beyond Companion · protótipo não oficial</span>
        <span>Ruleset atual: Quickstart v1 · 76 páginas</span>
      </footer>
    </main>
  );
}

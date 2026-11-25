import { useState } from 'react';
import { ruleset } from './data/ruleset';
import CharacterBuilder from './components/CharacterBuilder';
import QuickReference from './components/QuickReference';
import SpeciesScanner from './components/SpeciesScanner';
import './styles.css';

type Tab = 'overview' | 'guide' | 'builder';

const navigation: { id: Tab; number: string; label: string; hint: string }[] = [
  { id: 'overview', number: '00', label: 'Visão geral', hint: 'Ponto de partida' },
  { id: 'guide', number: '01', label: 'Guia de consulta', hint: 'Regras e referências' },
  { id: 'builder', number: '02', label: 'Criar um Hero', hint: 'Ficha Tier D' },
];

function AppMark() {
  return (
    <span className="brand-emblem" aria-hidden="true">
      <span className="brand-emblem-core">B</span>
    </span>
  );
}

export default function App() {
  const [tab, setTab] = useState<Tab>('overview');
  const currentPage = navigation.find((item) => item.id === tab) ?? navigation[0];

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <a className="sidebar-brand" href="#inicio" onClick={() => setTab('overview')} aria-label="Beyond Companion — início">
          <AppMark />
          <span className="brand-wordmark">BEYOND<span>COMPANION</span></span>
        </a>

        <div className="sidebar-section-label">ESPAÇO DE JOGO</div>
        <nav className="sidebar-nav" aria-label="Navegação principal">
          {navigation.map((item) => (
            <button
              key={item.id}
              type="button"
              className={tab === item.id ? 'side-link active' : 'side-link'}
              onClick={() => setTab(item.id)}
              aria-current={tab === item.id ? 'page' : undefined}
            >
              <span className="side-link-number">{item.number}</span>
              <span className="side-link-copy">
                <strong>{item.label}</strong>
                <small>{item.hint}</small>
              </span>
              <span className="side-link-arrow" aria-hidden="true">↗</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-spacer" />
        <div className="sidebar-source">
          <div className="source-status"><span className="status-light" /> FONTE ATIVA</div>
          <strong>Quickstart v1</strong>
          <span>{ruleset.source.pageCount} páginas · edição de referência</span>
          <div className="source-rule" />
          <small>Conteúdo baseado somente no documento auditado.</small>
        </div>
        <div className="sidebar-bottom">
          <span className="sidebar-bottom-mark">BC / 001</span>
          <span>PROTÓTIPO NÃO OFICIAL</span>
        </div>
      </aside>

      <main className="main-area" id="inicio">
        <header className="topbar">
          <div className="breadcrumb">
            <span>BEYOND COMPANION</span>
            <b>/</b>
            <strong>{currentPage.label}</strong>
          </div>
          <div className="topbar-actions">
            <span className="topbar-version"><span className="status-light" /> {ruleset.displayName}</span>
            <button type="button" className="button button-quiet" onClick={() => setTab('guide')}>Consultar guia <span aria-hidden="true">↗</span></button>
          </div>
        </header>

        <div className="page-content">
          {tab === 'overview' && (
            <div className="dashboard">
              <section className="home-hero">
                <div className="hero-copy">
                  <div className="hero-eyebrow"><span className="hero-eyebrow-dot" /> ALIEN DATABASE <span>/</span> QUICKSTART 001</div>
                  <h1>Identifique o desconhecido.<br /><em>Domine as regras.</em></h1>
                  <p>Uma central de consulta para explorar o Quickstart, encontrar regras sem interromper a sessão e preparar seu próximo Hero.</p>
                  <div className="hero-actions">
                    <button type="button" className="button button-dark" onClick={() => setTab('guide')}>Explorar o guia <span aria-hidden="true">→</span></button>
                    <button type="button" className="button button-outline-dark" onClick={() => setTab('builder')}>Criar personagem</button>
                  </div>
                  <div className="hero-footnote"><span>01</span> REFERÊNCIA DIGITAL · BEN 10: BEYOND RPG</div>
                </div>
                <div className="hero-visual" aria-hidden="true">
                  <div className="visual-grid" />
                  <div className="visual-orbit orbit-one" />
                  <div className="visual-orbit orbit-two" />
                  <div className="visual-orbit orbit-three" />
                  <div className="visual-core"><span>BC</span><i /></div>
                  <div className="visual-crosshair crosshair-top" />
                  <div className="visual-crosshair crosshair-bottom" />
                  <div className="visual-code">FIELD / 001<br />EARTH SECTOR</div>
                  <div className="visual-number">10</div>
                  <div className="visual-caption">QUICKSTART<br />EDITION</div>
                </div>
                <div className="hero-side-index"><span>V1</span><span>·</span><span>FIELD NOTES</span></div>
              </section>

              <SpeciesScanner />

              <section className="metrics-row" aria-label="Resumo do conteúdo">
                <div className="metric-card">
                  <span className="metric-index">01 / OPTIONS</span>
                  <strong>{String(ruleset.species.length).padStart(2, '0')}</strong>
                  <span>espécies jogáveis</span>
                </div>
                <div className="metric-card">
                  <span className="metric-index">02 / ARCHETYPES</span>
                  <strong>{String(ruleset.archetypes.length).padStart(2, '0')}</strong>
                  <span>estilos de Hero</span>
                </div>
                <div className="metric-card">
                  <span className="metric-index">03 / APTITUDES</span>
                  <strong>{String(ruleset.aptitudes.length).padStart(2, '0')}</strong>
                  <span>aptidões catalogadas</span>
                </div>
                <div className="metric-card metric-card-highlight">
                  <span className="metric-index">04 / CHARACTER BUILD</span>
                  <strong>{ruleset.tierD.pax}</strong>
                  <span>PAX para criação Tier D</span>
                </div>
              </section>

              <section className="explore-section">
                <div className="section-title-row">
                  <div>
                    <div className="section-kicker">NAVEGAÇÃO RÁPIDA</div>
                    <h2>Encontre seu próximo passo.</h2>
                  </div>
                  <button type="button" className="text-link" onClick={() => setTab('guide')}>Ver todas as seções <span aria-hidden="true">↗</span></button>
                </div>
                <div className="launch-grid">
                  <button type="button" className="launch-card" onClick={() => setTab('guide')}>
                    <span className="launch-topline"><span>01</span><span>ENCICLOPÉDIA</span></span>
                    <span className="launch-icon launch-icon-orbit" aria-hidden="true"><i /></span>
                    <strong>Explore o sistema</strong>
                    <span className="launch-description">Espécies, Archetypes, Aptitudes, Skills, Traits e equipamentos.</span>
                    <span className="launch-cta">Abrir referências <b>↗</b></span>
                  </button>
                  <button type="button" className="launch-card" onClick={() => setTab('guide')}>
                    <span className="launch-topline"><span>02</span><span>NA MESA</span></span>
                    <span className="launch-icon launch-icon-target" aria-hidden="true"><i /></span>
                    <strong>Consulte as regras</strong>
                    <span className="launch-description">Tests, recursos, Battle, Damage, Conditions e cenas de jogo.</span>
                    <span className="launch-cta">Consultar regras <b>↗</b></span>
                  </button>
                  <button type="button" className="launch-card launch-card-accent" onClick={() => setTab('builder')}>
                    <span className="launch-topline"><span>03</span><span>CONSTRUÇÃO</span></span>
                    <span className="launch-icon launch-icon-shield" aria-hidden="true"><i /></span>
                    <strong>Monte seu Hero</strong>
                    <span className="launch-description">Faça escolhas Tier D e acompanhe seu orçamento de PAX.</span>
                    <span className="launch-cta">Abrir construtor <b>↗</b></span>
                  </button>
                </div>
              </section>

              <section className="bottom-feature">
                <div className="bottom-feature-copy">
                  <div className="section-kicker">PERSONAGEM · TIER D</div>
                  <h2>Trinta PAX.<br /><em>Uma identidade só sua.</em></h2>
                  <p>Construa seu personagem com as opções do Quickstart e acompanhe os custos enquanto escolhe.</p>
                  <button type="button" className="button button-lime" onClick={() => setTab('builder')}>Começar ficha <span aria-hidden="true">→</span></button>
                </div>
                <div className="bottom-feature-stats" aria-label="Valores base do Tier D">
                  <div><span>ENERGY BASE</span><strong>{ruleset.tierD.baseEnergy}</strong></div>
                  <div><span>DEFENSE BASE</span><strong>{ruleset.tierD.baseDefense}</strong></div>
                  <div><span>ORÇAMENTO</span><strong>{ruleset.tierD.pax}<small> PAX</small></strong></div>
                </div>
                <div className="bottom-feature-watermark" aria-hidden="true">D</div>
              </section>

              <div className="dashboard-note">
                <span className="note-mark">i</span>
                <p><strong>Fonte e fidelidade.</strong> Este protótipo organiza apenas o conteúdo do Quickstart v1. Resumos mantêm referências de página; pontos ambíguos continuam sinalizados em vez de receber regras inventadas.</p>
              </div>
            </div>
          )}

          {tab === 'guide' && (
            <div className="page-view">
              <div className="page-intro">
                <div>
                  <div className="section-kicker">FIELD GUIDE / 01</div>
                  <h1>Guia de consulta<span>.</span></h1>
                  <p>O conteúdo do Quickstart organizado por assunto. Escolha uma seção e encontre rapidamente o que precisa para a sessão.</p>
                </div>
                <div className="page-intro-stamp"><strong>11</strong><span>SEÇÕES<br />AUDITADAS</span></div>
              </div>
              <QuickReference />
            </div>
          )}

          {tab === 'builder' && (
            <div className="page-view">
              <div className="page-intro">
                <div>
                  <div className="section-kicker">FIELD GUIDE / 02</div>
                  <h1>Crie seu Hero<span>.</span></h1>
                  <p>Monte uma ficha Tier D e confira, em tempo real, como suas escolhas utilizam os PAX disponíveis.</p>
                </div>
                <div className="page-intro-stamp"><strong>{ruleset.tierD.pax}</strong><span>PAX<br />DISPONÍVEIS</span></div>
              </div>
              <CharacterBuilder />
            </div>
          )}
        </div>

        <footer className="app-footer">
          <div><span className="footer-mark">BC</span><strong>BEYOND COMPANION</strong><span>GUIA RÁPIDO DIGITAL</span></div>
          <p>Projeto de fã, não oficial e sem vínculo com os detentores dos direitos de BEN 10: BEYOND.</p>
          <span className="footer-version">QUICKSTART V1 · {ruleset.source.pageCount} PÁGINAS</span>
        </footer>
      </main>
    </div>
  );
}

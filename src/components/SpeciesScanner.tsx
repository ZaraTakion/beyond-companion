import { useState } from 'react';
import speciesCatalog from '../../data/rulesets/quickstart-v1/species.json';

const species = speciesCatalog.species;

function pageLabel(pages: number[]): string {
  return pages.length > 1 ? `PDF · páginas ${pages.join(', ')}` : `PDF · página ${pages[0]}`;
}

export default function SpeciesScanner() {
  const [selectedId, setSelectedId] = useState(species[0].id);
  const selected = species.find((item) => item.id === selectedId) ?? species[0];
  const selectedIndex = species.findIndex((item) => item.id === selected.id);

  return (
    <section className="species-scanner" aria-labelledby="species-scanner-title">
      <div className="scanner-heading">
        <div>
          <div className="section-kicker">ATLAS DE CAMPO · QUICKSTART V1</div>
          <h2 id="species-scanner-title">Arquivo de espécies<span>.</span></h2>
          <p>Sete registros para explorar. Escolha um nome no índice e consulte sua ficha catalogada.</p>
        </div>
        <div className="scanner-count"><strong>{String(species.length).padStart(2, '0')}</strong><span>ESPÉCIES<br />NO QUICKSTART</span></div>
      </div>

      <div className="species-atlas-layout">
        <nav className="species-index" aria-label="Índice de espécies">
          <div className="species-index-heading">
            <span>ÍNDICE DO ARQUIVO</span>
            <strong>{String(species.length).padStart(2, '0')} ENTRADAS</strong>
          </div>
          <div className="species-index-list">
            {species.map((item, index) => (
              <button
                key={item.id}
                type="button"
                className={selected.id === item.id ? 'species-index-entry active' : 'species-index-entry'}
                onClick={() => setSelectedId(item.id)}
                aria-pressed={selected.id === item.id}
              >
                <span className="species-index-number">{String(index + 1).padStart(2, '0')}</span>
                <span className="species-index-copy">
                  <strong>{item.name}</strong>
                  <small>{item.homeworld}</small>
                </span>
                <span className="species-index-arrow" aria-hidden="true">↗</span>
              </button>
            ))}
          </div>
          <div className="species-index-foot">
            <span>FONTE</span>
            <strong>QUICKSTART V1</strong>
          </div>
        </nav>

        <article className="species-dossier" aria-live="polite">
          <div className="species-dossier-topline">
            <span>FICHA DE REGISTRO</span>
            <span>{pageLabel(selected.sourcePages)}</span>
          </div>
          <div className="species-dossier-title">
            <div>
              <div className="species-dossier-index">ENTRADA {String(selectedIndex + 1).padStart(2, '0')} / {String(species.length).padStart(2, '0')}</div>
              <h3>{selected.name}</h3>
            </div>
            <span className="species-dossier-stamp">CATALOGADO</span>
          </div>

          <div className="species-homeworld">
            <span>MUNDO NATAL</span>
            <strong>{selected.homeworld}</strong>
          </div>

          <div className="species-record-section species-aptitudes">
            <div className="species-record-label">EVOLUTIONARY APTITUDES</div>
            <div className="record-tags">{selected.aptitudes.map((aptitude) => <span key={aptitude}>{aptitude}</span>)}</div>
          </div>

          <div className="species-feature-grid">
            <section className="species-feature species-perception">
              <div className="species-record-label">UNIQUE PERCEPTION</div>
              <h4>{selected.uniquePerception.name}</h4>
              <p>{selected.uniquePerception.summary}</p>
            </section>
            <section className="species-feature species-complication">
              <div className="species-record-label">COMPLICATION</div>
              <h4>{selected.complication.name}</h4>
              <p>{selected.complication.summary}</p>
            </section>
          </div>

          <div className="species-record-section species-paths">
            <div className="species-paths-heading">
              <div className="species-record-label">EVOLUTIONARY PATHS</div>
              <span>{String(selected.paths.length).padStart(2, '0')} CAMINHOS</span>
            </div>
            <div className="species-path-list">
              {selected.paths.map((path, index) => (
                <div className="species-path-entry" key={path.name}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <strong>{path.name}</strong>
                </div>
              ))}
            </div>
          </div>
        </article>
      </div>

      <p className="scanner-source-note">Dados resumidos do catálogo Quickstart v1. Consulte as páginas indicadas para a redação completa e preserve as pendências de interpretação registradas na auditoria.</p>
    </section>
  );
}

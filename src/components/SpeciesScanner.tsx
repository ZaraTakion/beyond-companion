import { useState, type CSSProperties } from 'react';
import speciesCatalog from '../../data/rulesets/quickstart-v1/species.json';

const species = speciesCatalog.species;

function pageLabel(pages: number[]): string {
  return pages.length > 1 ? `PDF · páginas ${pages.join(', ')}` : `PDF · página ${pages[0]}`;
}

export default function SpeciesScanner() {
  const [selectedId, setSelectedId] = useState(species[0].id);
  const selected = species.find((item) => item.id === selectedId) ?? species[0];

  return (
    <section className="species-scanner" aria-labelledby="species-scanner-title">
      <div className="scanner-heading">
        <div>
          <div className="section-kicker">GUIA DE EXPLORAÇÃO · QUICKSTART V1</div>
          <h2 id="species-scanner-title">Catálogo de espécies<span>.</span></h2>
          <p>Escolha uma espécie e descubra os dados catalogados no Quickstart.</p>
        </div>
        <div className="scanner-count"><strong>{String(species.length).padStart(2, '0')}</strong><span>REGISTROS<br />DISPONÍVEIS</span></div>
      </div>

      <div className="scanner-layout">
        <div className="scanner-console">
          <div className="scanner-console-top"><span><i /> CATÁLOGO ABERTO</span><span>GUIA DE ESPÉCIES / 001</span></div>
          <div className="scanner-radar" role="group" aria-label="Selecionar espécie">
            <div className="radar-ring radar-ring-outer" />
            <div className="radar-ring radar-ring-middle" />
            <div className="radar-ring radar-ring-inner" />
            <div className="radar-cross radar-cross-horizontal" />
            <div className="radar-cross radar-cross-vertical" />
            <div className="radar-sweep" />
            <div className="radar-core"><span>BC</span><small>ALIEN<br />GUIDE</small></div>
            {species.map((item, index) => (
              <button
                key={item.id}
                type="button"
                className={selected.id === item.id ? 'scanner-orbit-node selected' : 'scanner-orbit-node'}
                style={{ '--node-angle': `${(360 / species.length) * index}deg` } as CSSProperties & { '--node-angle': string }}
                onClick={() => setSelectedId(item.id)}
                aria-pressed={selected.id === item.id}
                aria-label={`Consultar ${item.name}`}
              >
                <span className="scanner-node-number">{String(index + 1).padStart(2, '0')}</span>
                <strong>{item.name.slice(0, 2).toUpperCase()}</strong>
              </button>
            ))}
          </div>
          <div className="scanner-console-bottom"><span>ESCOLHA UMA ESPÉCIE</span><span>7 / 7 INDEXADOS</span></div>
        </div>

        <article className="scanner-record" aria-live="polite">
          <div className="record-topline"><span>FICHA DA ESPÉCIE</span><span>{pageLabel(selected.sourcePages)}</span></div>
          <div className="record-title-row">
            <div><div className="record-index">REGISTRO / {selected.id.toUpperCase()}</div><h3>{selected.name}</h3></div>
            <span className="record-status"><i /> CATALOGADO</span>
          </div>
          <div className="record-homeworld"><span>MUNDO NATAL</span><strong>{selected.homeworld}</strong></div>
          <div className="record-divider" />
          <div className="record-data-block">
            <div className="record-label">EVOLUTIONARY APTITUDES</div>
            <div className="record-tags">{selected.aptitudes.map((aptitude) => <span key={aptitude}>{aptitude}</span>)}</div>
          </div>
          <div className="record-data-block">
            <div className="record-label">UNIQUE PERCEPTION · {selected.uniquePerception.name}</div>
            <p>{selected.uniquePerception.summary}</p>
          </div>
          <div className="record-data-block record-complication">
            <div className="record-label">COMPLICATION · {selected.complication.name}</div>
            <p>{selected.complication.summary}</p>
          </div>
          <div className="record-paths">
            <div className="record-label">EVOLUTIONARY PATHS</div>
            <div>{selected.paths.map((path, index) => <span key={path.name}><b>{String(index + 1).padStart(2, '0')}</b>{path.name}</span>)}</div>
          </div>
        </article>
      </div>
      <p className="scanner-source-note">Dados resumidos do catálogo Quickstart v1. Consulte as páginas indicadas para a redação completa e preserve as pendências de interpretação registradas na auditoria.</p>
    </section>
  );
}

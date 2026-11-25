# Revisão geral e bateria de qualidade — 25/11/2026

## Escopo

A revisão cobre React, TypeScript, Vite, navegação e histórico, visão geral e atlas de espécies, Guia de Consulta, construtor Tier D, regras e domínio de personagem, ledger PAX, catálogos JSON, importação/exportação, impressão, acessibilidade, responsividade, E2E, workflow e documentação.

A fonte de conteúdo continua sendo exclusivamente o PDF Quickstart v1 fornecido pelo usuário. Esta revisão é de engenharia e interface; não amplia o conteúdo mecânico.

## Diagnóstico e correções aplicadas

A inspeção visual do navegador encontrou um defeito funcional na impressão: a folha era posicionada dentro do layout principal, cuja altura permanecia reservada mesmo quando os controles ficavam invisíveis. O PDF resultante tinha cinco páginas, com páginas finais vazias. A correção moveu a folha imprimível para `document.body` por React Portal e remove o `#root` do layout de impressão. O PDF verificado no preview passou a ter **duas páginas, ambas com conteúdo**, sem páginas extras em branco. Uma asserção E2E foi adicionada para proteger esse comportamento.

A execução #65 identificou violações reais de contraste na identidade da interface e em textos de apoio sobre superfícies claras, além de uma divergência entre o nome acessível e o texto visível do link de marca `.sidebar-brand`.

A inspeção ampliada do Guia e do Construtor encontrou ocorrências adicionais em estados mobile: opções do construtor, navegação do Guia, indicadores de estado, resumos e mensagens de validação. Os pontos foram corrigidos sem remover nem enfraquecer a regra axe.

Correções realizadas:

- Escurecimento de textos pequenos sobre superfícies claras em marca, atlas, cartões e indicadores, com combinações que ultrapassam 4,5:1.
- Ajuste de textos de apoio, navegação por seção e listas do Guia.
- Ajuste das descrições e indicadores do Construtor em cartões e painéis claros.
- Correção do nome acessível do link da marca: a etiqueta redundante foi removida para que o nome seja fornecido pelo texto visível.
- As varreduras axe passaram a acumular todas as violações das rotas inspecionadas antes de falhar, em vez de parar no primeiro problema.
- Cada rota de teste abre um documento novo e confirma que o item correto da navegação principal está ativo.
- As varreduras de contraste respeitam `prefers-reduced-motion: reduce`, evitando medir cores durante a animação transitória de entrada da página. O teste não ignora regras axe nem desativa a verificação.
- A exportação JSON agora é testada em round-trip: o arquivo é baixado, importado e o nome original é confirmado na ficha.

## Resultado final comprovado — GitHub Actions #77

- Execução: [Run #77 — Validate application](https://github.com/ZaraTakion/beyond-companion/actions/runs/45712266932)
- HEAD de aplicação e E2E validado: `a00c9c559b7e57c7f1ecf901c0f45f3beab8befb`
- Resultado geral: **success**.
- Instalação de dependências: aprovada; 101 pacotes instalados.
- `npm audit --audit-level=high`: aprovado.
- TypeScript (`npm run typecheck`): aprovado.
- Vitest + Testing Library: **13 arquivos, 53 testes aprovados, 0 falhas**.
- Build de produção: aprovado; Vite 8.3.8 concluiu o build.
- Instalação de Chromium: aprovada.
- Playwright/Chromium: **11 testes aprovados, 0 falhas**.

### Cobertura E2E e acessibilidade executada

- Navegação entre visão geral, Guia e Construtor.
- Pesquisa no Guia e troca de seção.
- Seleção de espécie e atualização do dossiê.
- Atributos efetivos e conteúdo da ficha em mídia de impressão.
- Exportação e importação JSON versionada em round-trip.
- Layout mobile.
- axe com tags WCAG 2 A, AA, 2.1 A e 2.1 AA nas três áreas principais, em desktop e nos viewports mobile de 320 e 390 px.
- Primeiro foco do teclado no link “Pular para o conteúdo”.
- Navegação por teclado entre as áreas usando Tab e Enter.
- Ausência de overflow horizontal em 320, 390, 768, 1024 e 1440 px.

O cenário de impressão confirma que a folha é um filho direto de `document.body`, que o `#root` fica fora do layout de impressão e que o documento não conserva a altura da interface. A inspeção manual do PDF no preview confirmou **2 páginas com conteúdo** (Identidade/atributos na primeira; Skills/Traits/equipamentos/ledger na segunda), sem páginas vazias adicionais. O cenário JSON confirma round-trip; a importação inválida preserva os dados atuais e exibe mensagem de erro.

## Histórico das execuções de correção

| Execução | Resultado E2E | Motivo observado |
|---|---:|---|
| #65 | 8 aprovados / 2 reprovados | Primeiras violações axe em contraste e nome acessível |
| #66 | 8 aprovados / 3 reprovados | Contraste adicional em opções/navegação e expectativa incorreta de nome de arquivo |
| #67 | 10 aprovados / 1 reprovado | Contraste em layouts mobile |
| #68 | 10 aprovados / 1 reprovado | Varredura durante transição visual e contraste residual |
| #69 | **11 aprovados / 0 reprovados** | Primeira bateria integral aprovada após as correções de acessibilidade |
| #70 | **11 aprovados / 0 reprovados** | Revalidação do HEAD anterior e dos documentos |
| #71–#72 | Canceladas | Commits intermediários de atualização documental; não contabilizados como falhas de teste |
| #73 | **11 aprovados / 0 reprovados** | Revalidação do commit de conteúdo `6350fcbe...` |
| #74 | **11 aprovados / 0 reprovados** | Revalidação do HEAD `6c09bb22...` |
| #75 | **11 aprovados / 0 reprovados** | Revalidação do HEAD `06fa6efd...` |
| #76 | 10 aprovados / 1 reprovado | Falha na asserção de posição por comparar coordenada do viewport; a medição foi corrigida para coordenada do documento |
| #77 | **11 aprovados / 0 reprovados** | Revalidação após a correção da asserção de impressão; TypeScript, 53 testes e build também aprovados |

A execução #69 foi a primeira integralmente aprovada após as correções. As execuções #70 e #73–#75 revalidaram os respectivos HEADs. A #76 falhou apenas pela expectativa de coordenada da nova asserção de impressão; a medição passou a considerar `window.scrollY` e a #77 aprovou os 11 cenários. As execuções anteriores permanecem registradas como histórico.

## Preview Vercel associado ao HEAD

- Projeto: `beyond-companion` (`prj_SEqxYVZeheAkX4ozcxjWFm4tVlXn`).
- Deployment: `dpl_66B489ZYYadaobMPj4fCBXJRJWBQ`, estado **READY**, target `preview`.
- Branch/commit confirmados pela API Vercel: `prototype/cartoon-sci-fi-v1` / `a00c9c559b7e57c7f1ecf901c0f45f3beab8befb`.
- [URL da branch Preview](https://beyond-companion-git-prototype-c-5a723b-zaras-projects-f0700f27.vercel.app).
- [URL única do deployment](https://beyond-companion-5srho0fms-zaras-projects-f0700f27.vercel.app).
- A raiz respondeu HTTP 200. A inspeção visual renderizada foi feita no navegador do desktop remoto Vercel; não se confunde com a checagem HTTP.

## Inspeção visual renderizada e acessibilidade manual

A revisão foi realizada no preview READY associado ao commit de aplicação, por Chromium em desktop remoto Vercel, nos viewports CSS:
- **1440 px:** visão geral, atlas, Guia e Construtor.
- **768 px:** navegação, cartões e formulários em tablet.
- **390 px e 320 px:** navegação compacta, atlas e Construtor em mobile.
- **720 px:** reflow complementar nos três espaços, sem overflow horizontal.

A visão geral e a seleção do atlas foram percorridas, incluindo os sete dossiês de espécies. As onze seções do Guia foram abertas individualmente: Espécies, Archetypes, Evolutionary Aptitudes, Skills, Traits, Armas e equipamentos, Regras básicas, Power-Ups, Squad e ameaças, Heroes prontos e Rush Hour in Undertown. A pesquisa sem resultados exibiu estado vazio e ação para limpar o filtro.

As cinco áreas do Construtor foram percorridas: Identidade, Attributes, Evolutionary Aptitudes, Skills e Traits, Weapons and Gear. Foram exercitados a ficha-resumo, os atributos derivados, o ledger PAX, estados de validação, seleção dinâmica de espécie e round-trip JSON. A importação inválida exibiu mensagem e manteve a ficha anterior.

Em 1440, 768, 390 e 320 px, `document.documentElement.scrollWidth` permaneceu igual à largura do viewport nas áreas verificadas. O fluxo de teclado foi conferido manualmente: o skip link aparece como primeiro destino, torna-se visível ao receber foco e salta para o conteúdo principal; os controles mostram indicador de foco. Os testes axe e de teclado permanecem cobertos no CI.

A exportação foi gerada como PDF no Chromium do preview e aberta no visualizador do navegador: **2 de 2 páginas continham conteúdo**, sem páginas em branco adicionais. A primeira página apresenta identidade, atributos e recursos; a segunda apresenta Skills, Traits, Weapons and Gear e ledger PAX.

## Limitações restantes

- Não foi executado teste com leitor de tela real.
- Não foi feita sessão formal de zoom de navegador a 200%; os viewports e o reflow de 720 px não substituem esse teste.
- A segunda leitura visual sistemática dos dados contra todas as páginas do PDF continua pendente.
- O repositório não contém `package-lock.json`; o workflow utiliza `npm install`, portanto as dependências não estão travadas por lockfile.
- A auditoria executada é `npm audit --audit-level=high`; não substitui revisão de segurança dedicada.
- A execução automatizada desta revisão ocorreu no GitHub Actions; não se declara execução local independente.

## Fidelidade e direitos

- O escopo continua limitado ao Quickstart v1.
- Nenhuma mecânica, espécie, custo, opção ou regra foi acrescentada por causa desta revisão.
- Nenhuma imagem ou ilustração foi gerada por IA ou adicionada nesta revisão.
- Não foram incorporadas capturas da série, artes oficiais, logotipos ou materiais do reboot de 2016.
- O aviso de projeto independente de fãs não é tratado como autorização para uso de propriedade intelectual.

## Estado do repositório

O PR #3 continua aberto e em rascunho, direcionado a `main`, sem merge. A branch `main` permaneceu intacta durante esta revisão.

# Revisão geral e bateria de qualidade — 25/11/2026

## Escopo

A revisão cobre React, TypeScript, Vite, navegação e histórico, visão geral e atlas de espécies, Guia de Consulta, construtor Tier D, regras e domínio de personagem, ledger PAX, catálogos JSON, importação/exportação, impressão, acessibilidade, responsividade, E2E, workflow e documentação.

A fonte de conteúdo continua sendo exclusivamente o PDF Quickstart v1 fornecido pelo usuário. Esta revisão é de engenharia e interface; não amplia o conteúdo mecânico.

## Diagnóstico e correções aplicadas

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

## Resultado final comprovado — GitHub Actions #69

- Execução: [Run #69 — Validate application](https://github.com/ZaraTakion/beyond-companion/actions/runs/45692211385)
- Commit de código validado: `b4b6b33e879868b69e77892e951b0c518b9a869b`
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

O cenário de impressão usa a emulação de mídia `print` do Chromium e confirma a visibilidade e o conteúdo da folha de personagem. O cenário JSON confirma que a ficha exportada pode ser reimportada e restaura os dados testados.

## Histórico das execuções de correção

| Execução | Resultado E2E | Motivo observado |
|---|---:|---|
| #65 | 8 aprovados / 2 reprovados | Primeiras violações axe em contraste e nome acessível |
| #66 | 8 aprovados / 3 reprovados | Contraste adicional em opções/navegação e expectativa incorreta de nome de arquivo |
| #67 | 10 aprovados / 1 reprovado | Contraste em layouts mobile |
| #68 | 10 aprovados / 1 reprovado | Varredura durante transição visual e contraste residual |
| #69 | **11 aprovados / 0 reprovados** | Bateria integral aprovada |

A execução #69 é a primeira execução integralmente aprovada após a série de correções. As execuções anteriores permanecem registradas como histórico e não são apresentadas como aprovadas.

## Limitações restantes

- A execução comprovada desta revisão ocorreu no GitHub Actions. Não há uma execução local independente confirmada nesta sessão.
- Não foi realizada inspeção visual humana em dispositivos físicos ou em navegadores desktop/tablet/mobile. O preview Vercel do PR foi reportado como **Ready**, mas isso não equivale a uma aprovação visual manual: [abrir preview](https://beyond-companion-git-prototype-c-5a723b-zaras-projects-f0700f27.vercel.app).
- Não foi executado teste com leitor de tela real nem avaliação manual de zoom/reflow.
- A emulação de mídia `print` verifica a folha e seus estilos, mas paginação, margens e resultado do PDF impresso ainda precisam de conferência visual.
- O repositório não contém `package-lock.json`; o workflow utiliza `npm install`, portanto as dependências não estão travadas por lockfile e a reprodução bit a bit do ambiente não está garantida.
- A auditoria executada é `npm audit --audit-level=high`; ela valida o limiar configurado pelo comando, não substitui revisão de segurança dedicada.
- A segunda leitura visual sistemática dos dados contra todas as páginas do PDF continua pendente.

## Fidelidade e direitos

- O escopo continua limitado ao Quickstart v1.
- Nenhuma mecânica, espécie, custo, opção ou regra foi acrescentada por causa desta revisão.
- Nenhuma imagem ou ilustração foi gerada por IA ou adicionada nesta revisão.
- Não foram incorporadas capturas da série, artes oficiais, logotipos ou materiais do reboot de 2016.
- O aviso de projeto independente de fãs não é tratado como autorização para uso de propriedade intelectual.

## Estado do repositório

O PR #3 continua aberto e em rascunho, direcionado a `main`, sem merge. A branch `main` permaneceu intacta. No momento da verificação, o PR estava marcado como mergeable e sem threads de revisão pendentes.

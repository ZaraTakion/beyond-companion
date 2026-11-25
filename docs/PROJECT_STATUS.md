# Estado do projeto — 25/11/2026

## Definição atual

**Beyond Companion é um Guia Rápido Digital baseado exclusivamente no PDF Quickstart v1 de BEN 10: BEYOND — The Roleplaying Game.** Não antecipa nem implementa regras do Core Rulebook completo.

## Repositório e revisão

- Repositório público: https://github.com/ZaraTakion/beyond-companion
- Branch de trabalho: `prototype/cartoon-sci-fi-v1`
- Pull request #3: https://github.com/ZaraTakion/beyond-companion/pull/3
- PR aberto, em rascunho, direcionado a `main` e não mesclado.
- A branch `main` permaneceu sem alterações nesta revisão.
- HEAD de aplicação e E2E validado: `a00c9c559b7e57c7f1ecf901c0f45f3beab8befb`, no [GitHub Actions #77](https://github.com/ZaraTakion/beyond-companion/actions/runs/45712266932). O commit documental posterior será registrado separadamente.
- Preview Vercel: deployment `dpl_66B489ZYYadaobMPj4fCBXJRJWBQ`, **READY**, target `preview`. [Abrir preview da branch](https://beyond-companion-git-prototype-c-5a723b-zaras-projects-f0700f27.vercel.app). [URL única do deployment](https://beyond-companion-5srho0fms-zaras-projects-f0700f27.vercel.app).
- Inspeção visual renderizada concluída com Chromium remoto em 1440, 768, 390 e 320 px; overview/atlas, onze seções do Guia e cinco áreas do Construtor foram percorridos. Detalhes em `docs/QA_REVIEW.md`.

## Entregue no front-end

- Direção visual autoral de caderno de campo sci-fi/cartoon, sem arte gerada, capturas da série, logos ou artes oficiais.
- Visão geral com aviso claro de projeto de fã independente.
- Atlas interativo com as sete espécies catalogadas e referências de páginas.
- Guia de consulta com onze seções, navegação por assunto, pesquisa na seção ativa e referências do PDF.
- Construtor Tier D em cinco etapas, com validação de escolhas, cálculos derivados e ledger de PAX.
- Importação validada e exportação manual de fichas JSON, com limite de arquivo e validação estrutural.
- Folha de personagem preparada para impressão via React Portal, isolada do layout interativo para evitar páginas vazias no PDF.
- Navegação por hash e histórico voltar/avançar.
- Layout responsivo, link para saltar ao conteúdo, estados de foco e respeito a movimento reduzido.

## Base de conteúdo

- Catálogos versionados para espécies, Archetypes, Aptitudes Grade 1, Skills, Traits, Weapons and Gear e Power-Ups.
- Regras de criação, testes, recursos, combate, dano, Conditions, Rescue, Interlude e Perspective Splice.
- Plumber Squad, Threat Archetypes, cinco personagens prontos e aventura introdutória.
- Domínio Tier D, validações e ledger PAX cobertos por testes automatizados.

## Validação técnica comprovada — GitHub Actions #77

Execução completa: [Run #77](https://github.com/ZaraTakion/beyond-companion/actions/runs/45712266932), commit de aplicação/E2E `a00c9c559b7e57c7f1ecf901c0f45f3beab8befb`.

- Instalação de dependências: aprovada (101 pacotes).
- `npm audit --audit-level=high`: aprovado.
- TypeScript: aprovado.
- Vitest + Testing Library: **13 arquivos, 53 testes aprovados, 0 falhas**.
- Build de produção: aprovado.
- Instalação de Chromium: aprovada.
- Playwright/Chromium: **11 testes aprovados, 0 falhas**.
- axe: aprovado nas três áreas principais, em desktop e em mobile 320/390 px.
- Teclado: link de salto como primeiro foco e navegação entre áreas aprovados.
- Overflow: aprovado em 320, 390, 768, 1024 e 1440 px.
- Impressão: correção validada por E2E e PDF manual no preview; 2 páginas com conteúdo, sem páginas extras em branco.
- JSON: exportação e reimportação em round-trip aprovadas.

A revisão corrigiu violações WCAG identificadas nas execuções anteriores, incluindo contrastes em componentes da visão geral, Guia e Construtor e o nome acessível do link da marca. A verificação axe permaneceu ativa durante todas as correções.

## Revisão visual concluída e pendências

A inspeção renderizada foi concluída no preview em desktop (1440 px), tablet (768 px) e mobile (390/320 px). A visão geral/atlas, as onze seções do Guia e as cinco áreas do Construtor foram percorridas. Busca, seleção de espécie, resumo, ledger PAX, validação, importação/exportação JSON e impressão foram testados. O reflow complementar em 720 px não apresentou overflow horizontal.

A ficha impressa foi verificada em PDF no visualizador Chromium: duas páginas, ambas com conteúdo. O bug de páginas extras vazias foi corrigido com React Portal e isolação do `#root` na mídia de impressão.

Pendências remanescentes:
- Leitor de tela real e zoom formal do navegador a 200%.
- Segunda auditoria visual sistemática dos dados, comparando resumos e referências com o PDF.
- Ausência de `package-lock.json`; CI utiliza `npm install`, sem dependências travadas.
- `npm audit` está configurado para o limiar `high`.
- Testes automatizados executados no GitHub Actions; não se declara execução local independente.

## Limites explícitos

- Não adicionar regras que não estejam no Quickstart v1.
- Não implementar progressão completa de Tier C, Grades 2–5 ou Tiers superiores.
- Não incorporar espécies, habilidades ou opções externas ao documento.
- Não iniciar companion completo, gestão de campanha, multiplayer, contas ou sincronização em nuvem.
- O construtor não mantém salvamento automático nem sincronização: o jogador exporta o JSON manualmente.
- Não incluir o PDF, imagens, logos ou transcrições extensas no repositório.
- Não usar material do reboot de 2016.

## Evolução posterior

Quando o Core Rulebook oficial estiver disponível e a fonte autorizada for obtida, o usuário e o projeto poderão definir uma nova etapa. O conteúdo será auditado e adicionado em outro ruleset; o pacote Quickstart v1 continuará preservado.

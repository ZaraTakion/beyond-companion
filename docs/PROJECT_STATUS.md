# Estado do projeto — 25/11/2026

## Definição atual

**Beyond Companion é um Guia Rápido Digital baseado exclusivamente no PDF Quickstart v1 de BEN 10: BEYOND — The Roleplaying Game.** Não antecipa nem implementa regras do Core Rulebook completo.

## Repositório e revisão

- Repositório público: https://github.com/ZaraTakion/beyond-companion
- Branch de trabalho: `prototype/cartoon-sci-fi-v1`
- Pull request #3: https://github.com/ZaraTakion/beyond-companion/pull/3
- Estado do PR: aberto, em rascunho e não mesclado em `main`.
- Fonte: PDF Quickstart v1 fornecido pelo usuário; o arquivo original não está armazenado no repositório.

## Entregue no front-end

- Direção visual autoral de caderno de campo sci-fi/cartoon, sem arte gerada, capturas da série, logos ou artes oficiais.
- Visão geral com aviso claro de projeto de fã independente.
- Atlas interativo com as sete espécies catalogadas e referências de páginas.
- Guia de consulta com onze seções, navegação por assunto e busca na seção selecionada.
- Construtor Tier D em cinco etapas, com validação de escolhas, cálculo derivado e ledger de PAX.
- Importação validada e exportação manual de fichas JSON, além de folha de impressão preparada para impressão ou salvamento como PDF pelo navegador.
- Navegação por hash, suporte ao histórico voltar/avançar, layout responsivo, link de salto, estados de foco e respeito à preferência por movimento reduzido.
- README sincronizado com as capacidades atuais.

## Base de conteúdo

- Catálogos versionados para espécies, Archetypes, Aptitudes Grade 1, Skills, Traits, Weapons and Gear e Power-Ups.
- Regras de criação, testes, recursos, combate, dano, Conditions, Rescue, Interlude e Perspective Splice.
- Plumber Squad, Threat Archetypes, cinco personagens prontos e aventura introdutória.
- Domínio Tier D e ledger PAX cobertos por testes unitários.

## Revisão técnica e validação — 25/11/2026

A revisão corrigiu a importação de JSON da ficha, os limites do ledger PAX, a apresentação das referências de página nas regras básicas e o retorno ao topo ao trocar de área. O teste de dano agora afirma explicitamente os cinco tipos do PDF: Elemental, Pulse, Magical, Physical e Psychic.

O front-end agora possui testes de componente para navegação, atlas de espécies, guia de consulta e construtor. A bateria executada no GitHub Actions foi:

- [Run #53](https://github.com/ZaraTakion/beyond-companion/actions/runs/45636588005), commit `79646a3871c921dc3f93a580870058d7e4003cd1`: concluída com sucesso.
- TypeScript: aprovado.
- Vitest + Testing Library: **13 arquivos, 52 testes aprovados, 0 falhas**.
- Build de produção: aprovado; Vite transformou 35 módulos.
- Dependências instaladas: 96 pacotes.

**Limite importante:** depois da run #53 foi acrescentado mais um teste de navegação/rolagem e foi adicionada uma suíte Playwright com seis cenários E2E. Esses testes ainda não têm uma execução CI comprovada no head atual. A workflow de navegador está versionada na branch do PR, mas não há execução CI registrada para a versão atual; portanto, os cenários Playwright permanecem sem comprovação.

Não foi feita inspeção visual manual em navegador real nos breakpoints desktop, tablet e celular. Não há projeto Vercel vinculado ao repositório/commit nem URL de preview confirmada.

## Pontos de manutenção pendentes

- O repositório ainda não contém `package-lock.json`; a instalação usa `npm install` e faixas de versão do `package.json`, não uma árvore de dependências travada.
- Não foi executada auditoria independente de vulnerabilidades das dependências.
- Os cenários Playwright foram escritos, mas ainda precisam de execução em Chromium após a workflow ser ativada no branch base ou num ambiente local com browser instalado.

## Limites explícitos

- Não adicionar regras que não estejam no Quickstart v1.
- Não implementar progressão completa de Tier C, Grades 2–5 ou Tiers superiores.
- Não incorporar espécies, habilidades ou opções externas ao documento.
- Não iniciar companion completo, gestão de campanha, multiplayer, contas ou sincronização em nuvem.
- O construtor não mantém salvamento automático nem sincronização: o jogador exporta o JSON manualmente.
- Não incluir o PDF, imagens, logos ou transcrições extensas no repositório.

## Evolução posterior

Quando o Core Rulebook oficial estiver disponível e a fonte autorizada for obtida, o usuário e o projeto poderão definir uma nova etapa. O conteúdo será auditado e adicionado em outro ruleset; o pacote Quickstart v1 continuará preservado.

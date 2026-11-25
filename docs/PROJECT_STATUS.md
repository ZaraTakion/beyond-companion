# Estado do projeto — 25/11/2026

## Definição atual

**Beyond Companion é um Guia Rápido Digital baseado exclusivamente no PDF Quickstart v1 de BEN 10: BEYOND — The Roleplaying Game.** Não antecipa nem implementa regras do Core Rulebook completo.

## Repositório e revisão

- Repositório público: https://github.com/ZaraTakion/beyond-companion
- Branch de trabalho: `prototype/cartoon-sci-fi-v1`
- Pull request #3: https://github.com/ZaraTakion/beyond-companion/pull/3
- PR aberto, em rascunho, direcionado a `main` e não mesclado.
- A branch `main` permaneceu sem alterações nesta revisão.
- HEAD validado integralmente: `5f70a68b2feae826dd34610567165cf7cd54af1e`, no [GitHub Actions #70](https://github.com/ZaraTakion/beyond-companion/actions/runs/45692698130).
- O preview Vercel atual não foi confirmado: a consulta por repositório/commit não encontrou um projeto vinculado e o acesso à URL antiga exige autorização da equipe. O status será reavaliado depois da autorização.

## Entregue no front-end

- Direção visual autoral de caderno de campo sci-fi/cartoon, sem arte gerada, capturas da série, logos ou artes oficiais.
- Visão geral com aviso claro de projeto de fã independente.
- Atlas interativo com as sete espécies catalogadas e referências de páginas.
- Guia de consulta com onze seções, navegação por assunto, pesquisa na seção ativa e referências do PDF.
- Construtor Tier D em cinco etapas, com validação de escolhas, cálculos derivados e ledger de PAX.
- Importação validada e exportação manual de fichas JSON, com limite de arquivo e validação estrutural.
- Folha de personagem preparada para impressão e salvamento como PDF pelo navegador.
- Navegação por hash e histórico voltar/avançar.
- Layout responsivo, link para saltar ao conteúdo, estados de foco e respeito a movimento reduzido.

## Base de conteúdo

- Catálogos versionados para espécies, Archetypes, Aptitudes Grade 1, Skills, Traits, Weapons and Gear e Power-Ups.
- Regras de criação, testes, recursos, combate, dano, Conditions, Rescue, Interlude e Perspective Splice.
- Plumber Squad, Threat Archetypes, cinco personagens prontos e aventura introdutória.
- Domínio Tier D, validações e ledger PAX cobertos por testes automatizados.

## Validação técnica comprovada — GitHub Actions #70

Execução completa: [Run #70](https://github.com/ZaraTakion/beyond-companion/actions/runs/45692698130), HEAD `5f70a68b2feae826dd34610567165cf7cd54af1e`.

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
- Impressão: folha verificada na emulação de mídia `print`.
- JSON: exportação e reimportação em round-trip aprovadas.

A revisão corrigiu violações WCAG identificadas nas execuções anteriores, incluindo contrastes em componentes da visão geral, Guia e Construtor e o nome acessível do link da marca. A verificação axe permaneceu ativa durante todas as correções.

## Pendências e limitações

- Não foi feita inspeção visual manual em desktop/tablet/mobile. A URL previamente informada ainda não foi confirmada como deployment do HEAD atual; o Vercel exige autorização de equipe para consultar a implantação e abrir o browser. A avaliação visual segue pendente.
- Leitor de tela real e zoom/reflow precisam de avaliação manual.
- A paginação final da ficha em PDF/impresso precisa de revisão visual.
- A segunda auditoria visual sistemática dos dados, comparando todos os resumos e referências com o PDF aberto, permanece pendente.
- Não existe `package-lock.json`; CI utiliza `npm install`, e a árvore de dependências não está fixada.
- A auditoria de dependências confirmada usa o limiar `high` do npm audit.
- A validação desta sessão foi executada no GitHub Actions; não se declara execução local.

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

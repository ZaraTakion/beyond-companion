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

## Validação

- GitHub Actions, [run #38](https://github.com/ZaraTakion/beyond-companion/actions/runs/45624591286), no commit `9d388b4cd765acf04bec81e8e6cbbba02f849199`: aprovado.
- TypeScript: aprovado.
- Testes unitários: 8 arquivos, 32 testes aprovados.
- Build de produção: aprovado; Vite transformou 34 módulos.
- Status Vercel vinculado ao commit: sucesso.
- Não foi executado E2E de navegador nem inspeção visual manual em desktop, tablet e celular. Essas verificações continuam separadas da cobertura automatizada.

## Limites explícitos

- Não adicionar regras que não estejam no Quickstart v1.
- Não implementar progressão completa de Tier C, Grades 2–5 ou Tiers superiores.
- Não incorporar espécies, habilidades ou opções externas ao documento.
- Não iniciar companion completo, gestão de campanha, multiplayer, contas ou sincronização em nuvem.
- O construtor não mantém salvamento automático nem sincronização: o jogador exporta o JSON manualmente.
- Não incluir o PDF, imagens, logos ou transcrições extensas no repositório.

## Evolução posterior

Quando o Core Rulebook oficial estiver disponível e a fonte autorizada for obtida, o usuário e o projeto poderão definir uma nova etapa. O conteúdo será auditado e adicionado em outro ruleset; o pacote Quickstart v1 continuará preservado.

# Beyond Companion — Guia Rápido Digital

Guia de consulta digital, não oficial, baseado **exclusivamente no PDF Quickstart v1 de BEN 10: BEYOND — The Roleplaying Game** fornecido pelo usuário.

## Objetivo

Transformar o conteúdo do Quickstart em uma referência digital clara e fácil de consultar. Nesta etapa, o produto implementa somente o que está presente nesse PDF. Não estamos construindo ainda um companion completo para o livro oficial, nem adicionando regras de outras versões, wikis ou do universo de Ben 10.

O nome Beyond Companion identifica o projeto; seu escopo atual é um **Guia Rápido Digital do Quickstart v1**.

## Identidade independente e aviso

Beyond Companion é um projeto independente, feito por fãs, e não um produto oficial. O site organiza o Quickstart v1 de BEN 10: BEYOND — The Roleplaying Game. Não possui vínculo, patrocínio ou aprovação da Warner Bros. Discovery, Cartoon Network ou dos respectivos titulares de direitos.

BEN 10, seus personagens, nomes, marcas e materiais oficiais pertencem aos seus respectivos titulares. O aviso de independência esclarece a natureza do projeto, mas **não concede autorização para reproduzir imagens, logotipos, capturas de episódios, ilustrações ou outros materiais protegidos**. Cada asset externo precisa de licença compatível ou autorização documentada.

A referência estética é a atmosfera da série animada original de BEN 10 (2005). O reboot de 2016 permanece fora da direção visual e não será utilizado.

## Dentro do escopo atual

- Consultar as regras, tabelas, opções e exemplos que aparecem no PDF.
- Navegar pelo catálogo de espécies, Archetypes, Evolutionary Aptitudes, Skills, Traits, Weapons and Gear e Power-Ups presentes no documento.
- Consultar regras de criação Tier D e validar compras de 30 PAX.
- Consultar as regras de testes, combate, dano, Conditions, Rescue Scenes, Interludes e recursos incluídos no Quickstart.
- Consultar Plumber Squad, Threat Archetypes, personagens prontos e a aventura introdutória.
- Exibir referências às páginas do PDF e indicar pontos ambíguos sem inventar uma resolução.
- Oferecer uma interface legível, acessível e responsiva.

## Fora do escopo por enquanto

- Regras, espécies, poderes, classes, opções ou progressões que não estejam no Quickstart v1.
- Implementação completa do Core Rulebook.
- Tier C como modo completo de criação e progressão, Grades 2–5 ou Tiers superiores. O Quickstart pode mencionar esses elementos, mas não traz todas as regras necessárias.
- Ferramentas adicionais de campanha, multiplayer, contas, nuvem ou automação que não sejam necessárias para representar o PDF.
- Conteúdo criado a partir de wikis, da série, de outros RPGs ou de material não fornecido como fonte autorizada.

## Quando o livro oficial completo estiver disponível

O escopo será reavaliado nessa ocasião. As regras novas entrarão em um pacote de regras separado e versionado, após obtenção e conferência da fonte autorizada. O Quickstart v1 continuará preservado como referência histórica; não será sobrescrito nem misturado com o material novo.

## Fonte e fidelidade

A fonte atual é o PDF Quickstart v1 fornecido pelo usuário e não incluído neste repositório. Cada entrada de regra deve manter referência de página. Resumos mecânicos não devem ser confundidos com transcrições literais. Incertezas permanecem marcadas como pendentes.

O repositório não inclui o PDF, ilustrações, logotipos ou transcrições extensas. Antes de redistribuir material derivado, verificar as permissões aplicáveis.

## Stack atual

- React, TypeScript e Vite.
- JSON versionado para o catálogo do Quickstart.
- Funções TypeScript para cálculos e validações Tier D.
- Vitest para domínio, dados e lógica de negócio.
- Testing Library e jsdom para testes de integração dos componentes React.
- Playwright para testes E2E em Chromium.
- axe-core/Playwright para verificações automatizadas WCAG 2.1 A/AA.
- Execução da interface sem backend, contas ou serviços pagos.

## Executar localmente

Requisitos: Node.js 22.13+ e npm.

```bash
npm install
npm run dev
```

Verificações automatizadas:

```bash
npm audit --audit-level=high
npm run typecheck
npm test
npm run build
npx playwright install --with-deps chromium
npm run test:e2e
```

A suíte Playwright executa navegação, pesquisa, atlas, Construtor, impressão, exportação/importação JSON, acessibilidade e overflow responsivo. A workflow do GitHub Actions executa essas etapas em sequência.

## Estrutura

```text
src/                         interface, domínio e testes
data/rulesets/quickstart-v1/  dados resumidos e versionados do PDF
docs/                         produto, arquitetura, roadmap e status
docs/decisions/               decisões arquiteturais
docs/rules-audit/              inventário, auditoria e pendências
```

## Estado da interface

A branch de redesign entrega uma interface responsiva com três áreas:

- **Visão geral:** entrada editorial, aviso de independência e atlas interativo das espécies.
- **Guia de consulta:** onze seções catalogadas, referências de páginas e busca dentro da seção ativa.
- **Construtor Tier D:** cinco etapas, validação de escolhas, ledger de PAX e resumo dos atributos derivados.

Também estão disponíveis navegação por URL (hash), histórico do navegador, exportação e importação manual de fichas JSON e folha de impressão que pode ser salva como PDF pelo navegador. A importação aceita o formato versionado gerado pelo próprio aplicativo. O aplicativo não mantém salvamento automático, não sincroniza dados com servidor e não exige conta.

## Estado de QA confirmado

A execução mais recente integralmente aprovada desta revisão é [GitHub Actions #73](https://github.com/ZaraTakion/beyond-companion/actions/runs/45693824877), no HEAD `6350fcbeef344ee45194aa6acc2d016446791dc3`:

- `npm audit --audit-level=high`: aprovado.
- TypeScript: aprovado.
- Vitest: **13 arquivos e 53 testes aprovados**.
- Build de produção: aprovado.
- Playwright/Chromium: **11 testes aprovados**.
- axe: aprovado nas páginas principais em desktop e mobile 320/390 px.
- Teclado e overflow em 320, 390, 768, 1024 e 1440 px: aprovados.
- Impressão em mídia simulada e exportação/importação JSON em round-trip: aprovadas.

O PR #3 continua aberto em rascunho e não foi mesclado. A branch `main` não foi alterada nesta revisão. O preview está confirmado **READY** e vinculado ao HEAD atual `6350fcbeef344ee45194aa6acc2d016446791dc3`: [abrir preview da branch](https://beyond-companion-git-prototype-c-5a723b-zaras-projects-f0700f27.vercel.app). [URL única do deployment](https://beyond-companion-g0372xlg6-zaras-projects-f0700f27.vercel.app). A raiz respondeu HTTP 200; isso não substitui avaliação visual renderizada.

**Ainda pendente:** inspeção visual renderizada em desktop/tablet/mobile; testes com leitor de tela real e zoom/reflow; conferência da paginação real do PDF impresso; e segunda auditoria visual do conteúdo contra o PDF. O Chromium disponível no ambiente não consegue acessar o host externo; a sessão desktop Vercel pode gerar cobrança e não foi iniciada sem autorização explícita. O repositório não possui `package-lock.json`, então o workflow usa `npm install` e não garante dependências travadas.

Contribuições devem citar a página do Quickstart e distinguir texto da fonte, resumo e interpretação.

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
- Vitest para testes unitários.
- Execução local, sem necessidade de backend ou serviço pago.

## Executar localmente

Requisitos: Node.js 22+ e npm.

```bash
npm install
npm run dev
```

Verificações automatizadas:

```bash
npm run typecheck
npm test
npm run build
npx playwright install chromium
npm run test:e2e
```

A bateria completa pode ser executada em sequência com `npm run test:all`. A suíte inclui testes de domínio e dados (Vitest), testes de componentes React (Testing Library) e fluxos reais no Chromium (Playwright).

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

A validação automatizada mais recente deve ser consultada no [workflow do GitHub Actions](https://github.com/ZaraTakion/beyond-companion/actions). A suíte cobre TypeScript, testes unitários e build; inspeção visual manual e testes E2E de navegador devem ser registrados separadamente.

Contribuições devem citar a página do Quickstart e distinguir texto da fonte, resumo e interpretação.

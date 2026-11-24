# Beyond Companion

Companion digital e **não oficial** para **BEN 10: BEYOND — The Roleplaying Game**. O desenvolvimento começa pelo Quickstart v1 fornecido pelo usuário, com arquitetura preparada para incorporar revisões autorizadas sem misturar versões de regras.

> **Estado:** fundação do produto, inventário inicial de regras e protótipo de catálogo. Ainda não é uma implementação completa do sistema nem substitui o livro ou a decisão do Galvan Magister (GM).

**Repositório:** https://github.com/ZaraTakion/beyond-companion

## Objetivos

- Criador de personagens com orçamento PAX e validação de regras.
- Ficha digital para acompanhar atributos, Energy, Defense, Initiative, ataques, Conditions e recursos.
- Compêndio pesquisável com páginas de referência.
- Laboratório de builds para calcular custos e sinalizar interações ambíguas.
- Ferramentas de combate e GM em fases posteriores.
- Acessibilidade desde o início: navegação por teclado, contraste, linguagem clara, redução de carga cognitiva e layouts responsivos.

## Fonte e fidelidade

A fonte inicial de regras é o PDF `ben10-beyond-rpg-quickstart-v1.pdf`, fornecido pelo usuário e **não incluído neste repositório**. O inventário em `docs/rules-audit/quickstart-v1-inventory.md` registra a cobertura estrutural e o catálogo inicial; `docs/rules-audit/open-questions.md` registra ambiguidades a resolver antes da automação.

Nenhuma regra da série, de wikis, de outros jogos ou de materiais não fornecidos deve ser apresentada como regra oficial. Cada registro de regra deve guardar sua versão e referência de página. Incertezas devem permanecer identificadas como pendentes.

## Direitos e independência

Este é um projeto comunitário não oficial e não afiliado, patrocinado ou endossado pela Cartoon Network, Warner Bros. Discovery ou D20 Culture. BEN 10, personagens, marcas, ilustrações e textos do jogo pertencem aos respectivos titulares.

O Quickstart contém aviso de direitos que restringe sua reprodução e distribuição. Por isso, este repositório não inclui o PDF, ilustrações, logotipos nem transcrições extensas. O projeto ainda não concede licença aberta para seu código ou conteúdo: consulte `LICENSE`. Antes de redistribuir material derivado ou publicar conteúdo de regras em escala, verificar as permissões aplicáveis.

## Stack inicial

- React + TypeScript + Vite para aplicação web estática.
- JSON versionado para pacotes de regras.
- Funções puras TypeScript para cálculos e validações.
- Vitest para testes unitários.
- Persistência local primeiro; backend e contas ficam fora do MVP inicial.

## Executar localmente

Requisitos: Node.js 22+ e npm.

```bash
npm install
npm run dev
```

Verificações:

```bash
npm run typecheck
npm test
npm run build
```

## Estrutura

```text
src/                         aplicação React, domínio e testes
data/rulesets/                pacotes de regras versionados
docs/                         produto, arquitetura, roadmap e auditoria
docs/decisions/               decisões arquiteturais (ADRs)
docs/rules-audit/             inventário e questões pendentes
```

## Estado do projeto

Seis passagens de auditoria estruturaram o Quickstart: 7 espécies, 5 Archetypes, 26 Aptitudes e 77 habilidades Grade 1; 12 Skills, 12 Traits, 7 opções de compra de gear e 4 recompensas; regras nucleares, Power-Ups, Squad/Threats, cinco personagens prontos e a aventura introdutória. Os dados são resumos rastreáveis, não uma transcrição integral. A segunda leitura visual, conferência cruzada e execução dos testes ainda estão pendentes. Consulte `docs/ROADMAP.md` e `docs/rules-audit/`.

Contribuições que alterem regras devem citar a página da fonte e distinguir fatos transcritos, interpretação e house rules. Consulte `CONTRIBUTING.md`.

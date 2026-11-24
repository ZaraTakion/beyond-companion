# Arquitetura — Beyond Companion

## Decisão estrutural

Aplicação web estática, orientada a dados e local-first. A interface não contém regras codificadas diretamente; ela consome pacotes de regras versionados e chama funções puras do domínio.

## Camadas

1. **Presentation (`src/`)** — React, formulários, navegação, estados visuais e mensagens acessíveis.
2. **Application** — casos de uso: criar rascunho, adicionar compra, validar ficha, calcular resumo e salvar/carregar personagem.
3. **Domain (`src/domain/`)** — tipos, regras de cálculo, invariantes de Tier, PAX, ações e condições. Sem dependência de React ou navegador.
4. **Rulesets (`data/rulesets/<id>/`)** — dados versionados de espécies, Archetypes, aptidões, custos, habilidades, Traits, equipamentos e regras-base.
5. **Persistence** — IndexedDB ou localStorage atrás de uma interface `CharacterRepository`; iniciar simples e migrar sem alterar o domínio.

## Regras como dados

Cada ruleset deve ter:
- `id` imutável e `version` legível;
- identificação da fonte e data de verificação;
- conteúdo separado por entidade;
- páginas de origem;
- estado de confiança: `confirmed`, `needs-review`, `house-rule` ou `homebrew`;
- notas de interpretação e changelog.

Personagens armazenam `rulesetId` e `rulesetVersion`. Uma atualização não deve alterar silenciosamente fichas antigas. Migrações serão explícitas e reversíveis.

## Domínio inicial

Entidades previstas: `Character`, `Ruleset`, `Species`, `Archetype`, `EvolutionaryAptitude`, `EvolutionaryPath`, `Skill`, `Trait`, `Equipment`, `Purchase`, `AttributeBlock`, `ConditionTrack`, `CombatState` e `Encounter`.

`Character` é um agregado. `PaxLedger` registra compras e custos; o saldo é derivado, não digitado manualmente. `DerivedStats` é calculado a partir do Tier, atributos, espécie, Archetype, aptidões, equipamento e efeitos ativos.

## Cálculos e validação

- Funções puras sem estado global.
- Validadores devolvem erros estruturados com código, mensagem e referência.
- Regras incertas não viram automatismos; a UI apresenta a pendência e deixa a decisão para o GM.
- Testes de regressão incluem exemplos oficiais do Quickstart, sem reproduzir arte ou blocos extensos de texto.

## Stack inicial

- React, TypeScript e Vite.
- Vitest para testes unitários.
- ESLint e TypeScript strict.
- CSS próprio com tokens de design e componentes acessíveis.
- Sem backend no MVP. Sem dependência de assinatura paga.

## Segurança e privacidade

- Dados salvos localmente por padrão.
- Nenhuma telemetria ou conta no MVP.
- Exportação explícita pelo usuário.
- Dados de homebrew separados dos pacotes oficiais.
- Nenhum segredo ou chave de API no frontend.

## Deploy

A aplicação será estática. A plataforma de hospedagem permanece uma decisão futura, comparando opções gratuitas vigentes no momento da publicação. Não ativar cobrança, trial pago, pay-as-you-go ou recursos pagos.

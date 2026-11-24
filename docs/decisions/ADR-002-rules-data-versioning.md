# ADR-002 — Regras como pacotes de dados versionados

- Status: Aceita.
- Contexto: o Quickstart é incompleto em relação ao livro-base e pode receber revisões.
- Decisão: regras ficam em `data/rulesets/<id>/`, com identificador imutável, fonte, páginas, estado de confiança e changelog. Cada personagem referencia a versão exata do ruleset.
- Consequências: atualizações não mudam fichas antigas automaticamente; cálculos ficam em funções puras; mudanças de regra podem ter testes de regressão.
- Alternativas rejeitadas: regras hardcoded em componentes React ou sobrescrever uma única versão de catálogo.

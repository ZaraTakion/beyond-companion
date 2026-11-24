# ADR-005 — Modelo de domínio de personagem Tier D

- Status: Aceita para o MVP do Quickstart.
- Contexto: a ficha precisa validar escolhas, PAX e cálculos derivados sem depender de componentes React.
- Decisão:
  - CharacterDraft armazena escolhas explícitas: espécie, Archetype, Path, duas Archetype Abilities, Attributes base, Energy comprado, Aptitude Grades, Skills, Traits, gear e afiliação Plumber.
  - PAX Ledger deriva custos por origem, distinguindo compras pagas de concessões gratuitas.
  - Estatísticas derivadas são funções puras de dados do personagem.
  - Validação devolve códigos de erro estáveis e mensagens para interface.
  - Tier D aplica 30 PAX, atributo base máximo +3, máximo Grade 1 e duas Archetype Abilities.
  - Aptitudes elegíveis são as da espécie mais Omni-Tech Arsenal; Creative Uses não equivalem a Grade 1 comprado.
- Consequências: toda regra de criação pode ser testada sem React; a UI pode apresentar erros junto à escolha responsável; futuras versões exigem outro ruleset/validator sem sobrescrever fichas antigas.
- Limitações conhecidas: o cálculo inicial de iniciativa inclui apenas bônus passivos explicitamente listados no Quickstart; bônus condicionais (como Aerial Touchdown) devem ser calculados no contexto da cena.

# ADR-001 — Stack inicial

- Status: Aceita para o MVP.
- Contexto: construir companion de ficha de RPG com foco em velocidade de iteração, baixo custo e hospedagem estática.
- Decisão: React + TypeScript + Vite; testes unitários com Vitest; JSON versionado para regras; CSS com tokens próprios.
- Consequências: interface independente de backend; fácil execução local; domínio pode ser testado isoladamente. Persistência começa local-first.
- Não objetivos: SSR, backend, contas, serviços pagos ou plataforma multiplayer no MVP.

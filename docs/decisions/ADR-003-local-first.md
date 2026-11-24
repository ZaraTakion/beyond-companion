# ADR-003 — Local-first no MVP

- Status: Aceita para o MVP.
- Contexto: evitar contas, custos operacionais e dependência de serviços pagos durante validação do produto.
- Decisão: fichas permanecem localmente no navegador; exportação/importação JSON explícita. Backend e sincronização ficam para depois de validar demanda.
- Consequências: sem colaboração em tempo real na primeira versão; menor superfície de segurança e operação; funciona offline após carregamento quando PWA for adicionada.

## ADR-002 — Persistência local e ausência de backend remoto

- **Status:** Aceita
- **Data:** 24/11/2026
- **Escopo:** Guia Rápido Digital do Quickstart v1

### Contexto

O produto atual é uma referência digital estática com um construtor de personagem Tier D. Não há requisitos de contas, colaboração, multiplayer, sincronização, campanha compartilhada ou dados remotos. Um backend adicionaria hospedagem, operação, superfície de ataque e manutenção sem resolver uma necessidade do escopo aprovado.

### Decisão

Manter a aplicação como frontend estático e persistir o rascunho ativo no armazenamento local do navegador (localStorage). Fornecer exportação e importação JSON com schema e versão explícitos, além do identificador do ruleset ben10-beyond-quickstart-v1.

### Consequências

- O usuário não precisa criar conta nem fornecer dados a um servidor.
- O rascunho é recuperado no mesmo navegador e origem.
- O armazenamento do navegador pode ser limpo ou removido; backups JSON são a forma portátil de preservação.
- Arquivos de backup incompatíveis ou estruturalmente inválidos são rejeitados.
- Alterações futuras no formato exigem migração explícita ou incremento da versão do schema.
- Sincronização remota só poderá ser proposta após nova decisão de produto e avaliação de privacidade, segurança e custo.

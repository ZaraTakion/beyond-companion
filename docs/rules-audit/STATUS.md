# Status da auditoria do Quickstart v1

## Cobertura estruturada

| Área | Resultado | Referência |
|---|---|---|
| Mapa de páginas | 1–76, organizado por seção | `quickstart-v1-inventory.md` |
| Espécies | 7 espécies, Complications, Unique Perceptions e Paths | `species.json` |
| Archetypes | 5 arquétipos e 20 habilidades | `archetypes.json` |
| Evolutionary Aptitudes | 26 aptidões, 77 entradas Grade 1 e custos PAX | `aptitudes.json` |
| Skills | 12 Skills e 36 benefícios | `skills.json` |
| Traits | 8 Basic e 4 Intermediary | `traits.json` |
| Weapons and Gear | 7 opções de compra e 4 recompensas de aventura | `gear.json` |
| Regras nucleares | criação, Tests, recursos, combate, dano, condições, Rescue, Interlude, Squad Bonding e Perspective Splice | `core-rules.json` |
| Power-Ups | 5 perfis e regras comuns | `power-ups.json` |
| Squad e Threat Archetypes | Plumber Squad e 3 Threat Archetypes | `squad-threats.json` |
| Personagens prontos | 5 fichas de referência com estatísticas e auditoria PAX | `pregenerated-heroes.json` |
| Aventura introdutória | 3 Truths, locais, clocks, objetivos, ameaças e recompensas | `adventure-rush-hour.json` |

## Estado

- A primeira estruturação das áreas principais do Quickstart foi concluída em seis passes.
- Os dados publicados são resumos mecânicos em português, com referências de página. Eles não são uma transcrição integral nem substituem a consulta ao PDF.
- A validação atual é de integridade e organização dos dados; testes foram adicionados ao projeto, mas ainda não foram executados em um ambiente Node/npm nesta sessão.
- O catálogo de Creative Uses ainda precisa de revisão e cobertura uniforme para todas as Aptitudes.
- A segunda leitura visual e a conferência cruzada com todos os exemplos de ficha/aventura permanecem pendentes.

## Rulings e pontos abertos

1. Molecular Phasing exclui ataques físicos, mas o Quickstart não esclarece se ataques Elementais podem ocorrer durante Phasing.
2. A reconstrução da ficha de Tikk deixa 3 PAX não alocados a partir das compras explicitamente exibidas; o dado é preservado como sobra, sem inventar uma compra.
3. As folhas prontas exibem estatísticas e algumas aquisições, mas não apresentam um ledger completo de todas as compras.
4. Regras de Tier C e Grade 2+ são apenas parcialmente citadas e remetidas ao Core Rulebook.

## Critério para iniciar o criador Tier D

- Verificar as entradas que o criador vai oferecer (espécies, Archetypes, aptitudes Grade 1, Skills, Traits e gear) numa segunda leitura.
- Definir schema final de Character e PaxLedger.
- Implementar os cálculos em funções puras.
- Testar as cinco fichas prontas como fixtures; qualquer diferença deve ser registrada como regra pendente ou correção justificada por página.

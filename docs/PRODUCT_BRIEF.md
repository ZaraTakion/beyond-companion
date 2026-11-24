# Product Brief — Beyond Companion

## Visão

Oferecer uma ferramenta digital clara e confiável para criar, consultar e administrar personagens de BEN 10: BEYOND. A referência de experiência é a conveniência de construtores de ficha como Fichas de Nimb; a implementação, o modelo de dados e a identidade visual serão próprios.

## Usuários e necessidades

1. **Jogador:** quer montar um personagem sem calcular PAX, atributos e recursos manualmente.
2. **Jogador em sessão:** quer localizar rapidamente uma habilidade, verificar custos e acompanhar condições.
3. **Galvan Magister (GM):** quer consultar regras, validar personagens e futuramente preparar ameaças, cenas e encontros.
4. **Responsável pelo conteúdo:** precisa atualizar regras sem alterar código de interface e sem apagar fichas antigas.

## Princípios de produto

- Fidelidade rastreável: cada elemento de regra tem pacote de versão e página de origem.
- Nenhuma inferência silenciosa: lacunas ou conflitos são apresentados como pendências.
- Local-first no MVP: a ficha funciona no navegador sem conta ou serviço pago.
- Separação entre regra oficial, regra da mesa e homebrew.
- Acessibilidade e redução da carga cognitiva desde o primeiro componente.
- Privacidade por padrão: dados pessoais do personagem permanecem no dispositivo até o usuário optar por exportar/compartilhar.

## Escopo do MVP

### Incluído
- Selecionar versão de regras (Quickstart v1).
- Consultar as 7 espécies, 5 Archetypes e catálogo inicial de aptidões.
- Criar rascunho de personagem Tier D.
- Distribuir atributos e compras com orçamento de 30 PAX.
- Aplicar limites: atributo base máximo +3 no Tier D; máximo Grade 1 para Aptitudes.
- Calcular Energy, Defense, Initiative, Attack Bonus e Tier Die a partir das regras disponíveis.
- Exibir página de referência e avisos de interpretação.
- Salvar e reabrir rascunhos localmente em iterações seguintes.

### Fora do MVP
- Contas, autenticação, sincronização em nuvem e multiplayer.
- Plataforma completa de combate e automação de turnos.
- Ferramentas avançadas do GM e biblioteca de NPCs/adversários.
- Progressão para Tier C+ e Grade 2+, enquanto o conteúdo necessário não estiver disponível em fonte autorizada.
- Importação ou redistribuição do PDF, ilustrações e logotipos oficiais.
- Homebrew misturado ao catálogo oficial.

## Requisitos funcionais

- RF-01: o usuário pode escolher um ruleset disponível.
- RF-02: o usuário pode escolher uma espécie e um Archetype.
- RF-03: o sistema concede as opções gratuitas da espécie e exige um Evolutionary Path.
- RF-04: o sistema permite selecionar duas Archetype Abilities no Tier D.
- RF-05: o sistema calcula o PAX gasto por categoria e impede exceder o orçamento.
- RF-06: o sistema valida os limites do Tier D e exibe a origem dos limites.
- RF-07: o sistema mostra resumo da ficha e derivações (Energy, Defense, Initiative, Attack Bonus e Tier Die).
- RF-08: regras e escolhas são associadas a uma versão imutável do pacote de regras.
- RF-09: qualquer regra com pendência de interpretação exibe aviso e não é aplicada como regra automática sem política explícita.

## Requisitos não funcionais

- RNF-01: funcionamento local sem conta no MVP.
- RNF-02: acessível por teclado, com foco visível e rótulos programáticos.
- RNF-03: respeitar preferência por movimento reduzido.
- RNF-04: conteúdo legível em telas pequenas e com zoom de 200%.
- RNF-05: cálculos de regra em funções puras, determinísticas e testadas.
- RNF-06: pacote de regras validado por schema e versionado.
- RNF-07: não exigir serviço pago para desenvolvimento ou execução local.

## Métricas de aceite do MVP

- Um personagem Tier D válido pode ser criado sem exceder 30 PAX.
- Cenários de referência calculam o mesmo resultado esperado que o PDF.
- Testes cobrem limites, compras gratuitas, custos e cálculos derivados.
- Nenhum texto de regra exibido sem página de referência no catálogo oficial.
- A interface pode ser utilizada apenas com teclado.

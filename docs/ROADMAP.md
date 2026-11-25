# Roadmap — Guia Rápido Digital (Quickstart v1)

## Regra de escopo

Até a disponibilização e conferência do Core Rulebook oficial, o projeto implementa **somente o conteúdo presente no PDF Quickstart v1 fornecido pelo usuário**. Não adicionar regras de outras fontes, extrapolações ou funcionalidades de companion completo.

## Fase 0 — Inventário e auditoria do PDF
- [x] Identificar o Quickstart v1 como fonte única.
- [x] Criar inventário de seções e páginas.
- [x] Catalogar espécies, Archetypes e Evolutionary Aptitudes Grade 1.
- [x] Catalogar Skills, Traits e Weapons and Gear.
- [x] Catalogar regras de criação, testes, recursos, combate, dano, Conditions, Rescue e Interlude.
- [x] Catalogar Power-Ups, Fuse Bots, Squad e Threat Archetypes.
- [x] Registrar os cinco personagens prontos.
- [x] Estruturar a aventura introdutória e seus componentes mecânicos.
- [ ] Fazer segunda leitura visual/cross-check de todos os dados.
- [ ] Conferir ambiguidades e registrar rulings sem apresentá-los como texto oficial.

## Fase 1 — Guia de consulta
- [x] Criar o catálogo de dados do Quickstart com referências de página.
- [x] Criar navegação inicial por espécies, Archetypes e Aptitudes.
- [x] Completar navegação e pesquisa nas onze seções do Quickstart.
- [x] Exibir registros de Skills, Traits, gear, Power-Ups, regras, personagens prontos e exemplos catalogados.
- [x] Integrar a aventura introdutória como referência consultável.
- [x] Aplicar hierarquia visual responsiva, controles semânticos, foco visível e suporte a movimento reduzido.
- [ ] Validar a experiência com teclado, contraste, zoom e leitor de tela.

## Fase 2 — Criação de personagem coberta pelo Quickstart
- [x] Criar o modelo de domínio Tier D e ledger PAX.
- [x] Implementar primeira validação de espécie, Archetype, Path, Grades, Skills, Traits, gear e orçamento.
- [x] Criar a primeira interface guiada de personagem Tier D.
- [x] Executar typecheck, testes e build em GitHub Actions (Node.js 22).
- [x] Criar fixtures de domínio e reconciliar resultados das cinco fichas prontas catalogadas.
- [ ] Ampliar a cobertura dos cálculos condicionais e benefícios gratuitos conforme a auditoria mecânica.
- [x] Implementar salvamento local automático e exportação/importação JSON versionada.

## Fase 3 — Estabilização do Guia Rápido
- [ ] Concluir a segunda auditoria visual do PDF.
- [ ] Cobrir regras e seções ainda não expostas na interface.
- [ ] Verificar acessibilidade com teclado, contraste, zoom e leitor de tela.
- [ ] Executar teste de aceitação manual em ambiente local/dispositivos reais após a validação de CI.
- [ ] Revisar o conteúdo de ponta a ponta com o PDF aberto.
- [ ] Publicar a versão de consulta do Quickstart, sem adicionar regras externas.

## Fora do roadmap atual

Não iniciar implementação de criação/progressão Tier C completa, Grades 2–5, Tiers superiores, espécies/opções ausentes do PDF, automação de campanhas, contas, multiplayer ou ferramentas avançadas de GM. Essas possibilidades dependem de uma nova definição de escopo após o Core Rulebook oficial estar disponível e ser conferido.

## Gate futuro — Core Rulebook oficial

Somente quando o livro oficial completo estiver disponível e a fonte autorizada tiver sido obtida:
- abrir uma nova fase de pesquisa e auditoria;
- catalogar as regras novas;
- criar um pacote de ruleset independente;
- documentar diferenças e migrações;
- decidir com o usuário quais capacidades adicionais entram no produto.

O Quickstart v1 deve permanecer preservado como pacote independente.

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
- [ ] Fazer segunda leitura visual/cross-check sistemático de todos os dados.
- [ ] Resolver ou documentar todas as ambiguidades sem apresentar interpretações como texto oficial.

## Fase 1 — Guia de consulta

- [x] Criar o catálogo de dados do Quickstart com referências de página.
- [x] Exibir as sete espécies e seus dossiês.
- [x] Implementar navegação por onze seções e busca na seção ativa.
- [x] Exibir detalhes catalogados de Skills, Traits, gear, Power-Ups, regras, exemplos e personagens prontos.
- [x] Integrar a aventura introdutória como referência consultável.
- [x] Implementar hierarquia visual, foco visível, movimento reduzido e responsividade.
- [ ] Fazer validação manual com leitor de tela, zoom e dispositivos físicos.

## Fase 2 — Criação de personagem coberta pelo Quickstart

- [x] Criar o modelo de domínio Tier D e ledger PAX.
- [x] Validar espécie, Archetype, Path, Grades, Skills, Traits, gear e orçamento.
- [x] Criar a interface guiada de personagem Tier D em cinco etapas.
- [x] Reconciliar as cinco fichas prontas como fixtures automatizadas.
- [x] Cobrir cálculos condicionais e benefícios gratuitos confirmados pelo Quickstart.
- [x] Exibir atributos efetivos após bônus de Aptitudes sem alterar os atributos base.
- [x] Incluir Unique Perception, Complication, Evolutionary Path, Archetype Bonus e Flaw na ficha para impressão.
- [x] Incluir Conditions, Omni Die e bônus de Hero Points por Episode na folha de impressão.
- [x] Implementar importação versionada e exportação manual JSON com validação estrutural e limite de arquivo.
- [ ] Salvamento automático local: permanece fora do escopo atual; a ficha pode ser salva manualmente por exportação JSON.

## Fase 3 — Estabilização do Guia Rápido

- [ ] Concluir a segunda auditoria visual do PDF e conferir os resumos contra todas as páginas.
- [x] Cobrir no catálogo as onze áreas consultáveis presentes no Quickstart.
- [x] Executar typecheck, testes automatizados de domínio/dados/componentes e build de produção em GitHub Actions.
- [x] Adicionar testes React com Testing Library e ambiente jsdom.
- [x] Preparar testes E2E Playwright para Chromium, navegação, busca, atlas, construtor, impressão, exportação e viewport mobile.
- [ ] Executar a bateria Playwright no workflow ativo e revisar seus resultados.
- [ ] Fazer inspeção visual manual em desktop, tablet e telefone.
- [ ] Verificar acessibilidade com teclado, contraste, zoom e leitor de tela em navegadores reais.
- [ ] Revisar o conteúdo de ponta a ponta com o PDF aberto.
- [ ] Publicar o guia após revisão e aprovação do PR; a branch de trabalho permanece sem merge.

## Fora do roadmap atual

Não iniciar implementação de criação/progressão Tier C completa, Grades 2–5, Tiers superiores, espécies/opções ausentes do PDF, automação de campanhas, contas, multiplayer ou ferramentas avançadas de GM. Essas possibilidades dependem de nova definição de escopo após o Core Rulebook oficial estar disponível e ser conferido.

## Gate futuro — Core Rulebook oficial

Somente quando o livro oficial completo estiver disponível e a fonte autorizada tiver sido obtida:
- abrir uma nova fase de pesquisa e auditoria;
- catalogar as regras novas;
- criar um pacote de ruleset independente;
- documentar diferenças e migrações;
- decidir com o usuário quais capacidades adicionais entram no produto.

O Quickstart v1 deve permanecer preservado como pacote independente.

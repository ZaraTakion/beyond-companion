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
- [x] Executar axe nas rotas principais em desktop e mobile (320/390 px), sem desativar as regras.
- [ ] Fazer validação manual com leitor de tela real e zoom do navegador a 200%.

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
- [x] Testar exportação e reimportação JSON em round-trip no Chromium.
- [x] Verificar a folha de personagem na emulação de mídia print do Chromium.
- [x] Corrigir a paginação: folha isolada do layout da aplicação por React Portal.
- [x] Conferir PDF no visualizador Chromium: 2 páginas com conteúdo, sem folhas extras vazias.
- [ ] Salvamento automático local: permanece fora do escopo atual; a ficha pode ser salva manualmente por exportação JSON.

## Fase 3 — Estabilização do Guia Rápido

- [ ] Concluir a segunda auditoria visual do PDF e conferir os resumos contra todas as páginas.
- [x] Cobrir no catálogo as onze áreas consultáveis presentes no Quickstart.
- [x] Executar typecheck, testes automatizados de domínio/dados/componentes e build de produção em GitHub Actions.
- [x] Executar `npm audit --audit-level=high` no workflow.
- [x] Executar Playwright/Chromium no workflow ativo: [run #77 — 11 testes aprovados](https://github.com/ZaraTakion/beyond-companion/actions/runs/45712266932).
- [x] Executar verificações axe WCAG 2.1 AA nas três áreas principais em desktop e mobile 320/390 px.
- [x] Verificar o primeiro foco no link de salto e a navegação por teclado entre as áreas.
- [x] Verificar overflow horizontal em 320, 390, 768, 1024 e 1440 px.
- [x] Testar impressão por emulação de mídia e round-trip de importação/exportação JSON.
- [x] Fazer inspeção visual renderizada em desktop (1440 px), tablet (768 px) e mobile (390/320 px), incluindo overview/atlas, onze seções do Guia e cinco áreas do Construtor.
- [x] Verificar responsividade sem overflow horizontal em 1440, 768, 390 e 320 px; reflow complementar em 720 px.
- [ ] Verificar acessibilidade com leitor de tela real e zoom formal a 200%.
- [x] Revisar paginação da ficha impressa/salva em PDF: 2 páginas com conteúdo, sem folhas extras vazias.
- [ ] Revisar o conteúdo de ponta a ponta com o PDF aberto.
- [ ] Publicar o guia após revisão visual, conferência de conteúdo e aprovação do PR; a branch de trabalho permanece sem merge.

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

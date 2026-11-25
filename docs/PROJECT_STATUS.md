# Estado do projeto — 24/11/2026

## Definição atual

**Beyond Companion é um Guia Rápido Digital do PDF Quickstart v1.** O objetivo não é antecipar nem implementar o Core Rulebook completo. Toda funcionalidade precisa corresponder ao conteúdo da fonte aprovada.

## Repositório e entrega

- Público: https://github.com/ZaraTakion/beyond-companion
- Branch de estabilização: `feat/local-character-workspace`
- PR: https://github.com/ZaraTakion/beyond-companion/pull/2
- Preview Vercel: https://beyond-companion-git-feat-local-07486e-zaras-projects-f0700f27.vercel.app
- Fonte: PDF Quickstart v1 fornecido pelo usuário; o PDF original não está armazenado no repositório.

## Entregues

- Seis passes de auditoria estrutural e catálogos versionados do Quickstart.
- Guia de consulta com onze seções, busca e referências de página.
- Scanner interativo de espécies e identidade visual Alien Database.
- Construtor guiado Tier D com ledger de PAX e validações de domínio.
- Salvamento automático local do rascunho.
- Exportação/importação de backup JSON versionado, com validação de schema e ruleset.
- Workflow de CI executando typecheck, testes Vitest e build de produção.
- ADR-002 formalizando a decisão local-first, sem backend remoto para o escopo atual.

## Validação

No commit `e1de4d571ca5172f9cf06d35354fc31c6c6115ef`, GitHub Actions concluiu com sucesso:
- TypeScript validation.
- Unit tests.
- Production build.

A implantação Preview Vercel associada ao mesmo commit também reportou status success. A PR continua draft e não foi mesclada em `main`.

## Pendências reais

- Repetir a conferência visual de cada dado no PDF original.
- Validar acessibilidade manualmente com teclado, zoom, contraste e leitor de tela.
- Versionar um `package-lock.json` para instalações reproduzíveis.
- Ampliar testes de regras condicionais e benefícios gratuitos após cross-check de fonte.
- Fazer teste de aceitação da interface em dispositivos reais.

## Arquitetura e limite de backend

A aplicação atual é estática e local-first. Não há no escopo aprovado contas, sincronização entre dispositivos, dados compartilhados, multiplayer ou colaboração. Por isso, não foi criado servidor ou banco de dados remoto: acrescentá-los agora aumentaria custo, superfície de ataque e manutenção sem requisito funcional. A decisão está registrada na ADR-002 e pode ser revista quando surgir uma necessidade concreta.

## Limites de conteúdo

- Não adicionar regras que não estejam no Quickstart.
- Não implementar progressão completa de Tier C, Grades 2–5 ou Tiers superiores.
- Não incorporar espécies, habilidades ou opções externas ao documento.
- Não iniciar gestão de campanha, multiplayer, contas ou automações avançadas.
- Não incluir o PDF, imagens, logos ou transcrições extensas no repositório.

## Evolução posterior

Quando o Core Rulebook oficial estiver disponível e a fonte autorizada for obtida, iniciar uma nova fase de pesquisa e auditoria. O conteúdo novo será adicionado em ruleset separado; o Quickstart v1 continuará preservado.

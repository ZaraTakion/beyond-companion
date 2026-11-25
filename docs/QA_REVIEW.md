# Revisão geral e bateria de qualidade — 25/11/2026

## Escopo

A revisão considerou estrutura React/TypeScript/Vite, navegação, visão geral, atlas de espécies, guia de consulta, construtor Tier D, importação/exportação, impressão, domínio de personagem, ledger PAX, catálogos JSON, testes, configuração de CI e documentação.

## Correções aplicadas

- **Importação de ficha:** parser separado em `src/domain/character-io.ts`, com validação do formato, versão, ruleset, espécie, Archetype, Evolutionary Path, atributos e coleções.
- **Proteção de arquivo:** limite de 1 MB e limites estruturais para as coleções importadas; violações mecânicas válidas estruturalmente continuam sendo mostradas pelo validador do personagem.
- **Ledger PAX:** custos e orçamento agora exigem inteiros não negativos; valores fracionários, `NaN` e orçamento negativo são rejeitados.
- **Referências do Guia:** páginas de origem aninhadas são coletadas e apresentadas no nível das entradas de regras básicas; Conditions recebem referência à página 25 do Quickstart.
- **Navegação:** mudança de área retorna a janela ao topo.
- **Catálogo de dano:** o teste foi corrigido para enumerar os cinco tipos presentes no PDF: Elemental, Pulse, Magical, Physical e Psychic.
- **Testes de interface:** cobertura com Testing Library para navegação, pesquisa, mudança de seção, atlas, seleção de espécie, atributos derivados, compras PAX e conteúdo da ficha imprimível.
- **Testes frágeis:** corrigidos seletores que assumiam texto separado quando o nome estava composto dentro de um título e que falhavam quando o planeta aparecia no índice e no dossiê.
- **Teste de rolagem:** incluído cenário para verificar que a navegação retorna ao topo, com mock da API não implementada pelo jsdom.
- **Browser suite:** seis cenários Playwright definidos para navegação, pesquisa, atlas, construtor, exportação JSON e largura mobile. A workflow correspondente está versionada em `.github/workflows/validate.yml`.

## Resultado automatizado comprovado

- [GitHub Actions — run #53](https://github.com/ZaraTakion/beyond-companion/actions/runs/45636588005)
- Commit validado: `79646a3871c921dc3f93a580870058d7e4003cd1`
- TypeScript: aprovado.
- Vitest + Testing Library: **13 arquivos, 52 testes aprovados, 0 falhas**.
- Build de produção: aprovado, 35 módulos transformados.
- Instalação de dependências: 96 pacotes.

A execução #50 havia identificado duas falhas apenas nos testes de interface: a consulta textual de Songtide Mapping e o planeta Galvan Prime duplicado no índice/dossiê. Os seletores foram corrigidos e a execução #53 passou.

## Limites que permanecem

- A run #53 antecede um teste adicional de rolagem e a workflow Playwright; esses incrementos não possuem execução CI confirmada neste relatório.
- Os seis cenários E2E ainda precisam ser executados em Chromium.
- Não houve inspeção visual manual ou screenshot em desktop, tablet e celular.
- A consulta de deployments confirmou que não há projeto Vercel vinculado ao repositório/commit; nenhuma URL de preview foi confirmada.
- Não existe `package-lock.json`; a instalação utiliza `npm install` com faixas de versão no `package.json`. Um lockfile e `npm ci` são recomendados para builds reproduzíveis.
- Não foi feita auditoria independente de vulnerabilidades com `npm audit`.
- A workflow Playwright está na branch do PR e ainda não tem execução registrada. Não se deve afirmar que E2E ou validação visual foram aprovados.

## Fidelidade e direitos

- O conteúdo permanece limitado ao Quickstart v1.
- As correções de engenharia não introduzem regras, custos, espécies ou opções mecânicas.
- Nenhuma arte foi gerada nem incorporada nesta revisão.
- Nenhuma captura da série, ilustração oficial, logo ou imagem do reboot de 2016 foi adicionada.
- O aviso de projeto de fã permanece explícito e não é tratado como licença de uso de material protegido.

## Estado do repositório

Pull Request #3 continua aberto em rascunho e não mesclado. A branch `main` não foi alterada.

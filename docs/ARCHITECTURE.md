# Arquitetura — Beyond Companion: Guia Rápido Digital

## Objetivo arquitetural atual

Entregar uma interface de consulta e uso do conteúdo do Quickstart v1, com fidelidade rastreável às páginas do PDF. A arquitetura deve manter o Quickstart isolado para permitir futura inclusão do livro oficial sem misturar regras de versões diferentes.

## Camadas

1. **Presentation (`src/`)** — React, navegação, pesquisa, formulários e mensagens acessíveis.
2. **Domain (`src/domain/`)** — cálculos e validações das regras que aparecem no Quickstart, especialmente criação Tier D e PAX.
3. **Ruleset (`data/rulesets/quickstart-v1/`)** — resumos estruturados das espécies, opções, habilidades, custos, regras, exemplos e aventura presentes no PDF.
4. **Persistência local** — salvar o rascunho ativo no localStorage, com envelope versionado e backup JSON portátil. A aplicação funciona como site estático e não exige backend, autenticação ou banco de dados remoto.

## Regras como dados

Cada entrada deve:
- pertencer ao identificador imutável `ben10-beyond-quickstart-v1`;
- guardar referência de página;
- diferenciar texto explícito, resumo mecânico e interpretação;
- marcar questões abertas como `needs-review`;
- não importar regras externas ao PDF.

## Cálculos

- Funções puras, determinísticas e sem dependência de React.
- Validadores devolvem códigos de erro e mensagens para a interface.
- Apenas automatizar cálculos sustentados pelo Quickstart.
- Não assumir regras ausentes para Tier C, Grades 2–5 ou Tiers superiores.
- Efeitos situacionais e ambiguidades devem permanecer visíveis e sujeitos à decisão do GM.

## Persistência e limites técnicos

- O navegador mantém um único rascunho ativo por origem/dispositivo; não é um armazenamento de longo prazo garantido pelo navegador.
- A exportação JSON é o mecanismo portátil de backup e transferência entre dispositivos.
- O envelope contém identificador de schema, versão e ruleset para impedir a importação silenciosa de formatos incompatíveis.
- O usuário deve exportar uma cópia para não depender somente do armazenamento do navegador.
- Sem backend, contas, sincronização, multiplayer ou recursos pagos.
- Sem ferramentas de campanha não descritas no Quickstart.
- Sem ruleset do Core Rulebook até haver fonte autorizada e nova aprovação de escopo.
- Sem redistribuir o PDF, imagens, logos ou transcrições extensas.

## Compatibilidade futura

Quando o Core Rulebook oficial estiver disponível, seu conteúdo deverá entrar em outro pacote versionado, com auditoria e testes próprios. O pacote Quickstart não será sobrescrito. A migração de fichas só poderá ocorrer de forma explícita e documentada.

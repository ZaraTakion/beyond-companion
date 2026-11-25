# Direção visual — Alien Database

## Objetivo

Dar ao Beyond Companion uma identidade associada a tecnologia alienígena, descoberta e transformação, sem reproduzir telas, logotipos, personagens, ilustrações ou elementos gráficos oficiais da franquia. O produto continua sendo um guia rápido digital do Quickstart v1.

## Linguagem visual

- **Base:** preto esverdeado e grafite, com superfícies em camadas para separar navegação, leitura e ferramentas.
- **Cor de sinalização:** verde-lima luminoso para foco, seleção, estado ativo e ações primárias.
- **Apoio:** verdes dessaturados para metadados; âmbar discreto apenas para alertas e complicações.
- **Geometria:** círculos concêntricos, retículas, linhas de varredura, molduras técnicas e indicadores de estado.
- **Tipografia:** títulos compactos e fortes; textos de regra com tamanho, contraste e entrelinha priorizados para leitura prolongada.
- **Marca do projeto:** monograma BC e motivos geométricos próprios. Não usar o emblema oficial do Omnitrix.

## Elemento principal: Species Scanner

O dashboard contém um seletor radial interativo construído com HTML e CSS. Cada posição representa uma das sete espécies do catálogo species.json do ruleset quickstart-v1. Ao selecionar uma espécie, o painel apresenta:

- nome e mundo natal;
- páginas de referência no PDF;
- Evolutionary Aptitudes;
- Unique Perception;
- Complication;
- Evolutionary Paths.

O conteúdo vem diretamente do catálogo versionado. O scanner é uma forma alternativa de navegar pelos registros, não uma regra nova do sistema. A seleção usa botões acessíveis por teclado e informa o estado selecionado; a interface respeita a preferência de movimento reduzido.

## Componentes e navegação

- Visão geral: entrada para explorar o guia e iniciar uma ficha.
- Scanner de espécies: exploração visual do catálogo de espécies.
- Guia de consulta: onze seções de referência do Quickstart.
- Criador de Hero: criação Tier D e acompanhamento do orçamento de PAX.

## Limites de conteúdo e identidade

- Não incorporar imagens geradas, arte oficial, capturas do desenho, retratos de personagens ou logotipos oficiais.
- Não apresentar o projeto como produto oficial ou afiliado aos detentores dos direitos.
- Manter o aviso de projeto de fã e o escopo do Quickstart v1.
- Não preencher lacunas mecânicas: conteúdo ambíguo continua sinalizado na auditoria.

## Validação pendente

O código visual foi atualizado na branch prototype/first-visual-v1. Typecheck, testes e build precisam ser executados em ambiente com dependências instaladas antes de considerar a implementação pronta para merge.

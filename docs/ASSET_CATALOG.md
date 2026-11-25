# Catálogo de arte, ícones e tipografia — Cartoon Sci-Fi

Este documento registra fontes pesquisadas para a identidade visual do Beyond Companion. O objetivo é usar arte real de artistas e bibliotecas abertas, sem gerar imagens e sem utilizar material oficial da franquia.

**Regra de licenciamento:** “gratuito” não significa automaticamente “sem direitos autorais”. A seleção prioriza CC0 para ilustrações e sprites, MIT/ISC para bibliotecas de ícones e SIL OFL para fontes. Cada arquivo efetivamente incorporado deve manter sua origem e licença registrada aqui ou em `THIRD_PARTY_NOTICES.md`. As páginas oficiais das bibliotecas prevalecem sobre agregadores.

## 1. Primeira seleção recomendada

| Prioridade | Fonte | Conteúdo | Licença verificada | Uso previsto |
|---|---|---|---|---|
| 1 | [Kenney — Monster Builder Pack](https://kenney.nl/assets/monster-builder-pack) | 170+ sprites; partes modulares de olhos, bocas, membros e criaturas em seis cores | CC0 1.0 | Principal fonte para pequenas criaturas/mascotes originais, sem associá-las às espécies do RPG |
| 1 | [Kenney — Alien UFO Pack](https://kenney.nl/assets/alien-ufo-pack) | 50 sprites 2D de UFOs, lasers, explosões e elementos alienígenas | CC0 1.0 | Decoração espacial, veículos e efeitos |
| 1 | [Kenney — Planets](https://kenney.nl/assets/planets) | 50+ sprites 2D de planetas e elementos combináveis | CC0 1.0 | Cartões de mundos, fundos decorativos e navegação do catálogo |
| 1 | [Kenney — UI Pack](https://kenney.nl/assets/ui-pack) | 430 elementos de interface | CC0 1.0 | Botões, painéis, controles e detalhes de interface |
| 1 | [Kenney — UI Pack Sci-Fi](https://kenney.nl/assets/ui-pack-sci-fi) | 130 peças 2D de interface espacial | CC0 1.0 | Detalhes de interface sci-fi; aplicar seletivamente para não voltar ao visual de painel militar |
| 2 | [Kenney — Toon Characters](https://kenney.nl/assets/toon-characters) | 270 sprites 2D em poses de personagens | CC0 1.0 | Ilustrações secundárias de personagens e poses; validar a adequação visual antes de usar |
| 2 | [Kenney — Background Elements](https://kenney.nl/assets/background-elements) | 110 elementos 2D de fundo | CC0 1.0 | Cenários, molduras, partículas e composição das páginas |
| 2 | [Kenney — Simple Space](https://kenney.nl/assets/simple-space) | 48 sprites de naves e elementos espaciais para mapas | CC0 1.0 | Pequenos mapas, indicadores e elementos de exploração |
| 2 | [Kenney — Scribble Platformer](https://kenney.nl/assets/scribble-platformer) | 100+ sprites em estilo desenhado à mão | CC0 1.0 | Alternativa de acabamento rabiscado; não misturar sem teste com a linha principal |
| 2 | [Kenney — Space Shooter Remastered](https://kenney.nl/assets/space-shooter-remastered) | 295 sprites 2D de naves, armas e efeitos | CC0 1.0 | Efeitos e decoração espacial, sem transformar o guia em HUD de shooter |
| 3 | [OpenGameArt — Cartoon Enemies](https://opengameart.org/content/cartoon-enemies) | Coleção de inimigos cartunescos 2D | CC0, declarado na página do recurso | Possível apoio ao catálogo de ameaças; revisar o conteúdo e a qualidade antes de incorporar |
| 3 | [OpenGameArt — Monster Builder Pack](https://opengameart.org/content/monster-builder-pack) | Kit modular de monstros de Kenney | CC0 | Espelho adicional do pack oficial; preferir download de Kenney |
| 3 | [OpenGameArt — Alien UFO Pack](https://opengameart.org/content/alien-ufo-pack) | Sprites individuais, spritesheets e fonte vetorial | CC0 | Espelho e referência alternativa do pack oficial |
| 3 | [Open Doodles](https://www.opendoodles.com/about) | Ilustrações humanas em estilo doodle | CC0 | Elementos de onboarding/tutorial, se o estilo for coerente |

Kenney declara que os packs publicados no catálogo oficial são CC0 e que não exigem atribuição; o próprio autor pede que o logotipo Kenney não seja reutilizado como marca do projeto. Crédito é opcional e recomendado como cortesia.

## 2. Ícones de interface

| Biblioteca | Licença | Uso recomendado |
|---|---|---|
| [Phosphor Icons](https://phosphoricons.com/) | MIT | Primeira escolha para ícones com personalidade mais arredondada; usar pesos Fill ou Duotone quando adequados |
| [Lucide](https://lucide.dev/) | ISC | Ícones técnicos e utilitários, com traço consistente e discreto |
| [Game-icons.net](https://game-icons.net/) | CC BY 3.0; alguns ícones individuais podem ser CC0 | Biblioteca temática de jogo, criaturas, elementos, poderes e equipamentos; registrar autor e atribuição de cada ícone usado |

O Game-icons.net exige crédito ao autor para conteúdo CC BY 3.0. Não copiar a biblioteca inteira para o projeto sem um inventário de autores e créditos. Para ícones de navegação e acessibilidade, preferir Phosphor ou Lucide.

## 3. Tipografia

| Fonte | Licença | Papel visual |
|---|---|---|
| [Fredoka](https://fonts.google.com/specimen/Fredoka) | SIL Open Font License 1.1 | Títulos, chamadas e nomes de seções; arredondada e expressiva |
| [Lilita One](https://fonts.google.com/specimen/Lilita+One) | SIL Open Font License 1.1 | Uso pontual em títulos de impacto e etiquetas curtas |
| [Nunito](https://fonts.google.com/specimen/Nunito) | SIL Open Font License 1.1 | Texto corrido, campos, controles e leitura de regras |
| [Baloo 2](https://fonts.google.com/specimen/Baloo+2) | SIL Open Font License 1.1 | Alternativa de display mais descontraída; testar legibilidade em tamanhos pequenos |

Direção tipográfica proposta: **Fredoka para headings + Nunito para corpo e controles**. Lilita One e Baloo 2 são alternativas, não devem competir entre si. O texto das regras deve continuar confortável e legível, sem fonte display.

## 4. Critérios de incorporação

1. Dar preferência a arquivos CC0 do autor original. Evitar fontes agregadoras quando existir página oficial do criador.
2. Conferir licença do pack e, quando houver, dos arquivos individuais antes de copiar para `public/assets`.
3. Não usar logos, capturas, personagens, retratos, emblemas, artes oficiais ou material promocional de BEN 10.
4. Não rotular mascotes genéricos como qualquer uma das sete espécies jogáveis: a arte é decorativa e não é representação canônica do RPG.
5. Manter um único estilo principal: ilustração 2D cartoon colorida, contornos claros e formas expressivas. Não misturar sprites pixel-art, low-poly 3D, doodles e vetor flat na mesma área.
6. Otimizar imagens para WebP/PNG/SVG conforme o original; definir dimensões e `alt`; usar lazy loading fora do primeiro viewport.
7. Nunca depender do hotlink de imagens de prévia de um marketplace. Baixar os arquivos originais do criador e versionar só os arquivos necessários, junto com créditos/licenças.
8. Confirmar contraste, leitura em dispositivos móveis, tamanho de download e `prefers-reduced-motion`.

## 5. Estado desta pesquisa

- As fontes e os termos acima foram pesquisados em páginas oficiais e catálogos dos próprios autores.
- Esta lista é uma seleção de candidatos, não significa que todos os arquivos já tenham sido baixados ou incorporados.
- A incorporação final exige examinar os arquivos originais dos packs, selecionar sprites que combinem visualmente e registrar os nomes dos arquivos efetivamente usados.
- Não foram adicionadas imagens geradas.
- Não foram adicionadas artes oficiais nem assets com licença desconhecida.

## Fontes primárias de licença

- [Kenney — Support / FAQ](https://kenney.nl/support): uso dos assets em projetos pessoais/comerciais e ausência de obrigação de atribuição para packs CC0.
- [Creative Commons — CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/).
- [Phosphor — MIT license](https://github.com/phosphor-icons/core/blob/main/LICENSE).
- [Lucide — ISC license](https://lucide.dev/license).
- [Game-icons.net — About and attribution](https://game-icons.net/about.html).
- [Open Doodles — CC0](https://www.opendoodles.com/about).
- [Google Fonts — Fredoka metadata](https://github.com/google/fonts/blob/main/ofl/fredoka/METADATA.pb).
- [Google Fonts — Lilita One metadata](https://github.com/google/fonts/blob/main/ofl/lilitaone/METADATA.pb).
- [Google Fonts — Nunito metadata](https://github.com/google/fonts/blob/main/ofl/nunito/METADATA.pb).
- [Google Fonts — Baloo 2 OFL text](https://github.com/google/fonts/blob/main/ofl/baloo2/OFL.txt).

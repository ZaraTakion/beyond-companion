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


## 6. Pesquisa ampliada — ilustração e personagens

### Novas fontes examinadas

| Recurso | Autor | Tipo | Licença declarada na página original | Curadoria |
|---|---|---|---|---|
| [Alien Portrait](https://opengameart.org/content/alien-portrait) | pauliuw | Retrato alienígena 2D desenhado e colorido, com várias versões PNG e arquivo-fonte | CC0 | Candidato para uma arte de destaque ou cartão editorial; conferir a prévia e o conteúdo integral antes de integrar |
| [Space Backdrop](https://opengameart.org/content/space-backdrop) | beren77 | Fundo espacial 1280×800 | CC0 | Candidato para fundo discreto com camada de cor/contraste por trás de texto; o próprio autor informa que a prévia tem mais contraste do que o arquivo integral |
| [Alien Character 2D Sprites](https://yoogameart.itch.io/alien-character-2d-sprites) | Yoo Game Art | Personagem alienígena animado em PNG: idle, jump, kick, punch e run | CC0 1.0 | Candidato para uma área de boas-vindas/mascote secundário. O pacote gratuito tem 39 MB; selecionar apenas sprites necessários para não aumentar o peso do site |
| [Monster Builder Pack](https://kenney.nl/assets/monster-builder-pack) | Kenney | Criaturas modulares; mais de 170 peças de olhos, bocas e membros em seis cores | CC0 | Primeira escolha para pequenos mascotes ou silhuetas decorativas originais. Não nomear nem apresentar as montagens como espécies canônicas |
| [Toon Characters](https://kenney.nl/assets/toon-characters) | Kenney | Personagens 2D com 270 sprites em diferentes poses | CC0 | Apoio para painéis de tutorial e onboarding; revisar se combina com a linha visual principal |
| [Alien UFO Pack](https://kenney.nl/assets/alien-ufo-pack) | Kenney | 2D UFOs, partes, lasers e efeitos | CC0 | Melhor para adornos, navegação temática, pequenas ilustrações e divisores |
| [Planets](https://kenney.nl/assets/planets) | Kenney | Mais de 50 planetas 2D | CC0 | Melhor para fichas de mundos, cartões e elementos de cenário |
| [Background Elements](https://kenney.nl/assets/background-elements) | Kenney | 110 elementos de fundo 2D | CC0 | Camadas de cenário e detalhes decorativos |
| [Simple Space](https://kenney.nl/assets/simple-space) | Kenney | 48 sprites 2D de naves/objetos espaciais | CC0 | Ilustrações menores de exploração espacial |
| [Open Doodles](https://www.opendoodles.com/about) | Pablo Stanley | Ilustrações humanas em estilo doodle | CC0 | Uso restrito a onboarding/tutorial; não mistura bem com alien/cartoon de ação |

**Evidência de licença:** a página oficial do Kenney declara que seus packs de assets são CC0, inclusive em projetos comerciais, e que não é obrigatória atribuição; também proíbe usar a marca/logotipo Kenney como marca própria. [Kenney Support](https://kenney.nl/support). A página itch.io do Monster Builder Pack informa CC0 1.0, 170+ sprites e ausência de obrigação de atribuição. [Monster Builder Pack — itch.io](https://kenney-assets.itch.io/monster-builder-pack). As páginas do OpenGameArt identificam a licença CC0 e os autores individuais de Alien Portrait e Space Backdrop. [Alien Portrait](https://opengameart.org/content/alien-portrait) · [Space Backdrop](https://opengameart.org/content/space-backdrop). A página do Yoo Game Art declara CC0 1.0 e lista as animações incluídas. [Alien Character 2D Sprites](https://yoogameart.itch.io/alien-character-2d-sprites).

### Biblioteca de descoberta

[ Tiddybub — 2d-assets](https://github.com/Tiddybub/2d-assets) é um índice comunitário de packs 2D CC0 com arquivos originais e um SOURCE.md por pacote. É útil para descobrir outros criadores, mas cada pacote deve ser verificado na página de origem e no seu SOURCE.md antes de ser incorporado. Não tratar uma listagem agregada como substituta da licença individual. A coleção contém materiais de estilos diferentes; filtrar apenas cartoon, space e alien.

### Material examinado, mas não selecionado

- [Free CC0 Fantasy Monster Sprites — SpriteCanvas](https://spritecanvas.itch.io/free-cc0-monster-sprites): a página declara CC0, mas explica que as artes e animações foram geradas por IA e depois ajustadas manualmente. Não será usado na identidade principal porque a direção aprovada prioriza arte de autores/ilustradores e não imagens geradas.
- Packs pixel-art, low-poly 3D e doodles genéricos podem ser CC0, mas não serão misturados com o conjunto principal de arte cartoon 2D. Só serão reconsiderados se uma tela específica exigir esse estilo.

## 7. Pesquisa ampliada — ícones

| Biblioteca | Quantidade indicada pela fonte | Licença | Indicação |
|---|---:|---|---|
| [Phosphor Icons](https://phosphoricons.com/) | Mais de 1.200 ícones; 6 pesos | MIT | **Preferida para o tom cartoon:** pesos Fill e Duotone em ícones de navegação e ações; manter espessura/linguagem consistente |
| [Tabler Icons](https://tabler.io/icons) | Mais de 6.500 variantes outline/filled | MIT | Excelente alternativa para ícones utilitários; escolher filled onde o contorno fino parecer técnico demais |
| [Iconoir](https://iconoir.com/) | 1.383 ícones, 1.671 arquivos incluindo variantes sólidas | MIT | Alternativa equilibrada para interface, mas visual mais minimalista |
| [Lucide](https://lucide.dev/) | Mais de 2.100 ícones | ISC | Melhor para utilitários discretos; não é a primeira escolha estética para o estilo cartoon |
| [Game-icons.net](https://game-icons.net/) | 4.180 ícones na data consultada | CC BY 3.0 | Excelente biblioteca temática (Creature & Monster, Vehicle, GUI, Body etc.); usar apenas ícones individualmente registrados com autor, link e atribuição |

**Escolha inicial:** Phosphor para a interface geral; Game-icons.net somente para ícones de jogo específicos quando for possível registrar o autor de cada pictograma. Tabler é o fallback para ações e controles que não existam no conjunto Phosphor.

Licenças conferidas nas fontes oficiais: [Phosphor — MIT](https://github.com/phosphor-icons/core/blob/main/LICENSE), [Tabler — MIT](https://tabler.io/license), [Iconoir FAQ — MIT](https://iconoir.com/docs/faq), [Lucide — ISC](https://lucide.dev/license) e [Game-icons.net — CC BY 3.0](https://game-icons.net/).

## 8. Decisão de curadoria recomendada

Para evitar um site visualmente incoerente, não integrar dezenas de packs. A proposta é selecionar um conjunto principal pequeno:

1. **Personagem/mascote secundário:** Monster Builder Pack de Kenney, ou Alien Character 2D Sprites de Yoo Game Art se a estética da ilustração for compatível depois da inspeção.
2. **Cenário:** Planets + pequenos elementos de Background Elements; usar Space Backdrop de beren77 apenas em páginas onde o fundo escuro contribuir para o contraste.
3. **Veículos e efeitos:** Alien UFO Pack.
4. **Ícones:** Phosphor Fill/Duotone como sistema principal; Game-icons para símbolos de criatura/poder/equipamento mediante atribuição individual.
5. **Fontes:** Fredoka nos títulos e Nunito na leitura das regras.

O guia não deve virar um jogo de ação nem um catálogo de imagens. Ilustrações devem ajudar a orientar a navegação e criar personalidade; as regras, os custos e as referências de página continuam sendo o conteúdo central.

## 9. Status de download e integração

**Pesquisa e seleção preliminar concluídas; importação física pendente.** O ambiente de execução desta sessão não conseguiu resolver os hosts externos para baixar arquivos binários (erro de DNS), então nenhum PNG/SVG/ZIP de terceiros foi copiado para o repositório nesta etapa. Não foram usados hotlinks de prévias de marketplace como substituto. Antes do próximo commit com arte real, baixar os packs diretamente das páginas dos autores, inspecionar os arquivos e dimensões, selecionar um subconjunto pequeno, guardar as licenças/notices e verificar impacto no tamanho do bundle.

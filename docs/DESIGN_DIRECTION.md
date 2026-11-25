# Direção visual — Classic Cartoon Alien Field Guide

## Objetivo

Criar uma identidade própria para o Beyond Companion como um **arquivo de exploração alienígena / caderno de campo**, com atmosfera de desenho animado de ação sci-fi do início dos anos 2000. A inspiração em BEN 10 clássico (2005) limita-se a atributos amplos de gênero e atmosfera: aventura, descoberta, ficção científica, humor, cores expressivas e criaturas com silhuetas marcantes. Não copiar personagens, aliens, dispositivos, símbolos, logotipo, lettering, cenas ou artes da franquia.

O produto continua sendo um guia rápido digital do Quickstart v1, não um jogo nem um produto oficial.

## Identidade independente

Beyond Companion deve se apresentar de forma clara como um projeto independente, feito por fãs e não oficial. A página inicial exibe um aviso de independência; o rodapé repete uma versão compacta em todas as páginas. A redação não deve sugerir patrocínio, aprovação ou vínculo com Warner Bros. Discovery, Cartoon Network ou quaisquer titulares de direitos.

O aviso de fã **não funciona como licença** e não autoriza a reprodução de arte oficial, capturas da série, personagens, logotipos ou materiais de terceiros. Cada arquivo incorporado exige licença verificável compatível com o uso ou autorização expressa. A identidade visual pode se inspirar em atributos amplos da série animada original de 2005, sem copiar elementos protegidos.

## Linguagem visual

- **Personalidade:** aventura, descoberta, energia, humor e curiosidade; sem infantilizar a leitura das regras.
- **Paleta:** verde-floresta e carvão na moldura; verde-lima como cor principal de acento; papel creme para superfícies de leitura; ciano e laranja para diferenciação de categorias.
- **Superfícies:** papel claro para fichas e conteúdo; cenários escuros de floresta/ambiente alienígena para navegação e destaque.
- **Geometria:** contornos escuros espessos, cantos assimétricos, sombras chapadas, etiquetas e selos editoriais.
- **Textura:** pontos/retículas discretos, órbitas e linhas de caderno feitos em CSS; sem textura que prejudique legibilidade.
- **Tipografia:** Fredoka em títulos e Nunito em regras, formulários e controles (SIL OFL 1.1).
- **Ícones:** Phosphor Fill/Duotone (MIT), com um único peso por contexto.
- **Ilustração:** cartoon 2D desenhado/cel-shaded, contorno legível e cores chapadas. Preferir CC0 com autor identificado; aceitar CC BY apenas quando atribuição e arquivo de créditos forem mantidos. Não misturar pixel-art, low-poly 3D, doodle e vetores flat no mesmo painel.
- **Interação:** botões com feedback físico, alvos de toque generosos, foco visível, movimento reduzido e responsividade.
- **Marca:** monograma BC e grafismos próprios. Não usar emblema oficial do Omnitrix nem replicar telas do desenho.

## Pesquisa e curadoria de assets

A pesquisa detalhada, os autores, as licenças e as URLs de origem estão em [ASSET_CATALOG.md](./ASSET_CATALOG.md).

Candidatos CC0 prioritários:
- Extra Terrestrial — Daniel Quevedo (OpenGameArt), spritesheet 2D desenhado em Photoshop.
- Monster Builder Pack — Kenney, 178 peças modulares e arquivos vetoriais para montar criaturas originais.
- 5 Alien Creatures — johnnytal (OpenGameArt), cinco criaturas cartunescas.
- 2D space background — Scribe (OpenGameArt), cenário espacial CC0.
- Alien UFO Pack e Toon Characters — Kenney, para detalhes de cenário e personagens.

Candidato animado CC0:
- Alien Character 2D Sprites — Yoo Game Art; autor declara não ter usado IA. O pacote tem 39 MB, portanto usar somente frames indispensáveis.

Candidatos com atribuição:
- Cartoon Creatures — RayB2, CC BY 4.0.
- Space Cartoon Background — Aetherna, CC BY 3.0.

Não usar materiais sem licença individual verificável. Não usar fan art presumindo autorização. **Nenhuma arte do reboot de 2016 será usada.** A decisão é definitiva.

## Componentes

- **Visão geral:** capa editorial com clima de aventura, grafismos de campo, atalhos em cartões coloridos e indicadores de conteúdo.
- **Arquivo de espécies:** seletor e fichas de consulta com dados vindos do catálogo versionado. A arte decorativa não deve ser identificada como espécie canônica.
- **Guia de consulta:** navegação por assunto, busca e cartões claros de leitura rápida.
- **Criador de Hero:** controles claros, grupos bem delimitados e ledger de PAX destacado.

## Limites de conteúdo e identidade

- Não incorporar imagens geradas, arte oficial, capturas do desenho, retratos de personagens, logotipos ou emblemas da franquia.
- Não apresentar o projeto como produto oficial ou afiliado aos detentores dos direitos.
- Manter o aviso de projeto de fã e o escopo do Quickstart v1.
- Não preencher lacunas mecânicas: conteúdo ambíguo continua sinalizado na auditoria.
- O design não altera regras ou dados do sistema.

## Estado de implementação

O redesign de CSS e textos do dashboard está na branch `prototype/cartoon-sci-fi-v1`. A pesquisa e seleção preliminar de assets estão documentadas.

**Os arquivos de arte originais ainda não foram baixados nem versionados** porque o ambiente desta sessão não conseguiu acessar os downloads externos. Não usar hotlinks como substituto. A incorporação exige baixar do autor, inspecionar spritesheets, selecionar/recortar frames, otimizar arquivos e registrar origem/licença em `THIRD_PARTY_NOTICES.md`.

Typecheck, testes, build, revisão visual responsiva e preview de deployment ainda precisam ser executados antes de considerar o redesign pronto para merge.


## Passagem de memorabilidade visual — edição editorial

A camada visual foi refinada para funcionar como uma capa de aventura e um atlas de campo, não como um dashboard genérico. A hierarquia agora depende de poucos elementos reconhecíveis: título expressivo, moldura escura, papel de arquivo, selos assimétricos e acentos cromáticos independentes por seção.

- **Abertura:** capa em dois planos, com tipografia grande e um selo geométrico abstrato construído em CSS.
- **Arquivo de espécies:** prancheta de atlas em papel claro; os marcadores circulares continuam sendo controles do catálogo, mas deixam de parecer um radar militar.
- **Consulta e criação:** cartões de leitura com o mesmo contorno e sombra física; cores de apoio variam para orientar sem competir com o texto.
- **Ritmo:** blocos de informação alternam superfícies escuras e claras, com mais respiro e títulos de maior presença.
- **Mobile:** o painel de capa passa a empilhar texto e selo; controles e atalhos permanecem com alvos de toque amplos.

Todos os grafismos desta passagem são CSS original. Não foram adicionadas imagens geradas, capturas da série, logotipos ou artes de terceiros. A atualização não altera o conteúdo mecânico do Quickstart v1.

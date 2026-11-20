# Referências

Tudo o que o projeto usa e de onde veio. Atualizado até a versão `v0.3-album`.

## Fontes tipográficas

| Fonte | Autor | Licença | Origem | Onde está |
|---|---|---|---|---|
| Londrina Solid | Marcelo Magalhães | SIL Open Font License 1.1 | Google Fonts: https://fonts.google.com/specimen/Londrina+Solid | `assets/fontes/londrina-solid-300.woff2` e `-900.woff2` |
| Atkinson Hyperlegible Next | Braille Institute of America e parceiros | SIL Open Font License 1.1 | Google Fonts: https://fonts.google.com/specimen/Atkinson+Hyperlegible+Next | `assets/fontes/atkinson-next-*.woff2` |

As duas licenças estão copiadas em `assets/fontes/LICENCA-*.txt`, do repositório oficial https://github.com/google/fonts.

## Imagens

- Retrato das figurinhas: desenho próprio em SVG (busto genérico, sem representar nenhuma pessoa).
- Ícone do site (`assets/svg/favicon.svg`): desenho próprio.
- Pacotinho, costas da figurinha, cartela e carimbos: desenhados em CSS, sem imagem.
- Bandeiras (`assets/bandeiras/`: `br`, `ma`, `ht` e `gb-sct` das seleções; `mx`, `us` e `ca` dos países-sede): biblioteca `flag-icons`, de Panayiotis Lipiridis, licença MIT. Origem: https://github.com/lipis/flag-icons (pasta `flags/4x3`). Copiadas em 19 e 20/11/2026, sem alteração. A licença está em `assets/bandeiras/LICENCA-flag-icons.txt`. Só as imagens foram usadas: nenhum código da biblioteca roda no site.

### Fotos dos estádios (carrossel da página inicial)

- Origem: Wikimedia Commons. Copiadas em 20/11/2026 para `assets/img/sedes/`, na versão de 960 pixels de largura que o próprio Commons gera. O arquivo não foi alterado.
- No site, as fotos aparecem na cor da tinta da página por um efeito feito no CSS (o arquivo continua colorido).
- Critério de escolha: licença livre e sem marca oficial da Copa em destaque. Três fotos principais dos artigos foram trocadas por esse motivo (Toronto, Vancouver e Seattle).
- O autor e a licença abaixo são os informados na página de cada foto no Commons.

| Sede | Estádio | Autor | Licença | Foto original |
|---|---|---|---|---|
| Cidade do México | Estadio Azteca | ProtoplasmaKid | CC BY 4.0 | https://commons.wikimedia.org/wiki/File:Vista_a%C3%A9rea_del_Estadio_Azteca_-_2026_-_02.jpg |
| Nova York/Nova Jersey | MetLife Stadium | Anthony Quintano | CC BY 2.0 | https://commons.wikimedia.org/wiki/File:Metlife_stadium_(Aerial_view).jpg |
| Dallas | AT&T Stadium | Michael Barera | CC BY-SA 4.0 | https://commons.wikimedia.org/wiki/File:Arlington_June_2020_4_(AT%26T_Stadium).jpg |
| Los Angeles | SoFi Stadium | Troutfarm27 | CC BY-SA 4.0 | https://commons.wikimedia.org/wiki/File:SoFi_Stadium_2023.jpg |
| Kansas City | Arrowhead Stadium | Ichabod | CC BY-SA 3.0 | https://commons.wikimedia.org/wiki/File:Aerial_view_of_Arrowhead_Stadium_08-31-2013.jpg |
| Baía de São Francisco | Levi's Stadium | U.S. Customs and Border Protection | Domínio público | https://commons.wikimedia.org/wiki/File:Levi%27s_Stadium_in_February_2016_prior_to_Super_Bowl_50_(24398261729).jpg |
| Houston | NRG Stadium | Carlos.dkfi | CC0 | https://commons.wikimedia.org/wiki/File:Nrg_stadium.jpg |
| Filadélfia | Lincoln Financial Field | Dough4872 | CC BY-SA 4.0 | https://commons.wikimedia.org/wiki/File:Lincoln_Financial_Field,_Philadelphia,_Pennsylvania,_United_States.jpg |
| Atlanta | Mercedes-Benz Stadium | Atlanta Falcons | CC BY 3.0 | https://commons.wikimedia.org/wiki/File:Mercedes_Benz_Stadium_time_lapse_capture_2017-08-13.jpg |
| Seattle | Lumen Field | Seattle Municipal Archives | CC BY 2.0 | https://commons.wikimedia.org/wiki/File:Aerial_of_Qwest_Field_and_downtown_skyline,_2002.jpg |
| Miami | Hard Rock Stadium | elisfkc2 | CC BY-SA 2.0 | https://commons.wikimedia.org/wiki/File:Hard_Rock_Stadium_for_Super_Bowl_LIV_(49606710103).jpg |
| Boston | Gillette Stadium | Art N. | CC BY 2.0 | https://commons.wikimedia.org/wiki/File:Gillette_Stadium_(Top_View).jpg |
| Vancouver | BC Place | Robert Ashworth | CC BY 2.0 | https://commons.wikimedia.org/wiki/File:BC_Place_Stadium_(6179392956).jpg |
| Monterrey | Estadio BBVA | Arne Müseler | CC BY-SA 3.0 DE | https://commons.wikimedia.org/wiki/File:Mexico_Guadalupe_Monterrey_Estadio_BBVA_Bancomer_fifa_world_cup_2026_6.JPG |
| Guadalajara | Estadio Akron | Alejan98 | CC0 | https://commons.wikimedia.org/wiki/File:Estadio_Akron_02-07-2022_cabecera_sur_lado_derecho_(3).jpg |
| Toronto | BMO Field | Fabian Roudra Baroi | CC BY-SA 4.0 | https://commons.wikimedia.org/wiki/File:BMO_Field_Closeups_03.jpg |

Observações sobre as fotos:

- A foto de Seattle é de 2002, quando o estádio tinha outro nome (Qwest Field).
- A foto de Atlanta é um quadro de vídeo publicado pelo clube Atlanta Falcons. A licença CC BY 3.0 é a que consta no Commons.

## Dados da Copa de 2026

Consulta feita em 19/11/2026. Cada registro de `js/dados.js` tem um campo `fonte` que aponta para uma ou mais destas fontes. Por enquanto só o Grupo C (Brasil, Marrocos, Haiti e Escócia) foi pesquisado.

Como foi conferido:

- Número da camisa, posição e clube: duas listas independentes, que bateram nos 20 jogadores escolhidos (Wikipedia e Football365).
- Capitães e curiosidades: comunicado da FIFA, confederações (UEFA e Concacaf) e imprensa.
- Classificação e placares do grupo: página do Grupo C na Wikipedia e relatos de jogo da imprensa.

Fontes:

- FIFA. World Cup 2026: 48 squads confirmed (2 de junho de 2026): https://inside.fifa.com/media-releases/world-cup-2026-48-squads-confirmed
- Wikipedia. 2026 FIFA World Cup squads: https://en.wikipedia.org/wiki/2026_FIFA_World_Cup_squads
- Wikipedia. 2026 FIFA World Cup Group C: https://en.wikipedia.org/wiki/2026_FIFA_World_Cup_Group_C
- Wikipedia. 2026 FIFA World Cup (seção Venues: as 16 sedes, com estádio, número de jogos e capacidade; consulta em 20/11/2026): https://en.wikipedia.org/wiki/2026_FIFA_World_Cup
- Football365. Final confirmed squad lists and squad numbers for all 48 nations: https://www.football365.com/news/2026-world-cup-squads-full-48-teams-every-player
- UEFA. Scotland at the World Cup 2026: https://www.uefa.com/european-qualifiers/news/02a6-20d159741fe9-a2a8fac9839d-1000--scotland-at-the-world-cup-2026-squad-fixtures-group-and-hi/
- Concacaf. FIFA World Cup 2026 Team Profile: Haiti: https://www.concacaf.com/competitions/fifa-world-cup/news/fifa-world-cup-2026-team-profile-haiti
- Imprensa (Itatiaia, Diário de Pernambuco, O Popular, FourFourTwo, Sports Illustrated, ESPN, beIN Sports, Al Jazeera, Fox Sports, The National, Heavy, theScore): os endereços completos estão na lista `FONTES`, no começo de `js/dados.js`.

Pendências desta pesquisa:

- A lista oficial de elencos da FIFA em PDF (https://fdp.fifa.org/assetspublic/ce281/pdf/SquadLists-English.pdf) não pôde ser lida de forma automática. Vale abrir e conferir os 20 nomes à mão.
- O que cada seleção fez depois da fase de grupos está marcado como "a confirmar": a fonte consultada veio com dados confusos.
- Três curiosidades foram deduzidas da lista de elencos, e não de uma reportagem: El Kaabi (mais gols no elenco), Ricardo Adé (defensor mais velho do elenco) e Brahim Díaz (camisa 10).
- Os dados das 16 sedes vêm de uma fonte só (a tabela da Wikipedia). As notas "o estádio que mais recebeu jogos" e "o menor dos 16 estádios" foram tiradas da comparação dos números dessa tabela.

## Normas e documentação das técnicas usadas

- W3C. Web Content Accessibility Guidelines (WCAG) 2.2: https://www.w3.org/TR/WCAG22/
- W3C. Definição de razão de contraste, usada em `scripts/contraste.js`: https://www.w3.org/TR/WCAG22/#dfn-contrast-ratio
- W3C WAI. ARIA Authoring Practices Guide, padrão de diálogo modal: https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/
- W3C WAI. ARIA Authoring Practices Guide, padrão de abrir e fechar (disclosure), usado no botão Menu: https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/
- W3C WAI. ARIA Authoring Practices Guide, padrão de abas (tabs), usado na página do álbum: https://www.w3.org/WAI/ARIA/apg/patterns/tabs/
- W3C WAI. Entendendo o critério 2.5.7, Movimentos de arrastar (motivo do botão "Colar"): https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html
- MDN Web Docs. API de arrastar e soltar do HTML, usada para colar a figurinha: https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API
- MDN Web Docs. `localStorage`, onde o progresso fica guardado: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
- MDN Web Docs. `rotateY()`, usado no giro da figurinha: https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/rotateY
- W3C WAI. ARIA Authoring Practices Guide, padrão de carrossel: https://www.w3.org/WAI/ARIA/apg/patterns/carousel/
- W3C WAI. Entendendo o critério 3.3.8, Autenticação acessível: https://www.w3.org/WAI/WCAG22/Understanding/accessible-authentication-minimum.html
- W3C WAI. Tutorial de formulários, avisos de erro: https://www.w3.org/WAI/tutorials/forms/notifications/
- MDN Web Docs. `SubtleCrypto.digest()`, usado para o hash da senha: https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest
- MDN Web Docs. Atributo `autocomplete`: https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete
- MDN Web Docs. `Clipboard.writeText()`, usado no botão "Copiar lista": https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText
- MDN Web Docs. `mix-blend-mode`, usado nas fotos em uma tinta só: https://developer.mozilla.org/en-US/docs/Web/CSS/mix-blend-mode
- WhatsApp. Link de conversa com texto pronto (`wa.me`): https://faq.whatsapp.com/5913398998672934
- MDN Web Docs. Elemento `<dialog>`: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog
- MDN Web Docs. `prefers-color-scheme` e `prefers-reduced-motion`: https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme
- Nielsen Norman Group. 10 Usability Heuristics for User Interface Design: https://www.nngroup.com/articles/ten-usability-heuristics/

## Ferramentas

- Git: histórico de versões.
- Node.js: roda o `scripts/contraste.js`.
- Microsoft Edge em modo sem janela: testes automáticos e prints.

## Inteligência artificial

- **Claude Code (modelo Claude, da Anthropic).** Usado para:
  - propor e comparar as direções visuais (5 designers de IA independentes, dos quais 3 concluíram, e 3 jurados de IA);
  - pesquisar os dados do Grupo C nas fontes listadas acima e cruzar as listas de elencos;
  - escrever o HTML, o CSS, o JavaScript e os scripts, a partir do prompt e das escolhas do aluno;
  - calcular o contraste das cores e rodar os testes automáticos;
  - escrever esta documentação técnica.
- A redação da Parte C.1 do relatório não usa IA.
- Outras IAs usadas pelo aluno: a preencher pelo Vitor, se houver.

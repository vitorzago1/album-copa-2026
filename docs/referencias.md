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
- Bandeiras (`assets/bandeiras/`, as 48 seleções): biblioteca `flag-icons`, de Panayiotis Lipiridis, licença MIT. Origem: https://github.com/lipis/flag-icons (pasta `flags/4x3`). Copiadas em 19 e 20/11/2026, sem alteração. A licença está em `assets/bandeiras/LICENCA-flag-icons.txt`. Só as imagens foram usadas: nenhum código da biblioteca roda no site.

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

Consultas feitas em 19 e 20/11/2026. Cada registro de `js/dados.js` tem um campo `fonte` que aponta para uma ou mais destas fontes. A lista completa, com os endereços, é o objeto `FONTES` no começo de `js/dados.js`, e aparece também na página Sobre.

Como foi conferido, no Grupo C (pesquisado à mão):

- Número da camisa, posição e clube: duas listas independentes, que bateram nos 20 jogadores escolhidos (Wikipedia e Football365).
- Capitães e curiosidades: comunicado da FIFA, confederações (UEFA e Concacaf) e imprensa.
- Classificação e placares do grupo: página do Grupo C na Wikipedia e relatos de jogo da imprensa.

Como foi conferido, nos outros 11 grupos (lidos por script):

- Elencos (número, posição, nome, clube, capitão, técnico, jogos e gols pela seleção, data de nascimento): página de elencos da Wikipedia.
- Número, nome e clube dos 220 jogadores escolhidos: cruzados com a lista do Football365. Bateram 212; em 7 a segunda lista não traz o número (confere só nome e clube); 1 é um substituto de última hora, explicado na Wikipedia.
- Jogos da fase de grupos e do mata-mata, com quem marcou cada gol: páginas da Wikipedia de cada grupo, dos 16 avos de final, do mata-mata e da final. A soma dos gols por jogador bate com o placar nos 104 jogos.
- Final e campeã: conferidas em ESPN, NPR e CBS News.
- Prêmios (artilheiro, melhor jogador, melhor goleiro, melhor jovem): artigo principal da Copa na Wikipedia. O artilheiro foi confirmado pela soma dos gols jogo a jogo.

Fontes:

- FIFA. World Cup 2026: 48 squads confirmed (2 de junho de 2026): https://inside.fifa.com/media-releases/world-cup-2026-48-squads-confirmed
- Wikipedia. 2026 FIFA World Cup squads: https://en.wikipedia.org/wiki/2026_FIFA_World_Cup_squads
- Wikipedia. 2026 FIFA World Cup Group A até Group L (12 páginas, uma por grupo). Exemplo: https://en.wikipedia.org/wiki/2026_FIFA_World_Cup_Group_C
- Wikipedia. 2026 FIFA World Cup knockout stage: https://en.wikipedia.org/wiki/2026_FIFA_World_Cup_knockout_stage
- Wikipedia. 2026 FIFA World Cup round of 32: https://en.wikipedia.org/wiki/2026_FIFA_World_Cup_round_of_32
- Wikipedia. 2026 FIFA World Cup final: https://en.wikipedia.org/wiki/2026_FIFA_World_Cup_final
- ESPN. Spain 1-0 Argentina (Jul 19, 2026) Final Score: https://www.espn.com/soccer/match/_/gameId/760517/argentina-spain
- NPR. Spain is the 2026 World Cup champion, defeating Argentina for its 2nd title: https://www.npr.org/2026/07/19/nx-s1-5899071/2026-world-cup-fifa-argentina-spain-final-championship
- CBS News. Spain wins 2026 FIFA World Cup with grueling 1-0 victory over Argentina: https://www.cbsnews.com/news/2026-fifa-world-cup-final-spain-argentina-sunday/
- Wikipedia. 2026 FIFA World Cup (seção Venues: as 16 sedes, com estádio, número de jogos e capacidade; consulta em 20/11/2026): https://en.wikipedia.org/wiki/2026_FIFA_World_Cup
- Football365. Final confirmed squad lists and squad numbers for all 48 nations: https://www.football365.com/news/2026-world-cup-squads-full-48-teams-every-player
- UEFA. Scotland at the World Cup 2026: https://www.uefa.com/european-qualifiers/news/02a6-20d159741fe9-a2a8fac9839d-1000--scotland-at-the-world-cup-2026-squad-fixtures-group-and-hi/
- Concacaf. FIFA World Cup 2026 Team Profile: Haiti: https://www.concacaf.com/competitions/fifa-world-cup/news/fifa-world-cup-2026-team-profile-haiti
- Imprensa (Itatiaia, Diário de Pernambuco, O Popular, FourFourTwo, Sports Illustrated, ESPN, beIN Sports, Al Jazeera, Fox Sports, The National, Heavy, theScore): os endereços completos estão na lista `FONTES`, no começo de `js/dados.js`.

Pendências desta pesquisa:

- A lista oficial de elencos da FIFA em PDF (https://fdp.fifa.org/assetspublic/ce281/pdf/SquadLists-English.pdf) não pôde ser lida de forma automática. Vale abrir e conferir alguns nomes à mão.
- "Jogos" e "gols pela seleção" de cada jogador vêm de uma fonte só (Wikipedia). São os números usados nas curiosidades dos 11 grupos lidos por script.
- Os resultados do mata-mata vêm das páginas da Wikipedia. Só a final foi conferida em outras fontes. Como conferência interna, os vencedores de cada fase são os mesmos que aparecem na fase seguinte.
- Em 8 jogadores a segunda lista dá outra posição. O álbum segue a da lista oficial da FIFA, que é a usada pela Wikipedia.
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
  - escrever os scripts que leram os elencos e os jogos dos outros 11 grupos nas fontes e montaram os registros de `js/dados.js`;
  - escrever o HTML, o CSS, o JavaScript e os scripts, a partir do prompt e das escolhas do aluno;
  - calcular o contraste das cores e rodar os testes automáticos;
  - escrever esta documentação técnica.
- A redação da Parte C.1 do relatório não usa IA.
- Outras IAs usadas pelo aluno: a preencher pelo Vitor, se houver.

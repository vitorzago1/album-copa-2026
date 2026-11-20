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
- Bandeiras (`assets/bandeiras/br.svg`, `ma.svg`, `ht.svg` e `gb-sct.svg`): biblioteca `flag-icons`, de Panayiotis Lipiridis, licença MIT. Origem: https://github.com/lipis/flag-icons (pasta `flags/4x3`). Copiadas em 19/11/2026, sem alteração. A licença está em `assets/bandeiras/LICENCA-flag-icons.txt`. Só as imagens foram usadas: nenhum código da biblioteca roda no site.

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
- Football365. Final confirmed squad lists and squad numbers for all 48 nations: https://www.football365.com/news/2026-world-cup-squads-full-48-teams-every-player
- UEFA. Scotland at the World Cup 2026: https://www.uefa.com/european-qualifiers/news/02a6-20d159741fe9-a2a8fac9839d-1000--scotland-at-the-world-cup-2026-squad-fixtures-group-and-hi/
- Concacaf. FIFA World Cup 2026 Team Profile: Haiti: https://www.concacaf.com/competitions/fifa-world-cup/news/fifa-world-cup-2026-team-profile-haiti
- Imprensa (Itatiaia, Diário de Pernambuco, O Popular, FourFourTwo, Sports Illustrated, ESPN, beIN Sports, Al Jazeera, Fox Sports, The National, Heavy, theScore): os endereços completos estão na lista `FONTES`, no começo de `js/dados.js`.

Pendências desta pesquisa:

- A lista oficial de elencos da FIFA em PDF (https://fdp.fifa.org/assetspublic/ce281/pdf/SquadLists-English.pdf) não pôde ser lida de forma automática. Vale abrir e conferir os 20 nomes à mão.
- O que cada seleção fez depois da fase de grupos está marcado como "a confirmar": a fonte consultada veio com dados confusos.
- Três curiosidades foram deduzidas da lista de elencos, e não de uma reportagem: El Kaabi (mais gols no elenco), Ricardo Adé (defensor mais velho do elenco) e Brahim Díaz (camisa 10).

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

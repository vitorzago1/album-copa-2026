# Decisões de design

Registro curto, em tópicos, do que foi decidido e de onde cada critério aparece no site. Atualizado até a versão `v0.4-acessibilidade`.

## Direção visual

- Foram propostas 3 direções: "Uma tinta só", "Rua enfeitada" e "Time de botão".
- Escolhida em 19/11/2026: **Uma tinta só**. Nome do site: **Colei!**
- Conceito: a página é impressa em uma tinta só (papel rosa com tinta azul); a cor de verdade só chega pelas figurinhas coladas.
- Tema escuro: papel e tinta trocam de lugar (papel azul com tinta rosa). Não é inversão automática de cores.
- A figurinha é um objeto impresso: a tinta dela não muda quando o tema muda.
- Em 22/11/2026 a direção passou a ser **Uma tinta só, vários papéis**: a tinta continua uma só, e o papel do fundo muda de cor ao longo da página (ver "Fundo com vários papéis e aviso de descer", mais abaixo).

## Regras visuais

- Cantos têm significado: canto vivo é o que está impresso na página (vaga, tira de grupos); 4 px é ferramenta (botão, campo); 10 px é o que se cola (figurinha, cartão, cupom).
- Só a figurinha colada tem sombra. No tema escuro a sombra vira contorno.
- Só o que foi posto à mão fica levemente torto (figurinha colada ou solta).
- Linha tracejada significa picote (o canhoto do cupom).
- A raridade aparece de três jeitos ao mesmo tempo: palavra, ícone (círculo, losango, estrela) e acabamento (liso, listras, trama). A cor da moldura é um quarto reforço.
- Etiquetas usam o negativo da tinta, sem cor nova.
- Numeração da figurinha em sequência ("Nº 127").
- Um único momento ensaiado: a abertura do pacotinho (a aba rasga no picote, as figurinhas saem uma depois da outra, de costas, e são viradas). As outras animações só respondem a uma ação da pessoa: virar e colar.

## Álbum e pacotinhos (v0.3)

- A figurinha que vira é um `<button>`: clique, Enter e Espaço funcionam sem código extra de teclado.
- A figurinha tem três faces: frente (retrato), verso (posição, clube e curiosidade) e costas (fechada, quando sai do pacotinho). De costas, a moldura não mostra a raridade.
- A seleção vem escrita na frente da figurinha: as cores da camisa sozinhas não dizem de quem ela é.
- O retrato é um busto genérico (cabeça lisa e camisa com o número). Não representa nenhuma pessoa.
- Colar tem dois caminhos com o mesmo resultado: arrastar da bandeja até a vaga (API de arrastar e soltar do HTML) ou o botão "Colar", que aparece na bandeja e na própria vaga.
- Só a vaga com o número da figurinha aceita o arrasto. As outras recusam.
- "Desfazer" não tem prazo. O enunciado do projeto sugeria "por alguns segundos"; ficou sem limite de tempo para não criar uma ação com tempo contado (critério 2.2.1). O recado fica até a próxima ação ou até ser fechado, e só a última colagem pode ser desfeita.
- As figurinhas do pacotinho são sorteadas e guardadas no momento do clique. A animação vem depois: fechar a página no meio não perde nada.
- Sorteio em forma de urna: cada comum entra com 6 bilhetes, cada brilhante com 3 e cada lendária com 1. O mesmo pacotinho não repete figurinha. Em 4.000 pacotinhos de teste saíram cerca de 70% de comuns, 25% de brilhantes e 4% de lendárias.
- Raridade (regra do álbum): lendária é o camisa 10, brilhante é a bandeira e o capitão, comum são as demais.
- Pacotinho do dia: um por dia, pela data do aparelho. Abrir em dias seguidos aumenta a sequência; pular um dia recomeça do 1.
- Conquistas (6): cada uma vale um pacotinho extra. Conquista feita continua feita, mesmo se a colagem for desfeita.
- Progresso em `localStorage`, na chave `colei.album.` mais o usuário (`visitante` enquanto não há login). Se o navegador bloquear o `localStorage`, o álbum vale só até fechar a página.
- Modo demonstração na página Sobre: 5 pacotinhos extras por clique e "Zerar álbum" com janela de confirmação.
- Na v0.3 o álbum tinha só o Grupo C. Os outros 11 grupos entraram na etapa 7.

## Os 12 grupos (etapa 7)

- 288 figurinhas: 48 seleções com a bandeira e 5 jogadores. Numeração pela ordem do sorteio (A1, A2, A3, A4, B1...).
- O Grupo C continua como foi pesquisado e escrito à mão. Os outros 11 grupos foram lidos por script das páginas da Wikipedia (elencos, grupos e mata-mata).
- Regra fixa para escolher os 5 jogadores: capitão; camisa 10; quem fez mais gols pela seleção na Copa; goleiro com mais jogos pela seleção; depois os com mais jogos pela seleção, primeiro nas posições sem ninguém.
- Raridade igual à do Grupo C: lendária é o camisa 10; brilhante é a bandeira e o capitão; comum são as demais. Capitão que veste a 10 é lendária. Total: 48 lendárias, 85 brilhantes e 155 comuns.
- A curiosidade de cada jogador desses grupos é uma frase montada com dados da lista de elencos (jogos e gols pela seleção até o começo da Copa, idade em 11/06/2026) e com os gols na Copa, somados jogo a jogo.
- A campanha e o "depois do grupo" de cada seleção são montados a partir dos placares. A posição no grupo foi calculada por pontos, saldo e gols, e conferida com a frase da fonte que diz quem ficou em primeiro e em segundo.
- "Jogos" e "gols pela seleção" vêm de uma fonte só (Wikipedia). Número, nome e clube foram cruzados com a lista do Football365.
- Cores do desenho de cada seleção (campo, camisa e número): escolhidas a partir do uniforme e da bandeira e conferidas por script (número sobre a camisa e silhueta sobre o campo com pelo menos 3:1).
- "Holanda" foi o nome usado para a seleção dos Países Baixos, por ser o mais comum no Brasil.
- "Como terminou": página final do álbum com a campeã, os quatro primeiros, a final e os prêmios. Fica sempre visível, fora da busca e dos filtros.
- Índice de grupos no topo do álbum: reaproveita a tira de 12 casas da página inicial, agora com links.
- Não foram feitas as figurinhas das 16 sedes nem as especiais, que o enunciado dava como sugestão. As sedes aparecem no carrossel da página inicial.

## Entrar, contato, trocas, carrossel e sobre (etapa 6)

- Login simulado, sem servidor. A página diz isso em um cartão ao lado do formulário, e a página Sobre repete.
- A senha não é guardada. Guarda-se o hash SHA-256 de "sal + senha", calculado com `crypto.subtle` do navegador. O sal tem 16 bytes sorteados por conta.
- Limite assumido: SHA-256 é rápido demais para proteger senha em um sistema de verdade. Como aqui tudo fica no navegador da própria pessoa, serve para demonstrar a ideia. O README registra isso.
- E-mail desconhecido e senha errada dão a mesma mensagem, para não revelar quais e-mails têm conta.
- Sem campo "repita a senha": o botão "Mostrar senha" resolve o mesmo problema com um campo a menos.
- Ao criar a conta, o álbum de visitante passa para a conta nova. Cada conta tem a própria chave no `localStorage`.
- O menu troca "Entrar" por "Minha conta" quando há alguém dentro.
- Formulários com `novalidate`: as mensagens são as do site, iguais em todo navegador, no lugar dos balões do navegador.
- Erro de formulário: frase específica embaixo do campo, com ícone, ligada por `aria-describedby`. No contato há também um resumo no topo, que recebe o foco e tem um link para cada campo.
- O campo com erro é conferido de novo a cada tecla: a frase some quando o problema é consertado.
- Trocas: o texto da lista é montado a partir do álbum. O link do WhatsApp usa `wa.me/?text=`, sem número de telefone.
- Banca de trocas: simulação de uma troca um por um. Sorteia até três figurinhas que a pessoa não tem. Só aceita repetida.
- Carrossel: uma sede por vez, sem passar sozinho. Botões Anterior e Próxima, um indicador numerado por sede e a posição em texto com `role="status"`.
- Fotos dos estádios em uma tinta só: o arquivo é colorido e o CSS aplica preto e branco mais duas camadas de cor (`mix-blend-mode`). No alto contraste a foto fica em preto e branco.
- Três fotos foram trocadas por outras do mesmo estádio porque mostravam a marca oficial da Copa em destaque.
- A página Sobre separa em duas listas o que é de verdade e o que é simulado. Os créditos das fotos e as fontes dos dados são montados a partir de `js/dados.js`.

## Tipografia

- Londrina Solid (pesos 300 e 900): títulos e números. Usada só a partir de 24 px.
- Atkinson Hyperlegible Next (pesos 400 a 800): leitura. Desenhada para diferenciar letras e números parecidos (0 e O; 1, l e I).
- Tamanhos em `rem`, para o texto inteiro crescer junto com a escolha do painel.
- Linha de texto limitada a cerca de 62 caracteres.

## Estrutura e código

- Cabeçalho e rodapé repetidos nos 7 arquivos HTML (sem ferramenta de build).
- O painel de acessibilidade é montado pelo JavaScript em um `<dialog>`; o HTML do painel fica em um lugar só (`js/tema-acessibilidade.js`).
- Sem JavaScript, o menu fica sempre aberto e os botões que dependem de script não aparecem.
- As preferências viram atributos no `<html>` (`data-tema`, `data-fonte`, `data-contraste`, `data-movimento`, `data-espacamento`, `data-links`).
- O endereço aceita atalhos, como `index.html?tema=escuro`, sem alterar o que está salvo.

## Onde cada critério do WCAG 2.2 foi aplicado

| Critério | O que foi feito | Onde |
|---|---|---|
| 1.1.1 Conteúdo não textual | Bandeira da figurinha com `alt`; bandeirinha do título com `alt=""` (o nome vem ao lado); desenho do pacotinho escondido do leitor de tela (o botão "Rasgar" faz o mesmo); cada foto de estádio com um `alt` que descreve o que aparece | `js/figurinha.js`, `js/album.js`, `js/pacotinho.js`, `js/dados.js` |
| 1.3.1 Informações e relações | `header`, `nav`, `main`, `footer`; títulos em ordem; `fieldset` e `legend` no painel; `label` em todo campo; ficha da seleção em lista de termos (`dl`) | os 7 HTML, `js/tema-acessibilidade.js`, `js/album.js` |
| 1.3.5 Identificar o objetivo da entrada | `autocomplete` em nome, e-mail e senha (`name`, `email`, `current-password`, `new-password`) | `login.html`, `contato.html` |
| 1.4.1 Uso de cor | Raridade com palavra, ícone e textura; seleção escrita na figurinha; vaga com "Falta" ou "Está na sua mão"; aba escolhida mais pesada e sublinhada; dia carimbado com um círculo; link sempre sublinhado; erro com ícone e frase | `css/componentes.css`, `css/base.css`, `js/figurinha.js` |
| 1.4.3 Contraste (mínimo) | 236 pares calculados, 0 reprovados (página nos 4 temas e cores das 48 seleções) | `docs/cores.md`, `scripts/contraste.js` |
| 1.4.4 Redimensionar texto | Medidas em `rem`; letra em 3 tamanhos (100%, 112,5% e 125%); a figurinha cresce na altura se o texto não couber | `css/tokens.css`, `css/acessibilidade.css`, `css/paginas.css` |
| 1.4.10 Refluxo | Sem rolagem lateral em 320 px, inclusive com letra maior (início, álbum, pacotinhos e sobre) | `css/base.css`, `css/paginas.css` |
| 1.4.11 Contraste não textual | Bordas, anel de foco, barra e botão dentro da vaga com pelo menos 3:1 | `docs/cores.md` |
| 1.4.12 Espaçamento de texto | Opção "Mais espaço no texto", que vale também para botões, campos e figurinhas; nada corta nem sai da tela | `css/acessibilidade.css`, `css/base.css` |
| 2.1.1 Teclado | Só botões e links nativos; painel em `<dialog>`; figurinha vira com Enter ou Espaço; abas com setas, Home e End; colar pelo botão | os 7 HTML, `js/figurinha.js`, `js/album.js` |
| 2.2.1 Tempo ajustável | O recado com "Desfazer" não some sozinho | `js/album.js` |
| 2.3.3 e 2.2.2 Movimento | Opção "Reduzir animações" e respeito a `prefers-reduced-motion`: a figurinha troca de face sem girar e o pacotinho abre sem espera; o carrossel não passa sozinho | `css/acessibilidade.css`, `js/pacotinho.js`, `js/carrossel.js` |
| 2.4.1 Ignorar blocos | Link "Pular para o conteúdo" | os 7 HTML, `css/base.css` |
| 2.4.3 Ordem do foco | A ordem do Tab segue a ordem da página; depois de colar, desfazer ou rasgar, o foco vai para um lugar que existe (a figurinha colada, o botão vizinho, o título das figurinhas) | os 7 HTML, `js/album.js`, `js/pacotinho.js` |
| 2.4.7 Foco visível | Anel de 3 px em dois tons (anel e vão) | `css/base.css` |
| 2.4.11 Foco não encoberto | O cabeçalho não é fixo; a página deixa uma folga de rolagem para o recado do pé da tela (`scroll-padding-bottom`) e ganha espaço no fim enquanto o recado está aberto | `css/base.css`, `css/paginas.css`, `js/album.js` |
| 2.5.7 Movimentos de arrastar | Tudo o que se faz arrastando também se faz pelo botão "Colar" | `js/album.js` |
| 2.5.8 Tamanho do alvo | Botões, abas e links de menu com 44 px de altura | `css/base.css`, `css/componentes.css` |
| 3.1.1 Idioma da página | `lang="pt-BR"` | os 7 HTML |
| 3.2.3 Navegação consistente | Mesmo cabeçalho e rodapé em todas as páginas | os 7 HTML |
| 3.3.1 Identificação do erro | O campo com erro é marcado (`aria-invalid`) e ganha uma frase com ícone; no contato, um resumo lista todos | `js/formulario.js`, `js/login.js`, `js/contato.js` |
| 3.3.2 Rótulos ou instruções | Todo campo tem `label`; dicas escritas antes do campo ("Pelo menos 8 caracteres") | `login.html`, `contato.html`, `album.html` |
| 3.3.3 Sugestão de erro | A frase diz como consertar ("O formato é nome@exemplo.com", "Faltam 3") | `js/login.js`, `js/contato.js` |
| 3.3.8 Autenticação acessível | Entrar só pede e-mail e senha; colar e gerenciador de senhas funcionam; botão de mostrar a senha | `login.html`, `js/formulario.js` |
| 4.1.2 Nome, função, valor | `aria-expanded` no botão Menu; `aria-current` na página atual; `aria-labelledby` no painel; abas com `role="tablist"`, `tab` e `tabpanel` e `aria-selected`; botão "Colar" diz qual figurinha cola | os 7 HTML, `js/menu.js`, `album.html`, `js/album.js` |
| 4.1.3 Mensagens de status | `role="status"` no aviso do painel, no número de resultados da busca, no aviso de colar, desfazer, virar e revelar, no modo demonstração, na posição do carrossel, no sucesso do contato (com `aria-live`), na conta e na troca; `role="alert"` no erro de login | `js/tema-acessibilidade.js`, `album.html`, `pacotinhos.html`, `sobre.html`, `index.html`, `contato.html`, `login.html`, `trocas.html` |

## Onde cada heurística de Nielsen aparece

| Heurística | Onde aparece no site (até a etapa 6) |
|---|---|
| 1. Visibilidade do status do sistema | Página atual marcada no menu; aviso "Tema: Escuro." ao mudar uma preferência; placar e barras do álbum, por grupo e por seleção; número em cada aba; recado depois de colar ("Colou a Nº 51. Faltam 18."); "Faltam virar 3" no pacotinho; cartela da sequência |
| 2. Correspondência com o mundo real | Vocabulário de quem coleciona (pacotinho, colar, repetidas, falta); vaga numerada e com o nome impresso, como no álbum de papel; pacotinho com picote; carimbo nas conquistas |
| 3. Controle e liberdade do usuário | "Desfazer" depois de colar; "Limpar busca e filtros"; "Cancelar" e Esc na janela de zerar; "Voltar ao padrão" no painel; Esc fecha o painel e o menu |
| 4. Consistência e padrões | Mesmo cabeçalho e rodapé; link sempre sublinhado; botão principal sempre na mesma cor; cantos com significado fixo; abas e janelas no padrão do WAI-ARIA |
| 5. Prevenção de erros | A vaga errada recusa a figurinha arrastada; confirmação antes de zerar o álbum; clique duplo não abre dois pacotinhos; dica antes do campo de senha; opção já marcada na banca de trocas |
| 6. Reconhecimento em vez de memorização | Raridade, seleção e número escritos na própria figurinha; nome impresso na vaga; a vaga da figurinha arrastada fica marcada; painel abre com as opções atuais já marcadas |
| 7. Flexibilidade e eficiência de uso | Colar arrastando ou pelo botão; "Virar todas"; "Colar as novas" direto do pacotinho; busca sem depender de acento; "Pular para o conteúdo"; preferências salvas; atalho pelo endereço (`?tema=escuro`) |
| 8. Estética e design minimalista | Página em uma tinta só; um único momento ensaiado (o pacotinho) |
| 9. Ajudar a reconhecer e corrigir erros | Busca sem resultado explica o que houve e oferece limpar os filtros; nos formulários, frase específica com ícone embaixo do campo, resumo com link para cada campo e foco levado ao primeiro problema |
| 10. Ajuda e documentação | Seção "Como funciona" na página inicial; texto da bandeja explica os dois jeitos de colar; texto de apoio no painel; passo a passo do modo demonstração no README |

## Cenas presas à rolagem na página inicial (etapa 10)

- **Mudança de direção no movimento.** A regra "um único momento orquestrado" valia até a v0.4. Em 21/11/2026 o site pronto foi avaliado como genérico, e a escolha, feita em duas páginas de teste, foi por uma página inicial em cenas presas à rolagem. Nas outras páginas, o movimento continua só respondendo a ações.
- **O que não mudou.** Uma tinta só, com a cor chegando pelas figurinhas; as duas fontes; o significado dos cantos; raridade sempre por escrito.
- **A cor só pelas figurinhas, também nas cenas.** Na faixa dos grupos, a bandeira aparece impressa em uma tinta e ganha cor quando vira figurinha, no meio da tela. No mergulho, a cor que toma a tela é a do retrato de uma figurinha, e a frase vem em uma etiqueta de papel branco: nenhum texto é escrito direto sobre a cor de uma seleção.
- **Sem biblioteca.** As cenas usam `position: sticky`, transformações 3D do CSS, `<canvas>` e `requestAnimationFrame`.
- **Uma página, dois jeitos.** O CSS padrão é a versão parada. A classe `com-cenas`, posta no `<html>` pelo `js/cenas.js`, liga a versão em movimento.
- **Quando a versão parada é usada:** "Reduzir animações" no painel; aparelho pedindo menos movimento; letra maior que o normal ou "Mais espaço no texto"; JavaScript desligado.
- **Por que letra maior pede a versão parada.** O palco tem a altura exata da tela. Um texto maior poderia não caber e ficar cortado. Na versão parada, o texto cresce sem limite.
- **Aparelho pedindo menos movimento.** O pedido é respeitado. A página mostra um aviso com o botão "Ligar as animações neste site", e a escolha fica guardada (`movimento: completo` nas preferências).
- **Faixa dos grupos, e não das sedes.** O carrossel das 16 sedes é item do trabalho e ficou como estava. A faixa horizontal mostra os 12 grupos e leva a cada um no álbum.
- **Páginas do álbum em 3D.** São uma amostra fixa do Grupo C, com algumas vagas. Não mostram o álbum da pessoa. Para o leitor de tela, a ilustração tem uma descrição em texto.
- **Números.** 48, 288, 16 e 104 estão escritos no HTML e são conferidos com `js/dados.js` pelo script. O número que conta fica escondido do leitor de tela, que lê o valor final.

### WCAG 2.2 nas cenas

| Critério | Como foi atendido |
|---|---|
| 1.3.4 Orientação | As cenas funcionam em pé e deitado. Com menos de 480 px de altura, as peças encolhem. |
| 1.4.4 e 1.4.12 Texto maior e espaçamento | Com letra maior ou mais espaço no texto, a página usa a versão parada. |
| 1.4.10 Reflow | Sem rolagem lateral em 320 px, em movimento e parada. |
| 2.1.1 Teclado | Todos os botões e links das cenas recebem foco. A rolagem pelas cenas funciona com as setas, Espaço e Page Down. |
| 2.2.2 Pausar, parar, ocultar | Nada se mexe sozinho por mais de 5 segundos. O balanço dos pontinhos para depois do último gesto. O fio de "Desça para continuar" repete 3 vezes. |
| 2.3.3 Animação por interação | "Reduzir animações" troca todas as cenas pela versão parada. |
| 2.4.3 e 2.4.7 Ordem e foco visível | A ordem do foco segue a ordem da página. Ao focar um botão de dentro de uma cena, a rolagem vai até o ponto em que ele aparece. |
| 2.4.11 Foco não encoberto | Nenhum botão focado fica atrás de outra peça (conferido no passeio com o Tab). |
| 4.1.2 Nome, função, valor | As peças só de enfeite (canvas, álbum em 3D, figurinhas do voo) ficam fora da leitura (`aria-hidden`), com texto equivalente ao lado quando informam algo. |

## Pacotinho em 3D (etapa 11)

- **Biblioteca.** Three.js r128, autorizada pelo aluno em 21/11/2026. É a única do site. O motivo e a origem estão no README, em "Tecnologias".
- **Um modelo, dois usos.** O mesmo `js/pacote3d.js` gera a sequência de quadros da página inicial e roda ao vivo na página Pacotinhos.
- **Por que quadros na página inicial.** A página inicial fica sem a biblioteca (600 KB a menos) e sem depender de WebGL. O custo são cerca de 1,35 MB de imagens por tema, baixadas só com as cenas em movimento.
- **Por que ao vivo na página Pacotinhos.** Ali o pacotinho responde ao ponteiro, o que imagens prontas não fazem.
- **Cores.** A estampa lê `--cor-etiqueta-fundo`, `--cor-etiqueta-texto` e `--cor-prata` do CSS. O pacotinho é azul com letra rosa no tema claro e rosa com letra azul no escuro, como o de CSS. A luz foi ajustada medindo a cor do desenho contra a cor do CSS.
- **Dois conjuntos de quadros.** As imagens já vêm pintadas, então há um conjunto por tema. O alto contraste usa o conjunto do tema em que está.
- **As figurinhas não são 3D da biblioteca.** Continuam sendo elementos comuns da página, atrás da tela de desenho. O texto delas continua legível para o leitor de tela.
- **Coreografia nova da cena.** O pacotinho entra girando, a aba é rasgada, ele vira devagar enquanto as figurinhas sobem e depois cai para fora da cena. Antes ele sumia aos poucos.
- **Plano B em três níveis.** Sem movimento: pacotinho de CSS parado. Imagens que não chegam: pacotinho de CSS animado. Sem WebGL na página Pacotinhos: pacotinho de CSS.
- **Movimento na página Pacotinhos.** A inclinação só acontece com o ponteiro em cima e para quando ele sai. Com "Reduzir animações", o pacotinho 3D fica parado e a página não espera a animação de rasgar.
- **Acessibilidade.** As telas de desenho ficam fora da leitura de tela (`aria-hidden`). O botão "Rasgar o pacotinho" continua sendo o controle com nome e foco.

## Efeitos do primeiro laboratório (etapa 12)

- **O que entrou.** Só as nove ideias marcadas pelo aluno no laboratório 1 (números 10, 11, 12, 13, 14, 15, 17, 18 e 19). As nove ideias de fundo, o papel picado, os sons, a vibração, a inclinação do celular, o aplicativo instalável e o compartilhar não foram marcados e não entraram.
- **Todo movimento responde a uma ação.** Ponteiro (lendária, retícula, balanço do pacotinho), clique (batida, rasgo, leque, virada de página) ou rolagem (casas, carimbo, campo). Nada começa sozinho.
- **Lendária holográfica em todo lugar.** Vale para qualquer figurinha lendária de frente. De costas ou no verso a camada de brilho some, porque ali só há texto. Sem ponteiro fica um brilho fraco, que também aparece no celular.
- **O brilho não muda com o tema.** O arco-íris é um valor só (`--holografico`, em `css/tokens.css`), porque a figurinha é um objeto impresso. Ele fica por cima da figurinha como brilho; nenhum texto é escrito sobre ele.
- **Batida no lugar da animação antiga de colar.** A classe continua a mesma (`figurinha-colando`); mudou o desenho da animação. A casa ganha a classe `bateu` só na figurinha recém-colada.
- **Carimbo que espera.** O quadro de conquistas fica no fim do álbum, longe de onde se cola. O carimbo de uma conquista nova fica guardado até o quadro aparecer na tela.
- **Rasgo.** Na página Pacotinhos quem aparece é o pacotinho 3D, que já rasga de verdade. O rasgo em serra, o brilho e o balanço foram para o pacotinho de CSS, que é o plano B. A saída em leque vale para os dois.
- **Virar a página.** Uma direção só, da direita para a esquerda, para qualquer troca. Cabeçalho e rodapé têm nome próprio na transição e ficam parados.
- **Entrar ao rolar só no álbum.** É onde há muitas casas iguais. A animação termina quando a casa está 90% dentro da tela: uma casa inteira à vista já está assentada.
- **Placar.** Só o número grande do topo do álbum gira. Os números da página inicial já contam pela rolagem.
- **Retícula que acende.** Só com mouse (no toque não há ponteiro parado). Fica desligada na página inicial em movimento, que já tem os pontinhos da abertura.
- **Traço que se desenha.** Usado três vezes: o sublinhado da frase e o campo atrás dos números (pela rolagem, na página inicial) e o campo do fim do álbum (quando a seção aparece).

### WCAG 2.2 nos efeitos

| Critério | Como foi atendido |
|---|---|
| 1.1.1 Conteúdo não textual | Campo, retícula e fitas do placar são enfeite e ficam fora da leitura de tela. |
| 1.3.1 e 4.1.2 Informação e nome | O número do placar é um texto comum, lido no lugar das fitas. A raridade da lendária continua escrita. |
| 1.4.1 Uso da cor | O brilho holográfico é um reforço: a palavra "Lendária", a estrela e a trama continuam. |
| 1.4.3 Contraste | Na faixa do texto, o brilho da lendária tem um terço da força. Contraste medido do nome com o brilho por cima: 6,5:1 no pior caso (tema escuro, ponteiro em cima do nome). Os pares de cor do site não mudaram (236 pares, 0 reprovados). |
| 1.4.10 Reflow | A batida e o leque não criam rolagem lateral, nem em 320 px. |
| 2.2.2 Pausar, parar, ocultar | Nenhum efeito dura mais de 5 segundos nem começa sozinho. |
| 2.3.3 Animação por interação | "Reduzir animações" desliga a inclinação, a batida, o carimbo, a entrada das casas, o desenho do campo, a retícula e a virada de página. |
| 2.4.7 e 2.4.11 Foco | Uma casa com foco está inteira na tela e, portanto, assentada e opaca. Ao colar, o foco vai para a figurinha, como antes. |
| 2.5.8 Tamanho do alvo | Os botões "Colar" continuam com 44 px de altura no lugar deles. |

## Fundo com vários papéis e aviso de descer (etapa 13)

- **Pedido do aluno em 22/11/2026.** Um fundo com mais de uma cor e com detalhes, no lugar da cor única, e um aviso "Desça para continuar" onde é preciso rolar. Na etapa 12 as texturas de fundo do laboratório tinham ficado de fora; este pedido veio depois e vale no lugar daquela decisão.
- **O que mudou na direção.** De "Uma tinta só" para "Uma tinta só, vários papéis". Texto, fios e botões não ganharam cor nova. Os papéis são tons claros (no escuro, tons fundos), e a cor viva continua chegando só pelas figurinhas.
- **Quatro papéis por tema.** Claro: rosa, pêssego, menta e lilás. Escuro: azul, roxo, petróleo e vinho. Depois do quarto papel o fundo volta ao primeiro e se repete a cada 4400 px, sem emenda.
- **Passagem em retícula, e não degradê liso.** Bolinhas que crescem são a mesma linguagem dos pontinhos da abertura e do retrato das figurinhas: impressão em papel.
- **Topo sempre no papel 1.** Toda página começa no rosa (ou no azul): o cabeçalho fica igual nas 7 páginas.
- **Linhas de campo.** Círculo central, grande área com meia-lua, cantos e duas cruzes de registro. Desenho próprio, feito com degradês de CSS; não é logo nem emblema.
- **Força das linhas.** 9% da tinta no tema claro e 7% no escuro. Com esses valores, o texto que menos contrasta ainda passa de 4,5:1 quando fica em cima de uma linha (pior caso: 4,76:1).
- **Uma camada só.** Papéis e linhas ficam no `body::before`, do tamanho da página inteira, atrás do conteúdo. O fundo rola junto com a página e não se mexe.
- **Por que um script desenha a tira.** A tira dos papéis é uma imagem SVG escrita dentro do CSS, e uma imagem assim não lê as variáveis de cor do site. O `scripts/gerar-fundo.js` lê os quatro papéis de cada tema no `css/tokens.css` e escreve a imagem com eles. Ao mudar uma cor de papel, roda-se o script de novo.
- **Sem arquivo de imagem novo.** A tira fica dentro do CSS: funciona com o site aberto direto do arquivo e não faz pedido a mais.
- **Alto contraste.** O fundo fica liso, branco ou preto, sem papéis e sem linhas.
- **Aviso criado pelo motor das cenas.** O `js/cenas.js` põe o aviso em toda cena registrada; uma cena nova ganha o aviso sem código a mais. O atributo `data-aviso-de` no HTML atrasa a entrada (usado na abertura, com 0.2, porque o convite da primeira tela já traz a frase).
- **Etiqueta de papel claro.** O aviso fica em uma etiqueta do papel de cupom, de canto vivo, para ser lido por cima de qualquer cena.
- **Quando some.** Entre 80% e 88% da cena, quando a próxima seção já está chegando.
- **No que o aviso encosta.** Em nenhum texto, botão ou link. Ele pode passar por cima do desenho das figurinhas do mergulho e do voo, que são enfeite em movimento.

### WCAG 2.2 no fundo e no aviso

| Critério | Como foi atendido |
|---|---|
| 1.1.1 Conteúdo não textual | O fundo é enfeite feito em CSS e não entra na leitura de tela. O aviso tem `aria-hidden`. |
| 1.4.1 Uso da cor | A cor do papel não informa nada: nenhuma seção depende dela para ser entendida. |
| 1.4.3 Contraste | Texto, link e mensagens conferidos nos quatro papéis dos dois temas. Menor valor sobre o papel liso: 5,62:1 (link sobre o papel rosa). Menor valor com uma linha de campo por cima: 4,76:1. Tabela em `docs/cores.md`. |
| 1.4.11 Contraste não textual | Borda de campo e de vaga: de 4,86:1 a 5,58:1 nos quatro papéis. Foco: acima de 9:1. |
| 1.4.4 e 1.4.12 Texto maior e espaçamento | Com letra maior ou mais espaço no texto, a página inicial usa a versão parada, sem aviso. |
| 1.4.10 Reflow | A camada do fundo não cria rolagem lateral em 320 px, em nenhuma das 7 páginas. |
| 2.2.2 Pausar, parar, ocultar | O fundo não se mexe. O fio do aviso desce 3 vezes (4,8 segundos) e para. |
| 2.3.3 Animação por interação | Com "Reduzir animações" não há cena presa nem aviso. |
| 2.4.11 Foco não encoberto | O aviso não cobre nenhum link ou botão (conferido em 6 tamanhos de tela e com um link de grupo focado pelo teclado). |

## Verificação feita na etapa 13

- 37 verificações automáticas novas no Microsoft Edge sem janela. Fundo: presente nas 7 páginas e nos dois temas; cor de cada papel lida nos pixels de um print (papéis 1, 2, 3, 4 e de novo 1); bolinhas da retícula que crescem; força da linha de campo; alto contraste liso; sem rolagem lateral em 320 px; links por cima do fundo continuam clicáveis; fundo igual sem JavaScript; a tira guardada no `tokens.css` é a que o script desenha com as cores atuais. Aviso: presente nas 8 cenas, fora da leitura de tela, aceso no meio e apagado no fim de cada cena, fio que desce 3 vezes, ausente na versão parada e sem JavaScript.
- O aviso foi conferido em 6 tamanhos de tela (1280×720, 1366×625, 1024×600, 740×360, 360×740 e 320×568), em 6 pontos de cada cena: cabe na tela e não cobre texto, botão ou link.
- Defeito achado por essa conferência e corrigido: em 1024×600 o aviso ficava por cima do link "Ver o Grupo no álbum".
- As 416 verificações anteriores continuam passando.
- Contraste: `node scripts/contraste.js` com 372 pares, 0 reprovados.
- Limite conhecido: nos pontos em que duas linhas de campo se cruzam (pontos de poucos pixels, menores que uma letra) a força da linha dobra. Um texto exatamente em cima de um desses pontos teria ali 4,06:1 no pior caso. A conta de contraste considera uma linha por vez.
- No navegador embutido do aplicativo de programação, a página inicial carregou os arquivos novos sem erro no console (tema escuro, 8 avisos, fundo com as 16 camadas).
- Ainda não verificado: Firefox, Safari, celular de verdade, leitor de tela (NVDA) e Lighthouse.

## Verificação feita na etapa 12

- 47 verificações automáticas novas no Microsoft Edge sem janela: placar (texto para o leitor de tela, fita no algarismo certo), entrada das casas pela rolagem, lendária (brilho parado, inclinação com o ponteiro, volta ao prumo, verso sem brilho), batida (animações, foco, sem rolagem lateral em nenhum momento em 320 px), carimbo que espera e bate ao aparecer, campo do álbum, leque (ponto de partida comum e chegada sem sobra), pacotinho de CSS com rasgo em serra, campo dos números pela rolagem, retícula nas 7 páginas (acende com o mouse, apaga com o toque, não atrapalha cliques), virada de página ligada nas 7 páginas, menos movimento e alto contraste.
- As 369 verificações anteriores continuam passando (uma foi ajustada: a altura do botão "Colar" passou a ser medida no lugar dele, e não durante a entrada da casa).
- Defeito achado pelos testes e corrigido: a tremida da casa ao colar não valia, porque a regra da entrada ao rolar ganhava dela.
- Contraste do nome da figurinha lendária, medido nos prints com o brilho por cima: de 6,5:1 a 9,6:1 nos dois temas. Na primeira versão do efeito o pior caso era 4,4:1 (abaixo do mínimo de 4,5:1); por isso o brilho foi enfraquecido sobre o texto.
- A virada de página foi conferida com cliques de mouse de verdade em três links do menu, no Edge sem janela: em cada troca o navegador registrou a saída, a chegada, o começo e o fim da animação, sem erro.
- No navegador embutido do aplicativo de programação usado no projeto, a animação da virada é abandonada pelo próprio navegador (mensagem "Page already revealed" no console) e a troca fica seca. As páginas abrem normalmente. Falta conferir em uma janela comum do Edge ou do Chrome.
- Ainda não verificado: Firefox e Safari (onde a virada de página e a entrada ao rolar podem não existir), celular de verdade, leitor de tela (NVDA) e Lighthouse.

## Verificação feita na etapa 11

- 34 verificações automáticas novas no Microsoft Edge sem janela: pedido dos 90 quadros só do tema em uso, peso, troca do pacotinho de CSS pela tela, o que a tela mostra em quatro pontos da rolagem, figurinhas atrás do pacotinho, tema escuro, nenhum pedido de imagem na versão parada, plano B quando as imagens falham, pacotinho ao vivo (desenhado, inclina, volta e para, troca de tema, rasga, abre outro), menos movimento, 320 px, navegador sem WebGL e o gerador de quadros.
- As 335 verificações anteriores continuam passando (duas delas foram atualizadas para a coreografia nova do pacotinho).
- A cor do corpo do pacotinho foi medida nos quadros: perto de `#232A51` no tema claro (alvo `#14204F`) e de `#E2CED9` no escuro (alvo `#FBE3E9`). A diferença é a luz e o reflexo do papel laminado.
- O teste e a geração dos quadros rodaram com desenho 3D por programa (SwiftShader), sem placa de vídeo. A fluidez do pacotinho ao vivo em placa de vídeo e em celular de verdade ainda não foi medida.
- Ainda não verificado: Firefox, Safari, celular de verdade, leitor de tela (NVDA) e Lighthouse.

## Verificação feita na etapa 10

- 81 verificações automáticas novas no Microsoft Edge sem janela: palco grudado em cada cena, estado de cada cena no começo e no fim, nenhum pontinho atrás do texto da abertura, balanço que para em 5 segundos, foco pelo teclado nos botões das cenas e nos links dos grupos, troca entre movimento e parado pelo painel, botão do aviso, escolha guardada, página sem JavaScript, 320 px, 390 px, celular deitado, letra maior e console sem erros.
- As 254 verificações anteriores continuam passando.
- Defeito achado pelo passeio com o Tab e corrigido: ao focar um botão de dentro de uma cena, o navegador rolava a página por conta própria e o botão sumia.
- O teste roda sem placa de vídeo. A fluidez das cenas em um computador e em um celular de verdade ainda não foi medida.
- Ainda não verificado: Firefox, Safari, celular de verdade, leitor de tela (NVDA) e Lighthouse.

## Verificação no endereço publicado (etapa 9)

- Feita em 21/11/2026, em `https://vitorzago1.github.io/album-copa-2026/`, com o Microsoft Edge sem janela.
- As 254 verificações automáticas passaram no site no ar: 42 da base (temas, painel, menu), 114 do álbum e dos pacotinhos, 68 das outras páginas e 30 da auditoria de estrutura, teclado e zoom.
- A página, as 7 folhas de HTML, os estilos, os scripts, as fontes, as bandeiras e as fotos respondem sem erro. Console sem erros.
- A página é considerada segura pelo navegador (`https`), e a ferramenta de hash da senha (`crypto.subtle`) funciona: criar conta, sair e entrar passaram.
- Continua sem verificação: Lighthouse ou axe, leitor de tela real (NVDA), Firefox, Safari, celular de verdade, e arrastar com mouse e com dedo.

## Verificação feita na etapa 8 (v0.4)

- Auditoria de estrutura, por script próprio, em 15 telas: `lang`, título da página, um `main`, um `header`, um `footer` e um `h1`; `alt` em toda imagem; rótulo em todo campo; nome em todo botão, link e aba; nenhum `id` repetido; `aria-labelledby`, `aria-describedby` e `aria-controls` apontando para elementos que existem; títulos sem pular nível; listas só com itens de lista; `fieldset` com `legend`; nenhum controle dentro de outro; nenhum controle dentro de área escondida do leitor de tela; cada `nav` com nome próprio. Resultado: 0 problemas.
- Só teclado, em 9 telas (computador e celular): o Tab passa por todos os controles visíveis; em cada parada o elemento está na tela, tem anel de foco e não está coberto. A janela de "Zerar álbum" prende o foco.
- Problema achado nessa rodada e corrigido: o recado fixo no pé da tela cobria os últimos links do rodapé (critério 2.4.11).
- Zoom de 200% (janela de 640 px) e de 400% (320 px), com letra maior e mais espaço no texto: 7 páginas sem rolagem lateral e sem texto cortado em botão.
- Contraste: 236 pares, 0 reprovados (140 da página nos 4 temas e 96 das cores das 48 seleções).
- Total de verificações automáticas na v0.4: 254.
- Não foi rodado: Lighthouse e axe. A tentativa de rodar o axe pelo script de teste foi barrada pelas permissões da sessão de IA. O README explica como rodar o Lighthouse pelo próprio navegador.
- Ainda não verificado: leitor de tela real (NVDA), Firefox, Safari, celular de verdade, arrastar com mouse e com dedo, e o site no endereço publicado.

## Verificação feita na etapa 7

- Consistência dos dados, por script: 288 figurinhas numeradas de 1 a 288 sem buraco; 6 por seleção, começando pela bandeira; 1 lendária por seleção; 4 seleções por grupo; toda fonte citada existe na lista; toda bandeira tem arquivo.
- Leitura das fontes: 48 elencos com 26 jogadores, um capitão e um camisa 10 cada; a soma dos gols por jogador bate com o placar nos 104 jogos; os vencedores de cada fase do mata-mata são os que aparecem na fase seguinte.
- Segunda lista (Football365): dos 220 jogadores dos grupos novos, 212 bateram em número, nome e clube; 7 só em nome e clube (Senegal e dois da Croácia, sem número na segunda lista); 1 é o substituto do Uzbequistão, explicado na Wikipedia. Em 8 jogadores a segunda lista dá outra posição (por exemplo, Kimmich como meio-campista); o álbum segue a posição da lista oficial da FIFA, que é a usada pela Wikipedia.
- Artilheiro somado jogo a jogo (Mbappé, 10 gols) igual ao da tabela de prêmios da fonte. Final (Espanha 1 a 0 Argentina, na prorrogação) conferida em ESPN, NPR e CBS News.
- As 224 verificações automáticas passam com o álbum completo. A página do álbum monta as 288 casas em cerca de 40 milésimos de segundo no computador de teste.

## Verificação feita na etapa 6

- 67 verificações automáticas novas: criar conta, hash e sal guardados no lugar da senha, entrar, sair, álbum separado por conta, mensagens de erro, mostrar senha, resumo de erros do contato, mensagem de sucesso, listas de troca, link do WhatsApp, banca de trocas, carrossel (teclado, volta do fim para o começo, sem passar sozinho), as 16 fotos com texto alternativo e crédito, 320 px com letra maior, títulos em ordem e console sem erros.
- `crypto.subtle` respondeu com o site aberto direto do arquivo (`file://`) no Edge. Falta conferir no endereço publicado (https) e em outros navegadores.
- No teste, o botão "Copiar lista" caiu no plano B (texto selecionado para Ctrl+C), porque o navegador sem janela não libera a área de transferência. Falta conferir a cópia direta em um navegador comum.
- O link do WhatsApp foi conferido só pelo endereço montado. Falta abrir de verdade em um celular.

## Verificação feita na v0.3

- 114 verificações automáticas novas no Microsoft Edge sem janela: regras do álbum (sorteio, pacotinho do dia, sequência, conquistas, separação por usuário), colar pelos dois botões, desfazer, arrastar e soltar, virar com clique, Enter e Espaço, abas pelo teclado, busca, filtros, pacotinho (rasgar, revelar, colar as novas), menos movimento, 320 px com e sem letra maior, alvos de toque, modo demonstração e console sem erros.
- As 42 verificações da v0.2 continuam passando.
- O arrastar foi testado com os eventos do navegador disparados pelo teste. Falta testar arrastando de verdade com o mouse e com o dedo.
- O Edge sem janela copia do Windows o pedido de menos movimento. Os testes ligam e desligam esse pedido para conferir os dois casos.
- Ainda não verificado: leitor de tela real (NVDA), Firefox, Safari, celular de verdade e verificação automática de acessibilidade (Lighthouse ou axe).

## Pendências conhecidas

- Lighthouse ou axe ainda não foram rodados (ver o README, "Como conferir a acessibilidade").
- A lista oficial de elencos da FIFA em PDF não foi lida (ver `docs/referencias.md`).

## Verificação feita na v0.2

- 42 verificações automáticas no Microsoft Edge sem janela: fontes locais, temas, tema automático, painel (abrir, escolher, salvar, Esc, volta do foco), ordem do Tab, 320 px sem rolagem lateral, alvos de toque, 7 páginas sem erro no console.

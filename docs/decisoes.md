# Decisões de design

Registro curto, em tópicos, do que foi decidido e de onde cada critério aparece no site. Atualizado até a versão `v0.3-album`.

## Direção visual

- Foram propostas 3 direções: "Uma tinta só", "Rua enfeitada" e "Time de botão".
- Escolhida em 19/11/2026: **Uma tinta só**. Nome do site: **Colei!**
- Conceito: a página é impressa em uma tinta só (papel rosa com tinta azul); a cor de verdade só chega pelas figurinhas coladas.
- Tema escuro: papel e tinta trocam de lugar (papel azul com tinta rosa). Não é inversão automática de cores.
- A figurinha é um objeto impresso: a tinta dela não muda quando o tema muda.

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
- As páginas dos outros 11 grupos ainda não existem. O álbum avisa isso no topo.

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
| 1.4.3 Contraste (mínimo) | 140 pares calculados, 0 reprovados | `docs/cores.md`, `scripts/contraste.js` |
| 1.4.4 Redimensionar texto | Medidas em `rem`; letra em 3 tamanhos (100%, 112,5% e 125%); a figurinha cresce na altura se o texto não couber | `css/tokens.css`, `css/acessibilidade.css`, `css/paginas.css` |
| 1.4.10 Refluxo | Sem rolagem lateral em 320 px, inclusive com letra maior (início, álbum, pacotinhos e sobre) | `css/base.css`, `css/paginas.css` |
| 1.4.11 Contraste não textual | Bordas, anel de foco, barra e botão dentro da vaga com pelo menos 3:1 | `docs/cores.md` |
| 1.4.12 Espaçamento de texto | Opção "Mais espaço no texto" | `css/acessibilidade.css` |
| 2.1.1 Teclado | Só botões e links nativos; painel em `<dialog>`; figurinha vira com Enter ou Espaço; abas com setas, Home e End; colar pelo botão | os 7 HTML, `js/figurinha.js`, `js/album.js` |
| 2.2.1 Tempo ajustável | O recado com "Desfazer" não some sozinho | `js/album.js` |
| 2.3.3 e 2.2.2 Movimento | Opção "Reduzir animações" e respeito a `prefers-reduced-motion`: a figurinha troca de face sem girar e o pacotinho abre sem espera; o carrossel não passa sozinho | `css/acessibilidade.css`, `js/pacotinho.js`, `js/carrossel.js` |
| 2.4.1 Ignorar blocos | Link "Pular para o conteúdo" | os 7 HTML, `css/base.css` |
| 2.4.3 Ordem do foco | A ordem do Tab segue a ordem da página; depois de colar, desfazer ou rasgar, o foco vai para um lugar que existe (a figurinha colada, o botão vizinho, o título das figurinhas) | os 7 HTML, `js/album.js`, `js/pacotinho.js` |
| 2.4.7 Foco visível | Anel de 3 px em dois tons (anel e vão) | `css/base.css` |
| 2.4.11 Foco não encoberto | O cabeçalho não é fixo; a página deixa uma folga de rolagem para o recado do pé da tela (`scroll-padding-bottom`) | `css/base.css`, `css/paginas.css` |
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

- A opção "Mais espaço no texto" ainda não afasta as letras dentro de botões e figurinhas (fica para a etapa de acessibilidade).
- "Depois do grupo" de Brasil e Marrocos está como "a confirmar".

## Verificação feita na v0.2

- 42 verificações automáticas no Microsoft Edge sem janela: fontes locais, temas, tema automático, painel (abrir, escolher, salvar, Esc, volta do foco), ordem do Tab, 320 px sem rolagem lateral, alvos de toque, 7 páginas sem erro no console.

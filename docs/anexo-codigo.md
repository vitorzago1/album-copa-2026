# Anexo: código do projeto

Arquivo gerado por `node scripts/gerar-anexo.js`. Não edite à mão: mude o código e rode o script de novo.

Projeto: Colei! Álbum de figurinhas da Copa 2026. Aluno: Vitor Zago Pontes Morais.

- Arquivos: 37.
- Linhas de código (com comentários): 13531.

| Arquivo | Linhas |
|---|---|
| `index.html` | 453 |
| `album.html` | 234 |
| `pacotinhos.html` | 137 |
| `trocas.html` | 166 |
| `login.html` | 183 |
| `contato.html` | 160 |
| `sobre.html` | 302 |
| `css/tokens.css` | 247 |
| `css/base.css` | 606 |
| `css/componentes.css` | 1361 |
| `css/paginas.css` | 537 |
| `css/acessibilidade.css` | 222 |
| `css/cenas.css` | 1120 |
| `js/tema-acessibilidade.js` | 226 |
| `js/menu.js` | 52 |
| `js/efeitos.js` | 106 |
| `js/estado.js` | 417 |
| `js/figurinha.js` | 225 |
| `js/album.js` | 700 |
| `js/pacotinho.js` | 242 |
| `js/trocas.js` | 200 |
| `js/inicio.js` | 53 |
| `js/carrossel.js` | 92 |
| `js/cenas.js` | 272 |
| `js/cenas-inicio.js` | 827 |
| `js/pacote3d.js` | 466 |
| `js/pacotinho-3d.js` | 170 |
| `js/formulario.js` | 53 |
| `js/login.js` | 312 |
| `js/contato.js` | 112 |
| `js/sobre.js` | 44 |
| `js/demonstracao.js` | 39 |
| `js/dados.js` | 2474 |
| `scripts/contraste.js` | 358 |
| `scripts/gerar-fundo.js` | 131 |
| `scripts/gerar-anexo.js` | 103 |
| `scripts/quadros.html` | 129 |

## Páginas (HTML)

### index.html

````html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Colei! Álbum de figurinhas da Copa 2026</title>
  <meta name="description" content="Álbum de figurinhas digital da Copa do Mundo de 2026: abra o pacotinho do dia, cole as figurinhas e troque as repetidas.">
  <link rel="icon" href="assets/svg/favicon.svg" type="image/svg+xml">

  <!-- Este script fica no começo de propósito: ele aplica o tema e as preferências
       salvas antes de a página aparecer, para a tela não "piscar" no tema errado. -->
  <script src="js/tema-acessibilidade.js"></script>
  <script src="js/menu.js" defer></script>
  <script src="js/efeitos.js" defer></script>

  <!-- Mostram o progresso de verdade na página: os dados, o caderninho do progresso e a página. -->
  <script src="js/dados.js" defer></script>
  <script src="js/estado.js" defer></script>
  <script src="js/figurinha.js" defer></script>
  <script src="js/inicio.js" defer></script>
  <script src="js/carrossel.js" defer></script>

  <!-- As cenas presas à rolagem: o motor e, depois, as oito cenas desta página. -->
  <script src="js/cenas.js" defer></script>
  <script src="js/cenas-inicio.js" defer></script>

  <link rel="stylesheet" href="css/tokens.css">
  <link rel="stylesheet" href="css/base.css">
  <link rel="stylesheet" href="css/componentes.css">
  <link rel="stylesheet" href="css/paginas.css">
  <link rel="stylesheet" href="css/acessibilidade.css">
  <link rel="stylesheet" href="css/cenas.css">
</head>
<body>
  <!-- Primeiro link da página: quem navega pelo teclado pula o menu e vai direto ao conteúdo. -->
  <a class="pular" href="#conteudo">Pular para o conteúdo</a>

  <!-- CABEÇALHO. É igual nas 7 páginas; só muda qual link leva aria-current="page". -->
  <header class="cabecalho">
    <div class="largura cabecalho-grade">
      <a class="marca" href="index.html" aria-label="Colei!, página inicial">Colei!</a>

      <!-- Em telas pequenas, este botão abre e fecha o menu (ver js/menu.js). -->
      <button class="botao-menu" type="button" aria-expanded="false" aria-controls="menu-principal">Menu</button>

      <nav class="menu" id="menu-principal" aria-label="Principal">
        <ul>
          <li><a href="index.html" aria-current="page">Início</a></li>
          <li><a href="album.html">Álbum</a></li>
          <li><a href="pacotinhos.html">Pacotinhos</a></li>
          <li><a href="trocas.html">Trocas</a></li>
          <li><a href="sobre.html">Sobre</a></li>
          <li><a href="contato.html">Contato</a></li>
          <li><a class="menu-entrar" href="login.html">Entrar</a></li>
        </ul>
      </nav>

      <!-- Abre o painel de acessibilidade (ver js/tema-acessibilidade.js). -->
      <button class="botao-acessibilidade" type="button" id="abrir-acessibilidade" aria-haspopup="dialog">
        <svg class="icone" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false">
          <circle cx="12" cy="4.5" r="2.2" fill="currentColor"/>
          <path d="M4 8.5h16M12 8.5v6M8 21l4-6.5 4 6.5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span class="botao-acessibilidade-texto">Acessibilidade</span>
      </button>
    </div>
  </header>

  <main id="conteudo" tabindex="-1">

    <!-- ABERTURA (cena 1). Os pontinhos de impressão se juntam e formam "Colei!".
         Parada, a cena mostra o convite ao lado da marca já formada.
         O desenho é feito pelo js/cenas-inicio.js dentro do <canvas>. -->
    <section class="cena cena-abertura" style="--altura: 240vh" data-aviso-de="0.2" aria-labelledby="titulo-abertura">
      <div class="cena-palco">
        <canvas class="reticula-tela so-com-js" id="reticula-tela" aria-hidden="true"></canvas>

        <div class="abertura-convite" id="abertura-convite">
          <h1 id="titulo-abertura">A Copa acabou. Seu álbum, não.</h1>
          <!-- data-visivel-em="0": estes botões aparecem no começo da cena (ver js/cenas.js). -->
          <p class="abertura-botoes" data-visivel-em="0">
            <a class="botao" href="album.html">Abrir o álbum</a>
            <a class="botao botao-contorno" href="pacotinhos.html">Ir para os pacotinhos</a>
          </p>
          <p class="rolar-dica" aria-hidden="true"><i></i>Desça para continuar</p>
        </div>

        <p class="abertura-assinatura" id="abertura-assinatura">O álbum de figurinhas da Copa de 2026</p>

        <!-- Só aparece para quem vê a página parada porque o aparelho pede menos movimento. -->
        <div class="aviso-movimento" id="aviso-movimento" hidden>
          <p>A apresentação desta página está parada porque o seu aparelho pede menos movimento.</p>
          <button class="botao botao-contorno botao-pequeno" type="button" id="ligar-movimento">Ligar as animações neste site</button>
        </div>
      </div>
    </section>

    <!-- A FRASE ACENDE (cena 2). Cada palavra acende quando a rolagem chega nela. -->
    <div class="cena cena-frase" style="--altura: 220vh">
      <div class="cena-palco">
        <div class="frase-caixa">
          <p class="frase" id="frase">São 48 seleções, 16 cidades-sede e muito espaço vazio esperando figurinha. Abra um pacotinho por dia, cole no lugar certo e troque as repetidas.</p>
          <svg class="frase-traco" viewBox="0 0 300 24" preserveAspectRatio="none" aria-hidden="true" focusable="false">
            <path id="frase-traco" pathLength="1" d="M6 10c60-7 150-8 288-3M14 19c80-6 170-7 262-2"/>
          </svg>
        </div>
      </div>
    </div>

    <!-- PROGRESSO. Uma casa por grupo, de A a L. O js/inicio.js enche cada casa
         conforme as figurinhas do grupo são coladas e troca o texto de baixo. -->
    <section class="largura secao fluxo" aria-labelledby="titulo-progresso">
      <h2 id="titulo-progresso">Seu álbum até agora</h2>
      <ol class="tira" aria-label="Progresso por grupo">
        <li class="tira-casa"><span class="tira-quadro" style="--parte: 0"></span><span><span class="escondido">Grupo </span>A</span></li>
        <li class="tira-casa"><span class="tira-quadro" style="--parte: 0"></span><span><span class="escondido">Grupo </span>B</span></li>
        <li class="tira-casa"><span class="tira-quadro" style="--parte: 0"></span><span><span class="escondido">Grupo </span>C</span></li>
        <li class="tira-casa"><span class="tira-quadro" style="--parte: 0"></span><span><span class="escondido">Grupo </span>D</span></li>
        <li class="tira-casa"><span class="tira-quadro" style="--parte: 0"></span><span><span class="escondido">Grupo </span>E</span></li>
        <li class="tira-casa"><span class="tira-quadro" style="--parte: 0"></span><span><span class="escondido">Grupo </span>F</span></li>
        <li class="tira-casa"><span class="tira-quadro" style="--parte: 0"></span><span><span class="escondido">Grupo </span>G</span></li>
        <li class="tira-casa"><span class="tira-quadro" style="--parte: 0"></span><span><span class="escondido">Grupo </span>H</span></li>
        <li class="tira-casa"><span class="tira-quadro" style="--parte: 0"></span><span><span class="escondido">Grupo </span>I</span></li>
        <li class="tira-casa"><span class="tira-quadro" style="--parte: 0"></span><span><span class="escondido">Grupo </span>J</span></li>
        <li class="tira-casa"><span class="tira-quadro" style="--parte: 0"></span><span><span class="escondido">Grupo </span>K</span></li>
        <li class="tira-casa"><span class="tira-quadro" style="--parte: 0"></span><span><span class="escondido">Grupo </span>L</span></li>
      </ol>
      <p id="progresso-texto">Nenhuma figurinha colada ainda. Cada casa é um grupo, de A a L, e vai enchendo conforme você cola.</p>
    </section>

    <!-- COMO FUNCIONA. É uma sequência de verdade, por isso é uma lista numerada. -->
    <section class="largura secao fluxo" aria-labelledby="titulo-como">
      <h2 id="titulo-como">Como funciona</h2>
      <ol class="passos">
        <li>
          <h3>Rasgue o pacotinho</h3>
          <p>Todo dia tem um pacotinho grátis com cinco figurinhas.</p>
        </li>
        <li>
          <h3>Vire a figurinha</h3>
          <p>Elas saem de costas. Vire uma por uma e torça pela lendária.</p>
        </li>
        <li>
          <h3>Cole no lugar</h3>
          <p>Cada figurinha tem um espaço numerado no álbum. As que vierem em dobro vão para as trocas.</p>
        </li>
      </ol>
    </section>

    <!-- O PACOTINHO GIRA E ABRE (cena 3). O pacotinho aparece de dois jeitos:
         1. uma sequência de 90 imagens de um pacotinho 3D (a técnica das páginas de
            produto), mostradas uma a uma no <canvas> conforme a rolagem;
         2. um pacotinho desenhado em CSS, usado na versão parada e enquanto as
            imagens ainda estão chegando.
         As cinco figurinhas são postas pelo js/cenas-inicio.js. -->
    <section class="cena cena-pacote" style="--altura: 360vh" aria-labelledby="titulo-cena-pacote">
      <div class="cena-palco palco-3d">
        <h2 class="cena-titulo" id="titulo-cena-pacote">Todo dia, um pacotinho.</h2>
        <p class="cena-titulo" id="pacote-titulo-2">Dentro dele, cinco figurinhas.</p>
        <div class="pacote-cena">
          <div class="pacote-figurinhas so-com-js" id="pacote-figurinhas"></div>
          <div class="pacote3d" id="pacote3d" aria-hidden="true">
            <div class="pacote3d-face pacotinho">
              <span class="pacotinho-aba" id="pacote3d-aba"><span>Rasgue aqui</span></span>
              <span class="pacotinho-corpo">
                <span class="pacotinho-marca">Colei!</span>
                <span class="pacotinho-texto">5 figurinhas</span>
              </span>
            </div>
            <div class="pacote3d-face pacote3d-costas">
              <span class="pacotinho-texto">Álbum da Copa 2026</span>
              <span class="pacotinho-texto">Abra pelo picote</span>
            </div>
          </div>
          <!-- Cada imagem da sequência tem 720 por 924 pixels. -->
          <canvas class="pacote-quadros so-com-js" id="pacote-quadros" width="720" height="924" aria-hidden="true"></canvas>
        </div>
      </div>
    </section>

    <!-- PACOTINHO DO DIA e RARIDADES, lado a lado na página dupla. -->
    <section class="largura secao dobra">
      <div>
        <article class="cartao" aria-labelledby="titulo-pacotinho">
          <h2 id="titulo-pacotinho">Pacotinho do dia</h2>
          <p id="pacotinho-texto">Um pacotinho grátis por dia, com cinco figurinhas. Amanhã tem outro.</p>
          <p><a class="botao" href="pacotinhos.html">Ir para os pacotinhos</a></p>

          <!-- O canhoto do cupom: a cartela da sequência de dias. -->
          <div class="cupom-canhoto fluxo">
            <h3>Sua sequência</h3>
            <ol class="cartela" id="cartela" aria-label="Cartela de sete dias seguidos">
              <li><span class="escondido">Dia </span>1</li>
              <li><span class="escondido">Dia </span>2</li>
              <li><span class="escondido">Dia </span>3</li>
              <li><span class="escondido">Dia </span>4</li>
              <li><span class="escondido">Dia </span>5</li>
              <li><span class="escondido">Dia </span>6</li>
              <li><span class="escondido">Dia </span>7</li>
            </ol>
            <p class="texto-apoio" id="sequencia-texto">Nenhum dia marcado ainda. Cada pacotinho aberto ganha um carimbo.</p>
          </div>
        </article>
      </div>

      <div class="fluxo">
        <h2 id="titulo-raridades">Raridades</h2>
        <p>Toda figurinha diz a raridade por escrito, com um ícone e um acabamento próprio. Nunca só pela cor.</p>
        <ul class="raridades" aria-labelledby="titulo-raridades">
          <li>
            <div class="figurinha figurinha-comum" style="--campo: #1E7B4F; --camisa: #F7D417; --numero: #14204F; --giro: -1.2deg" aria-hidden="true">
              <div class="figurinha-arte">
                <svg class="figurinha-busto" viewBox="0 0 60 60" preserveAspectRatio="xMidYMax meet" focusable="false">
                  <circle class="busto-cabeca" cx="30" cy="17" r="10"/>
                  <path class="busto-camisa" d="M7 61c0-15 9-24 23-24s23 9 23 24z"/>
                  <text class="busto-numero" x="30" y="57" text-anchor="middle">5</text>
                </svg>
              </div>
              <div class="figurinha-tarja">
                <span class="figurinha-nome">Amostra</span>
                <span class="raridade"><span class="raridade-icone raridade-icone-circulo"></span>Comum</span>
              </div>
            </div>
            <div>
              <h3>Comum</h3>
              <p>Fosca e sem textura. É a maioria do álbum.</p>
            </div>
          </li>
          <li>
            <div class="figurinha figurinha-brilhante" style="--campo: #1D4E9E; --camisa: #FFFFFF; --numero: #1D4E9E; --giro: 0.8deg" aria-hidden="true">
              <div class="figurinha-arte">
                <svg class="figurinha-busto" viewBox="0 0 60 60" preserveAspectRatio="xMidYMax meet" focusable="false">
                  <circle class="busto-cabeca" cx="30" cy="17" r="10"/>
                  <path class="busto-camisa" d="M7 61c0-15 9-24 23-24s23 9 23 24z"/>
                  <text class="busto-numero" x="30" y="57" text-anchor="middle">8</text>
                </svg>
              </div>
              <div class="figurinha-tarja">
                <span class="figurinha-nome">Amostra</span>
                <span class="raridade"><span class="raridade-icone raridade-icone-losango"></span>Brilhante</span>
              </div>
            </div>
            <div>
              <h3>Brilhante</h3>
              <p>Laminada, com listras. Aparece de vez em quando.</p>
            </div>
          </li>
          <li>
            <div class="figurinha figurinha-lendaria" style="--campo: #B3202A; --camisa: #F6F2F2; --numero: #B3202A; --giro: -0.6deg" aria-hidden="true">
              <div class="figurinha-arte">
                <svg class="figurinha-busto" viewBox="0 0 60 60" preserveAspectRatio="xMidYMax meet" focusable="false">
                  <circle class="busto-cabeca" cx="30" cy="17" r="10"/>
                  <path class="busto-camisa" d="M7 61c0-15 9-24 23-24s23 9 23 24z"/>
                  <text class="busto-numero" x="30" y="57" text-anchor="middle">10</text>
                </svg>
              </div>
              <div class="figurinha-tarja">
                <span class="figurinha-nome">Amostra</span>
                <span class="raridade"><span class="raridade-icone raridade-icone-estrela"></span>Lendária</span>
              </div>
            </div>
            <div>
              <h3>Lendária</h3>
              <p>Holográfica, com trama e estrela. A mais difícil de sair.</p>
            </div>
          </li>
        </ul>
      </div>
    </section>

    <!-- O ÁLBUM ABRE (cena 4). Três folhas empilhadas; cada uma tem frente e verso.
         As páginas (Grupo C, como amostra) são montadas pelo js/cenas-inicio.js. -->
    <section class="cena cena-album" style="--altura: 360vh" aria-labelledby="titulo-cena-album">
      <div class="cena-palco palco-3d">
        <h2 class="cena-titulo" id="titulo-cena-album">O álbum abre na sua frente.</h2>
        <p class="escondido">Ilustração: a capa do álbum vira e aparecem as páginas do Grupo C, com figurinhas coladas e vagas.</p>
        <div class="livro so-com-js" id="livro" aria-hidden="true">
          <div class="folha folha-base"><div class="face face-frente" id="pagina-base"></div></div>
          <div class="folha" id="folha-1">
            <div class="face face-frente" id="pagina-2"></div>
            <div class="face face-verso" id="pagina-3"></div>
          </div>
          <div class="folha" id="folha-capa">
            <div class="face face-frente capa">
              <span class="capa-marca">Colei!</span>
              <span class="capa-texto">Álbum de figurinhas</span>
              <span class="capa-ano">Copa 2026</span>
            </div>
            <div class="face face-verso" id="pagina-1"></div>
          </div>
        </div>
        <!-- data-visivel-em="1": este botão só aparece no fim da cena. -->
        <p class="cena-acao" id="acao-do-album" data-visivel-em="1"><a class="botao" href="album.html">Abrir o meu álbum</a></p>
      </div>
    </section>

    <!-- MERGULHO NA FIGURINHA (cena 5). A figurinha cresce até a tela ficar da cor dela. -->
    <div class="cena cena-mergulho" style="--altura: 240vh">
      <div class="cena-palco">
        <div class="mergulho so-com-js" id="mergulho" aria-hidden="true"></div>
        <div class="mergulho-fim" id="mergulho-fim">
          <p class="mergulho-etiqueta">Neste álbum, a cor só chega pelas figurinhas.</p>
        </div>
      </div>
    </div>

    <!-- OS NÚMEROS CONTAM (cena 6). Os valores escritos aqui são os finais; o
         js/cenas-inicio.js confere com os dados e faz a contagem. -->
    <section class="cena cena-numeros" style="--altura: 240vh" aria-labelledby="titulo-numeros">
      <div class="cena-palco">
        <h2 class="cena-titulo" id="titulo-numeros">A Copa de 2026 em números</h2>
        <!-- Enfeite: as linhas de um campo, atrás dos números. A rolagem desenha o traço. -->
        <svg class="campo-tracado campo-dos-numeros" id="campo-dos-numeros" viewBox="0 0 600 400" aria-hidden="true" focusable="false">
          <rect pathLength="1" x="20" y="20" width="560" height="360"/>
          <line pathLength="1" x1="300" y1="20" x2="300" y2="380"/>
          <circle pathLength="1" cx="300" cy="200" r="62"/>
          <rect pathLength="1" x="20" y="105" width="92" height="190"/>
          <rect pathLength="1" x="20" y="155" width="36" height="90"/>
          <path pathLength="1" d="M112 160a50 50 0 0 1 0 80"/>
          <rect pathLength="1" x="488" y="105" width="92" height="190"/>
          <rect pathLength="1" x="544" y="155" width="36" height="90"/>
          <path pathLength="1" d="M488 160a50 50 0 0 0 0 80"/>
        </svg>
        <dl class="numeros" id="numeros">
          <div class="numero"><dt>seleções</dt><dd>48</dd></div>
          <div class="numero"><dt>figurinhas no álbum</dt><dd>288</dd></div>
          <div class="numero"><dt>cidades-sede</dt><dd>16</dd></div>
          <div class="numero"><dt>jogos</dt><dd>104</dd></div>
        </dl>
      </div>
    </section>

    <!-- OS GRUPOS ANDAM PARA O LADO (cena 7). A rolagem para baixo move a faixa para
         o lado. Os doze painéis são postos pelo js/cenas-inicio.js. -->
    <section class="cena cena-grupos" style="--altura: 420vh" aria-labelledby="titulo-grupos">
      <div class="cena-palco">
        <div class="trilha" id="trilha">
          <div class="trilha-abre">
            <h2 id="titulo-grupos">12 grupos, de A a L.</h2>
            <p>A bandeira chega impressa em uma tinta só. No meio da tela, ela vira figurinha e ganha a cor de verdade.</p>
            <noscript><p>A lista dos grupos aparece com o JavaScript ligado. No <a href="album.html">álbum</a> eles estão todos.</p></noscript>
          </div>
        </div>
      </div>
    </section>

    <!-- CARROSSEL DAS SEDES. Uma sede por vez, com a foto do estádio. Os textos e a foto
         são trocados pelo js/carrossel.js, a partir da lista SEDES de js/dados.js.
         Não passa sozinho: só muda quando a pessoa aperta um botão. -->
    <section class="largura secao fluxo" aria-labelledby="titulo-sedes" aria-roledescription="carrossel">
      <h2 id="titulo-sedes">As 16 sedes</h2>
      <p>A Copa de 2026 passou por 16 cidades de três países: Estados Unidos, México e Canadá. Passe as fotos para conhecer cada estádio.</p>
      <noscript><p>As fotos das sedes aparecem com o JavaScript ligado no navegador.</p></noscript>

      <div class="carrossel fluxo" id="carrossel" hidden>
        <div class="dobra" role="group" aria-roledescription="slide" aria-labelledby="sede-cidade">
          <div class="fluxo">
            <h3 class="carrossel-cidade" id="sede-cidade"></h3>
            <p class="carrossel-estadio" id="sede-estadio"></p>
            <dl class="carrossel-dados">
              <dt>Onde fica</dt>
              <dd><img class="bandeirinha" id="sede-bandeira" src="assets/bandeiras/mx.svg" alt="" width="48" height="36"> <span id="sede-pais"></span></dd>
              <dt>Na Copa de 2026</dt>
              <dd id="sede-numeros"></dd>
              <dt>Nome usado no torneio</dt>
              <dd id="sede-nome-na-copa"></dd>
            </dl>
            <p id="sede-nota"></p>
          </div>

          <figure class="carrossel-figura">
            <!-- A foto é colorida no arquivo. O CSS (classe "foto") é que a mostra em uma tinta só. -->
            <div class="foto"><img id="sede-foto" src="assets/img/sedes/cidade-do-mexico.jpg" alt="" width="960" height="540"></div>
            <figcaption><a class="texto-apoio" id="sede-credito" href="sobre.html"></a></figcaption>
          </figure>
        </div>

        <div class="carrossel-controles">
          <button class="botao botao-contorno" type="button" id="sede-anterior">Anterior</button>
          <!-- role="status": o leitor de tela lê "3 de 16: Dallas" a cada troca. -->
          <p class="carrossel-posicao" id="sede-posicao" role="status"></p>
          <button class="botao botao-contorno" type="button" id="sede-proxima">Próxima</button>
        </div>
        <ol class="carrossel-indicadores" id="sede-indicadores" aria-label="Ir direto para uma sede"></ol>
      </div>
    </section>

    <!-- COMO TROCAR. À direita, um bilhete com um exemplo de lista de troca. -->
    <section class="largura secao dobra" aria-labelledby="titulo-trocar">
      <div class="fluxo">
        <h2 id="titulo-trocar">Como trocar</h2>
        <p>As repetidas viram moeda de troca. O site monta a lista do que você tem e do que falta, pronta para mandar aos amigos.</p>
        <p><a class="botao botao-contorno" href="trocas.html">Ver minhas trocas</a></p>
      </div>

      <div>
        <div class="cartao bilhete">
          <h3>Exemplo de lista de troca</h3>
          <dl>
            <dt>Tenho</dt>
            <dd>012, 045, 045, 201</dd>
            <dt>Preciso</dt>
            <dd>007, 088, 133</dd>
          </dl>
        </div>
      </div>
    </section>

    <!-- VOO PELAS FIGURINHAS (cena 8). As figurinhas ficam espalhadas em profundidade
         e a rolagem leva a câmera por entre elas. -->
    <section class="cena cena-voo" style="--altura: 300vh" aria-labelledby="voo-titulo">
      <div class="cena-palco palco-voo">
        <div class="voo so-com-js" id="voo" aria-hidden="true"></div>
        <div class="voo-fim" id="voo-fim" data-visivel-em="1">
          <h2 class="cena-titulo" id="voo-titulo">São 288 para colar.</h2>
          <p><a class="botao" href="pacotinhos.html">Abrir o pacotinho de hoje</a></p>
        </div>
      </div>
    </section>

  </main>

  <!-- RODAPÉ. É igual nas 7 páginas. -->
  <footer class="rodape">
    <div class="largura rodape-grade">
      <div class="rodape-sobre">
        <p class="rodape-marca">Colei!</p>
        <p>O álbum de figurinhas da Copa de 2026.</p>
      </div>

      <nav aria-label="Rodapé">
        <ul class="rodape-links">
          <li><a href="index.html">Início</a></li>
          <li><a href="album.html">Álbum</a></li>
          <li><a href="pacotinhos.html">Pacotinhos</a></li>
          <li><a href="trocas.html">Trocas</a></li>
          <li><a href="sobre.html">Sobre</a></li>
          <li><a href="contato.html">Contato</a></li>
          <li><a href="login.html">Entrar</a></li>
          <li><a href="https://github.com/vitorzago1/album-copa-2026">Código no GitHub</a></li>
          <li><a href="https://vitorzago1.github.io/album-copa-2026/">Site publicado</a></li>
        </ul>
      </nav>

      <div class="rodape-creditos">
        <p>Projeto acadêmico de Vitor Zago Pontes Morais. Desenvolvimento de Interfaces, 2/2026, CEUB. Prof. Dr. Felipe Batista da Silva.</p>
        <p>Projeto acadêmico, sem fins comerciais e sem vínculo com a FIFA, a Panini ou as federações.</p>
        <p>Fontes tipográficas: Londrina Solid e Atkinson Hyperlegible Next (licença OFL). Bandeiras: flag-icons (licença MIT). Fotos dos estádios: Wikimedia Commons. Os créditos completos ficam na página <a href="sobre.html#creditos">Sobre</a>.</p>
      </div>
    </div>
  </footer>
</body>
</html>
````

### album.html

````html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Álbum | Colei!</title>
  <meta name="description" content="As páginas do álbum, organizadas por grupo e por seleção.">
  <link rel="icon" href="assets/svg/favicon.svg" type="image/svg+xml">

  <!-- Este script fica no começo de propósito: ele aplica o tema e as preferências
       salvas antes de a página aparecer, para a tela não "piscar" no tema errado. -->
  <script src="js/tema-acessibilidade.js"></script>
  <script src="js/menu.js" defer></script>
  <script src="js/efeitos.js" defer></script>

  <!-- Os scripts do álbum, nesta ordem: os dados, o caderninho do progresso,
       o desenho da figurinha e, por último, a página. O "defer" espera o HTML
       ficar pronto e mantém a ordem. -->
  <script src="js/dados.js" defer></script>
  <script src="js/estado.js" defer></script>
  <script src="js/figurinha.js" defer></script>
  <script src="js/album.js" defer></script>

  <link rel="stylesheet" href="css/tokens.css">
  <link rel="stylesheet" href="css/base.css">
  <link rel="stylesheet" href="css/componentes.css">
  <link rel="stylesheet" href="css/paginas.css">
  <link rel="stylesheet" href="css/acessibilidade.css">
</head>
<body>
  <!-- Primeiro link da página: quem navega pelo teclado pula o menu e vai direto ao conteúdo. -->
  <a class="pular" href="#conteudo">Pular para o conteúdo</a>

  <!-- CABEÇALHO. É igual nas 7 páginas; só muda qual link leva aria-current="page". -->
  <header class="cabecalho">
    <div class="largura cabecalho-grade">
      <a class="marca" href="index.html" aria-label="Colei!, página inicial">Colei!</a>

      <!-- Em telas pequenas, este botão abre e fecha o menu (ver js/menu.js). -->
      <button class="botao-menu" type="button" aria-expanded="false" aria-controls="menu-principal">Menu</button>

      <nav class="menu" id="menu-principal" aria-label="Principal">
        <ul>
          <li><a href="index.html">Início</a></li>
          <li><a href="album.html" aria-current="page">Álbum</a></li>
          <li><a href="pacotinhos.html">Pacotinhos</a></li>
          <li><a href="trocas.html">Trocas</a></li>
          <li><a href="sobre.html">Sobre</a></li>
          <li><a href="contato.html">Contato</a></li>
          <li><a class="menu-entrar" href="login.html">Entrar</a></li>
        </ul>
      </nav>

      <!-- Abre o painel de acessibilidade (ver js/tema-acessibilidade.js). -->
      <button class="botao-acessibilidade" type="button" id="abrir-acessibilidade" aria-haspopup="dialog">
        <svg class="icone" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false">
          <circle cx="12" cy="4.5" r="2.2" fill="currentColor"/>
          <path d="M4 8.5h16M12 8.5v6M8 21l4-6.5 4 6.5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span class="botao-acessibilidade-texto">Acessibilidade</span>
      </button>
    </div>
  </header>

  <main id="conteudo" tabindex="-1">

    <!-- TOPO. Página dupla: à esquerda o placar do álbum, à direita as figurinhas que estão na mão. -->
    <section class="largura dobra album-topo">
      <div class="fluxo">
        <h1>Álbum</h1>
        <p class="placar">
          <!-- O número grande gira como um marcador antigo (js/album.js). Quem lê o
               número para o leitor de tela é o texto escondido ao lado. -->
          <span class="placar-numero"><span class="odometro" id="placar-odometro" aria-hidden="true"></span><span class="escondido" id="placar-coladas">0</span></span>
          <span>de <span id="placar-total">24</span> figurinhas coladas</span>
        </p>
        <!-- A barra é só desenho: o número já está escrito acima. -->
        <div class="barra" aria-hidden="true"><span class="barra-cheia" id="placar-barra"></span></div>
        <p id="placar-texto">Falta colar tudo: o álbum está novinho.</p>

        <!-- ÍNDICE DOS GRUPOS. Cada casa leva ao grupo e enche conforme ele é colado.
             As casas são montadas pelo js/album.js. -->
        <nav class="fluxo" aria-labelledby="titulo-indice">
          <h2 class="titulo-menor" id="titulo-indice">Ir para um grupo</h2>
          <ol class="tira tira-indice" id="indice-grupos"></ol>
        </nav>
        <noscript><p>O álbum precisa do JavaScript ligado no navegador para mostrar e colar as figurinhas.</p></noscript>
      </div>

      <div class="fluxo">
        <h2 id="titulo-mao" tabindex="-1">Na mão</h2>
        <p id="mao-texto">As figurinhas que saem do pacotinho aparecem aqui, prontas para colar.</p>
        <!-- Cada figurinha desta lista pode ser arrastada até a vaga ou colada pelo botão. -->
        <ul class="bandeja" id="bandeja" aria-labelledby="titulo-mao"></ul>
        <p id="mao-vazia"><a class="botao" href="pacotinhos.html">Abrir um pacotinho</a></p>
      </div>
    </section>

    <!-- BUSCA, ABAS E FILTROS. Tudo aqui muda quais figurinhas aparecem logo abaixo. -->
    <section class="largura secao fluxo" aria-labelledby="titulo-procurar">
      <h2 id="titulo-procurar">Procurar no álbum</h2>

      <div class="campo">
        <label class="campo-rotulo" for="busca">Buscar figurinha</label>
        <span class="campo-dica" id="busca-dica">Nome, número, seleção, posição ou clube.</span>
        <input class="campo-entrada" type="search" id="busca" autocomplete="off" aria-describedby="busca-dica">
      </div>

      <!-- Abas no padrão WAI-ARIA: as setas do teclado passam de uma para a outra. -->
      <div class="abas" role="tablist" aria-label="Quais figurinhas mostrar">
        <button class="aba" type="button" role="tab" id="aba-todas" data-aba="todas" aria-selected="true" aria-controls="painel-album">Todas<span class="aba-conta" id="conta-todas">24</span></button>
        <button class="aba" type="button" role="tab" id="aba-tenho" data-aba="tenho" aria-selected="false" aria-controls="painel-album" tabindex="-1">Tenho<span class="aba-conta" id="conta-tenho">0</span></button>
        <button class="aba" type="button" role="tab" id="aba-faltam" data-aba="faltam" aria-selected="false" aria-controls="painel-album" tabindex="-1">Faltam<span class="aba-conta" id="conta-faltam">24</span></button>
        <button class="aba" type="button" role="tab" id="aba-repetidas" data-aba="repetidas" aria-selected="false" aria-controls="painel-album" tabindex="-1">Repetidas<span class="aba-conta" id="conta-repetidas">0</span></button>
      </div>

      <div class="filtros">
        <div class="campo">
          <label class="campo-rotulo" for="filtro-grupo">Grupo</label>
          <select class="campo-entrada" id="filtro-grupo"><option value="">Todos</option></select>
        </div>
        <div class="campo">
          <label class="campo-rotulo" for="filtro-selecao">Seleção</label>
          <select class="campo-entrada" id="filtro-selecao"><option value="">Todas</option></select>
        </div>
        <div class="campo">
          <label class="campo-rotulo" for="filtro-posicao">Posição</label>
          <select class="campo-entrada" id="filtro-posicao"><option value="">Todas</option></select>
        </div>
        <div class="campo">
          <label class="campo-rotulo" for="filtro-raridade">Raridade</label>
          <select class="campo-entrada" id="filtro-raridade"><option value="">Todas</option></select>
        </div>
      </div>

      <div class="resultado">
        <!-- role="status": o leitor de tela lê este texto sempre que ele muda. -->
        <p id="resultado" role="status">24 figurinhas</p>
        <button class="botao botao-contorno botao-pequeno" type="button" id="limpar-filtros" hidden>Limpar busca e filtros</button>
      </div>
    </section>

    <!-- AS PÁGINAS DO ÁLBUM. É o painel das abas: o conteúdo é montado pelo js/album.js. -->
    <div class="largura" role="tabpanel" id="painel-album" aria-labelledby="aba-todas">
      <div id="paginas"></div>
      <div class="vazio fluxo" id="vazio" hidden>
        <h2>Nada por aqui</h2>
        <p>Nenhuma figurinha combina com essa busca. Tente outra palavra ou limpe os filtros.</p>
      </div>
    </div>

    <!-- COMO TERMINOU. A última página do álbum: o resultado da Copa.
         Os textos são preenchidos pelo js/album.js, a partir do objeto COPA de js/dados.js. -->
    <section class="largura secao" aria-labelledby="titulo-final">
      <div class="dobra">
        <div class="fluxo">
          <h2 id="titulo-final">Como terminou</h2>
          <p class="final-campea" id="final-campea"></p>
          <p id="final-placar"></p>
          <p id="final-onde"></p>
          <p id="final-numeros"></p>
          <!-- Enfeite: as linhas de um campo, que se desenham quando esta parte aparece na tela. -->
          <svg class="campo-tracado" id="campo-do-final" viewBox="0 0 600 400" aria-hidden="true" focusable="false">
            <rect pathLength="1" x="20" y="20" width="560" height="360"/>
            <line pathLength="1" x1="300" y1="20" x2="300" y2="380"/>
            <circle pathLength="1" cx="300" cy="200" r="62"/>
            <rect pathLength="1" x="20" y="105" width="92" height="190"/>
            <rect pathLength="1" x="20" y="155" width="36" height="90"/>
            <path pathLength="1" d="M112 160a50 50 0 0 1 0 80"/>
            <rect pathLength="1" x="488" y="105" width="92" height="190"/>
            <rect pathLength="1" x="544" y="155" width="36" height="90"/>
            <path pathLength="1" d="M488 160a50 50 0 0 0 0 80"/>
          </svg>
        </div>

        <div class="fluxo">
          <h3>Os quatro primeiros</h3>
          <ol class="podio" id="final-podio"></ol>
          <p id="final-terceiro"></p>
          <h3>Prêmios</h3>
          <dl class="selecao-dados" id="final-premios"></dl>
        </div>
      </div>
    </section>

    <!-- CONQUISTAS. Cada uma vale um pacotinho extra. -->
    <section class="largura secao fluxo" aria-labelledby="titulo-conquistas">
      <h2 id="titulo-conquistas">Conquistas</h2>
      <p>Cada conquista vale um pacotinho extra, para abrir quando quiser.</p>
      <ul class="conquistas" id="conquistas"></ul>
    </section>

    <!-- Recado para o leitor de tela (escondido da tela, mas lido em voz alta). -->
    <p class="escondido" id="aviso" role="status"></p>

    <!-- Recado visível, preso no pé da tela depois de colar. -->
    <div class="recado" id="recado" hidden>
      <p class="recado-texto" id="recado-texto"></p>
      <button class="recado-botao" type="button" id="recado-desfazer">Desfazer</button>
      <button class="recado-botao" type="button" id="recado-fechar">Fechar</button>
    </div>
  </main>

  <!-- RODAPÉ. É igual nas 7 páginas. -->
  <footer class="rodape">
    <div class="largura rodape-grade">
      <div class="rodape-sobre">
        <p class="rodape-marca">Colei!</p>
        <p>O álbum de figurinhas da Copa de 2026.</p>
      </div>

      <nav aria-label="Rodapé">
        <ul class="rodape-links">
          <li><a href="index.html">Início</a></li>
          <li><a href="album.html">Álbum</a></li>
          <li><a href="pacotinhos.html">Pacotinhos</a></li>
          <li><a href="trocas.html">Trocas</a></li>
          <li><a href="sobre.html">Sobre</a></li>
          <li><a href="contato.html">Contato</a></li>
          <li><a href="login.html">Entrar</a></li>
          <li><a href="https://github.com/vitorzago1/album-copa-2026">Código no GitHub</a></li>
          <li><a href="https://vitorzago1.github.io/album-copa-2026/">Site publicado</a></li>
        </ul>
      </nav>

      <div class="rodape-creditos">
        <p>Projeto acadêmico de Vitor Zago Pontes Morais. Desenvolvimento de Interfaces, 2/2026, CEUB. Prof. Dr. Felipe Batista da Silva.</p>
        <p>Projeto acadêmico, sem fins comerciais e sem vínculo com a FIFA, a Panini ou as federações.</p>
        <p>Fontes tipográficas: Londrina Solid e Atkinson Hyperlegible Next (licença OFL). Bandeiras: flag-icons (licença MIT). Fotos dos estádios: Wikimedia Commons. Os créditos completos ficam na página <a href="sobre.html#creditos">Sobre</a>.</p>
      </div>
    </div>
  </footer>
</body>
</html>
````

### pacotinhos.html

````html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Pacotinhos | Colei!</title>
  <meta name="description" content="Abra o pacotinho do dia e descubra cinco figurinhas.">
  <link rel="icon" href="assets/svg/favicon.svg" type="image/svg+xml">

  <!-- Este script fica no começo de propósito: ele aplica o tema e as preferências
       salvas antes de a página aparecer, para a tela não "piscar" no tema errado. -->
  <script src="js/tema-acessibilidade.js"></script>
  <script src="js/menu.js" defer></script>
  <script src="js/efeitos.js" defer></script>

  <!-- Os scripts dos pacotinhos, nesta ordem: os dados, o caderninho do progresso,
       o desenho da figurinha e, por último, a página. -->
  <script src="js/dados.js" defer></script>
  <script src="js/estado.js" defer></script>
  <script src="js/figurinha.js" defer></script>
  <script src="js/pacotinho.js" defer></script>

  <!-- O pacotinho fechado em 3D. É a única parte do site que usa uma biblioteca
       externa (Three.js, guardada em js/vendor). Sem ela, ou sem WebGL no
       navegador, a página funciona igual, com o pacotinho desenhado em CSS. -->
  <script src="js/vendor/three.min.js" defer></script>
  <script src="js/pacote3d.js" defer></script>
  <script src="js/pacotinho-3d.js" defer></script>

  <link rel="stylesheet" href="css/tokens.css">
  <link rel="stylesheet" href="css/base.css">
  <link rel="stylesheet" href="css/componentes.css">
  <link rel="stylesheet" href="css/paginas.css">
  <link rel="stylesheet" href="css/acessibilidade.css">
</head>
<body>
  <!-- Primeiro link da página: quem navega pelo teclado pula o menu e vai direto ao conteúdo. -->
  <a class="pular" href="#conteudo">Pular para o conteúdo</a>

  <!-- CABEÇALHO. É igual nas 7 páginas; só muda qual link leva aria-current="page". -->
  <header class="cabecalho">
    <div class="largura cabecalho-grade">
      <a class="marca" href="index.html" aria-label="Colei!, página inicial">Colei!</a>

      <!-- Em telas pequenas, este botão abre e fecha o menu (ver js/menu.js). -->
      <button class="botao-menu" type="button" aria-expanded="false" aria-controls="menu-principal">Menu</button>

      <nav class="menu" id="menu-principal" aria-label="Principal">
        <ul>
          <li><a href="index.html">Início</a></li>
          <li><a href="album.html">Álbum</a></li>
          <li><a href="pacotinhos.html" aria-current="page">Pacotinhos</a></li>
          <li><a href="trocas.html">Trocas</a></li>
          <li><a href="sobre.html">Sobre</a></li>
          <li><a href="contato.html">Contato</a></li>
          <li><a class="menu-entrar" href="login.html">Entrar</a></li>
        </ul>
      </nav>

      <!-- Abre o painel de acessibilidade (ver js/tema-acessibilidade.js). -->
      <button class="botao-acessibilidade" type="button" id="abrir-acessibilidade" aria-haspopup="dialog">
        <svg class="icone" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false">
          <circle cx="12" cy="4.5" r="2.2" fill="currentColor"/>
          <path d="M4 8.5h16M12 8.5v6M8 21l4-6.5 4 6.5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span class="botao-acessibilidade-texto">Acessibilidade</span>
      </button>
    </div>
  </header>

  <main id="conteudo" tabindex="-1">

    <!-- Página dupla: à esquerda a situação de hoje e a cartela da sequência;
         à direita o palco, onde fica o pacotinho e, depois de rasgar, as figurinhas. -->
    <section class="largura dobra">
      <div class="fluxo">
        <h1>Pacotinhos</h1>
        <p class="abertura-texto" id="situacao">Todo dia tem um pacotinho grátis com cinco figurinhas.</p>
        <p id="extras-texto" hidden></p>

        <article class="cartao" aria-labelledby="titulo-sequencia">
          <h2 id="titulo-sequencia">Sua sequência</h2>
          <ol class="cartela" id="cartela" aria-label="Cartela de sete dias seguidos">
            <li><span class="escondido">Dia </span>1</li>
            <li><span class="escondido">Dia </span>2</li>
            <li><span class="escondido">Dia </span>3</li>
            <li><span class="escondido">Dia </span>4</li>
            <li><span class="escondido">Dia </span>5</li>
            <li><span class="escondido">Dia </span>6</li>
            <li><span class="escondido">Dia </span>7</li>
          </ol>
          <p class="texto-apoio" id="sequencia-texto">Cada pacotinho do dia ganha um carimbo.</p>
        </article>

        <p class="texto-apoio">A comum sai bastante, a brilhante de vez em quando e a lendária quase nunca. Para testar sem esperar o dia seguinte, use o <a href="sobre.html#demonstracao">modo demonstração</a>.</p>
        <noscript><p>Os pacotinhos precisam do JavaScript ligado no navegador.</p></noscript>
      </div>

      <!-- O conteúdo do palco é montado pelo js/pacotinho.js. -->
      <div class="palco" id="palco"></div>
    </section>

    <!-- Recado para o leitor de tela (escondido da tela, mas lido em voz alta). -->
    <p class="escondido" id="aviso" role="status"></p>
  </main>

  <!-- RODAPÉ. É igual nas 7 páginas. -->
  <footer class="rodape">
    <div class="largura rodape-grade">
      <div class="rodape-sobre">
        <p class="rodape-marca">Colei!</p>
        <p>O álbum de figurinhas da Copa de 2026.</p>
      </div>

      <nav aria-label="Rodapé">
        <ul class="rodape-links">
          <li><a href="index.html">Início</a></li>
          <li><a href="album.html">Álbum</a></li>
          <li><a href="pacotinhos.html">Pacotinhos</a></li>
          <li><a href="trocas.html">Trocas</a></li>
          <li><a href="sobre.html">Sobre</a></li>
          <li><a href="contato.html">Contato</a></li>
          <li><a href="login.html">Entrar</a></li>
          <li><a href="https://github.com/vitorzago1/album-copa-2026">Código no GitHub</a></li>
          <li><a href="https://vitorzago1.github.io/album-copa-2026/">Site publicado</a></li>
        </ul>
      </nav>

      <div class="rodape-creditos">
        <p>Projeto acadêmico de Vitor Zago Pontes Morais. Desenvolvimento de Interfaces, 2/2026, CEUB. Prof. Dr. Felipe Batista da Silva.</p>
        <p>Projeto acadêmico, sem fins comerciais e sem vínculo com a FIFA, a Panini ou as federações.</p>
        <p>Fontes tipográficas: Londrina Solid e Atkinson Hyperlegible Next (licença OFL). Bandeiras: flag-icons (licença MIT). Fotos dos estádios: Wikimedia Commons. Os créditos completos ficam na página <a href="sobre.html#creditos">Sobre</a>.</p>
      </div>
    </div>
  </footer>
</body>
</html>
````

### trocas.html

````html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Trocas | Colei!</title>
  <meta name="description" content="Veja suas repetidas e faltantes e monte a lista de troca.">
  <link rel="icon" href="assets/svg/favicon.svg" type="image/svg+xml">

  <!-- Este script fica no começo de propósito: ele aplica o tema e as preferências
       salvas antes de a página aparecer, para a tela não "piscar" no tema errado. -->
  <script src="js/tema-acessibilidade.js"></script>
  <script src="js/menu.js" defer></script>
  <script src="js/efeitos.js" defer></script>

  <!-- Os scripts das trocas, nesta ordem: os dados, o caderninho do progresso,
       os ajudantes da figurinha e, por último, a página. -->
  <script src="js/dados.js" defer></script>
  <script src="js/estado.js" defer></script>
  <script src="js/figurinha.js" defer></script>
  <script src="js/trocas.js" defer></script>

  <link rel="stylesheet" href="css/tokens.css">
  <link rel="stylesheet" href="css/base.css">
  <link rel="stylesheet" href="css/componentes.css">
  <link rel="stylesheet" href="css/paginas.css">
  <link rel="stylesheet" href="css/acessibilidade.css">
</head>
<body>
  <!-- Primeiro link da página: quem navega pelo teclado pula o menu e vai direto ao conteúdo. -->
  <a class="pular" href="#conteudo">Pular para o conteúdo</a>

  <!-- CABEÇALHO. É igual nas 7 páginas; só muda qual link leva aria-current="page". -->
  <header class="cabecalho">
    <div class="largura cabecalho-grade">
      <a class="marca" href="index.html" aria-label="Colei!, página inicial">Colei!</a>

      <!-- Em telas pequenas, este botão abre e fecha o menu (ver js/menu.js). -->
      <button class="botao-menu" type="button" aria-expanded="false" aria-controls="menu-principal">Menu</button>

      <nav class="menu" id="menu-principal" aria-label="Principal">
        <ul>
          <li><a href="index.html">Início</a></li>
          <li><a href="album.html">Álbum</a></li>
          <li><a href="pacotinhos.html">Pacotinhos</a></li>
          <li><a href="trocas.html" aria-current="page">Trocas</a></li>
          <li><a href="sobre.html">Sobre</a></li>
          <li><a href="contato.html">Contato</a></li>
          <li><a class="menu-entrar" href="login.html">Entrar</a></li>
        </ul>
      </nav>

      <!-- Abre o painel de acessibilidade (ver js/tema-acessibilidade.js). -->
      <button class="botao-acessibilidade" type="button" id="abrir-acessibilidade" aria-haspopup="dialog">
        <svg class="icone" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false">
          <circle cx="12" cy="4.5" r="2.2" fill="currentColor"/>
          <path d="M4 8.5h16M12 8.5v6M8 21l4-6.5 4 6.5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span class="botao-acessibilidade-texto">Acessibilidade</span>
      </button>
    </div>
  </header>

  <main id="conteudo" tabindex="-1">

    <!-- Página dupla: à esquerda o que tenho e o que falta; à direita a lista pronta para mandar.
         Tudo é preenchido pelo js/trocas.js, a partir do álbum guardado. -->
    <section class="largura dobra">
      <div class="fluxo">
        <h1>Trocas</h1>
        <p class="abertura-texto">Repetida parada não completa o álbum de ninguém. Veja o que você tem para trocar e o que ainda falta.</p>
        <noscript><p>As listas de troca precisam do JavaScript ligado no navegador.</p></noscript>

        <h2 id="titulo-tenho">Tenho para trocar</h2>
        <p id="repetidas-texto"></p>
        <ul class="lista-troca" id="lista-repetidas" aria-labelledby="titulo-tenho"></ul>

        <h2 id="titulo-preciso">Preciso</h2>
        <p id="faltam-texto"></p>
        <!-- <details> é uma gaveta do próprio HTML: abre e fecha ao clicar no resumo, sem JavaScript.
             A lista pode ter quase 300 números, por isso começa fechada quando é longa. -->
        <details id="faltam-gaveta">
          <summary id="faltam-resumo">Ver a lista</summary>
          <ul class="lista-faltam" id="lista-faltam" aria-labelledby="titulo-preciso"></ul>
        </details>
      </div>

      <div class="fluxo">
        <h2>Lista de troca</h2>
        <p>O texto abaixo já vem pronto para mandar aos amigos. Ele muda sozinho quando o álbum muda.</p>

        <div class="cartao bilhete">
          <div class="campo">
            <label class="campo-rotulo" for="texto-troca">Sua lista</label>
            <!-- "readonly": dá para selecionar e copiar, mas não para editar. -->
            <textarea class="campo-entrada" id="texto-troca" rows="7" readonly></textarea>
          </div>
          <p class="guia-linha">
            <button class="botao" type="button" id="copiar-lista">Copiar lista</button>
            <!-- O endereço wa.me abre o WhatsApp com o texto já escrito. O js/trocas.js completa o link. -->
            <a class="botao botao-contorno" id="mandar-whatsapp" href="https://wa.me/" target="_blank" rel="noopener">Mandar pelo WhatsApp<span class="escondido"> (abre em outra aba)</span></a>
          </p>
          <p class="painel-aviso" id="copiar-aviso" role="status"></p>
        </div>
      </div>
    </section>

    <!-- BANCA DE TROCAS: a simulação de uma troca. -->
    <section class="largura secao fluxo" aria-labelledby="titulo-banca">
      <h2 id="titulo-banca">Banca de trocas</h2>
      <p>Como o site não tem servidor, aqui a troca é uma simulação: a banca sorteia três figurinhas que você ainda não tem. Escolha uma repetida para dar e uma da banca para receber.</p>

      <p class="aviso-sucesso" id="troca-aviso" role="status" tabindex="-1"></p>
      <p id="banca-vazia" hidden></p>

      <form class="fluxo" id="form-troca" hidden>
        <div class="banca-grade">
          <!-- fieldset + legend: o leitor de tela diz a pergunta antes de cada opção. -->
          <fieldset class="painel-grupo">
            <legend>Você dá (uma repetida)</legend>
            <div id="opcoes-dou"></div>
          </fieldset>
          <fieldset class="painel-grupo">
            <legend>Você recebe (oferta da banca)</legend>
            <div id="opcoes-recebo"></div>
          </fieldset>
        </div>
        <p class="guia-linha">
          <button class="botao" type="submit">Trocar</button>
          <button class="botao botao-contorno" type="button" id="outras-ofertas">Ver outras ofertas</button>
        </p>
      </form>
    </section>
  </main>

  <!-- RODAPÉ. É igual nas 7 páginas. -->
  <footer class="rodape">
    <div class="largura rodape-grade">
      <div class="rodape-sobre">
        <p class="rodape-marca">Colei!</p>
        <p>O álbum de figurinhas da Copa de 2026.</p>
      </div>

      <nav aria-label="Rodapé">
        <ul class="rodape-links">
          <li><a href="index.html">Início</a></li>
          <li><a href="album.html">Álbum</a></li>
          <li><a href="pacotinhos.html">Pacotinhos</a></li>
          <li><a href="trocas.html">Trocas</a></li>
          <li><a href="sobre.html">Sobre</a></li>
          <li><a href="contato.html">Contato</a></li>
          <li><a href="login.html">Entrar</a></li>
          <li><a href="https://github.com/vitorzago1/album-copa-2026">Código no GitHub</a></li>
          <li><a href="https://vitorzago1.github.io/album-copa-2026/">Site publicado</a></li>
        </ul>
      </nav>

      <div class="rodape-creditos">
        <p>Projeto acadêmico de Vitor Zago Pontes Morais. Desenvolvimento de Interfaces, 2/2026, CEUB. Prof. Dr. Felipe Batista da Silva.</p>
        <p>Projeto acadêmico, sem fins comerciais e sem vínculo com a FIFA, a Panini ou as federações.</p>
        <p>Fontes tipográficas: Londrina Solid e Atkinson Hyperlegible Next (licença OFL). Bandeiras: flag-icons (licença MIT). Fotos dos estádios: Wikimedia Commons. Os créditos completos ficam na página <a href="sobre.html#creditos">Sobre</a>.</p>
      </div>
    </div>
  </footer>
</body>
</html>
````

### login.html

````html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Entrar | Colei!</title>
  <meta name="description" content="Entre ou crie sua conta para guardar o seu álbum.">
  <link rel="icon" href="assets/svg/favicon.svg" type="image/svg+xml">

  <!-- Este script fica no começo de propósito: ele aplica o tema e as preferências
       salvas antes de a página aparecer, para a tela não "piscar" no tema errado. -->
  <script src="js/tema-acessibilidade.js"></script>
  <script src="js/menu.js" defer></script>
  <script src="js/efeitos.js" defer></script>

  <!-- Os scripts da conta: os dados e o caderninho do progresso (para mostrar o álbum de
       quem entrou), os ajudantes de formulário e, por último, a página. -->
  <script src="js/dados.js" defer></script>
  <script src="js/estado.js" defer></script>
  <script src="js/formulario.js" defer></script>
  <script src="js/login.js" defer></script>

  <link rel="stylesheet" href="css/tokens.css">
  <link rel="stylesheet" href="css/base.css">
  <link rel="stylesheet" href="css/componentes.css">
  <link rel="stylesheet" href="css/paginas.css">
  <link rel="stylesheet" href="css/acessibilidade.css">
</head>
<body>
  <!-- Primeiro link da página: quem navega pelo teclado pula o menu e vai direto ao conteúdo. -->
  <a class="pular" href="#conteudo">Pular para o conteúdo</a>

  <!-- CABEÇALHO. É igual nas 7 páginas; só muda qual link leva aria-current="page". -->
  <header class="cabecalho">
    <div class="largura cabecalho-grade">
      <a class="marca" href="index.html" aria-label="Colei!, página inicial">Colei!</a>

      <!-- Em telas pequenas, este botão abre e fecha o menu (ver js/menu.js). -->
      <button class="botao-menu" type="button" aria-expanded="false" aria-controls="menu-principal">Menu</button>

      <nav class="menu" id="menu-principal" aria-label="Principal">
        <ul>
          <li><a href="index.html">Início</a></li>
          <li><a href="album.html">Álbum</a></li>
          <li><a href="pacotinhos.html">Pacotinhos</a></li>
          <li><a href="trocas.html">Trocas</a></li>
          <li><a href="sobre.html">Sobre</a></li>
          <li><a href="contato.html">Contato</a></li>
          <li><a class="menu-entrar" href="login.html" aria-current="page">Entrar</a></li>
        </ul>
      </nav>

      <!-- Abre o painel de acessibilidade (ver js/tema-acessibilidade.js). -->
      <button class="botao-acessibilidade" type="button" id="abrir-acessibilidade" aria-haspopup="dialog">
        <svg class="icone" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false">
          <circle cx="12" cy="4.5" r="2.2" fill="currentColor"/>
          <path d="M4 8.5h16M12 8.5v6M8 21l4-6.5 4 6.5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span class="botao-acessibilidade-texto">Acessibilidade</span>
      </button>
    </div>
  </header>

  <main id="conteudo" tabindex="-1">

    <!-- Página dupla: à esquerda a explicação, à direita a conta (ou os formulários).
         Só uma das três partes da direita aparece por vez; quem escolhe é o js/login.js. -->
    <section class="largura dobra">
      <div class="fluxo">
        <h1>Entrar</h1>
        <p class="abertura-texto">Com uma conta, o seu álbum fica separado do álbum de quem mais usar este navegador.</p>

        <div class="cartao">
          <h2 class="titulo-menor">É uma simulação</h2>
          <p>Este site não tem servidor. A conta fica guardada só neste navegador e existe para mostrar como um login funciona. Não use aqui uma senha que você usa em outro lugar.</p>
          <p>A senha em si não é guardada. Fica guardado só o resultado de uma conta feita com ela, que não dá para desfazer.</p>
        </div>
        <noscript><p>Entrar e criar conta precisam do JavaScript ligado no navegador.</p></noscript>
      </div>

      <div class="fluxo">
        <!-- Recado geral ("Conta criada", "Você saiu"). role="status": o leitor de tela lê quando muda. -->
        <p class="aviso-sucesso" id="conta-aviso" role="status" tabindex="-1"></p>

        <!-- 1. QUEM JÁ ENTROU -->
        <section class="fluxo" id="painel-conta" aria-labelledby="titulo-conta" hidden>
          <h2 id="titulo-conta" tabindex="-1">Sua conta</h2>
          <p id="conta-quem"></p>
          <p id="conta-album"></p>
          <p class="guia-linha">
            <a class="botao" href="album.html">Ir para o álbum</a>
            <button class="botao botao-contorno" type="button" id="sair">Sair</button>
          </p>
        </section>

        <!-- 2. ENTRAR. "novalidate" desliga os balões do navegador: as mensagens são as do site. -->
        <form class="formulario" id="form-entrar" aria-labelledby="titulo-entrar" novalidate hidden>
          <h2 id="titulo-entrar" tabindex="-1">Já tenho conta</h2>

          <div class="campo">
            <label class="campo-rotulo" for="entrar-email">E-mail</label>
            <input class="campo-entrada" type="email" id="entrar-email" name="email" autocomplete="email" required aria-describedby="entrar-email-erro">
            <p class="campo-erro" id="entrar-email-erro" hidden></p>
          </div>

          <div class="campo">
            <label class="campo-rotulo" for="entrar-senha">Senha</label>
            <input class="campo-entrada" type="password" id="entrar-senha" name="senha" autocomplete="current-password" required aria-describedby="entrar-senha-erro">
            <button class="botao botao-contorno botao-pequeno" type="button" data-mostrar-senha="entrar-senha">Mostrar senha</button>
            <p class="campo-erro" id="entrar-senha-erro" hidden></p>
          </div>

          <!-- Erro do formulário inteiro ("e-mail ou senha não conferem"). role="alert": lido na hora. -->
          <p class="campo-erro" id="entrar-erro" role="alert" hidden></p>

          <p><button class="botao" type="submit">Entrar</button></p>
          <p>Ainda não tem conta? <button class="botao-link" type="button" id="ir-criar">Criar conta</button></p>
        </form>

        <!-- 3. CRIAR CONTA -->
        <form class="formulario" id="form-criar" aria-labelledby="titulo-criar" novalidate hidden>
          <h2 id="titulo-criar" tabindex="-1">Criar conta</h2>

          <div class="campo">
            <label class="campo-rotulo" for="criar-nome">Nome</label>
            <input class="campo-entrada" type="text" id="criar-nome" name="nome" autocomplete="name" required aria-describedby="criar-nome-erro">
            <p class="campo-erro" id="criar-nome-erro" hidden></p>
          </div>

          <div class="campo">
            <label class="campo-rotulo" for="criar-email">E-mail</label>
            <input class="campo-entrada" type="email" id="criar-email" name="email" autocomplete="email" required aria-describedby="criar-email-erro">
            <p class="campo-erro" id="criar-email-erro" hidden></p>
          </div>

          <div class="campo">
            <label class="campo-rotulo" for="criar-senha">Senha</label>
            <span class="campo-dica" id="criar-senha-dica">Pelo menos 8 caracteres. Pode colar e pode usar o gerenciador de senhas.</span>
            <input class="campo-entrada" type="password" id="criar-senha" name="senha" autocomplete="new-password" required minlength="8" aria-describedby="criar-senha-dica criar-senha-erro">
            <button class="botao botao-contorno botao-pequeno" type="button" data-mostrar-senha="criar-senha">Mostrar senha</button>
            <p class="campo-erro" id="criar-senha-erro" hidden></p>
          </div>

          <p class="campo-erro" id="criar-erro" role="alert" hidden></p>

          <p><button class="botao" type="submit">Criar conta</button></p>
          <p>Já tem conta? <button class="botao-link" type="button" id="ir-entrar">Entrar</button></p>
        </form>
      </div>
    </section>
  </main>

  <!-- RODAPÉ. É igual nas 7 páginas. -->
  <footer class="rodape">
    <div class="largura rodape-grade">
      <div class="rodape-sobre">
        <p class="rodape-marca">Colei!</p>
        <p>O álbum de figurinhas da Copa de 2026.</p>
      </div>

      <nav aria-label="Rodapé">
        <ul class="rodape-links">
          <li><a href="index.html">Início</a></li>
          <li><a href="album.html">Álbum</a></li>
          <li><a href="pacotinhos.html">Pacotinhos</a></li>
          <li><a href="trocas.html">Trocas</a></li>
          <li><a href="sobre.html">Sobre</a></li>
          <li><a href="contato.html">Contato</a></li>
          <li><a href="login.html">Entrar</a></li>
          <li><a href="https://github.com/vitorzago1/album-copa-2026">Código no GitHub</a></li>
          <li><a href="https://vitorzago1.github.io/album-copa-2026/">Site publicado</a></li>
        </ul>
      </nav>

      <div class="rodape-creditos">
        <p>Projeto acadêmico de Vitor Zago Pontes Morais. Desenvolvimento de Interfaces, 2/2026, CEUB. Prof. Dr. Felipe Batista da Silva.</p>
        <p>Projeto acadêmico, sem fins comerciais e sem vínculo com a FIFA, a Panini ou as federações.</p>
        <p>Fontes tipográficas: Londrina Solid e Atkinson Hyperlegible Next (licença OFL). Bandeiras: flag-icons (licença MIT). Fotos dos estádios: Wikimedia Commons. Os créditos completos ficam na página <a href="sobre.html#creditos">Sobre</a>.</p>
      </div>
    </div>
  </footer>
</body>
</html>
````

### contato.html

````html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Contato | Colei!</title>
  <meta name="description" content="Fale com o autor do projeto.">
  <link rel="icon" href="assets/svg/favicon.svg" type="image/svg+xml">

  <!-- Este script fica no começo de propósito: ele aplica o tema e as preferências
       salvas antes de a página aparecer, para a tela não "piscar" no tema errado. -->
  <script src="js/tema-acessibilidade.js"></script>
  <script src="js/menu.js" defer></script>
  <script src="js/efeitos.js" defer></script>

  <!-- Os ajudantes de formulário e a conferência dos campos desta página. -->
  <script src="js/formulario.js" defer></script>
  <script src="js/contato.js" defer></script>

  <link rel="stylesheet" href="css/tokens.css">
  <link rel="stylesheet" href="css/base.css">
  <link rel="stylesheet" href="css/componentes.css">
  <link rel="stylesheet" href="css/paginas.css">
  <link rel="stylesheet" href="css/acessibilidade.css">
</head>
<body>
  <!-- Primeiro link da página: quem navega pelo teclado pula o menu e vai direto ao conteúdo. -->
  <a class="pular" href="#conteudo">Pular para o conteúdo</a>

  <!-- CABEÇALHO. É igual nas 7 páginas; só muda qual link leva aria-current="page". -->
  <header class="cabecalho">
    <div class="largura cabecalho-grade">
      <a class="marca" href="index.html" aria-label="Colei!, página inicial">Colei!</a>

      <!-- Em telas pequenas, este botão abre e fecha o menu (ver js/menu.js). -->
      <button class="botao-menu" type="button" aria-expanded="false" aria-controls="menu-principal">Menu</button>

      <nav class="menu" id="menu-principal" aria-label="Principal">
        <ul>
          <li><a href="index.html">Início</a></li>
          <li><a href="album.html">Álbum</a></li>
          <li><a href="pacotinhos.html">Pacotinhos</a></li>
          <li><a href="trocas.html">Trocas</a></li>
          <li><a href="sobre.html">Sobre</a></li>
          <li><a href="contato.html" aria-current="page">Contato</a></li>
          <li><a class="menu-entrar" href="login.html">Entrar</a></li>
        </ul>
      </nav>

      <!-- Abre o painel de acessibilidade (ver js/tema-acessibilidade.js). -->
      <button class="botao-acessibilidade" type="button" id="abrir-acessibilidade" aria-haspopup="dialog">
        <svg class="icone" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false">
          <circle cx="12" cy="4.5" r="2.2" fill="currentColor"/>
          <path d="M4 8.5h16M12 8.5v6M8 21l4-6.5 4 6.5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span class="botao-acessibilidade-texto">Acessibilidade</span>
      </button>
    </div>
  </header>

  <main id="conteudo" tabindex="-1">

    <!-- Página dupla: à esquerda a explicação, à direita o formulário. -->
    <section class="largura dobra">
      <div class="fluxo">
        <h1>Contato</h1>
        <p class="abertura-texto">Achou um erro em alguma figurinha ou tem uma sugestão para o álbum? Escreva.</p>

        <div class="cartao">
          <h2 class="titulo-menor">O envio é simulado</h2>
          <p>Este site não tem servidor, então a mensagem não sai do seu navegador. O formulário existe para mostrar como a conferência dos campos funciona.</p>
          <p>Para falar de verdade sobre o projeto, use o <a href="https://github.com/vitorzago1/album-copa-2026">repositório no GitHub</a>.</p>
        </div>
        <noscript><p>A conferência dos campos precisa do JavaScript ligado no navegador.</p></noscript>
      </div>

      <div class="fluxo">
        <!-- RESUMO DOS ERROS. Aparece quando o envio falha, lista o que falta
             e leva a cada campo. Recebe o foco para ser lido primeiro. -->
        <div class="resumo-erros" id="resumo-erros" tabindex="-1" aria-labelledby="resumo-titulo" hidden>
          <h2 class="titulo-menor" id="resumo-titulo"></h2>
          <ul id="resumo-lista"></ul>
        </div>

        <!-- MENSAGEM DE SUCESSO. aria-live="polite": o leitor de tela lê quando o texto aparece. -->
        <p class="aviso-sucesso" id="contato-sucesso" role="status" aria-live="polite" tabindex="-1"></p>

        <!-- "novalidate" desliga os balões do navegador: as mensagens são as do site. -->
        <form class="formulario" id="form-contato" novalidate>
          <p>Todos os campos são obrigatórios.</p>

          <div class="campo">
            <label class="campo-rotulo" for="contato-nome">Nome</label>
            <input class="campo-entrada" type="text" id="contato-nome" name="nome" autocomplete="name" required aria-describedby="contato-nome-erro">
            <p class="campo-erro" id="contato-nome-erro" hidden></p>
          </div>

          <div class="campo">
            <label class="campo-rotulo" for="contato-email">E-mail</label>
            <span class="campo-dica" id="contato-email-dica">Para a resposta. Exemplo: nome@exemplo.com</span>
            <input class="campo-entrada" type="email" id="contato-email" name="email" autocomplete="email" required aria-describedby="contato-email-dica contato-email-erro">
            <p class="campo-erro" id="contato-email-erro" hidden></p>
          </div>

          <div class="campo">
            <label class="campo-rotulo" for="contato-assunto">Assunto</label>
            <select class="campo-entrada" id="contato-assunto" name="assunto" required aria-describedby="contato-assunto-erro">
              <option value="">Escolha um assunto</option>
              <option value="erro">Erro em uma figurinha</option>
              <option value="sugestao">Sugestão para o álbum</option>
              <option value="acessibilidade">Problema de acessibilidade</option>
              <option value="outro">Outro assunto</option>
            </select>
            <p class="campo-erro" id="contato-assunto-erro" hidden></p>
          </div>

          <div class="campo">
            <label class="campo-rotulo" for="contato-mensagem">Mensagem</label>
            <span class="campo-dica" id="contato-mensagem-dica">Pelo menos 10 caracteres. Se for sobre uma figurinha, diga o número dela.</span>
            <textarea class="campo-entrada" id="contato-mensagem" name="mensagem" required minlength="10" aria-describedby="contato-mensagem-dica contato-mensagem-erro"></textarea>
            <p class="campo-erro" id="contato-mensagem-erro" hidden></p>
          </div>

          <p><button class="botao" type="submit">Enviar mensagem</button></p>
        </form>
      </div>
    </section>
  </main>

  <!-- RODAPÉ. É igual nas 7 páginas. -->
  <footer class="rodape">
    <div class="largura rodape-grade">
      <div class="rodape-sobre">
        <p class="rodape-marca">Colei!</p>
        <p>O álbum de figurinhas da Copa de 2026.</p>
      </div>

      <nav aria-label="Rodapé">
        <ul class="rodape-links">
          <li><a href="index.html">Início</a></li>
          <li><a href="album.html">Álbum</a></li>
          <li><a href="pacotinhos.html">Pacotinhos</a></li>
          <li><a href="trocas.html">Trocas</a></li>
          <li><a href="sobre.html">Sobre</a></li>
          <li><a href="contato.html">Contato</a></li>
          <li><a href="login.html">Entrar</a></li>
          <li><a href="https://github.com/vitorzago1/album-copa-2026">Código no GitHub</a></li>
          <li><a href="https://vitorzago1.github.io/album-copa-2026/">Site publicado</a></li>
        </ul>
      </nav>

      <div class="rodape-creditos">
        <p>Projeto acadêmico de Vitor Zago Pontes Morais. Desenvolvimento de Interfaces, 2/2026, CEUB. Prof. Dr. Felipe Batista da Silva.</p>
        <p>Projeto acadêmico, sem fins comerciais e sem vínculo com a FIFA, a Panini ou as federações.</p>
        <p>Fontes tipográficas: Londrina Solid e Atkinson Hyperlegible Next (licença OFL). Bandeiras: flag-icons (licença MIT). Fotos dos estádios: Wikimedia Commons. Os créditos completos ficam na página <a href="sobre.html#creditos">Sobre</a>.</p>
      </div>
    </div>
  </footer>
</body>
</html>
````

### sobre.html

````html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Sobre o projeto | Colei!</title>
  <meta name="description" content="Projeto acadêmico de Desenvolvimento de Interfaces: o que foi usado e como foi feito.">
  <link rel="icon" href="assets/svg/favicon.svg" type="image/svg+xml">

  <!-- Este script fica no começo de propósito: ele aplica o tema e as preferências
       salvas antes de a página aparecer, para a tela não "piscar" no tema errado. -->
  <script src="js/tema-acessibilidade.js"></script>
  <script src="js/menu.js" defer></script>
  <script src="js/efeitos.js" defer></script>

  <!-- Para o modo demonstração: os dados, o caderninho do progresso e os dois botões. -->
  <script src="js/dados.js" defer></script>
  <script src="js/estado.js" defer></script>
  <script src="js/demonstracao.js" defer></script>
  <script src="js/sobre.js" defer></script>

  <link rel="stylesheet" href="css/tokens.css">
  <link rel="stylesheet" href="css/base.css">
  <link rel="stylesheet" href="css/componentes.css">
  <link rel="stylesheet" href="css/paginas.css">
  <link rel="stylesheet" href="css/acessibilidade.css">
</head>
<body>
  <!-- Primeiro link da página: quem navega pelo teclado pula o menu e vai direto ao conteúdo. -->
  <a class="pular" href="#conteudo">Pular para o conteúdo</a>

  <!-- CABEÇALHO. É igual nas 7 páginas; só muda qual link leva aria-current="page". -->
  <header class="cabecalho">
    <div class="largura cabecalho-grade">
      <a class="marca" href="index.html" aria-label="Colei!, página inicial">Colei!</a>

      <!-- Em telas pequenas, este botão abre e fecha o menu (ver js/menu.js). -->
      <button class="botao-menu" type="button" aria-expanded="false" aria-controls="menu-principal">Menu</button>

      <nav class="menu" id="menu-principal" aria-label="Principal">
        <ul>
          <li><a href="index.html">Início</a></li>
          <li><a href="album.html">Álbum</a></li>
          <li><a href="pacotinhos.html">Pacotinhos</a></li>
          <li><a href="trocas.html">Trocas</a></li>
          <li><a href="sobre.html" aria-current="page">Sobre</a></li>
          <li><a href="contato.html">Contato</a></li>
          <li><a class="menu-entrar" href="login.html">Entrar</a></li>
        </ul>
      </nav>

      <!-- Abre o painel de acessibilidade (ver js/tema-acessibilidade.js). -->
      <button class="botao-acessibilidade" type="button" id="abrir-acessibilidade" aria-haspopup="dialog">
        <svg class="icone" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false">
          <circle cx="12" cy="4.5" r="2.2" fill="currentColor"/>
          <path d="M4 8.5h16M12 8.5v6M8 21l4-6.5 4 6.5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span class="botao-acessibilidade-texto">Acessibilidade</span>
      </button>
    </div>
  </header>

  <main id="conteudo" tabindex="-1">

    <!-- O QUE É. Página dupla: à esquerda a apresentação, à direita a ficha do projeto. -->
    <section class="largura dobra">
      <div class="fluxo">
        <h1>Sobre o projeto</h1>
        <p class="abertura-texto">O Colei! é um álbum de figurinhas digital da Copa do Mundo de 2026. Foi feito como Projeto Final da disciplina Desenvolvimento de Interfaces, do CEUB.</p>
        <p>É um projeto acadêmico, sem fins comerciais e sem vínculo com a FIFA, a Panini ou as federações.</p>
      </div>

      <dl class="sobre-ficha">
        <dt>Aluno</dt>
        <dd>Vitor Zago Pontes Morais</dd>
        <dt>Disciplina</dt>
        <dd>Desenvolvimento de Interfaces, 2/2026, CEUB</dd>
        <dt>Professor</dt>
        <dd>Prof. Dr. Felipe Batista da Silva</dd>
        <dt>Código e histórico de versões</dt>
        <dd><a href="https://github.com/vitorzago1/album-copa-2026">github.com/vitorzago1/album-copa-2026</a></dd>
        <dt>Site publicado</dt>
        <dd><a href="https://vitorzago1.github.io/album-copa-2026/">vitorzago1.github.io/album-copa-2026</a></dd>
      </dl>
    </section>

    <!-- O QUE É DE VERDADE E O QUE É SIMULADO. -->
    <section class="largura secao dobra">
      <div class="fluxo">
        <h2>O que é de verdade</h2>
        <ul class="lista-simples">
          <li>As seleções, os jogadores, os clubes, os resultados e os estádios vêm de pesquisa. Cada dado tem a fonte anotada.</li>
          <li>O que não foi possível confirmar aparece escrito como "a confirmar".</li>
          <li>As fotos, as bandeiras e as fontes de letra têm licença livre, com o crédito mais abaixo.</li>
        </ul>
      </div>

      <div class="fluxo">
        <h2>O que é simulado</h2>
        <ul class="lista-simples">
          <li>Não existe servidor. O álbum, a conta e as preferências ficam guardados só no navegador em que o site foi aberto.</li>
          <li>O login serve para separar o álbum de cada pessoa neste navegador. Não é um login de verdade.</li>
          <li>O formulário de contato confere os campos, mas não envia a mensagem.</li>
          <li>A banca de trocas sorteia as ofertas. Não há outra pessoa do outro lado.</li>
          <li>O retrato das figurinhas é um desenho genérico. Não representa nenhum jogador.</li>
        </ul>
      </div>
    </section>

    <!-- COMO FOI FEITO. -->
    <section class="largura secao fluxo" aria-labelledby="titulo-feito">
      <h2 id="titulo-feito">Como foi feito</h2>
      <ul class="lista-simples">
        <li>HTML, CSS e JavaScript puros, sem framework e sem etapa de build. O site abre direto do arquivo <code>index.html</code>.</li>
        <li>Uma única biblioteca, a Three.js, usada só para desenhar o pacotinho em 3D.</li>
        <li>Sete páginas com o mesmo cabeçalho e o mesmo rodapé.</li>
        <li>Meta de acessibilidade: WCAG 2.2, nível AA, nos temas claro e escuro. O contraste de cada par de cores é calculado por um script.</li>
        <li>Tudo funciona pelo teclado. O que se faz arrastando também se faz por botão.</li>
        <li>O histórico de versões fica no GitHub, com uma marca em cada etapa.</li>
        <li>Inteligência artificial usada: Claude Code (modelo Claude, da Anthropic), para escrever código, pesquisar os dados e montar a documentação técnica, a partir das decisões do aluno.</li>
      </ul>
    </section>

    <!-- CRÉDITOS. A lista das fotos é montada pelo js/sobre.js, a partir de js/dados.js. -->
    <section class="largura secao fluxo" id="creditos" aria-labelledby="titulo-creditos">
      <h2 id="titulo-creditos">Créditos</h2>

      <h3>Fontes de letra</h3>
      <ul class="lista-simples">
        <li>Londrina Solid, de Marcelo Magalhães. Licença SIL Open Font License 1.1.</li>
        <li>Atkinson Hyperlegible Next, do Braille Institute of America. Licença SIL Open Font License 1.1.</li>
      </ul>

      <h3>Bandeiras</h3>
      <p>Biblioteca <a href="https://github.com/lipis/flag-icons">flag-icons</a>, de Panayiotis Lipiridis. Licença MIT.</p>

      <h3>Biblioteca de 3D</h3>
      <p>Biblioteca <a href="https://threejs.org/">Three.js</a>, revisão 128, dos autores do three.js. Licença MIT. Desenha o pacotinho em 3D na página Pacotinhos e gerou as imagens do pacotinho da página inicial.</p>

      <h3>Fotos dos estádios</h3>
      <p>Todas vêm do Wikimedia Commons. Foram reduzidas para 960 pixels de largura e, no site, aparecem na cor da tinta da página por um efeito feito no CSS. O link de cada linha leva à foto original.</p>
      <ul class="lista-fontes" id="creditos-fotos"></ul>
      <noscript><p>A lista completa das fotos está no arquivo <code>docs/referencias.md</code> do repositório.</p></noscript>
    </section>

    <!-- FONTES DOS DADOS. Lista montada pelo js/sobre.js, a partir de js/dados.js. -->
    <section class="largura secao fluxo" id="fontes" aria-labelledby="titulo-fontes">
      <h2 id="titulo-fontes">Fontes dos dados</h2>
      <p>De onde vieram os dados da Copa usados no álbum. Consultas feitas em novembro de 2026.</p>
      <ul class="lista-fontes" id="fontes-dados"></ul>
      <noscript><p>A lista completa das fontes está no arquivo <code>docs/referencias.md</code> do repositório.</p></noscript>
    </section>

    <!-- MODO DEMONSTRAÇÃO: para testar o álbum na apresentação sem esperar um pacotinho por dia.
         Os botões são ligados pelo js/demonstracao.js. -->
    <section class="largura secao fluxo" id="demonstracao" aria-labelledby="titulo-demonstracao">
      <h2 id="titulo-demonstracao">Modo demonstração</h2>
      <p>Feito para a apresentação: dá para testar o álbum inteiro sem esperar um pacotinho por dia. Vale só para este navegador.</p>
      <p class="guia-linha">
        <button class="botao" type="button" id="demo-extras">Ganhar 5 pacotinhos extras</button>
        <button class="botao botao-contorno" type="button" id="demo-zerar">Zerar álbum</button>
      </p>
      <!-- role="status": o leitor de tela lê este texto quando ele muda. -->
      <p class="painel-aviso" id="demo-aviso" role="status"></p>
    </section>

    <!-- Janela de confirmação do "Zerar álbum". O <dialog> prende o foco e fecha com Esc. -->
    <dialog class="painel" id="dialogo-zerar" aria-labelledby="titulo-zerar">
      <div class="painel-dentro">
        <div class="painel-cabeca">
          <h2 id="titulo-zerar">Zerar o álbum?</h2>
        </div>
        <p>Isso apaga as figurinhas, as coladas, os pacotinhos extras, a sequência e as conquistas guardadas neste navegador. Não dá para desfazer.</p>
        <div class="painel-pe">
          <button class="botao botao-contorno" type="button" id="zerar-cancelar">Cancelar</button>
          <button class="botao" type="button" id="zerar-confirmar">Zerar álbum</button>
        </div>
      </div>
    </dialog>

    <!-- GUIA DE ESTILO: as peças do site, todas juntas. Serve de consulta e de teste dos temas. -->
    <section class="largura secao fluxo guia" aria-labelledby="titulo-guia">
      <h2 id="titulo-guia">Guia de estilo</h2>
      <p>As peças que o site usa, todas juntas. Troque o tema no botão Acessibilidade e veja como cada uma se comporta.</p>

      <h3>Botões</h3>
      <p class="guia-linha">
        <button class="botao" type="button">Colar figurinha</button>
        <button class="botao botao-contorno" type="button">Guardar nas repetidas</button>
        <button class="botao" type="button" disabled>Pacotinho já aberto</button>
      </p>

      <h3>Etiquetas</h3>
      <p class="guia-linha">
        <span class="etiqueta">Nova</span>
        <span class="etiqueta">Repetida ×2</span>
      </p>

      <h3>Campo de formulário</h3>
      <p class="texto-apoio">Campos de exemplo: não enviam nada.</p>
      <div class="guia-colunas">
        <div class="campo">
          <label class="campo-rotulo" for="guia-nome">Nome</label>
          <span class="campo-dica" id="guia-nome-dica">Como você quer ser chamado.</span>
          <input class="campo-entrada" id="guia-nome" type="text" autocomplete="off" aria-describedby="guia-nome-dica">
        </div>

        <!-- Campo com erro: borda grossa, ícone de cartão e frase que explica o conserto. -->
        <div class="campo">
          <label class="campo-rotulo" for="guia-email">E-mail</label>
          <input class="campo-entrada" id="guia-email" type="email" value="nome.exemplo" autocomplete="off" aria-invalid="true" aria-describedby="guia-email-erro">
          <span class="campo-erro" id="guia-email-erro">
            <svg viewBox="0 0 16 20" width="16" height="20" aria-hidden="true" focusable="false">
              <rect x="1" y="1" width="14" height="18" rx="2" fill="currentColor"/>
              <path class="cartao-x" d="M5 7l6 6M11 7l-6 6" stroke-width="2" stroke-linecap="round"/>
            </svg>
            Faltou o @ no e-mail. Escreva como nome@exemplo.com.
          </span>
        </div>
      </div>

      <h3>Vaga e figurinhas</h3>
      <div class="guia-figurinhas">
        <div class="vaga"><span class="vaga-numero">127</span><span class="vaga-legenda">Falta</span></div>

        <div class="figurinha figurinha-comum" style="--campo: #1E7B4F; --camisa: #F7D417; --numero: #14204F">
          <div class="figurinha-arte">
            <svg class="figurinha-busto" viewBox="0 0 60 60" preserveAspectRatio="xMidYMax meet" aria-hidden="true" focusable="false">
              <circle class="busto-cabeca" cx="30" cy="17" r="10"/>
              <path class="busto-camisa" d="M7 61c0-15 9-24 23-24s23 9 23 24z"/>
              <text class="busto-numero" x="30" y="57" text-anchor="middle">5</text>
            </svg>
          </div>
          <div class="figurinha-tarja">
            <span class="figurinha-nome">Amostra</span>
            <span class="raridade"><span class="raridade-icone raridade-icone-circulo" aria-hidden="true"></span>Comum</span>
          </div>
        </div>

        <div class="figurinha figurinha-brilhante" style="--campo: #1D4E9E; --camisa: #FFFFFF; --numero: #1D4E9E">
          <span class="etiqueta">Nova</span>
          <div class="figurinha-arte">
            <svg class="figurinha-busto" viewBox="0 0 60 60" preserveAspectRatio="xMidYMax meet" aria-hidden="true" focusable="false">
              <circle class="busto-cabeca" cx="30" cy="17" r="10"/>
              <path class="busto-camisa" d="M7 61c0-15 9-24 23-24s23 9 23 24z"/>
              <text class="busto-numero" x="30" y="57" text-anchor="middle">8</text>
            </svg>
          </div>
          <div class="figurinha-tarja">
            <span class="figurinha-nome">Amostra</span>
            <span class="raridade"><span class="raridade-icone raridade-icone-losango" aria-hidden="true"></span>Brilhante</span>
          </div>
        </div>

        <div class="figurinha figurinha-lendaria" style="--campo: #B3202A; --camisa: #F6F2F2; --numero: #B3202A">
          <div class="figurinha-arte">
            <svg class="figurinha-busto" viewBox="0 0 60 60" preserveAspectRatio="xMidYMax meet" aria-hidden="true" focusable="false">
              <circle class="busto-cabeca" cx="30" cy="17" r="10"/>
              <path class="busto-camisa" d="M7 61c0-15 9-24 23-24s23 9 23 24z"/>
              <text class="busto-numero" x="30" y="57" text-anchor="middle">10</text>
            </svg>
          </div>
          <div class="figurinha-tarja">
            <span class="figurinha-nome">Amostra</span>
            <span class="raridade"><span class="raridade-icone raridade-icone-estrela" aria-hidden="true"></span>Lendária</span>
          </div>
        </div>
      </div>
    </section>
  </main>

  <!-- RODAPÉ. É igual nas 7 páginas. -->
  <footer class="rodape">
    <div class="largura rodape-grade">
      <div class="rodape-sobre">
        <p class="rodape-marca">Colei!</p>
        <p>O álbum de figurinhas da Copa de 2026.</p>
      </div>

      <nav aria-label="Rodapé">
        <ul class="rodape-links">
          <li><a href="index.html">Início</a></li>
          <li><a href="album.html">Álbum</a></li>
          <li><a href="pacotinhos.html">Pacotinhos</a></li>
          <li><a href="trocas.html">Trocas</a></li>
          <li><a href="sobre.html">Sobre</a></li>
          <li><a href="contato.html">Contato</a></li>
          <li><a href="login.html">Entrar</a></li>
          <li><a href="https://github.com/vitorzago1/album-copa-2026">Código no GitHub</a></li>
          <li><a href="https://vitorzago1.github.io/album-copa-2026/">Site publicado</a></li>
        </ul>
      </nav>

      <div class="rodape-creditos">
        <p>Projeto acadêmico de Vitor Zago Pontes Morais. Desenvolvimento de Interfaces, 2/2026, CEUB. Prof. Dr. Felipe Batista da Silva.</p>
        <p>Projeto acadêmico, sem fins comerciais e sem vínculo com a FIFA, a Panini ou as federações.</p>
        <p>Fontes tipográficas: Londrina Solid e Atkinson Hyperlegible Next (licença OFL). Bandeiras: flag-icons (licença MIT). Fotos dos estádios: Wikimedia Commons. Os créditos completos ficam na página <a href="sobre.html#creditos">Sobre</a>.</p>
      </div>
    </div>
  </footer>
</body>
</html>
````

## Estilos (CSS)

### css/tokens.css

````css
/* ==========================================================================
   tokens.css
   --------------------------------------------------------------------------
   "Token" é um valor com nome. Em vez de escrever #14204F em vinte lugares,
   o site inteiro usa var(--cor-texto). Para mudar a cor, muda-se uma linha só.

   Direção visual: "Uma tinta só, vários papéis".
   - Tema claro:  tinta azul sobre papel claro (rosa, pêssego, menta e lilás).
   - Tema escuro: tinta rosa sobre papel fundo (azul, roxo, petróleo e vinho).
   A tinta é uma só; o papel do fundo é que muda ao longo da página.
   A cor viva só chega pelas figurinhas.

   IMPORTANTE: toda cor nova entra aqui, com nome começando em --cor-, e depois
   é conferida com:  node scripts/contraste.js
   ========================================================================== */

/* ---------- Tema claro (o padrão) ---------- */
:root {
  /* Papel */
  --cor-fundo: #F6CDD7;              /* papel rosa: o fundo da página */
  --cor-superficie: #FDF1F4;         /* papel de cupom: cartões e campos */
  --cor-vaga: #EDB5C3;               /* rosa-sombra: espaço vazio e trilho da barra */

  /* Os outros papéis. O fundo muda de cor ao longo da página, como as páginas
     coloridas de um álbum. Todos são claros o bastante para a tinta azul. */
  --cor-papel-2: #FBD9BF;            /* pêssego */
  --cor-papel-3: #CDEBD8;            /* menta: lembra o gramado */
  --cor-papel-4: #E1D5F5;            /* lilás */
  /* As linhas de campo desenhadas no fundo: a própria tinta, bem fraca */
  --cor-traco-do-fundo: rgba(20, 32, 79, 0.09);

  /* Tinta */
  --cor-texto: #14204F;              /* azul-tinteiro: a única tinta da página */
  --cor-texto-secundario: #474C7A;   /* tinta diluída: legendas e apoio */
  --cor-borda: #4F5487;              /* linha impressa: bordas de campo e de vaga */

  /* Ação: o que a pessoa pode apertar */
  --cor-acao: #2340C4;               /* azul-caneta: botões e links */
  --cor-acao-forte: #1A3299;         /* a caneta apertada: botão com o mouse em cima */
  --cor-sobre-acao: #FDF1F4;         /* texto escrito em cima do botão */

  /* Foco do teclado: um anel e um vão, sempre um claro e um escuro */
  --cor-foco: #14204F;
  --cor-foco-vao: #FDF1F4;

  /* Recados */
  --cor-sucesso: #0A5C33;            /* verde-gramado: deu certo */
  --cor-erro: #9E001A;               /* vermelho-cartão: precisa corrigir */

  /* Etiqueta: o negativo da tinta ("Nova", "Repetida") */
  --cor-etiqueta-fundo: #14204F;
  --cor-etiqueta-texto: #F6CDD7;

  /* Figurinha: é um objeto impresso, então a tinta dela não muda com o tema */
  --cor-figurinha-papel: #FFFFFF;    /* comum: papel adesivo fosco */
  --cor-figurinha-tinta: #14204F;
  --cor-prata: #C5CAD6;              /* brilhante: laminado */
  --cor-prata-clara: #ECEEF3;
  --cor-ouro: #F2C230;               /* lendária: holográfico */
  /* O arco-íris do papel holográfico. Fica por cima da lendária, bem fraco;
     é brilho, não é texto nem fundo de texto. Não muda com o tema. */
  --holografico: linear-gradient(115deg, #FF5D8F, #FFD166 22%, #5EEAD4 45%, #60A5FA 68%, #C084FC 90%);

  /* Foto impressa em uma tinta só: a parte escura da foto sai na cor da tinta
     e a parte clara fica na cor do papel */
  --cor-foto-sombra: #14204F;
  --cor-foto-luz: #F6CDD7;

  /* Sombra da figurinha colada (só ela tem sombra no site) */
  --sombra-colada: 0 0 0 1.5px var(--cor-borda), 3px 4px 0 0 rgba(20, 32, 79, 0.55);
}

/* ---------- Tema escuro ---------- */
[data-tema="escuro"] {
  --cor-fundo: #1B2A80;              /* papel azul */
  --cor-superficie: #25359A;         /* papel azul claro: no escuro, o que está na frente fica mais claro */
  --cor-vaga: #131D4A;               /* rebaixo: mais escuro que a página */

  /* Os outros papéis, no escuro: todos fundos o bastante para a tinta rosa */
  --cor-papel-2: #3A1F87;            /* roxo */
  --cor-papel-3: #0D3A63;            /* petróleo */
  --cor-papel-4: #55195A;            /* vinho */
  --cor-traco-do-fundo: rgba(251, 227, 233, 0.07);

  --cor-texto: #FBE3E9;              /* tinta rosa */
  --cor-texto-secundario: #C9B4CC;
  --cor-borda: #9AA3E6;

  --cor-acao: #A9BEFF;               /* caneta gel: a que escreve em papel escuro */
  --cor-acao-forte: #C5D3FF;         /* no escuro, o botão clareia em vez de escurecer */
  --cor-sobre-acao: #1B2A80;

  --cor-foco: #FBE3E9;
  --cor-foco-vao: #131D4A;

  --cor-sucesso: #6EDB9B;
  --cor-erro: #FF9A9A;

  --cor-etiqueta-fundo: #FBE3E9;
  --cor-etiqueta-texto: #1B2A80;

  --cor-figurinha-papel: #EFE6EC;    /* branco puro ofusca à noite */
  --cor-figurinha-tinta: #14204F;
  --cor-prata: #AEB6C6;
  --cor-prata-clara: #DDE1E9;
  --cor-ouro: #E0AC1F;

  /* No escuro o papel é que é escuro: a sombra da foto fica no azul do rebaixo
     e a luz, na tinta rosa */
  --cor-foto-sombra: #131D4A;
  --cor-foto-luz: #FBE3E9;

  /* No escuro não se vê sombra: a figurinha colada ganha só o contorno */
  --sombra-colada: 0 0 0 1.5px var(--cor-borda);
}

/* ---------- Alto contraste, tema claro ---------- */
[data-contraste="alto"] {
  --cor-fundo: #FFFFFF;
  --cor-superficie: #FFFFFF;
  --cor-vaga: #FFFFFF;
  --cor-papel-2: #FFFFFF;            /* no alto contraste o fundo é liso */
  --cor-papel-3: #FFFFFF;
  --cor-papel-4: #FFFFFF;
  --cor-traco-do-fundo: transparent;

  --cor-texto: #000000;
  --cor-texto-secundario: #1F1F1F;
  --cor-borda: #000000;

  --cor-acao: #0A1FA8;
  --cor-acao-forte: #06157A;
  --cor-sobre-acao: #FFFFFF;

  --cor-foco: #0A1FA8;
  --cor-foco-vao: #FFFFFF;

  --cor-sucesso: #00471D;
  --cor-erro: #8A0014;

  --cor-etiqueta-fundo: #000000;
  --cor-etiqueta-texto: #FFFFFF;

  --cor-figurinha-papel: #FFFFFF;
  --cor-figurinha-tinta: #000000;
  --cor-prata: #D9D9D9;
  --cor-prata-clara: #FFFFFF;
  --cor-ouro: #FFE066;

  /* No alto contraste (claro e escuro) a foto fica em preto e branco */
  --cor-foto-sombra: #000000;
  --cor-foto-luz: #FFFFFF;

  --sombra-colada: 0 0 0 2px var(--cor-borda);
}

/* ---------- Alto contraste, tema escuro ---------- */
[data-tema="escuro"][data-contraste="alto"] {
  --cor-fundo: #000000;
  --cor-superficie: #000000;
  --cor-vaga: #000000;
  --cor-papel-2: #000000;
  --cor-papel-3: #000000;
  --cor-papel-4: #000000;

  --cor-texto: #FFFFFF;
  --cor-texto-secundario: #E6E6E6;
  --cor-borda: #FFFFFF;

  --cor-acao: #9CB4FF;
  --cor-acao-forte: #C2D0FF;
  --cor-sobre-acao: #000000;

  --cor-foco: #FFD60A;
  --cor-foco-vao: #000000;

  --cor-sucesso: #7CF0AD;
  --cor-erro: #FFB3B3;

  --cor-etiqueta-fundo: #FFFFFF;
  --cor-etiqueta-texto: #000000;

  --cor-figurinha-papel: #FFFFFF;
  --cor-figurinha-tinta: #000000;
  --cor-prata: #D9D9D9;
  --cor-prata-clara: #FFFFFF;
  --cor-ouro: #FFE066;

  --sombra-colada: 0 0 0 2px var(--cor-borda);
}

/* ---------- Medidas (valem para todos os temas) ---------- */
:root {
  /* Fontes: uma de destaque (títulos e números) e uma de leitura */
  --fonte-destaque: "Londrina Solid", "Arial Black", Impact, sans-serif;
  --fonte-leitura: "Atkinson Hyperlegible Next", "Segoe UI", Arial, sans-serif;

  /* Tamanhos de texto em rem: 1rem é o tamanho de letra que a pessoa escolheu
     no navegador (16 px na maioria). Assim tudo cresce junto no painel. */
  --texto-pequeno: 0.875rem;
  --texto-base: 1.0625rem;
  --texto-medio: 1.25rem;
  --titulo-3: 1.625rem;
  --titulo-2: clamp(2rem, 1.5rem + 2.4vw, 2.75rem);
  --titulo-1: clamp(2.75rem, 1.75rem + 5vw, 4.5rem);
  --entrelinha: 1.55;

  /* Espaços: uma escada de medidas, para o site ter ritmo */
  --espaco-1: 0.25rem;
  --espaco-2: 0.5rem;
  --espaco-3: 0.75rem;
  --espaco-4: 1rem;
  --espaco-5: 1.5rem;
  --espaco-6: 2rem;
  --espaco-7: 3rem;
  --espaco-8: 4.5rem;

  /* Cantos: cada raio quer dizer uma coisa */
  --raio-impresso: 0;        /* o que está impresso na página: vaga, fio, tira */
  --raio-ferramenta: 4px;    /* o que se usa: botão, campo */
  --raio-adesivo: 10px;      /* o que se cola: figurinha, pacotinho, cupom */

  /* Larguras */
  --largura-maxima: 70rem;   /* largura do miolo da página */
  --largura-leitura: 62ch;   /* linha de texto confortável: cerca de 62 letras */

  /* Movimento */
  --duracao: 200ms;
}

/* ---------- Fundo da página ----------
   Gerado por:  node scripts/gerar-fundo.js   (não edite à mão o que está
   entre as duas marcas: mude as cores de papel lá em cima e rode o script) */
/* FUNDO-INICIO */
:root {
  --fundo-papeis: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='4400'%3E%3Crect y='0' width='16' height='744' fill='%23F6CDD7'/%3E%3Ccircle cx='8' cy='527' r='1.5' fill='%23FBD9BF'/%3E%3Ccircle cx='0' cy='541' r='2.0' fill='%23FBD9BF'/%3E%3Ccircle cx='16' cy='541' r='2.0' fill='%23FBD9BF'/%3E%3Ccircle cx='8' cy='555' r='2.6' fill='%23FBD9BF'/%3E%3Ccircle cx='0' cy='569' r='3.1' fill='%23FBD9BF'/%3E%3Ccircle cx='16' cy='569' r='3.1' fill='%23FBD9BF'/%3E%3Ccircle cx='8' cy='583' r='3.6' fill='%23FBD9BF'/%3E%3Ccircle cx='0' cy='597' r='4.2' fill='%23FBD9BF'/%3E%3Ccircle cx='16' cy='597' r='4.2' fill='%23FBD9BF'/%3E%3Ccircle cx='8' cy='611' r='4.7' fill='%23FBD9BF'/%3E%3Ccircle cx='0' cy='625' r='5.2' fill='%23FBD9BF'/%3E%3Ccircle cx='16' cy='625' r='5.2' fill='%23FBD9BF'/%3E%3Ccircle cx='8' cy='639' r='5.8' fill='%23FBD9BF'/%3E%3Ccircle cx='0' cy='653' r='6.3' fill='%23FBD9BF'/%3E%3Ccircle cx='16' cy='653' r='6.3' fill='%23FBD9BF'/%3E%3Ccircle cx='8' cy='667' r='6.8' fill='%23FBD9BF'/%3E%3Ccircle cx='0' cy='681' r='7.4' fill='%23FBD9BF'/%3E%3Ccircle cx='16' cy='681' r='7.4' fill='%23FBD9BF'/%3E%3Ccircle cx='8' cy='695' r='7.9' fill='%23FBD9BF'/%3E%3Ccircle cx='0' cy='709' r='8.4' fill='%23FBD9BF'/%3E%3Ccircle cx='16' cy='709' r='8.4' fill='%23FBD9BF'/%3E%3Ccircle cx='8' cy='723' r='9.0' fill='%23FBD9BF'/%3E%3Ccircle cx='0' cy='737' r='9.5' fill='%23FBD9BF'/%3E%3Ccircle cx='16' cy='737' r='9.5' fill='%23FBD9BF'/%3E%3Crect y='744' width='16' height='1080' fill='%23FBD9BF'/%3E%3Ccircle cx='8' cy='1607' r='1.5' fill='%23CDEBD8'/%3E%3Ccircle cx='0' cy='1621' r='2.0' fill='%23CDEBD8'/%3E%3Ccircle cx='16' cy='1621' r='2.0' fill='%23CDEBD8'/%3E%3Ccircle cx='8' cy='1635' r='2.6' fill='%23CDEBD8'/%3E%3Ccircle cx='0' cy='1649' r='3.1' fill='%23CDEBD8'/%3E%3Ccircle cx='16' cy='1649' r='3.1' fill='%23CDEBD8'/%3E%3Ccircle cx='8' cy='1663' r='3.6' fill='%23CDEBD8'/%3E%3Ccircle cx='0' cy='1677' r='4.2' fill='%23CDEBD8'/%3E%3Ccircle cx='16' cy='1677' r='4.2' fill='%23CDEBD8'/%3E%3Ccircle cx='8' cy='1691' r='4.7' fill='%23CDEBD8'/%3E%3Ccircle cx='0' cy='1705' r='5.2' fill='%23CDEBD8'/%3E%3Ccircle cx='16' cy='1705' r='5.2' fill='%23CDEBD8'/%3E%3Ccircle cx='8' cy='1719' r='5.8' fill='%23CDEBD8'/%3E%3Ccircle cx='0' cy='1733' r='6.3' fill='%23CDEBD8'/%3E%3Ccircle cx='16' cy='1733' r='6.3' fill='%23CDEBD8'/%3E%3Ccircle cx='8' cy='1747' r='6.8' fill='%23CDEBD8'/%3E%3Ccircle cx='0' cy='1761' r='7.4' fill='%23CDEBD8'/%3E%3Ccircle cx='16' cy='1761' r='7.4' fill='%23CDEBD8'/%3E%3Ccircle cx='8' cy='1775' r='7.9' fill='%23CDEBD8'/%3E%3Ccircle cx='0' cy='1789' r='8.4' fill='%23CDEBD8'/%3E%3Ccircle cx='16' cy='1789' r='8.4' fill='%23CDEBD8'/%3E%3Ccircle cx='8' cy='1803' r='9.0' fill='%23CDEBD8'/%3E%3Ccircle cx='0' cy='1817' r='9.5' fill='%23CDEBD8'/%3E%3Ccircle cx='16' cy='1817' r='9.5' fill='%23CDEBD8'/%3E%3Crect y='1824' width='16' height='1080' fill='%23CDEBD8'/%3E%3Ccircle cx='8' cy='2687' r='1.5' fill='%23E1D5F5'/%3E%3Ccircle cx='0' cy='2701' r='2.0' fill='%23E1D5F5'/%3E%3Ccircle cx='16' cy='2701' r='2.0' fill='%23E1D5F5'/%3E%3Ccircle cx='8' cy='2715' r='2.6' fill='%23E1D5F5'/%3E%3Ccircle cx='0' cy='2729' r='3.1' fill='%23E1D5F5'/%3E%3Ccircle cx='16' cy='2729' r='3.1' fill='%23E1D5F5'/%3E%3Ccircle cx='8' cy='2743' r='3.6' fill='%23E1D5F5'/%3E%3Ccircle cx='0' cy='2757' r='4.2' fill='%23E1D5F5'/%3E%3Ccircle cx='16' cy='2757' r='4.2' fill='%23E1D5F5'/%3E%3Ccircle cx='8' cy='2771' r='4.7' fill='%23E1D5F5'/%3E%3Ccircle cx='0' cy='2785' r='5.2' fill='%23E1D5F5'/%3E%3Ccircle cx='16' cy='2785' r='5.2' fill='%23E1D5F5'/%3E%3Ccircle cx='8' cy='2799' r='5.8' fill='%23E1D5F5'/%3E%3Ccircle cx='0' cy='2813' r='6.3' fill='%23E1D5F5'/%3E%3Ccircle cx='16' cy='2813' r='6.3' fill='%23E1D5F5'/%3E%3Ccircle cx='8' cy='2827' r='6.8' fill='%23E1D5F5'/%3E%3Ccircle cx='0' cy='2841' r='7.4' fill='%23E1D5F5'/%3E%3Ccircle cx='16' cy='2841' r='7.4' fill='%23E1D5F5'/%3E%3Ccircle cx='8' cy='2855' r='7.9' fill='%23E1D5F5'/%3E%3Ccircle cx='0' cy='2869' r='8.4' fill='%23E1D5F5'/%3E%3Ccircle cx='16' cy='2869' r='8.4' fill='%23E1D5F5'/%3E%3Ccircle cx='8' cy='2883' r='9.0' fill='%23E1D5F5'/%3E%3Ccircle cx='0' cy='2897' r='9.5' fill='%23E1D5F5'/%3E%3Ccircle cx='16' cy='2897' r='9.5' fill='%23E1D5F5'/%3E%3Crect y='2904' width='16' height='1080' fill='%23E1D5F5'/%3E%3Ccircle cx='8' cy='3767' r='1.5' fill='%23F6CDD7'/%3E%3Ccircle cx='0' cy='3781' r='2.0' fill='%23F6CDD7'/%3E%3Ccircle cx='16' cy='3781' r='2.0' fill='%23F6CDD7'/%3E%3Ccircle cx='8' cy='3795' r='2.6' fill='%23F6CDD7'/%3E%3Ccircle cx='0' cy='3809' r='3.1' fill='%23F6CDD7'/%3E%3Ccircle cx='16' cy='3809' r='3.1' fill='%23F6CDD7'/%3E%3Ccircle cx='8' cy='3823' r='3.6' fill='%23F6CDD7'/%3E%3Ccircle cx='0' cy='3837' r='4.2' fill='%23F6CDD7'/%3E%3Ccircle cx='16' cy='3837' r='4.2' fill='%23F6CDD7'/%3E%3Ccircle cx='8' cy='3851' r='4.7' fill='%23F6CDD7'/%3E%3Ccircle cx='0' cy='3865' r='5.2' fill='%23F6CDD7'/%3E%3Ccircle cx='16' cy='3865' r='5.2' fill='%23F6CDD7'/%3E%3Ccircle cx='8' cy='3879' r='5.8' fill='%23F6CDD7'/%3E%3Ccircle cx='0' cy='3893' r='6.3' fill='%23F6CDD7'/%3E%3Ccircle cx='16' cy='3893' r='6.3' fill='%23F6CDD7'/%3E%3Ccircle cx='8' cy='3907' r='6.8' fill='%23F6CDD7'/%3E%3Ccircle cx='0' cy='3921' r='7.4' fill='%23F6CDD7'/%3E%3Ccircle cx='16' cy='3921' r='7.4' fill='%23F6CDD7'/%3E%3Ccircle cx='8' cy='3935' r='7.9' fill='%23F6CDD7'/%3E%3Ccircle cx='0' cy='3949' r='8.4' fill='%23F6CDD7'/%3E%3Ccircle cx='16' cy='3949' r='8.4' fill='%23F6CDD7'/%3E%3Ccircle cx='8' cy='3963' r='9.0' fill='%23F6CDD7'/%3E%3Ccircle cx='0' cy='3977' r='9.5' fill='%23F6CDD7'/%3E%3Ccircle cx='16' cy='3977' r='9.5' fill='%23F6CDD7'/%3E%3Crect y='3984' width='16' height='416' fill='%23F6CDD7'/%3E%3C/svg%3E");
}

[data-tema="escuro"] {
  --fundo-papeis: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='4400'%3E%3Crect y='0' width='16' height='744' fill='%231B2A80'/%3E%3Ccircle cx='8' cy='527' r='1.5' fill='%233A1F87'/%3E%3Ccircle cx='0' cy='541' r='2.0' fill='%233A1F87'/%3E%3Ccircle cx='16' cy='541' r='2.0' fill='%233A1F87'/%3E%3Ccircle cx='8' cy='555' r='2.6' fill='%233A1F87'/%3E%3Ccircle cx='0' cy='569' r='3.1' fill='%233A1F87'/%3E%3Ccircle cx='16' cy='569' r='3.1' fill='%233A1F87'/%3E%3Ccircle cx='8' cy='583' r='3.6' fill='%233A1F87'/%3E%3Ccircle cx='0' cy='597' r='4.2' fill='%233A1F87'/%3E%3Ccircle cx='16' cy='597' r='4.2' fill='%233A1F87'/%3E%3Ccircle cx='8' cy='611' r='4.7' fill='%233A1F87'/%3E%3Ccircle cx='0' cy='625' r='5.2' fill='%233A1F87'/%3E%3Ccircle cx='16' cy='625' r='5.2' fill='%233A1F87'/%3E%3Ccircle cx='8' cy='639' r='5.8' fill='%233A1F87'/%3E%3Ccircle cx='0' cy='653' r='6.3' fill='%233A1F87'/%3E%3Ccircle cx='16' cy='653' r='6.3' fill='%233A1F87'/%3E%3Ccircle cx='8' cy='667' r='6.8' fill='%233A1F87'/%3E%3Ccircle cx='0' cy='681' r='7.4' fill='%233A1F87'/%3E%3Ccircle cx='16' cy='681' r='7.4' fill='%233A1F87'/%3E%3Ccircle cx='8' cy='695' r='7.9' fill='%233A1F87'/%3E%3Ccircle cx='0' cy='709' r='8.4' fill='%233A1F87'/%3E%3Ccircle cx='16' cy='709' r='8.4' fill='%233A1F87'/%3E%3Ccircle cx='8' cy='723' r='9.0' fill='%233A1F87'/%3E%3Ccircle cx='0' cy='737' r='9.5' fill='%233A1F87'/%3E%3Ccircle cx='16' cy='737' r='9.5' fill='%233A1F87'/%3E%3Crect y='744' width='16' height='1080' fill='%233A1F87'/%3E%3Ccircle cx='8' cy='1607' r='1.5' fill='%230D3A63'/%3E%3Ccircle cx='0' cy='1621' r='2.0' fill='%230D3A63'/%3E%3Ccircle cx='16' cy='1621' r='2.0' fill='%230D3A63'/%3E%3Ccircle cx='8' cy='1635' r='2.6' fill='%230D3A63'/%3E%3Ccircle cx='0' cy='1649' r='3.1' fill='%230D3A63'/%3E%3Ccircle cx='16' cy='1649' r='3.1' fill='%230D3A63'/%3E%3Ccircle cx='8' cy='1663' r='3.6' fill='%230D3A63'/%3E%3Ccircle cx='0' cy='1677' r='4.2' fill='%230D3A63'/%3E%3Ccircle cx='16' cy='1677' r='4.2' fill='%230D3A63'/%3E%3Ccircle cx='8' cy='1691' r='4.7' fill='%230D3A63'/%3E%3Ccircle cx='0' cy='1705' r='5.2' fill='%230D3A63'/%3E%3Ccircle cx='16' cy='1705' r='5.2' fill='%230D3A63'/%3E%3Ccircle cx='8' cy='1719' r='5.8' fill='%230D3A63'/%3E%3Ccircle cx='0' cy='1733' r='6.3' fill='%230D3A63'/%3E%3Ccircle cx='16' cy='1733' r='6.3' fill='%230D3A63'/%3E%3Ccircle cx='8' cy='1747' r='6.8' fill='%230D3A63'/%3E%3Ccircle cx='0' cy='1761' r='7.4' fill='%230D3A63'/%3E%3Ccircle cx='16' cy='1761' r='7.4' fill='%230D3A63'/%3E%3Ccircle cx='8' cy='1775' r='7.9' fill='%230D3A63'/%3E%3Ccircle cx='0' cy='1789' r='8.4' fill='%230D3A63'/%3E%3Ccircle cx='16' cy='1789' r='8.4' fill='%230D3A63'/%3E%3Ccircle cx='8' cy='1803' r='9.0' fill='%230D3A63'/%3E%3Ccircle cx='0' cy='1817' r='9.5' fill='%230D3A63'/%3E%3Ccircle cx='16' cy='1817' r='9.5' fill='%230D3A63'/%3E%3Crect y='1824' width='16' height='1080' fill='%230D3A63'/%3E%3Ccircle cx='8' cy='2687' r='1.5' fill='%2355195A'/%3E%3Ccircle cx='0' cy='2701' r='2.0' fill='%2355195A'/%3E%3Ccircle cx='16' cy='2701' r='2.0' fill='%2355195A'/%3E%3Ccircle cx='8' cy='2715' r='2.6' fill='%2355195A'/%3E%3Ccircle cx='0' cy='2729' r='3.1' fill='%2355195A'/%3E%3Ccircle cx='16' cy='2729' r='3.1' fill='%2355195A'/%3E%3Ccircle cx='8' cy='2743' r='3.6' fill='%2355195A'/%3E%3Ccircle cx='0' cy='2757' r='4.2' fill='%2355195A'/%3E%3Ccircle cx='16' cy='2757' r='4.2' fill='%2355195A'/%3E%3Ccircle cx='8' cy='2771' r='4.7' fill='%2355195A'/%3E%3Ccircle cx='0' cy='2785' r='5.2' fill='%2355195A'/%3E%3Ccircle cx='16' cy='2785' r='5.2' fill='%2355195A'/%3E%3Ccircle cx='8' cy='2799' r='5.8' fill='%2355195A'/%3E%3Ccircle cx='0' cy='2813' r='6.3' fill='%2355195A'/%3E%3Ccircle cx='16' cy='2813' r='6.3' fill='%2355195A'/%3E%3Ccircle cx='8' cy='2827' r='6.8' fill='%2355195A'/%3E%3Ccircle cx='0' cy='2841' r='7.4' fill='%2355195A'/%3E%3Ccircle cx='16' cy='2841' r='7.4' fill='%2355195A'/%3E%3Ccircle cx='8' cy='2855' r='7.9' fill='%2355195A'/%3E%3Ccircle cx='0' cy='2869' r='8.4' fill='%2355195A'/%3E%3Ccircle cx='16' cy='2869' r='8.4' fill='%2355195A'/%3E%3Ccircle cx='8' cy='2883' r='9.0' fill='%2355195A'/%3E%3Ccircle cx='0' cy='2897' r='9.5' fill='%2355195A'/%3E%3Ccircle cx='16' cy='2897' r='9.5' fill='%2355195A'/%3E%3Crect y='2904' width='16' height='1080' fill='%2355195A'/%3E%3Ccircle cx='8' cy='3767' r='1.5' fill='%231B2A80'/%3E%3Ccircle cx='0' cy='3781' r='2.0' fill='%231B2A80'/%3E%3Ccircle cx='16' cy='3781' r='2.0' fill='%231B2A80'/%3E%3Ccircle cx='8' cy='3795' r='2.6' fill='%231B2A80'/%3E%3Ccircle cx='0' cy='3809' r='3.1' fill='%231B2A80'/%3E%3Ccircle cx='16' cy='3809' r='3.1' fill='%231B2A80'/%3E%3Ccircle cx='8' cy='3823' r='3.6' fill='%231B2A80'/%3E%3Ccircle cx='0' cy='3837' r='4.2' fill='%231B2A80'/%3E%3Ccircle cx='16' cy='3837' r='4.2' fill='%231B2A80'/%3E%3Ccircle cx='8' cy='3851' r='4.7' fill='%231B2A80'/%3E%3Ccircle cx='0' cy='3865' r='5.2' fill='%231B2A80'/%3E%3Ccircle cx='16' cy='3865' r='5.2' fill='%231B2A80'/%3E%3Ccircle cx='8' cy='3879' r='5.8' fill='%231B2A80'/%3E%3Ccircle cx='0' cy='3893' r='6.3' fill='%231B2A80'/%3E%3Ccircle cx='16' cy='3893' r='6.3' fill='%231B2A80'/%3E%3Ccircle cx='8' cy='3907' r='6.8' fill='%231B2A80'/%3E%3Ccircle cx='0' cy='3921' r='7.4' fill='%231B2A80'/%3E%3Ccircle cx='16' cy='3921' r='7.4' fill='%231B2A80'/%3E%3Ccircle cx='8' cy='3935' r='7.9' fill='%231B2A80'/%3E%3Ccircle cx='0' cy='3949' r='8.4' fill='%231B2A80'/%3E%3Ccircle cx='16' cy='3949' r='8.4' fill='%231B2A80'/%3E%3Ccircle cx='8' cy='3963' r='9.0' fill='%231B2A80'/%3E%3Ccircle cx='0' cy='3977' r='9.5' fill='%231B2A80'/%3E%3Ccircle cx='16' cy='3977' r='9.5' fill='%231B2A80'/%3E%3Crect y='3984' width='16' height='416' fill='%231B2A80'/%3E%3C/svg%3E");
}

/* No alto contraste o fundo é liso: branco ou preto, sem desenho */
[data-contraste="alto"] {
  --fundo-papeis: none;
}
/* FUNDO-FIM */
````

### css/base.css

````css
/* ==========================================================================
   base.css
   --------------------------------------------------------------------------
   O que vale para o site inteiro: fontes, texto, links, foco do teclado,
   cabeçalho, rodapé e as grades de página. Usa as cores de tokens.css.
   ========================================================================== */

/* ---------- Fontes ----------
   Os arquivos ficam em assets/fontes, dentro do projeto: o site não depende
   de outro site para mostrar as letras. "font-display: swap" mostra o texto
   na hora com uma fonte do sistema e troca quando a fonte certa carrega. */

@font-face {
  font-family: "Londrina Solid";
  src: url("../assets/fontes/londrina-solid-300.woff2") format("woff2");
  font-weight: 300;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "Londrina Solid";
  src: url("../assets/fontes/londrina-solid-900.woff2") format("woff2");
  font-weight: 900;
  font-style: normal;
  font-display: swap;
}

/* A Atkinson é uma fonte "variável": um arquivo só guarda todos os pesos,
   de 200 a 800. Ela vem em duas partes: "latin" (o português inteiro) e
   "latin-ext" (letras como ł, ř, ş, de nomes estrangeiros). O unicode-range
   diz ao navegador quais letras cada arquivo tem; a segunda parte só é
   baixada se a página usar alguma dessas letras. */

@font-face {
  font-family: "Atkinson Hyperlegible Next";
  src: url("../assets/fontes/atkinson-next-normal-latin.woff2") format("woff2");
  font-weight: 200 800;
  font-style: normal;
  font-display: swap;
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}

@font-face {
  font-family: "Atkinson Hyperlegible Next";
  src: url("../assets/fontes/atkinson-next-normal-latin-ext.woff2") format("woff2");
  font-weight: 200 800;
  font-style: normal;
  font-display: swap;
  unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C4, U+2113, U+2C60-2C7F, U+A720-A7FF;
}

@font-face {
  font-family: "Atkinson Hyperlegible Next";
  src: url("../assets/fontes/atkinson-next-italico-latin.woff2") format("woff2");
  font-weight: 200 800;
  font-style: italic;
  font-display: swap;
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}

@font-face {
  font-family: "Atkinson Hyperlegible Next";
  src: url("../assets/fontes/atkinson-next-italico-latin-ext.woff2") format("woff2");
  font-weight: 200 800;
  font-style: italic;
  font-display: swap;
  unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C4, U+2113, U+2C60-2C7F, U+A720-A7FF;
}

/* ---------- Ajustes iniciais ----------
   Cada navegador tem margens e medidas próprias. Aqui todos partem do mesmo ponto. */

*,
*::before,
*::after {
  box-sizing: border-box; /* a largura de uma caixa já inclui a borda e o espaço interno */
}

body, h1, h2, h3, p, ul, ol, dl, dd, figure {
  margin: 0;
}

img {
  max-width: 100%;
  height: auto;
}

button, input, select, textarea {
  font: inherit;   /* campos e botões usam a mesma letra do resto da página */
  color: inherit;
  /* e acompanham a opção "Mais espaço no texto" do painel de acessibilidade */
  letter-spacing: inherit;
  word-spacing: inherit;
}

/* O atributo "hidden" do HTML esconde um elemento. Sem esta regra, qualquer
   "display" escrito no CSS (flex, grid) faria o elemento aparecer de novo. */
[hidden] {
  display: none !important;
}

/* ---------- Página ---------- */

body {
  min-height: 100vh;
  display: flex;
  flex-direction: column;   /* cabeçalho, conteúdo e rodapé empilhados */
  font-family: var(--fonte-leitura);
  font-size: var(--texto-base);
  line-height: var(--entrelinha);
  position: relative;   /* o desenho do fundo (body::before, mais abaixo) se mede pela página inteira */
  background: var(--cor-fundo);
  color: var(--cor-texto);
  overflow-wrap: break-word;   /* palavra comprida demais quebra em vez de empurrar a página */
}

main {
  flex: 1;   /* o conteúdo estica e empurra o rodapé para o fim da tela */
  padding-block: var(--espaco-6) var(--espaco-7);
}

/* O "Pular para o conteúdo" leva o foco para o <main>. Como ele não é um
   controle, não precisa do anel de foco em volta da página inteira. */
main:focus {
  outline: none;
  box-shadow: none;
}

/* Miolo centralizado, com respiro nas laterais */
.largura {
  width: 100%;
  max-width: var(--largura-maxima);
  margin-inline: auto;
  padding-inline: var(--espaco-4);
}

/* ---------- Texto ---------- */

h1, h2, h3 {
  font-family: var(--fonte-destaque);
  font-weight: 900;
  line-height: 1;
  text-wrap: balance;   /* quebra o título em linhas de tamanho parecido */
}

h1 { font-size: var(--titulo-1); line-height: 0.95; }
h2 { font-size: var(--titulo-2); }
h3 { font-size: var(--titulo-3); line-height: 1.1; }

p {
  max-width: var(--largura-leitura);
}

/* Nome de arquivo ou de comando no meio do texto: mesma letra, mais pesada.
   (Sem isto o navegador usaria uma terceira fonte, de máquina de escrever.) */
code {
  font-family: inherit;
  font-weight: 700;
}

/* Empilha os filhos com o mesmo espaço entre eles */
.fluxo > * + * {
  margin-top: var(--espaco-4);
}

.texto-apoio {
  color: var(--cor-texto-secundario);
  font-size: var(--texto-pequeno);
}

/* ---------- Links ----------
   Todo link é sublinhado: assim ele não depende só da cor para ser reconhecido. */

a {
  color: var(--cor-acao);
  text-decoration-line: underline;
  text-decoration-thickness: 0.08em;
  text-underline-offset: 0.18em;
}

a:hover {
  color: var(--cor-acao-forte);
  text-decoration-thickness: 0.16em;
}

/* ---------- Foco do teclado ----------
   Dois tons: um anel (outline) e um vão (box-shadow) de claridade oposta.
   Em qualquer fundo, claro ou escuro, pelo menos um dos dois aparece. */

:focus-visible {
  outline: 3px solid var(--cor-foco);
  outline-offset: 3px;
  box-shadow: 0 0 0 3px var(--cor-foco-vao);
}

/* ---------- Ajudas de acessibilidade ---------- */

/* Esconde da tela, mas o leitor de tela continua lendo */
.escondido {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}

/* "Pular para o conteúdo": fica fora da tela até receber o foco do teclado */
.pular {
  position: absolute;
  left: var(--espaco-4);
  top: var(--espaco-2);
  z-index: 10;
  padding: var(--espaco-2) var(--espaco-4);
  background: var(--cor-etiqueta-fundo);
  color: var(--cor-etiqueta-texto);
  font-weight: 700;
  border-radius: var(--raio-ferramenta);
  transform: translateY(-250%);
}

.pular:hover {
  color: var(--cor-etiqueta-texto);
}

.pular:focus {
  transform: translateY(0);
}

/* ---------- Cabeçalho ----------
   No celular: marca, botão Menu e botão de acessibilidade na primeira linha;
   o menu abre embaixo. No computador: tudo em uma linha só.
   O cabeçalho não é fixo: ele sobe com a página, então nunca cobre o foco. */

.cabecalho {
  border-bottom: 2px solid var(--cor-texto);
}

.cabecalho-grade {
  display: grid;
  grid-template-columns: 1fr auto auto;
  grid-template-areas:
    "marca botao-menu acessibilidade"
    "menu  menu       menu";
  align-items: center;
  gap: var(--espaco-2) var(--espaco-3);
  padding-block: var(--espaco-3);
}

.marca {
  grid-area: marca;
  justify-self: start;
  padding-block: var(--espaco-1);
  font-family: var(--fonte-destaque);
  font-weight: 900;
  font-size: 2.25rem;
  line-height: 1;
  color: var(--cor-texto);
  text-decoration: none;
}

.marca:hover {
  color: var(--cor-texto);
  text-decoration: underline;
  text-decoration-thickness: 3px;
}

/* Os dois botões do cabeçalho: contorno de tinta, sem preenchimento */
.botao-menu,
.botao-acessibilidade {
  display: none;   /* só aparecem se o JavaScript estiver ligado (ver abaixo) */
  align-items: center;
  justify-content: center;
  gap: var(--espaco-2);
  min-width: 2.75rem;
  min-height: 2.75rem;   /* 44 px: alvo de toque confortável */
  padding: 0 var(--espaco-3);
  background: transparent;
  color: var(--cor-texto);
  border: 2px solid var(--cor-texto);
  border-radius: var(--raio-ferramenta);
  font-weight: 700;
  cursor: pointer;
}

.botao-menu:hover,
.botao-acessibilidade:hover {
  background: var(--cor-texto);
  color: var(--cor-fundo);
}

.botao-menu { grid-area: botao-menu; }
.botao-acessibilidade { grid-area: acessibilidade; }

/* A classe "com-js" é posta no <html> pelo js/tema-acessibilidade.js.
   Sem JavaScript, os botões que dependem dele nem aparecem e o menu fica sempre aberto. */
.com-js .botao-menu,
.com-js .botao-acessibilidade {
  display: inline-flex;
}

/* No celular, o texto "Acessibilidade" fica só para o leitor de tela; sobra o ícone */
.botao-acessibilidade-texto {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}

.menu {
  grid-area: menu;
}

.com-js .menu {
  display: none;
}

.com-js .menu.menu-aberto {
  display: block;
}

.menu ul {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
}

.menu a {
  display: flex;
  align-items: center;
  min-height: 2.75rem;
  padding-inline: var(--espaco-3);
  color: var(--cor-texto);
  font-weight: 600;
  text-decoration: none;
}

.menu a:hover {
  text-decoration: underline;
  text-decoration-thickness: 2px;
  text-underline-offset: 6px;
}

/* Página atual: sublinhado grosso e peso maior (não depende de cor) */
.menu a[aria-current="page"] {
  font-weight: 800;
  text-decoration: underline;
  text-decoration-thickness: 3px;
  text-underline-offset: 6px;
}

@media (min-width: 60rem) {
  .cabecalho-grade {
    grid-template-columns: auto 1fr auto;
    grid-template-areas: "marca menu acessibilidade";
    column-gap: var(--espaco-5);
  }

  .com-js .botao-menu {
    display: none;
  }

  .com-js .menu {
    display: block;
  }

  .menu ul {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-end;
  }

  .menu .menu-entrar {
    margin-left: var(--espaco-3);
    border: 2px solid var(--cor-texto);
    border-radius: var(--raio-ferramenta);
  }

  .botao-acessibilidade-texto {
    position: static;
    width: auto;
    height: auto;
    overflow: visible;
    clip-path: none;
  }
}

/* ---------- Rodapé ---------- */

.rodape {
  border-top: 2px solid var(--cor-texto);
  padding-block: var(--espaco-6);
  font-size: var(--texto-pequeno);
}

.rodape-grade {
  display: grid;
  gap: var(--espaco-5);
}

.rodape-marca {
  font-family: var(--fonte-destaque);
  font-weight: 900;
  font-size: 1.75rem;
  line-height: 1;
}

.rodape-links {
  list-style: none;
  padding: 0;
  columns: 2;
  column-gap: var(--espaco-5);
}

.rodape-links a {
  display: inline-flex;
  align-items: center;
  min-height: 2.75rem;
}

.rodape-creditos p + p {
  margin-top: var(--espaco-2);
}

@media (min-width: 60rem) {
  .rodape-grade {
    grid-template-columns: 1fr 1.2fr 2fr;
    gap: var(--espaco-6);
  }
}

/* ---------- Página dupla ----------
   A grade principal do site: duas "páginas" de larguras diferentes com uma
   dobra no meio, como um álbum aberto. No celular vira uma página só. */

.dobra {
  display: grid;
  gap: var(--espaco-5);
}

.dobra > * {
  min-width: 0;   /* deixa o conteúdo encolher em telas estreitas */
}

.dobra > * + * {
  border-top: 2px solid var(--cor-texto);
  padding-top: var(--espaco-5);
}

@media (min-width: 48rem) {
  .dobra {
    grid-template-columns: 5fr 7fr;
    gap: 0;
  }

  .dobra > * {
    padding-right: var(--espaco-6);
  }

  .dobra > * + * {
    border-top: 0;
    padding-top: 0;
    border-left: 2px solid var(--cor-texto);
    padding-left: var(--espaco-6);
    padding-right: 0;
  }
}

/* Uma seção da página, separada da anterior por um fio impresso */
.secao {
  padding-block: var(--espaco-6);
}

.secao + .secao {
  border-top: 2px solid var(--cor-texto);
}

/* ---------- Retícula que acende ----------
   Uma camada do tamanho da tela, atrás de tudo, coberta de pontinhos de
   impressão. A máscara só deixa ver os que estão perto do ponteiro: a posição
   chega em --x e --y, escrita pelo js/efeitos.js. É só enfeite. */

.lanterna {
  position: fixed;
  inset: 0;
  z-index: -1;            /* atrás de todo o conteúdo, em cima só do papel */
  pointer-events: none;
  background: radial-gradient(circle, var(--cor-texto) 1.6px, transparent 2px) 0 0 / 11px 11px;
  -webkit-mask-image: radial-gradient(circle 9rem at var(--x, 50%) var(--y, 50%), #000, transparent);
  mask-image: radial-gradient(circle 9rem at var(--x, 50%) var(--y, 50%), #000, transparent);
  opacity: 0;
  transition: opacity 400ms ease-out;
}

.lanterna-acesa {
  opacity: 0.2;
}

/* Na página inicial em movimento a abertura já tem os seus pontinhos */
.com-cenas .lanterna {
  display: none;
}

/* ---------- Virar a página ----------
   Ao ir de uma página do site para outra, o navegador tira um retrato da
   página velha e um da nova e anima entre os dois (View Transitions API).
   A regra abaixo liga isso para os links do próprio site. A página velha sai
   como uma folha virando em torno da borda esquerda, e a nova chega.
   Onde o navegador não conhece a regra (Firefox, por exemplo), ou com o site
   aberto direto do arquivo, a troca é seca e nada quebra. */

@view-transition {
  navigation: auto;
}

/* O cabeçalho e o rodapé são iguais em todas as páginas: ficam parados */
.cabecalho {
  view-transition-name: cabecalho;
}

.rodape {
  view-transition-name: rodape;
}

::view-transition-old(root) {
  transform-origin: left center;
  animation: folha-sai 280ms ease-in both;
}

::view-transition-new(root) {
  transform-origin: left center;
  animation: folha-entra 360ms ease-out both;
}

@keyframes folha-sai {
  to { transform: perspective(60rem) rotateY(-80deg); opacity: 0; }
}

@keyframes folha-entra {
  from { transform: perspective(60rem) rotateY(60deg); opacity: 0; }
}

/* ---------- O fundo da página ----------
   Uma camada do tamanho da página inteira, atrás de todo o conteúdo. Ela tem
   duas partes, uma por cima da outra:

   1. OS PAPÉIS (a última linha do "background"). O fundo muda de cor conforme
      a página desce: rosa, pêssego, menta, lilás e de novo rosa. Entre um
      papel e outro, bolinhas da cor seguinte vão crescendo até se juntarem,
      como o degradê da impressão em papel. É uma tira estreita, repetida para
      os lados e para baixo, desenhada pelo scripts/gerar-fundo.js.

   2. AS LINHAS DE CAMPO (as outras linhas). Um campo de futebol visto de cima,
      espalhado pela página: o círculo central, a grande área e os cantos, mais
      duas cruzes de registro de gráfica. Cada linha é um degradê com uma faixa
      fininha de cor e o resto transparente. Todas se repetem a cada 4400 px,
      a mesma altura da tira dos papéis.

   A tinta continua uma só: as linhas são a tinta da página, bem fraca. */

body::before {
  --traco: var(--cor-traco-do-fundo);
  --raio-do-centro: min(16rem, 38vw);
  --raio-da-meia-lua: min(9rem, 20vw);

  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  background:
    /* Cruz de registro, em cima à esquerda (um risco deitado e um em pé) */
    linear-gradient(to bottom, transparent 379px, var(--traco) 379px 381px, transparent 381px) left 24px top 0 / 22px 4400px repeat-y,
    linear-gradient(to bottom, transparent 369px, var(--traco) 369px 391px, transparent 391px) left 34px top 0 / 2px 4400px repeat-y,
    /* Cruz de registro, mais abaixo à direita */
    linear-gradient(to bottom, transparent 3049px, var(--traco) 3049px 3051px, transparent 3051px) right 24px top 0 / 22px 4400px repeat-y,
    linear-gradient(to bottom, transparent 3039px, var(--traco) 3039px 3061px, transparent 3061px) right 34px top 0 / 2px 4400px repeat-y,

    /* O círculo central: um anel, a linha do meio do campo e o ponto do pontapé inicial */
    radial-gradient(circle at 50% 1180px, transparent calc(var(--raio-do-centro) - 4px), var(--traco) calc(var(--raio-do-centro) - 3px), var(--traco) var(--raio-do-centro), transparent calc(var(--raio-do-centro) + 1px)) 0 0 / 100% 4400px repeat-y,
    linear-gradient(to bottom, transparent 1178px, var(--traco) 1178px 1181px, transparent 1181px) 0 0 / 100% 4400px repeat-y,
    radial-gradient(circle at 50% 1180px, var(--traco) 6px, transparent 7px) 0 0 / 100% 4400px repeat-y,

    /* A grande área: a linha de fundo, os dois lados, a linha da frente, a marca do pênalti... */
    linear-gradient(to bottom, transparent 1999px, var(--traco) 1999px 2002px, transparent 2002px) 0 0 / 100% 4400px repeat-y,
    linear-gradient(to bottom, transparent 1999px, var(--traco) 1999px 2332px, transparent 2332px) 27% 0 / 3px 4400px repeat-y,
    linear-gradient(to bottom, transparent 1999px, var(--traco) 1999px 2332px, transparent 2332px) 73% 0 / 3px 4400px repeat-y,
    linear-gradient(to bottom, transparent 2329px, var(--traco) 2329px 2332px, transparent 2332px) center top / 46% 4400px repeat-y,
    radial-gradient(circle at 50% 2220px, var(--traco) 6px, transparent 7px) 0 0 / 100% 4400px repeat-y,
    /* ...e a meia-lua. O anel tem o centro na marca do pênalti, mas esta camada
       só começa na linha da frente da área: o que ficaria dentro da área não aparece. */
    radial-gradient(circle at 50% -112px, transparent calc(var(--raio-da-meia-lua) - 4px), var(--traco) calc(var(--raio-da-meia-lua) - 3px), var(--traco) var(--raio-da-meia-lua), transparent calc(var(--raio-da-meia-lua) + 1px)) 0 2332px / 100% 4400px repeat-y,

    /* Os cantos: outra linha de fundo e os dois quartos de círculo do escanteio.
       Esta camada termina na linha: só aparece a metade de cima de cada anel. */
    linear-gradient(to bottom, transparent 3399px, var(--traco) 3399px 3402px, transparent 3402px) 0 0 / 100% 4400px repeat-y,
    radial-gradient(circle at 0 100%, transparent 66px, var(--traco) 67px, var(--traco) 70px, transparent 71px) 0 -1000px / 100% 4400px repeat-y,
    radial-gradient(circle at 100% 100%, transparent 66px, var(--traco) 67px, var(--traco) 70px, transparent 71px) 0 -1000px / 100% 4400px repeat-y,

    /* Os papéis e as passagens em retícula */
    var(--fundo-papeis) 0 0 / 16px 4400px repeat;
}
````

### css/componentes.css

````css
/* ==========================================================================
   componentes.css
   --------------------------------------------------------------------------
   As peças que se repetem pelo site: botão, etiqueta, cartão, vaga,
   figurinha (parada e que vira), barra de progresso, abas, tira de grupos,
   cartela, conquista, recado, pacotinho e campo de formulário.

   Regra dos cantos (vem de tokens.css):
   - canto vivo  = o que está impresso na página (vaga, tira)
   - 4 px        = ferramenta (botão, campo)
   - 10 px       = o que se cola (figurinha, cartão de papel, cupom)
   Linha tracejada sempre quer dizer picote: "dá para destacar".
   ========================================================================== */

/* ---------- Botão ---------- */

.botao {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--espaco-2);
  min-height: 2.75rem;   /* 44 px */
  padding: 0 var(--espaco-5);
  background: var(--cor-acao);
  color: var(--cor-sobre-acao);
  border: 2px solid var(--cor-acao);
  border-radius: var(--raio-ferramenta);
  font-family: var(--fonte-leitura);
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.2;
  text-decoration: none;
  cursor: pointer;
}

.botao:hover {
  background: var(--cor-acao-forte);
  border-color: var(--cor-acao-forte);
  color: var(--cor-sobre-acao);
}

/* O botão "afunda" um pouco ao ser apertado: resposta ao toque */
.botao:active {
  transform: translateY(1px);
}

/* Botão secundário: só o contorno, na cor da tinta */
.botao-contorno {
  background: transparent;
  color: var(--cor-texto);
  border-color: var(--cor-texto);
}

.botao-contorno:hover {
  background: var(--cor-texto);
  color: var(--cor-fundo);
  border-color: var(--cor-texto);
}

/* Botão desligado: continua legível, mas com cara de "agora não" */
.botao[disabled],
.botao[aria-disabled="true"] {
  background: var(--cor-vaga);
  color: var(--cor-texto-secundario);
  border-color: var(--cor-borda);
  cursor: not-allowed;
}

/* Botão menor, para caber dentro da vaga e embaixo da figurinha.
   A altura continua 44 px: só o texto e as laterais diminuem. */
.botao-pequeno {
  padding: 0 var(--espaco-3);
  font-size: var(--texto-pequeno);
}

/* ---------- Etiqueta ----------
   O negativo da tinta: destaca "Nova" e "Repetida" sem trazer cor nova. */

.etiqueta {
  display: inline-block;
  padding: 0.1em 0.55em;
  background: var(--cor-etiqueta-fundo);
  color: var(--cor-etiqueta-texto);
  border-radius: 3px;
  font-size: var(--texto-pequeno);
  font-weight: 700;
  line-height: 1.4;
}

/* ---------- Cartão ----------
   Um papel solto em cima da página: mais claro que o fundo e com canto de 10 px. */

.cartao {
  background: var(--cor-superficie);
  color: var(--cor-texto);
  border: 1.5px solid var(--cor-borda);
  border-radius: var(--raio-adesivo);
  padding: var(--espaco-5);
}

.cartao > * + * {
  margin-top: var(--espaco-3);
}

/* Cupom: um cartão com canhoto. A linha tracejada é o picote. */
.cupom-canhoto {
  margin-top: var(--espaco-4);
  padding-top: var(--espaco-4);
  border-top: 2px dashed var(--cor-borda);
}

/* ---------- Vaga ----------
   O espaço vazio do álbum, impresso na página: canto vivo e número grande. */

.vaga {
  aspect-ratio: 3 / 4;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--espaco-1);
  background: var(--cor-vaga);
  color: var(--cor-texto-secundario);
  padding: var(--espaco-2);
  border: 2px solid var(--cor-borda);
  border-radius: var(--raio-impresso);
  text-align: center;
}

.vaga-numero {
  font-family: var(--fonte-destaque);
  font-weight: 300;
  font-size: 2.25rem;
  line-height: 1;
}

.vaga-legenda {
  font-size: var(--texto-pequeno);
  font-weight: 600;
}

/* O nome de quem vai ali, impresso na página como nos álbuns de papel */
.vaga-nome {
  color: var(--cor-texto);
  font-size: var(--texto-pequeno);
  font-weight: 700;
  line-height: 1.2;
}

/* A figurinha desta vaga já saiu e está na mão: moldura mais grossa e botão "Colar" */
.vaga-na-mao {
  border-width: 4px;
  border-color: var(--cor-texto);
}

/* Enquanto uma figurinha é arrastada, a vaga dela fica marcada... */
.casa-alvo .vaga {
  outline: 3px solid var(--cor-acao);
  outline-offset: 3px;
}

/* ...e clareia quando a figurinha passa por cima */
.casa-em-cima .vaga {
  background: var(--cor-superficie);
}

/* ---------- Figurinha ----------
   Um adesivo: canto de 10 px e moldura do próprio papel.
   A cor da moldura já diz a raridade: branca (comum), prata (brilhante), ouro (lendária).
   Mesmo assim a raridade vem SEMPRE escrita, com um ícone e uma textura:
   nunca depende só da cor.

   As cores da seleção entram por variáveis no HTML:
     style="--campo: #1E7B4F; --camisa: #F7D417; --numero: #14204F"
   Nenhum texto é escrito em cima dessas cores, só na tarja. */

.figurinha {
  position: relative;
  aspect-ratio: 3 / 4;
  display: flex;
  flex-direction: column;
  padding: 6px;
  background: var(--material, var(--cor-figurinha-papel));
  color: var(--cor-figurinha-tinta);
  border-radius: var(--raio-adesivo);
  box-shadow: var(--sombra-colada);
  transform: rotate(var(--giro, 0deg));   /* colada à mão: levemente torta */
}

/* Figurinha na mão, ainda não colada: sem sombra e mais torta */
.figurinha-solta {
  box-shadow: 0 0 0 1.5px var(--cor-borda);
}

.figurinha-arte {
  position: relative;
  flex: 1;
  min-height: 0;
  overflow: hidden;
  background: var(--campo, #8A8FB0);
  border-radius: 6px 6px 0 0;
}

/* Retícula: os pontinhos de impressão que fazem a sombra do retrato.
   São bolinhas desenhadas com gradiente, mais fortes embaixo. */
.figurinha-arte::after {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(circle, rgba(20, 32, 79, 0.45) 1px, transparent 1.4px) 0 0 / 5px 5px;
  -webkit-mask-image: linear-gradient(to top, #000, transparent 65%);
  mask-image: linear-gradient(to top, #000, transparent 65%);
}

/* O retrato é genérico: uma cabeça lisa e uma camisa com o número.
   Não é foto nem desenho de nenhuma pessoa. */
.figurinha-busto {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 88%;
}

.busto-cabeca {
  fill: var(--cor-figurinha-tinta);
}

.busto-camisa {
  fill: var(--camisa, #FFFFFF);
  stroke: var(--cor-figurinha-tinta);
  stroke-width: 1.5;
}

.busto-numero {
  fill: var(--numero, var(--cor-figurinha-tinta));
  font-family: var(--fonte-destaque);
  font-weight: 900;
  font-size: 15px;
}

/* Tarja: a faixa de baixo, onde fica o texto */
.figurinha-tarja {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1px;
  padding: 10px 4px 2px;
  font-size: 0.8125rem;
  line-height: 1.25;
}

/* A faixinha de textura no topo da tarja (o "acabamento" da figurinha) */
.figurinha-tarja::before {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 6px;
  background: var(--trama, transparent);
}

.figurinha-nome {
  font-weight: 600;
}

.figurinha-numero {
  color: var(--cor-figurinha-tinta);
  font-variant-numeric: tabular-nums;
}

/* Última linha da tarja: raridade de um lado, número do outro.
   Se não couberem lado a lado, o número desce para a linha de baixo. */
.figurinha-linha {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0 0.5em;
}

.figurinha-linha .figurinha-numero {
  font-size: 0.75rem;
  font-weight: 700;
}

/* Figurinha de bandeira: a bandeira no meio do retrato, com moldura de papel */
.figurinha-bandeira {
  position: absolute;
  inset: 0;
  margin: auto;
  width: 80%;
  border: 2px solid var(--cor-figurinha-papel);
  outline: 1px solid var(--cor-figurinha-tinta);
}

/* Comum: fosca, sem textura */
.figurinha-comum {
  --material: var(--cor-figurinha-papel);
}

/* Brilhante: laminada, com listras diagonais */
.figurinha-brilhante {
  --material: var(--cor-prata-clara);
  --trama: repeating-linear-gradient(115deg, var(--cor-prata) 0 4px, var(--cor-figurinha-tinta) 4px 6px);
}

/* Lendária: holográfica, com trama de losangos */
.figurinha-lendaria {
  --material: var(--cor-ouro);
  --trama:
    linear-gradient(45deg, transparent 42%, var(--cor-figurinha-tinta) 42% 58%, transparent 58%) 0 0 / 6px 6px,
    linear-gradient(-45deg, transparent 42%, var(--cor-figurinha-tinta) 42% 58%, transparent 58%) 0 0 / 6px 6px;
}

/* Reflexo parado sobre o retrato da brilhante e da lendária */
.figurinha-brilhante .figurinha-arte::before,
.figurinha-lendaria .figurinha-arte::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 1;
  background: linear-gradient(115deg, transparent 30%, rgba(255, 255, 255, 0.5) 45%, transparent 60%);
}

/* ---------- Lendária holográfica ----------
   O js/efeitos.js escreve na figurinha a posição do ponteiro (--px e --py, de
   0% a 100%) e a inclinação (--rx e --ry). Com isso a figurinha inclina e o
   brilho corre. Sem ponteiro em cima, fica só um brilho fraco e parado. */
.figurinha-lendaria {
  --px: 50%;
  --py: 50%;
  --brilho: 0.3;
}

/* A que não vira (na mão, nas amostras) */
.figurinha-lendaria:not(.figurinha-vira) {
  transform: perspective(42rem) rotate(var(--giro, 0deg)) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg));
  transition: transform 160ms ease-out;
}

/* A que vira (colada no álbum, saída do pacotinho): só inclina de frente */
.figurinha-vira.figurinha-lendaria[data-face="frente"] {
  transform: perspective(40rem) rotate(var(--giro, 0deg)) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg));
}

/* Duas camadas por cima da figurinha: o arco-íris (::after) e o reflexo
   branco que acompanha o ponteiro (::before). Os modos de mistura "overlay" e
   "soft-light" tingem as cores de baixo sem apagar o texto. */
.figurinha-lendaria::before,
.figurinha-lendaria::after {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 3;
  border-radius: inherit;
  pointer-events: none;
  transition: opacity 250ms ease-out;
  /* Na faixa de baixo fica o texto: ali o brilho cai para um terço da força,
     para o nome e a raridade continuarem fáceis de ler (contraste medido) */
  -webkit-mask-image: linear-gradient(to bottom, #000 58%, rgba(0, 0, 0, 0.33) 74%);
  mask-image: linear-gradient(to bottom, #000 58%, rgba(0, 0, 0, 0.33) 74%);
}

.figurinha-lendaria::after {
  background: var(--holografico) var(--px) var(--py) / 260% 260%;
  mix-blend-mode: overlay;
  opacity: calc(var(--brilho) * 0.8);
}

.figurinha-lendaria::before {
  background: radial-gradient(circle at var(--px) var(--py), rgba(255, 255, 255, 0.95), transparent 45%);
  mix-blend-mode: soft-light;
  opacity: var(--brilho);
}

/* De costas ou mostrando o verso, o brilho some: ali só há texto para ler.
   Nas cenas da página inicial em que as figurinhas são enfeite, também. */
.figurinha-lendaria[data-face="verso"]::before,
.figurinha-lendaria[data-face="verso"]::after,
.figurinha-lendaria[data-face="costas"]::before,
.figurinha-lendaria[data-face="costas"]::after,
.voo .figurinha-lendaria::before,
.voo .figurinha-lendaria::after,
.miolo .figurinha-lendaria::before,
.miolo .figurinha-lendaria::after {
  display: none;
}

/* Etiqueta presa na figurinha: usa a tinta e o papel da própria figurinha,
   porque a figurinha não muda de cor quando o tema muda. */
.figurinha .etiqueta {
  position: absolute;
  z-index: 2;
  top: -8px;
  right: -8px;
  background: var(--cor-figurinha-tinta);
  color: var(--cor-figurinha-papel);
  outline: 2px solid var(--cor-figurinha-papel);
}

.figurinha-selecao {
  font-size: 0.75rem;
}

/* ---------- Figurinha que vira ----------
   É um <button> com as faces uma em cima da outra (todas na mesma casa de uma
   grade). O atributo data-face diz qual aparece:
     frente = o retrato      verso = as informações      costas = ainda fechada

   O giro: a figurinha roda meia volta (180 graus) em torno do eixo vertical.
   Bem no meio do caminho, quando ela está de lado e não dá para ver nada,
   a face que aparece é trocada (a "visibility" muda com meio tempo de atraso).

   O verso é desenhado espelhado: como a figurinha inteira está virada ao
   contrário, o espelhado volta a ficar legível. */

.figurinha-vira {
  --tempo-de-virar: 420ms;
  --meia-volta: 180deg;
  display: grid;
  width: 100%;
  padding: 0;
  border: 0;
  text-align: left;
  cursor: pointer;
  transform: perspective(40rem) rotate(var(--giro, 0deg)) rotateY(0deg);
  /* "--tempo-do-movimento" só existe enquanto a lendária acompanha o ponteiro (mais abaixo) */
  transition: transform var(--tempo-do-movimento, var(--tempo-de-virar)) ease-in-out;
}

.figurinha-vira[data-face="verso"],
.figurinha-vira[data-face="costas"] {
  transform: perspective(40rem) rotate(var(--giro, 0deg)) rotateY(var(--meia-volta));
}

.figurinha-face {
  grid-area: 1 / 1;   /* todas as faces na mesma casa da grade: uma em cima da outra */
  position: relative;
  min-width: 0;
  display: flex;
  flex-direction: column;
  padding: 6px;
  border-radius: var(--raio-adesivo);
  visibility: hidden;
  transition: visibility 0s linear calc(var(--tempo-de-virar) / 2);
}

.figurinha-vira[data-face="frente"] .figurinha-frente,
.figurinha-vira[data-face="verso"] .figurinha-verso,
.figurinha-vira[data-face="costas"] .figurinha-costas {
  visibility: visible;
}

.figurinha-verso,
.figurinha-costas {
  transform: rotateY(var(--meia-volta));
}

/* Verso: número, nome, dois dados e a curiosidade */
.figurinha-verso {
  gap: 1px;
  padding: 9px 8px;
  font-size: 0.75rem;
  line-height: 1.25;
}

.verso-numero {
  font-weight: 800;
  font-variant-numeric: tabular-nums;
}

.verso-nome {
  font-size: 0.875rem;
  font-weight: 800;
  line-height: 1.15;
}

.verso-texto {
  margin-top: 4px;
  padding-top: 4px;
  border-top: 1.5px solid currentColor;
}

/* Costas: a figurinha que acabou de sair do pacotinho. Cobre a moldura inteira,
   para a cor da raridade não entregar a surpresa antes da hora. */
.figurinha-costas {
  align-items: center;
  justify-content: center;
  background-color: var(--cor-figurinha-tinta);
  background-image: radial-gradient(circle, rgba(255, 255, 255, 0.25) 1px, transparent 1.4px);
  background-size: 6px 6px;
  color: var(--cor-figurinha-papel);
}

.costas-marca {
  font-family: var(--fonte-destaque);
  font-weight: 900;
  font-size: 1.75rem;
  line-height: 1;
  rotate: -8deg;
}

/* Colar: a figurinha chega maior e mais torta e assenta no lugar.
   ("scale" e "rotate" são propriedades separadas do "transform",
   por isso não atrapalham o giro de virar.) */
.figurinha-colando {
  animation: bater 520ms cubic-bezier(0.3, 0.9, 0.4, 1) backwards;
}

/* A batida: a figurinha desce torta e maior, bate no lugar (55%), amassa de
   leve (70%) e volta ao tamanho. */
@keyframes bater {
  0% { translate: 0 -60%; rotate: -12deg; scale: 1.35; opacity: 0; box-shadow: none; }
  55% { translate: 0 0; rotate: 0deg; scale: 1; opacity: 1; }
  70% { scale: 1.07 0.92; }
  100% { scale: 1; }
}

/* A casa em que a figurinha acabou de bater: abre um anel de tinta em volta
   da figurinha e dá uma tremida. (A classe "bateu" é posta pelo js/album.js.) */
/* (".vagas > .casa.bateu" precisa ganhar da regra de entrar ao rolar, em paginas.css) */
.vagas > .casa.bateu {
  animation: tremer 260ms linear 280ms;
}

.casa.bateu::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  aspect-ratio: 3 / 4;   /* o mesmo formato da figurinha, que fica no topo da casa */
  border: 3px solid var(--cor-texto);
  border-radius: var(--raio-adesivo);
  pointer-events: none;
  opacity: 0;
  animation: anel 560ms ease-out 280ms;
}

@keyframes anel {
  from { scale: 0.9; opacity: 0.8; }
  to { scale: 1.18; opacity: 0; }
}

@keyframes tremer {
  20% { translate: -2px 1px; }
  45% { translate: 2px -1px; }
  70% { translate: -1px 0; }
}

/* Revelar: o reflexo passa uma vez pela brilhante e pela lendária,
   e a lendária dá um pulinho. */
.figurinha-revelada .figurinha-arte::before {
  animation: reflexo 800ms ease-out 250ms backwards;
}

.figurinha-lendaria.figurinha-revelada {
  animation: pulo 520ms ease-out 300ms;
}

@keyframes reflexo {
  from { transform: translateX(-130%); }
}

@keyframes pulo {
  40% { scale: 1.08; }
}

/* ---------- Raridade: palavra + ícone ---------- */

.raridade {
  display: inline-flex;
  align-items: center;
  gap: 0.35em;
  font-size: 0.75rem;
  font-weight: 700;
}

.raridade-icone {
  flex: none;
  width: 0.75em;
  height: 0.75em;
  background: currentColor;
}

.raridade-icone-circulo {
  border-radius: 50%;
}

.raridade-icone-losango {
  transform: rotate(45deg) scale(0.85);
}

/* Estrela de cinco pontas, recortada com clip-path (uma lista de pontos x y) */
.raridade-icone-estrela {
  width: 1em;
  height: 1em;
  clip-path: polygon(50% 0, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
}

/* ---------- Tira de grupos ----------
   12 casas, uma por grupo (A a L). O preenchimento sobe conforme o grupo
   enche: a variável --parte vai de 0 (vazio) a 1 (completo). */

.tira {
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: var(--espaco-2);
}

.tira-casa {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--espaco-1);
  font-size: var(--texto-pequeno);
  font-weight: 700;
}

.tira-quadro {
  width: 100%;
  aspect-ratio: 1;
  border: 2px solid var(--cor-borda);
  background: linear-gradient(to top, var(--cor-texto) calc(var(--parte, 0) * 100%), var(--cor-vaga) 0);
}

@media (min-width: 40rem) {
  .tira {
    grid-template-columns: repeat(12, minmax(0, 1fr));
  }
}

/* ---------- Passos numerados ----------
   Só para o que é sequência de verdade (primeiro isto, depois aquilo). */

.passos {
  list-style: none;
  padding: 0;
  display: grid;
  gap: var(--espaco-5);
  counter-reset: passo;
}

.passos > li {
  counter-increment: passo;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr;   /* o título fica colado no texto; a sobra de altura vai para baixo */
  column-gap: var(--espaco-3);
  align-items: start;
}

.passos > li::before {
  content: counter(passo);
  grid-row: span 2;
  font-family: var(--fonte-destaque);
  font-weight: 900;
  font-size: 3.5rem;
  line-height: 0.85;
}

.passos h3 {
  font-size: var(--titulo-3);
}

@media (min-width: 48rem) {
  .passos {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* ---------- Campo de formulário ---------- */

.campo {
  display: flex;
  flex-direction: column;
  gap: var(--espaco-1);
  max-width: 28rem;
}

.campo-rotulo {
  font-weight: 700;
}

.campo-dica {
  color: var(--cor-texto-secundario);
  font-size: var(--texto-pequeno);
}

.campo-entrada {
  width: 100%;
  min-height: 2.75rem;
  padding: var(--espaco-2) var(--espaco-3);
  background: var(--cor-superficie);
  color: var(--cor-texto);
  border: 2px solid var(--cor-borda);
  border-radius: var(--raio-ferramenta);
}

textarea.campo-entrada {
  min-height: 8rem;
  resize: vertical;
}

/* Campo com erro: a borda engrossa e muda de cor, e a mensagem vem com ícone e texto */
.campo-entrada[aria-invalid="true"] {
  border-width: 3px;
  border-color: var(--cor-erro);
}

.campo-erro {
  display: flex;
  align-items: flex-start;
  gap: var(--espaco-2);
  color: var(--cor-erro);
  font-size: var(--texto-pequeno);
  font-weight: 600;
}

.campo-erro svg {
  flex: none;
  margin-top: 0.1em;
}

/* O "x" desenhado dentro do ícone de cartão usa a cor do papel */
.campo-erro .cartao-x {
  stroke: var(--cor-superficie);
}

/* Formulário: os campos empilhados, com o mesmo espaço entre eles */
.formulario {
  display: grid;
  gap: var(--espaco-4);
  max-width: 28rem;
}

/* O botão "Mostrar senha" fica embaixo do campo, do tamanho do próprio texto */
.campo > .botao {
  align-self: start;
}

/* Título de segundo nível em tamanho menor, para dentro de cartões e formulários */
.titulo-menor {
  font-size: var(--titulo-3);
  line-height: 1.1;
}

/* Botão com cara de link: para ações pequenas no meio de uma frase */
.botao-link {
  min-height: 2.75rem;
  padding: 0 var(--espaco-1);
  background: none;
  color: var(--cor-acao);
  border: 0;
  font-weight: 700;
  text-decoration: underline;
  text-underline-offset: 0.18em;
  cursor: pointer;
}

.botao-link:hover {
  color: var(--cor-acao-forte);
  text-decoration-thickness: 0.16em;
}

/* Resumo dos erros: aparece no topo do formulário quando o envio falha */
.resumo-erros {
  max-width: 28rem;
  padding: var(--espaco-4);
  background: var(--cor-superficie);
  border: 3px solid var(--cor-erro);
  border-radius: var(--raio-ferramenta);
}

.resumo-erros h2 {
  color: var(--cor-erro);
}

.resumo-erros ul {
  margin-top: var(--espaco-2);
  padding-left: 1.2em;
}

.resumo-erros a {
  display: inline-block;
  padding-block: var(--espaco-1);
}

/* Recado de "deu certo". A caixa existe sempre (o leitor de tela precisa dela
   pronta para ler o texto quando ele chegar), mas só ganha moldura quando tem texto. */
.aviso-sucesso:empty {
  margin: 0;
}

.aviso-sucesso:not(:empty) {
  max-width: 28rem;
  padding: var(--espaco-3) var(--espaco-4);
  background: var(--cor-superficie);
  border: 2px solid var(--cor-sucesso);
  border-left-width: 8px;
  border-radius: var(--raio-ferramenta);
  font-weight: 600;
}

/* Caixas de marcar e de escolher: maiores e na cor da ação */
.opcao {
  display: flex;
  align-items: center;
  gap: var(--espaco-3);
  min-height: 2.75rem;
  cursor: pointer;
}

.opcao input {
  flex: none;
  width: 1.375rem;
  height: 1.375rem;
  margin: 0;
  accent-color: var(--cor-acao);
  cursor: pointer;
}

/* ---------- Barra de progresso ----------
   Impressa na página (canto vivo). A variável --parte vai de 0 a 1.
   O número sempre vem escrito ao lado: a barra é só o desenho. */

.barra {
  height: 0.875rem;
  max-width: 28rem;
  background: var(--cor-vaga);
  border: 2px solid var(--cor-borda);
}

.barra-cheia {
  display: block;
  height: 100%;
  width: calc(var(--parte, 0) * 100%);
  background: var(--cor-texto);
  transition: width var(--duracao) ease-out;
}

/* ---------- Abas ----------
   Escolhem quais figurinhas aparecem. A aba escolhida fica no negativo da
   tinta, mais pesada e sublinhada: não depende só da cor. */

.abas {
  display: flex;
  flex-wrap: wrap;
  gap: var(--espaco-2);
}

.aba {
  min-height: 2.75rem;
  padding: 0 var(--espaco-4);
  background: transparent;
  color: var(--cor-texto);
  border: 2px solid var(--cor-texto);
  border-radius: var(--raio-ferramenta);
  font-weight: 600;
  cursor: pointer;
}

.aba[aria-selected="true"] {
  background: var(--cor-texto);
  color: var(--cor-fundo);
  font-weight: 800;
  text-decoration: underline;
  text-decoration-thickness: 3px;
  text-underline-offset: 5px;
}

.aba-conta {
  margin-left: 0.3em;
  font-variant-numeric: tabular-nums;
}

/* ---------- Conquista ----------
   Um quadro impresso na página. Quando a conquista é feita, ganha um carimbo:
   posto à mão, por isso levemente torto. */

.conquistas {
  list-style: none;
  padding: 0;
  display: grid;
  gap: var(--espaco-3);
}

.conquista {
  display: grid;
  gap: var(--espaco-1);
  align-content: start;
  padding: var(--espaco-4);
  border: 2px solid var(--cor-borda);
}

.conquista-nome {
  font-size: var(--texto-medio);
  font-weight: 800;
  line-height: 1.2;
}

.conquista-como {
  color: var(--cor-texto-secundario);
  font-size: var(--texto-pequeno);
}

.conquista-estado {
  justify-self: start;
  margin-top: var(--espaco-2);
  font-size: var(--texto-pequeno);
  font-weight: 700;
}

.conquista-feita .conquista-estado {
  padding: 0.15em 0.6em;
  color: var(--cor-sucesso);
  border: 2px solid var(--cor-sucesso);
  rotate: -3deg;
}

/* Conquista que acabou de sair: o carimbo só aparece quando o quadro entra na
   tela, e aí bate com força (as classes são postas pelo js/album.js) */
.conquista-nova:not(.conquista-carimbando) .conquista-estado {
  opacity: 0;
}

.conquista-carimbando {
  animation: tremer 240ms linear 230ms;
}

.conquista-carimbando .conquista-estado {
  animation: carimbar 420ms cubic-bezier(0.3, 0.8, 0.4, 1) backwards;
}

/* O carimbo chega grande, torto e transparente e encolhe até o tamanho certo */
@keyframes carimbar {
  0% { scale: 2.8; opacity: 0; rotate: -20deg; }
  60% { scale: 0.92; opacity: 1; rotate: -7deg; }
  80% { scale: 1.06; }
  100% { scale: 1; }
}

@media (min-width: 40rem) {
  .conquistas {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 64rem) {
  .conquistas {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

/* ---------- Recado ----------
   Aviso preso no pé da tela depois de colar: confirma o que aconteceu e
   oferece "Desfazer". Não some sozinho: fica até a próxima ação ou até fechar. */

.recado {
  position: fixed;
  left: var(--espaco-3);
  right: var(--espaco-3);
  bottom: var(--espaco-3);
  z-index: 20;
  max-width: 36rem;
  margin-inline: auto;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--espaco-2) var(--espaco-3);
  padding: var(--espaco-3) var(--espaco-4);
  background: var(--cor-etiqueta-fundo);
  color: var(--cor-etiqueta-texto);
  border: 2px solid var(--cor-etiqueta-texto);
  border-radius: var(--raio-ferramenta);
}

.recado-texto {
  flex: 1 1 14rem;
  font-weight: 600;
}

.recado-botao {
  min-height: 2.75rem;
  padding: 0 var(--espaco-3);
  background: transparent;
  color: inherit;
  border: 2px solid currentColor;
  border-radius: var(--raio-ferramenta);
  font-weight: 700;
  cursor: pointer;
}

/* ---------- Pacotinho ----------
   O envelope fechado. É uma peça só de desenho: quem abre é o botão
   "Rasgar o pacotinho". A linha tracejada é o picote, e a parte de cima
   (a aba) é a que sai quando rasga. */

.pacotinho {
  width: min(15rem, 72%);
  aspect-ratio: 5 / 7;
  display: flex;
  flex-direction: column;
  color: var(--cor-etiqueta-texto);
  rotate: -3deg;   /* posto à mão em cima da página */
  cursor: pointer;
}

.pacotinho-aba,
.pacotinho-corpo {
  position: relative;
  background: var(--cor-etiqueta-fundo);
}

/* Retícula do pacotinho: pontinhos na cor do texto, bem fracos (30% de opacidade) */
.pacotinho-aba::before,
.pacotinho-corpo::before {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(circle, currentColor 0.8px, transparent 1.2px) 0 0 / 7px 7px;
  opacity: 0.3;
}

.pacotinho-aba {
  flex: none;
  height: 14%;
  display: grid;
  place-items: center;
  border-radius: var(--raio-adesivo) var(--raio-adesivo) 0 0;
  border-bottom: 2px dashed var(--cor-etiqueta-texto);
}

/* Os textos ficam em cima de uma faixa lisa, para os pontinhos não atrapalharem a leitura */
.pacotinho-aba span,
.pacotinho-marca,
.pacotinho-texto {
  position: relative;   /* fica na frente dos pontinhos */
  padding: 0 0.4em;
  background: var(--cor-etiqueta-fundo);
}

.pacotinho-aba span {
  font-size: var(--texto-pequeno);
  font-weight: 700;
}

.pacotinho-corpo {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--espaco-3);
  border-radius: 0 0 var(--raio-adesivo) var(--raio-adesivo);
}

.pacotinho-marca {
  font-family: var(--fonte-destaque);
  font-weight: 900;
  font-size: 3.25rem;
  line-height: 1.05;
  rotate: -6deg;
}

.pacotinho-texto {
  font-weight: 700;
}

/* Pacotinho 3D ao vivo (página Pacotinhos, js/pacotinho-3d.js). A tela de desenho
   entra dentro do pacotinho de CSS, que fica só como molde: guarda o tamanho,
   o lugar e o clique. A tela é maior que o molde, para o pacotinho poder
   inclinar e a aba ter para onde voar. */
.pacotinho-com-3d {
  position: relative;
}

.pacotinho-com-3d > .pacotinho-aba,
.pacotinho-com-3d > .pacotinho-corpo {
  visibility: hidden;
}

.pacotinho-vivo {
  position: absolute;
  left: -30%;
  top: -25%;
  width: 160%;
  height: 150%;
  pointer-events: none;   /* o clique e o ponteiro passam direto para o molde */
}

/* Rasgar: a aba sai voando pelo picote e o corpo do pacotinho escorrega para baixo.
   Este é o único momento "ensaiado" do site. */
/* Antes de rasgar, o pacotinho balança quando o ponteiro passa por cima */
.palco .pacotinho:hover:not(.pacotinho-rasgando) {
  animation: balancar 700ms ease-in-out;
}

@keyframes balancar {
  0%, 100% { rotate: -3deg; }
  30% { rotate: -7deg; }
  70% { rotate: 1deg; }
}

/* O brilho de papel laminado que atravessa o pacotinho de CSS */
.pacotinho-corpo {
  overflow: hidden;
}

.pacotinho-corpo::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(110deg, transparent 35%, rgba(255, 255, 255, 0.45) 50%, transparent 65%);
  translate: -120% 0;
}

.palco .pacotinho:hover .pacotinho-corpo::after,
.pacotinho-rasgando .pacotinho-corpo::after {
  animation: laminado 900ms ease-out;
}

@keyframes laminado {
  to { translate: 120% 0; }
}

/* Rasgado: a borda do picote vira dente de serra. "clip-path" recorta a forma
   por uma lista de pontos: sobe, desce, sobe, desce. */
.pacotinho-rasgando .pacotinho-aba {
  border-bottom-color: transparent;
  clip-path: polygon(0 0, 100% 0, 100% 78%, 92% 100%, 84% 78%, 76% 100%, 68% 78%, 60% 100%, 52% 78%, 44% 100%, 36% 78%, 28% 100%, 20% 78%, 12% 100%, 4% 78%, 0 100%);
  animation: rasgar 520ms ease-in forwards;
}

.pacotinho-rasgando .pacotinho-corpo {
  clip-path: polygon(0 7px, 4% 0, 12% 7px, 20% 0, 28% 7px, 36% 0, 44% 7px, 52% 0, 60% 7px, 68% 0, 76% 7px, 84% 0, 92% 7px, 100% 0, 100% 100%, 0 100%);
  animation: esvaziar 360ms ease-in 440ms forwards;
}

@keyframes rasgar {
  30% { transform: translateX(-5%) rotate(-5deg); }
  to { transform: translate(65%, -170%) rotate(40deg); opacity: 0; }
}

@keyframes esvaziar {
  to { transform: translateY(16%); opacity: 0; }
}

/* As figurinhas saem do pacotinho em leque. Todas partem do mesmo ponto (a
   distância até ele vem em --dx e --dy, postas pelo js/pacotinho.js), abrem
   como um leque de cartas (40%) e depois cada uma vai para a sua casa.
   --ordem (0 a 4) dá o ângulo de cada uma no leque e o pequeno atraso. */
.mesa > li {
  animation: sair-em-leque 720ms cubic-bezier(0.2, 0.8, 0.3, 1.1) backwards;
  animation-delay: calc(var(--ordem, 0) * 90ms);
}

@keyframes sair-em-leque {
  0% {
    opacity: 0;
    translate: var(--dx, 0px) var(--dy, 0px);
    rotate: 0deg;
    scale: 0.5;
  }
  40% {
    opacity: 1;
    translate: calc(var(--dx, 0px) + (var(--ordem, 0) - 2) * 1.5rem) calc(var(--dy, 0px) - 0.5rem);
    rotate: calc((var(--ordem, 0) - 2) * 12deg);
    scale: 0.62;
  }
}

/* ---------- Foto em uma tinta só ----------
   O arquivo da foto é colorido. Aqui ela é mostrada como se tivesse sido
   impressa com a tinta da página, em três passos:
     1. a foto vira preto e branco (filter: grayscale);
     2. uma camada na cor da sombra, misturada no modo "screen", tinge as
        partes escuras e deixa as claras brancas;
     3. uma camada na cor da luz, no modo "multiply", tinge as partes claras.
   Pense em duas folhas de celofane colorido em cima de uma foto em preto e branco. */

.foto {
  position: relative;
  overflow: hidden;
  isolation: isolate;   /* as misturas de cor valem só aqui dentro */
  aspect-ratio: 16 / 10;
  background: var(--cor-foto-luz);
  border: 2px solid var(--cor-texto);
}

.foto img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;   /* a foto preenche a moldura, cortando a sobra */
  filter: grayscale(1) contrast(1.15);
}

.foto::before,
.foto::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.foto::before {
  background: var(--cor-foto-sombra);
  mix-blend-mode: screen;
}

.foto::after {
  background: var(--cor-foto-luz);
  mix-blend-mode: multiply;
}

/* ---------- Carrossel ----------
   Uma sede por vez. Os botões e os números ficam embaixo da foto. */

.carrossel-cidade {
  font-size: var(--titulo-2);
}

.carrossel-estadio {
  font-size: var(--texto-medio);
  font-weight: 700;
}

.carrossel-dados dt {
  font-weight: 700;
}

.carrossel-dados dd + dt {
  margin-top: var(--espaco-3);
}

.carrossel-dados dd {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0 var(--espaco-2);
}

.carrossel-dados .bandeirinha {
  width: 2rem;
}

.carrossel-figura figcaption {
  margin-top: var(--espaco-2);
}

.carrossel-controles {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--espaco-3);
}

.carrossel-posicao {
  flex: 1 1 8rem;
  max-width: none;
  font-weight: 700;
  text-align: center;
}

.carrossel-indicadores {
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: var(--espaco-2);
}

/* Indicador: um quadro numerado, impresso como as casas da tira de grupos.
   O da sede atual fica no negativo da tinta e sublinhado. */
.carrossel-numero {
  width: 2.75rem;
  height: 2.75rem;
  background: transparent;
  color: var(--cor-texto);
  border: 2px solid var(--cor-borda);
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  cursor: pointer;
}

.carrossel-numero[aria-current="true"] {
  background: var(--cor-texto);
  color: var(--cor-fundo);
  border-color: var(--cor-texto);
  text-decoration: underline;
  text-decoration-thickness: 3px;
  text-underline-offset: 4px;
}

/* ---------- Placar girando ----------
   Cada casa do número é uma janelinha com a altura de uma linha, que mostra
   uma fita com os algarismos de 0 a 9, um embaixo do outro. "--digito" (posto
   pelo js/album.js) diz quantos degraus a fita sobe. */

.odometro {
  display: inline-flex;
  overflow: hidden;
  line-height: 1;
}

.odo-casa {
  display: block;
  height: 1em;
  overflow: hidden;
}

.odo-fita {
  display: grid;
  transform: translateY(calc(var(--digito, 0) * -1em));
  transition: transform 1100ms cubic-bezier(0.2, 0.8, 0.2, 1);
}

.odo-fita span {
  height: 1em;
}

/* ---------- Traço que se desenha ----------
   As linhas de um campo de futebol. Cada linha "mede 1" (pathLength="1" no
   HTML) e é tracejada com um traço de tamanho 1: escondendo o traço inteiro
   (stroke-dashoffset: 1) a linha some; trazendo de volta aos poucos, ela se
   desenha como uma caneta percorrendo o papel. */

.campo-tracado {
  display: block;
  width: min(100%, 20rem);
  fill: none;
  stroke: var(--cor-texto);
  stroke-width: 3;
  stroke-linecap: round;
}

.campo-tracado * {
  stroke-dasharray: 1;
  stroke-dashoffset: var(--falta, 0);   /* a página inicial manda "--falta" pela rolagem */
}

/* Antes de aparecer na tela (página do álbum), as linhas ficam escondidas */
.campo-tracado.por-desenhar * {
  stroke-dashoffset: 1;
}

.campo-tracado.desenhando * {
  animation: desenhar-campo 1500ms ease-in-out backwards;
}

.campo-tracado.desenhando :nth-child(n + 4) { animation-delay: 500ms; }
.campo-tracado.desenhando :nth-child(n + 7) { animation-delay: 900ms; }

@keyframes desenhar-campo {
  from { stroke-dashoffset: 1; }
}
````

### css/paginas.css

````css
/* ==========================================================================
   paginas.css
   --------------------------------------------------------------------------
   O que é próprio de cada página. As peças que se repetem pelo site ficam em
   componentes.css; aqui fica só a arrumação de cada tela.
   ========================================================================== */

/* ---------- Início ---------- */

/* O primeiro parágrafo de cada página, um pouco maior que o texto comum */
.abertura-texto {
  font-size: var(--texto-medio);
}

/* Raridades: no celular, figurinha à esquerda e texto à direita;
   em telas maiores, as três lado a lado */
.raridades {
  list-style: none;
  padding: 0;
  display: grid;
  gap: var(--espaco-5);
}

.raridades > li {
  display: grid;
  /* A figurinha ocupa cerca de um terço (entre 5rem e 7rem); o texto fica com o resto.
     O minmax(0, 1fr) deixa a coluna do texto encolher em telas estreitas. */
  grid-template-columns: clamp(5rem, 32%, 7rem) minmax(0, 1fr);
  gap: var(--espaco-4);
  align-items: center;
}

.raridades h3 {
  font-size: 1.5rem;
}

@media (min-width: 40rem) {
  .raridades {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .raridades > li {
    grid-template-columns: 1fr;
    align-items: start;
  }

  .raridades .figurinha {
    max-width: 10rem;
  }
}

/* Cartela da sequência: sete casas impressas, uma por dia */
.cartela {
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  gap: var(--espaco-2);
  max-width: 22rem;
}

.cartela > li {
  aspect-ratio: 1;
  display: grid;
  place-items: center;
  border: 2px solid var(--cor-borda);
  color: var(--cor-texto-secundario);
  font-size: var(--texto-pequeno);
  font-weight: 700;
}

/* Bilhete de troca: duas linhas, "Tenho" e "Preciso" */
.bilhete {
  max-width: 26rem;
}

.bilhete dl {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: var(--espaco-2) var(--espaco-4);
}

.bilhete dt {
  font-weight: 700;
}

.bilhete dd {
  font-variant-numeric: tabular-nums;   /* números com a mesma largura, alinhados */
}

/* Dia carimbado na cartela: um círculo de tinta em volta do número,
   posto à mão (por isso torto). O formato muda, não só a cor. */
.cartela > li.carimbado .cartela-dia {
  display: grid;
  place-items: center;
  width: 82%;
  aspect-ratio: 1;
  background: var(--cor-texto);
  color: var(--cor-fundo);
  border-radius: 50%;
  rotate: -8deg;
}

/* ---------- Álbum ---------- */

/* O recado fica preso no pé da tela. Esta folga faz o navegador parar a
   rolagem um pouco antes, para o recado nunca cobrir o que está em foco. */
html {
  scroll-padding-bottom: 10rem;
}

/* Enquanto o recado está na tela, a página ganha um espaço a mais no fim.
   Sem ele, os últimos links do rodapé não teriam para onde subir e ficariam
   embaixo do recado. (A classe é posta e tirada pelo js/album.js.) */
.com-recado {
  padding-bottom: 10rem;
}

.album-topo {
  padding-bottom: var(--espaco-6);
}

/* Placar: o número de coladas bem grande, na fonte de destaque */
.placar {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0 var(--espaco-3);
  font-size: var(--texto-medio);
  font-weight: 600;
}

.placar-numero {
  font-family: var(--fonte-destaque);
  font-weight: 900;
  font-size: 5rem;
  line-height: 0.9;
}

/* Índice dos grupos: a tira de 12 casas, cada casa é um link para o grupo */
.tira-indice a {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--espaco-1);
  width: 100%;
  color: var(--cor-texto);
}

.tira-indice a:hover .tira-quadro {
  border-color: var(--cor-acao);
  border-width: 3px;
}

/* Como terminou: a seleção campeã em destaque e os quatro primeiros em lista */
.final-campea {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--espaco-2) var(--espaco-3);
  font-family: var(--fonte-destaque);
  font-weight: 900;
  font-size: var(--titulo-3);
  line-height: 1.1;
}

.podio {
  list-style: none;
  padding: 0;
  display: grid;
  gap: var(--espaco-2);
}

.podio > li {
  display: flex;
  align-items: center;
  gap: var(--espaco-3);
  font-weight: 700;
}

.podio-lugar {
  min-width: 2ch;
  font-family: var(--fonte-destaque);
  font-weight: 900;
  font-size: var(--titulo-3);
  line-height: 1;
}

.podio .bandeirinha {
  width: 2.25rem;
}

/* Bandeja: as figurinhas na mão, cada uma com o seu botão "Colar" embaixo */
.bandeja {
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(6.75rem, 1fr));
  gap: var(--espaco-5) var(--espaco-4);
}

.bandeja > li {
  display: grid;
  gap: var(--espaco-3);
  align-content: start;
}

.bandeja .figurinha {
  cursor: grab;   /* a mãozinha avisa que dá para arrastar */
}

/* Filtros: dois por linha no celular, os quatro lado a lado em telas maiores */
.filtros {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--espaco-3);
  max-width: 44rem;
}

@media (min-width: 48rem) {
  .filtros {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

.resultado {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--espaco-2) var(--espaco-4);
  font-weight: 700;
}

/* Grupo: o título e a conta de coladas na mesma linha */
.grupo-cabeca {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: var(--espaco-1) var(--espaco-4);
  padding-block: var(--espaco-5) var(--espaco-4);
  border-top: 2px solid var(--cor-texto);
}

.grupo-conta {
  font-weight: 700;
}

/* Seleção: uma página dupla, com a ficha de um lado e as casas do outro */
.selecao {
  padding-block: var(--espaco-6);
  border-top: 2px solid var(--cor-texto);
}

.selecao-titulo {
  display: flex;
  align-items: center;
  gap: var(--espaco-3);
  font-size: var(--titulo-2);
}

.bandeirinha {
  flex: none;
  width: 3rem;
  height: auto;
  border: 1.5px solid var(--cor-texto);
}

.selecao-conta {
  font-weight: 700;
}

.selecao-dados dt {
  font-weight: 700;
}

.selecao-dados dd + dt {
  margin-top: var(--espaco-3);
}

/* As casas: duas colunas no celular e três quando há largura.
   Entre 48rem e 64rem a página já é dupla e a metade direita ainda é
   estreita, então voltam a ser duas. */
.vagas {
  list-style: none;
  padding: 0;
  /* A figurinha que acabou de ser colada chega maior e torta, e passaria da
     beirada da tela. "overflow-x: clip" corta essa sobra sem criar barra de
     rolagem. A margem negativa com o mesmo tanto de respiro leva o corte um
     pouco para fora da grade, até a beira da página. */
  overflow-x: clip;
  margin-inline: calc(var(--espaco-4) * -1);
  padding-inline: var(--espaco-4);
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 12rem));
  gap: var(--espaco-5) var(--espaco-4);
  align-content: start;
}

@media (min-width: 30rem) {
  .vagas {
    grid-template-columns: repeat(3, minmax(0, 12rem));
  }
}

@media (min-width: 48rem) and (max-width: 63.99rem) {
  .vagas {
    grid-template-columns: repeat(2, minmax(0, 12rem));
  }
}

/* A casa empilha a figurinha (ou a vaga) e, se houver, o botão "Desfazer" */
.casa {
  position: relative;   /* o anel da batida se mede por ela */
  display: grid;
  gap: var(--espaco-2);
  align-content: start;
}

/* Entrar ao rolar: cada casa do álbum assenta no lugar enquanto entra na tela.
   "animation-timeline: view()" troca o relógio da animação pela rolagem: ela
   anda conforme a casa aparece e termina com a casa inteira à vista.
   Onde o navegador não conhece isso, as casas simplesmente já estão no lugar. */
@supports (animation-timeline: view()) {
  .vagas > .casa {
    animation: assentar linear both;
    animation-timeline: view(block);
    animation-range: entry 0% entry 90%;
  }
}

@keyframes assentar {
  from { opacity: 0; translate: 0 2rem; rotate: -4deg; scale: 0.86; }
}

/* A largura de cada casa é a da coluna, e pronto: "minmax(0, 1fr)" proíbe o
   conteúdo de alargar a coluna. Sem isto, quando o texto fica alto (letra
   maior), a proporção 3 por 4 alargaria a figurinha junto e ela passaria da
   tela. Com a largura presa, só a altura cresce. */
.vagas > li,
.mesa > li,
.bandeja > li {
  min-width: 0;
  grid-template-columns: minmax(0, 1fr);
}

.mesa > li {
  display: grid;
}

.vazio {
  padding-block: var(--espaco-6);
  border-top: 2px solid var(--cor-texto);
}

/* ---------- Pacotinhos ---------- */

/* O palco: onde fica o pacotinho fechado e, depois de rasgar, as figurinhas */
.palco {
  display: grid;
  gap: var(--espaco-5);
  align-content: start;
}

.palco .pacotinho {
  margin: var(--espaco-2) var(--espaco-4);
}

/* A mesa: as cinco figurinhas do pacotinho, três em cima e duas embaixo */
.mesa {
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 12rem));
  gap: var(--espaco-5) var(--espaco-4);
}

@media (min-width: 30rem) {
  .mesa {
    grid-template-columns: repeat(3, minmax(0, 12rem));
  }
}

@media (min-width: 48rem) and (max-width: 63.99rem) {
  .mesa {
    grid-template-columns: repeat(2, minmax(0, 12rem));
  }
}

.mesa-botoes {
  display: flex;
  flex-wrap: wrap;
  gap: var(--espaco-3);
  max-width: none;
}

/* ---------- Trocas ---------- */

/* Tenho para trocar: uma linha impressa por figurinha, com a contagem na ponta */
.lista-troca {
  list-style: none;
  padding: 0;
}

.lista-troca > li {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--espaco-1) var(--espaco-3);
  padding-block: var(--espaco-2);
  border-bottom: 1.5px solid var(--cor-borda);
}

/* Preciso: os números que faltam, cada um em um quadrinho impresso (como uma vaga pequena) */
.lista-faltam {
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: var(--espaco-2);
}

.lista-faltam > li {
  padding: 0.15em 0.55em;
  background: var(--cor-vaga);
  color: var(--cor-texto);
  border: 2px solid var(--cor-borda);
  font-size: var(--texto-pequeno);
}

/* O resumo da gaveta "Ver os números que faltam": área de toque de 44 px */
#faltam-gaveta summary {
  min-height: 2.75rem;
  display: flex;
  align-items: center;
  gap: var(--espaco-2);
  color: var(--cor-acao);
  font-weight: 700;
  text-decoration: underline;
  text-underline-offset: 0.18em;
  cursor: pointer;
}

/* Um sinal de mais ou de menos na frente mostra se a gaveta está fechada ou aberta */
#faltam-gaveta summary::before {
  content: "+";
  font-weight: 800;
}

#faltam-gaveta[open] summary::before {
  content: "−";
}

/* A lista pronta ocupa o cartão inteiro */
.bilhete .campo {
  max-width: none;
}

/* Banca: as duas perguntas lado a lado quando há largura */
.banca-grade {
  display: grid;
  gap: var(--espaco-5);
}

@media (min-width: 48rem) {
  .banca-grade {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

/* ---------- Sobre ---------- */

.sobre-ficha dt {
  font-weight: 700;
}

.sobre-ficha dd + dt {
  margin-top: var(--espaco-3);
}

/* Listas de créditos e de fontes: uma linha impressa por item */
.lista-fontes {
  list-style: none;
  padding: 0;
  font-size: var(--texto-pequeno);
}

.lista-fontes > li {
  padding-block: var(--espaco-2);
  border-bottom: 1.5px solid var(--cor-borda);
}

/* Lista comum, com marcador, dentro do texto corrido */
.lista-simples {
  padding-left: 1.2em;
  max-width: var(--largura-leitura);
}

.lista-simples > li + li {
  margin-top: var(--espaco-2);
}

/* ---------- Sobre: guia de estilo ----------
   As peças do site todas juntas, para consulta e para testar os temas. */

.guia h3 {
  margin-top: var(--espaco-6);
}

.guia-linha {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--espaco-3);
  max-width: none;
}

.guia-colunas {
  display: grid;
  gap: var(--espaco-5);
}

.guia-figurinhas {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 9rem));
  gap: var(--espaco-5);
}

@media (min-width: 40rem) {
  .guia-colunas {
    grid-template-columns: repeat(2, minmax(0, 28rem));
  }

  .guia-figurinhas {
    grid-template-columns: repeat(4, minmax(0, 9rem));
  }
}
````

### css/acessibilidade.css

````css
/* ==========================================================================
   acessibilidade.css
   --------------------------------------------------------------------------
   Duas coisas:
   1. A aparência do painel de acessibilidade.
   2. O que cada preferência do painel muda na página.

   As preferências chegam como atributos no <html>, postos pelo
   js/tema-acessibilidade.js. Exemplo: <html data-tema="escuro" data-fonte="grande">
   (As cores de cada tema e do alto contraste ficam em tokens.css.)
   ========================================================================== */

/* ---------- 1. O painel ----------
   É um <dialog>: uma janela que o próprio navegador sabe abrir por cima da
   página, prender o foco do teclado dentro dela e fechar com a tecla Esc. */

.painel {
  width: min(26rem, calc(100% - 2rem));
  max-height: calc(100% - 2rem);
  padding: 0;
  background: var(--cor-superficie);
  color: var(--cor-texto);
  border: 2px solid var(--cor-texto);
  border-radius: var(--raio-adesivo);
}

/* O fundo escurecido atrás do painel */
.painel::backdrop {
  background: rgba(10, 16, 40, 0.65);
}

.painel-dentro {
  display: grid;
  gap: var(--espaco-4);
  padding: var(--espaco-5);
}

.painel-cabeca {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--espaco-3);
}

.painel-cabeca h2 {
  font-size: var(--titulo-3);
}

/* Cada grupo de opções é um <fieldset> com a pergunta no <legend> */
.painel-grupo {
  min-width: 0;
  margin: 0;
  padding: 0;
  border: 0;
}

.painel-grupo legend {
  padding: 0;
  font-weight: 700;
}

.painel-pe {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--espaco-3);
}

/* Aviso lido pelo leitor de tela quando uma preferência é salva */
.painel-aviso {
  min-height: 1.5em;
  color: var(--cor-sucesso);
  font-size: var(--texto-pequeno);
  font-weight: 600;
}

/* ---------- 2. O que cada preferência muda ---------- */

/* Tamanho da letra: como o site inteiro usa rem, basta mudar o tamanho da raiz */
html[data-fonte="grande"] { font-size: 112.5%; }
html[data-fonte="maior"] { font-size: 125%; }

/* Mais espaço no texto: linhas, letras, palavras e parágrafos mais afastados
   (as medidas seguem o critério 1.4.12 do WCAG, com folga) */
[data-espacamento="amplo"] body {
  line-height: 1.8;
  letter-spacing: 0.12em;
  word-spacing: 0.16em;
}

[data-espacamento="amplo"] h1,
[data-espacamento="amplo"] h2,
[data-espacamento="amplo"] h3 {
  line-height: 1.25;
  letter-spacing: 0.04em;
}

[data-espacamento="amplo"] p + p,
[data-espacamento="amplo"] .fluxo > * + * {
  margin-top: 2em;
}

/* Destacar links: sublinhado grosso, negrito e um fundo atrás */
[data-links="destacados"] a:not(.botao):not(.marca) {
  background: var(--cor-superficie);
  font-weight: 700;
  text-decoration-line: underline;
  text-decoration-thickness: 3px;
  text-underline-offset: 4px;
}

/* Reduzir animações: vale se a pessoa ligou no painel... */
[data-movimento="reduzido"] *,
[data-movimento="reduzido"] *::before,
[data-movimento="reduzido"] *::after {
  animation-duration: 0.01ms !important;
  animation-delay: 0s !important;
  animation-iteration-count: 1 !important;
  transition-duration: 0.01ms !important;
  scroll-behavior: auto !important;
}

/* Sem movimento, a figurinha não gira: a face só é trocada, na hora */
[data-movimento="reduzido"] .figurinha-vira {
  --meia-volta: 0deg;
  --tempo-de-virar: 0s;
}

/* ...ou se o próprio aparelho já pede menos movimento.
   A exceção é quando a pessoa pede as animações de propósito
   (data-movimento="completo", usado pela página do laboratório). */
@media (prefers-reduced-motion: reduce) {
  html:not([data-movimento="completo"]) *,
  html:not([data-movimento="completo"]) *::before,
  html:not([data-movimento="completo"]) *::after {
    animation-duration: 0.01ms !important;
    animation-delay: 0s !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }

  html:not([data-movimento="completo"]) .figurinha-vira {
    --meia-volta: 0deg;
    --tempo-de-virar: 0s;
  }
}

/* Alto contraste: além das cores (tokens.css), as linhas engrossam
   e a retícula decorativa da figurinha some */
[data-contraste="alto"] .cartao,
[data-contraste="alto"] .campo-entrada {
  border-width: 3px;
}

[data-contraste="alto"] .figurinha-arte::after {
  display: none;
}

/* Os pontinhos do pacotinho e das costas da figurinha também somem */
[data-contraste="alto"] .pacotinho-aba::before,
[data-contraste="alto"] .pacotinho-corpo::before {
  display: none;
}

[data-contraste="alto"] .figurinha-costas {
  background-image: none;
}

[data-contraste="alto"] .conquista,
[data-contraste="alto"] .barra {
  border-width: 3px;
}

[data-contraste="alto"] a {
  text-decoration-thickness: 2px;
}

/* No alto contraste, somem também o brilho colorido da lendária e a retícula
   que segue o ponteiro */
[data-contraste="alto"] .figurinha-lendaria::before,
[data-contraste="alto"] .figurinha-lendaria::after,
[data-contraste="alto"] .lanterna {
  display: none;
}

/* Reduzir animações vale também para a virada de página: a troca fica seca.
   (Os retratos da página velha e da nova são peças do próprio navegador,
   por isso não entram na regra geral lá de cima e precisam desta.) */
html[data-movimento="reduzido"]::view-transition-group(*),
html[data-movimento="reduzido"]::view-transition-old(*),
html[data-movimento="reduzido"]::view-transition-new(*) {
  animation: none !important;
}

[data-movimento="reduzido"] .lanterna {
  display: none;
}

@media (prefers-reduced-motion: reduce) {
  html:not([data-movimento="completo"])::view-transition-group(*),
  html:not([data-movimento="completo"])::view-transition-old(*),
  html:not([data-movimento="completo"])::view-transition-new(*) {
    animation: none !important;
  }

  html:not([data-movimento="completo"]) .lanterna {
    display: none;
  }
}

/* A entrada das casas do álbum é presa à rolagem, e não a um relógio: a regra
   geral de reduzir animações não a alcança. Aqui ela é desligada de vez. */
[data-movimento="reduzido"] .vagas > .casa {
  animation: none;
}

@media (prefers-reduced-motion: reduce) {
  html:not([data-movimento="completo"]) .vagas > .casa {
    animation: none;
  }
}
````

### css/cenas.css

````css
/* ==========================================================================
   cenas.css
   --------------------------------------------------------------------------
   As cenas presas à rolagem da página inicial (index.html).

   Cada cena existe de dois jeitos:

   1. PARADA (o padrão deste arquivo). É uma seção comum, com tudo já no
      lugar. Vale sem JavaScript e para quem pede menos movimento.

   2. EM MOVIMENTO. Quando o js/cenas.js põe a classe "com-cenas" no <html>:
        .cena        vira uma seção bem alta (240vh = quase duas telas e meia);
        .cena-palco  gruda no topo da tela (position: sticky) e fica parado
                     enquanto a pessoa rola por dentro da cena.
      O CSS só arruma as peças. Quem move cada peça conforme a rolagem é o
      js/cenas-inicio.js, escrevendo "transform" e "opacity" no elemento.

   Partes:
   1. A cena e o palco
   2. Abertura: a retícula forma a marca
   3. A frase acende
   4. O pacotinho gira e abre
   5. O álbum abre
   6. Mergulho na figurinha
   7. Os números contam
   8. Os grupos andam para o lado
   9. Voo pelas figurinhas
   ========================================================================== */

/* ---------- 1. A cena e o palco ---------- */

/* O site reserva uma folga no pé da tela para o recado do álbum (ver
   paginas.css). Esta página não tem recado, e a folga faria o navegador rolar
   a página sozinho ao dar o foco em um botão de dentro de uma cena. */
html:has(.cena) {
  scroll-padding-bottom: 0;
}

/* Parada: o palco é uma seção igual às outras, no miolo da página */
.cena-palco {
  position: relative;
  max-width: var(--largura-maxima);
  margin-inline: auto;
  padding: var(--espaco-6) var(--espaco-4);
  border-top: 2px solid var(--cor-texto);
}

.cena + .secao {
  border-top: 2px solid var(--cor-texto);
}

/* Em movimento. A altura vem do HTML: style="--altura: 240vh". Quanto mais
   alta a cena, mais devagar ela anda, porque há mais rolagem para gastar. */
.com-cenas .cena {
  height: var(--altura, 300vh);
}

.com-cenas .cena-palco {
  position: sticky;
  top: 0;
  max-width: none;
  height: 100vh;
  height: 100svh;   /* no celular, desconta a barra de endereço do navegador */
  margin: 0;
  padding: 0;
  border: 0;
  display: grid;
  place-items: center;
  align-content: center;
  overflow: hidden;
}

/* No celular a tela é mais alta que larga e o dedo rola menos por vez:
   as cenas ficam 20% mais curtas */
@media (max-width: 47.99rem) {
  .com-cenas .cena {
    height: calc(var(--altura, 300vh) * 0.8);
  }
}

/* Título de cena. Parado, é um título comum. */
.cena-titulo {
  max-width: none;
  font-family: var(--fonte-destaque);
  font-weight: 900;
  font-size: clamp(2.25rem, 1.25rem + 4.5vw, 4.75rem);
  line-height: 1;
  text-wrap: balance;
}

.cena-titulo + .cena-titulo {
  margin-top: var(--espaco-2);
}

/* Em movimento, fica no alto do palco, no meio */
.com-cenas .cena-titulo {
  position: absolute;
  z-index: 4;
  top: 7vh;
  left: 0;
  right: 0;
  margin: 0;
  padding-inline: var(--espaco-4);
  text-align: center;
  pointer-events: none;
}

/* O que foi montado pelo JavaScript some quando ele está desligado */
html:not(.com-js) .so-com-js {
  display: none;
}

/* "Desça para continuar" da abertura: um fio que desce. Só existe com as cenas em movimento. */
.rolar-dica {
  display: none;
}

.com-cenas .rolar-dica {
  display: flex;
  align-items: center;
  gap: var(--espaco-3);
  font-weight: 700;
}

.rolar-dica i,
.cena-desca i {
  display: block;
  width: 2px;
  height: 2.25rem;
  background: var(--cor-texto);
  transform-origin: top;
}

.rolar-dica i {
  animation: fio-descendo 1.6s ease-in-out 3;   /* três vezes e para */
}

/* O aviso "Desça para continuar", no pé de cada palco (posto pelo js/cenas.js).
   Fica em uma etiqueta de papel claro, para ser lido por cima de qualquer cena. */
.cena-desca {
  display: none;
}

.com-cenas .cena-desca {
  position: absolute;
  z-index: 5;
  left: 50%;
  bottom: var(--espaco-4);
  translate: -50% 0;
  display: flex;
  align-items: center;
  gap: var(--espaco-3);
  max-width: none;
  padding: var(--espaco-1) var(--espaco-3);
  background: var(--cor-superficie);
  font-size: var(--texto-pequeno);
  font-weight: 700;
  white-space: nowrap;
  pointer-events: none;
}

.cena-desca i {
  height: 1.5rem;
}

/* O fio desce três vezes cada vez que a cena chega à tela, e para */
.cena-na-tela .cena-desca i {
  animation: fio-descendo 1.6s ease-in-out 3;
}

@keyframes fio-descendo {
  0% { transform: scaleY(0); }
  60% { transform: scaleY(1); opacity: 1; }
  100% { transform: scaleY(1); opacity: 0; }
}

/* ---------- 2. Abertura: a retícula forma a marca ---------- */

/* Na página inicial a abertura encosta no cabeçalho, sem a folga de cima do <main> */
main:has(> .cena-abertura) {
  padding-top: 0;
}

.cena-abertura .cena-palco {
  display: grid;
  gap: var(--espaco-5);
  align-items: center;
  border-top: 0;
}

.abertura-convite {
  order: -1;   /* no celular, o convite vem antes do desenho */
}

.abertura-convite > * + * {
  margin-top: var(--espaco-5);
}

.abertura-botoes {
  display: flex;
  flex-wrap: wrap;
  gap: var(--espaco-3);
}

/* A tela de desenho (canvas) onde os pontinhos são desenhados.
   Parada, mostra a marca já formada. */
.reticula-tela {
  display: block;
  width: 100%;
  aspect-ratio: 5 / 2;
}

.abertura-assinatura {
  max-width: none;
  text-align: center;
  font-family: var(--fonte-destaque);
  font-weight: 300;
  font-size: clamp(1.5rem, 1rem + 2vw, 2.25rem);
  line-height: 1.1;
}

/* O aviso para quem está vendo a página parada sem ter pedido isso no site */
.aviso-movimento {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--espaco-3);
  padding: var(--espaco-3) var(--espaco-4);
  border: 2px dashed var(--cor-borda);
  font-size: var(--texto-pequeno);
}

@media (min-width: 48rem) {
  .cena-abertura .cena-palco {
    grid-template-columns: 5fr 7fr;
    column-gap: var(--espaco-6);
  }

  .abertura-convite {
    grid-row: 1 / span 2;
  }

  .aviso-movimento {
    grid-column: 1 / -1;
  }
}

/* Em movimento: o desenho cobre o palco inteiro e o convite fica embaixo,
   à esquerda, como em um cartaz */
.com-cenas .cena-abertura .cena-palco {
  display: block;
}

.com-cenas .reticula-tela {
  position: absolute;
  inset: 0;
  height: 100%;
  aspect-ratio: auto;
}

.com-cenas .abertura-convite {
  position: absolute;
  z-index: 2;
  left: max(var(--espaco-4), 6vw);
  right: max(var(--espaco-4), 6vw);
  /* A folga de baixo é a altura do cabeçalho ("--cabecalho" vem do JavaScript):
     assim o convite aparece inteiro na primeira tela, com o cabeçalho ainda em cima */
  bottom: max(calc(var(--cabecalho, 5rem) + 1.5rem), 12vh);
  max-width: 46rem;
}

.com-cenas .abertura-convite h1 {
  font-size: clamp(3rem, 1.25rem + 7.5vw, 7rem);
}

.com-cenas .abertura-assinatura {
  position: absolute;
  left: 0;
  right: 0;
  top: 70%;   /* o JavaScript acerta a altura, logo abaixo das letras */
  padding-inline: var(--espaco-4);
  opacity: 0;
}

/* ---------- 3. A frase acende ---------- */

.frase {
  max-width: 24ch;
  font-family: var(--fonte-destaque);
  font-weight: 900;
  font-size: clamp(2rem, 1rem + 4.4vw, 4.5rem);
  line-height: 1.04;
}

/* O sublinhado de caneta: o traço inteiro mede 1 (pathLength="1" no HTML).
   "--falta" diz quanto do traço ainda não foi desenhado. */
.frase-traco {
  display: block;
  width: min(100%, 24rem);
  height: 1.75rem;
  margin-top: var(--espaco-3);
  overflow: visible;
}

.frase-traco path {
  fill: none;
  stroke: var(--cor-acao);
  stroke-width: 3.5;
  stroke-linecap: round;
  stroke-dasharray: 1;
  stroke-dashoffset: var(--falta, 0);
}

.com-cenas .frase-caixa {
  width: 100%;
  max-width: var(--largura-maxima);
  padding-inline: var(--espaco-4);
}

/* Em movimento, a palavra que ainda não acendeu fica com a tinta bem diluída */
.com-cenas .frase span {
  transition: color 260ms ease-out;
}

.com-cenas .frase span:not(.acesa) {
  color: var(--cor-vaga);
  color: color-mix(in srgb, var(--cor-texto) 16%, transparent);
}

/* ---------- 4. O pacotinho gira e abre ---------- */

/* Parada: o pacotinho de um lado e as cinco figurinhas do outro */
.pacote-cena {
  --pacote-l: 9rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--espaco-5);
  margin-top: var(--espaco-5);
}

.pacote3d {
  order: -1;
  position: relative;
  flex: none;
  width: var(--pacote-l);
  height: calc(var(--pacote-l) * 1.4);
  rotate: -3deg;
}

.pacote3d .pacotinho {
  width: 100%;
  height: 100%;
  aspect-ratio: auto;
  rotate: none;
  cursor: default;
}

.pacote3d .pacotinho-marca {
  font-size: calc(var(--pacote-l) * 0.3);
}

.pacote3d-costas {
  display: none;
}

.pacote-figurinhas {
  flex: 1 1 18rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(7.5rem, 1fr));
  gap: var(--espaco-4);
}

/* Em movimento: tudo no mesmo ponto do espaço, uma peça na frente da outra.
   "perspective" é a distância do olho até a tela. Sem ela, girar em 3D
   pareceria só achatar a peça. */
.com-cenas .palco-3d {
  perspective: 1100px;
}

.com-cenas .pacote-cena {
  --pacote-l: clamp(9rem, 27vmin, 15rem);
  position: relative;
  display: block;
  width: var(--pacote-l);
  height: calc(var(--pacote-l) * 1.4);
  margin-top: 9vh;
  transform-style: preserve-3d;   /* os filhos ficam no mesmo espaço 3D */
}

.com-cenas .pacote3d {
  position: absolute;
  inset: 0;
  width: auto;
  height: auto;
  rotate: none;
  transform-style: preserve-3d;
}

/* As duas faces ocupam o mesmo lugar. "backface-visibility: hidden" esconde
   a face que está de costas para quem olha. */
.com-cenas .pacote3d-face {
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
}

.com-cenas .pacote3d-costas {
  transform: rotateY(180deg);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--espaco-3);
  padding: var(--espaco-3);
  background: var(--cor-etiqueta-fundo);
  color: var(--cor-etiqueta-texto);
  border-radius: var(--raio-adesivo);
  text-align: center;
}

.pacote3d-costas::before {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(circle, currentColor 0.8px, transparent 1.2px) 0 0 / 7px 7px;
  opacity: 0.3;
}

.com-cenas .pacote-figurinhas {
  position: absolute;
  inset: 0;
  display: block;
  transform-style: preserve-3d;
}

/* A sequência de quadros: uma tela de desenho maior que o pacotinho, com folga
   para ele entrar, girar e cair. Fica escondida até todas as imagens chegarem;
   aí a classe "com-quadros" troca o pacotinho de CSS por ela. */
.pacote-quadros {
  display: none;
}

.com-cenas .com-quadros .pacote-quadros {
  display: block;
  position: absolute;
  left: 50%;
  top: 50%;
  width: calc(var(--pacote-l) * 2.4);
  height: calc(var(--pacote-l) * 3.08);
  margin-left: calc(var(--pacote-l) * -1.2);
  margin-top: calc(var(--pacote-l) * -1.54);
  pointer-events: none;
}

.com-cenas .com-quadros .pacote3d {
  display: none;
}

/* Cada figurinha começa escondida atrás do pacotinho, bem no meio dele */
.com-cenas .pacote-carta {
  position: absolute;
  left: 50%;
  top: 50%;
  width: calc(var(--pacote-l) * 0.8);
  margin-left: calc(var(--pacote-l) * -0.4);
  margin-top: calc(var(--pacote-l) * -0.5333);
  opacity: 0;
}

/* ---------- 5. O álbum abre ---------- */

/* Parada: o álbum já aberto, com duas páginas lado a lado */
.livro {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  max-width: 40rem;
  margin-top: var(--espaco-5);
}

.folha {
  display: contents;   /* a folha "some" e as faces dela viram filhas diretas da grade */
}

.face {
  position: relative;
  aspect-ratio: 1 / 1.35;
  overflow: hidden;
  background: var(--cor-fundo);
  border: 2px solid var(--cor-texto);
}

/* Parada, só aparecem as duas páginas da primeira abertura */
html:not(.com-cenas) .capa,
html:not(.com-cenas) #pagina-3,
html:not(.com-cenas) #pagina-base {
  display: none;
}

#pagina-1 { order: 1; }
#pagina-2 { order: 2; }

.cena-acao {
  margin-top: var(--espaco-5);
}

/* Em movimento. A caixa do livro tem o tamanho de UMA página (a da direita).
   As folhas giram em torno da borda esquerda dela, que é a lombada. */
.com-cenas .livro {
  --pagina-l: min(46vw, 22rem, calc((100vh - 15rem) / 1.35));
  position: relative;
  display: block;
  width: var(--pagina-l);
  max-width: none;
  height: calc(var(--pagina-l) * 1.35);
  margin-top: 5vh;
  transform-style: preserve-3d;
}

@supports (height: 100svh) {
  .com-cenas .livro {
    --pagina-l: min(46vw, 22rem, calc((100svh - 15rem) / 1.35));
  }
}

.com-cenas .folha {
  display: block;
  position: absolute;
  inset: 0;
  transform-origin: left center;   /* gira em torno da lombada */
  transform-style: preserve-3d;
}

/* Cada folha tem duas faces: a frente e o verso (este já nasce virado) */
.com-cenas .face {
  display: block;
  position: absolute;
  inset: 0;
  aspect-ratio: auto;
  backface-visibility: hidden;
}

.com-cenas .face-verso {
  transform: rotateY(180deg);
}

/* Enquanto a folha vira, o lado da lombada escurece ("--sombra" vem do JavaScript) */
.com-cenas .face::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(to right, rgba(10, 16, 40, 0.6), transparent 55%);
  opacity: var(--sombra, 0);
}

.com-cenas .face-verso::after {
  background: linear-gradient(to left, rgba(10, 16, 40, 0.6), transparent 55%);
}

/* A capa: o negativo da página, como o pacotinho */
.com-cenas .capa {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: calc(var(--pagina-l) * 0.03);
  background: var(--cor-etiqueta-fundo);
  color: var(--cor-etiqueta-texto);
  border-color: var(--cor-etiqueta-fundo);
  text-align: center;
}

.capa::before {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(circle, currentColor 0.9px, transparent 1.3px) 0 0 / 8px 8px;
  opacity: 0.3;
}

.capa span {
  position: relative;   /* na frente dos pontinhos */
  padding: 0 0.3em;
  background: var(--cor-etiqueta-fundo);
}

.capa-marca {
  font-family: var(--fonte-destaque);
  font-weight: 900;
  font-size: calc(var(--pagina-l) * 0.34);
  line-height: 1;
  rotate: -6deg;
}

.capa-texto {
  font-weight: 700;
  font-size: calc(var(--pagina-l) * 0.06);
}

.capa-ano {
  font-family: var(--fonte-destaque);
  font-weight: 300;
  font-size: calc(var(--pagina-l) * 0.13);
  line-height: 1;
}

.com-cenas .cena-acao {
  position: absolute;
  z-index: 4;
  left: 0;
  right: 0;
  bottom: 5vh;
  margin: 0;
  max-width: none;
  text-align: center;
  opacity: 0;
}

/* O miolo da página é desenhado sempre com 480 por 648 pixels e depois
   encolhido ou aumentado ("--escala" vem do JavaScript) para caber na folha.
   Assim a página do álbum se comporta como uma gravura: tudo cresce junto. */
.miolo {
  position: absolute;
  left: 0;
  top: 0;
  width: 480px;
  height: 648px;
  display: grid;
  grid-template-rows: auto 1fr auto;
  gap: 16px;
  padding: 22px;
  transform-origin: 0 0;
  transform: scale(var(--escala, 1));
}

.miolo-cabeca {
  display: flex;
  align-items: center;
  gap: 12px;
  padding-bottom: 10px;
  border-bottom: 3px solid var(--cor-texto);
}

.miolo-cabeca img {
  flex: none;
  width: 56px;
  border: 1px solid var(--cor-texto);
}

.miolo-nome {
  font-family: var(--fonte-destaque);
  font-weight: 900;
  font-size: 46px;
  line-height: 1;
}

.miolo-grupo {
  margin-left: auto;
  font-size: 18px;
  font-weight: 700;
  white-space: nowrap;
}

.miolo-grade {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px 12px;
  align-content: start;
}

.miolo-grade > * {
  min-width: 0;
}

.miolo .vaga {
  padding: 4px;
}

.miolo .vaga-numero {
  font-size: 40px;
}

.miolo .vaga-nome {
  font-size: 14px;
}

.miolo-pe {
  color: var(--cor-texto-secundario);
  font-size: 16px;
  font-weight: 700;
}

/* ---------- 6. Mergulho na figurinha ---------- */

/* Parada: só a faixa de cor com a etiqueta. A figurinha que cresce não aparece. */
.mergulho {
  display: none;
}

/* A camada de cor. A cor é a do retrato da figurinha ("--campo", posta pelo
   JavaScript; sem ele, fica a tinta da página). */
.mergulho-fim {
  display: grid;
  place-items: center;
  padding: var(--espaco-7) var(--espaco-4);
  background-color: var(--campo, var(--cor-texto));
  background-image: radial-gradient(circle, rgba(20, 32, 79, 0.3) 1.2px, transparent 1.7px);
  background-size: 9px 9px;
}

/* Nenhum texto é escrito direto em cima da cor da seleção: a frase vem em
   uma etiqueta de papel branco, colada como uma figurinha. */
.mergulho-etiqueta {
  max-width: 15ch;
  padding: var(--espaco-5);
  background: var(--cor-figurinha-papel);
  color: var(--cor-figurinha-tinta);
  border-radius: var(--raio-adesivo);
  box-shadow: var(--sombra-colada);
  rotate: -1.5deg;
  font-family: var(--fonte-destaque);
  font-weight: 900;
  font-size: clamp(2.25rem, 1.25rem + 4.5vw, 4.75rem);
  line-height: 1;
  text-wrap: balance;
}

.com-cenas .mergulho {
  display: block;
  width: clamp(9rem, 30vmin, 14rem);
}

.com-cenas .mergulho-fim {
  position: absolute;
  inset: 0;
  z-index: 3;
  opacity: 0;
}

/* ---------- 7. Os números contam ---------- */

.numeros {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--espaco-6) var(--espaco-4);
  margin-top: var(--espaco-6);
}

@media (min-width: 60rem) {
  .numeros {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

/* As linhas do campo, atrás dos números. É enfeite: fica bem fraco. */
.campo-dos-numeros {
  position: absolute;
  z-index: 0;
  right: var(--espaco-4);
  bottom: var(--espaco-5);
  width: min(55%, 24rem);
  opacity: 0.16;
  pointer-events: none;
}

.numeros {
  position: relative;   /* na frente do campo */
  z-index: 1;
}

.com-cenas .campo-dos-numeros {
  right: auto;
  bottom: auto;
  left: 50%;
  top: 54%;
  width: min(88vw, 50rem, 110vh);
  translate: -50% -50%;
}

/* "--aceso" vai de 0 a 1 conforme chega a vez do número. Parado, vale 1. */
.numero {
  position: relative;
  isolation: isolate;
  display: flex;
  flex-direction: column-reverse;   /* no HTML vem a legenda e depois o número; na tela, o número fica em cima */
  opacity: calc(0.22 + var(--aceso, 1) * 0.78);
}

.numero dd {
  margin: 0;
  font-family: var(--fonte-destaque);
  font-weight: 900;
  font-size: clamp(4rem, 1.5rem + 10vw, 9rem);
  line-height: 0.9;
}

.numero dt {
  font-weight: 700;
}

/* A mancha de retícula atrás do número: bolinhas que somem em direção à borda */
.numero::before {
  content: "";
  position: absolute;
  z-index: -1;
  inset: -2rem -1rem 1.5rem 15%;
  background: radial-gradient(circle, var(--cor-texto) 1.5px, transparent 2px) 0 0 / 9px 9px;
  -webkit-mask-image: radial-gradient(closest-side, #000 15%, transparent 95%);
  mask-image: radial-gradient(closest-side, #000 15%, transparent 95%);
  opacity: calc(var(--aceso, 1) * 0.45);
}

.com-cenas .numeros {
  width: 100%;
  max-width: var(--largura-maxima);
  margin-top: 9vh;
  padding-inline: var(--espaco-4);
}

/* ---------- 8. Os grupos andam para o lado ---------- */

/* Parada: os doze grupos em uma grade */
.trilha {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 15rem), 1fr));
  gap: var(--espaco-6) var(--espaco-5);
}

.trilha-abre {
  grid-column: 1 / -1;
}

.trilha-abre p {
  margin-top: var(--espaco-4);
  font-size: var(--texto-medio);
}

.grupo {
  display: grid;
  gap: var(--espaco-3);
  align-content: start;
  padding-top: var(--espaco-3);
  border-top: 2px solid var(--cor-texto);
}

.grupo h3 {
  display: flex;
  align-items: baseline;
  gap: var(--espaco-3);
  font-size: var(--titulo-3);
}

/* A letra do grupo, bem grande */
.grupo-letra {
  font-size: clamp(4.5rem, 3rem + 6vw, 7.5rem);
  line-height: 0.8;
}

.grupo-selecoes {
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--espaco-4) var(--espaco-3);
}

.grupo-selecoes li {
  display: grid;
  gap: var(--espaco-2);
  font-weight: 700;
  line-height: 1.2;
}

/* O selo: a bandeira de uma seleção.
   "--f" vai de 0 (grupo longe do meio da tela) a 1 (grupo no meio).
   Com 0 ele é uma vaga impressa em uma tinta só, de canto vivo.
   Com 1 ele é uma figurinha: colorida, de canto arredondado e um pouco torta.
   A impressão em uma tinta usa a mesma receita das fotos do site
   (ver "Foto em uma tinta só", em componentes.css). */
.selo {
  position: relative;
  overflow: hidden;
  isolation: isolate;
  aspect-ratio: 4 / 3;
  background: var(--cor-foto-luz);
  border: 2px solid var(--cor-texto);
  border-radius: calc(var(--f, 1) * var(--raio-adesivo));
  rotate: calc(var(--f, 1) * var(--torto, -1.5deg));
  transition: border-color 200ms, box-shadow 200ms;
}

.grupo-selecoes li:nth-child(even) .selo {
  --torto: 1.2deg;
}

.selo img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(calc(1 - var(--f, 1)));
}

.selo::before,
.selo::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: calc(1 - var(--f, 1));
}

.selo::before {
  background: var(--cor-foto-sombra);
  mix-blend-mode: screen;
}

.selo::after {
  background: var(--cor-foto-luz);
  mix-blend-mode: multiply;
}

/* Passou da metade do caminho: ganha a borda branca e a sombra de quem foi colado */
.grupo-colado .selo {
  border-color: var(--cor-figurinha-papel);
  box-shadow: 0 0 0 2px var(--cor-figurinha-papel), var(--sombra-colada);
}

.grupo-numeros {
  color: var(--cor-texto-secundario);
  font-size: var(--texto-pequeno);
}

.grupo a {
  display: inline-flex;
  align-items: center;
  min-height: 2.75rem;   /* 44 px: alvo de toque confortável */
  font-weight: 700;
}

/* Em movimento: a faixa vira uma fila única, bem mais larga que a tela.
   A rolagem para baixo empurra a fila para a esquerda. */
.com-cenas .trilha {
  position: absolute;
  top: 0;
  bottom: 3.25rem;   /* sobra o pé do palco para o aviso "Desça para continuar" */
  left: 0;
  display: flex;
  align-items: center;
  gap: clamp(2rem, 7vw, 6rem);
  padding-inline: max(var(--espaco-4), 9vw);
}

.com-cenas .trilha-abre {
  flex: none;
  width: min(78vw, 26rem);
}

.com-cenas .grupo {
  flex: none;
  width: min(78vw, 24rem);
  padding-top: 0;
  border-top: 0;
}

/* ---------- 9. Voo pelas figurinhas ---------- */

/* Parada: só o título e o botão */
.voo {
  display: none;
}

.voo-fim > * + * {
  margin-top: var(--espaco-5);
}

.com-cenas .palco-voo {
  perspective: 900px;
}

/* Um ponto no meio do palco. As figurinhas são espalhadas em volta dele,
   cada uma com a sua profundidade (translateZ). */
.com-cenas .voo {
  --voo-l: clamp(8rem, 22vmin, 11rem);
  display: block;
  position: absolute;
  left: 50%;
  top: 50%;
  width: 0;
  height: 0;
  transform-style: preserve-3d;
}

.voo-item {
  position: absolute;
  left: 0;
  top: 0;
  width: var(--voo-l);
  margin: calc(var(--voo-l) * -0.667) 0 0 calc(var(--voo-l) * -0.5);
}

.com-cenas .voo-fim {
  position: relative;
  z-index: 4;
  padding-inline: var(--espaco-4);
  text-align: center;
  opacity: 0;
}

.com-cenas .voo-fim .cena-titulo {
  position: static;
  pointer-events: auto;
}

/* ---------- Janela não muito alta (notebook, celular pequeno) ----------
   Com menos de 640 px de altura, cada grupo fica mais estreito. As bandeiras
   encolhem junto, e o link "Ver o Grupo no álbum" não fica debaixo do aviso
   "Desça para continuar". */
@media (max-height: 40rem) {
  .com-cenas .grupo {
    width: min(78vw, 16rem);
  }

  .com-cenas .grupo-letra {
    font-size: 4.5rem;
  }
}

/* ---------- Tela baixa (celular deitado, janela pequena) ----------
   Com menos de 480 px de altura, as peças encolhem para caber no palco. */
@media (max-height: 30rem) {
  .com-cenas .cena-titulo,
  .com-cenas .mergulho-etiqueta {
    font-size: 1.5rem;
  }

  .com-cenas .cena-titulo {
    top: 0.75rem;
  }

  .com-cenas .abertura-convite {
    bottom: calc(var(--cabecalho, 4rem) + 0.5rem);
  }

  .com-cenas .abertura-convite h1 {
    font-size: 2rem;
  }

  .com-cenas .abertura-convite > * + * {
    margin-top: var(--espaco-3);
  }

  .com-cenas .rolar-dica {
    display: none;
  }

  .com-cenas .pacote-cena {
    --pacote-l: 30vh;
    margin-top: 2.5rem;
  }

  .com-cenas .frase {
    max-width: none;
    font-size: 1.5rem;
  }

  .com-cenas .livro {
    --pagina-l: min(46vw, calc((100vh - 6.5rem) / 1.35));
    margin-top: 0;
  }

  .com-cenas .cena-acao {
    bottom: 0.5rem;
  }

  .com-cenas .mergulho {
    width: 34vh;
  }

  .com-cenas .mergulho-etiqueta {
    padding: var(--espaco-3);
  }

  .com-cenas .numeros {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: var(--espaco-3);
    margin-top: 2.5rem;
  }

  .com-cenas .numero dd {
    font-size: 2.5rem;
  }

  .com-cenas .numero dt {
    font-size: var(--texto-pequeno);
    line-height: 1.25;
  }

  .com-cenas .grupo {
    grid-template-columns: auto 1fr;
    column-gap: var(--espaco-5);
    width: min(88vw, 34rem);
  }

  .com-cenas .grupo-letra {
    font-size: 3.5rem;
  }

  .com-cenas .grupo-selecoes {
    grid-column: 2;
    grid-row: 1 / span 3;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    font-size: var(--texto-pequeno);
  }

  .com-cenas .voo {
    --voo-l: 34vh;
  }
}
````

## Comportamento (JavaScript)

### js/tema-acessibilidade.js

````js
// ============================================================================
// tema-acessibilidade.js
// ----------------------------------------------------------------------------
// Cuida de duas coisas:
//   1. Aplicar as preferências salvas (tema, tamanho da letra etc.) ANTES de a
//      página aparecer. Por isso este arquivo é chamado lá no <head>.
//   2. Montar o painel de acessibilidade e guardar o que a pessoa escolher.
//
// As preferências viram atributos no <html>, por exemplo:
//   <html data-tema="escuro" data-fonte="grande">
// e o CSS (tokens.css e acessibilidade.css) faz o resto.
//
// Onde fica guardado: no localStorage, uma "gaveta" do navegador que mantém
// pequenos textos mesmo depois de fechar a página.
// ============================================================================

(function () {
  'use strict';

  const CHAVE = 'colei.preferencias';

  // O que vale quando a pessoa ainda não escolheu nada
  const PADRAO = {
    tema: 'automatico',      // claro, escuro ou automatico (segue o aparelho)
    fonte: 'normal',         // normal, grande ou maior
    contraste: 'normal',     // normal ou alto
    movimento: 'normal',     // normal (segue o aparelho), reduzido ou completo
    espacamento: 'normal',   // normal ou amplo
    links: 'normal',         // normal ou destacados
  };

  // Os únicos valores aceitos. Qualquer outra coisa é ignorada.
  const VALORES = {
    tema: ['claro', 'escuro', 'automatico'],
    fonte: ['normal', 'grande', 'maior'],
    contraste: ['normal', 'alto'],
    movimento: ['normal', 'reduzido', 'completo'],
    espacamento: ['normal', 'amplo'],
    links: ['normal', 'destacados'],
  };

  // -------------------------------------------------------------------------
  // 1. Ler, guardar e aplicar
  // -------------------------------------------------------------------------

  function lerPreferencias() {
    const preferencias = Object.assign({}, PADRAO);
    try {
      const salvo = JSON.parse(localStorage.getItem(CHAVE) || '{}');
      for (const nome in PADRAO) {
        if (VALORES[nome].includes(salvo[nome])) preferencias[nome] = salvo[nome];
      }
    } catch (erro) {
      // localStorage bloqueado ou texto estragado: fica o padrão.
    }
    return preferencias;
  }

  function salvarPreferencias() {
    try {
      localStorage.setItem(CHAVE, JSON.stringify(preferencias));
    } catch (erro) {
      // Sem localStorage a escolha vale só até fechar a página.
    }
  }

  // Pergunta ao aparelho se ele está em modo escuro
  const sistemaEscuro = window.matchMedia('(prefers-color-scheme: dark)');

  function aplicar() {
    const raiz = document.documentElement; // o <html>

    let tema = preferencias.tema;
    if (tema === 'automatico') tema = sistemaEscuro.matches ? 'escuro' : 'claro';

    raiz.setAttribute('data-tema', tema);
    raiz.setAttribute('data-fonte', preferencias.fonte);
    raiz.setAttribute('data-contraste', preferencias.contraste);
    raiz.setAttribute('data-movimento', preferencias.movimento);
    raiz.setAttribute('data-espacamento', preferencias.espacamento);
    raiz.setAttribute('data-links', preferencias.links);
  }

  const preferencias = lerPreferencias();

  // Atalho pelo endereço: index.html?tema=escuro abre no tema escuro sem mexer
  // no que está salvo. Serve para mandar um link e para tirar os prints.
  const doEndereco = new URLSearchParams(window.location.search);
  for (const nome in PADRAO) {
    if (VALORES[nome].includes(doEndereco.get(nome))) preferencias[nome] = doEndereco.get(nome);
  }

  aplicar();

  // Avisa o CSS de que o JavaScript está ligado (mostra os botões que dependem dele)
  document.documentElement.classList.add('com-js');

  // Se o aparelho trocar de claro para escuro com a página aberta, acompanha
  sistemaEscuro.addEventListener('change', aplicar);

  // Deixa outro script do site guardar uma preferência, do mesmo jeito que o
  // painel faz. Exemplo: guardarPreferencia('movimento', 'completo').
  window.guardarPreferencia = function (nome, valor) {
    if (!VALORES[nome] || !VALORES[nome].includes(valor)) return;
    preferencias[nome] = valor;
    salvarPreferencias();
    aplicar();
  };

  // -------------------------------------------------------------------------
  // 2. O painel
  // -------------------------------------------------------------------------

  const HTML_DO_PAINEL = `
    <dialog class="painel" id="painel-acessibilidade" aria-labelledby="painel-titulo">
      <div class="painel-dentro">
        <div class="painel-cabeca">
          <h2 id="painel-titulo">Acessibilidade</h2>
          <button type="button" class="botao botao-contorno" data-fechar>Fechar</button>
        </div>

        <p class="texto-apoio">As mudanças valem na hora e ficam salvas neste navegador.</p>

        <fieldset class="painel-grupo">
          <legend>Tema</legend>
          <label class="opcao"><input type="radio" name="tema" value="claro"> Claro</label>
          <label class="opcao"><input type="radio" name="tema" value="escuro"> Escuro</label>
          <label class="opcao"><input type="radio" name="tema" value="automatico"> Automático (segue o aparelho)</label>
        </fieldset>

        <fieldset class="painel-grupo">
          <legend>Tamanho da letra</legend>
          <label class="opcao"><input type="radio" name="fonte" value="normal"> Normal</label>
          <label class="opcao"><input type="radio" name="fonte" value="grande"> Grande</label>
          <label class="opcao"><input type="radio" name="fonte" value="maior"> Maior</label>
        </fieldset>

        <fieldset class="painel-grupo">
          <legend>Ajustes de leitura</legend>
          <label class="opcao"><input type="checkbox" name="contraste" value="alto"> Alto contraste</label>
          <label class="opcao"><input type="checkbox" name="movimento" value="reduzido"> Reduzir animações</label>
          <label class="opcao" data-so-com-menos-movimento><input type="checkbox" name="movimento" value="completo"> Mostrar as animações, mesmo com o aparelho pedindo menos</label>
          <label class="opcao"><input type="checkbox" name="espacamento" value="amplo"> Mais espaço no texto</label>
          <label class="opcao"><input type="checkbox" name="links" value="destacados"> Destacar links</label>
        </fieldset>

        <div class="painel-pe">
          <button type="button" class="botao botao-contorno" data-padrao>Voltar ao padrão</button>
          <p class="painel-aviso" role="status"></p>
        </div>
      </div>
    </dialog>`;

  function montarPainel() {
    const botaoAbrir = document.getElementById('abrir-acessibilidade');
    if (!botaoAbrir) return;

    document.body.insertAdjacentHTML('beforeend', HTML_DO_PAINEL);
    const painel = document.getElementById('painel-acessibilidade');

    // Navegador muito antigo, sem <dialog>: esconde o botão em vez de quebrar.
    if (typeof painel.showModal !== 'function') {
      botaoAbrir.hidden = true;
      return;
    }

    const aviso = painel.querySelector('.painel-aviso');
    const campos = painel.querySelectorAll('input');

    // Marca nos campos o que está valendo agora
    function mostrarNosCampos() {
      campos.forEach(function (campo) {
        campo.checked = preferencias[campo.name] === campo.value;
      });
    }

    // A opção de mostrar as animações só faz sentido quando o aparelho pede menos movimento
    const pedeMenosMovimento = window.matchMedia('(prefers-reduced-motion: reduce)');

    botaoAbrir.addEventListener('click', function () {
      painel.querySelector('[data-so-com-menos-movimento]').hidden = !pedeMenosMovimento.matches;
      mostrarNosCampos();
      aviso.textContent = '';
      painel.showModal(); // abre por cima da página e prende o foco dentro
    });

    painel.querySelector('[data-fechar]').addEventListener('click', function () {
      painel.close(); // o navegador devolve o foco para o botão que abriu
    });

    // Clicar no fundo escurecido (fora da caixa) também fecha
    painel.addEventListener('click', function (evento) {
      if (evento.target === painel) painel.close();
    });

    campos.forEach(function (campo) {
      campo.addEventListener('change', function () {
        const nomeDaOpcao = campo.closest('label').textContent.trim();

        if (campo.type === 'checkbox') {
          preferencias[campo.name] = campo.checked ? campo.value : 'normal';
          aviso.textContent = nomeDaOpcao + (campo.checked ? ': ligado.' : ': desligado.');
        } else {
          preferencias[campo.name] = campo.value;
          const pergunta = campo.closest('fieldset').querySelector('legend').textContent;
          aviso.textContent = pergunta + ': ' + nomeDaOpcao + '.';
        }

        salvarPreferencias();
        aplicar();
        mostrarNosCampos();   // "reduzir" e "mostrar" são a mesma preferência: marcar uma desmarca a outra
      });
    });

    painel.querySelector('[data-padrao]').addEventListener('click', function () {
      Object.assign(preferencias, PADRAO);
      salvarPreferencias();
      aplicar();
      mostrarNosCampos();
      aviso.textContent = 'Tudo de volta ao padrão.';
    });
  }

  // O painel só pode ser montado depois que o <body> existir
  document.addEventListener('DOMContentLoaded', montarPainel);
})();
````

### js/menu.js

````js
// ============================================================================
// menu.js
// ----------------------------------------------------------------------------
// Em telas pequenas, o menu fica recolhido atrás do botão "Menu".
// Este arquivo abre e fecha o menu e conta isso ao leitor de tela pelo
// atributo aria-expanded ("expandido: sim ou não").
// Em telas grandes o CSS mostra o menu sempre aberto e esconde o botão.
//
// Também troca o link "Entrar" por "Minha conta" quando alguém já entrou.
// ============================================================================

// Quem entrou no site fica anotado no localStorage (ver js/login.js).
// Se houver alguém, o link "Entrar" do menu passa a dizer "Minha conta".
function atualizarLinkDaConta() {
  let entrou = false;
  try {
    const sessao = JSON.parse(localStorage.getItem('colei.sessao'));
    entrou = Boolean(sessao && sessao.email);
  } catch (erro) {
    // Sem localStorage, ninguém entrou.
  }
  for (const link of document.querySelectorAll('.menu-entrar')) {
    link.textContent = entrou ? 'Minha conta' : 'Entrar';
  }
}

document.addEventListener('DOMContentLoaded', function () {
  atualizarLinkDaConta();

  const botao = document.querySelector('.botao-menu');
  const menu = document.getElementById('menu-principal');
  if (!botao || !menu) return;

  function definirAberto(aberto) {
    botao.setAttribute('aria-expanded', String(aberto));
    menu.classList.toggle('menu-aberto', aberto);
  }

  botao.addEventListener('click', function () {
    const estaAberto = botao.getAttribute('aria-expanded') === 'true';
    definirAberto(!estaAberto);
  });

  // A tecla Esc fecha o menu e devolve o foco para o botão
  document.addEventListener('keydown', function (evento) {
    const estaAberto = botao.getAttribute('aria-expanded') === 'true';
    if (evento.key === 'Escape' && estaAberto) {
      definirAberto(false);
      botao.focus();
    }
  });
});
````

### js/efeitos.js

````js
// ============================================================================
// efeitos.js
// ----------------------------------------------------------------------------
// Dois efeitos que valem nas 7 páginas e respondem ao ponteiro (o mouse):
//
//   1. Retícula que acende: os pontinhos de impressão aparecem no papel em
//      volta do ponteiro, como uma lanterna passando pela página.
//   2. Lendária holográfica: a figurinha lendária inclina e o brilho colorido
//      corre conforme o ponteiro passa por cima dela.
//
// Nos dois casos o JavaScript só anota a posição do ponteiro em variáveis do
// CSS (--x, --y, --px, --py...). Quem desenha é o CSS (base.css e componentes.css).
//
// Não depende de nenhum outro arquivo do site.
// ============================================================================

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // A pessoa pediu menos movimento? (no painel de acessibilidade ou no aparelho)
  // "completo" é o pedido contrário: ver as animações mesmo que o aparelho peça menos.
  function querMenosMovimento() {
    const pedido = document.documentElement.dataset.movimento;
    if (pedido === 'reduzido') return true;
    if (pedido === 'completo') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  // -------------------------------------------------------------------------
  // 1. Retícula que acende
  // -------------------------------------------------------------------------
  // Uma camada do tamanho da tela, atrás de tudo, coberta de pontinhos. Uma
  // máscara (no CSS) só deixa ver os que estão perto do ponteiro. A posição
  // fica guardada na própria camada, que não tem nada dentro: assim, mexer o
  // mouse não obriga o navegador a recalcular o estilo da página inteira.

  const lanterna = document.createElement('div');
  lanterna.className = 'lanterna';
  lanterna.setAttribute('aria-hidden', 'true');   // é só enfeite
  document.body.prepend(lanterna);

  function apagarLanterna() {
    lanterna.classList.remove('lanterna-acesa');
  }

  // -------------------------------------------------------------------------
  // 2. Lendária holográfica
  // -------------------------------------------------------------------------

  let brilhando = null;   // a figurinha lendária que está sob o ponteiro agora

  function apagarBrilho() {
    if (!brilhando) return;
    for (const nome of ['--px', '--py', '--rx', '--ry', '--brilho', '--tempo-do-movimento']) {
      brilhando.style.removeProperty(nome);
    }
    brilhando = null;
  }

  // -------------------------------------------------------------------------
  // Um ouvinte só para o site inteiro
  // -------------------------------------------------------------------------

  document.addEventListener('pointermove', function (evento) {
    const parado = querMenosMovimento();

    // A lanterna segue só o mouse. No celular não existe ponteiro parado em cima da página.
    if (evento.pointerType === 'mouse' && !parado) {
      lanterna.style.setProperty('--x', evento.clientX + 'px');
      lanterna.style.setProperty('--y', evento.clientY + 'px');
      lanterna.classList.add('lanterna-acesa');
    } else {
      apagarLanterna();
    }

    // A figurinha lendária que está embaixo do ponteiro (se houver uma, e de frente)
    let figurinha = evento.target.closest ? evento.target.closest('.figurinha-lendaria') : null;
    if (figurinha && (figurinha.dataset.face === 'verso' || figurinha.dataset.face === 'costas')) figurinha = null;
    if (figurinha !== brilhando) apagarBrilho();
    if (!figurinha) return;
    brilhando = figurinha;

    const caixa = figurinha.getBoundingClientRect();
    const x = (evento.clientX - caixa.left) / caixa.width;    // 0 na esquerda, 1 na direita
    const y = (evento.clientY - caixa.top) / caixa.height;    // 0 em cima, 1 embaixo
    figurinha.style.setProperty('--px', (x * 100).toFixed(1) + '%');
    figurinha.style.setProperty('--py', (y * 100).toFixed(1) + '%');
    figurinha.style.setProperty('--brilho', '0.9');
    // Com menos movimento, a figurinha não inclina: fica só o brilho
    if (!parado) {
      figurinha.style.setProperty('--ry', ((x - 0.5) * 22).toFixed(1) + 'deg');
      figurinha.style.setProperty('--rx', ((0.5 - y) * 22).toFixed(1) + 'deg');
      figurinha.style.setProperty('--tempo-do-movimento', '160ms');   // inclina rápido, para acompanhar o ponteiro
    }
  });

  // Ao clicar, a figurinha vai virar: ela volta ao prumo antes, para o giro
  // sair inteiro. O "true" faz este ouvinte rodar antes do clique da figurinha.
  document.addEventListener('click', apagarBrilho, true);

  // O ponteiro saiu da janela
  document.documentElement.addEventListener('pointerleave', function () {
    apagarLanterna();
    apagarBrilho();
  });
});
````

### js/estado.js

````js
// ============================================================================
// estado.js
// ----------------------------------------------------------------------------
// O "caderninho" do álbum: guarda no navegador o que a pessoa já ganhou, o que
// já colou, os pacotinhos, a sequência de dias e as conquistas.
//
// Onde fica guardado: no localStorage, uma gaveta que todo navegador tem e que
// continua lá depois de fechar a página. A gaveta só guarda texto. Por isso o
// álbum vira texto na hora de guardar (JSON.stringify) e volta a ser objeto na
// hora de ler (JSON.parse).
//
// Cada pessoa tem a sua gaveta: o nome da gaveta leva quem entrou no site.
// Enquanto ninguém entrou, a gaveta é "colei.album.visitante".
//
// Depende de: js/dados.js (as listas SELECOES e FIGURINHAS).
// ============================================================================

const FIGURINHAS_POR_PACOTINHO = 5;

// Chance de cada raridade sair. Pense em uma urna de sorteio: cada figurinha
// comum entra com 6 bilhetes, cada brilhante com 3 e cada lendária com 1.
const BILHETES_DA_RARIDADE = { comum: 6, brilhante: 3, lendaria: 1 };

// As conquistas do álbum. Cada uma vale um pacotinho extra.
// A regra de cada uma está na função conquistaFeita(), mais abaixo.
const CONQUISTAS = [
  { id: 'primeira-colada', nome: 'Primeira colada', como: 'Cole a sua primeira figurinha.' },
  { id: 'achei-lendaria', nome: 'Achei uma lendária', como: 'Tire uma figurinha lendária no pacotinho.' },
  { id: 'selecao-completa', nome: 'Seleção completa', como: 'Cole as 6 figurinhas de uma seleção.' },
  { id: 'tres-dias', nome: 'Três dias seguidos', como: 'Abra o pacotinho do dia três dias seguidos.' },
  { id: 'meio-album', nome: 'Meio álbum', como: 'Cole metade das figurinhas do álbum.' },
  { id: 'grupo-fechado', nome: 'Grupo fechado', como: 'Cole todas as figurinhas de um grupo.' },
  { id: 'primeira-troca', nome: 'Primeira troca', como: 'Troque uma repetida na banca de trocas.' },
];

// ---------------------------------------------------------------------------
// 1. Ler e guardar
// ---------------------------------------------------------------------------

// Quem está usando o álbum agora. A página Entrar grava a sessão;
// sem sessão, a pessoa é "visitante".
function usuarioAtual() {
  try {
    const sessao = JSON.parse(localStorage.getItem('colei.sessao'));
    if (sessao && sessao.email) return sessao.email;
  } catch (erro) {
    // Sem sessão ou gaveta bloqueada: segue como visitante.
  }
  return 'visitante';
}

function chaveDoAlbum() {
  return 'colei.album.' + usuarioAtual();
}

// Um álbum que ainda não tem nada
function albumVazio() {
  return {
    quantidade: {},   // quantas cópias de cada figurinha já saíram: { "50": 2, "54": 1 }
    coladas: [],      // números das figurinhas coladas: [50, 54]
    extras: 0,        // pacotinhos extras guardados
    pacotinhos: 0,    // quantos pacotinhos já foram abertos
    trocas: 0,        // quantas trocas já foram feitas na banca
    ultimoDia: '',    // dia do último pacotinho grátis, no formato "2026-11-19"
    sequencia: 0,     // dias seguidos abrindo o pacotinho grátis
    conquistas: {},   // conquistas feitas e o dia de cada uma: { "primeira-colada": "2026-11-19" }
  };
}

// Se o navegador bloquear o localStorage (acontece em janela anônima de alguns
// navegadores), o álbum fica guardado aqui, uma reserva por pessoa, e vale só
// até fechar a página.
const albunsDeReserva = {};

function lerAlbum() {
  const chave = chaveDoAlbum();
  let texto = null;
  try {
    texto = localStorage.getItem(chave);
  } catch (erro) {
    // Gaveta bloqueada: vale a reserva, logo abaixo.
  }
  if (texto === null && albunsDeReserva[chave]) texto = albunsDeReserva[chave];

  try {
    const salvo = JSON.parse(texto);
    // Object.assign completa o que estiver faltando com os valores do álbum vazio
    if (salvo && typeof salvo === 'object') return Object.assign(albumVazio(), salvo);
  } catch (erro) {
    // Texto estragado: começa um álbum novo.
  }
  return albumVazio();
}

function salvarAlbum(album) {
  const chave = chaveDoAlbum();
  const texto = JSON.stringify(album);
  try {
    localStorage.setItem(chave, texto);
    delete albunsDeReserva[chave];   // guardou na gaveta: a reserva não é mais necessária
  } catch (erro) {
    albunsDeReserva[chave] = texto;  // não deu para guardar: fica na reserva
  }
}

// Apaga tudo de quem está usando o álbum agora
function zerarAlbum() {
  const chave = chaveDoAlbum();
  delete albunsDeReserva[chave];
  try {
    localStorage.removeItem(chave);
  } catch (erro) {
    // Nada a apagar.
  }
}

// ---------------------------------------------------------------------------
// 2. Perguntas sobre o álbum
// ---------------------------------------------------------------------------

function quantasTenho(album, numero) {
  return album.quantidade[numero] || 0;
}

function estaColada(album, numero) {
  return album.coladas.includes(numero);
}

// Repetidas: tudo o que passar de uma cópia (a primeira é a do álbum)
function repetidasDe(album, numero) {
  return Math.max(0, quantasTenho(album, numero) - 1);
}

// Está na mão: já saiu no pacotinho, mas ainda não foi colada
function estaNaMao(album, numero) {
  return quantasTenho(album, numero) > 0 && !estaColada(album, numero);
}

// Quantas figurinhas de uma lista estão coladas
function contarColadas(album, figurinhas) {
  let conta = 0;
  for (const fig of figurinhas) {
    if (estaColada(album, fig.numero)) conta += 1;
  }
  return conta;
}

function figurinhasDaSelecao(idDaSelecao) {
  return FIGURINHAS.filter(function (fig) { return fig.selecao === idDaSelecao; });
}

function figurinhasDoGrupo(grupo) {
  return FIGURINHAS.filter(function (fig) {
    const selecao = SELECOES.find(function (s) { return s.id === fig.selecao; });
    return selecao.grupo === grupo;
  });
}

// As letras dos grupos que já têm figurinhas, sem repetir: ["C"]
function gruposDoAlbum() {
  const grupos = [];
  for (const selecao of SELECOES) {
    if (!grupos.includes(selecao.grupo)) grupos.push(selecao.grupo);
  }
  return grupos;
}

// Os números do placar
function resumoDoAlbum(album) {
  const total = FIGURINHAS.length;
  const coladas = contarColadas(album, FIGURINHAS);
  let tenho = 0;
  let naMao = 0;
  let comRepetida = 0;
  for (const fig of FIGURINHAS) {
    if (quantasTenho(album, fig.numero) > 0) tenho += 1;
    if (estaNaMao(album, fig.numero)) naMao += 1;
    if (repetidasDe(album, fig.numero) > 0) comRepetida += 1;
  }
  return {
    total: total,
    coladas: coladas,
    faltaColar: total - coladas,
    porcento: Math.round((coladas / total) * 100),
    tenho: tenho,                 // figurinhas diferentes que já saíram
    faltam: total - tenho,        // figurinhas que ainda não saíram
    naMao: naMao,
    comRepetida: comRepetida,     // figurinhas diferentes com pelo menos uma repetida
  };
}

// ---------------------------------------------------------------------------
// 3. Datas (para o pacotinho do dia e a sequência)
// ---------------------------------------------------------------------------

// Transforma uma data em texto "2026-11-19", no horário do aparelho
function dataEmTexto(data) {
  const ano = data.getFullYear();
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const dia = String(data.getDate()).padStart(2, '0');
  return ano + '-' + mes + '-' + dia;
}

function hoje() {
  return dataEmTexto(new Date());
}

function ontem() {
  const data = new Date();
  data.setDate(data.getDate() - 1);
  return dataEmTexto(data);
}

// "2026-11-19" vira "19/11/2026"
function dataPorExtenso(texto) {
  const partes = texto.split('-');
  return partes[2] + '/' + partes[1] + '/' + partes[0];
}

function temPacotinhoDoDia(album) {
  return album.ultimoDia !== hoje();
}

function temPacotinho(album) {
  return temPacotinhoDoDia(album) || album.extras > 0;
}

// ---------------------------------------------------------------------------
// 4. Conquistas
// ---------------------------------------------------------------------------

// A regra de cada conquista. Devolve true se ela já foi cumprida.
function conquistaFeita(id, album) {
  if (id === 'primeira-colada') {
    return album.coladas.length >= 1;
  }
  if (id === 'achei-lendaria') {
    return FIGURINHAS.some(function (fig) {
      return fig.raridade === 'lendaria' && quantasTenho(album, fig.numero) > 0;
    });
  }
  if (id === 'selecao-completa') {
    return SELECOES.some(function (selecao) {
      const lista = figurinhasDaSelecao(selecao.id);
      return contarColadas(album, lista) === lista.length;
    });
  }
  if (id === 'tres-dias') {
    return album.sequencia >= 3;
  }
  if (id === 'meio-album') {
    return album.coladas.length >= Math.ceil(FIGURINHAS.length / 2);
  }
  if (id === 'grupo-fechado') {
    return gruposDoAlbum().some(function (grupo) {
      const lista = figurinhasDoGrupo(grupo);
      return contarColadas(album, lista) === lista.length;
    });
  }
  if (id === 'primeira-troca') {
    return album.trocas >= 1;
  }
  return false;
}

// Confere se alguma conquista nova foi cumprida. Cada conquista nova é
// anotada com a data e vale um pacotinho extra. Devolve os nomes das novas.
function conferirConquistas(album) {
  const novas = [];
  for (const conquista of CONQUISTAS) {
    const jaAnotada = Boolean(album.conquistas[conquista.id]);
    if (!jaAnotada && conquistaFeita(conquista.id, album)) {
      album.conquistas[conquista.id] = hoje();
      album.extras += 1;
      novas.push(conquista.nome);
    }
  }
  return novas;
}

// ---------------------------------------------------------------------------
// 5. Ações: abrir pacotinho, colar e descolar
// ---------------------------------------------------------------------------

// Sorteia figurinhas diferentes entre si, respeitando a chance de cada raridade
function sortearFigurinhas(quantas) {
  const urna = FIGURINHAS.slice();   // uma cópia da lista, para poder tirar figurinhas dela
  const sorteadas = [];

  while (sorteadas.length < quantas && urna.length > 0) {
    // Conta quantos bilhetes há na urna
    let bilhetes = 0;
    for (const fig of urna) bilhetes += BILHETES_DA_RARIDADE[fig.raridade];

    // Sorteia um bilhete e descobre de qual figurinha ele é
    let sorteado = Math.random() * bilhetes;
    let posicao = urna.length - 1;
    for (let i = 0; i < urna.length; i++) {
      sorteado -= BILHETES_DA_RARIDADE[urna[i].raridade];
      if (sorteado < 0) {
        posicao = i;
        break;
      }
    }

    sorteadas.push(urna[posicao]);
    urna.splice(posicao, 1);   // sai da urna: não repete no mesmo pacotinho
  }
  return sorteadas;
}

// Abre um pacotinho: primeiro o grátis do dia; se já foi aberto hoje, um extra.
// Devolve null se não há pacotinho, ou um objeto com:
//   figurinhas: lista de { figurinha, nova }   (nova = ainda não tinha)
//   conquistas: nomes das conquistas feitas com este pacotinho
function abrirPacotinho() {
  const album = lerAlbum();
  const eDoDia = temPacotinhoDoDia(album);
  if (!eDoDia && album.extras < 1) return null;

  if (eDoDia) {
    // Abriu ontem também? A sequência cresce. Senão, recomeça do 1.
    album.sequencia = album.ultimoDia === ontem() ? album.sequencia + 1 : 1;
    album.ultimoDia = hoje();
  } else {
    album.extras -= 1;
  }
  album.pacotinhos += 1;

  const figurinhas = [];
  for (const fig of sortearFigurinhas(FIGURINHAS_POR_PACOTINHO)) {
    const nova = quantasTenho(album, fig.numero) === 0;
    album.quantidade[fig.numero] = quantasTenho(album, fig.numero) + 1;
    figurinhas.push({ figurinha: fig, nova: nova });
  }

  const conquistas = conferirConquistas(album);
  salvarAlbum(album);
  return { figurinhas: figurinhas, conquistas: conquistas };
}

// Cola uma figurinha que está na mão. Devolve os nomes das conquistas novas,
// ou null se não deu para colar (não tem a figurinha ou ela já está colada).
function colarFigurinha(numero) {
  const album = lerAlbum();
  if (!estaNaMao(album, numero)) return null;

  album.coladas.push(numero);
  const conquistas = conferirConquistas(album);
  salvarAlbum(album);
  return conquistas;
}

// Desfaz a colagem: a figurinha volta para a mão.
// (Conquista já feita continua feita.)
function descolarFigurinha(numero) {
  const album = lerAlbum();
  album.coladas = album.coladas.filter(function (colada) { return colada !== numero; });
  salvarAlbum(album);
}

// Troca na banca (simulação): sai uma repetida e chega uma figurinha que faltava.
// Devolve os nomes das conquistas novas, ou null se a troca não vale
// (a figurinha dada não é repetida, ou a recebida a pessoa já tem).
function trocarFigurinha(numeroQueSai, numeroQueChega) {
  const album = lerAlbum();
  if (repetidasDe(album, numeroQueSai) < 1) return null;
  if (quantasTenho(album, numeroQueChega) > 0) return null;

  album.quantidade[numeroQueSai] -= 1;
  album.quantidade[numeroQueChega] = 1;
  album.trocas += 1;

  const conquistas = conferirConquistas(album);
  salvarAlbum(album);
  return conquistas;
}

// Modo demonstração: ganha pacotinhos extras de uma vez
function ganharPacotinhosExtras(quantos) {
  const album = lerAlbum();
  album.extras += quantos;
  salvarAlbum(album);
}

// ---------------------------------------------------------------------------
// 6. Cartela da sequência (aparece nas páginas Início e Pacotinhos)
// ---------------------------------------------------------------------------

// A sequência só continua valendo se o último pacotinho do dia foi aberto
// hoje ou ontem. Passou disso, ela recomeça no próximo pacotinho.
function sequenciaAtual(album) {
  const emDia = album.ultimoDia === hoje() || album.ultimoDia === ontem();
  return emDia ? album.sequencia : 0;
}

// Carimba as casas da cartela (uma lista com 7 itens) e devolve a frase que
// explica a sequência. No 8º dia a cartela recomeça: 8 dias marcam 1 casa.
function marcarCartela(lista, album) {
  const dias = sequenciaAtual(album);
  const marcadas = dias === 0 ? 0 : ((dias - 1) % 7) + 1;
  const casas = lista.querySelectorAll('li');

  for (let i = 0; i < casas.length; i++) {
    const carimbado = i < marcadas;
    casas[i].classList.toggle('carimbado', carimbado);
    // O texto escondido é para o leitor de tela: "Dia 2, carimbado"
    casas[i].innerHTML = '<span class="cartela-dia"><span class="escondido">Dia </span>' + (i + 1) +
      (carimbado ? '<span class="escondido">, carimbado</span>' : '') + '</span>';
  }

  if (dias === 0) return 'Nenhum dia marcado. Cada pacotinho do dia ganha um carimbo.';
  let frase = dias === 1 ? '1 dia marcado.' : dias + ' dias seguidos.';
  if (temPacotinhoDoDia(album)) frase += ' Abra o pacotinho de hoje para a sequência não parar.';
  else frase += ' Volte amanhã para continuar.';
  return frase;
}
````

### js/figurinha.js

````js
// ============================================================================
// figurinha.js
// ----------------------------------------------------------------------------
// Desenha uma figurinha na tela a partir de um registro de js/dados.js e cuida
// de virá-la: frente (retrato), verso (informações) e costas (quando ela acabou
// de sair do pacotinho e ainda não foi revelada).
//
// Usado pelas páginas Álbum e Pacotinhos.
// Depende de: js/dados.js.
// ============================================================================

const NOME_DA_RARIDADE = { comum: 'Comum', brilhante: 'Brilhante', lendaria: 'Lendária' };
const ICONE_DA_RARIDADE = { comum: 'circulo', brilhante: 'losango', lendaria: 'estrela' };

// ---------------------------------------------------------------------------
// Ajudantes
// ---------------------------------------------------------------------------

function selecaoPorId(id) {
  return SELECOES.find(function (selecao) { return selecao.id === id; });
}

function figurinhaPorNumero(numero) {
  return FIGURINHAS.find(function (fig) { return fig.numero === numero; });
}

// Atalho para criar um elemento já com classe e texto
function criarElemento(tag, classe, texto) {
  const elemento = document.createElement(tag);
  if (classe) elemento.className = classe;
  if (texto !== undefined) elemento.textContent = texto;
  return elemento;
}

// Cada figurinha fica um pouco torta, como se tivesse sido colada à mão.
// A conta usa o número da figurinha: assim a mesma figurinha fica sempre
// torta do mesmo jeito, entre -1,4 e 1,4 grau.
function giroDaFigurinha(numero) {
  return ((numero * 7) % 5 - 2) * 0.7;
}

// A figurinha em uma frase, para o leitor de tela: "Nº 50, Alisson, Brasil, comum"
function descreverFigurinha(fig) {
  const selecao = selecaoPorId(fig.selecao);
  const quem = fig.tipo === 'bandeira' ? 'bandeira de ' + selecao.nome : fig.nome + ', ' + selecao.nome;
  return 'Nº ' + fig.numero + ', ' + quem + ', ' + NOME_DA_RARIDADE[fig.raridade].toLowerCase();
}

// As linhas do verso da figurinha
function linhasDoVerso(fig) {
  const selecao = selecaoPorId(fig.selecao);
  if (fig.tipo === 'bandeira') {
    return {
      dados: ['Grupo ' + selecao.grupo, 'Técnico: ' + selecao.tecnico],
      curiosidade: selecao.curiosidade,
    };
  }
  return {
    dados: [fig.posicao + ', camisa ' + fig.camisa, fig.clube],
    curiosidade: fig.curiosidade,
  };
}

// A pessoa pediu menos movimento? (no painel de acessibilidade ou no aparelho)
// "completo" é o pedido contrário: ver as animações mesmo que o aparelho peça menos.
function movimentoReduzido() {
  const pedido = document.documentElement.dataset.movimento;
  if (pedido === 'reduzido') return true;
  if (pedido === 'completo') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Escreve um recado para o leitor de tela. A página tem um parágrafo escondido
// com id="aviso" e role="status": tudo o que é escrito nele é lido em voz alta.
function avisar(texto) {
  const caixa = document.getElementById('aviso');
  if (!caixa) return;
  caixa.textContent = '';
  // A pequena espera faz o leitor de tela ler de novo mesmo se o texto for igual ao anterior
  setTimeout(function () { caixa.textContent = texto; }, 60);
}

// ---------------------------------------------------------------------------
// Desenho
// ---------------------------------------------------------------------------

// A frente: o retrato (ou a bandeira) em cima e a tarja com o texto embaixo
function preencherFrente(onde, fig, etiqueta) {
  const selecao = selecaoPorId(fig.selecao);

  if (etiqueta) onde.append(criarElemento('span', 'etiqueta', etiqueta));

  const arte = criarElemento('span', 'figurinha-arte');
  if (fig.tipo === 'bandeira') {
    const bandeira = document.createElement('img');
    bandeira.className = 'figurinha-bandeira';
    bandeira.src = 'assets/bandeiras/' + selecao.bandeira + '.svg';
    bandeira.alt = 'Bandeira';
    bandeira.draggable = false;   // quem é arrastada é a figurinha inteira, não só a imagem
    arte.append(bandeira);
  } else {
    // Retrato genérico: uma cabeça lisa e uma camisa com o número. Não é foto de ninguém.
    arte.innerHTML =
      '<svg class="figurinha-busto" viewBox="0 0 60 60" preserveAspectRatio="xMidYMax meet" aria-hidden="true" focusable="false">' +
      '<circle class="busto-cabeca" cx="30" cy="17" r="10"/>' +
      '<path class="busto-camisa" d="M7 61c0-15 9-24 23-24s23 9 23 24z"/>' +
      '<text class="busto-numero" x="30" y="57" text-anchor="middle">' + Number(fig.camisa) + '</text>' +
      '</svg>';
  }

  const tarja = criarElemento('span', 'figurinha-tarja');
  tarja.append(criarElemento('span', 'figurinha-nome', fig.nome));
  // A seleção vem escrita: as cores da camisa sozinhas não bastam para saber de quem é
  tarja.append(criarElemento('span', 'figurinha-selecao', fig.tipo === 'bandeira' ? 'Bandeira' : selecao.nome));

  const linha = criarElemento('span', 'figurinha-linha');
  const raridade = criarElemento('span', 'raridade');
  const icone = criarElemento('span', 'raridade-icone raridade-icone-' + ICONE_DA_RARIDADE[fig.raridade]);
  icone.setAttribute('aria-hidden', 'true');
  raridade.append(icone, NOME_DA_RARIDADE[fig.raridade]);
  linha.append(raridade, criarElemento('span', 'figurinha-numero', 'Nº ' + fig.numero));
  tarja.append(linha);

  onde.append(arte, tarja);
}

// O verso: número, nome, dois dados e uma curiosidade
function criarVerso(fig) {
  const verso = criarElemento('span', 'figurinha-face figurinha-verso');
  const linhas = linhasDoVerso(fig);
  verso.append(criarElemento('span', 'verso-numero', 'Nº ' + fig.numero));
  verso.append(criarElemento('span', 'verso-nome', fig.nome));
  for (const dado of linhas.dados) {
    verso.append(criarElemento('span', 'verso-dado', dado));
  }
  verso.append(criarElemento('span', 'verso-texto', linhas.curiosidade));
  return verso;
}

// Cria a figurinha. "opcoes" é um objeto com o que for preciso:
//   vira: true        a figurinha vira ao clicar (ela é um botão)
//   fechada: true     começa de costas, sem mostrar quem é (pacotinho)
//   solta: true       ainda não colada: sem sombra
//   etiqueta: 'Nova'  etiqueta presa no canto
//   dica: '...'       texto lido pelo leitor de tela enquanto ela está de costas
//   aoRevelar: função chamada quando a figurinha de costas é virada pela primeira vez
function criarFigurinha(fig, opcoes) {
  opcoes = opcoes || {};
  const selecao = selecaoPorId(fig.selecao);

  // Figurinha que vira é um <button>: com ele, Enter e Espaço já funcionam sozinhos
  const figurinha = document.createElement(opcoes.vira ? 'button' : 'div');
  figurinha.className = 'figurinha';
  if (opcoes.solta) figurinha.classList.add('figurinha-solta');
  figurinha.dataset.numero = fig.numero;

  // As cores da seleção e o giro entram como variáveis do CSS
  figurinha.style.setProperty('--campo', selecao.cores.campo);
  figurinha.style.setProperty('--camisa', selecao.cores.camisa);
  figurinha.style.setProperty('--numero', selecao.cores.numero);
  figurinha.style.setProperty('--giro', giroDaFigurinha(fig.numero) + 'deg');

  // Figurinha parada (a que está na mão): só a frente
  if (!opcoes.vira) {
    figurinha.classList.add('figurinha-' + fig.raridade);
    preencherFrente(figurinha, fig, opcoes.etiqueta);
    return figurinha;
  }

  // Figurinha que vira: as faces ficam uma em cima da outra e o atributo
  // data-face diz qual aparece (o CSS faz o giro).
  figurinha.type = 'button';
  figurinha.classList.add('figurinha-vira');

  const frente = criarElemento('span', 'figurinha-face figurinha-frente');
  preencherFrente(frente, fig, opcoes.etiqueta);
  figurinha.append(frente, criarVerso(fig));

  // Instrução lida só pelo leitor de tela
  const dica = criarElemento('span', 'escondido figurinha-dica', 'Virar para ver o verso.');
  figurinha.append(dica);

  if (opcoes.fechada) {
    const costas = criarElemento('span', 'figurinha-face figurinha-costas');
    costas.setAttribute('aria-hidden', 'true');
    costas.append(criarElemento('span', 'costas-marca', 'Colei!'));
    figurinha.append(costas);
    figurinha.dataset.face = 'costas';
    dica.textContent = opcoes.dica || 'Figurinha de costas. Virar.';
  } else {
    // A raridade só entra na classe quando a frente aparece:
    // de costas, a cor da moldura entregaria a surpresa.
    figurinha.classList.add('figurinha-' + fig.raridade);
    figurinha.dataset.face = 'frente';
  }

  figurinha.addEventListener('click', function () {
    virarFigurinha(figurinha, fig, opcoes.aoRevelar);
  });
  return figurinha;
}

// Vira a figurinha: costas -> frente (a revelação), frente <-> verso
function virarFigurinha(figurinha, fig, aoRevelar) {
  const dica = figurinha.querySelector('.figurinha-dica');

  if (figurinha.dataset.face === 'costas') {
    figurinha.classList.add('figurinha-' + fig.raridade);
    figurinha.dataset.face = 'frente';
    dica.textContent = 'Virar para ver o verso.';
    if (aoRevelar) aoRevelar(fig, figurinha);
    return;
  }

  if (figurinha.dataset.face === 'frente') {
    figurinha.dataset.face = 'verso';
    dica.textContent = 'Virar para ver a frente.';
    const linhas = linhasDoVerso(fig);
    avisar('Verso. Nº ' + fig.numero + ', ' + fig.nome + '. ' + linhas.dados.join('. ') + '. ' + linhas.curiosidade);
  } else {
    figurinha.dataset.face = 'frente';
    dica.textContent = 'Virar para ver o verso.';
    avisar('Frente. ' + descreverFigurinha(fig) + '.');
  }
}
````

### js/album.js

````js
// ============================================================================
// album.js
// ----------------------------------------------------------------------------
// A página do álbum. Faz quatro coisas:
//   1. Monta as páginas: grupo > seleção > uma "casa" para cada figurinha.
//   2. Mostra o que está na mão e cola: arrastando até a vaga ou pelo botão
//      "Colar". Dá para desfazer a última colagem.
//   3. Aplica a busca, as abas e os filtros.
//   4. Mantém o placar e as conquistas em dia.
//
// Depende de: js/dados.js, js/estado.js e js/figurinha.js.
// ============================================================================

// Espera o HTML ficar pronto antes de mexer na página
document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // O que está escolhido na busca, nas abas e nos filtros
  const escolha = { aba: 'todas', busca: '', grupo: '', selecao: '', posicao: '', raridade: '' };

  let ultimaColada = null;   // número da última figurinha colada: é a que o "Desfazer" descola
  let arrastando = null;     // número da figurinha que está sendo arrastada agora

  // Os pedaços da página que este arquivo usa
  const paginas = document.getElementById('paginas');
  const bandeja = document.getElementById('bandeja');
  const painel = document.getElementById('painel-album');
  const campoBusca = document.getElementById('busca');
  const recado = document.getElementById('recado');
  const abas = Array.from(document.querySelectorAll('.aba'));
  const filtros = {
    grupo: document.getElementById('filtro-grupo'),
    selecao: document.getElementById('filtro-selecao'),
    posicao: document.getElementById('filtro-posicao'),
    raridade: document.getElementById('filtro-raridade'),
  };

  // -------------------------------------------------------------------------
  // 1. Montar as páginas (feito uma vez só)
  // -------------------------------------------------------------------------

  function acrescentarOpcao(select, valor, texto) {
    const opcao = criarElemento('option', '', texto);
    opcao.value = valor;
    select.append(opcao);
  }

  // As opções dos filtros saem dos dados: assim nunca ficam diferentes do álbum
  function montarFiltros() {
    for (const grupo of gruposDoAlbum()) acrescentarOpcao(filtros.grupo, grupo, 'Grupo ' + grupo);
    for (const selecao of SELECOES) acrescentarOpcao(filtros.selecao, selecao.id, selecao.nome);
    for (const posicao of ['Goleiro', 'Defensor', 'Meio-campista', 'Atacante']) acrescentarOpcao(filtros.posicao, posicao, posicao);
    for (const raridade of ['comum', 'brilhante', 'lendaria']) acrescentarOpcao(filtros.raridade, raridade, NOME_DA_RARIDADE[raridade]);
  }

  // Uma linha da ficha da seleção: "Técnico" e o nome dele, por exemplo
  function acrescentarDado(lista, rotulo, valor) {
    lista.append(criarElemento('dt', '', rotulo), criarElemento('dd', '', valor));
  }

  // A página dupla de uma seleção: a ficha à esquerda e as seis casas à direita
  function montarSelecao(selecao) {
    const pagina = criarElemento('section', 'selecao dobra');
    pagina.id = 'selecao-' + selecao.id;
    pagina.setAttribute('aria-labelledby', 'titulo-' + selecao.id);

    const ficha = criarElemento('div', 'fluxo');
    const titulo = criarElemento('h3', 'selecao-titulo');
    titulo.id = 'titulo-' + selecao.id;
    titulo.append(criarBandeirinha(selecao), selecao.nome);

    const conta = criarElemento('p', 'selecao-conta');
    conta.id = 'conta-selecao-' + selecao.id;
    const barra = criarElemento('div', 'barra');
    barra.setAttribute('aria-hidden', 'true');
    const barraCheia = criarElemento('span', 'barra-cheia');
    barraCheia.id = 'barra-selecao-' + selecao.id;
    barra.append(barraCheia);

    const dados = criarElemento('dl', 'selecao-dados');
    acrescentarDado(dados, 'Técnico', selecao.tecnico);
    acrescentarDado(dados, 'Capitão', selecao.capitao);
    acrescentarDado(dados, 'Na fase de grupos', selecao.campanha);
    acrescentarDado(dados, 'Depois do grupo', selecao.depoisDoGrupo === 'a confirmar' ? 'A confirmar.' : selecao.depoisDoGrupo);

    ficha.append(titulo, conta, barra, dados, criarElemento('p', '', selecao.curiosidade));

    const vagas = criarElemento('ol', 'vagas');
    vagas.setAttribute('aria-label', 'Figurinhas: ' + selecao.nome);
    for (const fig of figurinhasDaSelecao(selecao.id)) {
      const casa = criarElemento('li', 'casa');
      casa.id = 'casa-' + fig.numero;
      casa.dataset.numero = fig.numero;
      vagas.append(casa);
    }

    // A lista fica dentro de uma caixa: é a caixa que recebe o espaço da dobra da página
    const direita = document.createElement('div');
    direita.append(vagas);

    pagina.append(ficha, direita);
    return pagina;
  }

  // A bandeirinha que acompanha o nome de uma seleção.
  // É decorativa (alt vazio): o nome vem sempre escrito ao lado.
  function criarBandeirinha(selecao) {
    const bandeira = document.createElement('img');
    bandeira.className = 'bandeirinha';
    bandeira.src = 'assets/bandeiras/' + selecao.bandeira + '.svg';
    bandeira.alt = '';
    bandeira.width = 48;
    bandeira.height = 36;
    bandeira.loading = 'lazy';   // só baixa a imagem quando ela está perto de aparecer na tela
    return bandeira;
  }

  // O índice: uma casa por grupo, que é um link para o grupo.
  // O preenchimento de cada casa é atualizado em atualizarPlacar().
  function montarIndice() {
    const indice = document.getElementById('indice-grupos');
    for (const grupo of gruposDoAlbum()) {
      const link = document.createElement('a');
      link.href = '#titulo-grupo-' + grupo;
      link.dataset.grupo = grupo;

      const quadro = criarElemento('span', 'tira-quadro');
      quadro.id = 'indice-quadro-' + grupo;
      const letra = document.createElement('span');
      const conta = criarElemento('span', 'escondido');
      conta.id = 'indice-conta-' + grupo;
      letra.append(criarElemento('span', 'escondido', 'Grupo '), grupo, conta);
      link.append(quadro, letra);

      // Se a busca ou um filtro estiver escondendo o grupo, limpa tudo antes de ir até ele
      link.addEventListener('click', function () {
        if (document.getElementById('titulo-grupo-' + grupo).closest('.grupo').hidden) limparFiltros();
      });

      const item = criarElemento('li', 'tira-casa');
      item.append(link);
      indice.append(item);
    }
  }

  // A última página do álbum: como a Copa terminou
  function montarFinal() {
    const campea = selecaoPorId(COPA.campea);
    const titulo = document.getElementById('final-campea');
    titulo.append(criarBandeirinha(campea), 'Seleção campeã: ' + campea.nome);

    document.getElementById('final-placar').textContent = COPA.final.placar + '. Gol de ' + COPA.final.gol + '.';
    document.getElementById('final-onde').textContent = 'A final foi em ' + COPA.final.data + ', no ' + COPA.final.estadio + '.';
    document.getElementById('final-numeros').textContent = 'A Copa teve ' + COPA.numeros.jogos + ' jogos e ' + COPA.numeros.gols + ' gols.';

    const podio = document.getElementById('final-podio');
    [COPA.campea, COPA.vice, COPA.terceiro, COPA.quarto].forEach(function (id, posicao) {
      const selecao = selecaoPorId(id);
      const item = document.createElement('li');
      item.append(criarElemento('span', 'podio-lugar', (posicao + 1) + 'º'), criarBandeirinha(selecao), selecao.nome);
      podio.append(item);
    });
    document.getElementById('final-terceiro').textContent = 'Disputa do terceiro lugar: ' + COPA.terceiroLugar.placar + ', em ' + COPA.terceiroLugar.data + '.';

    const premios = document.getElementById('final-premios');
    for (const premio of COPA.premios) {
      let quem = premio.nome + ' (' + selecaoPorId(premio.selecao).nome + ')';
      if (premio.detalhe) quem += ', ' + premio.detalhe;
      acrescentarDado(premios, premio.premio, quem);
    }
  }

  function montarPaginas() {
    for (const grupo of gruposDoAlbum()) {
      const secao = criarElemento('section', 'grupo');
      secao.setAttribute('aria-labelledby', 'titulo-grupo-' + grupo);

      const cabeca = criarElemento('div', 'grupo-cabeca');
      const titulo = criarElemento('h2', '', 'Grupo ' + grupo);
      titulo.id = 'titulo-grupo-' + grupo;
      const conta = criarElemento('p', 'grupo-conta');
      conta.id = 'conta-grupo-' + grupo;
      cabeca.append(titulo, conta);
      secao.append(cabeca);

      for (const selecao of SELECOES) {
        if (selecao.grupo === grupo) secao.append(montarSelecao(selecao));
      }
      paginas.append(secao);
    }
  }

  // -------------------------------------------------------------------------
  // 2. Desenhar o que muda: casas, bandeja, placar e conquistas
  // -------------------------------------------------------------------------

  function textoDeRepetidas(quantas) {
    if (quantas === 0) return '';
    return quantas === 1 ? '+1 repetida' : '+' + quantas + ' repetidas';
  }

  // O botão "Colar" de uma figurinha (o mesmo na vaga e na bandeja)
  function criarBotaoColar(fig) {
    const botao = criarElemento('button', 'botao botao-pequeno', 'Colar');
    botao.type = 'button';
    botao.dataset.colar = fig.numero;
    // Para o leitor de tela o botão diz qual figurinha cola: "Colar a figurinha 50, Alisson"
    botao.append(criarElemento('span', 'escondido', ' a figurinha ' + fig.numero + ', ' + fig.nome));
    return botao;
  }

  // Uma casa do álbum tem três situações: figurinha colada, vaga com a
  // figurinha na mão (mostra o botão "Colar") ou vaga em que ainda falta.
  function desenharCasa(numero, acabouDeColar) {
    const album = lerAlbum();
    const fig = figurinhaPorNumero(numero);
    const casa = document.getElementById('casa-' + numero);
    casa.textContent = '';   // apaga o desenho anterior
    // A batida (o anel de tinta e a tremida) vale só para a figurinha que acabou de ser colada
    casa.classList.toggle('bateu', acabouDeColar === true);

    if (estaColada(album, numero)) {
      const figurinha = criarFigurinha(fig, { vira: true, etiqueta: textoDeRepetidas(repetidasDe(album, numero)) });
      if (acabouDeColar) figurinha.classList.add('figurinha-colando');
      casa.append(figurinha);

      // Cola fresca: só a última figurinha colada tem o botão "Desfazer"
      if (numero === ultimaColada) {
        const desfazer = criarElemento('button', 'botao botao-contorno botao-pequeno', 'Desfazer');
        desfazer.type = 'button';
        desfazer.dataset.desfazer = numero;
        desfazer.append(criarElemento('span', 'escondido', ' a colagem da figurinha ' + numero));
        casa.append(desfazer);
      }
      return;
    }

    const vaga = criarElemento('div', 'vaga');
    vaga.append(criarElemento('span', 'vaga-numero', String(numero)));
    vaga.append(criarElemento('span', 'vaga-nome', fig.tipo === 'bandeira' ? 'Bandeira' : fig.nome));
    if (estaNaMao(album, numero)) {
      vaga.classList.add('vaga-na-mao');
      vaga.append(criarElemento('span', 'vaga-legenda', 'Está na sua mão'));
      vaga.append(criarBotaoColar(fig));
    } else {
      vaga.append(criarElemento('span', 'vaga-legenda', 'Falta'));
    }
    casa.append(vaga);
  }

  // A bandeja: as figurinhas que já saíram e ainda não foram coladas
  function desenharBandeja() {
    const album = lerAlbum();
    bandeja.textContent = '';
    let quantas = 0;

    for (const fig of FIGURINHAS) {
      if (!estaNaMao(album, fig.numero)) continue;
      quantas += 1;

      const figurinha = criarFigurinha(fig, { solta: true, etiqueta: textoDeRepetidas(repetidasDe(album, fig.numero)) });
      figurinha.draggable = true;   // liga o arrastar do próprio navegador

      const item = document.createElement('li');
      item.append(figurinha, criarBotaoColar(fig));
      bandeja.append(item);
    }

    let texto = 'Nada na mão por enquanto. As figurinhas que saem do pacotinho aparecem aqui, prontas para colar.';
    if (quantas === 1) texto = '1 figurinha para colar. Arraste até a vaga com o número dela ou use o botão Colar.';
    if (quantas > 1) texto = quantas + ' figurinhas para colar. Arraste cada uma até a vaga com o número dela ou use o botão Colar.';
    document.getElementById('mao-texto').textContent = texto;
    document.getElementById('mao-vazia').hidden = quantas > 0;
  }

  // "3 de 6 coladas"
  function textoDeColadas(coladas, total) {
    return coladas + ' de ' + total + (coladas === 1 ? ' colada' : ' coladas');
  }

  // O placar gira como um marcador antigo. Cada casa do número é uma janelinha
  // que mostra uma fita com os algarismos de 0 a 9, um embaixo do outro. Para
  // mostrar o 7, a fita sobe sete degraus (o CSS faz a subida, devagar).
  function mostrarNoOdometro(odometro, valor) {
    const algarismos = String(valor);
    odometro.dataset.valor = algarismos;

    // Cada fita sobe até o algarismo que lhe cabe
    function subir() {
      const atual = odometro.dataset.valor;
      Array.from(odometro.children).forEach(function (casa, i) {
        casa.firstChild.style.setProperty('--digito', atual[i]);
      });
    }

    // A quantidade de casas é a mesma (de 12 para 13, por exemplo): só gira
    if (odometro.children.length === algarismos.length) {
      subir();
      return;
    }

    // Mudou a quantidade de casas (de 9 para 10): monta as fitas de novo
    odometro.textContent = '';
    for (let i = 0; i < algarismos.length; i++) {
      const casa = criarElemento('span', 'odo-casa');
      const fita = criarElemento('span', 'odo-fita');
      for (let n = 0; n <= 9; n++) fita.append(criarElemento('span', '', String(n)));
      fita.style.transitionDelay = (i * 120) + 'ms';   // cada casa começa um pouco depois da anterior
      casa.append(fita);
      odometro.append(casa);
    }
    // As fitas nascem no zero. Dois quadros depois elas sobem: o navegador
    // precisa desenhar o zero primeiro para haver um caminho a percorrer.
    requestAnimationFrame(function () { requestAnimationFrame(subir); });
  }

  function atualizarPlacar() {
    const album = lerAlbum();
    const resumo = resumoDoAlbum(album);

    document.getElementById('placar-coladas').textContent = resumo.coladas;
    mostrarNoOdometro(document.getElementById('placar-odometro'), resumo.coladas);
    document.getElementById('placar-total').textContent = resumo.total;
    document.getElementById('placar-barra').style.setProperty('--parte', resumo.coladas / resumo.total);

    let texto = 'Falta colar tudo: o álbum está novinho.';
    if (resumo.coladas > 0) texto = 'Faltam ' + resumo.faltaColar + ' para completar. Você já colou ' + resumo.porcento + '% do álbum.';
    if (resumo.faltaColar === 1) texto = 'Falta só 1 para completar o álbum.';
    if (resumo.faltaColar === 0) texto = 'Álbum completo. Colou tudo!';
    document.getElementById('placar-texto').textContent = texto;

    for (const grupo of gruposDoAlbum()) {
      const lista = figurinhasDoGrupo(grupo);
      const coladas = contarColadas(album, lista);
      document.getElementById('conta-grupo-' + grupo).textContent = textoDeColadas(coladas, lista.length);
      // A casa do grupo no índice enche junto, e o leitor de tela ouve a conta
      document.getElementById('indice-quadro-' + grupo).style.setProperty('--parte', coladas / lista.length);
      document.getElementById('indice-conta-' + grupo).textContent = ': ' + textoDeColadas(coladas, lista.length);
    }
    for (const selecao of SELECOES) {
      const lista = figurinhasDaSelecao(selecao.id);
      const coladas = contarColadas(album, lista);
      document.getElementById('conta-selecao-' + selecao.id).textContent = textoDeColadas(coladas, lista.length);
      document.getElementById('barra-selecao-' + selecao.id).style.setProperty('--parte', coladas / lista.length);
    }

    // Os números das abas
    document.getElementById('conta-todas').textContent = resumo.total;
    document.getElementById('conta-tenho').textContent = resumo.tenho;
    document.getElementById('conta-faltam').textContent = resumo.faltam;
    document.getElementById('conta-repetidas').textContent = resumo.comRepetida;
  }

  // As conquistas que acabaram de sair e ainda não foram vistas. O carimbo
  // delas só bate quando o quadro aparece na tela (a lista fica lá no fim da
  // página, longe de onde a pessoa cola).
  const carimbosPorBater = [];
  const vigiaDosCarimbos = 'IntersectionObserver' in window ? new IntersectionObserver(function (entradas) {
    for (const entrada of entradas) {
      if (!entrada.isIntersecting) continue;
      entrada.target.classList.add('conquista-carimbando');   // o CSS faz o carimbo bater
      vigiaDosCarimbos.unobserve(entrada.target);
      const posicao = carimbosPorBater.indexOf(entrada.target.dataset.conquista);
      if (posicao >= 0) carimbosPorBater.splice(posicao, 1);
    }
  }, { threshold: 0.6 }) : null;

  // "novas" são os nomes das conquistas que acabaram de sair (ou nada)
  function desenharConquistas(novas) {
    const album = lerAlbum();
    const lista = document.getElementById('conquistas');
    lista.textContent = '';
    for (const nome of novas || []) {
      if (vigiaDosCarimbos && !movimentoReduzido() && !carimbosPorBater.includes(nome)) carimbosPorBater.push(nome);
    }

    for (const conquista of CONQUISTAS) {
      const dia = album.conquistas[conquista.id];
      const item = criarElemento('li', dia ? 'conquista conquista-feita' : 'conquista');
      item.append(criarElemento('span', 'conquista-nome', conquista.nome));
      item.append(criarElemento('span', 'conquista-como', conquista.como));
      item.append(criarElemento('span', 'conquista-estado', dia ? 'Feita em ' + dataPorExtenso(dia) : 'Ainda não'));
      lista.append(item);

      // Conquista nova: fica sem o carimbo até aparecer na tela
      if (dia && carimbosPorBater.includes(conquista.nome)) {
        item.classList.add('conquista-nova');
        item.dataset.conquista = conquista.nome;
        vigiaDosCarimbos.observe(item);
      }
    }
  }

  // -------------------------------------------------------------------------
  // 3. Busca, abas e filtros
  // -------------------------------------------------------------------------

  // "Vinícius" vira "vinicius": sem acento e em minúsculas,
  // para a busca achar mesmo que a pessoa não digite o acento.
  function semAcento(texto) {
    return String(texto).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  }

  // Esta figurinha passa pela aba, pelos filtros e pela busca escolhidos?
  function combina(fig, album) {
    const selecao = selecaoPorId(fig.selecao);
    const quantas = quantasTenho(album, fig.numero);

    if (escolha.aba === 'tenho' && quantas === 0) return false;
    if (escolha.aba === 'faltam' && quantas > 0) return false;
    if (escolha.aba === 'repetidas' && quantas < 2) return false;

    if (escolha.grupo && selecao.grupo !== escolha.grupo) return false;
    if (escolha.selecao && fig.selecao !== escolha.selecao) return false;
    if (escolha.posicao && fig.posicao !== escolha.posicao) return false;
    if (escolha.raridade && fig.raridade !== escolha.raridade) return false;

    // Busca: todas as palavras digitadas precisam aparecer em algum dado da figurinha
    const dados = semAcento([fig.numero, fig.nome, selecao.nome, fig.posicao || 'bandeira', fig.clube || '', NOME_DA_RARIDADE[fig.raridade]].join(' '));
    for (const palavra of semAcento(escolha.busca).split(' ')) {
      if (!dados.includes(palavra)) return false;
    }
    return true;
  }

  function aplicarFiltros() {
    const album = lerAlbum();
    let achadas = 0;

    for (const fig of FIGURINHAS) {
      const aparece = combina(fig, album);
      document.getElementById('casa-' + fig.numero).hidden = !aparece;
      if (aparece) achadas += 1;
    }

    // Seleção e grupo que ficaram sem nenhuma casa à mostra também somem
    for (const pagina of paginas.querySelectorAll('.selecao')) {
      pagina.hidden = pagina.querySelector('.casa:not([hidden])') === null;
    }
    for (const grupo of paginas.querySelectorAll('.grupo')) {
      grupo.hidden = grupo.querySelector('.selecao:not([hidden])') === null;
    }

    const filtrando = escolha.aba !== 'todas' || escolha.busca !== '' || escolha.grupo !== '' ||
      escolha.selecao !== '' || escolha.posicao !== '' || escolha.raridade !== '';

    let texto = achadas + ' figurinhas encontradas';
    if (achadas === 1) texto = '1 figurinha encontrada';
    if (achadas === 0) texto = 'Nenhuma figurinha encontrada';
    if (!filtrando) texto = achadas + ' figurinhas no álbum';

    document.getElementById('resultado').textContent = texto;
    document.getElementById('vazio').hidden = achadas > 0;
    document.getElementById('limpar-filtros').hidden = !filtrando;
  }

  // Marca uma aba como escolhida. Só a aba escolhida fica na ordem do Tab;
  // para ir às outras, usam-se as setas (padrão de abas do WAI-ARIA).
  function escolherAba(aba) {
    for (const outra of abas) {
      outra.setAttribute('aria-selected', outra === aba ? 'true' : 'false');
      outra.tabIndex = outra === aba ? 0 : -1;
    }
    painel.setAttribute('aria-labelledby', aba.id);
    escolha.aba = aba.dataset.aba;
    aplicarFiltros();
  }

  // -------------------------------------------------------------------------
  // 4. Colar e desfazer
  // -------------------------------------------------------------------------

  function mostrarRecado(texto, podeDesfazer) {
    document.getElementById('recado-texto').textContent = texto;
    document.getElementById('recado-desfazer').hidden = !podeDesfazer;
    recado.hidden = false;
    document.body.classList.add('com-recado');   // abre uma folga no fim da página (ver css/paginas.css)
    avisar(texto);   // o mesmo texto, lido pelo leitor de tela
  }

  function atualizarTudo(conquistasNovas) {
    desenharBandeja();
    atualizarPlacar();
    desenharConquistas(conquistasNovas);
    aplicarFiltros();
  }

  // "origem" diz de onde veio o pedido: 'vaga', 'bandeja' ou 'arrasto'
  function colar(numero, origem) {
    // Guarda a posição do botão na bandeja, para devolver o foco ao vizinho depois
    const botoesAntes = Array.from(bandeja.querySelectorAll('[data-colar]'));
    const posicao = botoesAntes.findIndex(function (botao) { return Number(botao.dataset.colar) === numero; });

    const conquistas = colarFigurinha(numero);
    if (conquistas === null) return;   // não estava na mão

    const anterior = ultimaColada;
    ultimaColada = numero;
    if (anterior !== null) desenharCasa(anterior);   // a colagem anterior perde o "Desfazer"
    desenharCasa(numero, true);
    atualizarTudo(conquistas);

    const fig = figurinhaPorNumero(numero);
    const resumo = resumoDoAlbum(lerAlbum());
    let texto = 'Colou a Nº ' + numero + ', ' + fig.nome + '.';
    if (resumo.faltaColar === 0) texto += ' Álbum completo!';
    if (resumo.faltaColar === 1) texto += ' Falta 1.';
    if (resumo.faltaColar > 1) texto += ' Faltam ' + resumo.faltaColar + '.';
    for (const nome of conquistas) {
      texto += ' Conquista: ' + nome + '. Você ganhou um pacotinho extra.';
    }
    mostrarRecado(texto, true);

    // Para onde vai o foco do teclado: o botão em que ele estava deixou de existir
    if (origem === 'vaga') {
      document.querySelector('#casa-' + numero + ' .figurinha').focus();
    }
    if (origem === 'bandeja') {
      const botoes = bandeja.querySelectorAll('[data-colar]');
      const vizinho = botoes[Math.min(posicao, botoes.length - 1)];
      if (vizinho) vizinho.focus();
      else document.getElementById('titulo-mao').focus();
    }
  }

  function desfazer() {
    if (ultimaColada === null) return;
    const numero = ultimaColada;
    ultimaColada = null;

    descolarFigurinha(numero);
    desenharCasa(numero);
    atualizarTudo();

    const fig = figurinhaPorNumero(numero);
    mostrarRecado('Desfeito. A Nº ' + numero + ', ' + fig.nome + ', voltou para a mão.', false);
    document.getElementById('recado-fechar').focus();
  }

  function fecharRecado() {
    recado.hidden = true;
    document.body.classList.remove('com-recado');
    // O foco estava no recado, que sumiu: volta para o começo do conteúdo, sem rolar a página
    document.getElementById('conteudo').focus({ preventScroll: true });
  }

  // -------------------------------------------------------------------------
  // 5. Ligar os botões, a busca, as abas e o arrastar
  // -------------------------------------------------------------------------

  // Um ouvinte só para todos os botões "Colar" e "Desfazer": como eles são
  // criados e apagados o tempo todo, é mais simples ouvir o clique na página
  // inteira e descobrir em que botão foi.
  document.addEventListener('click', function (evento) {
    const botaoColar = evento.target.closest('[data-colar]');
    if (botaoColar) {
      colar(Number(botaoColar.dataset.colar), botaoColar.closest('.bandeja') ? 'bandeja' : 'vaga');
    }
    if (evento.target.closest('[data-desfazer]')) desfazer();
  });

  document.getElementById('recado-desfazer').addEventListener('click', desfazer);
  document.getElementById('recado-fechar').addEventListener('click', fecharRecado);

  // Busca: espera a pessoa parar de digitar por um instante antes de procurar,
  // para o leitor de tela não anunciar um resultado a cada letra.
  let esperaDaBusca = null;
  campoBusca.addEventListener('input', function () {
    clearTimeout(esperaDaBusca);
    esperaDaBusca = setTimeout(function () {
      escolha.busca = campoBusca.value.trim();
      aplicarFiltros();
    }, 250);
  });

  for (const nome in filtros) {
    filtros[nome].addEventListener('change', function () {
      escolha[nome] = filtros[nome].value;
      aplicarFiltros();
    });
  }

  // Volta tudo ao começo: busca vazia, filtros em "Todos" e aba "Todas"
  function limparFiltros() {
    campoBusca.value = '';
    escolha.busca = '';
    for (const nome in filtros) {
      filtros[nome].value = '';
      escolha[nome] = '';
    }
    escolherAba(abas[0]);
  }

  document.getElementById('limpar-filtros').addEventListener('click', function () {
    limparFiltros();
    campoBusca.focus();
  });

  for (const aba of abas) {
    aba.addEventListener('click', function () { escolherAba(aba); });
  }

  // Setas, Home e End passam de uma aba para a outra
  document.querySelector('.abas').addEventListener('keydown', function (evento) {
    const atual = abas.indexOf(document.activeElement);
    let proxima = null;
    if (evento.key === 'ArrowRight') proxima = (atual + 1) % abas.length;
    if (evento.key === 'ArrowLeft') proxima = (atual - 1 + abas.length) % abas.length;
    if (evento.key === 'Home') proxima = 0;
    if (evento.key === 'End') proxima = abas.length - 1;
    if (atual === -1 || proxima === null) return;

    evento.preventDefault();   // a seta não rola a página
    abas[proxima].focus();
    escolherAba(abas[proxima]);
  });

  // Arrastar e soltar, com a API do próprio HTML.
  // 1) Começou a arrastar uma figurinha da bandeja: anota qual é e marca a vaga dela.
  bandeja.addEventListener('dragstart', function (evento) {
    const figurinha = evento.target.closest('.figurinha');
    if (!figurinha) return;
    arrastando = Number(figurinha.dataset.numero);
    evento.dataTransfer.setData('text/plain', String(arrastando));   // o Firefox só arrasta se houver algum dado
    evento.dataTransfer.effectAllowed = 'move';
    document.getElementById('casa-' + arrastando).classList.add('casa-alvo');
  });

  function terminarArrasto() {
    for (const casa of paginas.querySelectorAll('.casa-alvo, .casa-em-cima')) {
      casa.classList.remove('casa-alvo', 'casa-em-cima');
    }
    arrastando = null;
  }

  bandeja.addEventListener('dragend', terminarArrasto);

  // A casa embaixo do mouse é a da figurinha arrastada?
  function casaCerta(evento) {
    const casa = evento.target.closest('.casa');
    if (casa && arrastando !== null && Number(casa.dataset.numero) === arrastando) return casa;
    return null;
  }

  // 2) Passando por cima da vaga certa: o preventDefault() avisa o navegador
  //    que ali pode soltar. Nas outras vagas ele mostra o sinal de "proibido".
  paginas.addEventListener('dragover', function (evento) {
    const casa = casaCerta(evento);
    if (!casa) return;
    evento.preventDefault();
    casa.classList.add('casa-em-cima');
  });

  paginas.addEventListener('dragleave', function (evento) {
    const casa = evento.target.closest('.casa');
    if (casa && !casa.contains(evento.relatedTarget)) casa.classList.remove('casa-em-cima');
  });

  // 3) Soltou na vaga certa: cola.
  paginas.addEventListener('drop', function (evento) {
    const casa = casaCerta(evento);
    if (!casa) return;
    evento.preventDefault();
    const numero = arrastando;
    terminarArrasto();
    colar(numero, 'arrasto');
  });

  // -------------------------------------------------------------------------
  // 6. Começar
  // -------------------------------------------------------------------------

  montarFiltros();
  montarIndice();
  montarPaginas();
  montarFinal();
  for (const fig of FIGURINHAS) desenharCasa(fig.numero);
  atualizarTudo();

  // O campo desenhado no fim do álbum: o traço só começa quando ele aparece na
  // tela. Com menos movimento (ou em navegador antigo), ele já vem pronto.
  const campoDoFinal = document.getElementById('campo-do-final');
  if (campoDoFinal && 'IntersectionObserver' in window && !movimentoReduzido()) {
    campoDoFinal.classList.add('por-desenhar');
    const vigiaDoCampo = new IntersectionObserver(function (entradas) {
      if (!entradas[0].isIntersecting) return;
      campoDoFinal.classList.remove('por-desenhar');
      campoDoFinal.classList.add('desenhando');
      vigiaDoCampo.disconnect();
    }, { threshold: 0.4 });
    vigiaDoCampo.observe(campoDoFinal);
  }

  // Se o endereço veio com uma âncora (album.html#casa-50), rola até ela.
  // O navegador não faz isso sozinho porque as casas só passam a existir agora.
  if (location.hash.length > 1) {
    const alvo = document.getElementById(location.hash.slice(1));
    if (alvo) alvo.scrollIntoView();
  }
});
````

### js/pacotinho.js

````js
// ============================================================================
// pacotinho.js
// ----------------------------------------------------------------------------
// A página dos pacotinhos. O "palco" (lado direito) tem três situações:
//   1. Tem pacotinho para abrir: mostra o pacotinho e o botão "Rasgar".
//   2. Acabou de rasgar: as cinco figurinhas saem de costas e a pessoa vira
//      uma por uma. No fim, um resumo e o botão de colar as novas.
//   3. Não tem pacotinho: avisa que o próximo chega amanhã.
//
// Depende de: js/dados.js, js/estado.js e js/figurinha.js.
// ============================================================================

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  const palco = document.getElementById('palco');
  let rasgando = false;   // evita abrir dois pacotinhos com um clique duplo

  // Tempo da animação de rasgar, em milésimos de segundo (igual ao do CSS)
  const TEMPO_DE_RASGAR = 800;

  // -------------------------------------------------------------------------
  // Lado esquerdo: a situação de hoje, os extras e a cartela
  // -------------------------------------------------------------------------

  function atualizarLateral() {
    const album = lerAlbum();

    document.getElementById('situacao').textContent = temPacotinhoDoDia(album)
      ? 'O pacotinho de hoje está fechado, esperando você.'
      : 'O pacotinho de hoje já foi aberto. Amanhã tem outro.';

    const extras = document.getElementById('extras-texto');
    extras.hidden = album.extras === 0;
    extras.textContent = album.extras === 1
      ? 'Você tem 1 pacotinho extra guardado.'
      : 'Você tem ' + album.extras + ' pacotinhos extras guardados.';

    document.getElementById('sequencia-texto').textContent = marcarCartela(document.getElementById('cartela'), album);
  }

  // -------------------------------------------------------------------------
  // Palco
  // -------------------------------------------------------------------------

  function desenharPalco() {
    palco.textContent = '';   // apaga o que havia
    const album = lerAlbum();
    if (temPacotinho(album)) desenharPacotinho(album);
    else desenharEspera();
  }

  // Situação 1: o pacotinho fechado
  function desenharPacotinho(album) {
    const titulo = criarElemento('h2', '', temPacotinhoDoDia(album) ? 'Pacotinho do dia' : 'Pacotinho extra');

    // O desenho do pacotinho é escondido do leitor de tela: quem tem nome e
    // funciona pelo teclado é o botão logo abaixo. Clicar no desenho é um atalho para o mouse.
    const pacotinho = criarElemento('div', 'pacotinho');
    pacotinho.setAttribute('aria-hidden', 'true');
    const aba = criarElemento('span', 'pacotinho-aba');
    aba.append(criarElemento('span', '', 'Rasgue aqui'));
    const corpo = criarElemento('span', 'pacotinho-corpo');
    corpo.append(criarElemento('span', 'pacotinho-marca', 'Colei!'));
    corpo.append(criarElemento('span', 'pacotinho-texto', '5 figurinhas'));
    pacotinho.append(aba, corpo);

    const botao = criarElemento('button', 'botao', 'Rasgar o pacotinho');
    botao.type = 'button';
    botao.id = 'rasgar';
    const linha = document.createElement('p');
    linha.append(botao);

    pacotinho.addEventListener('click', rasgar);
    botao.addEventListener('click', rasgar);
    palco.append(titulo, pacotinho, linha);
  }

  // Situação 3: sem pacotinho
  function desenharEspera() {
    const cartao = criarElemento('div', 'cartao');
    const botao = criarElemento('a', 'botao', 'Ir para o álbum');
    botao.href = 'album.html';
    const linha = document.createElement('p');
    linha.append(botao);

    cartao.append(criarElemento('h2', '', 'Por hoje é só'));
    cartao.append(criarElemento('p', '', 'Você já abriu o pacotinho de hoje. O próximo chega amanhã.'));
    cartao.append(criarElemento('p', '', 'Enquanto isso, cole o que está na mão. Cada conquista do álbum vale um pacotinho extra.'));
    cartao.append(linha);
    palco.append(cartao);
  }

  // Rasgar: as figurinhas são sorteadas e guardadas NA HORA do clique. A
  // animação vem depois e é só o espetáculo: se a pessoa fechar a página no
  // meio, as figurinhas já estão salvas e aparecem na mão, no álbum.
  function rasgar() {
    if (rasgando) return;
    const resultado = abrirPacotinho();
    if (!resultado) {
      desenharPalco();
      return;
    }

    rasgando = true;
    atualizarLateral();
    palco.querySelector('.pacotinho').classList.add('pacotinho-rasgando');   // o CSS faz a aba sair voando

    // Quem pediu menos movimento não espera a animação
    setTimeout(function () {
      rasgando = false;
      desenharMesa(resultado);
    }, movimentoReduzido() ? 0 : TEMPO_DE_RASGAR);
  }

  // Situação 2: a mesa, com as cinco figurinhas de costas
  function desenharMesa(resultado) {
    palco.textContent = '';
    const total = resultado.figurinhas.length;
    let faltaVirar = total;

    const titulo = criarElemento('h2', '', 'Saiu do pacotinho');
    titulo.tabIndex = -1;   // deixa o título receber o foco pelo script (não entra na ordem do Tab)
    const texto = criarElemento('p', '', 'Elas saíram de costas. Vire uma por uma.');

    const mesa = criarElemento('ol', 'mesa');
    resultado.figurinhas.forEach(function (item, posicao) {
      const figurinha = criarFigurinha(item.figurinha, {
        vira: true,
        fechada: true,
        solta: true,
        etiqueta: item.nova ? 'Nova' : 'Repetida',
        dica: 'Figurinha ' + (posicao + 1) + ' de ' + total + ', de costas. Virar.',
        aoRevelar: function (fig, botao) { revelou(item, botao); },
      });
      const casa = document.createElement('li');
      casa.style.setProperty('--ordem', posicao);   // a ordem de saída, usada pela animação do CSS
      casa.append(figurinha);
      mesa.append(casa);
    });

    const virarTodas = criarElemento('button', 'botao botao-contorno', 'Virar todas');
    virarTodas.type = 'button';
    const botoes = criarElemento('p', 'mesa-botoes');
    botoes.append(virarTodas);

    const resumo = criarElemento('div', 'fluxo');
    resumo.hidden = true;

    palco.append(titulo, texto, mesa, botoes, resumo);

    // As figurinhas saem todas do mesmo ponto, onde o pacotinho estava: no alto
    // e no meio da mesa. Cada casa guarda a distância até esse ponto (--dx e
    // --dy), e a animação do CSS começa de lá, abre em leque e só depois leva
    // cada figurinha para a sua casa.
    for (const casa of mesa.children) {
      casa.style.setProperty('--dx', Math.round(mesa.offsetLeft + mesa.offsetWidth / 2 - casa.offsetLeft - casa.offsetWidth / 2) + 'px');
      casa.style.setProperty('--dy', Math.round(mesa.offsetTop - casa.offsetTop) + 'px');
    }
    titulo.focus();
    avisar('Pacotinho aberto. ' + total + ' figurinhas de costas. Vire uma por uma.');

    virarTodas.addEventListener('click', function () {
      for (const fechada of mesa.querySelectorAll('[data-face="costas"]')) fechada.click();
    });

    // Chamada cada vez que uma figurinha de costas é virada
    function revelou(item, botao) {
      faltaVirar -= 1;
      botao.classList.add('figurinha-revelada');   // liga o reflexo da brilhante e da lendária
      avisar(descreverFigurinha(item.figurinha) + '. ' + (item.nova ? 'Nova!' : 'Repetida.'));
      texto.textContent = faltaVirar === 1 ? 'Falta virar 1.' : 'Faltam virar ' + faltaVirar + '.';
      if (faltaVirar === 0) mostrarResumo();
    }

    function mostrarResumo() {
      const novas = resultado.figurinhas.filter(function (item) { return item.nova; });
      const repetidas = total - novas.length;

      let frase = novas.length + (novas.length === 1 ? ' nova' : ' novas') + ' e ' + repetidas + (repetidas === 1 ? ' repetida.' : ' repetidas.');
      if (novas.length === 0) frase = 'Todas repetidas desta vez. Elas viram moeda de troca.';
      if (repetidas === 0) frase = 'Todas novas. Que pacotinho!';
      for (const nome of resultado.conquistas) {
        frase += ' Conquista: ' + nome + '. Você ganhou um pacotinho extra.';
      }

      texto.textContent = frase;
      botoes.hidden = true;
      resumo.hidden = false;

      const linha = criarElemento('p', 'mesa-botoes');
      const verAlbum = criarElemento('a', 'botao botao-contorno', 'Ver no álbum');
      verAlbum.href = 'album.html';

      // "Colar direto": cola de uma vez as figurinhas novas deste pacotinho
      if (novas.length > 0) {
        const colarNovas = criarElemento('button', 'botao', novas.length === 1 ? 'Colar a nova' : 'Colar as ' + novas.length + ' novas');
        colarNovas.type = 'button';
        colarNovas.addEventListener('click', function () {
          let feitas = [];
          for (const item of novas) {
            const conquistas = colarFigurinha(item.figurinha.numero);
            if (conquistas) feitas = feitas.concat(conquistas);
          }
          let recado = novas.length === 1 ? 'Colada no álbum.' : 'Coladas no álbum.';
          for (const nome of feitas) recado += ' Conquista: ' + nome + '. Você ganhou um pacotinho extra.';
          texto.textContent = recado;
          avisar(recado);
          colarNovas.remove();
          atualizarLateral();
          acrescentarOutro();   // uma conquista pode ter rendido um pacotinho extra
          verAlbum.focus();     // o botão sumiu: o foco vai para o link ao lado
        });
        linha.append(colarNovas);
      }
      linha.append(verAlbum);
      resumo.append(linha);
      acrescentarOutro();
      avisar(frase);

      // O botão "Abrir outro pacotinho" só aparece se houver outro para abrir
      function acrescentarOutro() {
        if (linha.querySelector('#abrir-outro') || !temPacotinho(lerAlbum())) return;
        const outro = criarElemento('button', 'botao botao-contorno', 'Abrir outro pacotinho');
        outro.type = 'button';
        outro.id = 'abrir-outro';
        outro.addEventListener('click', function () {
          desenharPalco();
          document.getElementById('rasgar').focus();
        });
        linha.append(outro);
      }
    }
  }

  // -------------------------------------------------------------------------
  // Começar
  // -------------------------------------------------------------------------

  atualizarLateral();
  desenharPalco();
});
````

### js/trocas.js

````js
// ============================================================================
// trocas.js
// ----------------------------------------------------------------------------
// A página de trocas. Faz três coisas:
//   1. Lista as repetidas ("tenho para trocar") e as que faltam ("preciso").
//   2. Monta o texto da lista de troca, para copiar ou mandar pelo WhatsApp.
//   3. Simula uma troca na "banca": sai uma repetida, chega uma que faltava.
//
// Depende de: js/dados.js, js/estado.js e js/figurinha.js.
// ============================================================================

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  const OFERTAS_DA_BANCA = 3;

  const campoTexto = document.getElementById('texto-troca');
  const formulario = document.getElementById('form-troca');
  const avisoDaTroca = document.getElementById('troca-aviso');

  // Como a figurinha é chamada nas listas: "Alisson (Brasil)" ou "Brasil (bandeira)"
  function nomeNaLista(fig) {
    const selecao = selecaoPorId(fig.selecao);
    return fig.tipo === 'bandeira' ? selecao.nome + ' (bandeira)' : fig.nome + ' (' + selecao.nome + ')';
  }

  function textoDeRepetidas(quantas) {
    return quantas === 1 ? '1 repetida' : quantas + ' repetidas';
  }

  // As figurinhas com pelo menos uma repetida, e as que ainda não saíram
  function separar(album) {
    return {
      repetidas: FIGURINHAS.filter(function (fig) { return repetidasDe(album, fig.numero) > 0; }),
      faltam: FIGURINHAS.filter(function (fig) { return quantasTenho(album, fig.numero) === 0; }),
    };
  }

  // -------------------------------------------------------------------------
  // 1 e 2. As duas listas e o texto pronto
  // -------------------------------------------------------------------------

  function desenharListas() {
    const album = lerAlbum();
    const listas = separar(album);

    // Tenho para trocar
    const listaRepetidas = document.getElementById('lista-repetidas');
    listaRepetidas.textContent = '';
    for (const fig of listas.repetidas) {
      const item = document.createElement('li');
      item.append(criarElemento('span', '', 'Nº ' + fig.numero + ', ' + nomeNaLista(fig)));
      item.append(criarElemento('span', 'etiqueta', textoDeRepetidas(repetidasDe(album, fig.numero))));
      listaRepetidas.append(item);
    }
    document.getElementById('repetidas-texto').textContent = listas.repetidas.length === 0
      ? 'Nenhuma repetida por enquanto. Elas aparecem quando uma figurinha sai de novo no pacotinho.'
      : 'Estas saíram mais de uma vez. A primeira cópia é do álbum; as outras podem ir embora.';

    // Preciso
    const listaFaltam = document.getElementById('lista-faltam');
    listaFaltam.textContent = '';
    for (const fig of listas.faltam) {
      const item = document.createElement('li');
      item.append(criarElemento('strong', '', String(fig.numero)), ' ' + (fig.tipo === 'bandeira' ? fig.nome + ' (bandeira)' : fig.nome));
      listaFaltam.append(item);
    }
    let textoFaltam = 'Faltam ' + listas.faltam.length + ' figurinhas diferentes.';
    if (listas.faltam.length === 1) textoFaltam = 'Falta só 1 figurinha.';
    if (listas.faltam.length === 0) textoFaltam = 'Não falta nenhuma: todas as figurinhas já saíram para você.';
    document.getElementById('faltam-texto').textContent = textoFaltam;

    // A gaveta da lista some se não falta nada e já vem aberta se a lista é curta
    const gaveta = document.getElementById('faltam-gaveta');
    gaveta.hidden = listas.faltam.length === 0;
    gaveta.open = listas.faltam.length <= 40;
    document.getElementById('faltam-resumo').textContent = 'Ver os números que faltam (' + listas.faltam.length + ')';

    // O texto da lista de troca, uma linha para cada parte
    const tenho = listas.repetidas.map(function (fig) {
      return fig.numero + ' ' + (fig.tipo === 'bandeira' ? 'Bandeira ' + fig.nome : fig.nome) + ' (x' + repetidasDe(album, fig.numero) + ')';
    });
    const preciso = listas.faltam.map(function (fig) { return fig.numero; });
    const linhas = [
      'Colei! Álbum da Copa 2026',
      'Tenho para trocar: ' + (tenho.length > 0 ? tenho.join(', ') : 'nada por enquanto'),
      'Preciso: ' + (preciso.length > 0 ? preciso.join(', ') : 'nada, já tenho todas'),
    ];
    campoTexto.value = linhas.join('\n');

    // O link do WhatsApp leva o texto no endereço. encodeURIComponent troca
    // espaços, acentos e quebras de linha por códigos que cabem em um endereço.
    document.getElementById('mandar-whatsapp').href = 'https://wa.me/?text=' + encodeURIComponent(campoTexto.value);
  }

  // Copiar: usa a área de transferência do navegador. Se ele não deixar,
  // o texto fica selecionado para a pessoa copiar com Ctrl+C.
  document.getElementById('copiar-lista').addEventListener('click', function () {
    const aviso = document.getElementById('copiar-aviso');

    function selecionarParaCopiar() {
      campoTexto.focus();
      campoTexto.select();
      aviso.textContent = 'O texto está selecionado. Aperte Ctrl+C para copiar.';
    }

    if (!navigator.clipboard) {
      selecionarParaCopiar();
      return;
    }
    navigator.clipboard.writeText(campoTexto.value).then(function () {
      aviso.textContent = 'Lista copiada. Agora é só colar na conversa.';
    }, selecionarParaCopiar);
  });

  // -------------------------------------------------------------------------
  // 3. A banca de trocas
  // -------------------------------------------------------------------------

  // Uma opção de escolha: uma caixinha redonda (radio) com o texto ao lado
  function criarOpcao(grupo, fig, texto, marcada) {
    const caixa = document.createElement('input');
    caixa.type = 'radio';
    caixa.name = grupo;
    caixa.value = fig.numero;
    caixa.checked = marcada;

    const rotulo = criarElemento('label', 'opcao');
    rotulo.append(caixa, criarElemento('span', '', texto));
    return rotulo;
  }

  function desenharBanca() {
    const album = lerAlbum();
    const listas = separar(album);
    const vazia = document.getElementById('banca-vazia');

    // Sem repetida para dar ou sem figurinha faltando, não há troca possível
    if (listas.repetidas.length === 0 || listas.faltam.length === 0) {
      formulario.hidden = true;
      vazia.hidden = false;
      vazia.textContent = listas.faltam.length === 0
        ? 'Você já tem todas as figurinhas. Não sobrou nada para a banca oferecer.'
        : 'A banca só troca por repetida, e você ainda não tem nenhuma. Abra mais pacotinhos e volte aqui.';
      return;
    }
    formulario.hidden = false;
    vazia.hidden = true;

    // Você dá: todas as repetidas. A primeira já vem marcada.
    const opcoesDou = document.getElementById('opcoes-dou');
    opcoesDou.textContent = '';
    listas.repetidas.forEach(function (fig, posicao) {
      const texto = 'Nº ' + fig.numero + ', ' + nomeNaLista(fig) + ', ' + textoDeRepetidas(repetidasDe(album, fig.numero));
      opcoesDou.append(criarOpcao('dou', fig, texto, posicao === 0));
    });

    // Você recebe: a banca sorteia até três das que faltam
    const sobra = listas.faltam.slice();   // cópia, para poder tirar as sorteadas
    const opcoesRecebo = document.getElementById('opcoes-recebo');
    opcoesRecebo.textContent = '';
    for (let i = 0; i < OFERTAS_DA_BANCA && sobra.length > 0; i++) {
      const sorteada = sobra.splice(Math.floor(Math.random() * sobra.length), 1)[0];
      const texto = 'Nº ' + sorteada.numero + ', ' + nomeNaLista(sorteada) + ', ' + NOME_DA_RARIDADE[sorteada.raridade].toLowerCase();
      opcoesRecebo.append(criarOpcao('recebo', sorteada, texto, i === 0));
    }
  }

  formulario.addEventListener('submit', function (evento) {
    evento.preventDefault();   // não deixa o navegador recarregar a página

    // Descobre qual opção está marcada em cada grupo
    const sai = figurinhaPorNumero(Number(formulario.querySelector('input[name="dou"]:checked').value));
    const chega = figurinhaPorNumero(Number(formulario.querySelector('input[name="recebo"]:checked').value));

    const conquistas = trocarFigurinha(sai.numero, chega.numero);
    if (conquistas === null) return;   // a troca não valia mais (o álbum mudou em outra aba, por exemplo)

    let texto = 'Troca feita. Saiu uma repetida da Nº ' + sai.numero + ', ' + sai.nome + ', e chegou a Nº ' + chega.numero + ', ' + chega.nome + '. ';
    for (const nome of conquistas) texto += 'Conquista: ' + nome + '. Você ganhou um pacotinho extra. ';

    const link = criarElemento('a', '', 'Colar no álbum');
    link.href = 'album.html#casa-' + chega.numero;
    avisoDaTroca.textContent = texto;
    avisoDaTroca.append(link);

    desenharListas();
    desenharBanca();
    avisoDaTroca.focus();
  });

  document.getElementById('outras-ofertas').addEventListener('click', desenharBanca);

  // -------------------------------------------------------------------------
  // Começar
  // -------------------------------------------------------------------------

  desenharListas();
  desenharBanca();
});
````

### js/inicio.js

````js
// ============================================================================
// inicio.js
// ----------------------------------------------------------------------------
// Na página inicial, troca os textos de exemplo pelo progresso de verdade:
// a tira de grupos, o resumo do álbum, o pacotinho do dia e a cartela.
//
// Sem JavaScript, a página continua mostrando os textos que estão no HTML.
// Depende de: js/dados.js e js/estado.js.
// ============================================================================

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  const album = lerAlbum();
  const resumo = resumoDoAlbum(album);

  // Tira de grupos: as 12 casas estão no HTML, na ordem de A a L.
  // Cada casa enche conforme as figurinhas do grupo são coladas.
  const letras = 'ABCDEFGHIJKL';
  const casas = document.querySelectorAll('.tira-casa');
  for (let i = 0; i < casas.length; i++) {
    const lista = figurinhasDoGrupo(letras[i]);
    if (lista.length === 0) continue;   // grupo que ainda não entrou no álbum

    const coladas = contarColadas(album, lista);
    casas[i].querySelector('.tira-quadro').style.setProperty('--parte', coladas / lista.length);

    // Para o leitor de tela, a casa diz a conta: "Grupo C: 5 de 24 coladas"
    const conta = document.createElement('span');
    conta.className = 'escondido';
    conta.textContent = ': ' + coladas + ' de ' + lista.length + ' coladas';
    casas[i].append(conta);
  }

  let texto = 'Nenhuma figurinha colada ainda. Cada casa é um grupo, de A a L, e vai enchendo conforme você cola.';
  if (resumo.coladas > 0) {
    texto = resumo.coladas + ' de ' + resumo.total + ' figurinhas coladas. Cada casa é um grupo, de A a L, e vai enchendo conforme você cola.';
  }
  if (resumo.naMao === 1) texto += ' Há 1 figurinha na mão, esperando para ser colada.';
  if (resumo.naMao > 1) texto += ' Há ' + resumo.naMao + ' figurinhas na mão, esperando para ser coladas.';
  document.getElementById('progresso-texto').textContent = texto;

  // Pacotinho do dia
  let pacotinho = temPacotinhoDoDia(album)
    ? 'O pacotinho de hoje está fechado, esperando você. São cinco figurinhas.'
    : 'O pacotinho de hoje já foi aberto. Amanhã tem outro.';
  if (album.extras === 1) pacotinho += ' Você tem 1 pacotinho extra guardado.';
  if (album.extras > 1) pacotinho += ' Você tem ' + album.extras + ' pacotinhos extras guardados.';
  document.getElementById('pacotinho-texto').textContent = pacotinho;

  // Cartela da sequência
  document.getElementById('sequencia-texto').textContent = marcarCartela(document.getElementById('cartela'), album);
});
````

### js/carrossel.js

````js
// ============================================================================
// carrossel.js
// ----------------------------------------------------------------------------
// O carrossel das 16 sedes, na página inicial. Mostra uma sede por vez, com a
// foto do estádio e os dados dela.
//
// Como é feito para funcionar com teclado e leitor de tela:
//   - botões "Anterior" e "Próxima" de verdade (<button>);
//   - um botão numerado para cada sede (os indicadores), que leva direto a ela;
//   - a posição ("3 de 16: Dallas") fica em um texto com role="status", que o
//     leitor de tela lê sozinho a cada troca;
//   - não passa sozinho: só muda quando a pessoa pede.
//
// Depende de: js/dados.js (a lista SEDES).
// ============================================================================

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  const carrossel = document.getElementById('carrossel');
  if (!carrossel) return;

  const indicadores = document.getElementById('sede-indicadores');
  let atual = 0;   // posição da sede que está na tela (0 é a primeira)

  // Escreve os números com ponto de milhar, do jeito brasileiro: 80824 vira "80.824"
  function comPonto(numero) {
    return numero.toLocaleString('pt-BR');
  }

  // Cria um botão numerado para cada sede
  SEDES.forEach(function (sede, posicao) {
    const botao = document.createElement('button');
    botao.type = 'button';
    botao.className = 'carrossel-numero';
    botao.textContent = posicao + 1;
    botao.setAttribute('aria-label', 'Sede ' + (posicao + 1) + ': ' + sede.cidade);
    botao.addEventListener('click', function () { mostrar(posicao); });

    const item = document.createElement('li');
    item.append(botao);
    indicadores.append(item);
  });

  // Troca a sede que está na tela
  function mostrar(posicao) {
    atual = posicao;
    const sede = SEDES[atual];

    // Textos
    document.getElementById('sede-cidade').textContent = sede.cidade;
    document.getElementById('sede-estadio').textContent = sede.estadio;
    document.getElementById('sede-pais').textContent = sede.municipio ? sede.municipio + ', ' + sede.pais : sede.pais;
    document.getElementById('sede-bandeira').src = 'assets/bandeiras/' + sede.bandeira + '.svg';
    document.getElementById('sede-numeros').textContent = sede.jogos + ' jogos e ' + comPonto(sede.capacidade) + ' lugares';
    document.getElementById('sede-nome-na-copa').textContent = sede.nomeNaCopa;

    const nota = document.getElementById('sede-nota');
    nota.textContent = sede.nota;
    nota.hidden = sede.nota === '';

    // Foto e crédito
    const foto = document.getElementById('sede-foto');
    foto.src = 'assets/img/sedes/' + sede.id + '.jpg';
    foto.alt = sede.foto.alt;
    const credito = document.getElementById('sede-credito');
    credito.textContent = 'Foto: ' + sede.foto.autor + ', ' + sede.foto.licenca + ', Wikimedia Commons';
    credito.href = sede.foto.origem;

    // Posição: lida pelo leitor de tela a cada troca
    document.getElementById('sede-posicao').textContent = (atual + 1) + ' de ' + SEDES.length + ': ' + sede.cidade;

    // Marca o indicador da sede atual (aria-current diz ao leitor de tela qual é)
    const botoes = indicadores.querySelectorAll('button');
    for (let i = 0; i < botoes.length; i++) {
      if (i === atual) botoes[i].setAttribute('aria-current', 'true');
      else botoes[i].removeAttribute('aria-current');
    }
  }

  // "Anterior" na primeira vai para a última, e "Próxima" na última volta para a primeira
  document.getElementById('sede-anterior').addEventListener('click', function () {
    mostrar((atual - 1 + SEDES.length) % SEDES.length);
  });

  document.getElementById('sede-proxima').addEventListener('click', function () {
    mostrar((atual + 1) % SEDES.length);
  });

  carrossel.hidden = false;   // o carrossel só aparece se o JavaScript estiver ligado
  mostrar(0);
});
````

### js/cenas.js

````js
// ============================================================================
// cenas.js
// ----------------------------------------------------------------------------
// O motor das cenas presas à rolagem. Ele não sabe o que cada cena desenha:
// só mede a rolagem e avisa cada cena do quanto ela já andou.
//
// A ideia:
//   1. A cena é uma seção bem alta (240vh = quase duas telas e meia).
//   2. Dentro dela, o palco fica grudado na tela (position: sticky, no CSS).
//   3. Enquanto a pessoa rola por dentro da cena, o motor transforma a rolagem
//      em um número de 0 a 1: o "progresso".
//   4. Cada cena tem uma função desenhar(progresso), que põe cada peça no lugar
//      certo para aquele progresso. Rolar para cima desfaz tudo.
//
// As cenas existem de dois jeitos (ver css/cenas.css):
//   - em movimento: o <html> ganha a classe "com-cenas";
//   - paradas: para quem pede menos movimento, cada cena vira uma seção comum.
//
// Quem cria as cenas da página inicial é o js/cenas-inicio.js.
// Depende de: js/figurinha.js (a função movimentoReduzido).
// ============================================================================

// ---------------------------------------------------------------------------
// Contas que as cenas usam
// ---------------------------------------------------------------------------

// Prende um número entre 0 e 1
function limitar(valor) {
  return Math.min(1, Math.max(0, valor));
}

// "Quanto deste trecho já passou?" Devolve 0 antes de "inicio", 1 depois de
// "fim" e, no meio, um valor que arranca e freia com suavidade.
// Exemplo: trecho(0.2, 0.5, p) faz uma peça se mover só entre 20% e 50% da cena.
function trecho(inicio, fim, p) {
  const t = limitar((p - inicio) / (fim - inicio));
  return t * t * (3 - 2 * t);
}

// O valor que fica entre "a" e "b": com t = 0 é "a", com t = 1 é "b"
function misturar(a, b, t) {
  return a + (b - a) * t;
}

// Um sorteio que se repete: dá sempre a mesma sequência de números "ao acaso".
// Assim a cena fica igual toda vez que a página é aberta.
function sorteador(semente) {
  return function () {
    semente = (semente * 1664525 + 1013904223) % 4294967296;
    return semente / 4294967296;
  };
}

// Tira os estilos que o JavaScript escreveu direto nos elementos,
// para eles voltarem a obedecer só ao CSS
function limparEstilos(elementos) {
  for (const elemento of elementos) elemento.removeAttribute('style');
}

// ---------------------------------------------------------------------------
// A lista de cenas
// ---------------------------------------------------------------------------

const CENAS = [];
let cenasEmMovimento = false;   // as cenas estão presas à rolagem agora?
let quadroPedido = false;       // já existe um próximo quadro agendado?

// Guarda uma cena. "cena" é um objeto com até quatro funções:
//   medir()               mede o que depende do tamanho da tela
//   desenhar(p, agora)    põe as peças no lugar para o progresso p (de 0 a 1)
//   parar()               deixa a cena pronta para ser vista parada
//   viva(agora)           (opcional) responde se a cena se mexe sozinha agora
function registrarCena(elemento, cena) {
  cena.elemento = elemento;
  cena.alvo = 0;          // o progresso que a rolagem pede agora
  cena.p = 0;             // o progresso mostrado (corre atrás do alvo, com suavidade)
  cena.naTela = false;
  cena.suja = true;       // "precisa ser redesenhada"
  cena.comecou = false;

  // O aviso "Desça para continuar", no pé do palco. Ele avisa que a cena só
  // anda com a rolagem. Por padrão aparece desde o começo da cena; o atributo
  // data-aviso-de="0.2" no HTML faz aparecer só a partir de 20%.
  // É uma ajuda para os olhos: fica fora da leitura de tela.
  cena.aviso = document.createElement('p');
  cena.aviso.className = 'cena-desca';
  cena.aviso.setAttribute('aria-hidden', 'true');
  cena.aviso.append(document.createElement('i'), 'Desça para continuar');
  elemento.querySelector('.cena-palco').append(cena.aviso);
  cena.avisoDe = Number(elemento.dataset.avisoDe || -1);

  CENAS.push(cena);
  return cena;
}

// Põe a cena direto no progresso p, sem a suavização. Usado quando um botão
// recebe o foco do teclado: ele precisa aparecer na hora, não meio segundo depois.
function mostrarJa(cena, p) {
  cena.p = p;
  cena.comecou = true;
  cena.suja = true;
}

// Alguém dentro da cena recebeu o foco do teclado e só aparece no progresso p.
// Ao dar o foco, o navegador pode rolar a página por conta própria, tentando
// "mostrar" o elemento, e com isso a cena andaria e o esconderia. Por isso a
// correção espera o próximo quadro: aí mede onde a rolagem foi parar e a põe
// no ponto certo.
function focarNaCena(cena, p) {
  requestAnimationFrame(function () {
    medirRolagem();
    if (Math.abs(cena.alvo - p) > 0.02) irParaProgresso(cena, p);
    mostrarJa(cena, p);
  });
}

// Leva a rolagem da página até o ponto em que a cena está no progresso p
function irParaProgresso(cena, p) {
  const topo = cena.elemento.getBoundingClientRect().top + window.scrollY;
  window.scrollTo(0, topo + p * (cena.elemento.offsetHeight - window.innerHeight));
}

// ---------------------------------------------------------------------------
// O laço: mede a rolagem e chama o desenho de cada cena
// ---------------------------------------------------------------------------

// Transforma a posição de cada cena na tela em progresso de 0 a 1.
// caixa.top é a distância do topo da cena até o topo da tela: começa em 0
// (a cena acabou de grudar) e vai ficando negativa conforme a pessoa rola.
function medirRolagem() {
  const alturaDaTela = window.innerHeight;
  for (const cena of CENAS) {
    const caixa = cena.elemento.getBoundingClientRect();
    cena.alvo = limitar(-caixa.top / (caixa.height - alturaDaTela));
    const naTela = caixa.bottom > 0 && caixa.top < alturaDaTela;
    // A classe "cena-na-tela" faz o fio do aviso descer de novo quando a cena chega
    if (naTela !== cena.naTela) cena.elemento.classList.toggle('cena-na-tela', naTela);
    cena.naTela = naTela;
  }
}

// Um "quadro": o navegador chama esta função cerca de 60 vezes por segundo
function quadro(agora) {
  quadroPedido = false;
  if (!cenasEmMovimento) return;

  medirRolagem();
  for (const cena of CENAS) {
    if (!cena.naTela) continue;

    const antes = cena.p;
    if (!cena.comecou) {
      cena.p = cena.alvo;   // na primeira vez, vai direto para onde a rolagem está
      cena.comecou = true;
    } else {
      // Suavização: a cada quadro, anda 14% do caminho que falta até o alvo
      cena.p += (cena.alvo - cena.p) * 0.14;
      if (Math.abs(cena.alvo - cena.p) < 0.0004) cena.p = cena.alvo;
    }

    if (cena.p !== antes || cena.suja || (cena.viva && cena.viva(agora))) {
      cena.desenhar(cena.p, agora);
      cena.suja = false;
      // O aviso de descer some perto do fim da cena, quando não há mais o que esperar
      cena.aviso.style.opacity = String(trecho(cena.avisoDe, cena.avisoDe + 0.06, cena.p) * (1 - trecho(0.8, 0.88, cena.p)));
    }
  }
  pedirQuadro();
}

function pedirQuadro() {
  if (quadroPedido) return;
  quadroPedido = true;
  requestAnimationFrame(quadro);
}

// ---------------------------------------------------------------------------
// Ligar e desligar
// ---------------------------------------------------------------------------

function medirCenas() {
  for (const cena of CENAS) {
    if (cena.medir) cena.medir();
    cena.suja = true;
  }
}

// As cenas podem ficar em movimento? Duas coisas pedem a versão parada:
//   1. a pessoa (ou o aparelho dela) pediu menos movimento;
//   2. a letra está maior que o normal ou o texto está com mais espaço. O palco
//      tem a altura exata da tela: um texto que cresce poderia não caber e
//      ficar cortado. Parada, a página deixa o texto crescer à vontade.
function cenasPodemMover() {
  const raiz = document.documentElement;
  const letraNormal = parseFloat(getComputedStyle(raiz).fontSize) <= 17;
  return !movimentoReduzido() && letraNormal && raiz.dataset.espacamento !== 'amplo';
}

// Decide se as cenas ficam em movimento ou paradas e arruma a página para isso.
// É chamada ao abrir a página e sempre que uma preferência muda.
function aplicarModoDasCenas() {
  cenasEmMovimento = cenasPodemMover();
  document.documentElement.classList.toggle('com-cenas', cenasEmMovimento);

  // Primeiro tudo volta ao que o CSS manda; depois cada cena mede a tela nova
  for (const cena of CENAS) {
    cena.parar();
    cena.aviso.removeAttribute('style');
    cena.comecou = false;
  }
  medirCenas();

  if (cenasEmMovimento) pedirQuadro();
  else for (const cena of CENAS) cena.parar();

  // Quem vê a página parada só porque o aparelho pede menos movimento (sem ter
  // escolhido nada no painel) recebe um aviso com um botão para ligar as animações
  const aviso = document.getElementById('aviso-movimento');
  const soPeloAparelho = document.documentElement.dataset.movimento === 'normal' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (aviso) aviso.hidden = !soPeloAparelho;
}

// Chamada pelo js/cenas-inicio.js depois de registrar todas as cenas
function comecarCenas() {
  aplicarModoDasCenas();

  // A janela mudou de tamanho: espera a pessoa parar de arrastar e mede de novo
  let espera = 0;
  window.addEventListener('resize', function () {
    clearTimeout(espera);
    espera = setTimeout(function () {
      medirCenas();
      if (!cenasEmMovimento) for (const cena of CENAS) cena.parar();
    }, 150);
  });

  // O painel de acessibilidade mexe nos atributos do <html>. Um vigia avisa
  // quando isso acontece. Se a mudança troca o modo (movimento, letra ou
  // espaço), a página é arrumada de novo; se muda só cores ou medidas, basta
  // medir e desenhar de novo.
  new MutationObserver(function (mudancas) {
    const mudouOMovimento = mudancas.some(function (mudanca) { return mudanca.attributeName === 'data-movimento'; });
    if (mudouOMovimento || cenasPodemMover() !== cenasEmMovimento) {
      aplicarModoDasCenas();
      return;
    }
    medirCenas();
    if (!cenasEmMovimento) for (const cena of CENAS) cena.parar();
  }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-movimento', 'data-tema', 'data-contraste', 'data-fonte', 'data-espacamento'] });

  // O aparelho também pode mudar de ideia com a página aberta
  window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', aplicarModoDasCenas);

  // As fontes e as imagens chegam depois e mudam medidas
  window.addEventListener('load', function () {
    medirCenas();
    if (!cenasEmMovimento) for (const cena of CENAS) cena.parar();
  });

  // Teclado: um botão ou link dentro de uma cena pode estar invisível no ponto
  // em que a rolagem está (ele só aparece no fim da cena, por exemplo).
  // O atributo data-visivel-em="1" diz em que progresso ele aparece: quando
  // ele recebe o foco, a rolagem vai até lá. Assim o foco nunca fica escondido.
  document.addEventListener('focusin', function (evento) {
    if (!cenasEmMovimento || !evento.target.closest) return;
    const marcado = evento.target.closest('[data-visivel-em]');
    if (!marcado) return;
    const cena = CENAS.find(function (c) { return c.elemento.contains(marcado); });
    if (!cena) return;
    focarNaCena(cena, Number(marcado.dataset.visivelEm));
  });
}
````

### js/cenas-inicio.js

````js
// ============================================================================
// cenas-inicio.js
// ----------------------------------------------------------------------------
// As oito cenas da página inicial. Cada uma é registrada no motor
// (js/cenas.js) com três funções:
//   medir()             mede o que depende do tamanho da tela;
//   desenhar(p, agora)  põe as peças no lugar para o progresso p, de 0 a 1;
//   parar()             deixa a cena pronta para ser vista parada.
//
// As cenas, na ordem em que aparecem na página:
//   1. Abertura: a retícula forma a marca (partículas em canvas)
//   2. A frase acende (texto preso à rolagem)
//   3. O pacotinho gira e abre (3D em CSS)
//   4. O álbum abre (livro 3D em CSS)
//   5. Mergulho na figurinha (zoom que atravessa)
//   6. Os números contam (contador preso à rolagem)
//   7. Os grupos andam para o lado (rolagem horizontal)
//   8. Voo pelas figurinhas (câmera em profundidade)
//
// Depende de: js/dados.js, js/estado.js, js/figurinha.js e js/cenas.js.
// ============================================================================

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // -------------------------------------------------------------------------
  // 1. Abertura: a retícula forma a marca
  // -------------------------------------------------------------------------
  // Passos:
  //   a) escrever "Colei!" em uma tela escondida;
  //   b) olhar essa tela ponto por ponto e guardar onde há tinta;
  //   c) dar a cada ponto um lugar "solto", em uma retícula que cobre o palco;
  //   d) a cada quadro, desenhar cada pontinho entre o lugar solto e o lugar
  //      final, conforme o progresso.

  const telaReticula = document.getElementById('reticula-tela');
  const pincel = telaReticula.getContext('2d');
  const palcoDaAbertura = telaReticula.parentElement;
  const convite = document.getElementById('abertura-convite');
  const assinatura = document.getElementById('abertura-assinatura');
  let pontos = [];
  let larguraDaTela = 0;
  let alturaDaTela = 0;
  let vaoSolto = 10;
  let corDaTinta = '#14204F';
  const ponteiro = { x: -9999, y: -9999 };
  let ultimoGesto = performance.now();   // a última vez em que a pessoa rolou ou mexeu o mouse
  let medidasDaReticula = '';            // as medidas usadas na última montagem

  function montarReticula() {
    // Ao abrir a página, o cabeçalho ainda está em cima do palco. O CSS usa a
    // altura dele (a distância do topo da página até a cena) para subir o
    // convite e deixá-lo inteiro na primeira tela.
    const topoDaCena = Math.round(palcoDaAbertura.parentElement.getBoundingClientRect().top + window.scrollY);
    palcoDaAbertura.style.setProperty('--cabecalho', topoDaCena + 'px');

    const caixa = telaReticula.getBoundingClientRect();
    const largura = Math.round(caixa.width);
    const altura = Math.round(caixa.height);
    const tinta = getComputedStyle(document.documentElement).getPropertyValue('--cor-texto').trim() || '#14204F';

    // Montar a retícula dá trabalho. Se nada do que ela usa mudou (o tamanho
    // da tela, a cor, o modo, a fonte, o tamanho do convite), fica a que já existe.
    // No celular isso acontece toda hora: a barra de endereço some e volta.
    const fonteChegou = !document.fonts || document.fonts.check('900 100px "Londrina Solid"');
    const medidas = [largura, altura, tinta, cenasEmMovimento, fonteChegou, convite.offsetWidth, convite.offsetHeight].join('|');
    if (medidas === medidasDaReticula) return;
    medidasDaReticula = medidas;

    pontos = [];
    if (largura < 20 || altura < 20) return;

    // Em tela de celular, cada pixel do CSS tem 2 ou 3 pixels de verdade:
    // a tela de desenho é criada maior para os pontinhos saírem nítidos.
    const nitidez = Math.min(window.devicePixelRatio || 1, 2);
    telaReticula.width = largura * nitidez;
    telaReticula.height = altura * nitidez;
    pincel.setTransform(nitidez, 0, 0, nitidez, 0, 0);
    larguraDaTela = largura;
    alturaDaTela = altura;
    corDaTinta = tinta;

    // a) A palavra, em uma tela escondida do mesmo tamanho.
    //    Em movimento, a tela é o palco inteiro; parada, é uma faixa baixa.
    const rascunho = document.createElement('canvas');
    rascunho.width = largura;
    rascunho.height = altura;
    const lapis = rascunho.getContext('2d', { willReadFrequently: true });
    let corpo = cenasEmMovimento ? Math.min(altura * 0.42, largura * 0.36) : Math.min(altura * 0.86, largura * 0.4);
    const fonte = function () { return '900 ' + corpo + 'px "Londrina Solid", "Arial Black", sans-serif'; };
    lapis.font = fonte();
    const larguraDaPalavra = lapis.measureText('Colei!').width;
    if (larguraDaPalavra > largura * 0.86) corpo *= (largura * 0.86) / larguraDaPalavra;
    lapis.font = fonte();
    lapis.textAlign = 'center';
    lapis.textBaseline = 'middle';
    const meioX = largura / 2;
    const meioY = cenasEmMovimento ? altura * 0.44 : altura / 2;
    lapis.fillText('Colei!', meioX, meioY);
    if (cenasEmMovimento) assinatura.style.top = Math.round(meioY + corpo * 0.5) + 'px';

    // b) Onde há tinta? As linhas são desencontradas, como na retícula de jornal.
    const pixels = lapis.getImageData(0, 0, largura, altura).data;
    const passo = Math.max(3, corpo / 52);
    const finais = [];
    let topo = altura;
    let base = 0;
    let linha = 0;
    for (let y = passo / 2; y < altura; y += passo * 0.866) {
      for (let x = (linha % 2) * passo / 2; x < largura; x += passo) {
        const transparencia = pixels[(Math.floor(y) * largura + Math.floor(x)) * 4 + 3];
        if (transparencia > 128) {
          finais.push({ x: x, y: y });
          if (y < topo) topo = y;
          if (y > base) base = y;
        }
      }
      linha += 1;
    }
    const quantos = finais.length;
    if (quantos === 0) return;

    // c) Os lugares soltos: uma retícula comum, cobrindo o palco inteiro, com
    //    (quase) a mesma quantidade de pontos. Ela deixa uma janela em volta
    //    do convite, para nenhum pontinho passar por trás do texto.
    const janela = {
      esquerda: convite.offsetLeft - 16,
      direita: convite.offsetLeft + convite.offsetWidth + 16,
      topo: convite.offsetTop - 16,
      base: convite.offsetTop + convite.offsetHeight + 16,
    };
    const areaDaJanela = cenasEmMovimento ? (janela.direita - janela.esquerda) * (janela.base - janela.topo) : 0;
    const areaLivre = Math.max(largura * altura * 0.3, largura * altura - areaDaJanela);
    vaoSolto = Math.sqrt(areaLivre / (quantos * 0.866)) * 0.98;
    let soltos = [];
    linha = 0;
    for (let y = vaoSolto / 2; y < altura; y += vaoSolto * 0.866) {
      for (let x = (linha % 2) * vaoSolto / 2; x < largura; x += vaoSolto) {
        const naJanela = cenasEmMovimento && x > janela.esquerda && x < janela.direita && y > janela.topo && y < janela.base;
        if (!naJanela) soltos.push({ x: x, y: y });
      }
      linha += 1;
    }
    // Sobrou lugar? Tira alguns, espalhados por igual.
    const sobra = soltos.length;
    if (sobra > quantos) {
      soltos = soltos.filter(function (lugar, i) {
        return Math.floor(i * quantos / sobra) !== Math.floor((i - 1) * quantos / sobra);
      });
    }

    // Quem vai para onde: as duas listas são postas na mesma ordem (da
    // esquerda para a direita e, dentro de cada faixa, de cima para baixo).
    // Assim cada pedaço do palco desce para o pedaço da palavra que fica na
    // mesma direção, e os caminhos não se embaralham.
    function ordenarEmFaixas(lista) {
      lista.sort(function (a, b) { return a.x - b.x; });
      const tamanho = Math.max(1, Math.round(Math.sqrt(lista.length)));
      const arrumada = [];
      for (let i = 0; i < lista.length; i += tamanho) {
        const faixa = lista.slice(i, i + tamanho).sort(function (a, b) { return a.y - b.y; });
        for (const item of faixa) arrumada.push(item);
      }
      return arrumada;
    }
    const finaisEmOrdem = ordenarEmFaixas(finais);
    const soltosEmOrdem = ordenarEmFaixas(soltos);

    const acaso = sorteador(2026);
    const maiorDistancia = Math.hypot(largura / 2, altura / 2);
    pontos = finaisEmOrdem.map(function (fim, i) {
      const solto = soltosEmOrdem[i % soltosEmOrdem.length];
      // Retícula de verdade: os pontinhos de baixo são maiores que os de cima
      const descida = (fim.y - topo) / Math.max(1, base - topo);
      return {
        xSolto: solto.x, ySolto: solto.y,
        xFim: fim.x, yFim: fim.y,
        raioFim: passo * misturar(0.3, 0.57, descida),
        // Quem está mais perto do meio chega primeiro
        atraso: 0.3 * Math.hypot(solto.x - meioX, solto.y - meioY) / maiorDistancia + 0.08 * acaso(),
        fase: acaso() * 6.283,
      };
    });
  }

  // Desenha todos os pontinhos. "andamento" vai de 0 (soltos) a 1 (palavra
  // formada); "balanco" vai de 0 (parados) a 1 (balançando de leve).
  function desenharPontos(andamento, agora, balanco) {
    const raioSolto = vaoSolto * 0.13;
    pincel.clearRect(0, 0, larguraDaTela, alturaDaTela);
    pincel.fillStyle = corDaTinta;
    pincel.beginPath();

    for (const ponto of pontos) {
      const t = limitar((andamento - ponto.atraso) / 0.62);
      const e = t * t * (3 - 2 * t);       // arranca e freia com suavidade
      const falta = 1 - e;

      // O caminho faz uma curva: um desvio para o lado, maior no meio do caminho
      const dx = ponto.xFim - ponto.xSolto;
      const dy = ponto.yFim - ponto.ySolto;
      const curva = Math.sin(e * Math.PI) * 0.2;
      let x = ponto.xSolto + dx * e - dy * curva;
      let y = ponto.ySolto + dy * e + dx * curva;
      let raio = misturar(raioSolto, ponto.raioFim, e);

      if (falta > 0.01) {
        // Enquanto está solto, o pontinho balança de leve...
        x += Math.sin(agora / 900 + ponto.fase) * 2.5 * falta * balanco;
        y += Math.cos(agora / 1100 + ponto.fase) * 2.5 * falta * balanco;
        // ...e cresce perto do mouse, como uma lanterna passando no papel
        const distancia = Math.hypot(x - ponteiro.x, y - ponteiro.y);
        if (distancia < 150) {
          const perto = 1 - distancia / 150;
          raio *= 1 + 2.2 * perto * perto * falta;
        }
      }

      pincel.moveTo(x + raio, y);
      pincel.arc(x, y, raio, 0, 6.283);
    }
    pincel.fill();
  }

  const cenaDaAbertura = registrarCena(document.querySelector('.cena-abertura'), {
    medir: montarReticula,

    desenhar: function (p, agora) {
      // O balanço dura 3 segundos depois do último gesto e some nos 2 seguintes:
      // nada na página fica se mexendo sozinho por mais de 5 segundos.
      const balanco = limitar(1 - (agora - ultimoGesto - 3000) / 2000);
      desenharPontos(limitar((p - 0.08) / 0.72), agora, balanco);

      // O convite sai de cena enquanto os pontinhos se juntam
      const some = trecho(0.03, 0.18, p);
      convite.style.opacity = 1 - some;
      convite.style.transform = 'translateY(' + (some * -30) + 'px)';
      convite.style.pointerEvents = some > 0.7 ? 'none' : '';

      const chegou = trecho(0.8, 0.93, p);
      assinatura.style.opacity = chegou;
      assinatura.style.transform = 'translateY(' + ((1 - chegou) * 16) + 'px)';
    },

    parar: function () {
      limparEstilos([convite, assinatura]);
      desenharPontos(1, 0, 0);   // a marca já formada
    },

    viva: function (agora) {
      return cenaDaAbertura.p < 0.9 && agora - ultimoGesto < 5200;
    },
  });

  window.addEventListener('scroll', function () { ultimoGesto = performance.now(); }, { passive: true });
  palcoDaAbertura.addEventListener('pointermove', function (evento) {
    const caixa = telaReticula.getBoundingClientRect();
    ponteiro.x = evento.clientX - caixa.left;
    ponteiro.y = evento.clientY - caixa.top;
    ultimoGesto = performance.now();
    pedirQuadro();
  });
  palcoDaAbertura.addEventListener('pointerleave', function () {
    ponteiro.x = -9999;
    ponteiro.y = -9999;
  });

  // O botão do aviso: liga as animações neste site mesmo com o aparelho
  // pedindo menos movimento. A escolha fica guardada (js/tema-acessibilidade.js).
  document.getElementById('ligar-movimento').addEventListener('click', function () {
    if (typeof guardarPreferencia === 'function') {
      guardarPreferencia('movimento', 'completo');
    } else {
      // O navegador pode estar com uma cópia antiga do tema-acessibilidade.js na
      // memória, ainda sem essa função. Aí a escolha vale só até fechar a página.
      document.documentElement.dataset.movimento = 'completo';
    }
    // O aviso some com o botão dentro: o foco vai para o primeiro botão do convite
    convite.querySelector('a').focus();
  });

  // -------------------------------------------------------------------------
  // 2. A frase acende
  // -------------------------------------------------------------------------

  const frase = document.getElementById('frase');
  const tracoDaFrase = document.getElementById('frase-traco');
  // A frase é desmontada em palavras: cada uma vira um <span> para poder acender sozinha
  const palavras = frase.textContent.trim().split(/\s+/).map(function (texto) {
    return criarElemento('span', '', texto);
  });
  frase.textContent = '';
  palavras.forEach(function (palavra, i) {
    frase.append(palavra);
    if (i < palavras.length - 1) frase.append(' ');
  });

  registrarCena(document.querySelector('.cena-frase'), {
    desenhar: function (p) {
      palavras.forEach(function (palavra, i) {
        // A primeira palavra acende com 6% da cena; a última, com 76%
        palavra.classList.toggle('acesa', p > 0.06 + (i / palavras.length) * 0.7);
      });
      tracoDaFrase.style.setProperty('--falta', (1 - trecho(0.8, 0.96, p)).toFixed(3));
    },

    parar: function () {
      tracoDaFrase.style.removeProperty('--falta');   // o sublinhado aparece pronto
    },
  });

  // -------------------------------------------------------------------------
  // 3. O pacotinho gira e abre
  // -------------------------------------------------------------------------
  // O pacotinho aparece de dois jeitos, com a mesma coreografia:
  //   - a sequência de quadros: 90 imagens de um pacotinho 3D, já prontas em
  //     assets/img/pacotinho/. A rolagem escolhe qual imagem mostrar. É a
  //     técnica das páginas de produto: o 3D pesado é feito antes, uma vez só,
  //     e o site só mostra fotos. (As imagens saem de scripts/quadros.html.)
  //   - o pacotinho de CSS: fica no lugar enquanto as imagens não chegam.
  // As figurinhas são elementos comuns da página, atrás do pacotinho.

  const pacote = document.getElementById('pacote3d');
  const abaDoPacote = document.getElementById('pacote3d-aba');
  const cenaDoPacote = pacote.parentElement;
  const tituloDoPacote1 = document.getElementById('titulo-cena-pacote');
  const tituloDoPacote2 = document.getElementById('pacote-titulo-2');
  // Cinco figurinhas de verdade, uma de cada tipo: comum, brilhante, lendária e bandeira
  const cartas = [50, 222, 54, 193, 276].map(function (numero) {
    const carta = criarElemento('div', 'pacote-carta');
    carta.append(criarFigurinha(figurinhaPorNumero(numero), {}));
    document.getElementById('pacote-figurinhas').append(carta);
    return carta;
  });
  let alturaDoPacote = 300;
  let passoDoLeque = 120;

  // ----- A sequência de quadros
  const telaDeQuadros = document.getElementById('pacote-quadros');
  const pincelDeQuadros = telaDeQuadros.getContext('2d');
  const QUADROS = 90;
  const FIM_DO_PACOTE = 0.72;     // o pacotinho sai de cena com 72% da rolagem; o resto é das figurinhas
  let quadros = [];               // as imagens do tema em uso
  let temaDosQuadros = '';
  let quadroMostrado = -1;
  let paginaCarregada = document.readyState === 'complete';

  // Busca as 90 imagens do tema atual. Só quando a última chega é que elas
  // entram em cena: até lá, quem aparece é o pacotinho de CSS.
  function carregarQuadros() {
    const tema = document.documentElement.dataset.tema === 'escuro' ? 'escuro' : 'claro';
    if (tema === temaDosQuadros) return;
    temaDosQuadros = tema;

    const novos = [];
    let chegaram = 0;
    for (let i = 1; i <= QUADROS; i++) {
      const imagem = new Image();
      imagem.onload = function () {
        chegaram += 1;
        if (chegaram < QUADROS || tema !== temaDosQuadros) return;
        quadros = novos;
        quadroMostrado = -1;
        cenaDoPacote.classList.add('com-quadros');
        cenaDoPacoteNoMotor.suja = true;
        pedirQuadro();
      };
      // Os arquivos se chamam 001.webp, 002.webp ... 090.webp
      imagem.src = 'assets/img/pacotinho/' + tema + '/' + String(i).padStart(3, '0') + '.webp';
      novos.push(imagem);
    }
  }

  // Mostra a imagem que corresponde ao progresso p da cena
  function mostrarQuadro(p) {
    const numero = Math.round(limitar(p / FIM_DO_PACOTE) * (QUADROS - 1));
    if (numero === quadroMostrado) return;
    quadroMostrado = numero;
    pincelDeQuadros.clearRect(0, 0, telaDeQuadros.width, telaDeQuadros.height);
    pincelDeQuadros.drawImage(quadros[numero], 0, 0);
  }

  const cenaDoPacoteNoMotor = registrarCena(document.querySelector('.cena-pacote'), {
    medir: function () {
      alturaDoPacote = cenaDoPacote.offsetHeight;
      const larguraDaCarta = cartas[0].offsetWidth;
      // No celular as cinco não cabem lado a lado: o leque fica mais fechado
      passoDoLeque = Math.min(larguraDaCarta * 1.08, (cenaDoPacote.parentElement.clientWidth - larguraDaCarta * 1.3 - 24) / 4);
      // As imagens só são buscadas se as cenas estão em movimento e depois que o
      // resto da página carregou. Trocar o tema busca as do outro tema.
      if (cenasEmMovimento && paginaCarregada) carregarQuadros();
    },

    desenhar: function (p) {
      // A coreografia do pacotinho (a mesma de posar(), no js/pacote3d.js):
      const chegada = trecho(0, 0.28, p);       // entra girando, de costas para a frente
      const rasgo = trecho(0.28, 0.4, p);       // a aba sai pelo picote
      const queda = trecho(0.55, 0.72, p);      // vazio, cai para fora da cena
      const some = String(trecho(0, 0.06, p) * (1 - trecho(0.64, 0.72, p)));

      if (quadros.length === QUADROS) {
        mostrarQuadro(p);
        telaDeQuadros.style.opacity = some;
      } else {
        // O pacotinho de CSS, com os mesmos movimentos
        const giro = misturar(-205, 9, chegada) - trecho(0.28, 0.55, p) * 18;
        const tombo = misturar(22, 0, chegada) + queda * 62;
        const desce = misturar(alturaDoPacote * 0.46, 0, chegada) + queda * queda * alturaDoPacote * 1.86;
        pacote.style.transform = 'translateY(' + desce + 'px) rotateX(' + (-tombo) + 'deg) rotateY(' + giro + 'deg) rotate(' + (queda * 12) + 'deg) scale(' + misturar(0.72, 1, chegada) + ')';
        pacote.style.opacity = some;
        abaDoPacote.style.transform = 'translate(' + (rasgo * 70) + '%, ' + (rasgo * -190) + '%) rotate(' + (rasgo * 38) + 'deg)';
        abaDoPacote.style.opacity = 1 - trecho(0.34, 0.4, p);
      }

      // As cinco figurinhas: sobem por dentro do pacotinho, passam por cima dele
      // e, quando ele já caiu, descem e abrem em leque. Cada uma começa um
      // pouco depois da anterior. Elas ficam sempre atrás do pacotinho.
      cartas.forEach(function (carta, i) {
        const t = trecho(0.38 + i * 0.03, 0.74 + i * 0.03, p);
        const lado = i - 2;   // -2, -1, 0, 1, 2: a do meio fica no meio
        const x = lado * passoDoLeque * t * t;
        const y = misturar(0, alturaDoPacote * 0.03, t) - Math.sin(t * Math.PI) * alturaDoPacote * 0.75;
        // Profundidade: sempre negativa (atrás da frente do pacotinho). No leque,
        // a figurinha do meio fica um pouco à frente das dos lados.
        const z = misturar(-(34 + i * 2), -4 - Math.abs(lado) * 10, trecho(0.5, 0.8, t));
        const giroDaCarta = lado * 5 * t;
        const viradaDaCarta = Math.sin(t * Math.PI) * -20;   // vira de lado só no meio do caminho
        carta.style.transform = 'translate3d(' + x + 'px, ' + y + 'px, ' + z + 'px) rotateY(' + viradaDaCarta + 'deg) rotate(' + giroDaCarta + 'deg)';
        // Só aparece quando o pacotinho já está de frente (antes disso ficaria de fora, no giro)
        carta.style.opacity = trecho(0.25, 0.29, p);
      });

      const entra1 = trecho(0.02, 0.1, p);
      tituloDoPacote1.style.opacity = entra1 * (1 - trecho(0.26, 0.34, p));
      tituloDoPacote1.style.transform = 'translateY(' + ((1 - entra1) * 18) + 'px)';
      const entra2 = trecho(0.78, 0.9, p);
      tituloDoPacote2.style.opacity = entra2;
      tituloDoPacote2.style.transform = 'translateY(' + ((1 - entra2) * 18) + 'px)';
    },

    parar: function () {
      limparEstilos([pacote, abaDoPacote, telaDeQuadros, tituloDoPacote1, tituloDoPacote2].concat(cartas));
      quadroMostrado = -1;
    },
  });

  window.addEventListener('load', function () {
    paginaCarregada = true;
    if (cenasEmMovimento) carregarQuadros();
  });

  // -------------------------------------------------------------------------
  // 4. O álbum abre
  // -------------------------------------------------------------------------

  const livro = document.getElementById('livro');
  const folhaCapa = document.getElementById('folha-capa');
  const folha1 = document.getElementById('folha-1');
  const tituloDoLivro = document.getElementById('titulo-cena-album');
  const acaoDoLivro = document.getElementById('acao-do-album');

  // Monta uma página do álbum: o nome da seleção e as seis figurinhas dela,
  // umas coladas e outras ainda em vaga. É uma amostra, não o álbum da pessoa.
  function montarPagina(idDaFace, selecao) {
    const miolo = criarElemento('div', 'miolo');

    const cabeca = criarElemento('div', 'miolo-cabeca');
    const bandeira = document.createElement('img');
    bandeira.src = 'assets/bandeiras/' + selecao.bandeira + '.svg';
    bandeira.alt = '';
    cabeca.append(bandeira, criarElemento('span', 'miolo-nome', selecao.nome), criarElemento('span', 'miolo-grupo', 'Grupo ' + selecao.grupo));

    const grade = criarElemento('div', 'miolo-grade');
    const figurinhas = figurinhasDaSelecao(selecao.id);
    for (const fig of figurinhas) {
      if (fig.numero % 4 === 2) {
        // Uma vaga: a figurinha que ainda falta
        const vaga = criarElemento('div', 'vaga');
        vaga.append(criarElemento('span', 'vaga-numero', String(fig.numero)), criarElemento('span', 'vaga-nome', fig.nome));
        grade.append(vaga);
      } else {
        grade.append(criarFigurinha(fig, {}));
      }
    }

    const primeira = figurinhas[0].numero;
    const ultima = figurinhas[figurinhas.length - 1].numero;
    miolo.append(cabeca, grade, criarElemento('p', 'miolo-pe', 'Nº ' + primeira + ' a ' + ultima));
    document.getElementById(idDaFace).append(miolo);
  }

  const selecoesDoGrupoC = SELECOES.filter(function (selecao) { return selecao.grupo === 'C'; });
  ['pagina-1', 'pagina-2', 'pagina-3', 'pagina-base'].forEach(function (idDaFace, i) {
    montarPagina(idDaFace, selecoesDoGrupoC[i]);
  });

  registrarCena(document.querySelector('.cena-album'), {
    medir: function () {
      // O miolo foi desenhado com 480 px de largura: aqui se calcula o quanto
      // encolher ou aumentar para caber na folha (descontando a borda de 2 px de cada lado)
      const larguraDaPagina = document.getElementById('pagina-2').offsetWidth;
      livro.style.setProperty('--escala', ((larguraDaPagina - 4) / 480).toFixed(4));
    },

    desenhar: function (p) {
      const levanta = trecho(0, 0.16, p);    // o álbum deitado se levanta
      const capa = trecho(0.14, 0.5, p);     // a capa vira
      const folha = trecho(0.58, 0.86, p);   // a primeira folha vira

      // Fechado, o álbum fica no meio do palco. Aberto, quem fica no meio é a
      // lombada: por isso ele anda meia página para a direita enquanto a capa vira.
      const inclinado = misturar(58, 14, levanta) - trecho(0.9, 1, p) * 6;
      livro.style.transform = 'translateX(' + (capa * 50) + '%) rotateX(' + inclinado + 'deg) scale(' + misturar(0.72, 1, levanta) + ')';

      // Cada folha gira até 180 graus em torno da lombada. As sobras de menos de
      // um grau deixam a folha de cima um fio acima da de baixo, para o navegador
      // nunca ficar em dúvida sobre qual está na frente.
      folhaCapa.style.transform = 'rotateY(' + misturar(-0.6, -180, capa) + 'deg)';
      folha1.style.transform = 'rotateY(' + misturar(-0.3, -179.7, folha) + 'deg)';
      folhaCapa.style.zIndex = capa > 0.5 ? 1 : 3;
      folha1.style.zIndex = 2;

      // A sombra é mais forte com a folha em pé (90 graus) e some com ela deitada
      folhaCapa.style.setProperty('--sombra', (Math.sin(capa * Math.PI) * 0.7).toFixed(3));
      folha1.style.setProperty('--sombra', (Math.sin(folha * Math.PI) * 0.7).toFixed(3));

      tituloDoLivro.style.opacity = 1 - trecho(0.2, 0.32, p);
      const acao = trecho(0.88, 0.97, p);
      acaoDoLivro.style.opacity = acao;
      acaoDoLivro.style.pointerEvents = acao < 0.5 ? 'none' : '';
    },

    parar: function () {
      const escala = livro.style.getPropertyValue('--escala');
      limparEstilos([livro, folhaCapa, folha1, tituloDoLivro, acaoDoLivro]);
      livro.style.setProperty('--escala', escala);
    },
  });

  // -------------------------------------------------------------------------
  // 5. Mergulho na figurinha
  // -------------------------------------------------------------------------

  const mergulho = document.getElementById('mergulho');
  const fimDoMergulho = document.getElementById('mergulho-fim');
  const etiquetaDoMergulho = fimDoMergulho.querySelector('.mergulho-etiqueta');
  const figurinhaDoMergulho = criarFigurinha(figurinhaPorNumero(54), {});
  const giroDoMergulho = giroDaFigurinha(54) + 4;
  mergulho.append(figurinhaDoMergulho);
  // A camada de cor do fim usa a mesma cor do retrato da figurinha
  fimDoMergulho.style.setProperty('--campo', selecaoPorId(figurinhaPorNumero(54).selecao).cores.campo);
  let aumentoMaximo = 30;

  registrarCena(document.querySelector('.cena-mergulho'), {
    medir: function () {
      if (!cenasEmMovimento) return;   // parada, a figurinha nem aparece
      // O mergulho mira em um ponto do retrato onde só existe a cor lisa:
      // o canto de cima, à esquerda da cabeça e acima dos pontinhos.
      const arte = figurinhaDoMergulho.querySelector('.figurinha-arte');
      const folgaX = arte.offsetWidth * 0.18;
      const folgaY = arte.offsetHeight * 0.17;
      const miraX = arte.offsetLeft + folgaX;
      const miraY = arte.offsetTop + folgaY;
      mergulho.style.transformOrigin = miraX + 'px ' + miraY + 'px';

      // Quanto aumentar para esse pedaço liso cobrir a tela inteira?
      const palco = mergulho.parentElement;
      const naTelaX = mergulho.offsetLeft + miraX;
      const naTelaY = mergulho.offsetTop + miraY;
      aumentoMaximo = 1.15 * Math.max(
        naTelaX / folgaX,
        (palco.clientWidth - naTelaX) / folgaX,
        naTelaY / folgaY,
        (palco.clientHeight - naTelaY) / folgaY
      );
    },

    desenhar: function (p) {
      // O aumento cresce como juros compostos (potência): assim a velocidade
      // do mergulho parece constante, em vez de disparar no fim
      const aumento = Math.pow(aumentoMaximo, trecho(0.1, 0.62, p));
      const giro = giroDoMergulho * (1 - trecho(0.08, 0.3, p));
      mergulho.style.transform = 'scale(' + aumento.toFixed(3) + ') rotate(' + giro.toFixed(2) + 'deg)';

      const cor = trecho(0.5, 0.63, p);
      fimDoMergulho.style.opacity = cor;
      // Com a tela já tomada pela cor, a figurinha gigante deixa de ser desenhada
      mergulho.style.visibility = cor >= 1 ? 'hidden' : 'visible';

      const etiqueta = trecho(0.66, 0.82, p);
      etiquetaDoMergulho.style.opacity = etiqueta;
      etiquetaDoMergulho.style.transform = 'translateY(' + ((1 - etiqueta) * 40) + 'px)';
    },

    parar: function () {
      const campo = fimDoMergulho.style.getPropertyValue('--campo');
      limparEstilos([mergulho, fimDoMergulho, etiquetaDoMergulho]);
      fimDoMergulho.style.setProperty('--campo', campo);
    },
  });

  // -------------------------------------------------------------------------
  // 6. Os números contam
  // -------------------------------------------------------------------------

  // Os valores vêm dos dados do site, na mesma ordem das casas do HTML:
  // seleções, figurinhas, cidades-sede e jogos
  const VALORES = [SELECOES.length, FIGURINHAS.length, SEDES.length, COPA.numeros.jogos];
  const numeros = Array.from(document.querySelectorAll('#numeros .numero')).map(function (caixa, i) {
    // O número que conta é só para os olhos. O leitor de tela lê o valor final.
    const visor = criarElemento('span', '', String(VALORES[i]));
    visor.setAttribute('aria-hidden', 'true');
    const casa = caixa.querySelector('dd');
    casa.textContent = '';
    casa.append(visor, criarElemento('span', 'escondido', String(VALORES[i])));
    return { caixa: caixa, visor: visor, valor: VALORES[i], mostrado: VALORES[i] };
  });

  const campoDosNumeros = document.getElementById('campo-dos-numeros');

  function mostrarNumero(numero, valor) {
    if (valor === numero.mostrado) return;
    numero.mostrado = valor;
    numero.visor.textContent = String(valor);
  }

  registrarCena(document.querySelector('.cena-numeros'), {
    desenhar: function (p) {
      numeros.forEach(function (numero, i) {
        const t = trecho(0.08 + i * 0.2, 0.3 + i * 0.2, p);   // cada número tem a sua vez
        mostrarNumero(numero, Math.round(numero.valor * t));
        numero.caixa.style.setProperty('--aceso', t.toFixed(3));
      });
      // As linhas do campo se desenham enquanto os números contam
      // ("--falta" é o pedaço do traço que ainda não apareceu)
      campoDosNumeros.style.setProperty('--falta', (1 - trecho(0.02, 0.62, p)).toFixed(3));
    },

    parar: function () {
      for (const numero of numeros) {
        mostrarNumero(numero, numero.valor);
        numero.caixa.style.removeProperty('--aceso');
      }
      campoDosNumeros.style.removeProperty('--falta');   // parado, o campo aparece pronto
    },
  });

  // -------------------------------------------------------------------------
  // 7. Os grupos andam para o lado
  // -------------------------------------------------------------------------

  const trilha = document.getElementById('trilha');
  const palcoDaTrilha = trilha.parentElement;

  // Um painel por grupo: a letra, as quatro seleções e o link para o álbum
  const paineis = gruposDoAlbum().sort().map(function (letra) {
    const painel = criarElemento('div', 'grupo');

    const titulo = document.createElement('h3');
    titulo.append('Grupo ', criarElemento('span', 'grupo-letra', letra));

    const lista = criarElemento('ul', 'grupo-selecoes');
    for (const selecao of SELECOES.filter(function (s) { return s.grupo === letra; })) {
      const item = document.createElement('li');
      const selo = criarElemento('span', 'selo');
      const bandeira = document.createElement('img');
      bandeira.src = 'assets/bandeiras/' + selecao.bandeira + '.svg';
      bandeira.alt = '';              // o nome da seleção vem escrito logo abaixo
      bandeira.loading = 'lazy';      // a imagem só é baixada quando está chegando perto da tela
      selo.append(bandeira);
      item.append(selo, selecao.nome);
      lista.append(item);
    }

    const figurinhas = figurinhasDoGrupo(letra);
    const numeros = criarElemento('p', 'grupo-numeros', figurinhas.length + ' figurinhas, da Nº ' + figurinhas[0].numero + ' à Nº ' + figurinhas[figurinhas.length - 1].numero);

    const link = criarElemento('a', '', 'Ver o Grupo ' + letra + ' no álbum');
    link.href = 'album.html#titulo-grupo-' + letra;

    painel.append(titulo, lista, numeros, link);
    trilha.append(painel);
    return { elemento: painel, centro: 0, foco: -1 };
  });
  let sobraDaTrilha = 0;
  let larguraDoPalcoDaTrilha = 0;

  const cenaDosGrupos = registrarCena(document.querySelector('.cena-grupos'), {
    medir: function () {
      larguraDoPalcoDaTrilha = palcoDaTrilha.clientWidth;
      sobraDaTrilha = Math.max(0, trilha.scrollWidth - larguraDoPalcoDaTrilha);   // o quanto a faixa passa da tela
      for (const painel of paineis) {
        painel.centro = painel.elemento.offsetLeft + painel.elemento.offsetWidth / 2;
        painel.foco = -1;
      }
    },

    desenhar: function (p) {
      // A rolagem para baixo vira deslocamento para a esquerda
      const deslocamento = limitar((p - 0.04) / 0.92) * sobraDaTrilha;
      trilha.style.transform = 'translate3d(' + (-deslocamento).toFixed(1) + 'px, 0, 0)';

      const meio = larguraDoPalcoDaTrilha / 2;
      for (const painel of paineis) {
        // A que distância este grupo está do meio da tela? 1 = bem no meio
        const perto = limitar(1 - Math.abs(painel.centro - deslocamento - meio) / (larguraDoPalcoDaTrilha * 0.42));
        const foco = Number((perto * perto * (3 - 2 * perto)).toFixed(3));
        if (foco === painel.foco) continue;
        painel.foco = foco;
        painel.elemento.style.setProperty('--f', foco);
        painel.elemento.classList.toggle('grupo-colado', foco > 0.55);
      }
    },

    parar: function () {
      trilha.removeAttribute('style');
      for (const painel of paineis) {
        painel.elemento.removeAttribute('style');
        painel.elemento.classList.add('grupo-colado');   // parados, todos já são figurinha
        painel.foco = -1;
      }
    },
  });

  // Teclado: quando um link de um grupo recebe o foco, a rolagem leva a faixa
  // até esse grupo. Sem isto, o foco poderia cair em um link fora da tela.
  trilha.addEventListener('focusin', function (evento) {
    if (!cenasEmMovimento) return;
    const painel = paineis.find(function (item) { return item.elemento.contains(evento.target); });
    if (!painel || sobraDaTrilha === 0) return;
    const deslocamento = limitar((painel.centro - larguraDoPalcoDaTrilha / 2) / sobraDaTrilha) * sobraDaTrilha;
    const p = 0.04 + 0.92 * deslocamento / sobraDaTrilha;
    focarNaCena(cenaDosGrupos, p);
  });

  // Ao dar o foco, o navegador pode tentar rolar o palco para o lado por conta
  // própria. Quem move a faixa é só a cena: o palco volta para o lugar.
  palcoDaTrilha.addEventListener('scroll', function () {
    palcoDaTrilha.scrollLeft = 0;
    palcoDaTrilha.scrollTop = 0;
  });

  // -------------------------------------------------------------------------
  // 8. Voo pelas figurinhas
  // -------------------------------------------------------------------------

  const voo = document.getElementById('voo');
  const fimDoVoo = document.getElementById('voo-fim');
  const QUANTAS_NO_VOO = window.innerWidth < 640 ? 26 : 44;
  const FUNDO_DO_VOO = 5200;   // a profundidade da figurinha mais distante, em pixels
  const acasoDoVoo = sorteador(288);
  const itensDoVoo = [];

  for (let i = 0; i < QUANTAS_NO_VOO; i++) {
    // 37 e 288 não têm divisor em comum: a conta passa por seleções bem diferentes
    const figurinha = criarFigurinha(figurinhaPorNumero(1 + (i * 37) % FIGURINHAS.length), {});
    figurinha.classList.add('voo-item');
    voo.append(figurinha);
    itensDoVoo.push({
      elemento: figurinha,
      lugarX: acasoDoVoo() * 2 - 1,     // de -1 (esquerda) a 1 (direita)
      lugarY: acasoDoVoo() * 2 - 1,
      z: -300 - (i / (QUANTAS_NO_VOO - 1)) * FUNDO_DO_VOO,
      giro: (acasoDoVoo() * 2 - 1) * 12,
      virada: (acasoDoVoo() * 2 - 1) * 22,
      aparece: -1,
    });
  }

  registrarCena(document.querySelector('.cena-voo'), {
    medir: function () {
      const palco = voo.parentElement;
      const largura = palco.clientWidth;
      const altura = palco.clientHeight;
      for (const item of itensDoVoo) {
        let x = item.lugarX * largura;
        const y = item.lugarY * altura * 0.8;
        // O meio fica livre: a câmera passa por ali, e é onde entra o título
        if (Math.abs(x) < largura * 0.16 && Math.abs(y) < altura * 0.22) {
          x = (item.lugarX < 0 ? -1 : 1) * largura * (0.16 + Math.abs(item.lugarY) * 0.2);
        }
        item.elemento.style.transform = 'translate3d(' + x.toFixed(0) + 'px, ' + y.toFixed(0) + 'px, ' + item.z.toFixed(0) + 'px) rotateY(' + item.virada.toFixed(1) + 'deg) rotate(' + item.giro.toFixed(1) + 'deg)';
        item.aparece = -1;
      }
    },

    desenhar: function (p) {
      // A câmera não anda: é o conjunto das figurinhas que vem para a frente
      const camera = trecho(0, 0.9, p) * (FUNDO_DO_VOO + 900);
      voo.style.transform = 'translateZ(' + camera.toFixed(1) + 'px)';

      for (const item of itensDoVoo) {
        const distancia = item.z + camera;   // negativa = ainda longe; perto de 900 = encostando no olho
        // Longe, a figurinha aparece aos poucos (neblina). Bem perto, some antes de bater na câmera.
        const aparece = Number((limitar((distancia + 4200) / 1400) * limitar((700 - distancia) / 350)).toFixed(2));
        if (aparece === item.aparece) continue;
        item.aparece = aparece;
        item.elemento.style.opacity = aparece;
        item.elemento.style.visibility = aparece === 0 ? 'hidden' : 'visible';
      }

      const chegou = trecho(0.8, 0.94, p);
      fimDoVoo.style.opacity = chegou;
      fimDoVoo.style.scale = misturar(0.86, 1, chegou).toFixed(3);
      fimDoVoo.style.pointerEvents = chegou < 0.5 ? 'none' : '';
    },

    parar: function () {
      limparEstilos([voo, fimDoVoo]);
    },
  });

  // -------------------------------------------------------------------------
  // Começar
  // -------------------------------------------------------------------------

  comecarCenas();

  // As letras de "Colei!" só podem ser lidas depois que a fonte do site chegar
  if (document.fonts && document.fonts.load) {
    document.fonts.load('900 100px "Londrina Solid"').then(function () {
      montarReticula();
      cenaDaAbertura.suja = true;
      if (!cenasEmMovimento) cenaDaAbertura.parar();
    });
  }
});
````

### js/pacote3d.js

````js
// ============================================================================
// pacote3d.js
// ----------------------------------------------------------------------------
// O pacotinho de figurinhas como um objeto 3D de verdade, desenhado pela placa
// de vídeo (WebGL) com a biblioteca Three.js.
//
// É a ÚNICA parte do site que usa uma biblioteca externa. Ela serve para duas
// coisas:
//   1. gerar a sequência de quadros da página inicial (scripts/quadros.html);
//   2. mostrar o pacotinho ao vivo na página Pacotinhos.
//
// Como o pacotinho é montado:
//   - duas folhas (frente e costas), cada uma um plano cheio de pontos;
//   - cada ponto é empurrado para fora no meio, formando a "barriga" do
//     pacotinho cheio, e fica chato nas bordas, onde ele é selado;
//   - a estampa (marca, picote, retícula) é desenhada em um <canvas> comum e
//     colada nas folhas como uma textura;
//   - a parte de cima (a aba) é uma peça separada, para poder ser rasgada.
//
// Depende de: js/vendor/three.min.js (Three.js r128, licença MIT).
// ============================================================================

function criarPacote3d(tela, opcoes) {
  'use strict';
  opcoes = opcoes || {};

  // Medidas do pacotinho, em "unidades" do mundo 3D. A proporção é 5 por 7,
  // a mesma do pacotinho desenhado em CSS.
  const LARGURA = 5;
  const ALTURA = 7;
  const CORTE = 0.86;      // o picote fica a 86% da altura; acima dele é a aba
  const BARRIGA = 0.5;     // o quanto o meio do pacotinho estufa
  const DISTANCIA = 30;    // da câmera até o pacotinho

  // "Quanto deste trecho já passou?" (0 antes, 1 depois, suave no meio)
  function suave(inicio, fim, t) {
    const x = Math.min(1, Math.max(0, (t - inicio) / (fim - inicio)));
    return x * x * (3 - 2 * x);
  }

  function misturar(a, b, t) {
    return a + (b - a) * t;
  }

  const GRAU = Math.PI / 180;   // a Three.js mede ângulos em radianos

  // -------------------------------------------------------------------------
  // 1. Desenhista, cena, câmera e luz
  // -------------------------------------------------------------------------

  // alpha: true deixa o fundo transparente: só o pacotinho é desenhado.
  // preserveDrawingBuffer: true permite copiar o desenho para uma imagem.
  const desenhista = new THREE.WebGLRenderer({ canvas: tela, alpha: true, antialias: true, preserveDrawingBuffer: true });
  desenhista.setClearColor(0x000000, 0);
  desenhista.outputEncoding = THREE.sRGBEncoding;   // cores na tela iguais às do CSS

  const cena = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(30, 1, 1, 100);
  camera.position.z = DISTANCIA;

  cena.add(new THREE.HemisphereLight(0xffffff, 0xd0c8cc, 0.5));   // luz geral, de cima e de baixo
  const lampada = new THREE.DirectionalLight(0xffffff, 0.8);       // uma lâmpada, em cima à esquerda
  lampada.position.set(-9, 10, 9);
  cena.add(lampada);

  // Papel laminado só parece laminado se tiver o que refletir. Aqui é montado
  // um "estúdio" de mentira: uma sala escura com painéis de luz. A Three.js
  // fotografa essa sala em todas as direções e usa a foto como reflexo.
  function criarReflexos() {
    const estudio = new THREE.Scene();
    estudio.background = new THREE.Color(0x303034);
    function painel(cor, largura, altura, x, y, z) {
      const luz = new THREE.Mesh(new THREE.PlaneGeometry(largura, altura), new THREE.MeshBasicMaterial({ color: cor, side: THREE.DoubleSide }));
      luz.position.set(x, y, z);
      luz.lookAt(0, 0, 0);
      estudio.add(luz);
    }
    painel(0xffffff, 14, 8, -10, 12, 10);    // janela grande, em cima à esquerda
    painel(0xffffff, 3, 16, 14, 2, 6);       // faixa de luz à direita
    painel(0xd8d2d6, 20, 6, 0, -12, 8);      // rebatedor embaixo
    painel(0xffffff, 10, 10, 0, 6, -14);     // luz de trás
    const fotografo = new THREE.PMREMGenerator(desenhista);
    const reflexos = fotografo.fromScene(estudio, 0.03).texture;
    fotografo.dispose();
    return reflexos;
  }
  const reflexos = criarReflexos();

  // -------------------------------------------------------------------------
  // 2. A estampa: desenhada em <canvas> comum e usada como textura
  // -------------------------------------------------------------------------

  const ESTAMPA_L = 1000;
  const ESTAMPA_A = 1400;
  const FONTE_DESTAQUE = '"Londrina Solid", "Arial Black", sans-serif';
  const FONTE_LEITURA = '"Atkinson Hyperlegible Next", "Segoe UI", Arial, sans-serif';

  function novaTela() {
    const nova = document.createElement('canvas');
    nova.width = ESTAMPA_L;
    nova.height = ESTAMPA_A;
    return nova;
  }

  const telaDaFrente = novaTela();
  const telaDasCostas = novaTela();
  const telaDoRecorte = novaTela();
  const telaDoRelevo = novaTela();

  // As cores vêm do CSS (tokens.css): as mesmas do pacotinho desenhado em CSS.
  // Assim o pacotinho 3D troca de cor junto com o tema.
  function lerCores() {
    const estilo = getComputedStyle(document.documentElement);
    return {
      papel: estilo.getPropertyValue('--cor-etiqueta-fundo').trim() || '#14204F',
      tinta: estilo.getPropertyValue('--cor-etiqueta-texto').trim() || '#F6CDD7',
      prata: estilo.getPropertyValue('--cor-prata').trim() || '#C5CAD6',
    };
  }

  // O que frente e costas têm em comum: o papel, a retícula, o picote e as
  // faixas seladas em cima e embaixo
  function estamparBase(pincel, cores) {
    pincel.globalCompositeOperation = 'source-over';
    pincel.globalAlpha = 1;
    pincel.fillStyle = cores.papel;
    pincel.fillRect(0, 0, ESTAMPA_L, ESTAMPA_A);

    // Retícula: pontinhos na cor da tinta, bem fracos
    pincel.fillStyle = cores.tinta;
    pincel.globalAlpha = 0.3;
    pincel.beginPath();
    for (let y = 13; y < ESTAMPA_A; y += 26) {
      for (let x = 13; x < ESTAMPA_L; x += 26) {
        pincel.moveTo(x + 3, y);
        pincel.arc(x, y, 3, 0, 6.283);
      }
    }
    pincel.fill();

    // As faixas seladas: risquinhos deitados, como o papel prensado
    pincel.globalAlpha = 0.28;
    for (let y = 6; y < 74; y += 10) {
      pincel.fillRect(0, y, ESTAMPA_L, 3);
      pincel.fillRect(0, ESTAMPA_A - y - 3, ESTAMPA_L, 3);
    }

    // O picote: linha tracejada na altura do corte
    pincel.globalAlpha = 1;
    pincel.strokeStyle = cores.tinta;
    pincel.lineWidth = 6;
    pincel.setLineDash([24, 16]);
    pincel.beginPath();
    pincel.moveTo(0, ESTAMPA_A * (1 - CORTE));
    pincel.lineTo(ESTAMPA_L, ESTAMPA_A * (1 - CORTE));
    pincel.stroke();
    pincel.setLineDash([]);
  }

  // Um texto em cima de uma faixa lisa, para os pontinhos não atrapalharem a leitura
  function estamparTexto(pincel, cores, texto, fonte, x, y, giro) {
    pincel.save();
    pincel.translate(x, y);
    pincel.rotate((giro || 0) * GRAU);
    pincel.font = fonte;
    pincel.textAlign = 'center';
    pincel.textBaseline = 'middle';
    const medida = pincel.measureText(texto);
    const altura = (medida.actualBoundingBoxAscent + medida.actualBoundingBoxDescent) || 60;
    pincel.fillStyle = cores.papel;
    pincel.fillRect(-medida.width / 2 - 22, -altura / 2 - 14, medida.width + 44, altura + 28);
    pincel.fillStyle = cores.tinta;
    pincel.fillText(texto, 0, 0);
    pincel.restore();
  }

  // As bordas de cima e de baixo são cortadas em serrilha, como em um pacotinho
  // de verdade. O recorte é feito apagando triângulos do desenho.
  function serrilhar(pincel) {
    pincel.globalCompositeOperation = 'destination-out';
    pincel.beginPath();
    for (let x = 0; x < ESTAMPA_L; x += 40) {
      pincel.moveTo(x, 0);
      pincel.lineTo(x + 20, 22);
      pincel.lineTo(x + 40, 0);
      pincel.moveTo(x, ESTAMPA_A);
      pincel.lineTo(x + 20, ESTAMPA_A - 22);
      pincel.lineTo(x + 40, ESTAMPA_A);
    }
    pincel.fill();
    pincel.globalCompositeOperation = 'source-over';
  }

  function estampar() {
    const cores = lerCores();

    // Frente
    let pincel = telaDaFrente.getContext('2d');
    pincel.clearRect(0, 0, ESTAMPA_L, ESTAMPA_A);
    estamparBase(pincel, cores);
    estamparTexto(pincel, cores, 'Rasgue aqui', '700 58px ' + FONTE_LEITURA, 500, 112);
    estamparTexto(pincel, cores, 'Colei!', '900 290px ' + FONTE_DESTAQUE, 500, 760, -6);
    estamparTexto(pincel, cores, '5 figurinhas', '700 74px ' + FONTE_LEITURA, 500, 1010);
    serrilhar(pincel);

    // Costas: a emenda do papel no meio e dois textos
    pincel = telaDasCostas.getContext('2d');
    pincel.clearRect(0, 0, ESTAMPA_L, ESTAMPA_A);
    estamparBase(pincel, cores);
    pincel.fillStyle = cores.tinta;
    pincel.globalAlpha = 0.16;
    pincel.fillRect(468, 0, 64, ESTAMPA_A);
    pincel.globalAlpha = 0.5;
    pincel.fillRect(468, 0, 4, ESTAMPA_A);
    pincel.fillRect(528, 0, 4, ESTAMPA_A);
    pincel.globalAlpha = 1;
    estamparTexto(pincel, cores, 'Álbum da Copa 2026', '700 66px ' + FONTE_LEITURA, 500, 620);
    estamparTexto(pincel, cores, 'Abra pelo picote', '700 66px ' + FONTE_LEITURA, 500, 760);
    serrilhar(pincel);

    // O recorte sozinho, em preto e branco, para o lado de dentro do pacotinho
    pincel = telaDoRecorte.getContext('2d');
    pincel.fillStyle = '#FFFFFF';
    pincel.fillRect(0, 0, ESTAMPA_L, ESTAMPA_A);
    pincel.fillStyle = '#000000';
    pincel.beginPath();
    for (let x = 0; x < ESTAMPA_L; x += 40) {
      pincel.moveTo(x, 0);
      pincel.lineTo(x + 20, 22);
      pincel.lineTo(x + 40, 0);
      pincel.moveTo(x, ESTAMPA_A);
      pincel.lineTo(x + 20, ESTAMPA_A - 22);
      pincel.lineTo(x + 40, ESTAMPA_A);
    }
    pincel.fill();

    texturaDaFrente.needsUpdate = true;
    texturaDasCostas.needsUpdate = true;
    texturaDoRecorte.needsUpdate = true;
    materialDeDentro.color.set(cores.prata);
  }

  // O relevo: um desenho em tons de cinza que diz onde o papel é amassado.
  // Claro = alto, escuro = fundo. A luz usa isso para fazer brilhos e sombras.
  function desenharRelevo() {
    const pincel = telaDoRelevo.getContext('2d');
    pincel.fillStyle = '#808080';
    pincel.fillRect(0, 0, ESTAMPA_L, ESTAMPA_A);

    // Um sorteio que se repete, para o amassado ser sempre o mesmo
    let semente = 2026;
    function acaso() {
      semente = (semente * 1664525 + 1013904223) % 4294967296;
      return semente / 4294967296;
    }

    // Vincos: riscos largos e esfumados, uns claros e outros escuros
    pincel.lineCap = 'round';
    for (let i = 0; i < 70; i++) {
      const x = acaso() * ESTAMPA_L;
      const y = acaso() * ESTAMPA_A;
      const angulo = acaso() * 6.283;
      const comprimento = 120 + acaso() * 380;
      const tom = acaso() < 0.5 ? 255 : 0;
      pincel.strokeStyle = 'rgba(' + tom + ',' + tom + ',' + tom + ',0.1)';
      for (const largura of [60, 34, 14]) {
        pincel.lineWidth = largura;
        pincel.beginPath();
        pincel.moveTo(x, y);
        pincel.lineTo(x + Math.cos(angulo) * comprimento, y + Math.sin(angulo) * comprimento);
        pincel.stroke();
      }
    }

    // Faixas seladas: degraus bem marcados
    for (let y = 0; y < 76; y += 10) {
      pincel.fillStyle = '#C8C8C8';
      pincel.fillRect(0, y, ESTAMPA_L, 5);
      pincel.fillRect(0, ESTAMPA_A - y - 5, ESTAMPA_L, 5);
      pincel.fillStyle = '#404040';
      pincel.fillRect(0, y + 5, ESTAMPA_L, 5);
      pincel.fillRect(0, ESTAMPA_A - y - 10, ESTAMPA_L, 5);
    }
  }

  function criarTextura(telaDeOrigem, colorida) {
    const textura = new THREE.CanvasTexture(telaDeOrigem);
    if (colorida) textura.encoding = THREE.sRGBEncoding;
    textura.anisotropy = desenhista.capabilities.getMaxAnisotropy();   // nitidez quando o pacotinho está de lado
    return textura;
  }

  const texturaDaFrente = criarTextura(telaDaFrente, true);
  const texturaDasCostas = criarTextura(telaDasCostas, true);
  const texturaDoRecorte = criarTextura(telaDoRecorte, false);
  const texturaDoRelevo = criarTextura(telaDoRelevo, false);

  // -------------------------------------------------------------------------
  // 3. Os materiais
  // -------------------------------------------------------------------------
  // metalness = o quanto parece metal; roughness = o quanto é áspero (fosco).
  // Papel laminado: bastante metal e pouco áspero.

  function criarMaterialDeFora(textura, some) {
    return new THREE.MeshStandardMaterial({
      map: textura,
      bumpMap: texturaDoRelevo,
      bumpScale: 0.06,
      metalness: 0.55,
      roughness: 0.36,
      envMap: reflexos,
      envMapIntensity: 1,      // a força dos reflexos
      alphaTest: 0.5,          // o que é transparente na estampa (a serrilha) não é desenhado
      transparent: some,       // só a aba precisa sumir aos poucos
    });
  }

  // O lado de dentro é prateado, como em todo pacotinho laminado
  const materialDeDentro = new THREE.MeshStandardMaterial({
    color: 0xC5CAD6,
    metalness: 0.85,
    roughness: 0.3,
    envMap: reflexos,
    alphaMap: texturaDoRecorte,
    alphaTest: 0.5,
    side: THREE.BackSide,      // só é desenhado quando visto por dentro
  });

  // -------------------------------------------------------------------------
  // 4. A forma
  // -------------------------------------------------------------------------

  // O quanto o ponto (u, v) estufa para fora. u vai de 0 (esquerda) a 1
  // (direita); v vai de 0 (embaixo) a 1 (em cima).
  function barriga(u, v) {
    const dosLados = Math.pow(Math.sin(Math.PI * u), 0.55);           // chato nas laterais
    const dasPontas = suave(0.05, 0.24, v) * (1 - suave(0.78, 0.95, v));   // chato nas faixas seladas
    const rugas = 0.03 * Math.sin(u * 19 + v * 9) * Math.sin(v * 27 - u * 6);
    return (BARRIGA * dosLados + rugas) * dasPontas;
  }

  // Uma folha: um plano que vai de vInicio a vFim da altura do pacotinho.
  // Ela tem dois lados: o de fora, com a estampa, e o de dentro, prateado.
  function criarFolha(vInicio, vFim, materialDeFora) {
    const fatia = vFim - vInicio;
    const forma = new THREE.PlaneGeometry(LARGURA, ALTURA * fatia, 28, Math.max(6, Math.round(64 * fatia)));
    const lugares = forma.attributes.position;
    const uvs = forma.attributes.uv;
    for (let i = 0; i < lugares.count; i++) {
      const u = uvs.getX(i);
      const v = vInicio + uvs.getY(i) * fatia;
      uvs.setY(i, v);                         // a textura usa só a fatia que cabe a esta folha
      lugares.setZ(i, barriga(u, v));         // empurra o ponto para fora
    }
    forma.computeVertexNormals();             // recalcula para onde cada pedacinho "olha", para a luz

    const folha = new THREE.Group();
    folha.add(new THREE.Mesh(forma, materialDeFora), new THREE.Mesh(forma, materialDeDentro));
    return folha;
  }

  // Uma peça: frente e costas da mesma fatia. As costas são a mesma folha,
  // virada meia volta.
  function criarPeca(vInicio, vFim, some) {
    const materiais = [criarMaterialDeFora(texturaDaFrente, some), criarMaterialDeFora(texturaDasCostas, some)];
    const peca = new THREE.Group();
    const frente = criarFolha(vInicio, vFim, materiais[0]);
    const costas = criarFolha(vInicio, vFim, materiais[1]);
    costas.rotation.y = Math.PI;
    peca.add(frente, costas);
    peca.userData.materiais = materiais;
    return peca;
  }

  const pacote = new THREE.Group();   // o pacotinho inteiro: é ele que gira e cai
  cena.add(pacote);

  // O corpo: do pé até o picote
  const corpo = criarPeca(0, CORTE, false);
  corpo.position.y = ALTURA * (CORTE / 2 - 0.5);
  pacote.add(corpo);

  // A aba: do picote até o topo. Ela fica presa a um "eixo" no canto de baixo,
  // à esquerda: é em torno desse canto que ela gira quando é rasgada.
  const alturaDaAba = ALTURA * (1 - CORTE);
  const eixoDaAba = new THREE.Group();
  eixoDaAba.position.set(-LARGURA / 2, ALTURA * (CORTE - 0.5), 0);
  const aba = criarPeca(CORTE, 1, true);
  aba.position.set(LARGURA / 2, alturaDaAba / 2, 0);
  eixoDaAba.add(aba);
  pacote.add(eixoDaAba);

  // -------------------------------------------------------------------------
  // 5. As poses
  // -------------------------------------------------------------------------

  // Põe o pacotinho em uma pose. Tudo em graus e em unidades do mundo 3D.
  //   rasgo: 0 = aba no lugar; 1 = aba arrancada e sumida
  function aplicar(pose) {
    pacote.rotation.set((pose.giroX || 0) * GRAU, (pose.giroY || 0) * GRAU, (pose.giroZ || 0) * GRAU);
    pacote.position.set(pose.x || 0, pose.y || 0, 0);
    pacote.scale.setScalar(pose.tamanho === undefined ? 1 : pose.tamanho);

    const rasgo = pose.rasgo || 0;
    eixoDaAba.visible = rasgo < 1;
    eixoDaAba.rotation.set(rasgo * -70 * GRAU, rasgo * 40 * GRAU, rasgo * 52 * GRAU);
    eixoDaAba.position.set(-LARGURA / 2 + rasgo * 2.4, ALTURA * (CORTE - 0.5) + rasgo * 3.4, rasgo * 1.5);
    const opacidade = 1 - suave(0.55, 1, rasgo);
    for (const material of aba.userData.materiais) material.opacity = opacidade;
  }

  // A coreografia da cena da página inicial. t vai de 0 a 1:
  //   0,00 a 0,39  o pacotinho entra girando, de costas para a frente
  //   0,39 a 0,56  a aba é rasgada pelo picote
  //   0,56 a 0,76  ele espera, aberto, virando devagar (é quando as figurinhas sobem)
  //   0,76 a 1,00  vazio, ele cai para fora do quadro
  function posar(t) {
    const chegada = suave(0, 0.39, t);
    const rasgo = suave(0.39, 0.56, t);
    const queda = suave(0.76, 1, t);
    aplicar({
      giroY: misturar(-205, 9, chegada) - suave(0.39, 0.76, t) * 18,   // depois de chegar, vira devagar de um lado para o outro
      giroX: misturar(22, 0, chegada) + queda * 62,
      giroZ: Math.sin(rasgo * Math.PI) * -3 + queda * -12,   // dá um tranco quando a aba sai
      y: misturar(-3.2, 0, chegada) - queda * queda * 13,     // a queda acelera, como tudo que cai
      tamanho: misturar(0.72, 1, chegada),
      rasgo: rasgo,
    });
  }

  // -------------------------------------------------------------------------
  // 6. Tamanho e desenho
  // -------------------------------------------------------------------------

  // Ajusta o desenho ao tamanho da tela. "alturaVisivel" diz quantas unidades
  // do mundo 3D cabem de cima a baixo: quanto maior, menor o pacotinho aparece.
  // O tamanho vem da página (o espaço que a tela ocupa). O gerador de quadros
  // passa um tamanho fixo em 'opcoes', para toda imagem sair igual.
  function medir() {
    const largura = opcoes.largura || tela.clientWidth || tela.width;
    const altura = opcoes.altura || tela.clientHeight || tela.height;
    desenhista.setPixelRatio(opcoes.nitidez || Math.min(window.devicePixelRatio || 1, 2));
    desenhista.setSize(largura, altura, false);
    camera.aspect = largura / altura;
    camera.fov = 2 * Math.atan(((opcoes.alturaVisivel || 9) / 2) / DISTANCIA) / GRAU;
    camera.updateProjectionMatrix();
  }

  function desenhar() {
    desenhista.render(cena, camera);
  }

  desenharRelevo();
  texturaDoRelevo.needsUpdate = true;
  estampar();
  medir();
  aplicar({});

  return {
    posar: posar,         // coreografia da página inicial (t de 0 a 1)
    aplicar: aplicar,     // pose livre (página Pacotinhos)
    estampar: estampar,   // refaz a estampa (quando o tema muda ou a fonte chega)
    medir: medir,
    desenhar: desenhar,
  };
}
````

### js/pacotinho-3d.js

````js
// ============================================================================
// pacotinho-3d.js
// ----------------------------------------------------------------------------
// Na página Pacotinhos, troca o desenho do pacotinho fechado (feito em CSS)
// pelo pacotinho 3D ao vivo (js/pacote3d.js, com a biblioteca Three.js).
//
// O que ele faz a mais que o de CSS:
//   - inclina conforme o mouse (ou o dedo) passa por cima, e o brilho do papel
//     laminado anda junto;
//   - na hora de rasgar, a aba sai de verdade e mostra o lado prateado.
//
// Este arquivo NÃO mexe nas regras da página: quem sorteia, guarda e mostra as
// figurinhas continua sendo o js/pacotinho.js. Aqui só se troca o desenho.
// Se o navegador não tiver WebGL (o desenho 3D), nada acontece e o pacotinho
// de CSS continua no lugar.
//
// Depende de: js/vendor/three.min.js, js/pacote3d.js, js/figurinha.js
// (movimentoReduzido) e js/pacotinho.js.
// ============================================================================

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  const palco = document.getElementById('palco');
  if (!palco || typeof THREE === 'undefined' || typeof criarPacote3d !== 'function') return;

  // Uma única tela de desenho para a página inteira. Ela é guardada e posta de
  // novo dentro de cada pacotinho que aparece ("Abrir outro pacotinho").
  const tela = document.createElement('canvas');
  tela.className = 'pacotinho-vivo';

  // O navegador sabe desenhar em 3D (WebGL)? A pergunta é feita antes, com uma
  // tela de teste, para a Three.js não escrever um erro no console à toa.
  function temWebGL() {
    try {
      const teste = document.createElement('canvas');
      return Boolean(teste.getContext('webgl') || teste.getContext('experimental-webgl'));
    } catch (erro) {
      return false;
    }
  }
  if (!temWebGL()) return;   // sem WebGL: fica o pacotinho de CSS

  let pacote;
  try {
    // alturaVisivel: 10.5 = a altura do pacotinho (7) mais metade de folga,
    // para a aba ter para onde voar
    pacote = criarPacote3d(tela, { alturaVisivel: 10.5 });
  } catch (erro) {
    return;   // algo deu errado ao montar o 3D: fica o pacotinho de CSS
  }

  const TEMPO_DE_RASGAR = 800;   // o mesmo do js/pacotinho.js, em milésimos de segundo
  let dono = null;               // o pacotinho de CSS que está "vestido" com a tela
  let rasgando = false;
  let quadroPedido = false;

  // A pose de agora e a pose para onde o pacotinho quer ir
  const pose = { giroX: 0, giroY: 0, rasgo: 0, y: 0 };
  const alvo = { giroX: 0, giroY: 0 };

  function desenhar() {
    pacote.aplicar(pose);
    pacote.desenhar();
  }

  // Põe a tela dentro de um pacotinho de CSS que acabou de aparecer no palco
  function vestir(pacotinho) {
    dono = pacotinho;
    rasgando = false;
    pose.giroX = pose.giroY = pose.rasgo = pose.y = 0;
    alvo.giroX = alvo.giroY = 0;
    tela.style.opacity = '';

    pacotinho.classList.add('pacotinho-com-3d');   // o CSS esconde o desenho antigo
    pacotinho.append(tela);
    pacote.medir();
    desenhar();

    // O pacotinho inclina para o lado em que o ponteiro está
    pacotinho.addEventListener('pointermove', function (evento) {
      if (rasgando || movimentoReduzido()) return;
      const caixa = pacotinho.getBoundingClientRect();
      const x = (evento.clientX - caixa.left) / caixa.width - 0.5;    // de -0,5 (esquerda) a 0,5 (direita)
      const y = (evento.clientY - caixa.top) / caixa.height - 0.5;    // de -0,5 (em cima) a 0,5 (embaixo)
      alvo.giroY = x * 34;
      alvo.giroX = y * 22;
      pedirQuadroDoPacote();
    });
    pacotinho.addEventListener('pointerleave', function () {
      alvo.giroX = alvo.giroY = 0;
      pedirQuadroDoPacote();
    });
  }

  // Um quadro da inclinação: anda 15% do caminho até o alvo e desenha.
  // O laço para sozinho quando o pacotinho chega: nada fica rodando à toa.
  function quadroDoPacote() {
    quadroPedido = false;
    if (rasgando || !tela.isConnected) return;
    pose.giroX += (alvo.giroX - pose.giroX) * 0.15;
    pose.giroY += (alvo.giroY - pose.giroY) * 0.15;
    desenhar();
    if (Math.abs(alvo.giroX - pose.giroX) + Math.abs(alvo.giroY - pose.giroY) > 0.05) pedirQuadroDoPacote();
  }

  function pedirQuadroDoPacote() {
    if (quadroPedido) return;
    quadroPedido = true;
    requestAnimationFrame(quadroDoPacote);
  }

  // A animação de rasgar, no mesmo tempo da animação de CSS que ela substitui:
  // primeiro a aba sai; no fim, o pacotinho vazio escorrega e some.
  function rasgar() {
    if (rasgando || movimentoReduzido()) return;   // com menos movimento, a página nem espera a animação
    rasgando = true;
    const inicio = performance.now();
    const giroX = pose.giroX;
    const giroY = pose.giroY;

    function quadroDoRasgo(agora) {
      if (!tela.isConnected) return;   // o palco já foi trocado pelas figurinhas
      const t = Math.min(1, (agora - inicio) / TEMPO_DE_RASGAR);
      const fim = Math.max(0, (t - 0.55) / 0.45);   // 0 até 55% do tempo; depois sobe até 1
      pose.rasgo = Math.min(1, t / 0.65);
      pose.giroX = giroX * (1 - t);
      pose.giroY = giroY * (1 - t);
      pose.y = -fim * 1.2;
      tela.style.opacity = String(1 - fim);
      desenhar();
      if (t < 1) requestAnimationFrame(quadroDoRasgo);
    }
    requestAnimationFrame(quadroDoRasgo);
  }

  // Um vigia olha o palco. Ele avisa em dois casos:
  //   - apareceu um pacotinho novo (a página desenhou o palco de novo);
  //   - o pacotinho ganhou a classe "pacotinho-rasgando" (a pessoa rasgou).
  function olharOPalco() {
    const pacotinho = palco.querySelector('.pacotinho');
    if (pacotinho && pacotinho !== dono) vestir(pacotinho);
    if (pacotinho && pacotinho.classList.contains('pacotinho-rasgando')) rasgar();
  }
  new MutationObserver(olharOPalco).observe(palco, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] });
  olharOPalco();

  // Tema novo, cores novas: a estampa é refeita
  new MutationObserver(function () {
    pacote.estampar();
    if (tela.isConnected) desenhar();
  }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-tema', 'data-contraste'] });

  window.addEventListener('resize', function () {
    if (!tela.isConnected) return;
    pacote.medir();
    desenhar();
  });

  // A estampa usa as letras do site: quando elas chegam, é desenhada de novo
  if (document.fonts && document.fonts.load) {
    Promise.all([
      document.fonts.load('900 100px "Londrina Solid"'),
      document.fonts.load('700 60px "Atkinson Hyperlegible Next"'),
    ]).then(function () {
      pacote.estampar();
      if (tela.isConnected) desenhar();
    });
  }
});
````

### js/formulario.js

````js
// ============================================================================
// formulario.js
// ----------------------------------------------------------------------------
// Ajudantes usados pelos formulários das páginas Entrar e Contato:
// mostrar e limpar o erro de um campo, conferir e-mail e o botão de mostrar a senha.
//
// Como o erro chega a quem usa leitor de tela: no HTML, cada campo aponta para
// a sua caixa de erro com aria-describedby. Quando o campo recebe o foco, o
// leitor lê o rótulo e, em seguida, a frase do erro.
// ============================================================================

// O ícone que acompanha toda mensagem de erro: um cartão com um "x".
// (O erro nunca é avisado só pela cor: vem com ícone e frase.)
const ICONE_DE_ERRO =
  '<svg viewBox="0 0 16 20" width="16" height="20" aria-hidden="true" focusable="false">' +
  '<rect x="1" y="1" width="14" height="18" rx="2" fill="currentColor"/>' +
  '<path class="cartao-x" d="M5 7l6 6M11 7l-6 6" stroke-width="2" stroke-linecap="round"/>' +
  '</svg>';

// Mostra o erro de um campo. A caixa do erro tem o id do campo mais "-erro".
function mostrarErro(campo, mensagem) {
  const caixa = document.getElementById(campo.id + '-erro');
  campo.setAttribute('aria-invalid', 'true');   // "este campo está com problema"
  caixa.innerHTML = ICONE_DE_ERRO;
  caixa.append(mensagem);   // append com texto escreve o texto como ele é, sem interpretar HTML
  caixa.hidden = false;
}

function limparErro(campo) {
  const caixa = document.getElementById(campo.id + '-erro');
  campo.removeAttribute('aria-invalid');
  caixa.textContent = '';
  caixa.hidden = true;
}

// Confere o formato do e-mail: algo, arroba, algo, ponto, algo. Sem espaços.
function emailValido(texto) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(texto);
}

// Botões "Mostrar senha": cada um aponta para o campo dele pelo atributo
// data-mostrar-senha. O campo troca entre type="password" (bolinhas) e
// type="text" (letras), e o texto do botão acompanha.
document.addEventListener('DOMContentLoaded', function () {
  for (const botao of document.querySelectorAll('[data-mostrar-senha]')) {
    botao.addEventListener('click', function () {
      const campo = document.getElementById(botao.dataset.mostrarSenha);
      const mostrando = campo.type === 'text';
      campo.type = mostrando ? 'password' : 'text';
      botao.textContent = mostrando ? 'Mostrar senha' : 'Ocultar senha';
    });
  }
});
````

### js/login.js

````js
// ============================================================================
// login.js
// ----------------------------------------------------------------------------
// A página Entrar: criar conta, entrar e sair. É uma SIMULAÇÃO: não existe
// servidor, tudo fica guardado no localStorage deste navegador.
//
// O que fica guardado:
//   colei.contas  = as contas criadas: { "ana@exemplo.com": { nome, sal, hash } }
//   colei.sessao  = quem entrou agora: { email, nome }
//
// A SENHA NUNCA É GUARDADA. Guarda-se o "hash" dela.
//   Hash é como um moedor de carne: a senha entra, sai uma sequência de letras
//   e números, e não existe caminho de volta (não dá para "desmoer"). Para
//   conferir a senha na hora de entrar, mói-se de novo o que a pessoa digitou
//   e compara-se o resultado com o que está guardado.
//   O "sal" é um tempero sorteado para cada conta e misturado à senha antes de
//   moer. Com ele, duas pessoas com a mesma senha ficam com hashes diferentes.
//
// Em um site de verdade, essa conta seria feita no servidor, com um moedor
// mais lento de propósito (para atrapalhar quem tenta adivinhar senhas).
//
// Depende de: js/dados.js, js/estado.js, js/formulario.js e js/menu.js.
// ============================================================================

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  const CHAVE_CONTAS = 'colei.contas';
  const CHAVE_SESSAO = 'colei.sessao';
  const TAMANHO_MINIMO_DA_SENHA = 8;

  const painelConta = document.getElementById('painel-conta');
  const formEntrar = document.getElementById('form-entrar');
  const formCriar = document.getElementById('form-criar');
  const aviso = document.getElementById('conta-aviso');

  // -------------------------------------------------------------------------
  // 1. Guardar e ler contas e sessão
  // -------------------------------------------------------------------------

  function lerDaGaveta(chave) {
    try {
      return JSON.parse(localStorage.getItem(chave));
    } catch (erro) {
      return null;   // gaveta bloqueada ou texto estragado
    }
  }

  // Devolve true se conseguiu guardar
  function guardarNaGaveta(chave, valor) {
    try {
      localStorage.setItem(chave, JSON.stringify(valor));
      return true;
    } catch (erro) {
      return false;
    }
  }

  function lerContas() {
    return lerDaGaveta(CHAVE_CONTAS) || {};
  }

  function lerSessao() {
    const sessao = lerDaGaveta(CHAVE_SESSAO);
    return sessao && sessao.email ? sessao : null;
  }

  // -------------------------------------------------------------------------
  // 2. O hash da senha
  // -------------------------------------------------------------------------

  // O navegador tem a ferramenta de hash? (Ela se chama crypto.subtle e só
  // funciona em página aberta do próprio computador ou por https.)
  function temFerramentaDeHash() {
    return Boolean(window.crypto && window.crypto.subtle && window.TextEncoder);
  }

  // Transforma uma lista de bytes em texto. Cada byte (um número de 0 a 255)
  // vira dois caracteres em hexadecimal: 255 vira "ff", 10 vira "0a".
  function emHexadecimal(bytes) {
    let texto = '';
    for (const numero of bytes) {
      texto += numero.toString(16).padStart(2, '0');
    }
    return texto;
  }

  // Sorteia o sal: 16 bytes ao acaso, pedidos ao sorteador seguro do navegador
  function sortearSal() {
    return emHexadecimal(crypto.getRandomValues(new Uint8Array(16)));
  }

  // Mistura o sal com a senha e passa pelo moedor (o algoritmo SHA-256).
  // "async" e "await": a conta demora um instante, e o await espera a resposta
  // chegar antes de continuar.
  async function calcularHash(sal, senha) {
    const bytes = new TextEncoder().encode(sal + ':' + senha);   // texto vira bytes
    const resultado = await crypto.subtle.digest('SHA-256', bytes);
    return emHexadecimal(new Uint8Array(resultado));
  }

  // -------------------------------------------------------------------------
  // 3. O que aparece na tela
  // -------------------------------------------------------------------------

  // Mostra só uma das três partes: 'conta', 'entrar' ou 'criar'
  function mostrarParte(parte) {
    painelConta.hidden = parte !== 'conta';
    formEntrar.hidden = parte !== 'entrar';
    formCriar.hidden = parte !== 'criar';
  }

  function desenharConta() {
    const sessao = lerSessao();
    if (!sessao) {
      mostrarParte('entrar');
      return;
    }
    const resumo = resumoDoAlbum(lerAlbum());
    document.getElementById('conta-quem').textContent = 'Você entrou como ' + sessao.nome + ' (' + sessao.email + ').';
    document.getElementById('conta-album').textContent = 'Seu álbum: ' + resumo.coladas + ' de ' + resumo.total + ' figurinhas coladas.';
    mostrarParte('conta');
  }

  // Tira os erros e os valores de um formulário
  function limparFormulario(formulario) {
    formulario.reset();
    for (const campo of formulario.querySelectorAll('.campo-entrada')) limparErro(campo);
    for (const caixa of formulario.querySelectorAll('[role="alert"]')) {
      caixa.textContent = '';
      caixa.hidden = true;
    }
  }

  // Erro do formulário inteiro (não de um campo só)
  function mostrarErroGeral(id, mensagem) {
    const caixa = document.getElementById(id);
    caixa.innerHTML = ICONE_DE_ERRO;
    caixa.append(mensagem);
    caixa.hidden = false;
  }

  // -------------------------------------------------------------------------
  // 4. Criar conta
  // -------------------------------------------------------------------------

  formCriar.addEventListener('submit', async function (evento) {
    evento.preventDefault();   // não deixa o navegador recarregar a página

    const campoNome = document.getElementById('criar-nome');
    const campoEmail = document.getElementById('criar-email');
    const campoSenha = document.getElementById('criar-senha');
    const nome = campoNome.value.trim();
    const email = campoEmail.value.trim().toLowerCase();
    const senha = campoSenha.value;
    const contas = lerContas();

    // Confere campo por campo e guarda o primeiro que tiver problema
    let primeiroComErro = null;
    function conferir(campo, mensagem) {
      if (mensagem === '') {
        limparErro(campo);
      } else {
        mostrarErro(campo, mensagem);
        if (!primeiroComErro) primeiroComErro = campo;
      }
    }

    conferir(campoNome, nome === '' ? 'Escreva o seu nome.' : '');

    let erroDoEmail = '';
    if (email === '') erroDoEmail = 'Escreva o seu e-mail.';
    else if (!emailValido(email)) erroDoEmail = 'Esse e-mail parece incompleto. O formato é nome@exemplo.com.';
    else if (contas[email]) erroDoEmail = 'Já existe uma conta com esse e-mail neste navegador. Use "Entrar".';
    conferir(campoEmail, erroDoEmail);

    let erroDaSenha = '';
    if (senha === '') erroDaSenha = 'Escreva uma senha.';
    else if (senha.length < TAMANHO_MINIMO_DA_SENHA) erroDaSenha = 'A senha precisa de pelo menos 8 caracteres. Faltam ' + (TAMANHO_MINIMO_DA_SENHA - senha.length) + '.';
    conferir(campoSenha, erroDaSenha);

    if (primeiroComErro) {
      primeiroComErro.focus();   // leva o teclado direto ao primeiro campo a consertar
      return;
    }

    if (!temFerramentaDeHash()) {
      mostrarErroGeral('criar-erro', 'Este navegador não liberou a ferramenta que protege a senha, então a conta não foi criada. Tente abrir o site pelo endereço publicado (https).');
      return;
    }

    const sal = sortearSal();
    contas[email] = { nome: nome, sal: sal, hash: await calcularHash(sal, senha) };
    if (!guardarNaGaveta(CHAVE_CONTAS, contas)) {
      mostrarErroGeral('criar-erro', 'O navegador não deixou guardar a conta. Confira se ele não está em modo anônimo.');
      return;
    }

    // As figurinhas de visitante vão junto para a conta nova
    let trouxeFigurinhas = false;
    try {
      const albumDeVisitante = localStorage.getItem('colei.album.visitante');
      if (albumDeVisitante !== null) {
        localStorage.setItem('colei.album.' + email, albumDeVisitante);
        localStorage.removeItem('colei.album.visitante');
        trouxeFigurinhas = true;
      }
    } catch (erro) {
      // Sem gaveta não há o que trazer.
    }

    guardarNaGaveta(CHAVE_SESSAO, { email: email, nome: nome });
    limparFormulario(formCriar);
    atualizarLinkDaConta();   // o menu passa a mostrar "Minha conta" (função de js/menu.js)
    desenharConta();
    aviso.textContent = 'Conta criada. ' + (trouxeFigurinhas ? 'As figurinhas que você tinha como visitante vieram junto.' : 'O álbum desta conta começa vazio.');
    document.getElementById('titulo-conta').focus();
  });

  // -------------------------------------------------------------------------
  // 5. Entrar e sair
  // -------------------------------------------------------------------------

  formEntrar.addEventListener('submit', async function (evento) {
    evento.preventDefault();

    const campoEmail = document.getElementById('entrar-email');
    const campoSenha = document.getElementById('entrar-senha');
    const email = campoEmail.value.trim().toLowerCase();
    const senha = campoSenha.value;
    const caixaGeral = document.getElementById('entrar-erro');
    caixaGeral.hidden = true;
    caixaGeral.textContent = '';

    let primeiroComErro = null;
    if (email === '') {
      mostrarErro(campoEmail, 'Escreva o seu e-mail.');
      primeiroComErro = campoEmail;
    } else if (!emailValido(email)) {
      mostrarErro(campoEmail, 'Esse e-mail parece incompleto. O formato é nome@exemplo.com.');
      primeiroComErro = campoEmail;
    } else {
      limparErro(campoEmail);
    }

    if (senha === '') {
      mostrarErro(campoSenha, 'Escreva a sua senha.');
      if (!primeiroComErro) primeiroComErro = campoSenha;
    } else {
      limparErro(campoSenha);
    }

    if (primeiroComErro) {
      primeiroComErro.focus();
      return;
    }

    if (!temFerramentaDeHash()) {
      mostrarErroGeral('entrar-erro', 'Este navegador não liberou a ferramenta que confere a senha. Tente abrir o site pelo endereço publicado (https).');
      return;
    }

    // Mói a senha digitada com o sal da conta e compara com o hash guardado.
    // A mensagem de erro é a mesma para e-mail desconhecido e para senha
    // errada: assim ninguém descobre quais e-mails têm conta.
    const conta = lerContas()[email];
    const confere = Boolean(conta) && (await calcularHash(conta.sal, senha)) === conta.hash;
    if (!confere) {
      mostrarErroGeral('entrar-erro', 'E-mail ou senha não conferem. Confira os dois e tente de novo.');
      campoEmail.focus();
      return;
    }

    guardarNaGaveta(CHAVE_SESSAO, { email: email, nome: conta.nome });
    limparFormulario(formEntrar);
    atualizarLinkDaConta();
    desenharConta();
    aviso.textContent = 'Você entrou. O álbum desta conta está valendo.';
    document.getElementById('titulo-conta').focus();
  });

  document.getElementById('sair').addEventListener('click', function () {
    try {
      localStorage.removeItem(CHAVE_SESSAO);
    } catch (erro) {
      // Sem gaveta não há sessão para apagar.
    }
    atualizarLinkDaConta();
    desenharConta();
    aviso.textContent = 'Você saiu. Agora vale o álbum de visitante.';
    document.getElementById('titulo-entrar').focus();
  });

  // Trocar entre "Entrar" e "Criar conta"
  document.getElementById('ir-criar').addEventListener('click', function () {
    aviso.textContent = '';
    mostrarParte('criar');
    document.getElementById('titulo-criar').focus();
  });

  document.getElementById('ir-entrar').addEventListener('click', function () {
    aviso.textContent = '';
    mostrarParte('entrar');
    document.getElementById('titulo-entrar').focus();
  });

  // -------------------------------------------------------------------------
  // 6. Começar
  // -------------------------------------------------------------------------

  desenharConta();
});
````

### js/contato.js

````js
// ============================================================================
// contato.js
// ----------------------------------------------------------------------------
// Confere o formulário de contato na hora de enviar. O envio é SIMULADO:
// não existe servidor, a mensagem não vai para lugar nenhum.
//
// Quando algo está errado:
//   - cada campo com problema ganha a sua frase de erro, com ícone;
//   - um resumo no topo lista tudo o que falta, com um link para cada campo;
//   - o foco vai para o resumo, para ele ser a primeira coisa lida.
// Quando está tudo certo, aparece a mensagem de sucesso, que o leitor de tela
// lê sozinho (ela fica em uma região com aria-live).
//
// Depende de: js/formulario.js.
// ============================================================================

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  const formulario = document.getElementById('form-contato');
  const resumo = document.getElementById('resumo-erros');
  const sucesso = document.getElementById('contato-sucesso');

  const campos = {
    nome: document.getElementById('contato-nome'),
    email: document.getElementById('contato-email'),
    assunto: document.getElementById('contato-assunto'),
    mensagem: document.getElementById('contato-mensagem'),
  };

  // A regra de cada campo. Devolve a frase do erro, ou '' se está certo.
  function erroDoCampo(nome) {
    const valor = campos[nome].value.trim();

    if (nome === 'nome') {
      if (valor === '') return 'Escreva o seu nome.';
    }
    if (nome === 'email') {
      if (valor === '') return 'Escreva o seu e-mail.';
      if (!emailValido(valor)) return 'Esse e-mail parece incompleto. O formato é nome@exemplo.com.';
    }
    if (nome === 'assunto') {
      if (valor === '') return 'Escolha um assunto na lista.';
    }
    if (nome === 'mensagem') {
      if (valor === '') return 'Escreva a mensagem.';
      if (valor.length < 10) return 'A mensagem está curta demais. Escreva pelo menos 10 caracteres.';
    }
    return '';
  }

  // Confere um campo e mostra ou tira o erro dele. Devolve a frase do erro.
  function conferirCampo(nome) {
    const erro = erroDoCampo(nome);
    if (erro === '') limparErro(campos[nome]);
    else mostrarErro(campos[nome], erro);
    return erro;
  }

  formulario.addEventListener('submit', function (evento) {
    evento.preventDefault();   // não deixa o navegador recarregar a página
    sucesso.textContent = '';

    // Confere todos os campos e junta os erros
    const erros = [];
    for (const nome in campos) {
      const erro = conferirCampo(nome);
      if (erro !== '') erros.push({ campo: campos[nome], frase: erro });
    }

    if (erros.length > 0) {
      // Monta o resumo: um link para cada campo com problema
      document.getElementById('resumo-titulo').textContent =
        erros.length === 1 ? 'Falta acertar 1 campo' : 'Falta acertar ' + erros.length + ' campos';

      const lista = document.getElementById('resumo-lista');
      lista.textContent = '';
      for (const erro of erros) {
        const link = document.createElement('a');
        link.href = '#' + erro.campo.id;
        link.textContent = erro.campo.labels[0].textContent + ': ' + erro.frase;
        // O link leva o foco direto para o campo (só a âncora não faria isso em todo navegador)
        link.addEventListener('click', function (clique) {
          clique.preventDefault();
          erro.campo.focus();
        });
        const item = document.createElement('li');
        item.append(link);
        lista.append(item);
      }

      resumo.hidden = false;
      resumo.focus();
      return;
    }

    // Tudo certo: aqui um site de verdade mandaria a mensagem ao servidor
    const nome = campos.nome.value.trim();
    resumo.hidden = true;
    formulario.reset();
    sucesso.textContent = 'Tudo certo, ' + nome + ': a mensagem passou na conferência. Como o envio é simulado, ela não saiu deste navegador.';
    sucesso.focus();
  });

  // Depois que um campo ganhou erro, ele é conferido de novo a cada mudança:
  // assim a frase some na hora em que a pessoa conserta.
  for (const nome in campos) {
    campos[nome].addEventListener('input', function () {
      if (campos[nome].getAttribute('aria-invalid') === 'true') conferirCampo(nome);
    });
  }
});
````

### js/sobre.js

````js
// ============================================================================
// sobre.js
// ----------------------------------------------------------------------------
// Na página Sobre, monta duas listas a partir de js/dados.js:
//   - o crédito de cada foto de estádio (autor, licença e link para a original);
//   - as fontes dos dados da Copa.
// Como as listas saem dos mesmos dados que o site usa, o crédito nunca fica
// diferente da foto que está no ar.
//
// Depende de: js/dados.js (as listas SEDES e FONTES).
// ============================================================================

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // Cria um link que abre a página de origem
  function criarLink(texto, endereco) {
    const link = document.createElement('a');
    link.href = endereco;
    link.textContent = texto;
    return link;
  }

  // Créditos das fotos: "Cidade do México, Estadio Azteca. Foto de Fulano, licença CC BY 4.0."
  const listaFotos = document.getElementById('creditos-fotos');
  for (const sede of SEDES) {
    const item = document.createElement('li');
    item.append(criarLink(sede.cidade + ', ' + sede.estadio, sede.foto.origem));
    item.append('. Foto de ' + sede.foto.autor + ', licença ');
    // Domínio público não tem página de licença para apontar
    if (sede.foto.licencaUrl) item.append(criarLink(sede.foto.licenca, sede.foto.licencaUrl));
    else item.append(sede.foto.licenca);
    item.append('.');
    listaFotos.append(item);
  }

  // Fontes dos dados: um link para cada uma
  const listaFontes = document.getElementById('fontes-dados');
  for (const apelido in FONTES) {
    const item = document.createElement('li');
    item.append(criarLink(FONTES[apelido].titulo, FONTES[apelido].url));
    listaFontes.append(item);
  }
});
````

### js/demonstracao.js

````js
// ============================================================================
// demonstracao.js
// ----------------------------------------------------------------------------
// O modo demonstração da página Sobre: dois botões para testar o álbum rápido
// na apresentação.
//   - "Ganhar 5 pacotinhos extras": para não depender de um pacotinho por dia.
//   - "Zerar álbum": apaga tudo, depois de uma confirmação.
//
// Depende de: js/dados.js e js/estado.js.
// ============================================================================

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  const aviso = document.getElementById('demo-aviso');
  const dialogo = document.getElementById('dialogo-zerar');

  document.getElementById('demo-extras').addEventListener('click', function () {
    ganharPacotinhosExtras(5);
    const extras = lerAlbum().extras;
    aviso.textContent = 'Pronto: agora há ' + extras + ' pacotinhos extras esperando na página Pacotinhos.';
  });

  // Zerar é uma ação sem volta, por isso passa por uma janela de confirmação.
  // showModal() abre o <dialog> por cima da página e prende o foco dentro dele.
  document.getElementById('demo-zerar').addEventListener('click', function () {
    dialogo.showModal();
  });

  document.getElementById('zerar-cancelar').addEventListener('click', function () {
    dialogo.close();   // o navegador devolve o foco ao botão que abriu a janela
  });

  document.getElementById('zerar-confirmar').addEventListener('click', function () {
    zerarAlbum();
    dialogo.close();
    aviso.textContent = 'Álbum zerado. O pacotinho do dia está disponível de novo.';
  });
});
````

### js/dados.js

````js
// ============================================================================
// dados.js
// ----------------------------------------------------------------------------
// Tudo o que o álbum sabe sobre a Copa de 2026: seleções, figurinhas e sedes.
//
// Fica em um arquivo .js (e não em .json carregado com fetch) para o site
// funcionar abrindo o index.html direto do computador.
//
// REGRA: nada aqui é inventado. Cada registro tem o campo "fonte", com os
// apelidos das fontes listadas em FONTES. O que não foi possível confirmar
// está escrito como 'a confirmar'.
//
// Os 12 grupos estão completos: 48 seleções e 288 figurinhas, mais as 16 sedes
// e o resumo de como a Copa terminou.
//   - O Grupo C foi pesquisado e escrito à mão (etapa 4 do projeto).
//   - Os outros 11 grupos foram lidos por script das páginas listadas em
//     FONTES e conferidos com uma segunda lista de elencos. As frases
//     (campanha, curiosidade) são montadas a partir desses dados.
// Consulta das fontes: 19 e 20/11/2026.
// ============================================================================

// ---------------------------------------------------------------------------
// FONTES: de onde veio cada informação
// ---------------------------------------------------------------------------

const FONTES = {
  'fifa-elencos': {
    titulo: 'FIFA. World Cup 2026: 48 squads confirmed (comunicado de 2 de junho de 2026)',
    url: 'https://inside.fifa.com/media-releases/world-cup-2026-48-squads-confirmed',
  },
  'wiki-elencos': {
    titulo: 'Wikipedia. 2026 FIFA World Cup squads (lista dos 48 elencos, com número, posição e clube)',
    url: 'https://en.wikipedia.org/wiki/2026_FIFA_World_Cup_squads',
  },
  'f365-elencos': {
    titulo: 'Football365. 2026 World Cup: final confirmed squad lists and squad numbers for all 48 nations',
    url: 'https://www.football365.com/news/2026-world-cup-squads-full-48-teams-every-player',
  },
  'wiki-grupo-c': {
    titulo: 'Wikipedia. 2026 FIFA World Cup Group C (classificação e jogos)',
    url: 'https://en.wikipedia.org/wiki/2026_FIFA_World_Cup_Group_C',
  },
  'itatiaia-alisson': {
    titulo: 'Itatiaia. Sob dúvidas e após lesão, Alisson é convocado e vai à 3ª Copa do Mundo pelo Brasil',
    url: 'https://www.itatiaia.com.br/esportes/futebol/selecao-brasileira/sob-duvidas-e-apos-lesao-alisson-e-convocado-e-vai-a-3a-copa-do-mundo-pelo-brasil/',
  },
  'dp-alisson': {
    titulo: 'Diário de Pernambuco. Alisson celebra terceira Copa seguida pelo Brasil',
    url: 'https://www.diariodepernambuco.com.br/esportes-dp/selecao-brasileira/2026/06/11716381-alisson-celebra-terceira-copa-seguida-pelo-brasil-e-garante-capacidade-fisica-no-mundial.html',
  },
  'itatiaia-marquinhos': {
    titulo: 'Itatiaia. Capitão com Ancelotti, Marquinhos disputará terceira Copa do Mundo pelo Brasil',
    url: 'https://www.itatiaia.com.br/esportes/futebol/selecao-brasileira/capitao-com-ancelotti-marquinhos-disputara-terceira-copa-do-mundo-pelo-brasil/',
  },
  'opopular-capitao': {
    titulo: 'O Popular. Ancelotti escala Brasil para amistoso e confirma Marquinhos capitão na Copa do Mundo',
    url: 'https://opopular.com.br/esporte/ancelotti-escala-brasil-para-amistoso-e-confirma-marquinhos-capit-o-na-copa-do-mundo-1.3416667',
  },
  'fourfourtwo-brasil': {
    titulo: "FourFourTwo. Brazil squad World Cup 2026: Carlo Ancelotti's 26 players",
    url: 'https://www.fourfourtwo.com/us/team/brazil-world-cup-2026-squad',
  },
  'si-numeros-brasil': {
    titulo: 'Sports Illustrated. Brazil 2026 World Cup Shirt Numbers',
    url: 'https://www.si.com/soccer/brazil-2026-world-cup-shirt-numbers-neymar-selecao-history',
  },
  'espn-escocia-brasil': {
    titulo: 'ESPN. Scotland 0-3 Brazil: Vinícius Júnior leaves Tartan Army World Cup hopes in tatters',
    url: 'https://global.espn.com/football/story/_/id/49167442/scotland-0-3-brazil-vinicius-junior-leaves-tartan-army-2026-world-cup-hopes-serious-jeopardy-miami',
  },
  'bein-escocia-brasil': {
    titulo: 'beIN Sports. Scotland 0-3 Brazil: Vinicius brace seals top spot in Group C',
    url: 'https://www.beinsports.com/en-us/soccer/fifa-world-cup-2026/articles/scotland-0-3-brazil-vinicius-brace-seals-top-spot-in-group-c-2026-06-25',
  },
  'aljazeera-escocia-brasil': {
    titulo: 'Al Jazeera. Brazil 3-0 Scotland: World Cup 2026, as it happened',
    url: 'https://www.aljazeera.com/amp/sports/liveblog/2026/6/24/scotland-vs-brazil-live-world-cup-2026',
  },
  'thenational-marrocos': {
    titulo: 'The National. Morocco World Cup talking points: Atlas Lions have high hopes under Mohamed Ouahbi',
    url: 'https://www.thenationalnews.com/sport/2026/05/29/morocco-world-cup-talking-points-atlas-lions-have-high-hopes-under-new-leadership-of-mohamed-ouahbi/',
  },
  'bein-marrocos': {
    titulo: "beIN Sports. Mohamed Ouahbi's official Morocco squad for the 2026 FIFA World Cup",
    url: 'https://www.beinsports.com/en-us/soccer/fifa-world-cup-2026/articles/mohamed-ouahbi-s-official-morocco-squad-for-the-2026-fifa-world-cup-2026-05-26',
  },
  'fox-saibari': {
    titulo: 'Fox Sports. Ismael Saibari scores in second minute to lift Morocco over Scotland 1-0',
    url: 'https://www.foxsports.com/articles/soccer/ismael-saibari-scores-in-second-minute-to-lift-morocco-over-scotland-10-at-the-world-cup',
  },
  'aljazeera-saibari': {
    titulo: 'Al Jazeera. Morocco beat Scotland 1-0 as Saibari scores fastest World Cup 2026 goal',
    url: 'https://www.aljazeera.com/amp/sports/2026/6/20/morocco-beat-scotland-1-0-as-saibari-scores-fastest-world-cup-2026',
  },
  'concacaf-haiti': {
    titulo: 'Concacaf. FIFA World Cup 2026 Team Profile: Haiti',
    url: 'https://www.concacaf.com/competitions/fifa-world-cup/news/fifa-world-cup-2026-team-profile-haiti',
  },
  'heavy-haiti': {
    titulo: 'Heavy. Haiti Announces Squad for 2026 FIFA World Cup',
    url: 'https://heavy.com/sports/soccer/world-cup/haiti-announces-squad-fifa-world-cup/',
  },
  'uefa-escocia': {
    titulo: 'UEFA. Scotland at the World Cup 2026: squad, fixtures, group and history',
    url: 'https://www.uefa.com/european-qualifiers/news/02a6-20d159741fe9-a2a8fac9839d-1000--scotland-at-the-world-cup-2026-squad-fixtures-group-and-hi/',
  },
  'espn-haiti-escocia': {
    titulo: 'ESPN. Haiti 0-1 Scotland: John McGinn scores winner as Tartan Army end World Cup drought',
    url: 'https://global.espn.com/football/story/_/id/49055260/haiti-scotland-world-cup-2026-result-score-recap-john-mcginn-ben-gannon-doak-group-c',
  },
  'thescore-haiti-escocia': {
    titulo: 'theScore. Scotland beats Haiti for 1st World Cup win since 1990',
    url: 'https://beta.thescore.com/news/3553489/scotland-beats-haiti-for-1-st-world-cup-win-since-1990',
  },
  'wiki-copa': {
    titulo: 'Wikipedia. 2026 FIFA World Cup (seção Venues: cidades, estádios, número de jogos e capacidade). Consulta em 20/11/2026',
    url: 'https://en.wikipedia.org/wiki/2026_FIFA_World_Cup',
  },
  'wiki-grupo-a': {
    titulo: 'Wikipedia. 2026 FIFA World Cup Group A (seleções, classificação e jogos)',
    url: 'https://en.wikipedia.org/wiki/2026_FIFA_World_Cup_Group_A',
  },
  'wiki-grupo-b': {
    titulo: 'Wikipedia. 2026 FIFA World Cup Group B (seleções, classificação e jogos)',
    url: 'https://en.wikipedia.org/wiki/2026_FIFA_World_Cup_Group_B',
  },
  'wiki-grupo-d': {
    titulo: 'Wikipedia. 2026 FIFA World Cup Group D (seleções, classificação e jogos)',
    url: 'https://en.wikipedia.org/wiki/2026_FIFA_World_Cup_Group_D',
  },
  'wiki-grupo-e': {
    titulo: 'Wikipedia. 2026 FIFA World Cup Group E (seleções, classificação e jogos)',
    url: 'https://en.wikipedia.org/wiki/2026_FIFA_World_Cup_Group_E',
  },
  'wiki-grupo-f': {
    titulo: 'Wikipedia. 2026 FIFA World Cup Group F (seleções, classificação e jogos)',
    url: 'https://en.wikipedia.org/wiki/2026_FIFA_World_Cup_Group_F',
  },
  'wiki-grupo-g': {
    titulo: 'Wikipedia. 2026 FIFA World Cup Group G (seleções, classificação e jogos)',
    url: 'https://en.wikipedia.org/wiki/2026_FIFA_World_Cup_Group_G',
  },
  'wiki-grupo-h': {
    titulo: 'Wikipedia. 2026 FIFA World Cup Group H (seleções, classificação e jogos)',
    url: 'https://en.wikipedia.org/wiki/2026_FIFA_World_Cup_Group_H',
  },
  'wiki-grupo-i': {
    titulo: 'Wikipedia. 2026 FIFA World Cup Group I (seleções, classificação e jogos)',
    url: 'https://en.wikipedia.org/wiki/2026_FIFA_World_Cup_Group_I',
  },
  'wiki-grupo-j': {
    titulo: 'Wikipedia. 2026 FIFA World Cup Group J (seleções, classificação e jogos)',
    url: 'https://en.wikipedia.org/wiki/2026_FIFA_World_Cup_Group_J',
  },
  'wiki-grupo-k': {
    titulo: 'Wikipedia. 2026 FIFA World Cup Group K (seleções, classificação e jogos)',
    url: 'https://en.wikipedia.org/wiki/2026_FIFA_World_Cup_Group_K',
  },
  'wiki-grupo-l': {
    titulo: 'Wikipedia. 2026 FIFA World Cup Group L (seleções, classificação e jogos)',
    url: 'https://en.wikipedia.org/wiki/2026_FIFA_World_Cup_Group_L',
  },
  'wiki-mata-mata': {
    titulo: 'Wikipedia. 2026 FIFA World Cup knockout stage, com as páginas "round of 32" e "final" (jogos do mata-mata)',
    url: 'https://en.wikipedia.org/wiki/2026_FIFA_World_Cup_knockout_stage',
  },
  'wiki-jogos': {
    titulo: 'Wikipedia. Páginas dos 12 grupos e do mata-mata da Copa de 2026 (quem marcou os gols de cada jogo)',
    url: 'https://en.wikipedia.org/wiki/2026_FIFA_World_Cup',
  },
  'espn-final': {
    titulo: 'ESPN. Spain 1-0 Argentina (Jul 19, 2026) Final Score',
    url: 'https://www.espn.com/soccer/match/_/gameId/760517/argentina-spain',
  },
  'npr-final': {
    titulo: 'NPR. Spain is the 2026 World Cup champion, defeating Argentina for its 2nd title',
    url: 'https://www.npr.org/2026/07/19/nx-s1-5899071/2026-world-cup-fifa-argentina-spain-final-championship',
  },
  'cbs-final': {
    titulo: 'CBS News. Spain wins 2026 FIFA World Cup with grueling 1-0 victory over Argentina',
    url: 'https://www.cbsnews.com/news/2026-fifa-world-cup-final-spain-argentina-sunday/',
  },
};

// ---------------------------------------------------------------------------
// SELEÇÕES
// ---------------------------------------------------------------------------
// "cores" partem das cores da bandeira e são usadas no desenho da figurinha:
//   campo  = fundo do retrato      camisa = cor da camisa      numero = cor do número
// Foram ajustadas para o número ter pelo menos 3:1 de contraste com a camisa
// e a silhueta (azul-tinteiro) ter pelo menos 3:1 com o campo.
// "campanha" e "depoisDoGrupo" contam os resultados do ponto de vista da
// seleção: "2 a 0 no México" é vitória, "1 a 1 com o México" é empate e
// "0 a 2 para o México" é derrota.

const SELECOES = [
  // ===== Grupo A e Grupo B =====
  {
    id: 'mexico',
    nome: 'México',
    grupo: 'A',
    bandeira: 'mx',
    confederacao: 'Concacaf (América do Norte, Central e Caribe)',
    tecnico: 'Javier Aguirre',
    capitao: 'Edson Álvarez',
    campanha: 'Primeiro lugar do Grupo A, com 9 pontos: 2 a 0 na África do Sul, 1 a 0 na Coreia do Sul e 3 a 0 na Tchéquia.',
    depoisDoGrupo: 'Venceu o Equador por 2 a 0 nos 16 avos de final. Perdeu para a Inglaterra por 3 a 2 nas oitavas de final.',
    curiosidade: 'Disputou em 2026 a sua 18ª Copa do Mundo.',
    cores: { campo: '#D9534F', camisa: '#0B6B3A', numero: '#FFFFFF' },
    fonte: ['wiki-elencos', 'wiki-grupo-a', 'wiki-mata-mata'],
  },
  {
    id: 'africa-do-sul',
    nome: 'África do Sul',
    grupo: 'A',
    bandeira: 'za',
    confederacao: 'CAF (África)',
    tecnico: 'Hugo Broos',
    capitao: 'Ronwen Williams',
    campanha: 'Segundo lugar do Grupo A, com 4 pontos: 0 a 2 para o México, 1 a 1 com a Tchéquia e 1 a 0 na Coreia do Sul.',
    depoisDoGrupo: 'Perdeu para o Canadá por 1 a 0 nos 16 avos de final.',
    curiosidade: 'Disputou em 2026 a sua 4ª Copa do Mundo. A anterior tinha sido em 2010.',
    cores: { campo: '#2E9E6B', camisa: '#F7C531', numero: '#0B5A3C' },
    fonte: ['wiki-elencos', 'wiki-grupo-a', 'wiki-mata-mata'],
  },
  {
    id: 'coreia-do-sul',
    nome: 'Coreia do Sul',
    grupo: 'A',
    bandeira: 'kr',
    confederacao: 'AFC (Ásia)',
    tecnico: 'Hong Myung-bo',
    capitao: 'Son Heung-min',
    campanha: 'Terceiro lugar do Grupo A, com 3 pontos: 2 a 1 na Tchéquia, 0 a 1 para o México e 0 a 1 para a África do Sul.',
    depoisDoGrupo: 'Eliminada na fase de grupos: não ficou entre os oito melhores terceiros colocados.',
    curiosidade: 'Disputou em 2026 a sua 12ª Copa do Mundo.',
    cores: { campo: '#DCE6F5', camisa: '#D8242F', numero: '#FFFFFF' },
    fonte: ['wiki-elencos', 'wiki-grupo-a'],
  },
  {
    id: 'tchequia',
    nome: 'Tchéquia',
    grupo: 'A',
    bandeira: 'cz',
    confederacao: 'UEFA (Europa)',
    tecnico: 'Miroslav Koubek',
    capitao: 'Ladislav Krejčí',
    campanha: 'Quarto lugar do Grupo A, com 1 ponto: 1 a 2 para a Coreia do Sul, 1 a 1 com a África do Sul e 0 a 3 para o México.',
    depoisDoGrupo: 'Eliminada na fase de grupos.',
    curiosidade: 'Disputou em 2026 a sua 10ª Copa do Mundo. A anterior tinha sido em 2006.',
    cores: { campo: '#5B8BD6', camisa: '#C8102E', numero: '#FFFFFF' },
    fonte: ['wiki-elencos', 'wiki-grupo-a'],
  },
  {
    id: 'canada',
    nome: 'Canadá',
    grupo: 'B',
    bandeira: 'ca',
    confederacao: 'Concacaf (América do Norte, Central e Caribe)',
    tecnico: 'Jesse Marsch',
    capitao: 'Alphonso Davies',
    campanha: 'Segundo lugar do Grupo B, com 4 pontos: 1 a 1 com a Bósnia e Herzegovina, 6 a 0 no Catar e 1 a 2 para a Suíça.',
    depoisDoGrupo: 'Venceu a África do Sul por 1 a 0 nos 16 avos de final. Perdeu para Marrocos por 3 a 0 nas oitavas de final.',
    curiosidade: 'Disputou em 2026 a sua 3ª Copa do Mundo.',
    cores: { campo: '#F0E6E6', camisa: '#D52B1E', numero: '#FFFFFF' },
    fonte: ['wiki-elencos', 'wiki-grupo-b', 'wiki-mata-mata'],
  },
  {
    id: 'bosnia',
    nome: 'Bósnia e Herzegovina',
    grupo: 'B',
    bandeira: 'ba',
    confederacao: 'UEFA (Europa)',
    tecnico: 'Sergej Barbarez',
    capitao: 'Edin Džeko',
    campanha: 'Terceiro lugar do Grupo B, com 4 pontos: 1 a 1 com o Canadá, 1 a 4 para a Suíça e 3 a 1 no Catar.',
    depoisDoGrupo: 'Perdeu para os Estados Unidos por 2 a 0 nos 16 avos de final.',
    curiosidade: 'Disputou em 2026 a sua 2ª Copa do Mundo. A anterior tinha sido em 2014.',
    cores: { campo: '#F2D34B', camisa: '#1F4AA8', numero: '#FFFFFF' },
    fonte: ['wiki-elencos', 'wiki-grupo-b', 'wiki-mata-mata'],
  },
  {
    id: 'catar',
    nome: 'Catar',
    grupo: 'B',
    bandeira: 'qa',
    confederacao: 'AFC (Ásia)',
    tecnico: 'Julen Lopetegui',
    capitao: 'Hassan Al-Haydos',
    campanha: 'Quarto lugar do Grupo B, com 1 ponto: 1 a 1 com a Suíça, 0 a 6 para o Canadá e 1 a 3 para a Bósnia e Herzegovina.',
    depoisDoGrupo: 'Eliminado na fase de grupos.',
    curiosidade: 'Disputou em 2026 a sua 2ª Copa do Mundo.',
    cores: { campo: '#E9DDE2', camisa: '#8A1538', numero: '#FFFFFF' },
    fonte: ['wiki-elencos', 'wiki-grupo-b'],
  },
  {
    id: 'suica',
    nome: 'Suíça',
    grupo: 'B',
    bandeira: 'ch',
    confederacao: 'UEFA (Europa)',
    tecnico: 'Murat Yakin',
    capitao: 'Granit Xhaka',
    campanha: 'Primeiro lugar do Grupo B, com 7 pontos: 1 a 1 com o Catar, 4 a 1 na Bósnia e Herzegovina e 2 a 1 no Canadá.',
    depoisDoGrupo: 'Venceu a Argélia por 2 a 0 nos 16 avos de final. Passou pela Colômbia nos pênaltis (4 a 3) nas oitavas de final, depois de 0 a 0. Perdeu para a Argentina por 3 a 1 nas quartas de final, na prorrogação.',
    curiosidade: 'Disputou em 2026 a sua 13ª Copa do Mundo.',
    cores: { campo: '#EADADA', camisa: '#D52B1E', numero: '#FFFFFF' },
    fonte: ['wiki-elencos', 'wiki-grupo-b', 'wiki-mata-mata'],
  },

  // ===== Grupo C (pesquisado e escrito à mão) =====
  {
    id: 'brasil',
    nome: 'Brasil',
    grupo: 'C',
    bandeira: 'br',
    confederacao: 'CONMEBOL (América do Sul)',
    tecnico: 'Carlo Ancelotti',
    capitao: 'Marquinhos',
    campanha: 'Primeiro lugar do Grupo C, com 7 pontos: 1 a 1 com Marrocos, 3 a 0 no Haiti e 3 a 0 na Escócia.',
    depoisDoGrupo: 'Venceu o Japão por 2 a 1 nos 16 avos de final. Perdeu para a Noruega por 2 a 1 nas oitavas de final.',
    curiosidade: 'Chegou à Copa de 2026 como a única seleção cinco vezes campeã do mundo.',
    cores: { campo: '#228B59', camisa: '#F7D417', numero: '#1B3F8F' },
    fonte: ['wiki-elencos', 'wiki-grupo-c', 'wiki-mata-mata', 'bein-escocia-brasil', 'opopular-capitao', 'fourfourtwo-brasil'],
  },
  {
    id: 'marrocos',
    nome: 'Marrocos',
    grupo: 'C',
    bandeira: 'ma',
    confederacao: 'CAF (África)',
    tecnico: 'Mohamed Ouahbi',
    capitao: 'Achraf Hakimi',
    campanha: 'Segundo lugar do Grupo C, com 7 pontos: 1 a 1 com o Brasil, 1 a 0 na Escócia e 4 a 2 no Haiti.',
    depoisDoGrupo: 'Passou pela Holanda nos pênaltis (3 a 2) nos 16 avos de final, depois de 1 a 1. Venceu o Canadá por 3 a 0 nas oitavas de final. Perdeu para a França por 2 a 0 nas quartas de final.',
    curiosidade: 'Em 2022, foi a primeira seleção africana a chegar a uma semifinal de Copa do Mundo.',
    cores: { campo: '#2E9B5F', camisa: '#C1272D', numero: '#FFFFFF' },
    fonte: ['wiki-elencos', 'wiki-grupo-c', 'wiki-mata-mata', 'thenational-marrocos', 'bein-marrocos', 'aljazeera-saibari'],
  },
  {
    id: 'haiti',
    nome: 'Haiti',
    grupo: 'C',
    bandeira: 'ht',
    confederacao: 'Concacaf (América do Norte, Central e Caribe)',
    tecnico: 'Sébastien Migné',
    capitao: 'Johny Placide',
    campanha: 'Quarto lugar do Grupo C, sem pontos: 0 a 1 para a Escócia, 0 a 3 para o Brasil e 2 a 4 para Marrocos.',
    depoisDoGrupo: 'Eliminado na fase de grupos.',
    curiosidade: 'Disputou em 2026 a sua segunda Copa do Mundo. A primeira tinha sido em 1974.',
    cores: { campo: '#DC2B47', camisa: '#00209F', numero: '#FFFFFF' },
    fonte: ['wiki-elencos', 'wiki-grupo-c', 'concacaf-haiti'],
  },
  {
    id: 'escocia',
    nome: 'Escócia',
    grupo: 'C',
    bandeira: 'gb-sct',
    confederacao: 'UEFA (Europa)',
    tecnico: 'Steve Clarke',
    capitao: 'Andy Robertson',
    campanha: 'Terceiro lugar do Grupo C, com 3 pontos: 1 a 0 no Haiti, 0 a 1 para Marrocos e 0 a 3 para o Brasil.',
    depoisDoGrupo: 'Eliminada na fase de grupos: não ficou entre os oito melhores terceiros colocados.',
    curiosidade: 'Voltou à Copa do Mundo depois de 28 anos. A última participação tinha sido em 1998.',
    cores: { campo: '#DCE6F5', camisa: '#005EB8', numero: '#FFFFFF' },
    fonte: ['wiki-elencos', 'wiki-grupo-c', 'uefa-escocia'],
  },

  // ===== Grupos D a L =====
  {
    id: 'estados-unidos',
    nome: 'Estados Unidos',
    grupo: 'D',
    bandeira: 'us',
    confederacao: 'Concacaf (América do Norte, Central e Caribe)',
    tecnico: 'Mauricio Pochettino',
    capitao: 'Tim Ream',
    campanha: 'Primeiro lugar do Grupo D, com 6 pontos: 4 a 1 no Paraguai, 2 a 0 na Austrália e 2 a 3 para a Turquia.',
    depoisDoGrupo: 'Venceu a Bósnia e Herzegovina por 2 a 0 nos 16 avos de final. Perdeu para a Bélgica por 4 a 1 nas oitavas de final.',
    curiosidade: 'Disputou em 2026 a sua 12ª Copa do Mundo.',
    cores: { campo: '#DE5B64', camisa: '#FFFFFF', numero: '#1B2A6B' },
    fonte: ['wiki-elencos', 'wiki-grupo-d', 'wiki-mata-mata'],
  },
  {
    id: 'paraguai',
    nome: 'Paraguai',
    grupo: 'D',
    bandeira: 'py',
    confederacao: 'CONMEBOL (América do Sul)',
    tecnico: 'Gustavo Alfaro',
    capitao: 'Gustavo Gómez',
    campanha: 'Terceiro lugar do Grupo D, com 4 pontos: 1 a 4 para os Estados Unidos, 1 a 0 na Turquia e 0 a 0 com a Austrália.',
    depoisDoGrupo: 'Passou pela Alemanha nos pênaltis (4 a 3) nos 16 avos de final, depois de 1 a 1. Perdeu para a França por 1 a 0 nas oitavas de final.',
    curiosidade: 'Disputou em 2026 a sua 9ª Copa do Mundo. A anterior tinha sido em 2010.',
    cores: { campo: '#5B8BD6', camisa: '#D52B1E', numero: '#FFFFFF' },
    fonte: ['wiki-elencos', 'wiki-grupo-d', 'wiki-mata-mata'],
  },
  {
    id: 'australia',
    nome: 'Austrália',
    grupo: 'D',
    bandeira: 'au',
    confederacao: 'AFC (Ásia)',
    tecnico: 'Tony Popovic',
    capitao: 'Mathew Ryan',
    campanha: 'Segundo lugar do Grupo D, com 4 pontos: 2 a 0 na Turquia, 0 a 2 para os Estados Unidos e 0 a 0 com o Paraguai.',
    depoisDoGrupo: 'Caiu nos pênaltis para o Egito (4 a 2) nos 16 avos de final, depois de 1 a 1.',
    curiosidade: 'Disputou em 2026 a sua 7ª Copa do Mundo.',
    cores: { campo: '#2E9E6B', camisa: '#F7C531', numero: '#0B5A3C' },
    fonte: ['wiki-elencos', 'wiki-grupo-d', 'wiki-mata-mata'],
  },
  {
    id: 'turquia',
    nome: 'Turquia',
    grupo: 'D',
    bandeira: 'tr',
    confederacao: 'UEFA (Europa)',
    tecnico: 'Vincenzo Montella',
    capitao: 'Hakan Çalhanoğlu',
    campanha: 'Quarto lugar do Grupo D, com 3 pontos: 0 a 2 para a Austrália, 0 a 1 para o Paraguai e 3 a 2 nos Estados Unidos.',
    depoisDoGrupo: 'Eliminada na fase de grupos.',
    curiosidade: 'Disputou em 2026 a sua 3ª Copa do Mundo. A anterior tinha sido em 2002.',
    cores: { campo: '#F0E0E0', camisa: '#E30A17', numero: '#FFFFFF' },
    fonte: ['wiki-elencos', 'wiki-grupo-d'],
  },
  {
    id: 'alemanha',
    nome: 'Alemanha',
    grupo: 'E',
    bandeira: 'de',
    confederacao: 'UEFA (Europa)',
    tecnico: 'Julian Nagelsmann',
    capitao: 'Joshua Kimmich',
    campanha: 'Primeiro lugar do Grupo E, com 6 pontos: 7 a 1 em Curaçao, 2 a 1 na Costa do Marfim e 1 a 2 para o Equador.',
    depoisDoGrupo: 'Caiu nos pênaltis para o Paraguai (4 a 3) nos 16 avos de final, depois de 1 a 1.',
    curiosidade: 'Disputou em 2026 a sua 21ª Copa do Mundo.',
    cores: { campo: '#E6B93C', camisa: '#FFFFFF', numero: '#1A1A1A' },
    fonte: ['wiki-elencos', 'wiki-grupo-e', 'wiki-mata-mata'],
  },
  {
    id: 'curacao',
    nome: 'Curaçao',
    grupo: 'E',
    bandeira: 'cw',
    confederacao: 'Concacaf (América do Norte, Central e Caribe)',
    tecnico: 'Dick Advocaat',
    capitao: 'Leandro Bacuna',
    campanha: 'Quarto lugar do Grupo E, com 1 ponto: 1 a 7 para a Alemanha, 0 a 0 com o Equador e 0 a 2 para a Costa do Marfim.',
    depoisDoGrupo: 'Eliminado na fase de grupos.',
    curiosidade: 'Estreou em Copas do Mundo em 2026.',
    cores: { campo: '#F2D34B', camisa: '#1F4AA8', numero: '#FFFFFF' },
    fonte: ['wiki-elencos', 'wiki-grupo-e'],
  },
  {
    id: 'costa-do-marfim',
    nome: 'Costa do Marfim',
    grupo: 'E',
    bandeira: 'ci',
    confederacao: 'CAF (África)',
    tecnico: 'Emerse Faé',
    capitao: 'Franck Kessié',
    campanha: 'Segundo lugar do Grupo E, com 6 pontos: 1 a 0 no Equador, 1 a 2 para a Alemanha e 2 a 0 em Curaçao.',
    depoisDoGrupo: 'Perdeu para a Noruega por 2 a 1 nos 16 avos de final.',
    curiosidade: 'Disputou em 2026 a sua 4ª Copa do Mundo. A anterior tinha sido em 2014.',
    cores: { campo: '#3FA36B', camisa: '#F28C28', numero: '#14204F' },
    fonte: ['wiki-elencos', 'wiki-grupo-e', 'wiki-mata-mata'],
  },
  {
    id: 'equador',
    nome: 'Equador',
    grupo: 'E',
    bandeira: 'ec',
    confederacao: 'CONMEBOL (América do Sul)',
    tecnico: 'Sebastián Beccacece',
    capitao: 'Enner Valencia',
    campanha: 'Terceiro lugar do Grupo E, com 4 pontos: 0 a 1 para a Costa do Marfim, 0 a 0 com Curaçao e 2 a 1 na Alemanha.',
    depoisDoGrupo: 'Perdeu para o México por 2 a 0 nos 16 avos de final.',
    curiosidade: 'Disputou em 2026 a sua 5ª Copa do Mundo.',
    cores: { campo: '#5B8BD6', camisa: '#F7D417', numero: '#1B3F8F' },
    fonte: ['wiki-elencos', 'wiki-grupo-e', 'wiki-mata-mata'],
  },
  {
    id: 'holanda',
    nome: 'Holanda',
    grupo: 'F',
    bandeira: 'nl',
    confederacao: 'UEFA (Europa)',
    tecnico: 'Ronald Koeman',
    capitao: 'Virgil van Dijk',
    campanha: 'Primeiro lugar do Grupo F, com 7 pontos: 2 a 2 com o Japão, 5 a 1 na Suécia e 3 a 1 na Tunísia.',
    depoisDoGrupo: 'Caiu nos pênaltis para Marrocos (3 a 2) nos 16 avos de final, depois de 1 a 1.',
    curiosidade: 'Disputou em 2026 a sua 12ª Copa do Mundo.',
    cores: { campo: '#F2E2D0', camisa: '#F36C21', numero: '#1A1A1A' },
    fonte: ['wiki-elencos', 'wiki-grupo-f', 'wiki-mata-mata'],
  },
  {
    id: 'japao',
    nome: 'Japão',
    grupo: 'F',
    bandeira: 'jp',
    confederacao: 'AFC (Ásia)',
    tecnico: 'Hajime Moriyasu',
    capitao: 'Kō Itakura',
    campanha: 'Segundo lugar do Grupo F, com 5 pontos: 2 a 2 com a Holanda, 4 a 0 na Tunísia e 1 a 1 com a Suécia.',
    depoisDoGrupo: 'Perdeu para o Brasil por 2 a 1 nos 16 avos de final.',
    curiosidade: 'Disputou em 2026 a sua 8ª Copa do Mundo.',
    cores: { campo: '#E8ECF5', camisa: '#1D3C8F', numero: '#FFFFFF' },
    fonte: ['wiki-elencos', 'wiki-grupo-f', 'wiki-mata-mata'],
  },
  {
    id: 'suecia',
    nome: 'Suécia',
    grupo: 'F',
    bandeira: 'se',
    confederacao: 'UEFA (Europa)',
    tecnico: 'Graham Potter',
    capitao: 'Victor Lindelöf',
    campanha: 'Terceiro lugar do Grupo F, com 4 pontos: 5 a 1 na Tunísia, 1 a 5 para a Holanda e 1 a 1 com o Japão.',
    depoisDoGrupo: 'Perdeu para a França por 3 a 0 nos 16 avos de final.',
    curiosidade: 'Disputou em 2026 a sua 13ª Copa do Mundo. A anterior tinha sido em 2018.',
    cores: { campo: '#5B8BD6', camisa: '#F7D417', numero: '#1B4F9C' },
    fonte: ['wiki-elencos', 'wiki-grupo-f', 'wiki-mata-mata'],
  },
  {
    id: 'tunisia',
    nome: 'Tunísia',
    grupo: 'F',
    bandeira: 'tn',
    confederacao: 'CAF (África)',
    tecnico: 'Sabri Lamouchi (primeiro jogo) e Hervé Renard (demais jogos)',
    capitao: 'Ellyes Skhiri',
    campanha: 'Quarto lugar do Grupo F, sem pontos: 1 a 5 para a Suécia, 0 a 4 para o Japão e 1 a 3 para a Holanda.',
    depoisDoGrupo: 'Eliminada na fase de grupos.',
    curiosidade: 'Disputou em 2026 a sua 7ª Copa do Mundo.',
    cores: { campo: '#DE5B64', camisa: '#FFFFFF', numero: '#C8102E' },
    fonte: ['wiki-elencos', 'wiki-grupo-f'],
  },
  {
    id: 'belgica',
    nome: 'Bélgica',
    grupo: 'G',
    bandeira: 'be',
    confederacao: 'UEFA (Europa)',
    tecnico: 'Rudi Garcia',
    capitao: 'Youri Tielemans',
    campanha: 'Primeiro lugar do Grupo G, com 5 pontos: 1 a 1 com o Egito, 0 a 0 com o Irã e 5 a 1 na Nova Zelândia.',
    depoisDoGrupo: 'Venceu o Senegal por 3 a 2 nos 16 avos de final, na prorrogação. Venceu os Estados Unidos por 4 a 1 nas oitavas de final. Perdeu para a Espanha por 2 a 1 nas quartas de final.',
    curiosidade: 'Disputou em 2026 a sua 15ª Copa do Mundo.',
    cores: { campo: '#E6B93C', camisa: '#C8102E', numero: '#FFFFFF' },
    fonte: ['wiki-elencos', 'wiki-grupo-g', 'wiki-mata-mata'],
  },
  {
    id: 'egito',
    nome: 'Egito',
    grupo: 'G',
    bandeira: 'eg',
    confederacao: 'CAF (África)',
    tecnico: 'Hossam Hassan',
    capitao: 'Mohamed Salah',
    campanha: 'Segundo lugar do Grupo G, com 5 pontos: 1 a 1 com a Bélgica, 3 a 1 na Nova Zelândia e 1 a 1 com o Irã.',
    depoisDoGrupo: 'Passou pela Austrália nos pênaltis (4 a 2) nos 16 avos de final, depois de 1 a 1. Perdeu para a Argentina por 3 a 2 nas oitavas de final.',
    curiosidade: 'Disputou em 2026 a sua 4ª Copa do Mundo. A anterior tinha sido em 2018.',
    cores: { campo: '#E9E2D0', camisa: '#C8102E', numero: '#FFFFFF' },
    fonte: ['wiki-elencos', 'wiki-grupo-g', 'wiki-mata-mata'],
  },
  {
    id: 'ira',
    nome: 'Irã',
    grupo: 'G',
    bandeira: 'ir',
    confederacao: 'AFC (Ásia)',
    tecnico: 'Amir Ghalenoei',
    capitao: 'Ehsan Hajsafi',
    campanha: 'Terceiro lugar do Grupo G, com 3 pontos: 2 a 2 com a Nova Zelândia, 0 a 0 com a Bélgica e 1 a 1 com o Egito.',
    depoisDoGrupo: 'Eliminado na fase de grupos: não ficou entre os oito melhores terceiros colocados.',
    curiosidade: 'Disputou em 2026 a sua 7ª Copa do Mundo.',
    cores: { campo: '#3FA36B', camisa: '#FFFFFF', numero: '#C8102E' },
    fonte: ['wiki-elencos', 'wiki-grupo-g'],
  },
  {
    id: 'nova-zelandia',
    nome: 'Nova Zelândia',
    grupo: 'G',
    bandeira: 'nz',
    confederacao: 'OFC (Oceania)',
    tecnico: 'Darren Bazeley',
    capitao: 'Chris Wood',
    campanha: 'Quarto lugar do Grupo G, com 1 ponto: 2 a 2 com o Irã, 1 a 3 para o Egito e 1 a 5 para a Bélgica.',
    depoisDoGrupo: 'Eliminada na fase de grupos.',
    curiosidade: 'Disputou em 2026 a sua 3ª Copa do Mundo. A anterior tinha sido em 2010.',
    cores: { campo: '#A9B1BB', camisa: '#FFFFFF', numero: '#1A1A1A' },
    fonte: ['wiki-elencos', 'wiki-grupo-g'],
  },
  {
    id: 'espanha',
    nome: 'Espanha',
    grupo: 'H',
    bandeira: 'es',
    confederacao: 'UEFA (Europa)',
    tecnico: 'Luis de la Fuente',
    capitao: 'Rodri',
    campanha: 'Primeiro lugar do Grupo H, com 7 pontos: 0 a 0 com Cabo Verde, 4 a 0 na Arábia Saudita e 1 a 0 no Uruguai.',
    depoisDoGrupo: 'Venceu a Áustria por 3 a 0 nos 16 avos de final. Venceu Portugal por 1 a 0 nas oitavas de final. Venceu a Bélgica por 2 a 1 nas quartas de final. Venceu a França por 2 a 0 na semifinal. Venceu a Argentina por 1 a 0 na final, na prorrogação. Campeã do mundo.',
    curiosidade: 'Disputou em 2026 a sua 17ª Copa do Mundo.',
    cores: { campo: '#F1BF00', camisa: '#C60B1E', numero: '#FFFFFF' },
    fonte: ['wiki-elencos', 'wiki-grupo-h', 'wiki-mata-mata'],
  },
  {
    id: 'cabo-verde',
    nome: 'Cabo Verde',
    grupo: 'H',
    bandeira: 'cv',
    confederacao: 'CAF (África)',
    tecnico: 'Bubista',
    capitao: 'Ryan Mendes',
    campanha: 'Segundo lugar do Grupo H, com 3 pontos: 0 a 0 com a Espanha, 2 a 2 com o Uruguai e 0 a 0 com a Arábia Saudita.',
    depoisDoGrupo: 'Perdeu para a Argentina por 3 a 2 nos 16 avos de final, na prorrogação.',
    curiosidade: 'Estreou em Copas do Mundo em 2026.',
    cores: { campo: '#DDE3F2', camisa: '#1F4AA8', numero: '#FFFFFF' },
    fonte: ['wiki-elencos', 'wiki-grupo-h', 'wiki-mata-mata'],
  },
  {
    id: 'arabia-saudita',
    nome: 'Arábia Saudita',
    grupo: 'H',
    bandeira: 'sa',
    confederacao: 'AFC (Ásia)',
    tecnico: 'Georgios Donis',
    capitao: 'Salem Al-Dawsari',
    campanha: 'Quarto lugar do Grupo H, com 2 pontos: 1 a 1 com o Uruguai, 0 a 4 para a Espanha e 0 a 0 com Cabo Verde.',
    depoisDoGrupo: 'Eliminada na fase de grupos.',
    curiosidade: 'Disputou em 2026 a sua 7ª Copa do Mundo.',
    cores: { campo: '#E6EFE9', camisa: '#0B6B3A', numero: '#FFFFFF' },
    fonte: ['wiki-elencos', 'wiki-grupo-h'],
  },
  {
    id: 'uruguai',
    nome: 'Uruguai',
    grupo: 'H',
    bandeira: 'uy',
    confederacao: 'CONMEBOL (América do Sul)',
    tecnico: 'Marcelo Bielsa',
    capitao: 'José María Giménez',
    campanha: 'Terceiro lugar do Grupo H, com 2 pontos: 1 a 1 com a Arábia Saudita, 2 a 2 com Cabo Verde e 0 a 1 para a Espanha.',
    depoisDoGrupo: 'Eliminado na fase de grupos: não ficou entre os oito melhores terceiros colocados.',
    curiosidade: 'Disputou em 2026 a sua 15ª Copa do Mundo.',
    cores: { campo: '#F2F2EA', camisa: '#6CACE4', numero: '#14204F' },
    fonte: ['wiki-elencos', 'wiki-grupo-h'],
  },
  {
    id: 'franca',
    nome: 'França',
    grupo: 'I',
    bandeira: 'fr',
    confederacao: 'UEFA (Europa)',
    tecnico: 'Didier Deschamps',
    capitao: 'Kylian Mbappé',
    campanha: 'Primeiro lugar do Grupo I, com 9 pontos: 3 a 1 no Senegal, 3 a 0 no Iraque e 4 a 1 na Noruega.',
    depoisDoGrupo: 'Venceu a Suécia por 3 a 0 nos 16 avos de final. Venceu o Paraguai por 1 a 0 nas oitavas de final. Venceu Marrocos por 2 a 0 nas quartas de final. Perdeu para a Espanha por 2 a 0 na semifinal. Perdeu para a Inglaterra por 6 a 4 na disputa do terceiro lugar. Ficou em quarto lugar.',
    curiosidade: 'Disputou em 2026 a sua 17ª Copa do Mundo.',
    cores: { campo: '#DE5B64', camisa: '#1F3A8A', numero: '#FFFFFF' },
    fonte: ['wiki-elencos', 'wiki-grupo-i', 'wiki-mata-mata'],
  },
  {
    id: 'senegal',
    nome: 'Senegal',
    grupo: 'I',
    bandeira: 'sn',
    confederacao: 'CAF (África)',
    tecnico: 'Pape Thiaw',
    capitao: 'Kalidou Koulibaly',
    campanha: 'Terceiro lugar do Grupo I, com 3 pontos: 1 a 3 para a França, 2 a 3 para a Noruega e 5 a 0 no Iraque.',
    depoisDoGrupo: 'Perdeu para a Bélgica por 3 a 2 nos 16 avos de final, na prorrogação.',
    curiosidade: 'Disputou em 2026 a sua 4ª Copa do Mundo.',
    cores: { campo: '#F2D34B', camisa: '#FFFFFF', numero: '#0B6B3A' },
    fonte: ['wiki-elencos', 'wiki-grupo-i', 'wiki-mata-mata'],
  },
  {
    id: 'iraque',
    nome: 'Iraque',
    grupo: 'I',
    bandeira: 'iq',
    confederacao: 'AFC (Ásia)',
    tecnico: 'Graham Arnold',
    capitao: 'Jalal Hassan',
    campanha: 'Quarto lugar do Grupo I, sem pontos: 1 a 4 para a Noruega, 0 a 3 para a França e 0 a 5 para o Senegal.',
    depoisDoGrupo: 'Eliminado na fase de grupos.',
    curiosidade: 'Disputou em 2026 a sua 2ª Copa do Mundo. A anterior tinha sido em 1986.',
    cores: { campo: '#E9E2D0', camisa: '#0B7A45', numero: '#FFFFFF' },
    fonte: ['wiki-elencos', 'wiki-grupo-i'],
  },
  {
    id: 'noruega',
    nome: 'Noruega',
    grupo: 'I',
    bandeira: 'no',
    confederacao: 'UEFA (Europa)',
    tecnico: 'Ståle Solbakken',
    capitao: 'Martin Ødegaard',
    campanha: 'Segundo lugar do Grupo I, com 6 pontos: 4 a 1 no Iraque, 3 a 2 no Senegal e 1 a 4 para a França.',
    depoisDoGrupo: 'Venceu a Costa do Marfim por 2 a 1 nos 16 avos de final. Venceu o Brasil por 2 a 1 nas oitavas de final. Perdeu para a Inglaterra por 2 a 1 nas quartas de final, na prorrogação.',
    curiosidade: 'Disputou em 2026 a sua 4ª Copa do Mundo. A anterior tinha sido em 1998.',
    cores: { campo: '#5B8BD6', camisa: '#C8102E', numero: '#FFFFFF' },
    fonte: ['wiki-elencos', 'wiki-grupo-i', 'wiki-mata-mata'],
  },
  {
    id: 'argentina',
    nome: 'Argentina',
    grupo: 'J',
    bandeira: 'ar',
    confederacao: 'CONMEBOL (América do Sul)',
    tecnico: 'Lionel Scaloni',
    capitao: 'Lionel Messi',
    campanha: 'Primeiro lugar do Grupo J, com 9 pontos: 3 a 0 na Argélia, 2 a 0 na Áustria e 3 a 1 na Jordânia.',
    depoisDoGrupo: 'Venceu Cabo Verde por 3 a 2 nos 16 avos de final, na prorrogação. Venceu o Egito por 3 a 2 nas oitavas de final. Venceu a Suíça por 3 a 1 nas quartas de final, na prorrogação. Venceu a Inglaterra por 2 a 1 na semifinal. Perdeu para a Espanha por 1 a 0 na final, na prorrogação. Vice-campeã.',
    curiosidade: 'Disputou em 2026 a sua 19ª Copa do Mundo.',
    cores: { campo: '#F3F3F0', camisa: '#75AADB', numero: '#14204F' },
    fonte: ['wiki-elencos', 'wiki-grupo-j', 'wiki-mata-mata'],
  },
  {
    id: 'argelia',
    nome: 'Argélia',
    grupo: 'J',
    bandeira: 'dz',
    confederacao: 'CAF (África)',
    tecnico: 'Vladimir Petković',
    capitao: 'Riyad Mahrez',
    campanha: 'Terceiro lugar do Grupo J, com 4 pontos: 0 a 3 para a Argentina, 2 a 1 na Jordânia e 3 a 3 com a Áustria.',
    depoisDoGrupo: 'Perdeu para a Suíça por 2 a 0 nos 16 avos de final.',
    curiosidade: 'Disputou em 2026 a sua 5ª Copa do Mundo. A anterior tinha sido em 2014.',
    cores: { campo: '#3FA36B', camisa: '#FFFFFF', numero: '#0B6B3A' },
    fonte: ['wiki-elencos', 'wiki-grupo-j', 'wiki-mata-mata'],
  },
  {
    id: 'austria',
    nome: 'Áustria',
    grupo: 'J',
    bandeira: 'at',
    confederacao: 'UEFA (Europa)',
    tecnico: 'Ralf Rangnick',
    capitao: 'David Alaba',
    campanha: 'Segundo lugar do Grupo J, com 4 pontos: 3 a 1 na Jordânia, 0 a 2 para a Argentina e 3 a 3 com a Argélia.',
    depoisDoGrupo: 'Perdeu para a Espanha por 3 a 0 nos 16 avos de final.',
    curiosidade: 'Disputou em 2026 a sua 8ª Copa do Mundo. A anterior tinha sido em 1998.',
    cores: { campo: '#F0E6E6', camisa: '#D52B1E', numero: '#FFFFFF' },
    fonte: ['wiki-elencos', 'wiki-grupo-j', 'wiki-mata-mata'],
  },
  {
    id: 'jordania',
    nome: 'Jordânia',
    grupo: 'J',
    bandeira: 'jo',
    confederacao: 'AFC (Ásia)',
    tecnico: 'Jamal Sellami',
    capitao: 'Ihsan Haddad',
    campanha: 'Quarto lugar do Grupo J, sem pontos: 1 a 3 para a Áustria, 1 a 2 para a Argélia e 1 a 3 para a Argentina.',
    depoisDoGrupo: 'Eliminada na fase de grupos.',
    curiosidade: 'Estreou em Copas do Mundo em 2026.',
    cores: { campo: '#B9BEC6', camisa: '#FFFFFF', numero: '#C8102E' },
    fonte: ['wiki-elencos', 'wiki-grupo-j'],
  },
  {
    id: 'portugal',
    nome: 'Portugal',
    grupo: 'K',
    bandeira: 'pt',
    confederacao: 'UEFA (Europa)',
    tecnico: 'Roberto Martínez',
    capitao: 'Cristiano Ronaldo',
    campanha: 'Segundo lugar do Grupo K, com 5 pontos: 1 a 1 com a RD Congo, 5 a 0 no Uzbequistão e 0 a 0 com a Colômbia.',
    depoisDoGrupo: 'Venceu a Croácia por 2 a 1 nos 16 avos de final. Perdeu para a Espanha por 1 a 0 nas oitavas de final.',
    curiosidade: 'Disputou em 2026 a sua 9ª Copa do Mundo.',
    cores: { campo: '#2E9E6B', camisa: '#C8102E', numero: '#FFFFFF' },
    fonte: ['wiki-elencos', 'wiki-grupo-k', 'wiki-mata-mata'],
  },
  {
    id: 'rd-congo',
    nome: 'RD Congo',
    grupo: 'K',
    bandeira: 'cd',
    confederacao: 'CAF (África)',
    tecnico: 'Sébastien Desabre',
    capitao: 'Chancel Mbemba',
    campanha: 'Terceiro lugar do Grupo K, com 4 pontos: 1 a 1 com Portugal, 0 a 1 para a Colômbia e 3 a 1 no Uzbequistão.',
    depoisDoGrupo: 'Perdeu para a Inglaterra por 2 a 1 nos 16 avos de final.',
    curiosidade: 'Disputou em 2026 a sua 2ª Copa do Mundo. A anterior tinha sido em 1974.',
    cores: { campo: '#F2D34B', camisa: '#1F6FD0', numero: '#FFFFFF' },
    fonte: ['wiki-elencos', 'wiki-grupo-k', 'wiki-mata-mata'],
  },
  {
    id: 'uzbequistao',
    nome: 'Uzbequistão',
    grupo: 'K',
    bandeira: 'uz',
    confederacao: 'AFC (Ásia)',
    tecnico: 'Fabio Cannavaro',
    capitao: 'Eldor Shomurodov',
    campanha: 'Quarto lugar do Grupo K, sem pontos: 1 a 3 para a Colômbia, 0 a 5 para Portugal e 1 a 3 para a RD Congo.',
    depoisDoGrupo: 'Eliminado na fase de grupos.',
    curiosidade: 'Estreou em Copas do Mundo em 2026.',
    cores: { campo: '#6FC0EA', camisa: '#FFFFFF', numero: '#1F5FBF' },
    fonte: ['wiki-elencos', 'wiki-grupo-k'],
  },
  {
    id: 'colombia',
    nome: 'Colômbia',
    grupo: 'K',
    bandeira: 'co',
    confederacao: 'CONMEBOL (América do Sul)',
    tecnico: 'Néstor Lorenzo',
    capitao: 'James Rodríguez',
    campanha: 'Primeiro lugar do Grupo K, com 7 pontos: 3 a 1 no Uzbequistão, 1 a 0 na RD Congo e 0 a 0 com Portugal.',
    depoisDoGrupo: 'Venceu Gana por 1 a 0 nos 16 avos de final. Caiu nos pênaltis para a Suíça (4 a 3) nas oitavas de final, depois de 0 a 0.',
    curiosidade: 'Disputou em 2026 a sua 7ª Copa do Mundo. A anterior tinha sido em 2018.',
    cores: { campo: '#5B8BD6', camisa: '#F7D417', numero: '#1B3F8F' },
    fonte: ['wiki-elencos', 'wiki-grupo-k', 'wiki-mata-mata'],
  },
  {
    id: 'inglaterra',
    nome: 'Inglaterra',
    grupo: 'L',
    bandeira: 'gb-eng',
    confederacao: 'UEFA (Europa)',
    tecnico: 'Thomas Tuchel',
    capitao: 'Harry Kane',
    campanha: 'Primeiro lugar do Grupo L, com 7 pontos: 4 a 2 na Croácia, 0 a 0 com Gana e 2 a 0 no Panamá.',
    depoisDoGrupo: 'Venceu a RD Congo por 2 a 1 nos 16 avos de final. Venceu o México por 3 a 2 nas oitavas de final. Venceu a Noruega por 2 a 1 nas quartas de final, na prorrogação. Perdeu para a Argentina por 2 a 1 na semifinal. Venceu a França por 6 a 4 na disputa do terceiro lugar. Ficou em terceiro lugar.',
    curiosidade: 'Disputou em 2026 a sua 17ª Copa do Mundo.',
    cores: { campo: '#DE5B64', camisa: '#FFFFFF', numero: '#1B2A6B' },
    fonte: ['wiki-elencos', 'wiki-grupo-l', 'wiki-mata-mata'],
  },
  {
    id: 'croacia',
    nome: 'Croácia',
    grupo: 'L',
    bandeira: 'hr',
    confederacao: 'UEFA (Europa)',
    tecnico: 'Zlatko Dalić',
    capitao: 'Luka Modrić',
    campanha: 'Segundo lugar do Grupo L, com 6 pontos: 2 a 4 para a Inglaterra, 1 a 0 no Panamá e 2 a 1 em Gana.',
    depoisDoGrupo: 'Perdeu para Portugal por 2 a 1 nos 16 avos de final.',
    curiosidade: 'Disputou em 2026 a sua 7ª Copa do Mundo.',
    cores: { campo: '#F2F2F2', camisa: '#E03A3E', numero: '#FFFFFF' },
    fonte: ['wiki-elencos', 'wiki-grupo-l', 'wiki-mata-mata'],
  },
  {
    id: 'gana',
    nome: 'Gana',
    grupo: 'L',
    bandeira: 'gh',
    confederacao: 'CAF (África)',
    tecnico: 'Carlos Queiroz',
    capitao: 'Jordan Ayew',
    campanha: 'Terceiro lugar do Grupo L, com 4 pontos: 1 a 0 no Panamá, 0 a 0 com a Inglaterra e 1 a 2 para a Croácia.',
    depoisDoGrupo: 'Perdeu para a Colômbia por 1 a 0 nos 16 avos de final.',
    curiosidade: 'Disputou em 2026 a sua 5ª Copa do Mundo.',
    cores: { campo: '#E6B93C', camisa: '#FFFFFF', numero: '#1A1A1A' },
    fonte: ['wiki-elencos', 'wiki-grupo-l', 'wiki-mata-mata'],
  },
  {
    id: 'panama',
    nome: 'Panamá',
    grupo: 'L',
    bandeira: 'pa',
    confederacao: 'Concacaf (América do Norte, Central e Caribe)',
    tecnico: 'Thomas Christiansen',
    capitao: 'Aníbal Godoy',
    campanha: 'Quarto lugar do Grupo L, sem pontos: 0 a 1 para Gana, 0 a 1 para a Croácia e 0 a 2 para a Inglaterra.',
    depoisDoGrupo: 'Eliminado na fase de grupos.',
    curiosidade: 'Disputou em 2026 a sua 2ª Copa do Mundo. A anterior tinha sido em 2018.',
    cores: { campo: '#5B8BD6', camisa: '#D52B1E', numero: '#FFFFFF' },
    fonte: ['wiki-elencos', 'wiki-grupo-l'],
  },
];

// ---------------------------------------------------------------------------
// FIGURINHAS
// ---------------------------------------------------------------------------
// Numeração: cada grupo tem 24 figurinhas (4 seleções x 6). O Grupo A fica com
// 1 a 24, o B com 25 a 48, o C com 49 a 72 e assim por diante. Dentro do grupo,
// as seleções seguem a ordem do sorteio (C1 Brasil, C2 Marrocos, C3 Haiti,
// C4 Escócia): primeiro a bandeira, depois os 5 jogadores pelo número da camisa.
//
// Raridade (regra do álbum, não é dado da Copa):
//   lendaria  = o camisa 10 da seleção
//   brilhante = a bandeira e o capitão (se o capitão veste a 10, vale a lendária)
//   comum     = os demais
//
// Quem entra, nos grupos lidos por script (todos menos o C), por ordem:
//   1. o capitão;  2. o camisa 10;  3. quem fez mais gols pela seleção na Copa;
//   4. o goleiro com mais jogos pela seleção;
//   5. os jogadores com mais jogos pela seleção, primeiro nas posições que
//      ainda não têm ninguém, até completar cinco.
// "Jogos" e "gols pela seleção" são os da lista de elencos, contados até o
// começo da Copa. "Gols na Copa" foram somados jogo a jogo.
//
// Posição: as quatro categorias da lista oficial (Goleiro, Defensor,
// Meio-campista, Atacante). "clube" é o clube do jogador na época da Copa.

const FIGURINHAS = [
  // =============== Grupo A e Grupo B ===============
  // ----- México -----
  { numero: 1, tipo: 'bandeira', selecao: 'mexico', nome: 'México', raridade: 'brilhante', fonte: ['wiki-grupo-a'] },
  {
    numero: 2, tipo: 'jogador', selecao: 'mexico', nome: 'Edson Álvarez', camisa: 4, posicao: 'Defensor', clube: 'Fenerbahçe', raridade: 'brilhante',
    curiosidade: 'Capitão do México na Copa de 2026. Chegou à Copa com 98 jogos e 7 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 3, tipo: 'jogador', selecao: 'mexico', nome: 'Alexis Vega', camisa: 10, posicao: 'Atacante', clube: 'Toluca', raridade: 'lendaria',
    curiosidade: 'Vestiu a camisa 10 do México. Chegou à Copa com 52 jogos e 7 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 4, tipo: 'jogador', selecao: 'mexico', nome: 'Guillermo Ochoa', camisa: 13, posicao: 'Goleiro', clube: 'AEL Limassol', raridade: 'comum',
    curiosidade: 'É quem mais jogou pela seleção no elenco: 152 partidas.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 5, tipo: 'jogador', selecao: 'mexico', nome: 'Julián Quiñones', camisa: 16, posicao: 'Atacante', clube: 'Al-Qadsiah', raridade: 'comum',
    curiosidade: 'Fez 4 gols na Copa de 2026. Chegou à Copa com 22 jogos e 2 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos', 'wiki-jogos'],
  },
  {
    numero: 6, tipo: 'jogador', selecao: 'mexico', nome: 'Orbelín Pineda', camisa: 17, posicao: 'Meio-campista', clube: 'AEK Athens', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 92 jogos e 12 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },

  // ----- África do Sul -----
  { numero: 7, tipo: 'bandeira', selecao: 'africa-do-sul', nome: 'África do Sul', raridade: 'brilhante', fonte: ['wiki-grupo-a'] },
  {
    numero: 8, tipo: 'jogador', selecao: 'africa-do-sul', nome: 'Ronwen Williams', camisa: 1, posicao: 'Goleiro', clube: 'Mamelodi Sundowns', raridade: 'brilhante',
    curiosidade: 'Capitão da África do Sul na Copa de 2026. É quem mais jogou pela seleção no elenco: 62 partidas.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 9, tipo: 'jogador', selecao: 'africa-do-sul', nome: 'Teboho Mokoena', camisa: 4, posicao: 'Meio-campista', clube: 'Mamelodi Sundowns', raridade: 'comum',
    curiosidade: 'Fez 1 gol na Copa de 2026. Chegou à Copa com 51 jogos e 9 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos', 'wiki-jogos'],
  },
  {
    numero: 10, tipo: 'jogador', selecao: 'africa-do-sul', nome: 'Aubrey Modiba', camisa: 6, posicao: 'Defensor', clube: 'Mamelodi Sundowns', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 44 jogos e 3 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 11, tipo: 'jogador', selecao: 'africa-do-sul', nome: 'Relebohile Mofokeng', camisa: 10, posicao: 'Atacante', clube: 'Orlando Pirates', raridade: 'lendaria',
    curiosidade: 'Vestiu a camisa 10 da África do Sul. Chegou à Copa com 13 jogos e 1 gol pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 12, tipo: 'jogador', selecao: 'africa-do-sul', nome: 'Themba Zwane', camisa: 11, posicao: 'Meio-campista', clube: 'Mamelodi Sundowns', raridade: 'comum',
    curiosidade: 'Maior goleador do elenco, com 12 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },

  // ----- Coreia do Sul -----
  { numero: 13, tipo: 'bandeira', selecao: 'coreia-do-sul', nome: 'Coreia do Sul', raridade: 'brilhante', fonte: ['wiki-grupo-a'] },
  {
    numero: 14, tipo: 'jogador', selecao: 'coreia-do-sul', nome: 'Kim Seung-gyu', camisa: 1, posicao: 'Goleiro', clube: 'FC Tokyo', raridade: 'comum',
    curiosidade: 'O mais velho do elenco, com 35 anos.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 15, tipo: 'jogador', selecao: 'coreia-do-sul', nome: 'Kim Min-jae', camisa: 4, posicao: 'Defensor', clube: 'Bayern Munich', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 79 jogos e 4 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 16, tipo: 'jogador', selecao: 'coreia-do-sul', nome: 'Hwang In-beom', camisa: 6, posicao: 'Meio-campista', clube: 'Feyenoord', raridade: 'comum',
    curiosidade: 'Fez 1 gol na Copa de 2026. Chegou à Copa com 73 jogos e 6 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos', 'wiki-jogos'],
  },
  {
    numero: 17, tipo: 'jogador', selecao: 'coreia-do-sul', nome: 'Son Heung-min', camisa: 7, posicao: 'Atacante', clube: 'Los Angeles FC', raridade: 'brilhante',
    curiosidade: 'Capitão da Coreia do Sul na Copa de 2026. É quem mais jogou pela seleção no elenco: 144 partidas.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 18, tipo: 'jogador', selecao: 'coreia-do-sul', nome: 'Lee Jae-sung', camisa: 10, posicao: 'Meio-campista', clube: 'Mainz 05', raridade: 'lendaria',
    curiosidade: 'Vestiu a camisa 10 da Coreia do Sul. Chegou à Copa com 105 jogos e 15 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },

  // ----- Tchéquia -----
  { numero: 19, tipo: 'bandeira', selecao: 'tchequia', nome: 'Tchéquia', raridade: 'brilhante', fonte: ['wiki-grupo-a'] },
  {
    numero: 20, tipo: 'jogador', selecao: 'tchequia', nome: 'Matěj Kovář', camisa: 1, posicao: 'Goleiro', clube: 'PSV Eindhoven', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 20 jogos pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 21, tipo: 'jogador', selecao: 'tchequia', nome: 'Ladislav Krejčí', camisa: 7, posicao: 'Defensor', clube: 'Wolverhampton Wanderers', raridade: 'brilhante',
    curiosidade: 'Capitão da Tchéquia na Copa de 2026. Fez 1 gol na Copa de 2026.',
    fonte: ['wiki-elencos', 'f365-elencos', 'wiki-jogos'],
  },
  {
    numero: 22, tipo: 'jogador', selecao: 'tchequia', nome: 'Patrik Schick', camisa: 10, posicao: 'Atacante', clube: 'Bayer Leverkusen', raridade: 'lendaria',
    curiosidade: 'Vestiu a camisa 10 da Tchéquia. Maior goleador do elenco, com 26 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 23, tipo: 'jogador', selecao: 'tchequia', nome: 'Michal Sadílek', camisa: 18, posicao: 'Meio-campista', clube: 'Slavia Prague', raridade: 'comum',
    curiosidade: 'Fez 1 gol na Copa de 2026. Chegou à Copa com 35 jogos e 1 gol pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos', 'wiki-jogos'],
  },
  {
    numero: 24, tipo: 'jogador', selecao: 'tchequia', nome: 'Tomáš Souček', camisa: 22, posicao: 'Meio-campista', clube: 'West Ham United', raridade: 'comum',
    curiosidade: 'É quem mais jogou pela seleção no elenco: 90 partidas.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },

  // ----- Canadá -----
  { numero: 25, tipo: 'bandeira', selecao: 'canada', nome: 'Canadá', raridade: 'brilhante', fonte: ['wiki-grupo-b'] },
  {
    numero: 26, tipo: 'jogador', selecao: 'canada', nome: 'Cyle Larin', camisa: 9, posicao: 'Atacante', clube: 'Southampton', raridade: 'comum',
    curiosidade: 'Fez 2 gols na Copa de 2026. É quem mais jogou pela seleção no elenco: 90 partidas.',
    fonte: ['wiki-elencos', 'f365-elencos', 'wiki-jogos'],
  },
  {
    numero: 27, tipo: 'jogador', selecao: 'canada', nome: 'Jonathan David', camisa: 10, posicao: 'Atacante', clube: 'Juventus', raridade: 'lendaria',
    curiosidade: 'Vestiu a camisa 10 do Canadá. Fez 3 gols na Copa de 2026.',
    fonte: ['wiki-elencos', 'f365-elencos', 'wiki-jogos'],
  },
  {
    numero: 28, tipo: 'jogador', selecao: 'canada', nome: 'Maxime Crépeau', camisa: 16, posicao: 'Goleiro', clube: 'Orlando City SC', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 32 jogos pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 29, tipo: 'jogador', selecao: 'canada', nome: 'Alphonso Davies', camisa: 19, posicao: 'Defensor', clube: 'Bayern Munich', raridade: 'brilhante',
    curiosidade: 'Capitão do Canadá na Copa de 2026. Chegou à Copa com 58 jogos e 15 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 30, tipo: 'jogador', selecao: 'canada', nome: 'Jonathan Osorio', camisa: 21, posicao: 'Meio-campista', clube: 'Toronto FC', raridade: 'comum',
    curiosidade: 'É quem mais jogou pela seleção no elenco: 90 partidas.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },

  // ----- Bósnia e Herzegovina -----
  { numero: 31, tipo: 'bandeira', selecao: 'bosnia', nome: 'Bósnia e Herzegovina', raridade: 'brilhante', fonte: ['wiki-grupo-b'] },
  {
    numero: 32, tipo: 'jogador', selecao: 'bosnia', nome: 'Nikola Vasilj', camisa: 1, posicao: 'Goleiro', clube: 'FC St. Pauli', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 26 jogos pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 33, tipo: 'jogador', selecao: 'bosnia', nome: 'Sead Kolašinac', camisa: 5, posicao: 'Defensor', clube: 'Atalanta', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 65 jogos pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 34, tipo: 'jogador', selecao: 'bosnia', nome: 'Ermedin Demirović', camisa: 10, posicao: 'Atacante', clube: 'VfB Stuttgart', raridade: 'lendaria',
    curiosidade: 'Vestiu a camisa 10 da Bósnia e Herzegovina. Chegou à Copa com 40 jogos e 4 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 35, tipo: 'jogador', selecao: 'bosnia', nome: 'Edin Džeko', camisa: 11, posicao: 'Atacante', clube: 'Schalke 04', raridade: 'brilhante',
    curiosidade: 'Capitão da Bósnia e Herzegovina na Copa de 2026. É quem mais jogou pela seleção no elenco: 148 partidas.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 36, tipo: 'jogador', selecao: 'bosnia', nome: 'Ermin Mahmić', camisa: 26, posicao: 'Meio-campista', clube: 'Slovan Liberec', raridade: 'comum',
    curiosidade: 'Fez 2 gols na Copa de 2026. Chegou à Copa com 2 jogos pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos', 'wiki-jogos'],
  },

  // ----- Catar -----
  { numero: 37, tipo: 'bandeira', selecao: 'catar', nome: 'Catar', raridade: 'brilhante', fonte: ['wiki-grupo-b'] },
  {
    numero: 38, tipo: 'jogador', selecao: 'catar', nome: 'Abdulaziz Hatem', camisa: 6, posicao: 'Meio-campista', clube: 'Al-Rayyan', raridade: 'comum',
    curiosidade: 'O mais velho do elenco, com 36 anos.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 39, tipo: 'jogador', selecao: 'catar', nome: 'Hassan Al-Haydos', camisa: 10, posicao: 'Atacante', clube: 'Al-Sadd', raridade: 'lendaria',
    curiosidade: 'Capitão e camisa 10 do Catar. Fez 1 gol na Copa de 2026.',
    fonte: ['wiki-elencos', 'f365-elencos', 'wiki-jogos'],
  },
  {
    numero: 40, tipo: 'jogador', selecao: 'catar', nome: 'Akram Afif', camisa: 11, posicao: 'Atacante', clube: 'Al-Sadd', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 125 jogos e 39 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 41, tipo: 'jogador', selecao: 'catar', nome: 'Boualem Khoukhi', camisa: 16, posicao: 'Defensor', clube: 'Al-Sadd', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 116 jogos e 20 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 42, tipo: 'jogador', selecao: 'catar', nome: 'Meshaal Barsham', camisa: 22, posicao: 'Goleiro', clube: 'Al-Sadd', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 52 jogos pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },

  // ----- Suíça -----
  { numero: 43, tipo: 'bandeira', selecao: 'suica', nome: 'Suíça', raridade: 'brilhante', fonte: ['wiki-grupo-b'] },
  {
    numero: 44, tipo: 'jogador', selecao: 'suica', nome: 'Gregor Kobel', camisa: 1, posicao: 'Goleiro', clube: 'Borussia Dortmund', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 21 jogos pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 45, tipo: 'jogador', selecao: 'suica', nome: 'Breel Embolo', camisa: 7, posicao: 'Atacante', clube: 'Rennes', raridade: 'comum',
    curiosidade: 'Fez 2 gols na Copa de 2026. Maior goleador do elenco, com 24 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos', 'wiki-jogos'],
  },
  {
    numero: 46, tipo: 'jogador', selecao: 'suica', nome: 'Johan Manzambi', camisa: 9, posicao: 'Meio-campista', clube: 'SC Freiburg', raridade: 'comum',
    curiosidade: 'Fez 3 gols na Copa de 2026. O mais novo do elenco, com 20 anos.',
    fonte: ['wiki-elencos', 'f365-elencos', 'wiki-jogos'],
  },
  {
    numero: 47, tipo: 'jogador', selecao: 'suica', nome: 'Granit Xhaka', camisa: 10, posicao: 'Meio-campista', clube: 'Sunderland', raridade: 'lendaria',
    curiosidade: 'Capitão e camisa 10 da Suíça. Fez 1 gol na Copa de 2026.',
    fonte: ['wiki-elencos', 'f365-elencos', 'wiki-jogos'],
  },
  {
    numero: 48, tipo: 'jogador', selecao: 'suica', nome: 'Ricardo Rodriguez', camisa: 13, posicao: 'Defensor', clube: 'Real Betis', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 138 jogos e 9 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },

  // =============== Grupo C (pesquisado e escrito à mão) ===============
  // ----- Brasil -----
  { numero: 49, tipo: 'bandeira', selecao: 'brasil', nome: 'Brasil', raridade: 'brilhante', fonte: ['wiki-grupo-c'] },
  {
    numero: 50, tipo: 'jogador', selecao: 'brasil', nome: 'Alisson', camisa: 1, posicao: 'Goleiro', clube: 'Liverpool', raridade: 'comum',
    curiosidade: 'Foi à terceira Copa seguida como goleiro do Brasil: 2018, 2022 e 2026.',
    fonte: ['wiki-elencos', 'f365-elencos', 'itatiaia-alisson', 'dp-alisson'],
  },
  {
    numero: 51, tipo: 'jogador', selecao: 'brasil', nome: 'Marquinhos', camisa: 4, posicao: 'Defensor', clube: 'Paris Saint-Germain', raridade: 'brilhante',
    curiosidade: 'Capitão do Brasil na Copa de 2026, a terceira da carreira dele.',
    fonte: ['wiki-elencos', 'f365-elencos', 'itatiaia-marquinhos', 'opopular-capitao'],
  },
  {
    numero: 52, tipo: 'jogador', selecao: 'brasil', nome: 'Casemiro', camisa: 5, posicao: 'Meio-campista', clube: 'Manchester United', raridade: 'comum',
    curiosidade: 'Usou a braçadeira de capitão no último amistoso antes da Copa, contra o Panamá.',
    fonte: ['wiki-elencos', 'f365-elencos', 'opopular-capitao'],
  },
  {
    numero: 53, tipo: 'jogador', selecao: 'brasil', nome: 'Vinícius Júnior', camisa: 7, posicao: 'Atacante', clube: 'Real Madrid', raridade: 'comum',
    curiosidade: 'Fez dois gols nos 3 a 0 sobre a Escócia e foi eleito o melhor em campo.',
    fonte: ['wiki-elencos', 'f365-elencos', 'espn-escocia-brasil', 'aljazeera-escocia-brasil'],
  },
  {
    numero: 54, tipo: 'jogador', selecao: 'brasil', nome: 'Neymar', camisa: 10, posicao: 'Atacante', clube: 'Santos', raridade: 'lendaria',
    curiosidade: 'Maior artilheiro da história da seleção brasileira. Vestiu a camisa 10 na Copa de 2026.',
    fonte: ['wiki-elencos', 'f365-elencos', 'fourfourtwo-brasil', 'si-numeros-brasil'],
  },

  // ----- Marrocos -----
  { numero: 55, tipo: 'bandeira', selecao: 'marrocos', nome: 'Marrocos', raridade: 'brilhante', fonte: ['wiki-grupo-c'] },
  {
    numero: 56, tipo: 'jogador', selecao: 'marrocos', nome: 'Yassine Bounou', camisa: 1, posicao: 'Goleiro', clube: 'Al-Hilal', raridade: 'comum',
    curiosidade: 'Parte da imprensa o chama pelo apelido: Bono.',
    fonte: ['wiki-elencos', 'f365-elencos', 'bein-marrocos'],
  },
  {
    numero: 57, tipo: 'jogador', selecao: 'marrocos', nome: 'Achraf Hakimi', camisa: 2, posicao: 'Defensor', clube: 'Paris Saint-Germain', raridade: 'brilhante',
    curiosidade: 'Capitão de Marrocos e o jogador com mais partidas pela seleção no elenco.',
    fonte: ['wiki-elencos', 'f365-elencos', 'thenational-marrocos'],
  },
  {
    numero: 58, tipo: 'jogador', selecao: 'marrocos', nome: 'Brahim Díaz', camisa: 10, posicao: 'Atacante', clube: 'Real Madrid', raridade: 'lendaria',
    curiosidade: 'Vestiu a camisa 10 de Marrocos na Copa de 2026.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 59, tipo: 'jogador', selecao: 'marrocos', nome: 'Ismael Saibari', camisa: 11, posicao: 'Meio-campista', clube: 'PSV Eindhoven', raridade: 'comum',
    curiosidade: 'Marcou contra o Brasil e, aos 71 segundos de jogo, contra a Escócia.',
    fonte: ['wiki-elencos', 'f365-elencos', 'fox-saibari', 'aljazeera-saibari'],
  },
  {
    numero: 60, tipo: 'jogador', selecao: 'marrocos', nome: 'Ayoub El Kaabi', camisa: 20, posicao: 'Atacante', clube: 'Olympiacos', raridade: 'comum',
    curiosidade: 'Chegou à Copa como o maior goleador do elenco marroquino.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },

  // ----- Haiti -----
  { numero: 61, tipo: 'bandeira', selecao: 'haiti', nome: 'Haiti', raridade: 'brilhante', fonte: ['wiki-grupo-c'] },
  {
    numero: 62, tipo: 'jogador', selecao: 'haiti', nome: 'Johny Placide', camisa: 1, posicao: 'Goleiro', clube: 'Bastia', raridade: 'brilhante',
    curiosidade: 'Capitão do Haiti e o mais experiente do elenco. Estreou pela seleção em 2011.',
    fonte: ['wiki-elencos', 'f365-elencos', 'concacaf-haiti'],
  },
  {
    numero: 63, tipo: 'jogador', selecao: 'haiti', nome: 'Ricardo Adé', camisa: 4, posicao: 'Defensor', clube: 'LDU Quito', raridade: 'comum',
    curiosidade: 'Aos 36 anos, era o defensor mais velho do elenco do Haiti.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 64, tipo: 'jogador', selecao: 'haiti', nome: 'Duckens Nazon', camisa: 9, posicao: 'Atacante', clube: 'Esteghlal', raridade: 'comum',
    curiosidade: 'Maior artilheiro da história do Haiti. Ninguém fez mais gols que ele nas Eliminatórias da Concacaf: 6.',
    fonte: ['wiki-elencos', 'f365-elencos', 'concacaf-haiti'],
  },
  {
    numero: 65, tipo: 'jogador', selecao: 'haiti', nome: 'Jean-Ricner Bellegarde', camisa: 10, posicao: 'Meio-campista', clube: 'Wolverhampton Wanderers', raridade: 'lendaria',
    curiosidade: 'Vestiu a camisa 10 do Haiti. Joga na primeira divisão da Inglaterra.',
    fonte: ['wiki-elencos', 'f365-elencos', 'heavy-haiti'],
  },
  {
    numero: 66, tipo: 'jogador', selecao: 'haiti', nome: 'Frantzdy Pierrot', camisa: 20, posicao: 'Atacante', clube: 'Çaykur Rizespor', raridade: 'comum',
    curiosidade: 'Nasceu no Haiti e cresceu nos Estados Unidos, um dos países-sede da Copa.',
    fonte: ['wiki-elencos', 'f365-elencos', 'concacaf-haiti'],
  },

  // ----- Escócia -----
  { numero: 67, tipo: 'bandeira', selecao: 'escocia', nome: 'Escócia', raridade: 'brilhante', fonte: ['wiki-grupo-c'] },
  {
    numero: 68, tipo: 'jogador', selecao: 'escocia', nome: 'Andy Robertson', camisa: 3, posicao: 'Defensor', clube: 'Liverpool', raridade: 'brilhante',
    curiosidade: 'Capitão da Escócia. Estreou pela seleção em 2014.',
    fonte: ['wiki-elencos', 'f365-elencos', 'uefa-escocia'],
  },
  {
    numero: 69, tipo: 'jogador', selecao: 'escocia', nome: 'Scott McTominay', camisa: 4, posicao: 'Meio-campista', clube: 'Napoli', raridade: 'comum',
    curiosidade: 'Um dos três artilheiros da Escócia nas Eliminatórias, com 2 gols.',
    fonte: ['wiki-elencos', 'f365-elencos', 'uefa-escocia'],
  },
  {
    numero: 70, tipo: 'jogador', selecao: 'escocia', nome: 'John McGinn', camisa: 7, posicao: 'Meio-campista', clube: 'Aston Villa', raridade: 'comum',
    curiosidade: 'Fez o gol do 1 a 0 sobre o Haiti: a primeira vitória da Escócia em Copas desde 1990.',
    fonte: ['wiki-elencos', 'f365-elencos', 'espn-haiti-escocia', 'thescore-haiti-escocia'],
  },
  {
    numero: 71, tipo: 'jogador', selecao: 'escocia', nome: 'Ché Adams', camisa: 10, posicao: 'Atacante', clube: 'Torino', raridade: 'lendaria',
    curiosidade: 'Um dos três artilheiros da Escócia nas Eliminatórias, com 2 gols.',
    fonte: ['wiki-elencos', 'f365-elencos', 'uefa-escocia'],
  },
  {
    numero: 72, tipo: 'jogador', selecao: 'escocia', nome: 'Craig Gordon', camisa: 21, posicao: 'Goleiro', clube: 'Heart of Midlothian', raridade: 'comum',
    curiosidade: 'Jogador mais velho da Copa de 2026: 43 anos e 162 dias.',
    fonte: ['wiki-elencos', 'f365-elencos', 'fifa-elencos'],
  },

  // =============== Grupos D a L ===============
  // ----- Estados Unidos -----
  { numero: 73, tipo: 'bandeira', selecao: 'estados-unidos', nome: 'Estados Unidos', raridade: 'brilhante', fonte: ['wiki-grupo-d'] },
  {
    numero: 74, tipo: 'jogador', selecao: 'estados-unidos', nome: 'Matt Turner', camisa: 1, posicao: 'Goleiro', clube: 'New England Revolution', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 54 jogos pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 75, tipo: 'jogador', selecao: 'estados-unidos', nome: 'Weston McKennie', camisa: 8, posicao: 'Meio-campista', clube: 'Juventus', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 66 jogos e 12 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 76, tipo: 'jogador', selecao: 'estados-unidos', nome: 'Christian Pulisic', camisa: 10, posicao: 'Atacante', clube: 'AC Milan', raridade: 'lendaria',
    curiosidade: 'Vestiu a camisa 10 dos Estados Unidos. É quem mais jogou pela seleção no elenco: 86 partidas.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 77, tipo: 'jogador', selecao: 'estados-unidos', nome: 'Tim Ream', camisa: 13, posicao: 'Defensor', clube: 'Charlotte FC', raridade: 'brilhante',
    curiosidade: 'Capitão dos Estados Unidos na Copa de 2026. O mais velho do elenco, com 38 anos.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 78, tipo: 'jogador', selecao: 'estados-unidos', nome: 'Folarin Balogun', camisa: 20, posicao: 'Atacante', clube: 'Monaco', raridade: 'comum',
    curiosidade: 'Fez 3 gols na Copa de 2026. Chegou à Copa com 27 jogos e 9 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos', 'wiki-jogos'],
  },

  // ----- Paraguai -----
  { numero: 79, tipo: 'bandeira', selecao: 'paraguai', nome: 'Paraguai', raridade: 'brilhante', fonte: ['wiki-grupo-d'] },
  {
    numero: 80, tipo: 'jogador', selecao: 'paraguai', nome: 'Gatito Fernández', camisa: 1, posicao: 'Goleiro', clube: 'Cerro Porteño', raridade: 'comum',
    curiosidade: 'O mais velho do elenco, com 38 anos.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 81, tipo: 'jogador', selecao: 'paraguai', nome: 'Júnior Alonso', camisa: 6, posicao: 'Defensor', clube: 'Atlético Mineiro', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 71 jogos e 3 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 82, tipo: 'jogador', selecao: 'paraguai', nome: 'Miguel Almirón', camisa: 10, posicao: 'Meio-campista', clube: 'Atlanta United FC', raridade: 'lendaria',
    curiosidade: 'Vestiu a camisa 10 do Paraguai. Maior goleador do elenco, com 10 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 83, tipo: 'jogador', selecao: 'paraguai', nome: 'Gustavo Gómez', camisa: 15, posicao: 'Defensor', clube: 'Palmeiras', raridade: 'brilhante',
    curiosidade: 'Capitão do Paraguai na Copa de 2026. É quem mais jogou pela seleção no elenco: 89 partidas.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 84, tipo: 'jogador', selecao: 'paraguai', nome: 'Julio Enciso', camisa: 19, posicao: 'Atacante', clube: 'Strasbourg', raridade: 'comum',
    curiosidade: 'Fez 1 gol na Copa de 2026. Chegou à Copa com 32 jogos e 4 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos', 'wiki-jogos'],
  },

  // ----- Austrália -----
  { numero: 85, tipo: 'bandeira', selecao: 'australia', nome: 'Austrália', raridade: 'brilhante', fonte: ['wiki-grupo-d'] },
  {
    numero: 86, tipo: 'jogador', selecao: 'australia', nome: 'Mathew Ryan', camisa: 1, posicao: 'Goleiro', clube: 'Levante', raridade: 'brilhante',
    curiosidade: 'Capitão da Austrália na Copa de 2026. É quem mais jogou pela seleção no elenco: 104 partidas.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 87, tipo: 'jogador', selecao: 'australia', nome: 'Connor Metcalfe', camisa: 8, posicao: 'Meio-campista', clube: 'FC St. Pauli', raridade: 'comum',
    curiosidade: 'Fez 1 gol na Copa de 2026. Chegou à Copa com 36 jogos e 1 gol pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos', 'wiki-jogos'],
  },
  {
    numero: 88, tipo: 'jogador', selecao: 'australia', nome: 'Ajdin Hrustic', camisa: 10, posicao: 'Atacante', clube: 'Heracles Almelo', raridade: 'lendaria',
    curiosidade: 'Vestiu a camisa 10 da Austrália. Chegou à Copa com 37 jogos e 4 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 89, tipo: 'jogador', selecao: 'australia', nome: 'Aziz Behich', camisa: 16, posicao: 'Defensor', clube: 'Melbourne City', raridade: 'comum',
    curiosidade: 'O mais velho do elenco, com 35 anos.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 90, tipo: 'jogador', selecao: 'australia', nome: 'Jackson Irvine', camisa: 22, posicao: 'Meio-campista', clube: 'FC St. Pauli', raridade: 'comum',
    curiosidade: 'Maior goleador do elenco, com 14 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },

  // ----- Turquia -----
  { numero: 91, tipo: 'bandeira', selecao: 'turquia', nome: 'Turquia', raridade: 'brilhante', fonte: ['wiki-grupo-d'] },
  {
    numero: 92, tipo: 'jogador', selecao: 'turquia', nome: 'Merih Demiral', camisa: 3, posicao: 'Defensor', clube: 'Al-Ahli', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 62 jogos e 6 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 93, tipo: 'jogador', selecao: 'turquia', nome: 'Kerem Aktürkoğlu', camisa: 7, posicao: 'Atacante', clube: 'Fenerbahçe', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 52 jogos e 15 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 94, tipo: 'jogador', selecao: 'turquia', nome: 'Hakan Çalhanoğlu', camisa: 10, posicao: 'Meio-campista', clube: 'Inter Milan', raridade: 'lendaria',
    curiosidade: 'Capitão e camisa 10 da Turquia. É quem mais jogou pela seleção no elenco: 105 partidas.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 95, tipo: 'jogador', selecao: 'turquia', nome: 'Kaan Ayhan', camisa: 22, posicao: 'Meio-campista', clube: 'Galatasaray', raridade: 'comum',
    curiosidade: 'Fez 1 gol na Copa de 2026. Chegou à Copa com 73 jogos e 5 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos', 'wiki-jogos'],
  },
  {
    numero: 96, tipo: 'jogador', selecao: 'turquia', nome: 'Uğurcan Çakır', camisa: 23, posicao: 'Goleiro', clube: 'Galatasaray', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 39 jogos pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },

  // ----- Alemanha -----
  { numero: 97, tipo: 'bandeira', selecao: 'alemanha', nome: 'Alemanha', raridade: 'brilhante', fonte: ['wiki-grupo-e'] },
  {
    numero: 98, tipo: 'jogador', selecao: 'alemanha', nome: 'Manuel Neuer', camisa: 1, posicao: 'Goleiro', clube: 'Bayern Munich', raridade: 'comum',
    curiosidade: 'É quem mais jogou pela seleção no elenco: 124 partidas.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 99, tipo: 'jogador', selecao: 'alemanha', nome: 'Antonio Rüdiger', camisa: 2, posicao: 'Defensor', clube: 'Real Madrid', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 82 jogos e 3 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 100, tipo: 'jogador', selecao: 'alemanha', nome: 'Joshua Kimmich', camisa: 6, posicao: 'Defensor', clube: 'Bayern Munich', raridade: 'brilhante',
    curiosidade: 'Capitão da Alemanha na Copa de 2026. Chegou à Copa com 110 jogos e 10 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 101, tipo: 'jogador', selecao: 'alemanha', nome: 'Kai Havertz', camisa: 7, posicao: 'Atacante', clube: 'Arsenal', raridade: 'comum',
    curiosidade: 'Fez 3 gols na Copa de 2026. Maior goleador do elenco, com 22 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos', 'wiki-jogos'],
  },
  {
    numero: 102, tipo: 'jogador', selecao: 'alemanha', nome: 'Jamal Musiala', camisa: 10, posicao: 'Meio-campista', clube: 'Bayern Munich', raridade: 'lendaria',
    curiosidade: 'Vestiu a camisa 10 da Alemanha. Fez 1 gol na Copa de 2026.',
    fonte: ['wiki-elencos', 'f365-elencos', 'wiki-jogos'],
  },

  // ----- Curaçao -----
  { numero: 103, tipo: 'bandeira', selecao: 'curacao', nome: 'Curaçao', raridade: 'brilhante', fonte: ['wiki-grupo-e'] },
  {
    numero: 104, tipo: 'jogador', selecao: 'curacao', nome: 'Eloy Room', camisa: 1, posicao: 'Goleiro', clube: 'Miami FC', raridade: 'comum',
    curiosidade: 'O mais velho do elenco, com 37 anos.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 105, tipo: 'jogador', selecao: 'curacao', nome: 'Juriën Gaari', camisa: 3, posicao: 'Defensor', clube: 'Abha', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 60 jogos e 1 gol pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 106, tipo: 'jogador', selecao: 'curacao', nome: 'Livano Comenencia', camisa: 8, posicao: 'Meio-campista', clube: 'Zürich', raridade: 'comum',
    curiosidade: 'Fez 1 gol na Copa de 2026. O mais novo do elenco, com 22 anos.',
    fonte: ['wiki-elencos', 'f365-elencos', 'wiki-jogos'],
  },
  {
    numero: 107, tipo: 'jogador', selecao: 'curacao', nome: 'Leandro Bacuna', camisa: 10, posicao: 'Meio-campista', clube: 'Iğdır', raridade: 'lendaria',
    curiosidade: 'Capitão e camisa 10 de Curaçao. É quem mais jogou pela seleção no elenco: 72 partidas.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 108, tipo: 'jogador', selecao: 'curacao', nome: 'Kenji Gorré', camisa: 14, posicao: 'Atacante', clube: 'Maccabi Haifa', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 38 jogos e 6 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },

  // ----- Costa do Marfim -----
  { numero: 109, tipo: 'bandeira', selecao: 'costa-do-marfim', nome: 'Costa do Marfim', raridade: 'brilhante', fonte: ['wiki-grupo-e'] },
  {
    numero: 110, tipo: 'jogador', selecao: 'costa-do-marfim', nome: 'Yahia Fofana', camisa: 1, posicao: 'Goleiro', clube: 'Çaykur Rizespor', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 35 jogos pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 111, tipo: 'jogador', selecao: 'costa-do-marfim', nome: 'Ghislain Konan', camisa: 3, posicao: 'Defensor', clube: 'Gil Vicente', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 54 jogos pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 112, tipo: 'jogador', selecao: 'costa-do-marfim', nome: 'Franck Kessié', camisa: 8, posicao: 'Meio-campista', clube: 'Al-Ahli', raridade: 'brilhante',
    curiosidade: 'Capitão da Costa do Marfim na Copa de 2026. Fez 1 gol na Copa de 2026.',
    fonte: ['wiki-elencos', 'f365-elencos', 'wiki-jogos'],
  },
  {
    numero: 113, tipo: 'jogador', selecao: 'costa-do-marfim', nome: 'Simon Adingra', camisa: 10, posicao: 'Atacante', clube: 'Monaco', raridade: 'lendaria',
    curiosidade: 'Vestiu a camisa 10 da Costa do Marfim. Chegou à Copa com 29 jogos e 5 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 114, tipo: 'jogador', selecao: 'costa-do-marfim', nome: 'Nicolas Pépé', camisa: 19, posicao: 'Atacante', clube: 'Villarreal', raridade: 'comum',
    curiosidade: 'Fez 2 gols na Copa de 2026. Chegou à Copa com 56 jogos e 12 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos', 'wiki-jogos'],
  },

  // ----- Equador -----
  { numero: 115, tipo: 'bandeira', selecao: 'equador', nome: 'Equador', raridade: 'brilhante', fonte: ['wiki-grupo-e'] },
  {
    numero: 116, tipo: 'jogador', selecao: 'equador', nome: 'Hernán Galíndez', camisa: 1, posicao: 'Goleiro', clube: 'Huracán', raridade: 'comum',
    curiosidade: 'O mais velho do elenco, com 39 anos.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 117, tipo: 'jogador', selecao: 'equador', nome: 'Kendry Páez', camisa: 10, posicao: 'Meio-campista', clube: 'River Plate', raridade: 'lendaria',
    curiosidade: 'Vestiu a camisa 10 do Equador. O mais novo do elenco, com 19 anos.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 118, tipo: 'jogador', selecao: 'equador', nome: 'Enner Valencia', camisa: 13, posicao: 'Atacante', clube: 'Pachuca', raridade: 'brilhante',
    curiosidade: 'Capitão do Equador na Copa de 2026. É quem mais jogou pela seleção no elenco: 105 partidas.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 119, tipo: 'jogador', selecao: 'equador', nome: 'Ángelo Preciado', camisa: 17, posicao: 'Defensor', clube: 'Atlético Mineiro', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 55 jogos pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 120, tipo: 'jogador', selecao: 'equador', nome: 'Gonzalo Plata', camisa: 19, posicao: 'Atacante', clube: 'Flamengo', raridade: 'comum',
    curiosidade: 'Fez 1 gol na Copa de 2026. Chegou à Copa com 50 jogos e 8 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos', 'wiki-jogos'],
  },

  // ----- Holanda -----
  { numero: 121, tipo: 'bandeira', selecao: 'holanda', nome: 'Holanda', raridade: 'brilhante', fonte: ['wiki-grupo-f'] },
  {
    numero: 122, tipo: 'jogador', selecao: 'holanda', nome: 'Bart Verbruggen', camisa: 1, posicao: 'Goleiro', clube: 'Brighton & Hove Albion', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 29 jogos pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 123, tipo: 'jogador', selecao: 'holanda', nome: 'Virgil van Dijk', camisa: 4, posicao: 'Defensor', clube: 'Liverpool', raridade: 'brilhante',
    curiosidade: 'Capitão da Holanda na Copa de 2026. Fez 1 gol na Copa de 2026.',
    fonte: ['wiki-elencos', 'f365-elencos', 'wiki-jogos'],
  },
  {
    numero: 124, tipo: 'jogador', selecao: 'holanda', nome: 'Memphis Depay', camisa: 10, posicao: 'Atacante', clube: 'Corinthians', raridade: 'lendaria',
    curiosidade: 'Vestiu a camisa 10 da Holanda. É quem mais jogou pela seleção no elenco: 109 partidas.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 125, tipo: 'jogador', selecao: 'holanda', nome: 'Cody Gakpo', camisa: 11, posicao: 'Atacante', clube: 'Liverpool', raridade: 'comum',
    curiosidade: 'Fez 3 gols na Copa de 2026. Chegou à Copa com 50 jogos e 21 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos', 'wiki-jogos'],
  },
  {
    numero: 126, tipo: 'jogador', selecao: 'holanda', nome: 'Frenkie de Jong', camisa: 21, posicao: 'Meio-campista', clube: 'Barcelona', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 66 jogos e 2 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },

  // ----- Japão -----
  { numero: 127, tipo: 'bandeira', selecao: 'japao', nome: 'Japão', raridade: 'brilhante', fonte: ['wiki-grupo-f'] },
  {
    numero: 128, tipo: 'jogador', selecao: 'japao', nome: 'Zion Suzuki', camisa: 1, posicao: 'Goleiro', clube: 'Parma', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 24 jogos pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 129, tipo: 'jogador', selecao: 'japao', nome: 'Kō Itakura', camisa: 4, posicao: 'Defensor', clube: 'Ajax', raridade: 'brilhante',
    curiosidade: 'Capitão do Japão na Copa de 2026. Chegou à Copa com 40 jogos e 2 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 130, tipo: 'jogador', selecao: 'japao', nome: 'Ritsu Dōan', camisa: 10, posicao: 'Meio-campista', clube: 'Eintracht Frankfurt', raridade: 'lendaria',
    curiosidade: 'Vestiu a camisa 10 do Japão. Chegou à Copa com 65 jogos e 11 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 131, tipo: 'jogador', selecao: 'japao', nome: 'Daichi Kamada', camisa: 15, posicao: 'Meio-campista', clube: 'Crystal Palace', raridade: 'comum',
    curiosidade: 'Fez 2 gols na Copa de 2026. Chegou à Copa com 49 jogos e 12 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos', 'wiki-jogos'],
  },
  {
    numero: 132, tipo: 'jogador', selecao: 'japao', nome: 'Ayase Ueda', camisa: 18, posicao: 'Atacante', clube: 'Feyenoord', raridade: 'comum',
    curiosidade: 'Fez 2 gols na Copa de 2026. Maior goleador do elenco, com 16 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos', 'wiki-jogos'],
  },

  // ----- Suécia -----
  { numero: 133, tipo: 'bandeira', selecao: 'suecia', nome: 'Suécia', raridade: 'brilhante', fonte: ['wiki-grupo-f'] },
  {
    numero: 134, tipo: 'jogador', selecao: 'suecia', nome: 'Victor Lindelöf', camisa: 3, posicao: 'Defensor', clube: 'Aston Villa', raridade: 'brilhante',
    curiosidade: 'Capitão da Suécia na Copa de 2026. É quem mais jogou pela seleção no elenco: 76 partidas.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 135, tipo: 'jogador', selecao: 'suecia', nome: 'Alexander Isak', camisa: 9, posicao: 'Atacante', clube: 'Liverpool', raridade: 'comum',
    curiosidade: 'Fez 1 gol na Copa de 2026. Chegou à Copa com 58 jogos e 17 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos', 'wiki-jogos'],
  },
  {
    numero: 136, tipo: 'jogador', selecao: 'suecia', nome: 'Benjamin Nygren', camisa: 10, posicao: 'Meio-campista', clube: 'Celtic', raridade: 'lendaria',
    curiosidade: 'Vestiu a camisa 10 da Suécia. Chegou à Copa com 11 jogos e 3 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 137, tipo: 'jogador', selecao: 'suecia', nome: 'Anthony Elanga', camisa: 11, posicao: 'Atacante', clube: 'Newcastle United', raridade: 'comum',
    curiosidade: 'Fez 2 gols na Copa de 2026. Chegou à Copa com 30 jogos e 6 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos', 'wiki-jogos'],
  },
  {
    numero: 138, tipo: 'jogador', selecao: 'suecia', nome: 'Kristoffer Nordfeldt', camisa: 23, posicao: 'Goleiro', clube: 'AIK', raridade: 'comum',
    curiosidade: 'O mais velho do elenco, com 36 anos.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },

  // ----- Tunísia -----
  { numero: 139, tipo: 'bandeira', selecao: 'tunisia', nome: 'Tunísia', raridade: 'brilhante', fonte: ['wiki-grupo-f'] },
  {
    numero: 140, tipo: 'jogador', selecao: 'tunisia', nome: 'Montassar Talbi', camisa: 3, posicao: 'Defensor', clube: 'Lorient', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 64 jogos e 4 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 141, tipo: 'jogador', selecao: 'tunisia', nome: 'Hazem Mastouri', camisa: 9, posicao: 'Atacante', clube: 'Dynamo Makhachkala', raridade: 'comum',
    curiosidade: 'Fez 1 gol na Copa de 2026. Chegou à Copa com 19 jogos e 4 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos', 'wiki-jogos'],
  },
  {
    numero: 142, tipo: 'jogador', selecao: 'tunisia', nome: 'Hannibal Mejbri', camisa: 10, posicao: 'Meio-campista', clube: 'Burnley', raridade: 'lendaria',
    curiosidade: 'Vestiu a camisa 10 da Tunísia. Chegou à Copa com 45 jogos e 1 gol pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 143, tipo: 'jogador', selecao: 'tunisia', nome: 'Aymen Dahmen', camisa: 16, posicao: 'Goleiro', clube: 'CS Sfaxien', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 37 jogos pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 144, tipo: 'jogador', selecao: 'tunisia', nome: 'Ellyes Skhiri', camisa: 17, posicao: 'Meio-campista', clube: 'Eintracht Frankfurt', raridade: 'brilhante',
    curiosidade: 'Capitão da Tunísia na Copa de 2026. É quem mais jogou pela seleção no elenco: 83 partidas.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },

  // ----- Bélgica -----
  { numero: 145, tipo: 'bandeira', selecao: 'belgica', nome: 'Bélgica', raridade: 'brilhante', fonte: ['wiki-grupo-g'] },
  {
    numero: 146, tipo: 'jogador', selecao: 'belgica', nome: 'Thibaut Courtois', camisa: 1, posicao: 'Goleiro', clube: 'Real Madrid', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 109 jogos pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 147, tipo: 'jogador', selecao: 'belgica', nome: 'Youri Tielemans', camisa: 8, posicao: 'Meio-campista', clube: 'Aston Villa', raridade: 'brilhante',
    curiosidade: 'Capitão da Bélgica na Copa de 2026. Fez 2 gols na Copa de 2026.',
    fonte: ['wiki-elencos', 'f365-elencos', 'wiki-jogos'],
  },
  {
    numero: 148, tipo: 'jogador', selecao: 'belgica', nome: 'Romelu Lukaku', camisa: 9, posicao: 'Atacante', clube: 'Napoli', raridade: 'comum',
    curiosidade: 'Fez 3 gols na Copa de 2026. Maior goleador do elenco, com 90 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos', 'wiki-jogos'],
  },
  {
    numero: 149, tipo: 'jogador', selecao: 'belgica', nome: 'Leandro Trossard', camisa: 10, posicao: 'Atacante', clube: 'Arsenal', raridade: 'lendaria',
    curiosidade: 'Vestiu a camisa 10 da Bélgica. Fez 2 gols na Copa de 2026.',
    fonte: ['wiki-elencos', 'f365-elencos', 'wiki-jogos'],
  },
  {
    numero: 150, tipo: 'jogador', selecao: 'belgica', nome: 'Thomas Meunier', camisa: 15, posicao: 'Defensor', clube: 'Lille', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 80 jogos e 10 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },

  // ----- Egito -----
  { numero: 151, tipo: 'bandeira', selecao: 'egito', nome: 'Egito', raridade: 'brilhante', fonte: ['wiki-grupo-g'] },
  {
    numero: 152, tipo: 'jogador', selecao: 'egito', nome: 'Mohamed El Shenawy', camisa: 1, posicao: 'Goleiro', clube: 'Al Ahly', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 76 jogos pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 153, tipo: 'jogador', selecao: 'egito', nome: 'Ramy Rabia', camisa: 5, posicao: 'Defensor', clube: 'Al Ain', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 44 jogos e 5 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 154, tipo: 'jogador', selecao: 'egito', nome: 'Trézéguet', camisa: 7, posicao: 'Atacante', clube: 'Al Ahly', raridade: 'comum',
    curiosidade: 'Fez 1 gol na Copa de 2026. Chegou à Copa com 96 jogos e 23 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos', 'wiki-jogos'],
  },
  {
    numero: 155, tipo: 'jogador', selecao: 'egito', nome: 'Emam Ashour', camisa: 8, posicao: 'Meio-campista', clube: 'Al Ahly', raridade: 'comum',
    curiosidade: 'Fez 2 gols na Copa de 2026. Chegou à Copa com 29 jogos pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos', 'wiki-jogos'],
  },
  {
    numero: 156, tipo: 'jogador', selecao: 'egito', nome: 'Mohamed Salah', camisa: 10, posicao: 'Atacante', clube: 'Liverpool', raridade: 'lendaria',
    curiosidade: 'Capitão e camisa 10 do Egito. Fez 1 gol na Copa de 2026.',
    fonte: ['wiki-elencos', 'f365-elencos', 'wiki-jogos'],
  },

  // ----- Irã -----
  { numero: 157, tipo: 'bandeira', selecao: 'ira', nome: 'Irã', raridade: 'brilhante', fonte: ['wiki-grupo-g'] },
  {
    numero: 158, tipo: 'jogador', selecao: 'ira', nome: 'Alireza Beiranvand', camisa: 1, posicao: 'Goleiro', clube: 'Tractor', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 86 jogos pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 159, tipo: 'jogador', selecao: 'ira', nome: 'Ehsan Hajsafi', camisa: 3, posicao: 'Defensor', clube: 'Sepahan', raridade: 'brilhante',
    curiosidade: 'Capitão do Irã na Copa de 2026. É quem mais jogou pela seleção no elenco: 146 partidas.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 160, tipo: 'jogador', selecao: 'ira', nome: 'Alireza Jahanbakhsh', camisa: 7, posicao: 'Meio-campista', clube: 'Dender EH', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 99 jogos e 17 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 161, tipo: 'jogador', selecao: 'ira', nome: 'Mehdi Ghayedi', camisa: 10, posicao: 'Atacante', clube: 'Al Nasr', raridade: 'lendaria',
    curiosidade: 'Vestiu a camisa 10 do Irã. Chegou à Copa com 30 jogos e 10 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 162, tipo: 'jogador', selecao: 'ira', nome: 'Ramin Rezaeian', camisa: 23, posicao: 'Defensor', clube: 'Foolad', raridade: 'comum',
    curiosidade: 'Fez 2 gols na Copa de 2026. Chegou à Copa com 74 jogos e 8 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos', 'wiki-jogos'],
  },

  // ----- Nova Zelândia -----
  { numero: 163, tipo: 'bandeira', selecao: 'nova-zelandia', nome: 'Nova Zelândia', raridade: 'brilhante', fonte: ['wiki-grupo-g'] },
  {
    numero: 164, tipo: 'jogador', selecao: 'nova-zelandia', nome: 'Max Crocombe', camisa: 1, posicao: 'Goleiro', clube: 'Millwall', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 24 jogos pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 165, tipo: 'jogador', selecao: 'nova-zelandia', nome: 'Michael Boxall', camisa: 5, posicao: 'Defensor', clube: 'Minnesota United FC', raridade: 'comum',
    curiosidade: 'O mais velho do elenco, com 37 anos.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 166, tipo: 'jogador', selecao: 'nova-zelandia', nome: 'Chris Wood', camisa: 9, posicao: 'Atacante', clube: 'Nottingham Forest', raridade: 'brilhante',
    curiosidade: 'Capitão da Nova Zelândia na Copa de 2026. É quem mais jogou pela seleção no elenco: 90 partidas.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 167, tipo: 'jogador', selecao: 'nova-zelandia', nome: 'Sarpreet Singh', camisa: 10, posicao: 'Meio-campista', clube: 'Wellington Phoenix', raridade: 'lendaria',
    curiosidade: 'Vestiu a camisa 10 da Nova Zelândia. Chegou à Copa com 28 jogos e 3 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 168, tipo: 'jogador', selecao: 'nova-zelandia', nome: 'Elijah Just', camisa: 11, posicao: 'Meio-campista', clube: 'Motherwell', raridade: 'comum',
    curiosidade: 'Fez 3 gols na Copa de 2026. Chegou à Copa com 44 jogos e 9 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos', 'wiki-jogos'],
  },

  // ----- Espanha -----
  { numero: 169, tipo: 'bandeira', selecao: 'espanha', nome: 'Espanha', raridade: 'brilhante', fonte: ['wiki-grupo-h'] },
  {
    numero: 170, tipo: 'jogador', selecao: 'espanha', nome: 'Dani Olmo', camisa: 10, posicao: 'Atacante', clube: 'Barcelona', raridade: 'lendaria',
    curiosidade: 'Vestiu a camisa 10 da Espanha. Chegou à Copa com 50 jogos e 12 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 171, tipo: 'jogador', selecao: 'espanha', nome: 'Aymeric Laporte', camisa: 14, posicao: 'Defensor', clube: 'Athletic Bilbao', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 46 jogos e 2 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 172, tipo: 'jogador', selecao: 'espanha', nome: 'Rodri', camisa: 16, posicao: 'Meio-campista', clube: 'Manchester City', raridade: 'brilhante',
    curiosidade: 'Capitão da Espanha na Copa de 2026. É quem mais jogou pela seleção no elenco: 62 partidas.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 173, tipo: 'jogador', selecao: 'espanha', nome: 'Mikel Oyarzabal', camisa: 21, posicao: 'Atacante', clube: 'Real Sociedad', raridade: 'comum',
    curiosidade: 'Fez 5 gols na Copa de 2026. Maior goleador do elenco, com 25 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos', 'wiki-jogos'],
  },
  {
    numero: 174, tipo: 'jogador', selecao: 'espanha', nome: 'Unai Simón', camisa: 23, posicao: 'Goleiro', clube: 'Athletic Bilbao', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 58 jogos pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },

  // ----- Cabo Verde -----
  { numero: 175, tipo: 'bandeira', selecao: 'cabo-verde', nome: 'Cabo Verde', raridade: 'brilhante', fonte: ['wiki-grupo-h'] },
  {
    numero: 176, tipo: 'jogador', selecao: 'cabo-verde', nome: 'Vozinha', camisa: 1, posicao: 'Goleiro', clube: 'Chaves', raridade: 'comum',
    curiosidade: 'O mais velho do elenco, com 40 anos.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 177, tipo: 'jogador', selecao: 'cabo-verde', nome: 'Stopira', camisa: 2, posicao: 'Defensor', clube: 'Torreense', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 61 jogos e 4 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 178, tipo: 'jogador', selecao: 'cabo-verde', nome: 'Jamiro Monteiro', camisa: 10, posicao: 'Meio-campista', clube: 'PEC Zwolle', raridade: 'lendaria',
    curiosidade: 'Vestiu a camisa 10 de Cabo Verde. Chegou à Copa com 55 jogos e 5 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 179, tipo: 'jogador', selecao: 'cabo-verde', nome: 'Deroy Duarte', camisa: 14, posicao: 'Meio-campista', clube: 'Ludogorets Razgrad', raridade: 'comum',
    curiosidade: 'Fez 1 gol na Copa de 2026. Chegou à Copa com 33 jogos pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos', 'wiki-jogos'],
  },
  {
    numero: 180, tipo: 'jogador', selecao: 'cabo-verde', nome: 'Ryan Mendes', camisa: 20, posicao: 'Atacante', clube: 'Iğdır', raridade: 'brilhante',
    curiosidade: 'Capitão de Cabo Verde na Copa de 2026. É quem mais jogou pela seleção no elenco: 96 partidas.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },

  // ----- Arábia Saudita -----
  { numero: 181, tipo: 'bandeira', selecao: 'arabia-saudita', nome: 'Arábia Saudita', raridade: 'brilhante', fonte: ['wiki-grupo-h'] },
  {
    numero: 182, tipo: 'jogador', selecao: 'arabia-saudita', nome: 'Abdulelah Al-Amri', camisa: 4, posicao: 'Defensor', clube: 'Al-Nassr', raridade: 'comum',
    curiosidade: 'Fez 1 gol na Copa de 2026. Chegou à Copa com 44 jogos e 1 gol pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos', 'wiki-jogos'],
  },
  {
    numero: 183, tipo: 'jogador', selecao: 'arabia-saudita', nome: 'Firas Al-Buraikan', camisa: 9, posicao: 'Atacante', clube: 'Al-Ahli', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 72 jogos e 16 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 184, tipo: 'jogador', selecao: 'arabia-saudita', nome: 'Salem Al-Dawsari', camisa: 10, posicao: 'Atacante', clube: 'Al-Hilal', raridade: 'lendaria',
    curiosidade: 'Capitão e camisa 10 da Arábia Saudita. É quem mais jogou pela seleção no elenco: 111 partidas.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 185, tipo: 'jogador', selecao: 'arabia-saudita', nome: 'Mohammed Al-Owais', camisa: 21, posicao: 'Goleiro', clube: 'Al-Ula', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 65 jogos pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 186, tipo: 'jogador', selecao: 'arabia-saudita', nome: 'Mohamed Kanno', camisa: 23, posicao: 'Meio-campista', clube: 'Al-Hilal', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 79 jogos e 8 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },

  // ----- Uruguai -----
  { numero: 187, tipo: 'bandeira', selecao: 'uruguai', nome: 'Uruguai', raridade: 'brilhante', fonte: ['wiki-grupo-h'] },
  {
    numero: 188, tipo: 'jogador', selecao: 'uruguai', nome: 'José María Giménez', camisa: 2, posicao: 'Defensor', clube: 'Atlético Madrid', raridade: 'brilhante',
    curiosidade: 'Capitão do Uruguai na Copa de 2026. Chegou à Copa com 99 jogos e 8 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 189, tipo: 'jogador', selecao: 'uruguai', nome: 'Giorgian de Arrascaeta', camisa: 10, posicao: 'Meio-campista', clube: 'Flamengo', raridade: 'lendaria',
    curiosidade: 'Vestiu a camisa 10 do Uruguai. Maior goleador do elenco, com 13 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 190, tipo: 'jogador', selecao: 'uruguai', nome: 'Facundo Pellistri', camisa: 11, posicao: 'Atacante', clube: 'Panathinaikos', raridade: 'comum',
    curiosidade: 'O mais novo do elenco, com 24 anos.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 191, tipo: 'jogador', selecao: 'uruguai', nome: 'Maximiliano Araújo', camisa: 20, posicao: 'Meio-campista', clube: 'Sporting CP', raridade: 'comum',
    curiosidade: 'Fez 2 gols na Copa de 2026. Chegou à Copa com 28 jogos e 3 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos', 'wiki-jogos'],
  },
  {
    numero: 192, tipo: 'jogador', selecao: 'uruguai', nome: 'Fernando Muslera', camisa: 23, posicao: 'Goleiro', clube: 'Estudiantes', raridade: 'comum',
    curiosidade: 'É quem mais jogou pela seleção no elenco: 134 partidas.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },

  // ----- França -----
  { numero: 193, tipo: 'bandeira', selecao: 'franca', nome: 'França', raridade: 'brilhante', fonte: ['wiki-grupo-i'] },
  {
    numero: 194, tipo: 'jogador', selecao: 'franca', nome: 'Lucas Digne', camisa: 3, posicao: 'Defensor', clube: 'Aston Villa', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 58 jogos pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 195, tipo: 'jogador', selecao: 'franca', nome: 'Ousmane Dembélé', camisa: 7, posicao: 'Atacante', clube: 'Paris Saint-Germain', raridade: 'comum',
    curiosidade: 'Fez 6 gols na Copa de 2026. Chegou à Copa com 59 jogos e 7 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos', 'wiki-jogos'],
  },
  {
    numero: 196, tipo: 'jogador', selecao: 'franca', nome: 'Kylian Mbappé', camisa: 10, posicao: 'Atacante', clube: 'Real Madrid', raridade: 'lendaria',
    curiosidade: 'Capitão e camisa 10 da França. Fez 10 gols na Copa de 2026.',
    fonte: ['wiki-elencos', 'f365-elencos', 'wiki-jogos'],
  },
  {
    numero: 197, tipo: 'jogador', selecao: 'franca', nome: 'N\'Golo Kanté', camisa: 13, posicao: 'Meio-campista', clube: 'Fenerbahçe', raridade: 'comum',
    curiosidade: 'O mais velho do elenco, com 35 anos.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 198, tipo: 'jogador', selecao: 'franca', nome: 'Mike Maignan', camisa: 16, posicao: 'Goleiro', clube: 'AC Milan', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 40 jogos pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },

  // ----- Senegal -----
  { numero: 199, tipo: 'bandeira', selecao: 'senegal', nome: 'Senegal', raridade: 'brilhante', fonte: ['wiki-grupo-i'] },
  {
    numero: 200, tipo: 'jogador', selecao: 'senegal', nome: 'Kalidou Koulibaly', camisa: 3, posicao: 'Defensor', clube: 'Al-Hilal', raridade: 'brilhante',
    curiosidade: 'Capitão do Senegal na Copa de 2026. Chegou à Copa com 104 jogos e 2 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 201, tipo: 'jogador', selecao: 'senegal', nome: 'Idrissa Gueye', camisa: 5, posicao: 'Meio-campista', clube: 'Everton', raridade: 'comum',
    curiosidade: 'É quem mais jogou pela seleção no elenco: 132 partidas.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 202, tipo: 'jogador', selecao: 'senegal', nome: 'Sadio Mané', camisa: 10, posicao: 'Atacante', clube: 'Al-Nassr', raridade: 'lendaria',
    curiosidade: 'Vestiu a camisa 10 do Senegal. Maior goleador do elenco, com 55 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 203, tipo: 'jogador', selecao: 'senegal', nome: 'Édouard Mendy', camisa: 16, posicao: 'Goleiro', clube: 'Al-Ahli', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 58 jogos pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 204, tipo: 'jogador', selecao: 'senegal', nome: 'Ismaïla Sarr', camisa: 18, posicao: 'Atacante', clube: 'Crystal Palace', raridade: 'comum',
    curiosidade: 'Fez 4 gols na Copa de 2026. Chegou à Copa com 84 jogos e 19 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos', 'wiki-jogos'],
  },

  // ----- Iraque -----
  { numero: 205, tipo: 'bandeira', selecao: 'iraque', nome: 'Iraque', raridade: 'brilhante', fonte: ['wiki-grupo-i'] },
  {
    numero: 206, tipo: 'jogador', selecao: 'iraque', nome: 'Rebin Sulaka', camisa: 2, posicao: 'Defensor', clube: 'Port', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 56 jogos e 1 gol pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 207, tipo: 'jogador', selecao: 'iraque', nome: 'Ibrahim Bayesh', camisa: 8, posicao: 'Meio-campista', clube: 'Al Dhafra', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 76 jogos e 8 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 208, tipo: 'jogador', selecao: 'iraque', nome: 'Mohanad Ali', camisa: 10, posicao: 'Atacante', clube: 'Dibba', raridade: 'lendaria',
    curiosidade: 'Vestiu a camisa 10 do Iraque. Chegou à Copa com 72 jogos e 27 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 209, tipo: 'jogador', selecao: 'iraque', nome: 'Jalal Hassan', camisa: 12, posicao: 'Goleiro', clube: 'Al-Zawraa', raridade: 'brilhante',
    curiosidade: 'Capitão do Iraque na Copa de 2026. É quem mais jogou pela seleção no elenco: 102 partidas.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 210, tipo: 'jogador', selecao: 'iraque', nome: 'Aymen Hussein', camisa: 18, posicao: 'Atacante', clube: 'Al-Karma', raridade: 'comum',
    curiosidade: 'Fez 1 gol na Copa de 2026. Maior goleador do elenco, com 33 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos', 'wiki-jogos'],
  },

  // ----- Noruega -----
  { numero: 211, tipo: 'bandeira', selecao: 'noruega', nome: 'Noruega', raridade: 'brilhante', fonte: ['wiki-grupo-i'] },
  {
    numero: 212, tipo: 'jogador', selecao: 'noruega', nome: 'Ørjan Nyland', camisa: 1, posicao: 'Goleiro', clube: 'Sevilla', raridade: 'comum',
    curiosidade: 'O mais velho do elenco, com 35 anos.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 213, tipo: 'jogador', selecao: 'noruega', nome: 'Kristoffer Ajer', camisa: 3, posicao: 'Defensor', clube: 'Brentford', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 52 jogos e 2 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 214, tipo: 'jogador', selecao: 'noruega', nome: 'Alexander Sørloth', camisa: 7, posicao: 'Atacante', clube: 'Atlético Madrid', raridade: 'comum',
    curiosidade: 'É quem mais jogou pela seleção no elenco: 72 partidas.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 215, tipo: 'jogador', selecao: 'noruega', nome: 'Erling Haaland', camisa: 9, posicao: 'Atacante', clube: 'Manchester City', raridade: 'comum',
    curiosidade: 'Fez 7 gols na Copa de 2026. Maior goleador do elenco, com 55 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos', 'wiki-jogos'],
  },
  {
    numero: 216, tipo: 'jogador', selecao: 'noruega', nome: 'Martin Ødegaard', camisa: 10, posicao: 'Meio-campista', clube: 'Arsenal', raridade: 'lendaria',
    curiosidade: 'Capitão e camisa 10 da Noruega. Chegou à Copa com 68 jogos e 5 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },

  // ----- Argentina -----
  { numero: 217, tipo: 'bandeira', selecao: 'argentina', nome: 'Argentina', raridade: 'brilhante', fonte: ['wiki-grupo-j'] },
  {
    numero: 218, tipo: 'jogador', selecao: 'argentina', nome: 'Leandro Paredes', camisa: 5, posicao: 'Meio-campista', clube: 'Boca Juniors', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 77 jogos e 5 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 219, tipo: 'jogador', selecao: 'argentina', nome: 'Rodrigo De Paul', camisa: 7, posicao: 'Meio-campista', clube: 'Inter Miami CF', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 87 jogos e 2 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 220, tipo: 'jogador', selecao: 'argentina', nome: 'Lionel Messi', camisa: 10, posicao: 'Atacante', clube: 'Inter Miami CF', raridade: 'lendaria',
    curiosidade: 'Capitão e camisa 10 da Argentina. Fez 8 gols na Copa de 2026.',
    fonte: ['wiki-elencos', 'f365-elencos', 'wiki-jogos'],
  },
  {
    numero: 221, tipo: 'jogador', selecao: 'argentina', nome: 'Nicolás Otamendi', camisa: 19, posicao: 'Defensor', clube: 'Benfica', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 132 jogos e 8 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 222, tipo: 'jogador', selecao: 'argentina', nome: 'Emiliano Martínez', camisa: 23, posicao: 'Goleiro', clube: 'Aston Villa', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 59 jogos pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },

  // ----- Argélia -----
  { numero: 223, tipo: 'bandeira', selecao: 'argelia', nome: 'Argélia', raridade: 'brilhante', fonte: ['wiki-grupo-j'] },
  {
    numero: 224, tipo: 'jogador', selecao: 'argelia', nome: 'Aïssa Mandi', camisa: 2, posicao: 'Defensor', clube: 'Lille', raridade: 'comum',
    curiosidade: 'É quem mais jogou pela seleção no elenco: 119 partidas.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 225, tipo: 'jogador', selecao: 'argelia', nome: 'Riyad Mahrez', camisa: 7, posicao: 'Atacante', clube: 'Al-Ahli', raridade: 'brilhante',
    curiosidade: 'Capitão da Argélia na Copa de 2026. Fez 2 gols na Copa de 2026.',
    fonte: ['wiki-elencos', 'f365-elencos', 'wiki-jogos'],
  },
  {
    numero: 226, tipo: 'jogador', selecao: 'argelia', nome: 'Farès Chaïbi', camisa: 10, posicao: 'Meio-campista', clube: 'Eintracht Frankfurt', raridade: 'lendaria',
    curiosidade: 'Vestiu a camisa 10 da Argélia. Chegou à Copa com 31 jogos e 3 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 227, tipo: 'jogador', selecao: 'argelia', nome: 'Ramy Bensebaini', camisa: 21, posicao: 'Defensor', clube: 'Borussia Dortmund', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 82 jogos e 9 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 228, tipo: 'jogador', selecao: 'argelia', nome: 'Luca Zidane', camisa: 23, posicao: 'Goleiro', clube: 'Granada', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 7 jogos pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },

  // ----- Áustria -----
  { numero: 229, tipo: 'bandeira', selecao: 'austria', nome: 'Áustria', raridade: 'brilhante', fonte: ['wiki-grupo-j'] },
  {
    numero: 230, tipo: 'jogador', selecao: 'austria', nome: 'Alexander Schlager', camisa: 1, posicao: 'Goleiro', clube: 'Red Bull Salzburg', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 26 jogos pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 231, tipo: 'jogador', selecao: 'austria', nome: 'Marko Arnautović', camisa: 7, posicao: 'Atacante', clube: 'Red Star Belgrade', raridade: 'comum',
    curiosidade: 'Fez 2 gols na Copa de 2026. É quem mais jogou pela seleção no elenco: 133 partidas.',
    fonte: ['wiki-elencos', 'f365-elencos', 'wiki-jogos'],
  },
  {
    numero: 232, tipo: 'jogador', selecao: 'austria', nome: 'David Alaba', camisa: 8, posicao: 'Defensor', clube: 'Real Madrid', raridade: 'brilhante',
    curiosidade: 'Capitão da Áustria na Copa de 2026. Chegou à Copa com 113 jogos e 15 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 233, tipo: 'jogador', selecao: 'austria', nome: 'Marcel Sabitzer', camisa: 9, posicao: 'Meio-campista', clube: 'Borussia Dortmund', raridade: 'comum',
    curiosidade: 'Fez 1 gol na Copa de 2026. Chegou à Copa com 98 jogos e 26 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos', 'wiki-jogos'],
  },
  {
    numero: 234, tipo: 'jogador', selecao: 'austria', nome: 'Florian Grillitsch', camisa: 10, posicao: 'Meio-campista', clube: 'Braga', raridade: 'lendaria',
    curiosidade: 'Vestiu a camisa 10 da Áustria. Chegou à Copa com 58 jogos e 1 gol pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },

  // ----- Jordânia -----
  { numero: 235, tipo: 'bandeira', selecao: 'jordania', nome: 'Jordânia', raridade: 'brilhante', fonte: ['wiki-grupo-j'] },
  {
    numero: 236, tipo: 'jogador', selecao: 'jordania', nome: 'Yazeed Abulaila', camisa: 1, posicao: 'Goleiro', clube: 'Al-Hussein', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 76 jogos pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 237, tipo: 'jogador', selecao: 'jordania', nome: 'Musa Al-Taamari', camisa: 10, posicao: 'Atacante', clube: 'Rennes', raridade: 'lendaria',
    curiosidade: 'Vestiu a camisa 10 da Jordânia. Fez 1 gol na Copa de 2026.',
    fonte: ['wiki-elencos', 'f365-elencos', 'wiki-jogos'],
  },
  {
    numero: 238, tipo: 'jogador', selecao: 'jordania', nome: 'Mahmoud Al-Mardi', camisa: 13, posicao: 'Atacante', clube: 'Al-Hussein', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 89 jogos e 9 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 239, tipo: 'jogador', selecao: 'jordania', nome: 'Rajaei Ayed', camisa: 14, posicao: 'Meio-campista', clube: 'Al-Hussein', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 72 jogos pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 240, tipo: 'jogador', selecao: 'jordania', nome: 'Ihsan Haddad', camisa: 23, posicao: 'Defensor', clube: 'Al-Hussein', raridade: 'brilhante',
    curiosidade: 'Capitão da Jordânia na Copa de 2026. É quem mais jogou pela seleção no elenco: 92 partidas.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },

  // ----- Portugal -----
  { numero: 241, tipo: 'bandeira', selecao: 'portugal', nome: 'Portugal', raridade: 'brilhante', fonte: ['wiki-grupo-k'] },
  {
    numero: 242, tipo: 'jogador', selecao: 'portugal', nome: 'Diogo Costa', camisa: 1, posicao: 'Goleiro', clube: 'Porto', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 43 jogos pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 243, tipo: 'jogador', selecao: 'portugal', nome: 'Rúben Dias', camisa: 3, posicao: 'Defensor', clube: 'Manchester City', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 76 jogos e 3 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 244, tipo: 'jogador', selecao: 'portugal', nome: 'Cristiano Ronaldo', camisa: 7, posicao: 'Atacante', clube: 'Al-Nassr', raridade: 'brilhante',
    curiosidade: 'Capitão de Portugal na Copa de 2026. Fez 3 gols na Copa de 2026.',
    fonte: ['wiki-elencos', 'f365-elencos', 'wiki-jogos'],
  },
  {
    numero: 245, tipo: 'jogador', selecao: 'portugal', nome: 'Bruno Fernandes', camisa: 8, posicao: 'Meio-campista', clube: 'Manchester United', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 89 jogos e 29 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 246, tipo: 'jogador', selecao: 'portugal', nome: 'Bernardo Silva', camisa: 10, posicao: 'Meio-campista', clube: 'Manchester City', raridade: 'lendaria',
    curiosidade: 'Vestiu a camisa 10 de Portugal. Chegou à Copa com 109 jogos e 14 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },

  // ----- RD Congo -----
  { numero: 247, tipo: 'bandeira', selecao: 'rd-congo', nome: 'RD Congo', raridade: 'brilhante', fonte: ['wiki-grupo-k'] },
  {
    numero: 248, tipo: 'jogador', selecao: 'rd-congo', nome: 'Lionel Mpasi', camisa: 1, posicao: 'Goleiro', clube: 'Le Havre', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 29 jogos pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 249, tipo: 'jogador', selecao: 'rd-congo', nome: 'Théo Bongonda', camisa: 10, posicao: 'Meio-campista', clube: 'Spartak Moscow', raridade: 'lendaria',
    curiosidade: 'Vestiu a camisa 10 da RD Congo. Chegou à Copa com 38 jogos e 7 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 250, tipo: 'jogador', selecao: 'rd-congo', nome: 'Cédric Bakambu', camisa: 17, posicao: 'Atacante', clube: 'Real Betis', raridade: 'comum',
    curiosidade: 'Maior goleador do elenco, com 21 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 251, tipo: 'jogador', selecao: 'rd-congo', nome: 'Yoane Wissa', camisa: 20, posicao: 'Atacante', clube: 'Newcastle United', raridade: 'comum',
    curiosidade: 'Fez 3 gols na Copa de 2026. Chegou à Copa com 38 jogos e 9 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos', 'wiki-jogos'],
  },
  {
    numero: 252, tipo: 'jogador', selecao: 'rd-congo', nome: 'Chancel Mbemba', camisa: 22, posicao: 'Defensor', clube: 'Lille', raridade: 'brilhante',
    curiosidade: 'Capitão da RD Congo na Copa de 2026. É quem mais jogou pela seleção no elenco: 109 partidas.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },

  // ----- Uzbequistão -----
  { numero: 253, tipo: 'bandeira', selecao: 'uzbequistao', nome: 'Uzbequistão', raridade: 'brilhante', fonte: ['wiki-grupo-k'] },
  {
    numero: 254, tipo: 'jogador', selecao: 'uzbequistao', nome: 'Utkir Yusupov', camisa: 1, posicao: 'Goleiro', clube: 'Navbahor Namangan', raridade: 'comum',
    curiosidade: 'O mais velho do elenco, com 35 anos.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 255, tipo: 'jogador', selecao: 'uzbequistao', nome: 'Rustam Ashurmatov', camisa: 5, posicao: 'Defensor', clube: 'Esteghlal', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 49 jogos e 1 gol pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 256, tipo: 'jogador', selecao: 'uzbequistao', nome: 'Otabek Shukurov', camisa: 7, posicao: 'Meio-campista', clube: 'Baniyas', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 84 jogos e 9 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 257, tipo: 'jogador', selecao: 'uzbequistao', nome: 'Ruslanbek Jiyanov', camisa: 10, posicao: 'Meio-campista', clube: 'Navbahor Namangan', raridade: 'lendaria',
    curiosidade: 'Entrou no elenco em 15 de junho, no lugar de Jaloliddin Masharipov, machucado, e ficou com a camisa 10.',
    fonte: ['wiki-elencos'],
  },
  {
    numero: 258, tipo: 'jogador', selecao: 'uzbequistao', nome: 'Eldor Shomurodov', camisa: 14, posicao: 'Atacante', clube: 'İstanbul Başakşehir', raridade: 'brilhante',
    curiosidade: 'Capitão do Uzbequistão na Copa de 2026. Fez 1 gol na Copa de 2026.',
    fonte: ['wiki-elencos', 'f365-elencos', 'wiki-jogos'],
  },

  // ----- Colômbia -----
  { numero: 259, tipo: 'bandeira', selecao: 'colombia', nome: 'Colômbia', raridade: 'brilhante', fonte: ['wiki-grupo-k'] },
  {
    numero: 260, tipo: 'jogador', selecao: 'colombia', nome: 'David Ospina', camisa: 1, posicao: 'Goleiro', clube: 'Atlético Nacional', raridade: 'comum',
    curiosidade: 'É quem mais jogou pela seleção no elenco: 130 partidas.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 261, tipo: 'jogador', selecao: 'colombia', nome: 'Daniel Muñoz', camisa: 2, posicao: 'Defensor', clube: 'Crystal Palace', raridade: 'comum',
    curiosidade: 'Fez 2 gols na Copa de 2026. Chegou à Copa com 46 jogos e 3 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos', 'wiki-jogos'],
  },
  {
    numero: 262, tipo: 'jogador', selecao: 'colombia', nome: 'Luis Díaz', camisa: 7, posicao: 'Atacante', clube: 'Bayern Munich', raridade: 'comum',
    curiosidade: 'Fez 1 gol na Copa de 2026. Chegou à Copa com 74 jogos e 22 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos', 'wiki-jogos'],
  },
  {
    numero: 263, tipo: 'jogador', selecao: 'colombia', nome: 'James Rodríguez', camisa: 10, posicao: 'Meio-campista', clube: 'Minnesota United FC', raridade: 'lendaria',
    curiosidade: 'Capitão e camisa 10 da Colômbia. Maior goleador do elenco, com 31 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 264, tipo: 'jogador', selecao: 'colombia', nome: 'Davinson Sánchez', camisa: 23, posicao: 'Defensor', clube: 'Galatasaray', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 79 jogos e 4 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },

  // ----- Inglaterra -----
  { numero: 265, tipo: 'bandeira', selecao: 'inglaterra', nome: 'Inglaterra', raridade: 'brilhante', fonte: ['wiki-grupo-l'] },
  {
    numero: 266, tipo: 'jogador', selecao: 'inglaterra', nome: 'Jordan Pickford', camisa: 1, posicao: 'Goleiro', clube: 'Everton', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 84 jogos pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 267, tipo: 'jogador', selecao: 'inglaterra', nome: 'John Stones', camisa: 5, posicao: 'Defensor', clube: 'Manchester City', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 89 jogos e 3 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 268, tipo: 'jogador', selecao: 'inglaterra', nome: 'Harry Kane', camisa: 9, posicao: 'Atacante', clube: 'Bayern Munich', raridade: 'brilhante',
    curiosidade: 'Capitão da Inglaterra na Copa de 2026. Fez 6 gols na Copa de 2026.',
    fonte: ['wiki-elencos', 'f365-elencos', 'wiki-jogos'],
  },
  {
    numero: 269, tipo: 'jogador', selecao: 'inglaterra', nome: 'Jude Bellingham', camisa: 10, posicao: 'Meio-campista', clube: 'Real Madrid', raridade: 'lendaria',
    curiosidade: 'Vestiu a camisa 10 da Inglaterra. Fez 7 gols na Copa de 2026.',
    fonte: ['wiki-elencos', 'f365-elencos', 'wiki-jogos'],
  },
  {
    numero: 270, tipo: 'jogador', selecao: 'inglaterra', nome: 'Jordan Henderson', camisa: 14, posicao: 'Meio-campista', clube: 'Brentford', raridade: 'comum',
    curiosidade: 'O mais velho do elenco, com 35 anos.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },

  // ----- Croácia -----
  { numero: 271, tipo: 'bandeira', selecao: 'croacia', nome: 'Croácia', raridade: 'brilhante', fonte: ['wiki-grupo-l'] },
  {
    numero: 272, tipo: 'jogador', selecao: 'croacia', nome: 'Dominik Livaković', camisa: 1, posicao: 'Goleiro', clube: 'Dinamo Zagreb', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 75 jogos pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 273, tipo: 'jogador', selecao: 'croacia', nome: 'Joško Gvardiol', camisa: 4, posicao: 'Defensor', clube: 'Manchester City', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 48 jogos e 4 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 274, tipo: 'jogador', selecao: 'croacia', nome: 'Andrej Kramarić', camisa: 9, posicao: 'Atacante', clube: 'TSG Hoffenheim', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 116 jogos e 36 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 275, tipo: 'jogador', selecao: 'croacia', nome: 'Luka Modrić', camisa: 10, posicao: 'Meio-campista', clube: 'AC Milan', raridade: 'lendaria',
    curiosidade: 'Capitão e camisa 10 da Croácia. É quem mais jogou pela seleção no elenco: 198 partidas.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 276, tipo: 'jogador', selecao: 'croacia', nome: 'Ivan Perišić', camisa: 14, posicao: 'Atacante', clube: 'PSV Eindhoven', raridade: 'comum',
    curiosidade: 'Fez 1 gol na Copa de 2026. Maior goleador do elenco, com 38 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos', 'wiki-jogos'],
  },

  // ----- Gana -----
  { numero: 277, tipo: 'bandeira', selecao: 'gana', nome: 'Gana', raridade: 'brilhante', fonte: ['wiki-grupo-l'] },
  {
    numero: 278, tipo: 'jogador', selecao: 'gana', nome: 'Lawrence Ati-Zigi', camisa: 1, posicao: 'Goleiro', clube: 'St. Gallen', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 29 jogos pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 279, tipo: 'jogador', selecao: 'gana', nome: 'Caleb Yirenkyi', camisa: 3, posicao: 'Meio-campista', clube: 'Nordsjælland', raridade: 'comum',
    curiosidade: 'Fez 1 gol na Copa de 2026. O mais novo do elenco, com 20 anos.',
    fonte: ['wiki-elencos', 'f365-elencos', 'wiki-jogos'],
  },
  {
    numero: 280, tipo: 'jogador', selecao: 'gana', nome: 'Jordan Ayew', camisa: 9, posicao: 'Atacante', clube: 'Leicester City', raridade: 'brilhante',
    curiosidade: 'Capitão de Gana na Copa de 2026. É quem mais jogou pela seleção no elenco: 120 partidas.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 281, tipo: 'jogador', selecao: 'gana', nome: 'Brandon Thomas-Asante', camisa: 10, posicao: 'Atacante', clube: 'Coventry City', raridade: 'lendaria',
    curiosidade: 'Vestiu a camisa 10 de Gana. Chegou à Copa com 8 jogos e 1 gol pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 282, tipo: 'jogador', selecao: 'gana', nome: 'Abdul Rahman Baba', camisa: 17, posicao: 'Defensor', clube: 'PAOK', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 51 jogos e 1 gol pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },

  // ----- Panamá -----
  { numero: 283, tipo: 'bandeira', selecao: 'panama', nome: 'Panamá', raridade: 'brilhante', fonte: ['wiki-grupo-l'] },
  {
    numero: 284, tipo: 'jogador', selecao: 'panama', nome: 'Luis Mejía', camisa: 1, posicao: 'Goleiro', clube: 'Nacional', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 56 jogos pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 285, tipo: 'jogador', selecao: 'panama', nome: 'Ismael Díaz', camisa: 10, posicao: 'Meio-campista', clube: 'León', raridade: 'lendaria',
    curiosidade: 'Vestiu a camisa 10 do Panamá. Maior goleador do elenco, com 17 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 286, tipo: 'jogador', selecao: 'panama', nome: 'Eric Davis', camisa: 15, posicao: 'Defensor', clube: 'Plaza Amador', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 107 jogos e 9 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 287, tipo: 'jogador', selecao: 'panama', nome: 'José Fajardo', camisa: 17, posicao: 'Atacante', clube: 'Universidad Católica', raridade: 'comum',
    curiosidade: 'Maior goleador do elenco, com 17 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 288, tipo: 'jogador', selecao: 'panama', nome: 'Aníbal Godoy', camisa: 20, posicao: 'Meio-campista', clube: 'San Diego FC', raridade: 'brilhante',
    curiosidade: 'Capitão do Panamá na Copa de 2026. É quem mais jogou pela seleção no elenco: 159 partidas.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
];

// ---------------------------------------------------------------------------
// SEDES: as 16 cidades e os estádios da Copa
// ---------------------------------------------------------------------------
// Ordem: do maior estádio para o menor, como na tabela da fonte.
//   cidade      = nome usado pela organização (região metropolitana)
//   municipio   = onde o estádio fica de fato, quando não é na própria cidade
//   nomeNaCopa  = nome usado durante o torneio (a FIFA não usa nomes de patrocinador)
//   jogos       = quantas partidas da Copa de 2026 o estádio recebeu
//   capacidade  = lugares, segundo a tabela da fonte
//   nota        = um fato a mais, tirado da mesma tabela
//
// Fotos: Wikimedia Commons, todas com licença livre. O arquivo de cada foto é
// assets/img/sedes/ + id + .jpg (versão de 960 px de largura, sem outra
// alteração). "origem" é a página da foto original, com autor e licença.

const SEDES = [
  {
    id: 'cidade-do-mexico', cidade: 'Cidade do México', municipio: '', pais: 'México', bandeira: 'mx',
    estadio: 'Estadio Azteca', nomeNaCopa: 'Mexico City Stadium', jogos: 5, capacidade: 80824,
    nota: 'O único dos 16 estádios que já tinha recebido Copas do Mundo.',
    foto: {
      alt: 'Vista aérea do Estadio Azteca, com a cidade ao fundo.',
      autor: 'ProtoplasmaKid', licenca: 'CC BY 4.0', licencaUrl: 'https://creativecommons.org/licenses/by/4.0',
      origem: 'https://commons.wikimedia.org/wiki/File:Vista_a%C3%A9rea_del_Estadio_Azteca_-_2026_-_02.jpg',
    },
    fonte: ['wiki-copa'],
  },
  {
    id: 'nova-york-nova-jersey', cidade: 'Nova York/Nova Jersey', municipio: 'East Rutherford', pais: 'Estados Unidos', bandeira: 'us',
    estadio: 'MetLife Stadium', nomeNaCopa: 'New York New Jersey Stadium', jogos: 8, capacidade: 80663,
    nota: 'Palco da final.',
    foto: {
      alt: 'Vista aérea do MetLife Stadium, cercado de estacionamentos.',
      autor: 'Anthony Quintano', licenca: 'CC BY 2.0', licencaUrl: 'https://creativecommons.org/licenses/by/2.0',
      origem: 'https://commons.wikimedia.org/wiki/File:Metlife_stadium_(Aerial_view).jpg',
    },
    fonte: ['wiki-copa'],
  },
  {
    id: 'dallas', cidade: 'Dallas', municipio: 'Arlington', pais: 'Estados Unidos', bandeira: 'us',
    estadio: 'AT&T Stadium', nomeNaCopa: 'Dallas Stadium', jogos: 9, capacidade: 70649,
    nota: 'O estádio que mais recebeu jogos nesta Copa.',
    foto: {
      alt: 'AT&T Stadium visto de fora, atrás de um gramado com árvores.',
      autor: 'Michael Barera', licenca: 'CC BY-SA 4.0', licencaUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      origem: 'https://commons.wikimedia.org/wiki/File:Arlington_June_2020_4_(AT%26T_Stadium).jpg',
    },
    fonte: ['wiki-copa'],
  },
  {
    id: 'los-angeles', cidade: 'Los Angeles', municipio: 'Inglewood', pais: 'Estados Unidos', bandeira: 'us',
    estadio: 'SoFi Stadium', nomeNaCopa: 'Los Angeles Stadium', jogos: 8, capacidade: 70492,
    nota: '',
    foto: {
      alt: 'SoFi Stadium visto de fora, do outro lado de um lago.',
      autor: 'Troutfarm27', licenca: 'CC BY-SA 4.0', licencaUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      origem: 'https://commons.wikimedia.org/wiki/File:SoFi_Stadium_2023.jpg',
    },
    fonte: ['wiki-copa'],
  },
  {
    id: 'kansas-city', cidade: 'Kansas City', municipio: '', pais: 'Estados Unidos', bandeira: 'us',
    estadio: 'Arrowhead Stadium', nomeNaCopa: 'Kansas City Stadium', jogos: 6, capacidade: 69045,
    nota: '',
    foto: {
      alt: 'Vista aérea do Arrowhead Stadium, com as arquibancadas vazias.',
      autor: 'Ichabod', licenca: 'CC BY-SA 3.0', licencaUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      origem: 'https://commons.wikimedia.org/wiki/File:Aerial_view_of_Arrowhead_Stadium_08-31-2013.jpg',
    },
    fonte: ['wiki-copa'],
  },
  {
    id: 'baia-de-sao-francisco', cidade: 'Baía de São Francisco', municipio: 'Santa Clara', pais: 'Estados Unidos', bandeira: 'us',
    estadio: "Levi's Stadium", nomeNaCopa: 'San Francisco Bay Area Stadium', jogos: 6, capacidade: 68827,
    nota: '',
    foto: {
      alt: "Levi's Stadium visto de cima, com um helicóptero em primeiro plano.",
      autor: 'U.S. Customs and Border Protection', licenca: 'Domínio público', licencaUrl: '',
      origem: 'https://commons.wikimedia.org/wiki/File:Levi%27s_Stadium_in_February_2016_prior_to_Super_Bowl_50_(24398261729).jpg',
    },
    fonte: ['wiki-copa'],
  },
  {
    id: 'houston', cidade: 'Houston', municipio: '', pais: 'Estados Unidos', bandeira: 'us',
    estadio: 'NRG Stadium', nomeNaCopa: 'Houston Stadium', jogos: 7, capacidade: 68777,
    nota: '',
    foto: {
      alt: 'NRG Stadium iluminado ao anoitecer.',
      autor: 'Carlos.dkfi', licenca: 'CC0', licencaUrl: 'https://creativecommons.org/publicdomain/zero/1.0/deed.pt-br',
      origem: 'https://commons.wikimedia.org/wiki/File:Nrg_stadium.jpg',
    },
    fonte: ['wiki-copa'],
  },
  {
    id: 'filadelfia', cidade: 'Filadélfia', municipio: '', pais: 'Estados Unidos', bandeira: 'us',
    estadio: 'Lincoln Financial Field', nomeNaCopa: 'Philadelphia Stadium', jogos: 6, capacidade: 68324,
    nota: '',
    foto: {
      alt: 'Vista aérea do Lincoln Financial Field, ao lado de uma linha de trem.',
      autor: 'Dough4872', licenca: 'CC BY-SA 4.0', licencaUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      origem: 'https://commons.wikimedia.org/wiki/File:Lincoln_Financial_Field,_Philadelphia,_Pennsylvania,_United_States.jpg',
    },
    fonte: ['wiki-copa'],
  },
  {
    id: 'atlanta', cidade: 'Atlanta', municipio: '', pais: 'Estados Unidos', bandeira: 'us',
    estadio: 'Mercedes-Benz Stadium', nomeNaCopa: 'Atlanta Stadium', jogos: 8, capacidade: 68239,
    nota: '',
    foto: {
      alt: 'Mercedes-Benz Stadium visto de cima, com a fachada de painéis em ângulo.',
      autor: 'Atlanta Falcons', licenca: 'CC BY 3.0', licencaUrl: 'https://creativecommons.org/licenses/by/3.0',
      origem: 'https://commons.wikimedia.org/wiki/File:Mercedes_Benz_Stadium_time_lapse_capture_2017-08-13.jpg',
    },
    fonte: ['wiki-copa'],
  },
  {
    id: 'seattle', cidade: 'Seattle', municipio: '', pais: 'Estados Unidos', bandeira: 'us',
    estadio: 'Lumen Field', nomeNaCopa: 'Seattle Stadium', jogos: 6, capacidade: 66925,
    nota: '',
    foto: {
      alt: 'Vista aérea do estádio de Seattle em 2002, com os prédios do centro ao fundo.',
      autor: 'Seattle Municipal Archives', licenca: 'CC BY 2.0', licencaUrl: 'https://creativecommons.org/licenses/by/2.0',
      origem: 'https://commons.wikimedia.org/wiki/File:Aerial_of_Qwest_Field_and_downtown_skyline,_2002.jpg',
    },
    fonte: ['wiki-copa'],
  },
  {
    id: 'miami', cidade: 'Miami', municipio: 'Miami Gardens', pais: 'Estados Unidos', bandeira: 'us',
    estadio: 'Hard Rock Stadium', nomeNaCopa: 'Miami Stadium', jogos: 7, capacidade: 64478,
    nota: 'Palco da disputa do terceiro lugar.',
    foto: {
      alt: 'Hard Rock Stadium visto de fora, com os mastros brancos da cobertura.',
      autor: 'elisfkc2', licenca: 'CC BY-SA 2.0', licencaUrl: 'https://creativecommons.org/licenses/by-sa/2.0',
      origem: 'https://commons.wikimedia.org/wiki/File:Hard_Rock_Stadium_for_Super_Bowl_LIV_(49606710103).jpg',
    },
    fonte: ['wiki-copa'],
  },
  {
    id: 'boston', cidade: 'Boston', municipio: 'Foxborough', pais: 'Estados Unidos', bandeira: 'us',
    estadio: 'Gillette Stadium', nomeNaCopa: 'Boston Stadium', jogos: 7, capacidade: 64146,
    nota: '',
    foto: {
      alt: 'Vista aérea do Gillette Stadium.',
      autor: 'Art N.', licenca: 'CC BY 2.0', licencaUrl: 'https://creativecommons.org/licenses/by/2.0',
      origem: 'https://commons.wikimedia.org/wiki/File:Gillette_Stadium_(Top_View).jpg',
    },
    fonte: ['wiki-copa'],
  },
  {
    id: 'vancouver', cidade: 'Vancouver', municipio: '', pais: 'Canadá', bandeira: 'ca',
    estadio: 'BC Place', nomeNaCopa: 'BC Place Vancouver', jogos: 7, capacidade: 52497,
    nota: '',
    foto: {
      alt: 'BC Place visto de fora, com os mastros brancos da cobertura.',
      autor: 'Robert Ashworth', licenca: 'CC BY 2.0', licencaUrl: 'https://creativecommons.org/licenses/by/2.0',
      origem: 'https://commons.wikimedia.org/wiki/File:BC_Place_Stadium_(6179392956).jpg',
    },
    fonte: ['wiki-copa'],
  },
  {
    id: 'monterrey', cidade: 'Monterrey', municipio: 'Guadalupe', pais: 'México', bandeira: 'mx',
    estadio: 'Estadio BBVA', nomeNaCopa: 'Estadio Monterrey', jogos: 4, capacidade: 51243,
    nota: '',
    foto: {
      alt: 'Vista aérea do Estadio BBVA, de cobertura metálica ondulada.',
      autor: 'Arne Müseler', licenca: 'CC BY-SA 3.0 DE', licencaUrl: 'https://creativecommons.org/licenses/by-sa/3.0/de/deed.pt-br',
      origem: 'https://commons.wikimedia.org/wiki/File:Mexico_Guadalupe_Monterrey_Estadio_BBVA_Bancomer_fifa_world_cup_2026_6.JPG',
    },
    fonte: ['wiki-copa'],
  },
  {
    id: 'guadalajara', cidade: 'Guadalajara', municipio: 'Zapopan', pais: 'México', bandeira: 'mx',
    estadio: 'Estadio Akron', nomeNaCopa: 'Estadio Guadalajara', jogos: 4, capacidade: 45664,
    nota: '',
    foto: {
      alt: 'Arquibancadas e gramado do Estadio Akron, vistos de dentro.',
      autor: 'Alejan98', licenca: 'CC0', licencaUrl: 'https://creativecommons.org/publicdomain/zero/1.0/deed.pt-br',
      origem: 'https://commons.wikimedia.org/wiki/File:Estadio_Akron_02-07-2022_cabecera_sur_lado_derecho_(3).jpg',
    },
    fonte: ['wiki-copa'],
  },
  {
    id: 'toronto', cidade: 'Toronto', municipio: '', pais: 'Canadá', bandeira: 'ca',
    estadio: 'BMO Field', nomeNaCopa: 'Toronto Stadium', jogos: 6, capacidade: 43036,
    nota: 'O menor dos 16 estádios.',
    foto: {
      alt: 'Arquibancada coberta do BMO Field, vista de fora.',
      autor: 'Fabian Roudra Baroi', licenca: 'CC BY-SA 4.0', licencaUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      origem: 'https://commons.wikimedia.org/wiki/File:BMO_Field_Closeups_03.jpg',
    },
    fonte: ['wiki-copa'],
  },
];

// ---------------------------------------------------------------------------
// COPA: como terminou
// ---------------------------------------------------------------------------
// Resumo usado na última página do álbum. O placar da final foi conferido em
// três reportagens além da Wikipedia. O total de gols e o artilheiro foram
// somados jogo a jogo pelo script e batem com a tabela de prêmios da fonte.

const COPA = {
  campea: 'espanha',
  vice: 'argentina',
  terceiro: 'inglaterra',
  quarto: 'franca',
  final: {
    placar: 'Espanha 1 a 0 Argentina, na prorrogação',
    gol: 'Ferran Torres',
    data: '19 de julho de 2026',
    estadio: 'MetLife Stadium, em East Rutherford (sede Nova York/Nova Jersey)',
  },
  terceiroLugar: {
    placar: 'Inglaterra 6 a 4 França',
    data: '18 de julho de 2026',
    estadio: 'Hard Rock Stadium, em Miami Gardens (sede Miami)',
  },
  premios: [
    { premio: 'Artilheiro', nome: 'Kylian Mbappé', selecao: 'franca', detalhe: '10 gols' },
    { premio: 'Melhor jogador (Bola de Ouro)', nome: 'Rodri', selecao: 'espanha', detalhe: '' },
    { premio: 'Melhor goleiro (Luva de Ouro)', nome: 'Unai Simón', selecao: 'espanha', detalhe: '' },
    { premio: 'Melhor jogador jovem', nome: 'Pau Cubarsí', selecao: 'espanha', detalhe: '' },
  ],
  numeros: { jogos: 104, gols: 308 },
  fonte: ['wiki-copa', 'wiki-mata-mata', 'wiki-jogos', 'espn-final', 'npr-final', 'cbs-final'],
};
````

## Scripts de apoio (Node.js)

### scripts/contraste.js

````js
// ============================================================================
// contraste.js
// ----------------------------------------------------------------------------
// O que faz: lê as cores de css/tokens.css, calcula o contraste de cada par
// de cores que o site usa de verdade (nos 4 temas) e escreve docs/cores.md.
//
// Como rodar (na pasta do projeto):   node scripts/contraste.js
//
// Por que existe: o contraste precisa ser calculado, não "chutado". Como o
// script lê o próprio tokens.css, a tabela nunca fica diferente do site.
// ============================================================================

const fs = require('fs');
const path = require('path');

const ARQUIVO_TOKENS = path.join(__dirname, '..', 'css', 'tokens.css');
const ARQUIVO_SAIDA = path.join(__dirname, '..', 'docs', 'cores.md');

// ---------------------------------------------------------------------------
// 1. A conta do contraste (fórmula do WCAG 2.x)
// ---------------------------------------------------------------------------

// Cada cor tem 3 canais (vermelho, verde, azul), de 0 a 255.
// Esta função converte um canal para a escala "linear" que a fórmula pede.
function canalLinear(valor) {
  const c = valor / 255;
  return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

// Luminância: o quanto a cor parece clara para o olho (0 = preto, 1 = branco).
// O verde pesa mais porque o olho humano é mais sensível a ele.
function luminancia(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return 0.2126 * canalLinear(r) + 0.7152 * canalLinear(g) + 0.0722 * canalLinear(b);
}

// Contraste: (cor mais clara + 0,05) dividido por (cor mais escura + 0,05).
// Vai de 1 (cores iguais) a 21 (preto no branco).
function contraste(corA, corB) {
  const a = luminancia(corA);
  const b = luminancia(corB);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}

// ---------------------------------------------------------------------------
// 2. Ler as cores do tokens.css
// ---------------------------------------------------------------------------

// Devolve um objeto no formato { 'seletor': { 'nome-da-cor': '#HEX' } }.
function lerBlocos(css) {
  const semComentarios = css.replace(/\/\*[\s\S]*?\*\//g, '');
  const blocos = {};
  const regra = /([^{}]+)\{([^{}]*)\}/g; // casa com "seletor { conteúdo }"
  let achado;
  while ((achado = regra.exec(semComentarios)) !== null) {
    const seletor = achado[1].trim();
    const cores = blocos[seletor] || {};
    const linha = /--cor-([a-z0-9-]+)\s*:\s*(#[0-9a-fA-F]{6})\s*;/g;
    let cor;
    while ((cor = linha.exec(achado[2])) !== null) {
      cores[cor[1]] = cor[2].toUpperCase();
    }
    blocos[seletor] = cores;
  }
  return blocos;
}

const blocos = lerBlocos(fs.readFileSync(ARQUIVO_TOKENS, 'utf8'));

// Cada tema herda do anterior, igual à cascata do CSS:
// o que o tema não redefine continua valendo do tema de baixo.
const claro = blocos[':root'];
const escuro = { ...claro, ...blocos['[data-tema="escuro"]'] };
const altoClaro = { ...claro, ...blocos['[data-contraste="alto"]'] };
const altoEscuro = { ...escuro, ...blocos['[data-contraste="alto"]'], ...blocos['[data-tema="escuro"][data-contraste="alto"]'] };

const TEMAS = [
  { nome: 'Tema claro', cores: claro },
  { nome: 'Tema escuro', cores: escuro },
  { nome: 'Alto contraste, claro', cores: altoClaro },
  { nome: 'Alto contraste, escuro', cores: altoEscuro },
];

// ---------------------------------------------------------------------------
// 3. Os pares de cor que o site usa de verdade
// ---------------------------------------------------------------------------
// tipo 'texto'      = texto de tamanho normal: mínimo 4,5:1 (AA) e 7:1 (AAA)
// tipo 'componente' = texto grande, borda, ícone, anel de foco, barra: mínimo 3:1

const PARES = [
  { frente: 'texto', fundo: 'fundo', tipo: 'texto', uso: 'Texto principal sobre o fundo da página' },
  { frente: 'texto', fundo: 'superficie', tipo: 'texto', uso: 'Texto principal sobre cartão, campo e painel' },
  { frente: 'texto-secundario', fundo: 'fundo', tipo: 'texto', uso: 'Texto de apoio sobre o fundo' },
  { frente: 'texto-secundario', fundo: 'superficie', tipo: 'texto', uso: 'Texto de apoio sobre cartão e campo' },
  { frente: 'texto-secundario', fundo: 'vaga', tipo: 'texto', uso: 'Número e legenda dentro do espaço vazio' },
  { frente: 'texto', fundo: 'vaga', tipo: 'texto', uso: 'Nome impresso dentro do espaço vazio' },
  { frente: 'fundo', fundo: 'texto', tipo: 'texto', uso: 'Texto da aba escolhida e do dia carimbado na cartela' },
  { frente: 'acao', fundo: 'fundo', tipo: 'texto', uso: 'Link sobre o fundo' },
  { frente: 'acao', fundo: 'superficie', tipo: 'texto', uso: 'Link sobre cartão' },
  { frente: 'sobre-acao', fundo: 'acao', tipo: 'texto', uso: 'Texto do botão principal' },
  { frente: 'sobre-acao', fundo: 'acao-forte', tipo: 'texto', uso: 'Texto do botão com o mouse em cima' },
  { frente: 'sucesso', fundo: 'fundo', tipo: 'texto', uso: 'Mensagem de sucesso sobre o fundo' },
  { frente: 'sucesso', fundo: 'superficie', tipo: 'texto', uso: 'Mensagem de sucesso sobre cartão' },
  { frente: 'erro', fundo: 'fundo', tipo: 'texto', uso: 'Mensagem de erro sobre o fundo' },
  { frente: 'erro', fundo: 'superficie', tipo: 'texto', uso: 'Mensagem de erro sobre cartão e campo' },
  { frente: 'etiqueta-texto', fundo: 'etiqueta-fundo', tipo: 'texto', uso: 'Texto da etiqueta ("Nova", "Repetida")' },
  { frente: 'figurinha-tinta', fundo: 'figurinha-papel', tipo: 'texto', uso: 'Texto da figurinha comum' },
  { frente: 'figurinha-tinta', fundo: 'prata-clara', tipo: 'texto', uso: 'Texto da figurinha brilhante' },
  { frente: 'figurinha-tinta', fundo: 'prata', tipo: 'texto', uso: 'Texto sobre a listra mais escura da brilhante' },
  { frente: 'figurinha-tinta', fundo: 'ouro', tipo: 'texto', uso: 'Texto da figurinha lendária' },
  { frente: 'borda', fundo: 'fundo', tipo: 'componente', uso: 'Borda de campo e de vaga sobre o fundo' },
  { frente: 'borda', fundo: 'superficie', tipo: 'componente', uso: 'Borda de campo sobre cartão' },
  { frente: 'borda', fundo: 'vaga', tipo: 'componente', uso: 'Moldura da vaga sobre o preenchimento da vaga' },
  { frente: 'acao', fundo: 'fundo', tipo: 'componente', uso: 'Botão principal como forma sobre o fundo' },
  { frente: 'acao', fundo: 'vaga', tipo: 'componente', uso: 'Botão "Colar" como forma dentro do espaço vazio' },
  { frente: 'texto', fundo: 'vaga', tipo: 'componente', uso: 'Preenchimento da barra de progresso sobre o trilho' },
  { frente: 'figurinha-papel', fundo: 'figurinha-tinta', tipo: 'texto', uso: 'Texto da etiqueta colada na figurinha' },

  // Pares com DUAS cores na frente: o desenho tem dois tons (um claro e um escuro)
  // e basta UM deles contrastar com o que está atrás. Vale o melhor dos dois.
  { frente: ['figurinha-tinta', 'figurinha-papel'], fundo: 'fundo', tipo: 'componente', uso: 'Etiqueta da figurinha (fundo ou contorno) sobre a página' },
  { frente: 'foco', fundo: 'foco-vao', tipo: 'componente', uso: 'Os dois tons do foco, um ao lado do outro' },
  { frente: ['foco', 'foco-vao'], fundo: 'fundo', tipo: 'componente', uso: 'Foco (anel ou vão) sobre o fundo' },
  { frente: ['foco', 'foco-vao'], fundo: 'superficie', tipo: 'componente', uso: 'Foco (anel ou vão) sobre cartão' },
  { frente: ['foco', 'foco-vao'], fundo: 'vaga', tipo: 'componente', uso: 'Foco (anel ou vão) sobre o espaço vazio' },
  { frente: ['foco', 'foco-vao'], fundo: 'figurinha-papel', tipo: 'componente', uso: 'Foco (anel ou vão) sobre a figurinha' },
  { frente: ['foco', 'foco-vao'], fundo: 'acao', tipo: 'componente', uso: 'Foco (anel ou vão) em volta do botão principal' },
  { frente: ['foco', 'foco-vao'], fundo: 'etiqueta-fundo', tipo: 'componente', uso: 'Foco (anel ou vão) sobre área na cor da tinta' },
];

// Os outros papéis do fundo. A página muda de papel conforme a pessoa rola,
// então tudo o que fica direto sobre a página precisa passar em cada um deles.
const PAPEIS = [
  { token: 'papel-2', nome: 'papel 2' },
  { token: 'papel-3', nome: 'papel 3' },
  { token: 'papel-4', nome: 'papel 4' },
];
for (const papel of PAPEIS) {
  PARES.push(
    { frente: 'texto', fundo: papel.token, tipo: 'texto', uso: 'Texto principal sobre o ' + papel.nome },
    { frente: 'texto-secundario', fundo: papel.token, tipo: 'texto', uso: 'Texto de apoio sobre o ' + papel.nome },
    { frente: 'acao', fundo: papel.token, tipo: 'texto', uso: 'Link e botão principal sobre o ' + papel.nome },
    { frente: 'sucesso', fundo: papel.token, tipo: 'texto', uso: 'Mensagem de sucesso sobre o ' + papel.nome },
    { frente: 'erro', fundo: papel.token, tipo: 'texto', uso: 'Mensagem de erro sobre o ' + papel.nome },
    { frente: 'borda', fundo: papel.token, tipo: 'componente', uso: 'Borda de campo e de vaga sobre o ' + papel.nome },
    { frente: ['figurinha-tinta', 'figurinha-papel'], fundo: papel.token, tipo: 'componente', uso: 'Etiqueta da figurinha (fundo ou contorno) sobre o ' + papel.nome },
    { frente: ['foco', 'foco-vao'], fundo: papel.token, tipo: 'componente', uso: 'Foco (anel ou vão) sobre o ' + papel.nome }
  );
}

// ---------------------------------------------------------------------------
// 4. O que cada cor é e por que foi escolhida (frases curtas, para o relatório)
// ---------------------------------------------------------------------------

const DESCRICAO = [
  { token: 'fundo', nome: 'Papel rosa / papel azul', onde: 'Primeira faixa do fundo de todas as páginas (e a cor do cabeçalho)', motivo: 'Rosa claro é lido como lúdico, acolhedor e nostálgico (papel de figurinha de chiclete). No escuro, o azul profundo acalma e descansa a vista mais que o preto.' },
  { token: 'papel-2', nome: 'Papel pêssego / papel roxo', onde: 'Segunda faixa do fundo', motivo: 'Vizinho do rosa no círculo das cores: o papel muda sem brigar com o anterior. No escuro, o roxo é o vizinho do azul.' },
  { token: 'papel-3', nome: 'Papel menta / papel petróleo', onde: 'Terceira faixa do fundo', motivo: 'Verde claro lembra o gramado: é a faixa onde fica o desenho da grande área. No escuro, um azul-petróleo.' },
  { token: 'papel-4', nome: 'Papel lilás / papel vinho', onde: 'Quarta faixa do fundo', motivo: 'Fica entre o verde e o rosa do começo, para o fundo emendar quando se repete em páginas compridas.' },
  { token: 'superficie', nome: 'Papel de cupom', onde: 'Cartões, campos de formulário e painel', motivo: 'Quase branco: passa limpeza e marca o que é papel solto em cima da página. No escuro, o que está na frente fica mais claro.' },
  { token: 'vaga', nome: 'Rosa-sombra / rebaixo', onde: 'Espaço vazio da figurinha e trilho da barra de progresso', motivo: 'O próprio papel um tom abaixo: comunica ausência e lugar reservado sem usar cinza.' },
  { token: 'texto', nome: 'Azul-tinteiro / tinta rosa', onde: 'Textos, títulos e fios', motivo: 'Azul-escuro transmite confiança e seriedade de coisa impressa. No escuro, um rosa quase branco é mais macio que o branco puro.' },
  { token: 'texto-secundario', nome: 'Tinta diluída', onde: 'Legendas, dicas e números das vagas', motivo: 'O mesmo matiz com menos força: cria hierarquia sem trazer uma cor nova.' },
  { token: 'borda', nome: 'Linha impressa', onde: 'Bordas de campo, de vaga e de cartão', motivo: 'Tom neutro da família da tinta: delimita sem chamar atenção, porque borda é estrutura e não mensagem.' },
  { token: 'acao', nome: 'Azul-caneta / caneta gel', onde: 'Botões e links', motivo: 'Azul vivo comunica clareza e decisão e respeita o costume de link azul. É a caneta: o que a pessoa faz, separado do que já veio impresso.' },
  { token: 'acao-forte', nome: 'Caneta apertada', onde: 'Botão com o mouse em cima ou pressionado', motivo: 'Mesma cor com mais força: confirma o toque sem mudar de matiz. No escuro clareia, porque ali a luz é que indica resposta.' },
  { token: 'sobre-acao', nome: 'Texto do botão', onde: 'Texto escrito em cima do botão principal', motivo: 'A cor do papel sobre a cor da caneta: o maior contraste disponível no tema.' },
  { token: 'foco', nome: 'Anel de foco', onde: 'Contorno do elemento em uso pelo teclado', motivo: 'A tinta mais forte do tema, para o foco ser sempre o que mais aparece na tela.' },
  { token: 'foco-vao', nome: 'Vão do foco', onde: 'Faixa entre o elemento e o anel de foco', motivo: 'O tom oposto ao do anel: assim o foco aparece tanto sobre fundo claro quanto sobre fundo escuro.' },
  { token: 'sucesso', nome: 'Verde-gramado', onde: 'Mensagens de "deu certo" e selos', motivo: 'Verde é o sinal universal de "pode seguir" e é a cor do campo.' },
  { token: 'erro', nome: 'Vermelho-cartão', onde: 'Mensagens de erro', motivo: 'Vermelho interrompe e pede correção; no futebol é o cartão que para o jogo. Vem sempre com ícone e frase.' },
  { token: 'etiqueta-fundo', nome: 'Etiqueta (fundo)', onde: 'Etiquetas "Nova" e "Repetida"', motivo: 'O negativo da tinta: destaca sem trazer cor nova, mantendo a página em uma tinta só.' },
  { token: 'etiqueta-texto', nome: 'Etiqueta (texto)', onde: 'Texto das etiquetas', motivo: 'A cor do papel escrita sobre a cor da tinta.' },
  { token: 'figurinha-papel', nome: 'Fosca', onde: 'Figurinha comum e borda de toda figurinha', motivo: 'Branco é neutro e honesto: comunica o básico do álbum e faz as outras raridades valerem mais.' },
  { token: 'figurinha-tinta', nome: 'Tinta da figurinha', onde: 'Texto dentro da figurinha', motivo: 'A figurinha é um objeto impresso: a tinta dela não muda quando o tema muda.' },
  { token: 'prata', nome: 'Laminada', onde: 'Listras da figurinha brilhante', motivo: 'Prata é o segundo degrau do pódio: valor acima do comum, sem competir com o ouro.' },
  { token: 'prata-clara', nome: 'Laminada clara', onde: 'Base da figurinha brilhante', motivo: 'O claro e o escuro alternados é o que o olho lê como brilho de metal.' },
  { token: 'ouro', nome: 'Holográfica', onde: 'Figurinha lendária', motivo: 'Ouro é a cor do prêmio máximo: quente e rara na página.' },
  { token: 'foto-sombra', nome: 'Sombra da foto', onde: 'Partes escuras das fotos dos estádios', motivo: 'A foto é mostrada como se fosse impressa com a tinta da página: assim ela não quebra a regra de uma tinta só e a cor continua reservada às figurinhas.' },
  { token: 'foto-luz', nome: 'Luz da foto', onde: 'Partes claras das fotos dos estádios', motivo: 'A cor do papel (no escuro, a da tinta rosa): a foto parece pertencer à página em vez de ser um retângulo colado nela.' },
];

// ---------------------------------------------------------------------------
// 5. Montar o arquivo docs/cores.md
// ---------------------------------------------------------------------------

// 10.84 vira "10,84:1" (vírgula, como se escreve em português).
function formatar(razao) {
  return razao.toFixed(2).replace('.', ',') + ':1';
}

function resultado(razao, tipo) {
  if (tipo === 'componente') return razao >= 3 ? 'Passa (3:1)' : 'REPROVA';
  if (razao >= 7) return 'Passa AAA';
  if (razao >= 4.5) return 'Passa AA';
  return 'REPROVA';
}

let reprovados = 0;
let total = 0;
const linhas = [];

linhas.push('# Cores do site');
linhas.push('');
linhas.push('Arquivo gerado por `node scripts/contraste.js`. Não edite à mão: mude as cores em `css/tokens.css` e rode o script de novo.');
linhas.push('');
linhas.push('## Como ler');
linhas.push('');
linhas.push('- Contraste é a diferença de claridade entre duas cores, de 1:1 (iguais) a 21:1 (preto no branco).');
linhas.push('- Mínimos do WCAG 2.2: texto normal 4,5:1 (nível AA) e 7:1 (nível AAA); texto grande, bordas, ícones, anel de foco e barras 3:1.');
linhas.push('- Direção visual: "Uma tinta só, vários papéis". A tinta é uma só (azul no tema claro, rosa no escuro). O papel do fundo muda de cor ao longo da página: são quatro papéis por tema.');
linhas.push('');
linhas.push('## Paleta e motivo de cada cor');
linhas.push('');
linhas.push('| Cor | Token | Claro | Escuro | Onde é usada | Motivo |');
linhas.push('|---|---|---|---|---|---|');
for (const d of DESCRICAO) {
  linhas.push(`| ${d.nome} | \`--cor-${d.token}\` | \`${claro[d.token]}\` | \`${escuro[d.token]}\` | ${d.onde} | ${d.motivo} |`);
}
linhas.push('');

for (const tema of TEMAS) {
  linhas.push(`## Contraste: ${tema.nome.toLowerCase()}`);
  linhas.push('');
  linhas.push('| Uso | Frente | Fundo | Contraste | Mínimo | Resultado |');
  linhas.push('|---|---|---|---|---|---|');
  for (const par of PARES) {
    const fundo = tema.cores[par.fundo];
    // "frente" pode ser um nome só ou uma lista de dois nomes (ver o comentário nos PARES).
    // Com dois, fica a cor que contrasta mais com o fundo.
    const candidatas = Array.isArray(par.frente) ? par.frente : [par.frente];
    let frente = tema.cores[candidatas[0]];
    for (const nome of candidatas) {
      if (contraste(tema.cores[nome], fundo) > contraste(frente, fundo)) frente = tema.cores[nome];
    }
    const razao = contraste(frente, fundo);
    const veredito = resultado(razao, par.tipo);
    total += 1;
    if (veredito === 'REPROVA') {
      reprovados += 1;
      console.log(`REPROVA  ${tema.nome}: ${par.uso} (${frente} sobre ${fundo}) = ${formatar(razao)}`);
    }
    const minimo = par.tipo === 'texto' ? '4,5:1' : '3:1';
    linhas.push(`| ${par.uso} | \`${frente}\` | \`${fundo}\` | ${formatar(razao)} | ${minimo} | ${veredito} |`);
  }
  linhas.push('');
}

// ---------------------------------------------------------------------------
// 6. As linhas de campo desenhadas no fundo
// ---------------------------------------------------------------------------
// A linha é a própria tinta, bem fraca, por cima do papel (--cor-traco-do-fundo).
// Um texto pode ficar em cima de uma linha. Por isso a conta é refeita com o
// papel "riscado": a cor que o olho vê quando a linha se mistura com o papel.
// No alto contraste não há linha (ela é transparente), então não há o que conferir.

// Acha os dois valores no tokens.css, na ordem em que aparecem: claro e escuro.
// Cada um tem o formato rgba(vermelho, verde, azul, força), com força de 0 a 1.
const TRACOS = [...fs.readFileSync(ARQUIVO_TOKENS, 'utf8').matchAll(/--cor-traco-do-fundo:\s*rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/g)];

// Mistura a linha com o papel e devolve a cor resultante em #HEX
function papelRiscado(papelHex, traco) {
  const forca = Number(traco[4]);
  let hex = '#';
  for (let canal = 0; canal < 3; canal++) {
    const doPapel = parseInt(papelHex.slice(1 + canal * 2, 3 + canal * 2), 16);
    const daLinha = Number(traco[1 + canal]);
    const visto = Math.round(doPapel * (1 - forca) + daLinha * forca);
    hex += visto.toString(16).padStart(2, '0');
  }
  return hex.toUpperCase();
}

const TEXTOS_SOBRE_A_PAGINA = ['texto', 'texto-secundario', 'acao', 'sucesso', 'erro'];
let paresDasLinhas = 0;

linhas.push('## Contraste: linhas de campo do fundo');
linhas.push('');
linhas.push('As linhas de campo são a tinta da página bem fraca, por cima do papel. A tabela mostra cada papel já com a linha por cima e o texto que menos contrasta com ele. Mínimo de 4,5:1. No alto contraste não há linhas.');
linhas.push('');
linhas.push('| Tema | Papel | Papel com a linha | Texto que menos contrasta | Contraste | Resultado |');
linhas.push('|---|---|---|---|---|---|');
[claro, escuro].forEach(function (cores, i) {
  for (const papel of ['fundo', 'papel-2', 'papel-3', 'papel-4']) {
    const riscado = papelRiscado(cores[papel], TRACOS[i]);
    let pior = TEXTOS_SOBRE_A_PAGINA[0];
    for (const nome of TEXTOS_SOBRE_A_PAGINA) {
      if (contraste(cores[nome], riscado) < contraste(cores[pior], riscado)) pior = nome;
    }
    const razao = contraste(cores[pior], riscado);
    const veredito = resultado(razao, 'texto');
    total += TEXTOS_SOBRE_A_PAGINA.length;
    paresDasLinhas += TEXTOS_SOBRE_A_PAGINA.length;
    if (veredito === 'REPROVA') {
      reprovados += 1;
      console.log(`REPROVA  Linha do fundo, tema ${i === 0 ? 'claro' : 'escuro'}: --cor-${pior} sobre ${riscado} = ${formatar(razao)}`);
    }
    linhas.push(`| ${i === 0 ? 'Claro' : 'Escuro'} | \`${cores[papel]}\` | \`${riscado}\` | \`--cor-${pior}\` | ${formatar(razao)} | ${veredito} |`);
  }
});
linhas.push('');

// ---------------------------------------------------------------------------
// 7. As cores das seleções (o desenho dentro da figurinha)
// ---------------------------------------------------------------------------
// Cada seleção tem três cores em js/dados.js: campo, camisa e número.
// O desenho precisa de dois contrastes de pelo menos 3:1:
//   - o número sobre a camisa (é um número grande, em negrito);
//   - a silhueta, na tinta da figurinha, sobre o campo.
// A figurinha não muda de cor com o tema; só a tinta muda no alto contraste.

// Lê a lista SELECOES de js/dados.js. O arquivo é um script de navegador,
// sem "exports"; por isso ele é executado dentro de uma função que devolve a lista.
const codigoDosDados = fs.readFileSync(path.join(__dirname, '..', 'js', 'dados.js'), 'utf8');
const SELECOES = new Function(codigoDosDados + '; return SELECOES;')();

const TINTAS = [
  { nome: 'tinta normal', cor: claro['figurinha-tinta'] },
  { nome: 'tinta do alto contraste', cor: altoClaro['figurinha-tinta'] },
];

linhas.push('## Contraste: cores das seleções');
linhas.push('');
linhas.push('O número é escrito sobre a camisa e a silhueta (na tinta da figurinha) fica sobre o campo. Mínimo de 3:1 nos dois casos. A última coluna é o pior resultado entre a tinta normal e a do alto contraste.');
linhas.push('');
linhas.push('| Seleção | Campo | Camisa | Número | Número sobre a camisa | Silhueta sobre o campo | Resultado |');
linhas.push('|---|---|---|---|---|---|---|');
for (const selecao of SELECOES) {
  const cores = selecao.cores;
  const numeroNaCamisa = contraste(cores.numero, cores.camisa);
  let silhuetaNoCampo = 21;
  for (const tinta of TINTAS) silhuetaNoCampo = Math.min(silhuetaNoCampo, contraste(tinta.cor, cores.campo));
  const passou = numeroNaCamisa >= 3 && silhuetaNoCampo >= 3;
  total += 2;
  if (!passou) {
    reprovados += 1;
    console.log(`REPROVA  Seleção ${selecao.nome}: número/camisa ${formatar(numeroNaCamisa)}, silhueta/campo ${formatar(silhuetaNoCampo)}`);
  }
  linhas.push(`| ${selecao.nome} | \`${cores.campo}\` | \`${cores.camisa}\` | \`${cores.numero}\` | ${formatar(numeroNaCamisa)} | ${formatar(silhuetaNoCampo)} | ${passou ? 'Passa (3:1)' : 'REPROVA'} |`);
}
linhas.push('');

linhas.push('## Resumo');
linhas.push('');
linhas.push(`- Pares conferidos: ${total} (${PARES.length} pares da página em ${TEMAS.length} temas, mais ${paresDasLinhas} pares de texto sobre as linhas do fundo, mais 2 pares do desenho de cada uma das ${SELECOES.length} seleções).`);
linhas.push(`- Reprovados: ${reprovados}.`);
linhas.push('- A raridade da figurinha nunca depende só da cor: vem sempre com palavra, ícone e textura.');
linhas.push('- A seleção de cada figurinha também vem escrita: as cores da camisa não são a única informação.');
linhas.push('');

fs.writeFileSync(ARQUIVO_SAIDA, linhas.join('\n'), 'utf8');

console.log(`${total} pares conferidos, ${reprovados} reprovados. Tabela escrita em docs/cores.md`);

// Se algum par reprovar, o script termina com erro (código 1), para ninguém deixar passar.
process.exit(reprovados > 0 ? 1 : 0);
````

### scripts/gerar-fundo.js

````js
// ============================================================================
// gerar-fundo.js
// ----------------------------------------------------------------------------
// O que faz: desenha o fundo da página (os papéis coloridos e as passagens em
// retícula entre eles) e guarda o desenho no fim do css/tokens.css.
//
// Como rodar (na pasta do projeto):   node scripts/gerar-fundo.js
// Rode de novo sempre que mudar uma cor de papel (--cor-fundo ou --cor-papel-2,
// 3 e 4) no css/tokens.css.
//
// Por que um script: o fundo é uma imagem SVG escrita dentro do próprio CSS, e
// uma imagem assim não consegue ler as variáveis de cor do site. O script lê
// as cores no tokens.css e escreve a imagem com elas, uma para cada tema.
//
// Como é o desenho: uma tira bem estreita (16 px) e bem alta (4400 px), que o
// navegador repete para os lados e para baixo. De cima para baixo:
//   papel 1, passagem, papel 2, passagem, papel 3, passagem, papel 4, passagem
// e volta ao papel 1. Em cada passagem, bolinhas da cor seguinte vão crescendo
// linha a linha até se juntarem: é assim que a impressão em papel faz um
// degradê (a retícula).
// ============================================================================

const fs = require('fs');
const path = require('path');

const ARQUIVO_TOKENS = path.join(__dirname, '..', 'css', 'tokens.css');

const LARGURA = 16;         // largura da tira, igual à distância entre as bolinhas
const ALTURA = 4400;        // altura da tira: depois disso o fundo se repete
const LINHAS = 16;          // quantas linhas de bolinhas tem cada passagem
const ENTRE_LINHAS = 14;    // distância de uma linha de bolinhas até a próxima
const PASSAGEM = LINHAS * ENTRE_LINHAS;
// Onde cada papel termina e começa a passagem para o próximo (em pixels, de cima para baixo)
const FIM_DE_CADA_PAPEL = [520, 1600, 2680, 3760];

const INICIO = '/* FUNDO-INICIO */';
const FIM = '/* FUNDO-FIM */';

// ---------------------------------------------------------------------------
// 1. Ler as cores de papel de cada tema no tokens.css
// ---------------------------------------------------------------------------

function lerPapeis(css, seletor) {
  const papeis = {};
  let dentro = false;
  for (const linha of css.split('\n')) {
    if (linha.trim().endsWith('{')) dentro = linha.trim() === seletor + ' {';
    if (linha.trim() === '}') dentro = false;
    if (!dentro) continue;
    const achado = /--cor-(fundo|papel-[234])\s*:\s*(#[0-9a-fA-F]{6})\s*;/.exec(linha);
    if (achado) papeis[achado[1]] = achado[2];
  }
  return papeis;
}

// ---------------------------------------------------------------------------
// 2. Desenhar a tira
// ---------------------------------------------------------------------------

function desenharTira(cores) {
  const papeis = [cores.fundo, cores['papel-2'], cores['papel-3'], cores['papel-4']];
  const pecas = [];
  let y = 0;

  FIM_DE_CADA_PAPEL.forEach(function (fim, i) {
    const seguinte = papeis[(i + 1) % papeis.length];

    // A faixa lisa deste papel, que continua por baixo das bolinhas da passagem
    pecas.push("<rect y='" + y + "' width='" + LARGURA + "' height='" + (fim + PASSAGEM - y) + "' fill='" + papeis[i] + "'/>");

    // A passagem: bolinhas do papel seguinte, cada linha um pouco maiores.
    // As linhas são desencontradas (uma no meio, a outra nas beiradas da tira),
    // como na retícula de jornal.
    for (let linha = 0; linha < LINHAS; linha++) {
      const cy = fim + ENTRE_LINHAS / 2 + linha * ENTRE_LINHAS;
      const raio = (1.5 + (linha / (LINHAS - 1)) * 8).toFixed(1);
      const centros = linha % 2 === 0 ? [LARGURA / 2] : [0, LARGURA];
      for (const cx of centros) {
        pecas.push("<circle cx='" + cx + "' cy='" + cy + "' r='" + raio + "' fill='" + seguinte + "'/>");
      }
    }
    y = fim + PASSAGEM;
  });

  // O resto da tira volta a ser o papel 1, que emenda com o começo da repetição
  pecas.push("<rect y='" + y + "' width='" + LARGURA + "' height='" + (ALTURA - y) + "' fill='" + papeis[0] + "'/>");

  const svg = "<svg xmlns='http://www.w3.org/2000/svg' width='" + LARGURA + "' height='" + ALTURA + "'>" + pecas.join('') + '</svg>';
  // Dentro de um url() do CSS, estes três sinais precisam ir disfarçados
  return 'url("data:image/svg+xml,' + svg.replace(/#/g, '%23').replace(/</g, '%3C').replace(/>/g, '%3E') + '")';
}

// ---------------------------------------------------------------------------
// 3. Guardar no fim do tokens.css, entre as duas marcas
// ---------------------------------------------------------------------------

let css = fs.readFileSync(ARQUIVO_TOKENS, 'utf8').replace(/\r\n/g, '\n');

const claro = lerPapeis(css, ':root');
const escuro = Object.assign({}, claro, lerPapeis(css, '[data-tema="escuro"]'));
for (const tema of [claro, escuro]) {
  for (const nome of ['fundo', 'papel-2', 'papel-3', 'papel-4']) {
    if (!tema[nome]) throw new Error('Não achei a cor --cor-' + nome + ' no tokens.css');
  }
}

const bloco = [
  INICIO,
  ':root {',
  '  --fundo-papeis: ' + desenharTira(claro) + ';',
  '}',
  '',
  '[data-tema="escuro"] {',
  '  --fundo-papeis: ' + desenharTira(escuro) + ';',
  '}',
  '',
  '/* No alto contraste o fundo é liso: branco ou preto, sem desenho */',
  '[data-contraste="alto"] {',
  '  --fundo-papeis: none;',
  '}',
  FIM,
].join('\n');

if (css.includes(INICIO) && css.includes(FIM)) {
  css = css.slice(0, css.indexOf(INICIO)) + bloco + css.slice(css.indexOf(FIM) + FIM.length);
} else {
  css = css.trimEnd() + '\n\n/* ---------- Fundo da página ----------\n   Gerado por:  node scripts/gerar-fundo.js   (não edite à mão o que está\n   entre as duas marcas: mude as cores de papel lá em cima e rode o script) */\n' + bloco + '\n';
}

fs.writeFileSync(ARQUIVO_TOKENS, css, 'utf8');
console.log('Fundo desenhado para os temas claro e escuro. Guardado em css/tokens.css');
````

### scripts/gerar-anexo.js

````js
// ============================================================================
// gerar-anexo.js
// ----------------------------------------------------------------------------
// O que faz: junta todos os arquivos HTML, CSS e JavaScript do projeto em um
// arquivo só, docs/anexo-codigo.md, para o anexo de código do relatório.
//
// Como rodar (na pasta do projeto):   node scripts/gerar-anexo.js
//
// Rode de novo sempre que o código mudar: o anexo é reescrito do zero.
// ============================================================================

const fs = require('fs');
const path = require('path');

const RAIZ = path.join(__dirname, '..');
const ARQUIVO_SAIDA = path.join(RAIZ, 'docs', 'anexo-codigo.md');

// Os grupos de arquivos, na ordem em que aparecem no anexo.
// "primeiro" lista os arquivos que vêm na frente, na ordem em que fazem mais
// sentido para ler. Os que não estiverem na lista entram depois, em ordem
// alfabética: assim um arquivo novo nunca fica de fora.
const GRUPOS = [
  {
    titulo: 'Páginas (HTML)', pasta: '', extensao: '.html', linguagem: 'html',
    primeiro: ['index.html', 'album.html', 'pacotinhos.html', 'trocas.html', 'login.html', 'contato.html', 'sobre.html'],
  },
  {
    titulo: 'Estilos (CSS)', pasta: 'css', extensao: '.css', linguagem: 'css',
    primeiro: ['tokens.css', 'base.css', 'componentes.css', 'paginas.css', 'acessibilidade.css', 'cenas.css'],
  },
  {
    titulo: 'Comportamento (JavaScript)', pasta: 'js', extensao: '.js', linguagem: 'js',
    primeiro: ['tema-acessibilidade.js', 'menu.js', 'efeitos.js', 'estado.js', 'figurinha.js', 'album.js', 'pacotinho.js', 'trocas.js', 'inicio.js', 'carrossel.js', 'cenas.js', 'cenas-inicio.js', 'pacote3d.js', 'pacotinho-3d.js', 'formulario.js', 'login.js', 'contato.js', 'sobre.js', 'demonstracao.js', 'dados.js'],
  },
  {
    titulo: 'Scripts de apoio (Node.js)', pasta: 'scripts', extensao: '.js', linguagem: 'js',
    primeiro: ['contraste.js', 'gerar-fundo.js', 'gerar-anexo.js'],
  },
  {
    titulo: 'Ferramentas de apoio (HTML)', pasta: 'scripts', extensao: '.html', linguagem: 'html',
    primeiro: ['quadros.html'],
  },
];

// Arquivos de trabalho, que não fazem parte do site entregue: ficam fora do anexo
const FORA_DO_ANEXO = [
  'laboratorio.html', 'laboratorio.css', 'laboratorio.js',
  'laboratorio-2.html', 'laboratorio-2.css', 'laboratorio-2.js',
];

// Lista os arquivos de um grupo: primeiro os da lista "primeiro", depois os outros
function arquivosDoGrupo(grupo) {
  const pasta = path.join(RAIZ, grupo.pasta);
  const todos = fs.readdirSync(pasta).filter(function (nome) { return nome.endsWith(grupo.extensao) && !FORA_DO_ANEXO.includes(nome); }).sort();
  const naFrente = grupo.primeiro.filter(function (nome) { return todos.includes(nome); });
  const resto = todos.filter(function (nome) { return !grupo.primeiro.includes(nome); });
  return naFrente.concat(resto);
}

const linhas = [];
const sumario = [];
let totalDeLinhas = 0;
let totalDeArquivos = 0;

for (const grupo of GRUPOS) {
  linhas.push('## ' + grupo.titulo);
  linhas.push('');

  for (const nome of arquivosDoGrupo(grupo)) {
    const caminho = grupo.pasta ? grupo.pasta + '/' + nome : nome;
    const conteudo = fs.readFileSync(path.join(RAIZ, caminho), 'utf8').replace(/\r\n/g, '\n').trimEnd();
    const quantas = conteudo.split('\n').length;
    totalDeLinhas += quantas;
    totalDeArquivos += 1;
    sumario.push('| `' + caminho + '` | ' + quantas + ' |');

    linhas.push('### ' + caminho);
    linhas.push('');
    // Quatro crases abrem e fecham o bloco de código: assim um arquivo que
    // tenha três crases dentro dele não fecha o bloco antes da hora.
    linhas.push('````' + grupo.linguagem);
    linhas.push(conteudo);
    linhas.push('````');
    linhas.push('');
  }
}

const cabecalho = [
  '# Anexo: código do projeto',
  '',
  'Arquivo gerado por `node scripts/gerar-anexo.js`. Não edite à mão: mude o código e rode o script de novo.',
  '',
  'Projeto: Colei! Álbum de figurinhas da Copa 2026. Aluno: Vitor Zago Pontes Morais.',
  '',
  '- Arquivos: ' + totalDeArquivos + '.',
  '- Linhas de código (com comentários): ' + totalDeLinhas + '.',
  '',
  '| Arquivo | Linhas |',
  '|---|---|',
].concat(sumario, ['']);

fs.writeFileSync(ARQUIVO_SAIDA, cabecalho.concat(linhas).join('\n'), 'utf8');
console.log(totalDeArquivos + ' arquivos, ' + totalDeLinhas + ' linhas. Anexo escrito em docs/anexo-codigo.md');
````

## Ferramentas de apoio (HTML)

### scripts/quadros.html

````html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Gerador de quadros do pacotinho | Colei!</title>
  <meta name="robots" content="noindex">

  <!-- FERRAMENTA DE APOIO. Não faz parte do site entregue.
       Esta página desenha o pacotinho 3D (js/pacote3d.js) em 90 poses seguidas
       e salva cada pose como uma imagem. É a "sequência de quadros" que a cena
       do pacotinho, na página inicial, mostra conforme a rolagem.

       Para gerar de novo (depois de mudar o js/pacote3d.js, por exemplo):
       abra esta página pelo servidor local, no Edge ou no Chrome, clique em
       "Salvar os quadros em uma pasta" e escolha a pasta assets/img/pacotinho. -->
  <link rel="stylesheet" href="../css/tokens.css">
  <link rel="stylesheet" href="../css/base.css">
  <link rel="stylesheet" href="../css/componentes.css">
  <script src="../js/vendor/three.min.js"></script>
  <script src="../js/pacote3d.js"></script>
  <style>
    main { display: grid; gap: var(--espaco-4); }
    .quadros-tela { width: min(100%, 22.5rem); height: auto; border: 2px dashed var(--cor-borda); }
    .quadros-controle { display: flex; flex-wrap: wrap; align-items: center; gap: var(--espaco-3); }
    .quadros-controle input { flex: 1 1 12rem; }
  </style>
</head>
<body>
  <main class="largura">
    <h1>Gerador de quadros</h1>
    <p>Ferramenta de apoio do projeto Colei!. Ela desenha o pacotinho em 3D em 90 poses e salva cada uma como imagem, para a cena do pacotinho da página inicial.</p>

    <div class="quadros-controle">
      <label for="quadro">Quadro</label>
      <input type="range" id="quadro" min="1" max="90" value="1">
      <output id="quadro-numero" for="quadro">1 de 90</output>
    </div>
    <div class="quadros-controle">
      <button class="botao botao-contorno" type="button" id="trocar-tema">Trocar o tema</button>
      <button class="botao" type="button" id="salvar">Salvar os quadros em uma pasta</button>
    </div>
    <p class="painel-aviso" id="aviso" role="status"></p>

    <!-- O tamanho da tela é o tamanho de cada imagem salva: 720 por 924 pixels. -->
    <canvas class="quadros-tela" id="tela" width="720" height="924" aria-label="Pré-visualização do quadro escolhido"></canvas>
  </main>

  <script>
    'use strict';

    const QUADROS = 90;          // quantas poses
    const QUALIDADE = 0.82;      // do arquivo WebP: de 0 (leve e feio) a 1 (pesado e fiel)
    const TEMAS = ['claro', 'escuro'];

    const tela = document.getElementById('tela');
    const aviso = document.getElementById('aviso');
    const controle = document.getElementById('quadro');
    document.documentElement.dataset.tema = 'claro';

    // alturaVisivel: 15.4 deixa uma folga em volta do pacotinho, porque ele
    // entra por baixo, gira e a aba voa para cima
    const pacote = criarPacote3d(tela, { alturaVisivel: 15.4, nitidez: 1, largura: 720, altura: 924 });

    // Desenha a pose de número "i" (de 1 a 90)
    function desenharQuadro(i) {
      pacote.posar((i - 1) / (QUADROS - 1));
      pacote.desenhar();
    }

    function mostrar() {
      desenharQuadro(Number(controle.value));
      document.getElementById('quadro-numero').textContent = controle.value + ' de ' + QUADROS;
    }

    function usarTema(tema) {
      document.documentElement.dataset.tema = tema;
      pacote.estampar();   // refaz a estampa com as cores do tema
      mostrar();
    }

    controle.addEventListener('input', mostrar);
    document.getElementById('trocar-tema').addEventListener('click', function () {
      usarTema(document.documentElement.dataset.tema === 'claro' ? 'escuro' : 'claro');
    });

    // Usado também pelo teste automático: devolve um quadro já em forma de arquivo
    // (um texto comprido que começa com "data:image/webp;base64,")
    function quadroComoArquivo(tema, i, tipo) {
      if (document.documentElement.dataset.tema !== tema) usarTema(tema);
      desenharQuadro(i);
      return tela.toDataURL(tipo || 'image/webp', QUALIDADE);
    }

    // Salva tudo em uma pasta escolhida pela pessoa: claro/001.webp ... escuro/090.webp
    document.getElementById('salvar').addEventListener('click', async function () {
      if (!window.showDirectoryPicker) {
        aviso.textContent = 'Este navegador não deixa uma página salvar em uma pasta. Use o Edge ou o Chrome.';
        return;
      }
      const pasta = await window.showDirectoryPicker({ mode: 'readwrite' });
      for (const tema of TEMAS) {
        usarTema(tema);
        const pastaDoTema = await pasta.getDirectoryHandle(tema, { create: true });
        for (let i = 1; i <= QUADROS; i++) {
          desenharQuadro(i);
          const imagem = await new Promise(function (pronto) { tela.toBlob(pronto, 'image/webp', QUALIDADE); });
          const arquivo = await pastaDoTema.getFileHandle(String(i).padStart(3, '0') + '.webp', { create: true });
          const escrita = await arquivo.createWritable();
          await escrita.write(imagem);
          await escrita.close();
          aviso.textContent = 'Tema ' + tema + ': quadro ' + i + ' de ' + QUADROS + '.';
        }
      }
      aviso.textContent = 'Pronto: ' + (QUADROS * TEMAS.length) + ' quadros salvos.';
    });

    // A estampa usa as letras do site: só pode ser desenhada depois que elas chegarem
    const pronto = Promise.all([
      document.fonts.load('900 100px "Londrina Solid"'),
      document.fonts.load('700 60px "Atkinson Hyperlegible Next"'),
    ]).then(function () {
      pacote.estampar();
      mostrar();
      return true;
    });
  </script>
</body>
</html>
````

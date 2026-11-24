// ============================================================================
// carrossel.js
// ----------------------------------------------------------------------------
// Os dois carrosséis da página inicial:
//   1. o das 16 sedes: mostra uma sede por vez, com a foto do estádio;
//   2. o dos 12 grupos: uma faixa de grupos lado a lado, que anda para os lados.
//
// Como são feitos para funcionar com teclado e leitor de tela:
//   - botões "Anterior" e "Próxima" de verdade (<button>);
//   - um botão para cada item (os indicadores), que leva direto a ele;
//   - a posição ("3 de 16: Dallas") fica em um texto com role="status", que o
//     leitor de tela lê sozinho a cada troca;
//   - não passam sozinhos: só mudam quando a pessoa pede.
//
// Depende de: js/dados.js (as listas SEDES e SELECOES), js/estado.js
// (gruposDoAlbum e figurinhasDoGrupo) e js/figurinha.js (criarElemento e
// movimentoReduzido).
// ============================================================================

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // Marca o indicador do item atual (aria-current diz ao leitor de tela qual é)
  function marcarIndicador(lista, atual) {
    const botoes = lista.querySelectorAll('button');
    for (let i = 0; i < botoes.length; i++) {
      if (i === atual) botoes[i].setAttribute('aria-current', 'true');
      else botoes[i].removeAttribute('aria-current');
    }
  }

  // -------------------------------------------------------------------------
  // 1. O carrossel das sedes
  // -------------------------------------------------------------------------

  function montarCarrosselDasSedes() {
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
      marcarIndicador(indicadores, atual);
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
  }

  // -------------------------------------------------------------------------
  // 2. O carrossel dos grupos
  // -------------------------------------------------------------------------
  // Os doze painéis ficam lado a lado dentro de uma "janela" que rola para os
  // lados (a rolagem é a do próprio navegador: funciona com o dedo, com o
  // mouse e com as setas do teclado). Os botões só pedem à janela para rolar
  // até um painel. O grupo que está no meio da janela é o "atual": as bandeiras
  // dele deixam de ser impressas em uma tinta só e viram figurinhas coloridas.

  function montarCarrosselDosGrupos() {
    const carrossel = document.getElementById('carrossel-grupos');
    if (!carrossel) return;

    const janela = document.getElementById('grupos-janela');
    const trilha = document.getElementById('trilha');
    const indicadores = document.getElementById('grupo-indicadores');
    const posicao = document.getElementById('grupo-posicao');
    const letras = gruposDoAlbum().sort();
    let atual = -1;            // o grupo que está no meio da janela
    let quadroPedido = false;  // já existe uma medição agendada?

    // Um painel por grupo: a letra, as quatro seleções e o link para o álbum
    const paineis = letras.map(function (letra, i) {
      const painel = criarElemento('div', 'grupo');
      painel.setAttribute('role', 'group');
      painel.setAttribute('aria-roledescription', 'slide');
      painel.setAttribute('aria-label', 'Grupo ' + letra + ', ' + (i + 1) + ' de ' + letras.length);

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

      // O indicador deste grupo: um botão com a letra
      const botao = criarElemento('button', 'carrossel-numero', letra);
      botao.type = 'button';
      botao.setAttribute('aria-label', 'Grupo ' + letra);
      botao.addEventListener('click', function () { irPara(i); });
      const item = document.createElement('li');
      item.append(botao);
      indicadores.append(item);

      return painel;
    });

    // Onde a janela precisa estar para o painel i ficar bem no meio dela
    function lugarDoPainel(i) {
      return paineis[i].offsetLeft + paineis[i].offsetWidth / 2 - janela.clientWidth / 2;
    }

    // Rola a janela até o painel i. Com menos movimento, vai de uma vez.
    function irPara(i) {
      janela.scrollTo({ left: lugarDoPainel(i), behavior: movimentoReduzido() ? 'auto' : 'smooth' });
    }

    // Olha onde a rolagem está e arruma cada painel. "--f" vai de 0 (longe do
    // meio da janela) a 1 (bem no meio): é ele que o CSS usa para dar cor à
    // bandeira (ver ".selo", em css/cenas.css).
    function medir() {
      quadroPedido = false;
      const meio = janela.scrollLeft + janela.clientWidth / 2;
      const alcance = paineis[0].offsetWidth * 0.9;
      let maisPerto = 0;
      let menorDistancia = Infinity;

      paineis.forEach(function (painel, i) {
        const distancia = Math.abs(painel.offsetLeft + painel.offsetWidth / 2 - meio);
        const perto = Math.min(1, Math.max(0, 1 - distancia / alcance));
        const foco = perto * perto * (3 - 2 * perto);   // arranca e freia com suavidade
        painel.style.setProperty('--f', foco.toFixed(3));
        painel.classList.toggle('grupo-colado', foco > 0.55);
        if (distancia < menorDistancia) {
          menorDistancia = distancia;
          maisPerto = i;
        }
      });

      // Mudou o grupo do meio: atualiza o texto da posição e o indicador
      if (maisPerto !== atual) {
        atual = maisPerto;
        posicao.textContent = (atual + 1) + ' de ' + letras.length + ': Grupo ' + letras[atual];
        marcarIndicador(indicadores, atual);
      }
    }

    // A rolagem dispara muitos avisos por segundo: mede no máximo uma vez por quadro
    function pedirMedida() {
      if (quadroPedido) return;
      quadroPedido = true;
      requestAnimationFrame(medir);
    }
    janela.addEventListener('scroll', pedirMedida, { passive: true });
    window.addEventListener('resize', pedirMedida);

    // "Anterior" no primeiro vai para o último, e "Próximo" no último volta para o primeiro
    document.getElementById('grupo-anterior').addEventListener('click', function () {
      irPara((atual - 1 + letras.length) % letras.length);
    });

    document.getElementById('grupo-proximo').addEventListener('click', function () {
      irPara((atual + 1) % letras.length);
    });

    carrossel.hidden = false;   // o carrossel só aparece se o JavaScript estiver ligado
    janela.scrollLeft = lugarDoPainel(0);
    medir();
  }

  montarCarrosselDasSedes();
  montarCarrosselDosGrupos();
});

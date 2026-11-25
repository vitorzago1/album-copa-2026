document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  function marcarIndicador(lista, atual) {
    const botoes = lista.querySelectorAll('button');
    for (let i = 0; i < botoes.length; i++) {
      if (i === atual) botoes[i].setAttribute('aria-current', 'true');
      else botoes[i].removeAttribute('aria-current');
    }
  }

  function montarCarrosselDasSedes() {
    const carrossel = document.getElementById('carrossel');
    if (!carrossel) return;

    const indicadores = document.getElementById('sede-indicadores');
    let atual = 0;

    function comPonto(numero) {
      return numero.toLocaleString('pt-BR');
    }

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

    function mostrar(posicao) {
      atual = posicao;
      const sede = SEDES[atual];

      document.getElementById('sede-cidade').textContent = sede.cidade;
      document.getElementById('sede-estadio').textContent = sede.estadio;
      document.getElementById('sede-pais').textContent = sede.municipio ? sede.municipio + ', ' + sede.pais : sede.pais;
      document.getElementById('sede-bandeira').src = 'assets/bandeiras/' + sede.bandeira + '.svg';
      document.getElementById('sede-numeros').textContent = sede.jogos + ' jogos e ' + comPonto(sede.capacidade) + ' lugares';
      document.getElementById('sede-nome-na-copa').textContent = sede.nomeNaCopa;

      const nota = document.getElementById('sede-nota');
      nota.textContent = sede.nota;
      nota.hidden = sede.nota === '';

      const foto = document.getElementById('sede-foto');
      foto.src = 'assets/img/sedes/' + sede.id + '.jpg';
      foto.alt = sede.foto.alt;
      const credito = document.getElementById('sede-credito');
      credito.textContent = 'Foto: ' + sede.foto.autor + ', ' + sede.foto.licenca + ', Wikimedia Commons';
      credito.href = sede.foto.origem;

      document.getElementById('sede-posicao').textContent = (atual + 1) + ' de ' + SEDES.length + ': ' + sede.cidade;
      marcarIndicador(indicadores, atual);
    }

    document.getElementById('sede-anterior').addEventListener('click', function () {
      mostrar((atual - 1 + SEDES.length) % SEDES.length);
    });

    document.getElementById('sede-proxima').addEventListener('click', function () {
      mostrar((atual + 1) % SEDES.length);
    });

    carrossel.hidden = false;
    mostrar(0);
  }

  function montarCarrosselDosGrupos() {
    const carrossel = document.getElementById('carrossel-grupos');
    if (!carrossel) return;

    const janela = document.getElementById('grupos-janela');
    const trilha = document.getElementById('trilha');
    const indicadores = document.getElementById('grupo-indicadores');
    const posicao = document.getElementById('grupo-posicao');
    const letras = gruposDoAlbum().sort();
    let atual = -1;
    let quadroPedido = false;

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
        bandeira.alt = '';
        bandeira.loading = 'lazy';
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

      const botao = criarElemento('button', 'carrossel-numero', letra);
      botao.type = 'button';
      botao.setAttribute('aria-label', 'Grupo ' + letra);
      botao.addEventListener('click', function () { irPara(i); });
      const item = document.createElement('li');
      item.append(botao);
      indicadores.append(item);

      return painel;
    });

    function lugarDoPainel(i) {
      return paineis[i].offsetLeft + paineis[i].offsetWidth / 2 - janela.clientWidth / 2;
    }

    function irPara(i) {
      janela.scrollTo({ left: lugarDoPainel(i), behavior: movimentoReduzido() ? 'auto' : 'smooth' });
    }

    function medir() {
      quadroPedido = false;
      const meio = janela.scrollLeft + janela.clientWidth / 2;
      const alcance = paineis[0].offsetWidth * 0.9;
      let maisPerto = 0;
      let menorDistancia = Infinity;

      paineis.forEach(function (painel, i) {
        const distancia = Math.abs(painel.offsetLeft + painel.offsetWidth / 2 - meio);
        const perto = Math.min(1, Math.max(0, 1 - distancia / alcance));
        const foco = perto * perto * (3 - 2 * perto);
        painel.style.setProperty('--f', foco.toFixed(3));
        painel.classList.toggle('grupo-colado', foco > 0.55);
        if (distancia < menorDistancia) {
          menorDistancia = distancia;
          maisPerto = i;
        }
      });

      if (maisPerto !== atual) {
        atual = maisPerto;
        posicao.textContent = (atual + 1) + ' de ' + letras.length + ': Grupo ' + letras[atual];
        marcarIndicador(indicadores, atual);
      }
    }

    function pedirMedida() {
      if (quadroPedido) return;
      quadroPedido = true;
      requestAnimationFrame(medir);
    }
    janela.addEventListener('scroll', pedirMedida, { passive: true });
    window.addEventListener('resize', pedirMedida);

    document.getElementById('grupo-anterior').addEventListener('click', function () {
      irPara((atual - 1 + letras.length) % letras.length);
    });

    document.getElementById('grupo-proximo').addEventListener('click', function () {
      irPara((atual + 1) % letras.length);
    });

    carrossel.hidden = false;
    janela.scrollLeft = lugarDoPainel(0);
    medir();
  }

  montarCarrosselDasSedes();
  montarCarrosselDosGrupos();
});

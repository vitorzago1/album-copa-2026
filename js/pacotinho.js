document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  const palco = document.getElementById('palco');
  let rasgando = false;

  const TEMPO_DE_RASGAR = 800;

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

  function desenharPalco() {
    palco.textContent = '';
    const album = lerAlbum();
    if (temPacotinho(album)) desenharPacotinho(album);
    else desenharEspera();
  }

  function desenharPacotinho(album) {
    const titulo = criarElemento('h2', '', temPacotinhoDoDia(album) ? 'Pacotinho do dia' : 'Pacotinho extra');

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

  function rasgar() {
    if (rasgando) return;
    const resultado = abrirPacotinho();
    if (!resultado) {
      desenharPalco();
      return;
    }

    rasgando = true;
    atualizarLateral();
    palco.querySelector('.pacotinho').classList.add('pacotinho-rasgando');

    setTimeout(function () {
      rasgando = false;
      desenharMesa(resultado);
    }, movimentoReduzido() ? 0 : TEMPO_DE_RASGAR);
  }

  function desenharMesa(resultado) {
    palco.textContent = '';
    const total = resultado.figurinhas.length;
    let faltaVirar = total;

    const titulo = criarElemento('h2', '', 'Saiu do pacotinho');
    titulo.tabIndex = -1;
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
      casa.style.setProperty('--ordem', posicao);
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

    for (const casa of mesa.children) {
      casa.style.setProperty('--dx', Math.round(mesa.offsetLeft + mesa.offsetWidth / 2 - casa.offsetLeft - casa.offsetWidth / 2) + 'px');
      casa.style.setProperty('--dy', Math.round(mesa.offsetTop - casa.offsetTop) + 'px');
    }
    titulo.focus();
    avisar('Pacotinho aberto. ' + total + ' figurinhas de costas. Vire uma por uma.');

    virarTodas.addEventListener('click', function () {
      for (const fechada of mesa.querySelectorAll('[data-face="costas"]')) fechada.click();
    });

    function revelou(item, botao) {
      faltaVirar -= 1;
      botao.classList.add('figurinha-revelada');
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
          acrescentarOutro();
          verAlbum.focus();
        });
        linha.append(colarNovas);
      }
      linha.append(verAlbum);
      resumo.append(linha);
      acrescentarOutro();
      avisar(frase);

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

  atualizarLateral();
  desenharPalco();
});

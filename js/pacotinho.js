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

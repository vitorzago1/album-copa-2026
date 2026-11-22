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
    },

    parar: function () {
      for (const numero of numeros) {
        mostrarNumero(numero, numero.valor);
        numero.caixa.style.removeProperty('--aceso');
      }
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

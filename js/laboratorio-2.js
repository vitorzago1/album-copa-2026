// ============================================================================
// laboratorio-2.js
// ----------------------------------------------------------------------------
// A segunda página de testes (laboratorio-2.html): oito cenas presas à rolagem.
// Não é usada pelas 7 páginas do site.
//
// A ideia que se repete em todas as cenas:
//   1. A cena é uma seção bem alta (300vh = três telas de altura).
//   2. Dentro dela, o palco fica grudado na tela (position: sticky, no CSS).
//   3. Enquanto a pessoa rola por dentro da cena, o JavaScript transforma a
//      rolagem em um número de 0 a 1: o "progresso".
//   4. Cada cena tem uma função desenhar(progresso), que põe cada peça no
//      lugar certo para aquele progresso. Rolar para cima desfaz tudo.
//
// Depende de: js/dados.js e js/figurinha.js.
// ============================================================================

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // -------------------------------------------------------------------------
  // 1. Contas que todas as cenas usam
  // -------------------------------------------------------------------------

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

  // -------------------------------------------------------------------------
  // 2. O motor das cenas: mede a rolagem e chama o desenho de cada cena
  // -------------------------------------------------------------------------

  const elementosDasCenas = document.querySelectorAll('.cena');
  const cenas = [];

  // Guarda uma cena na lista. "sempre" = redesenhar a cada quadro, mesmo com a
  // rolagem parada (a cena 25 usa, porque os pontinhos balançam sozinhos).
  function registrarCena(posicao, desenhar, sempre) {
    const elemento = elementosDasCenas[posicao];
    cenas.push({
      elemento: elemento,
      nome: elemento.dataset.nome,
      medidor: elemento.querySelector('[data-medidor]'),
      trilho: elemento.querySelector('[data-trilho]'),
      alvo: 0,          // o progresso que a rolagem pede agora
      p: 0,             // o progresso mostrado (corre atrás do alvo, com suavidade)
      naTela: false,
      suja: true,       // "precisa ser redesenhada"
      comecou: false,
      marcado: -1,
      desenhar: desenhar,
      sempre: sempre === true,
    });
  }

  const nomeDaCenaAtual = document.getElementById('cena-atual');
  const fimDasCenas = document.querySelector('.lab2-fim');

  // Transforma a posição de cada cena na tela em progresso de 0 a 1.
  // caixa.top é a distância do topo da cena até o topo da tela: começa em 0
  // (a cena acabou de grudar) e vai ficando negativa conforme a pessoa rola.
  function medirCenas() {
    const alturaDaTela = window.innerHeight;
    let nome = 'Abertura';

    for (const cena of cenas) {
      const caixa = cena.elemento.getBoundingClientRect();
      cena.alvo = limitar(-caixa.top / (caixa.height - alturaDaTela));
      cena.naTela = caixa.bottom > 0 && caixa.top < alturaDaTela;
      if (caixa.top < alturaDaTela / 2) nome = cena.nome;
    }
    if (fimDasCenas.getBoundingClientRect().top < alturaDaTela / 2) nome = 'Escolhas';
    if (nomeDaCenaAtual.textContent !== nome) nomeDaCenaAtual.textContent = nome;
  }

  // Um "quadro": o navegador chama esta função cerca de 60 vezes por segundo
  function quadro(agora) {
    medirCenas();
    const reduzido = movimentoReduzido();

    for (const cena of cenas) {
      if (!cena.naTela) continue;

      const antes = cena.p;
      if (reduzido || !cena.comecou) {
        cena.p = cena.alvo;   // sem suavização: a cena vai direto para onde a rolagem está
        cena.comecou = true;
      } else {
        // Suavização: a cada quadro, anda 14% do caminho que falta até o alvo
        cena.p += (cena.alvo - cena.p) * 0.14;
        if (Math.abs(cena.alvo - cena.p) < 0.0004) cena.p = cena.alvo;
      }

      if (cena.p !== antes || cena.suja || (cena.sempre && !reduzido)) {
        cena.desenhar(cena.p, agora, reduzido);
        cena.suja = false;

        // O medidor do canto
        const cem = Math.round(cena.p * 100);
        if (cem !== cena.marcado) {
          cena.marcado = cem;
          cena.medidor.textContent = String(cem).padStart(3, '0');
          cena.trilho.style.setProperty('--p', cena.p.toFixed(3));
        }
      }
    }
    requestAnimationFrame(quadro);
  }

  function sujarTudo() {
    for (const cena of cenas) cena.suja = true;
  }

  // -------------------------------------------------------------------------
  // Cena 25: a retícula forma a marca (partículas em canvas)
  // -------------------------------------------------------------------------
  // Passos:
  //   a) escrever "Colei!" em uma tela escondida;
  //   b) olhar essa tela ponto por ponto e guardar onde há tinta;
  //   c) dar a cada ponto um lugar "solto", em uma retícula que cobre o palco;
  //   d) a cada quadro, desenhar cada pontinho entre o lugar solto e o lugar
  //      final, conforme o progresso.

  const telaReticula = document.getElementById('tela-reticula');
  const pincel = telaReticula.getContext('2d');
  const palcoReticula = telaReticula.parentElement;
  const convite = document.getElementById('reticula-convite');
  const assinatura = document.getElementById('reticula-assinatura');
  let pontos = [];
  let larguraDaTela = 0;
  let alturaDaTelaDeDesenho = 0;
  let vaoSolto = 10;
  let corDaTinta = '#14204F';
  const ponteiro = { x: -9999, y: -9999 };

  function lerCorDaTinta() {
    corDaTinta = getComputedStyle(document.documentElement).getPropertyValue('--cor-texto').trim() || '#14204F';
  }

  function montarReticula() {
    const caixa = telaReticula.getBoundingClientRect();
    const largura = Math.max(1, Math.round(caixa.width));
    const altura = Math.max(1, Math.round(caixa.height));
    // Em tela de celular, cada pixel do CSS tem 2 ou 3 pixels de verdade:
    // a tela de desenho é criada maior para os pontinhos saírem nítidos.
    const nitidez = Math.min(window.devicePixelRatio || 1, 2);
    telaReticula.width = largura * nitidez;
    telaReticula.height = altura * nitidez;
    pincel.setTransform(nitidez, 0, 0, nitidez, 0, 0);
    larguraDaTela = largura;
    alturaDaTelaDeDesenho = altura;

    // a) A palavra, em uma tela escondida do mesmo tamanho
    const rascunho = document.createElement('canvas');
    rascunho.width = largura;
    rascunho.height = altura;
    const lapis = rascunho.getContext('2d', { willReadFrequently: true });
    let corpo = Math.min(altura * 0.42, largura * 0.36);   // tamanho da letra
    const fonte = function () { return '900 ' + corpo + 'px "Londrina Solid", "Arial Black", sans-serif'; };
    lapis.font = fonte();
    const larguraDaPalavra = lapis.measureText('Colei!').width;
    if (larguraDaPalavra > largura * 0.86) corpo *= (largura * 0.86) / larguraDaPalavra;
    lapis.font = fonte();
    lapis.textAlign = 'center';
    lapis.textBaseline = 'middle';
    const meioX = largura / 2;
    const meioY = 56 + (altura - 56 - 88) * 0.44;   // o meio do espaço entre a barra e a ficha
    lapis.fillText('Colei!', meioX, meioY);
    assinatura.style.top = Math.round(meioY + corpo * 0.5) + 'px';

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

    // c) Os lugares soltos: uma retícula comum, cobrindo o palco inteiro,
    //    com (quase) a mesma quantidade de pontos.
    const quantos = finais.length;
    vaoSolto = Math.sqrt((largura * altura) / (Math.max(1, quantos) * 0.866)) * 0.98;
    let soltos = [];
    linha = 0;
    for (let y = vaoSolto / 2; y < altura; y += vaoSolto * 0.866) {
      for (let x = (linha % 2) * vaoSolto / 2; x < largura; x += vaoSolto) soltos.push({ x: x, y: y });
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
    cenas[0].suja = true;
  }

  function desenharReticula(p, agora, reduzido) {
    const andamento = limitar((p - 0.04) / 0.74);
    const raioSolto = vaoSolto * 0.13;

    pincel.clearRect(0, 0, larguraDaTela, alturaDaTelaDeDesenho);
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
        if (!reduzido) {
          x += Math.sin(agora / 900 + ponto.fase) * 2.5 * falta;
          y += Math.cos(agora / 1100 + ponto.fase) * 2.5 * falta;
        }
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

    convite.style.opacity = 1 - trecho(0.02, 0.14, p);
    const chegou = trecho(0.8, 0.93, p);
    assinatura.style.opacity = chegou;
    assinatura.style.transform = 'translateY(' + ((1 - chegou) * 16) + 'px)';
  }

  palcoReticula.addEventListener('pointermove', function (evento) {
    const caixa = telaReticula.getBoundingClientRect();
    ponteiro.x = evento.clientX - caixa.left;
    ponteiro.y = evento.clientY - caixa.top;
  });
  palcoReticula.addEventListener('pointerleave', function () {
    ponteiro.x = -9999;
    ponteiro.y = -9999;
  });

  registrarCena(0, desenharReticula, true);

  // -------------------------------------------------------------------------
  // Cena 26: o pacotinho gira e abre (3D em CSS, vista explodida)
  // -------------------------------------------------------------------------

  const pacote = document.getElementById('pacote3d');
  const abaDoPacote = document.getElementById('pacote3d-aba');
  const cenaDoPacote = pacote.parentElement;
  const tituloDoPacote1 = document.getElementById('pacote-titulo-1');
  const tituloDoPacote2 = document.getElementById('pacote-titulo-2');
  const cartas = [50, 222, 54, 193, 276].map(function (numero) {
    const carta = criarElemento('div', 'pacote-carta');
    carta.append(criarFigurinha(figurinhaPorNumero(numero), {}));
    document.getElementById('pacote-figurinhas').append(carta);
    return carta;
  });
  let alturaDoPacote = 300;
  let passoDoLeque = 120;

  function medirPacote() {
    alturaDoPacote = cenaDoPacote.offsetHeight;
    const larguraDaCarta = cartas[0].offsetWidth;
    // No celular as cinco não cabem lado a lado: o leque fica mais fechado
    passoDoLeque = Math.min(larguraDaCarta * 1.08, (cenaDoPacote.parentElement.clientWidth - larguraDaCarta * 1.3 - 24) / 4);
  }

  function desenharPacote(p) {
    const chegada = trecho(0, 0.3, p);        // o pacotinho entra girando
    const rasgo = trecho(0.3, 0.44, p);       // a aba sai pelo picote
    const descida = trecho(0.55, 0.85, p);    // o pacotinho vazio desce e deita

    const giro = misturar(-205, 0, chegada);
    const tombo = misturar(22, 0, chegada) + descida * 55;
    const sobe = misturar(alturaDoPacote * 0.5, 0, chegada) + descida * alturaDoPacote * 0.55;
    const tamanho = misturar(0.7, 1, chegada);
    pacote.style.transform = 'translateY(' + sobe + 'px) rotateX(' + tombo + 'deg) rotateY(' + giro + 'deg) scale(' + tamanho + ')';
    pacote.style.opacity = trecho(0, 0.06, p) * (1 - trecho(0.66, 0.84, p));

    abaDoPacote.style.transform = 'translate(' + (rasgo * 70) + '%, ' + (rasgo * -190) + '%) rotate(' + (rasgo * 38) + 'deg)';
    abaDoPacote.style.opacity = 1 - trecho(0.36, 0.46, p);

    // As cinco figurinhas: sobem por dentro do pacotinho, passam para a frente
    // e abrem em leque. Cada uma começa um pouco depois da anterior.
    cartas.forEach(function (carta, i) {
      const t = trecho(0.42 + i * 0.03, 0.76 + i * 0.03, p);
      const lado = i - 2;   // -2, -1, 0, 1, 2: a do meio fica no meio
      const x = lado * passoDoLeque * t * t;
      const y = misturar(0, alturaDoPacote * 0.04, t) - Math.sin(t * Math.PI) * alturaDoPacote * 0.6;
      // Profundidade: começa atrás da frente do pacotinho e termina na frente de tudo
      const z = misturar(-(34 + i * 2), 40 + (2 - Math.abs(lado)) * 16, trecho(0.5, 0.8, t));
      const giroDaCarta = lado * 5 * t;
      const viradaDaCarta = Math.sin(t * Math.PI) * -20;   // vira de lado só no meio do caminho
      carta.style.transform = 'translate3d(' + x + 'px, ' + y + 'px, ' + z + 'px) rotateY(' + viradaDaCarta + 'deg) rotate(' + giroDaCarta + 'deg)';
      // Só aparece quando o pacotinho já está de frente (antes disso ficaria de fora, no giro)
      carta.style.opacity = trecho(0.3, 0.34, p);
    });

    const entra1 = trecho(0.02, 0.1, p);
    tituloDoPacote1.style.opacity = entra1 * (1 - trecho(0.26, 0.34, p));
    tituloDoPacote1.style.transform = 'translateY(' + ((1 - entra1) * 18) + 'px)';
    const entra2 = trecho(0.76, 0.88, p);
    tituloDoPacote2.style.opacity = entra2;
    tituloDoPacote2.style.transform = 'translateY(' + ((1 - entra2) * 18) + 'px)';
  }

  registrarCena(1, desenharPacote);

  // -------------------------------------------------------------------------
  // Cena 27: a frase acende (texto preso à rolagem)
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

  function desenharFrase(p) {
    palavras.forEach(function (palavra, i) {
      // A primeira palavra acende com 6% da cena; a última, com 76%
      palavra.classList.toggle('acesa', p > 0.06 + (i / palavras.length) * 0.7);
    });
    tracoDaFrase.style.setProperty('--falta', (1 - trecho(0.8, 0.96, p)).toFixed(3));
  }

  registrarCena(2, desenharFrase);

  // -------------------------------------------------------------------------
  // Cena 28: o álbum abre (livro 3D em CSS)
  // -------------------------------------------------------------------------

  const livro = document.getElementById('livro');
  const folhaCapa = document.getElementById('folha-capa');
  const folha1 = document.getElementById('folha-1');
  const tituloDoLivro = document.getElementById('livro-titulo');

  // Monta uma página do álbum: o nome da seleção e as seis figurinhas dela,
  // umas coladas e outras ainda em vaga
  function montarPagina(idDaFace, selecao) {
    const miolo = criarElemento('div', 'miolo');

    const cabeca = criarElemento('div', 'miolo-cabeca');
    const bandeira = document.createElement('img');
    bandeira.src = 'assets/bandeiras/' + selecao.bandeira + '.svg';
    bandeira.alt = '';
    cabeca.append(bandeira, criarElemento('span', 'miolo-nome', selecao.nome), criarElemento('span', 'miolo-grupo', 'Grupo ' + selecao.grupo));

    const grade = criarElemento('div', 'miolo-grade');
    const figurinhas = FIGURINHAS.filter(function (fig) { return fig.selecao === selecao.id; });
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

  function medirLivro() {
    // O miolo foi desenhado com 480 px de largura: aqui se calcula o quanto
    // encolher ou aumentar para caber na folha (descontando a borda de 2 px de cada lado)
    livro.style.setProperty('--escala', ((livro.offsetWidth - 4) / 480).toFixed(4));
  }

  function desenharLivro(p) {
    const levanta = trecho(0, 0.16, p);    // o álbum deitado se levanta
    const capa = trecho(0.14, 0.5, p);     // a capa vira
    const folha = trecho(0.6, 0.9, p);     // a primeira folha vira

    // Fechado, o álbum fica no meio do palco. Aberto, quem fica no meio é a
    // lombada: por isso ele anda meia página para a direita enquanto a capa vira.
    const inclinado = misturar(58, 14, levanta) - trecho(0.9, 1, p) * 6;
    livro.style.transform = 'translateX(' + (capa * 50) + '%) rotateX(' + inclinado + 'deg) scale(' + misturar(0.72, 1, levanta) + ')';

    // Cada folha gira até 180 graus em torno da lombada. As sobras de menos de
    // um grau deixam a folha de cima um fio acima da de baixo, para o navegador
    // nunca ficar em dúvida sobre qual está na frente.
    const anguloDaCapa = misturar(-0.6, -180, capa);
    const anguloDaFolha = misturar(-0.3, -179.7, folha);
    folhaCapa.style.transform = 'rotateY(' + anguloDaCapa + 'deg)';
    folha1.style.transform = 'rotateY(' + anguloDaFolha + 'deg)';
    folhaCapa.style.zIndex = capa > 0.5 ? 1 : 3;
    folha1.style.zIndex = 2;

    // A sombra é mais forte com a folha em pé (90 graus) e some com ela deitada
    folhaCapa.style.setProperty('--sombra', (Math.sin(capa * Math.PI) * 0.7).toFixed(3));
    folha1.style.setProperty('--sombra', (Math.sin(folha * Math.PI) * 0.7).toFixed(3));

    tituloDoLivro.style.opacity = 1 - trecho(0.2, 0.32, p);
  }

  registrarCena(3, desenharLivro);

  // -------------------------------------------------------------------------
  // Cena 29: mergulho na figurinha (zoom que atravessa)
  // -------------------------------------------------------------------------

  const mergulho = document.getElementById('mergulho');
  const fimDoMergulho = document.getElementById('mergulho-fim');
  const etiquetaDoMergulho = fimDoMergulho.querySelector('.cena-titulo-estatico');
  const figurinhaDoMergulho = criarFigurinha(figurinhaPorNumero(54), {});
  const giroDoMergulho = giroDaFigurinha(54) + 4;
  mergulho.append(figurinhaDoMergulho);
  // A camada de cor do fim usa a mesma cor do retrato da figurinha
  fimDoMergulho.style.setProperty('--campo', selecaoPorId(figurinhaPorNumero(54).selecao).cores.campo);
  let aumentoMaximo = 30;

  function medirMergulho() {
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
  }

  function desenharMergulho(p) {
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
  }

  registrarCena(4, desenharMergulho);

  // -------------------------------------------------------------------------
  // Cena 30: os números contam (contador preso à rolagem)
  // -------------------------------------------------------------------------

  // Os valores vêm dos dados do site, não de números escritos à mão
  const VALORES = [SELECOES.length, FIGURINHAS.length, SEDES.length, COPA.numeros.jogos];
  const numeros = Array.from(document.querySelectorAll('#numeros .numero')).map(function (caixa, i) {
    const visor = caixa.querySelector('.numero-valor');
    visor.setAttribute('aria-hidden', 'true');   // o leitor de tela lê só o valor final, logo abaixo
    caixa.prepend(criarElemento('span', 'escondido', String(VALORES[i])));
    return { caixa: caixa, visor: visor, valor: VALORES[i], mostrado: -1 };
  });

  function desenharNumeros(p) {
    numeros.forEach(function (numero, i) {
      const t = trecho(0.08 + i * 0.2, 0.3 + i * 0.2, p);   // cada número tem a sua vez
      const agora = Math.round(numero.valor * t);
      if (agora !== numero.mostrado) {
        numero.mostrado = agora;
        numero.visor.textContent = String(agora);
      }
      numero.caixa.style.setProperty('--aceso', t.toFixed(3));
    });
  }

  registrarCena(5, desenharNumeros);

  // -------------------------------------------------------------------------
  // Cena 31: as sedes andam para o lado (rolagem horizontal)
  // -------------------------------------------------------------------------

  const trilha = document.getElementById('trilha');
  const paineis = SEDES.map(function (sede, i) {
    const painel = document.createElement('figure');
    painel.className = 'sede';

    const moldura = criarElemento('div', 'foto');
    moldura.style.setProperty('--torto', (i % 2 === 0 ? -1.4 : 1.2) + 'deg');
    const foto = document.createElement('img');
    foto.src = 'assets/img/sedes/' + sede.id + '.jpg';
    foto.alt = sede.foto.alt;
    foto.loading = 'lazy';     // a foto só é baixada quando está chegando perto da tela
    foto.decoding = 'async';
    moldura.append(foto);

    const legenda = document.createElement('figcaption');
    legenda.append(
      criarElemento('span', 'sede-conta', (i + 1) + ' de ' + SEDES.length + ', ' + sede.pais),
      criarElemento('span', 'sede-cidade', sede.cidade),
      criarElemento('span', 'sede-estadio', sede.estadio + ', ' + sede.jogos + ' jogos'),
      // As fotos têm licença Creative Commons: o crédito acompanha a foto
      criarElemento('span', 'sede-credito', 'Foto: ' + sede.foto.autor + ', ' + sede.foto.licenca)
    );

    painel.append(moldura, legenda);
    trilha.append(painel);
    return { painel: painel, moldura: moldura, centro: 0, foco: -1 };
  });
  let sobraDaTrilha = 0;
  let larguraDoPalcoDasSedes = 0;

  function medirTrilha() {
    larguraDoPalcoDasSedes = trilha.parentElement.clientWidth;
    sobraDaTrilha = Math.max(0, trilha.scrollWidth - larguraDoPalcoDasSedes);   // o quanto a faixa passa da tela
    for (const item of paineis) item.centro = item.painel.offsetLeft + item.painel.offsetWidth / 2;
  }

  function desenharTrilha(p) {
    // A rolagem para baixo vira deslocamento para a esquerda
    const deslocamento = trecho(0.03, 0.97, p) * sobraDaTrilha;
    trilha.style.transform = 'translate3d(' + (-deslocamento).toFixed(1) + 'px, 0, 0)';

    const meio = larguraDoPalcoDasSedes / 2;
    for (const item of paineis) {
      // A que distância esta foto está do meio da tela? 1 = bem no meio
      const perto = limitar(1 - Math.abs(item.centro - deslocamento - meio) / (larguraDoPalcoDasSedes * 0.42));
      const foco = Number((perto * perto * (3 - 2 * perto)).toFixed(3));
      if (foco === item.foco) continue;
      item.foco = foco;
      item.moldura.style.setProperty('--f', foco);
      item.painel.classList.toggle('sede-colada', foco > 0.55);
    }
  }

  registrarCena(6, desenharTrilha);

  // -------------------------------------------------------------------------
  // Cena 32: voo pelas figurinhas (câmera em profundidade)
  // -------------------------------------------------------------------------

  const voo = document.getElementById('voo');
  const tituloDoVoo = document.getElementById('voo-titulo');
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
      x: 0, y: 0,
      aparece: -1,
    });
  }

  function medirVoo() {
    const palco = voo.parentElement;
    const largura = palco.clientWidth;
    const altura = palco.clientHeight;
    for (const item of itensDoVoo) {
      item.x = item.lugarX * largura;
      item.y = item.lugarY * altura * 0.8;
      // O meio fica livre: a câmera passa por ali, e é onde entra o título
      if (Math.abs(item.x) < largura * 0.16 && Math.abs(item.y) < altura * 0.22) {
        item.x = (item.lugarX < 0 ? -1 : 1) * largura * (0.16 + Math.abs(item.lugarY) * 0.2);
      }
      item.elemento.style.transform = 'translate3d(' + item.x.toFixed(0) + 'px, ' + item.y.toFixed(0) + 'px, ' + item.z.toFixed(0) + 'px) rotateY(' + item.virada.toFixed(1) + 'deg) rotate(' + item.giro.toFixed(1) + 'deg)';
    }
  }

  function desenharVoo(p) {
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
    tituloDoVoo.style.opacity = chegou;
    tituloDoVoo.style.scale = misturar(0.86, 1, chegou).toFixed(3);
  }

  registrarCena(7, desenharVoo);

  // -------------------------------------------------------------------------
  // 3. Medidas: tudo o que depende do tamanho da tela é medido de novo
  //    quando a janela muda de tamanho
  // -------------------------------------------------------------------------

  function medirTudo() {
    montarReticula();
    medirPacote();
    medirLivro();
    medirMergulho();
    medirTrilha();
    medirVoo();
    sujarTudo();
  }

  let esperaDaJanela = 0;
  window.addEventListener('resize', function () {
    // Espera a pessoa parar de arrastar a janela, para não medir cem vezes
    clearTimeout(esperaDaJanela);
    esperaDaJanela = setTimeout(medirTudo, 150);
  });

  // Trocar o tema ou o tamanho da letra no painel de acessibilidade muda cores
  // e medidas: um vigia avisa quando os atributos do <html> mudam.
  new MutationObserver(function () {
    lerCorDaTinta();
    medirTudo();
  }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-tema', 'data-contraste', 'data-fonte', 'data-espacamento'] });

  // -------------------------------------------------------------------------
  // 4. Aviso de menos movimento
  // -------------------------------------------------------------------------

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.getElementById('aviso-movimento').hidden = false;
  }

  document.getElementById('forcar-movimento').addEventListener('click', function () {
    const raiz = document.documentElement;
    raiz.dataset.movimento = 'completo';
    // O painel de acessibilidade reescreve esse atributo quando é usado.
    // Este vigia põe o "completo" de volta sempre que isso acontecer.
    new MutationObserver(function () {
      if (raiz.dataset.movimento === 'normal') raiz.dataset.movimento = 'completo';
    }).observe(raiz, { attributes: true, attributeFilter: ['data-movimento'] });
    document.getElementById('forcar-aviso').textContent = 'Movimento completo ligado nesta página, até ela ser fechada ou recarregada.';
  });

  // -------------------------------------------------------------------------
  // 5. A lista de escolhas
  // -------------------------------------------------------------------------
  // explicar = o quanto é fácil explicar o código na apresentação

  const OPCOES = [
    { id: 'reticula', numero: 25, nome: 'A retícula forma a marca', onde: 'Abertura da página inicial, antes do título.', como: 'O JavaScript escreve "Colei!" em uma tela escondida, lê onde ficou a tinta e guarda um ponto para cada lugar. A rolagem leva cada ponto do lugar solto até o lugar dele.', explicar: 'Difícil. Usa canvas e leitura de pixels.' },
    { id: 'pacote3d', numero: 26, nome: 'O pacotinho gira e abre', onde: 'Página inicial, na parte que apresenta o pacotinho do dia. A abertura de verdade, na página Pacotinhos, continua com o botão.', como: 'O pacotinho tem frente e costas no espaço 3D do CSS (perspective e rotateY). A rolagem muda os ângulos e as posições.', explicar: 'Médio. São transformações de CSS trocadas pelo JavaScript.' },
    { id: 'frase', numero: 27, nome: 'A frase acende', onde: 'Página inicial, logo depois da abertura, no lugar de um parágrafo comum.', como: 'A frase é dividida em palavras. Cada palavra ganha uma classe quando a rolagem passa do ponto dela.', explicar: 'Fácil.' },
    { id: 'album3d', numero: 28, nome: 'O álbum abre', onde: 'Página inicial, na chamada para o álbum.', como: 'Três folhas empilhadas, cada uma girando em torno da lombada (rotateY com transform-origin na borda esquerda).', explicar: 'Médio.' },
    { id: 'mergulho', numero: 29, nome: 'Mergulho na figurinha', onde: 'Passagem entre duas seções da página inicial.', como: 'Um aumento (scale) que cresce com a rolagem, mirando em um ponto liso do retrato.', explicar: 'Fácil.' },
    { id: 'numeros', numero: 30, nome: 'Os números contam', onde: 'Página inicial ou página Sobre.', como: 'Cada número mostrado é o valor final multiplicado pelo progresso do trecho dele.', explicar: 'Fácil.' },
    { id: 'sedes', numero: 31, nome: 'As sedes andam para o lado', onde: 'Uma faixa na página inicial. O carrossel das sedes continua como está, com os botões. Esta cena pode mostrar os 12 grupos, ou as sedes em outra página.', como: 'A faixa é mais larga que a tela. A rolagem para baixo vira deslocamento para o lado (translate).', explicar: 'Fácil.' },
    { id: 'voo', numero: 32, nome: 'Voo pelas figurinhas', onde: 'Fim da página inicial, antes do botão de abrir o pacotinho.', como: 'Cada figurinha tem uma profundidade (translateZ). A rolagem traz o conjunto inteiro para a frente.', explicar: 'Médio.' },
  ];

  const EXTRAS = [
    { id: 'quadros', nome: 'Sequência de quadros, o efeito exato dos AirPods', texto: 'A Apple grava o produto girando, salva cerca de 150 imagens, e a rolagem escolhe qual imagem aparece em um canvas. Precisa de um vídeo ou de uma sequência de imagens de um objeto filmado ou modelado em 3D. O projeto não tem esse material. Dá para gerar as imagens a partir do pacotinho da cena 26, mas o resultado seria o mesmo da cena 26, com alguns megabytes a mais.', rotulo: 'Quero mesmo assim', sim: 'quero', nao: 'não quero' },
    { id: 'threejs', nome: '3D de verdade com a biblioteca Three.js', texto: 'É o que o laboratório do outro projeto usa: tecido, luz e objetos com volume, desenhados pela placa de vídeo (WebGL). Precisa da biblioteca Three.js, de cerca de 600 KB, guardada dentro do projeto. Pela regra do projeto, biblioteca só entra com a sua autorização e com justificativa no README. É a parte mais difícil de explicar na apresentação.', rotulo: 'Autorizo usar a Three.js', sim: 'autorizada', nao: 'não autorizada' },
  ];

  const CHAVE = 'colei.laboratorio2';
  let guardado = { quero: [], notas: '' };
  try {
    guardado = Object.assign(guardado, JSON.parse(localStorage.getItem(CHAVE)));
  } catch (erro) {
    // Sem nada guardado: começa vazio.
  }

  function guardar() {
    try {
      localStorage.setItem(CHAVE, JSON.stringify(guardado));
    } catch (erro) {
      // Sem localStorage, as escolhas valem até fechar a página.
    }
  }

  // A caixa de marcar, com o rótulo ao lado
  function criarChave(id, rotulo) {
    const caixa = document.createElement('input');
    caixa.type = 'checkbox';
    caixa.dataset.quero = id;
    caixa.checked = guardado.quero.includes(id);
    const chave = criarElemento('label', 'opcao lab-quero');
    chave.append(caixa, criarElemento('span', '', rotulo));
    return chave;
  }

  for (const opcao of OPCOES) {
    const ficha = criarElemento('div', 'lab2-escolha');
    const titulo = document.createElement('h3');
    titulo.append(criarElemento('span', 'lab2-n', String(opcao.numero)), opcao.nome);
    const dados = document.createElement('dl');
    dados.append(
      criarElemento('dt', '', 'Onde eu usaria'), criarElemento('dd', '', opcao.onde),
      criarElemento('dt', '', 'Como funciona'), criarElemento('dd', '', opcao.como),
      criarElemento('dt', '', 'Explicar o código na apresentação'), criarElemento('dd', '', opcao.explicar)
    );
    ficha.append(titulo, dados, criarChave(opcao.id, 'Quero no site'));
    document.getElementById('escolhas').append(ficha);
  }

  for (const extra of EXTRAS) {
    const ficha = criarElemento('div', 'lab2-escolha');
    ficha.append(criarElemento('h4', '', extra.nome), criarElemento('p', '', extra.texto), criarChave(extra.id, extra.rotulo));
    document.getElementById('escolhas-extras').append(ficha);
  }

  const campoNotas = document.getElementById('escolhas-notas');
  const campoTexto = document.getElementById('escolhas-texto');
  campoNotas.value = guardado.notas;

  function escreverLista() {
    const marcadas = OPCOES.filter(function (opcao) { return guardado.quero.includes(opcao.id); });
    const naoMarcadas = OPCOES.filter(function (opcao) { return !guardado.quero.includes(opcao.id); });

    const linhas = ['Escolhas do laboratório 2 do Colei!'];
    linhas.push('Quero (' + marcadas.length + '): ' + (marcadas.length > 0 ? marcadas.map(function (o) { return o.numero + ' ' + o.nome; }).join('; ') : 'nada'));
    linhas.push('Não marquei: ' + (naoMarcadas.length > 0 ? naoMarcadas.map(function (o) { return o.numero; }).join(', ') : 'nada'));
    for (const extra of EXTRAS) {
      linhas.push(extra.nome + ': ' + (guardado.quero.includes(extra.id) ? extra.sim : extra.nao));
    }
    linhas.push('Observações: ' + (campoNotas.value.trim() || 'nenhuma'));
    campoTexto.value = linhas.join('\n');
  }

  // Um ouvinte só para todas as caixas de marcar
  document.addEventListener('change', function (evento) {
    const id = evento.target.dataset ? evento.target.dataset.quero : undefined;
    if (!id) return;
    guardado.quero = guardado.quero.filter(function (outro) { return outro !== id; });
    if (evento.target.checked) guardado.quero.push(id);
    guardar();
    escreverLista();
  });

  campoNotas.addEventListener('input', function () {
    guardado.notas = campoNotas.value;
    guardar();
    escreverLista();
  });

  document.getElementById('escolhas-copiar').addEventListener('click', function () {
    const aviso = document.getElementById('escolhas-aviso');
    function selecionar() {
      campoTexto.focus();
      campoTexto.select();
      aviso.textContent = 'O texto está selecionado. Aperte Ctrl+C para copiar.';
    }
    if (!navigator.clipboard) {
      selecionar();
      return;
    }
    navigator.clipboard.writeText(campoTexto.value).then(function () {
      aviso.textContent = 'Lista copiada. Agora é só colar na conversa com o Claude.';
    }, selecionar);
  });

  // -------------------------------------------------------------------------
  // 6. Começar
  // -------------------------------------------------------------------------

  lerCorDaTinta();
  escreverLista();
  medirTudo();
  requestAnimationFrame(quadro);

  // As letras de "Colei!" só podem ser lidas depois que a fonte do site chegar.
  // Quando ela chega (e quando as fotos carregam, mudando larguras), mede-se de novo.
  if (document.fonts && document.fonts.load) {
    document.fonts.load('900 100px "Londrina Solid"').then(medirTudo, medirTudo);
  }
  window.addEventListener('load', medirTudo);
});

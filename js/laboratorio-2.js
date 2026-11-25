document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  function limitar(valor) {
    return Math.min(1, Math.max(0, valor));
  }

  function trecho(inicio, fim, p) {
    const t = limitar((p - inicio) / (fim - inicio));
    return t * t * (3 - 2 * t);
  }

  function misturar(a, b, t) {
    return a + (b - a) * t;
  }

  function sorteador(semente) {
    return function () {
      semente = (semente * 1664525 + 1013904223) % 4294967296;
      return semente / 4294967296;
    };
  }

  const elementosDasCenas = document.querySelectorAll('.cena');
  const cenas = [];

  function registrarCena(posicao, desenhar, sempre) {
    const elemento = elementosDasCenas[posicao];
    cenas.push({
      elemento: elemento,
      nome: elemento.dataset.nome,
      medidor: elemento.querySelector('[data-medidor]'),
      trilho: elemento.querySelector('[data-trilho]'),
      alvo: 0,
      p: 0,
      naTela: false,
      suja: true,
      comecou: false,
      marcado: -1,
      desenhar: desenhar,
      sempre: sempre === true,
    });
  }

  const nomeDaCenaAtual = document.getElementById('cena-atual');
  const fimDasCenas = document.querySelector('.lab2-fim');

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

  function quadro(agora) {
    medirCenas();
    const reduzido = movimentoReduzido();

    for (const cena of cenas) {
      if (!cena.naTela) continue;

      const antes = cena.p;
      if (reduzido || !cena.comecou) {
        cena.p = cena.alvo;
        cena.comecou = true;
      } else {
        cena.p += (cena.alvo - cena.p) * 0.14;
        if (Math.abs(cena.alvo - cena.p) < 0.0004) cena.p = cena.alvo;
      }

      if (cena.p !== antes || cena.suja || (cena.sempre && !reduzido)) {
        cena.desenhar(cena.p, agora, reduzido);
        cena.suja = false;

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
    const nitidez = Math.min(window.devicePixelRatio || 1, 2);
    telaReticula.width = largura * nitidez;
    telaReticula.height = altura * nitidez;
    pincel.setTransform(nitidez, 0, 0, nitidez, 0, 0);
    larguraDaTela = largura;
    alturaDaTelaDeDesenho = altura;

    const rascunho = document.createElement('canvas');
    rascunho.width = largura;
    rascunho.height = altura;
    const lapis = rascunho.getContext('2d', { willReadFrequently: true });
    let corpo = Math.min(altura * 0.42, largura * 0.36);
    const fonte = function () { return '900 ' + corpo + 'px "Londrina Solid", "Arial Black", sans-serif'; };
    lapis.font = fonte();
    const larguraDaPalavra = lapis.measureText('Colei!').width;
    if (larguraDaPalavra > largura * 0.86) corpo *= (largura * 0.86) / larguraDaPalavra;
    lapis.font = fonte();
    lapis.textAlign = 'center';
    lapis.textBaseline = 'middle';
    const meioX = largura / 2;
    const meioY = 56 + (altura - 56 - 88) * 0.44;
    lapis.fillText('Colei!', meioX, meioY);
    assinatura.style.top = Math.round(meioY + corpo * 0.5) + 'px';

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
    vaoSolto = Math.sqrt((largura * altura) / (Math.max(1, quantos) * 0.866)) * 0.98;
    let soltos = [];
    linha = 0;
    for (let y = vaoSolto / 2; y < altura; y += vaoSolto * 0.866) {
      for (let x = (linha % 2) * vaoSolto / 2; x < largura; x += vaoSolto) soltos.push({ x: x, y: y });
      linha += 1;
    }
    const sobra = soltos.length;
    if (sobra > quantos) {
      soltos = soltos.filter(function (lugar, i) {
        return Math.floor(i * quantos / sobra) !== Math.floor((i - 1) * quantos / sobra);
      });
    }

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
      const descida = (fim.y - topo) / Math.max(1, base - topo);
      return {
        xSolto: solto.x, ySolto: solto.y,
        xFim: fim.x, yFim: fim.y,
        raioFim: passo * misturar(0.3, 0.57, descida),
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
      const e = t * t * (3 - 2 * t);
      const falta = 1 - e;

      const dx = ponto.xFim - ponto.xSolto;
      const dy = ponto.yFim - ponto.ySolto;
      const curva = Math.sin(e * Math.PI) * 0.2;
      let x = ponto.xSolto + dx * e - dy * curva;
      let y = ponto.ySolto + dy * e + dx * curva;
      let raio = misturar(raioSolto, ponto.raioFim, e);

      if (falta > 0.01) {
        if (!reduzido) {
          x += Math.sin(agora / 900 + ponto.fase) * 2.5 * falta;
          y += Math.cos(agora / 1100 + ponto.fase) * 2.5 * falta;
        }
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
    passoDoLeque = Math.min(larguraDaCarta * 1.08, (cenaDoPacote.parentElement.clientWidth - larguraDaCarta * 1.3 - 24) / 4);
  }

  function desenharPacote(p) {
    const chegada = trecho(0, 0.3, p);
    const rasgo = trecho(0.3, 0.44, p);
    const descida = trecho(0.55, 0.85, p);

    const giro = misturar(-205, 0, chegada);
    const tombo = misturar(22, 0, chegada) + descida * 55;
    const sobe = misturar(alturaDoPacote * 0.5, 0, chegada) + descida * alturaDoPacote * 0.55;
    const tamanho = misturar(0.7, 1, chegada);
    pacote.style.transform = 'translateY(' + sobe + 'px) rotateX(' + tombo + 'deg) rotateY(' + giro + 'deg) scale(' + tamanho + ')';
    pacote.style.opacity = trecho(0, 0.06, p) * (1 - trecho(0.66, 0.84, p));

    abaDoPacote.style.transform = 'translate(' + (rasgo * 70) + '%, ' + (rasgo * -190) + '%) rotate(' + (rasgo * 38) + 'deg)';
    abaDoPacote.style.opacity = 1 - trecho(0.36, 0.46, p);

    cartas.forEach(function (carta, i) {
      const t = trecho(0.42 + i * 0.03, 0.76 + i * 0.03, p);
      const lado = i - 2;
      const x = lado * passoDoLeque * t * t;
      const y = misturar(0, alturaDoPacote * 0.04, t) - Math.sin(t * Math.PI) * alturaDoPacote * 0.6;
      const z = misturar(-(34 + i * 2), 40 + (2 - Math.abs(lado)) * 16, trecho(0.5, 0.8, t));
      const giroDaCarta = lado * 5 * t;
      const viradaDaCarta = Math.sin(t * Math.PI) * -20;
      carta.style.transform = 'translate3d(' + x + 'px, ' + y + 'px, ' + z + 'px) rotateY(' + viradaDaCarta + 'deg) rotate(' + giroDaCarta + 'deg)';
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

  const frase = document.getElementById('frase');
  const tracoDaFrase = document.getElementById('frase-traco');
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
      palavra.classList.toggle('acesa', p > 0.06 + (i / palavras.length) * 0.7);
    });
    tracoDaFrase.style.setProperty('--falta', (1 - trecho(0.8, 0.96, p)).toFixed(3));
  }

  registrarCena(2, desenharFrase);

  const livro = document.getElementById('livro');
  const folhaCapa = document.getElementById('folha-capa');
  const folha1 = document.getElementById('folha-1');
  const tituloDoLivro = document.getElementById('livro-titulo');

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
    livro.style.setProperty('--escala', ((livro.offsetWidth - 4) / 480).toFixed(4));
  }

  function desenharLivro(p) {
    const levanta = trecho(0, 0.16, p);
    const capa = trecho(0.14, 0.5, p);
    const folha = trecho(0.6, 0.9, p);

    const inclinado = misturar(58, 14, levanta) - trecho(0.9, 1, p) * 6;
    livro.style.transform = 'translateX(' + (capa * 50) + '%) rotateX(' + inclinado + 'deg) scale(' + misturar(0.72, 1, levanta) + ')';

    const anguloDaCapa = misturar(-0.6, -180, capa);
    const anguloDaFolha = misturar(-0.3, -179.7, folha);
    folhaCapa.style.transform = 'rotateY(' + anguloDaCapa + 'deg)';
    folha1.style.transform = 'rotateY(' + anguloDaFolha + 'deg)';
    folhaCapa.style.zIndex = capa > 0.5 ? 1 : 3;
    folha1.style.zIndex = 2;

    folhaCapa.style.setProperty('--sombra', (Math.sin(capa * Math.PI) * 0.7).toFixed(3));
    folha1.style.setProperty('--sombra', (Math.sin(folha * Math.PI) * 0.7).toFixed(3));

    tituloDoLivro.style.opacity = 1 - trecho(0.2, 0.32, p);
  }

  registrarCena(3, desenharLivro);

  const mergulho = document.getElementById('mergulho');
  const fimDoMergulho = document.getElementById('mergulho-fim');
  const etiquetaDoMergulho = fimDoMergulho.querySelector('.cena-titulo-estatico');
  const figurinhaDoMergulho = criarFigurinha(figurinhaPorNumero(54), {});
  const giroDoMergulho = giroDaFigurinha(54) + 4;
  mergulho.append(figurinhaDoMergulho);
  fimDoMergulho.style.setProperty('--campo', selecaoPorId(figurinhaPorNumero(54).selecao).cores.campo);
  let aumentoMaximo = 30;

  function medirMergulho() {
    const arte = figurinhaDoMergulho.querySelector('.figurinha-arte');
    const folgaX = arte.offsetWidth * 0.18;
    const folgaY = arte.offsetHeight * 0.17;
    const miraX = arte.offsetLeft + folgaX;
    const miraY = arte.offsetTop + folgaY;
    mergulho.style.transformOrigin = miraX + 'px ' + miraY + 'px';

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
    const aumento = Math.pow(aumentoMaximo, trecho(0.1, 0.62, p));
    const giro = giroDoMergulho * (1 - trecho(0.08, 0.3, p));
    mergulho.style.transform = 'scale(' + aumento.toFixed(3) + ') rotate(' + giro.toFixed(2) + 'deg)';

    const cor = trecho(0.5, 0.63, p);
    fimDoMergulho.style.opacity = cor;
    mergulho.style.visibility = cor >= 1 ? 'hidden' : 'visible';

    const etiqueta = trecho(0.66, 0.82, p);
    etiquetaDoMergulho.style.opacity = etiqueta;
    etiquetaDoMergulho.style.transform = 'translateY(' + ((1 - etiqueta) * 40) + 'px)';
  }

  registrarCena(4, desenharMergulho);

  const VALORES = [SELECOES.length, FIGURINHAS.length, SEDES.length, COPA.numeros.jogos];
  const numeros = Array.from(document.querySelectorAll('#numeros .numero')).map(function (caixa, i) {
    const visor = caixa.querySelector('.numero-valor');
    visor.setAttribute('aria-hidden', 'true');
    caixa.prepend(criarElemento('span', 'escondido', String(VALORES[i])));
    return { caixa: caixa, visor: visor, valor: VALORES[i], mostrado: -1 };
  });

  function desenharNumeros(p) {
    numeros.forEach(function (numero, i) {
      const t = trecho(0.08 + i * 0.2, 0.3 + i * 0.2, p);
      const agora = Math.round(numero.valor * t);
      if (agora !== numero.mostrado) {
        numero.mostrado = agora;
        numero.visor.textContent = String(agora);
      }
      numero.caixa.style.setProperty('--aceso', t.toFixed(3));
    });
  }

  registrarCena(5, desenharNumeros);

  const trilha = document.getElementById('trilha');
  const paineis = SEDES.map(function (sede, i) {
    const painel = document.createElement('figure');
    painel.className = 'sede';

    const moldura = criarElemento('div', 'foto');
    moldura.style.setProperty('--torto', (i % 2 === 0 ? -1.4 : 1.2) + 'deg');
    const foto = document.createElement('img');
    foto.src = 'assets/img/sedes/' + sede.id + '.jpg';
    foto.alt = sede.foto.alt;
    foto.loading = 'lazy';
    foto.decoding = 'async';
    moldura.append(foto);

    const legenda = document.createElement('figcaption');
    legenda.append(
      criarElemento('span', 'sede-conta', (i + 1) + ' de ' + SEDES.length + ', ' + sede.pais),
      criarElemento('span', 'sede-cidade', sede.cidade),
      criarElemento('span', 'sede-estadio', sede.estadio + ', ' + sede.jogos + ' jogos'),
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
    sobraDaTrilha = Math.max(0, trilha.scrollWidth - larguraDoPalcoDasSedes);
    for (const item of paineis) item.centro = item.painel.offsetLeft + item.painel.offsetWidth / 2;
  }

  function desenharTrilha(p) {
    const deslocamento = trecho(0.03, 0.97, p) * sobraDaTrilha;
    trilha.style.transform = 'translate3d(' + (-deslocamento).toFixed(1) + 'px, 0, 0)';

    const meio = larguraDoPalcoDasSedes / 2;
    for (const item of paineis) {
      const perto = limitar(1 - Math.abs(item.centro - deslocamento - meio) / (larguraDoPalcoDasSedes * 0.42));
      const foco = Number((perto * perto * (3 - 2 * perto)).toFixed(3));
      if (foco === item.foco) continue;
      item.foco = foco;
      item.moldura.style.setProperty('--f', foco);
      item.painel.classList.toggle('sede-colada', foco > 0.55);
    }
  }

  registrarCena(6, desenharTrilha);

  const voo = document.getElementById('voo');
  const tituloDoVoo = document.getElementById('voo-titulo');
  const QUANTAS_NO_VOO = window.innerWidth < 640 ? 26 : 44;
  const FUNDO_DO_VOO = 5200;
  const acasoDoVoo = sorteador(288);
  const itensDoVoo = [];

  for (let i = 0; i < QUANTAS_NO_VOO; i++) {
    const figurinha = criarFigurinha(figurinhaPorNumero(1 + (i * 37) % FIGURINHAS.length), {});
    figurinha.classList.add('voo-item');
    voo.append(figurinha);
    itensDoVoo.push({
      elemento: figurinha,
      lugarX: acasoDoVoo() * 2 - 1,
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
      if (Math.abs(item.x) < largura * 0.16 && Math.abs(item.y) < altura * 0.22) {
        item.x = (item.lugarX < 0 ? -1 : 1) * largura * (0.16 + Math.abs(item.lugarY) * 0.2);
      }
      item.elemento.style.transform = 'translate3d(' + item.x.toFixed(0) + 'px, ' + item.y.toFixed(0) + 'px, ' + item.z.toFixed(0) + 'px) rotateY(' + item.virada.toFixed(1) + 'deg) rotate(' + item.giro.toFixed(1) + 'deg)';
    }
  }

  function desenharVoo(p) {
    const camera = trecho(0, 0.9, p) * (FUNDO_DO_VOO + 900);
    voo.style.transform = 'translateZ(' + camera.toFixed(1) + 'px)';

    for (const item of itensDoVoo) {
      const distancia = item.z + camera;
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
    clearTimeout(esperaDaJanela);
    esperaDaJanela = setTimeout(medirTudo, 150);
  });

  new MutationObserver(function () {
    lerCorDaTinta();
    medirTudo();
  }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-tema', 'data-contraste', 'data-fonte', 'data-espacamento'] });

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.getElementById('aviso-movimento').hidden = false;
  }

  document.getElementById('forcar-movimento').addEventListener('click', function () {
    const raiz = document.documentElement;
    raiz.dataset.movimento = 'completo';
    new MutationObserver(function () {
      if (raiz.dataset.movimento === 'normal') raiz.dataset.movimento = 'completo';
    }).observe(raiz, { attributes: true, attributeFilter: ['data-movimento'] });
    document.getElementById('forcar-aviso').textContent = 'Movimento completo ligado nesta página, até ela ser fechada ou recarregada.';
  });

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
  }

  function guardar() {
    try {
      localStorage.setItem(CHAVE, JSON.stringify(guardado));
    } catch (erro) {
    }
  }

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

  lerCorDaTinta();
  escreverLista();
  medirTudo();
  requestAnimationFrame(quadro);

  if (document.fonts && document.fonts.load) {
    document.fonts.load('900 100px "Londrina Solid"').then(medirTudo, medirTudo);
  }
  window.addEventListener('load', medirTudo);
});

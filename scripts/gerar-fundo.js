// ============================================================================
// gerar-fundo.js
// ----------------------------------------------------------------------------
// O que faz: desenha o fundo da página com as cores do css/tokens.css.
// São duas peças:
//   1. A TIRA DOS PAPÉIS: os papéis coloridos e as passagens em retícula entre
//      eles. Fica escrita no fim do css/tokens.css.
//   2. A COLAGEM: desenhos de papel recortado (estádio, bola, bandeirinhas,
//      figurinhas, apito...) colados por cima dos papéis. Fica em dois
//      arquivos, um para cada tema: assets/img/fundo/colagem-claro.svg e
//      assets/img/fundo/colagem-escuro.svg.
//
// Como rodar (na pasta do projeto):   node scripts/gerar-fundo.js
// Rode de novo sempre que mudar uma cor de papel no css/tokens.css
// (--cor-fundo, --cor-papel-2, 3 e 4, --cor-papel-realce e --cor-papel-destaque).
//
// Por que um script: o fundo é feito de imagens SVG, e uma imagem não consegue
// ler as variáveis de cor do site. O script lê as cores no tokens.css e escreve
// as imagens com elas, uma para cada tema.
//
// Todos os desenhos são do próprio projeto, feitos aqui com formas simples.
// Não há foto, logo nem emblema de ninguém.
// ============================================================================

const fs = require('fs');
const path = require('path');

const ARQUIVO_TOKENS = path.join(__dirname, '..', 'css', 'tokens.css');
const PASTA_DA_COLAGEM = path.join(__dirname, '..', 'assets', 'img', 'fundo');

const ALTURA = 4400;        // altura do desenho: depois disso o fundo se repete
// Onde cada papel termina e começa a passagem para o próximo (em pixels, de cima para baixo)
const FIM_DE_CADA_PAPEL = [520, 1600, 2680, 3760];

// A tira dos papéis
const LARGURA_DA_TIRA = 16; // igual à distância entre as bolinhas
const LINHAS = 16;          // quantas linhas de bolinhas tem cada passagem
const ENTRE_LINHAS = 14;    // distância de uma linha de bolinhas até a próxima
const PASSAGEM = LINHAS * ENTRE_LINHAS;

// A colagem
const LARGURA_DA_COLAGEM = 1600;

const INICIO = '/* FUNDO-INICIO */';
const FIM = '/* FUNDO-FIM */';

const NOMES_DAS_CORES = ['fundo', 'papel-2', 'papel-3', 'papel-4', 'papel-realce', 'papel-destaque'];

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
    const achado = /--cor-(fundo|papel-[a-z0-9]+)\s*:\s*(#[0-9a-fA-F]{6})\s*;/.exec(linha);
    if (achado) papeis[achado[1]] = achado[2];
  }
  return papeis;
}

// ---------------------------------------------------------------------------
// 2. Desenhar a tira dos papéis
// ---------------------------------------------------------------------------
// Uma tira bem estreita e bem alta, que o navegador repete para os lados e
// para baixo. De cima para baixo: papel 1, passagem, papel 2, passagem,
// papel 3, passagem, papel 4, passagem e volta ao papel 1. Em cada passagem,
// bolinhas da cor seguinte vão crescendo linha a linha até se juntarem: é
// assim que a impressão em papel faz um degradê (a retícula).

function desenharTira(cores) {
  const papeis = [cores.fundo, cores['papel-2'], cores['papel-3'], cores['papel-4']];
  const pecas = [];
  let y = 0;

  FIM_DE_CADA_PAPEL.forEach(function (fim, i) {
    const seguinte = papeis[(i + 1) % papeis.length];

    // A faixa lisa deste papel, que continua por baixo das bolinhas da passagem
    pecas.push("<rect y='" + y + "' width='" + LARGURA_DA_TIRA + "' height='" + (fim + PASSAGEM - y) + "' fill='" + papeis[i] + "'/>");

    // A passagem: bolinhas do papel seguinte, cada linha um pouco maiores.
    // As linhas são desencontradas (uma no meio, a outra nas beiradas da tira),
    // como na retícula de jornal.
    for (let linha = 0; linha < LINHAS; linha++) {
      const cy = fim + ENTRE_LINHAS / 2 + linha * ENTRE_LINHAS;
      const raio = (1.5 + (linha / (LINHAS - 1)) * 8).toFixed(1);
      const centros = linha % 2 === 0 ? [LARGURA_DA_TIRA / 2] : [0, LARGURA_DA_TIRA];
      for (const cx of centros) {
        pecas.push("<circle cx='" + cx + "' cy='" + cy + "' r='" + raio + "' fill='" + seguinte + "'/>");
      }
    }
    y = fim + PASSAGEM;
  });

  // O resto da tira volta a ser o papel 1, que emenda com o começo da repetição
  pecas.push("<rect y='" + y + "' width='" + LARGURA_DA_TIRA + "' height='" + (ALTURA - y) + "' fill='" + papeis[0] + "'/>");

  const svg = "<svg xmlns='http://www.w3.org/2000/svg' width='" + LARGURA_DA_TIRA + "' height='" + ALTURA + "'>" + pecas.join('') + '</svg>';
  // Dentro de um url() do CSS, estes três sinais precisam ir disfarçados
  return 'url("data:image/svg+xml,' + svg.replace(/#/g, '%23').replace(/</g, '%3C').replace(/>/g, '%3E') + '")';
}

// ---------------------------------------------------------------------------
// 3. As ferramentas de desenho da colagem
// ---------------------------------------------------------------------------

// Um sorteio que se repete: dá sempre a mesma sequência de números "ao acaso".
// Assim o desenho sai igual toda vez que o script roda (o mesmo do js/cenas.js).
let semente = 2026;
function acaso() {
  semente = (semente * 1664525 + 1013904223) % 4294967296;
  return semente / 4294967296;
}
function entre(a, b) {
  return a + (b - a) * acaso();
}

const GRAU = Math.PI / 180;   // quanto vale um grau na medida que o Math.cos usa

// Arredonda para uma casa depois da vírgula: o arquivo fica menor
function n(valor) {
  return Math.round(valor * 10) / 10;
}

// Um ponto a certa distância do centro, em certa direção (em graus)
function ponta(distancia, graus) {
  return [Math.cos(graus * GRAU) * distancia, Math.sin(graus * GRAU) * distancia];
}

// RECORTAR À TESOURA. Recebe os cantos de uma forma e devolve a forma com as
// beiradas um pouco tortas: cada lado comprido ganha pontos no meio, e todos
// os pontos saem um tiquinho do lugar. É o que tira a cara de "régua".
function recorte(cantos, cor, tremor) {
  const pontos = [];
  cantos.forEach(function (canto, i) {
    const proximo = cantos[(i + 1) % cantos.length];
    const comprimento = Math.hypot(proximo[0] - canto[0], proximo[1] - canto[1]);
    const pedacos = Math.max(1, Math.round(comprimento / 42));
    for (let p = 0; p < pedacos; p++) {
      const t = p / pedacos;
      pontos.push(n(canto[0] + (proximo[0] - canto[0]) * t + entre(-tremor, tremor)) + ' ' + n(canto[1] + (proximo[1] - canto[1]) * t + entre(-tremor, tremor)));
    }
  });
  return "<path d='M" + pontos.join('L') + "Z' fill='" + cor + "'/>";
}

// Um círculo recortado à mão: na verdade, uma forma de muitos lados
function circulo(cx, cy, raio, cor) {
  const cantos = [];
  const lados = Math.max(14, Math.round(raio / 3));
  for (let i = 0; i < lados; i++) {
    const p = ponta(raio, (i * 360) / lados);
    cantos.push([cx + p[0], cy + p[1]]);
  }
  return recorte(cantos, cor, Math.min(1.4, raio * 0.02));
}

function retangulo(x, y, largura, altura, cor, tremor) {
  return recorte([[x, y], [x + largura, y], [x + largura, y + altura], [x, y + altura]], cor, tremor === undefined ? 1.2 : tremor);
}

// Um traço (linha com grossura), de ponta redonda
function traco(pontos, cor, grossura, extra) {
  const caminho = pontos.map(function (p) { return n(p[0]) + ' ' + n(p[1]); }).join('L');
  return "<path d='M" + caminho + "' fill='none' stroke='" + cor + "' stroke-width='" + n(grossura) + "' stroke-linecap='round' stroke-linejoin='round'" + (extra || '') + '/>';
}

// Põe um desenho em um lugar da colagem, com um giro (em graus)
function colar(x, y, giro, desenho) {
  return "<g transform='translate(" + n(x) + ' ' + n(y) + ') rotate(' + n(giro) + ")'>" + desenho + '</g>';
}

// ---------------------------------------------------------------------------
// 4. Os desenhos. Cada função desenha em volta do ponto (0, 0).
//    "c" traz as cores: c.papel (o papel que está atrás), c.a, c.b e c.d (os
//    outros três papéis), c.realce e c.destaque.
// ---------------------------------------------------------------------------

// Bola: um disco claro, um gomo de cinco lados no meio, as costuras e os
// cinco gomos da beirada
function bola(raio, c) {
  let d = circulo(0, 0, raio, c.realce);
  const meio = [];
  for (let i = 0; i < 5; i++) meio.push(ponta(raio * 0.34, -90 + i * 72));
  d += recorte(meio, c.a, raio * 0.01);
  for (let i = 0; i < 5; i++) {
    const direcao = -90 + i * 72;
    d += traco([ponta(raio * 0.34, direcao), ponta(raio * 0.63, direcao)], c.a, raio * 0.05);
    const gomo = [ponta(raio * 0.62, direcao), ponta(raio * 0.8, direcao - 21)];
    for (let passo = -15; passo <= 15; passo += 7.5) gomo.push(ponta(raio * 0.985, direcao + passo));
    gomo.push(ponta(raio * 0.8, direcao + 21));
    d += recorte(gomo, c.a, raio * 0.008);
  }
  return d;
}

// Estrela de cinco pontas
function estrela(raio, cor) {
  const cantos = [];
  for (let i = 0; i < 10; i++) cantos.push(ponta(i % 2 === 0 ? raio : raio * 0.44, -90 + i * 36));
  return recorte(cantos, cor, raio * 0.02);
}

// Figurinha: o papel adesivo, o retrato (cabeça e ombros) e as duas linhas do nome
function figurinha(largura, c) {
  const altura = largura * 1.36;
  const topo = -altura / 2;
  const baseDoRetrato = topo + largura * 0.9;
  let d = "<rect x='" + n(-largura / 2) + "' y='" + n(topo) + "' width='" + n(largura) + "' height='" + n(altura) + "' rx='" + n(largura * 0.09) + "' fill='" + c.realce + "'/>";
  d += retangulo(-largura * 0.42, topo + largura * 0.08, largura * 0.84, largura * 0.82, c.a, 0.6);
  d += circulo(0, topo + largura * 0.38, largura * 0.15, c.realce);
  d += "<path d='M" + n(-largura * 0.3) + ' ' + n(baseDoRetrato) + 'A' + n(largura * 0.3) + ' ' + n(largura * 0.3) + ' 0 0 1 ' + n(largura * 0.3) + ' ' + n(baseDoRetrato) + "Z' fill='" + c.realce + "'/>";
  d += retangulo(-largura * 0.38, altura / 2 - largura * 0.36, largura * 0.52, largura * 0.07, c.a, 0.4);
  d += retangulo(-largura * 0.38, altura / 2 - largura * 0.22, largura * 0.3, largura * 0.07, c.b, 0.4);
  return d;
}

// Apito: o corpo redondo, o bocal, o furo e a argola do cordão
function apito(tamanho, c) {
  let d = "<circle cx='" + n(tamanho * 0.34) + "' cy='" + n(-tamanho * 0.3) + "' r='" + n(tamanho * 0.1) + "' fill='none' stroke='" + c.a + "' stroke-width='" + n(tamanho * 0.045) + "'/>";
  d += retangulo(-tamanho * 0.56, -tamanho * 0.22, tamanho * 0.6, tamanho * 0.28, c.a, 0.8);
  d += circulo(tamanho * 0.1, tamanho * 0.08, tamanho * 0.32, c.a);
  d += circulo(tamanho * 0.1, tamanho * 0.08, tamanho * 0.13, c.realce);
  d += retangulo(-tamanho * 0.3, -tamanho * 0.22, tamanho * 0.16, tamanho * 0.08, c.realce, 0.4);
  return d;
}

// Os dois cartões do juiz, um por cima do outro
function cartoes(tamanho, c) {
  const cartao = function (cor) {
    return "<rect x='" + n(-tamanho * 0.25) + "' y='" + n(-tamanho * 0.36) + "' width='" + n(tamanho * 0.5) + "' height='" + n(tamanho * 0.72) + "' rx='" + n(tamanho * 0.05) + "' fill='" + cor + "'/>";
  };
  return colar(-tamanho * 0.16, tamanho * 0.03, -14, cartao(c.a)) + colar(tamanho * 0.16, -tamanho * 0.02, 10, cartao(c.destaque));
}

// Trave: o fundo da rede, os fios da rede e os três paus
function trave(largura, c) {
  const altura = largura * 0.42;
  const esquerda = -largura / 2;
  const topo = -altura / 2;
  let d = retangulo(esquerda, topo, largura, altura, c.a, 1);
  const vao = largura / 16;
  for (let x = esquerda + vao; x < largura / 2 - 1; x += vao) d += traco([[x, topo], [x, altura / 2]], c.realce, 1.6);
  for (let y = topo + vao; y < altura / 2 - 1; y += vao) d += traco([[esquerda, y], [largura / 2, y]], c.realce, 1.6);
  d += traco([[esquerda, altura / 2], [esquerda, topo], [largura / 2, topo], [largura / 2, altura / 2]], c.realce, largura * 0.03);
  return d;
}

// Bandeira de escanteio: o mastro, a bandeira e o quarto de círculo no chão
function escanteio(altura, c) {
  let d = "<path d='M" + n(altura * 0.34) + ' ' + n(altura * 0.5) + 'A' + n(altura * 0.34) + ' ' + n(altura * 0.34) + ' 0 0 0 0 ' + n(altura * 0.16) + "' fill='none' stroke='" + c.realce + "' stroke-width='" + n(altura * 0.03) + "' stroke-linecap='round'/>";
  d += recorte([[0, -altura * 0.5], [altura * 0.44, -altura * 0.37], [0, -altura * 0.2]], c.destaque, 1);
  d += traco([[0, altura * 0.5], [0, -altura * 0.5]], c.realce, altura * 0.04);
  return d;
}

// Cronômetro: a caixa, o botão, o mostrador e os dois ponteiros
function cronometro(raio, c) {
  let d = retangulo(-raio * 0.14, -raio * 1.3, raio * 0.28, raio * 0.36, c.a, 0.6);
  d += colar(0, 0, 42, retangulo(-raio * 0.1, -raio * 1.2, raio * 0.2, raio * 0.3, c.a, 0.6));
  d += circulo(0, 0, raio, c.a);
  d += circulo(0, 0, raio * 0.76, c.realce);
  for (let i = 0; i < 12; i++) d += traco([ponta(raio * 0.6, i * 30), ponta(raio * 0.68, i * 30)], c.a, raio * 0.04);
  d += traco([[0, 0], [0, -raio * 0.5]], c.a, raio * 0.09);
  d += traco([[0, 0], [raio * 0.3, raio * 0.14]], c.a, raio * 0.09);
  return d;
}

// Prancheta de tática: os X de um time, as bolinhas do outro e a seta da jogada
function tatica(largura, c) {
  const xis = function (x, y) {
    const t = largura * 0.045;
    return traco([[x - t, y - t], [x + t, y + t]], c.realce, largura * 0.022) + traco([[x - t, y + t], [x + t, y - t]], c.realce, largura * 0.022);
  };
  const bolinha = function (x, y) {
    return "<circle cx='" + n(x) + "' cy='" + n(y) + "' r='" + n(largura * 0.05) + "' fill='none' stroke='" + c.a + "' stroke-width='" + n(largura * 0.022) + "'/>";
  };
  let d = xis(-largura * 0.42, largura * 0.2) + xis(-largura * 0.16, -largura * 0.04) + xis(largura * 0.16, largura * 0.22);
  d += bolinha(-largura * 0.3, -largura * 0.2) + bolinha(largura * 0.06, -largura * 0.22) + bolinha(largura * 0.4, largura * 0.02);
  // A seta: uma curva tracejada e a ponta
  d += "<path d='M" + n(-largura * 0.34) + ' ' + n(largura * 0.16) + 'Q' + n(-largura * 0.02) + ' ' + n(largura * 0.3) + ' ' + n(largura * 0.3) + ' ' + n(-largura * 0.1) + "' fill='none' stroke='" + c.realce + "' stroke-width='" + n(largura * 0.02) + "' stroke-linecap='round' stroke-dasharray='" + n(largura * 0.05) + ' ' + n(largura * 0.045) + "'/>";
  d += colar(largura * 0.32, -largura * 0.13, -52, recorte([[largura * 0.06, 0], [-largura * 0.03, -largura * 0.04], [-largura * 0.03, largura * 0.04]], c.realce, 0.5));
  return d;
}

// Camisa: o corpo com as mangas, a gola e a faixa do peito
function camisa(tamanho, c) {
  const t = tamanho;
  let d = recorte([
    [-0.3 * t, -0.42 * t], [-0.14 * t, -0.5 * t], [0, -0.44 * t], [0.14 * t, -0.5 * t], [0.3 * t, -0.42 * t],
    [0.54 * t, -0.24 * t], [0.42 * t, -0.04 * t], [0.28 * t, -0.13 * t], [0.28 * t, 0.5 * t],
    [-0.28 * t, 0.5 * t], [-0.28 * t, -0.13 * t], [-0.42 * t, -0.04 * t], [-0.54 * t, -0.24 * t],
  ], c.a, 1.2);
  d += recorte([[-0.14 * t, -0.5 * t], [0, -0.33 * t], [0.14 * t, -0.5 * t], [0, -0.44 * t]], c.realce, 0.5);
  d += retangulo(-0.28 * t, -0.06 * t, 0.56 * t, 0.12 * t, c.realce, 0.6);
  d += retangulo(-0.28 * t, 0.1 * t, 0.56 * t, 0.05 * t, c.b, 0.5);
  return d;
}

// Pacotinho: o saquinho com as duas beiradas em serra e a etiqueta
function pacotinho(altura, c) {
  const largura = altura * 0.72;
  const dentes = 9;
  const cantos = [];
  for (let i = 0; i <= dentes * 2; i++) cantos.push([-largura / 2 + (largura * i) / (dentes * 2), -altura / 2 + (i % 2) * altura * 0.035]);
  for (let i = dentes * 2; i >= 0; i--) cantos.push([-largura / 2 + (largura * i) / (dentes * 2), altura / 2 - (i % 2) * altura * 0.035]);
  let d = recorte(cantos, c.a, 0.5);
  d += retangulo(-largura / 2, -altura * 0.16, largura, altura * 0.3, c.realce, 0.6);
  d += estrela(altura * 0.09, c.destaque);
  return d;
}

// Estádio visto de fora: o sol atrás, as torres de luz, a arquibancada com as
// colunas, a cobertura, os portões e as bandeiras
function estadio(largura, c) {
  const l = largura;
  // A beirada de cima da arquibancada é uma curva. Esta conta devolve a altura
  // dela em cada ponto, de x = -0.46 a x = 0.46 da largura.
  const beirada = function (x) {
    const t = (x + 0.46) / 0.92;
    return -0.16 - 0.2 * t * (1 - t);
  };
  let d = circulo(0.2 * l, -0.27 * l, 0.14 * l, c.destaque);

  // As duas torres de luz
  for (const lado of [-1, 1]) {
    d += traco([[lado * 0.6 * l, 0], [lado * 0.57 * l, -0.4 * l]], c.realce, l * 0.012);
    let refletor = retangulo(-0.065 * l, -0.04 * l, 0.13 * l, 0.08 * l, c.realce, 0.8);
    for (let i = 0; i < 4; i++) for (let j = 0; j < 2; j++) refletor += circulo((-0.042 + i * 0.028) * l, (-0.016 + j * 0.032) * l, 0.009 * l, c.a);
    d += colar(lado * 0.57 * l, -0.43 * l, lado * 10, refletor);
  }

  // A arquibancada
  const corpo = [[-0.5 * l, 0]];
  for (let x = -0.46; x <= 0.461; x += 0.092) corpo.push([x * l, beirada(x) * l]);
  corpo.push([0.5 * l, 0]);
  d += recorte(corpo, c.realce, 1);

  // As colunas e os portões
  for (let x = -0.4; x <= 0.401; x += 0.08) d += traco([[x * l, (beirada(x) + 0.03) * l], [x * l, -0.012 * l]], c.a, l * 0.007);
  for (let x = -0.32; x <= 0.321; x += 0.16) d += "<path d='M" + n((x - 0.022) * l) + ' 0V' + n(-0.045 * l) + 'A' + n(0.022 * l) + ' ' + n(0.022 * l) + ' 0 0 1 ' + n((x + 0.022) * l) + ' ' + n(-0.045 * l) + "V0Z' fill='" + c.a + "'/>";

  // A cobertura: uma faixa que acompanha a curva
  const cobertura = [];
  for (let x = -0.47; x <= 0.471; x += 0.094) cobertura.push([x * l, (beirada(x * 0.978) - 0.004) * l]);
  for (let x = 0.47; x >= -0.471; x -= 0.094) cobertura.push([x * l, (beirada(x * 0.978) - 0.034) * l]);
  d += recorte(cobertura, c.b, 0.8);

  // As bandeiras em cima da cobertura
  [-0.26, 0, 0.26].forEach(function (x, i) {
    const pe = (beirada(x) - 0.03) * l;
    d += traco([[x * l, pe], [x * l, pe - 0.075 * l]], c.realce, l * 0.006);
    d += recorte([[x * l, pe - 0.075 * l], [(x + 0.045) * l, pe - 0.06 * l], [x * l, pe - 0.045 * l]], i === 1 ? c.destaque : c.a, 0.5);
  });
  return d;
}

// Raios: fatias que saem de um ponto e abrem em leque para cima, como o sol
// nascendo em um cartaz antigo. Entre uma fatia e outra fica um vão igual a ela.
function raios(raio, cor, fatias) {
  let d = '';
  const abertura = 180 / (fatias * 2 - 1);   // o leque inteiro tem 180 graus
  for (let i = 0; i < fatias; i++) {
    const direcao = -180 + abertura * (i * 2 + 0.5);
    d += recorte([[0, 0], ponta(raio, direcao - abertura / 2), ponta(raio, direcao + abertura / 2)], cor, 0.8);
  }
  return d;
}

// Linhas de giz do gramado: a linha do meio do campo, de um lado ao outro da
// colagem, o círculo central e o ponto do pontapé inicial
function giz(y, raio, cor) {
  let d = traco([[0, y], [LARGURA_DA_COLAGEM, y]], cor, 5);
  d += "<circle cx='" + LARGURA_DA_COLAGEM / 2 + "' cy='" + y + "' r='" + raio + "' fill='none' stroke='" + cor + "' stroke-width='5'/>";
  d += circulo(LARGURA_DA_COLAGEM / 2, y, 9, cor);
  return d;
}

// Um varal de bandeirinhas de um lado ao outro da colagem. "barriga" é o
// quanto o cordão desce no meio.
function bandeirinhas(y, barriga, quantas, cores, corDoCordao) {
  const alturaEm = function (t) { return y + barriga * 4 * t * (1 - t); };   // a curva do cordão
  let d = '';
  const cordao = [];
  for (let i = 0; i <= 40; i++) cordao.push([(LARGURA_DA_COLAGEM * i) / 40, alturaEm(i / 40)]);
  d += traco(cordao, corDoCordao, 2.4);
  const largura = LARGURA_DA_COLAGEM / quantas;
  for (let i = 0; i < quantas; i++) {
    const t = (i + 0.5) / quantas;
    const x = t * LARGURA_DA_COLAGEM;
    const topo = alturaEm(t);
    d += colar(x, topo, entre(-5, 5), recorte([[-largura * 0.36, 0], [largura * 0.36, 0], [0, largura * 0.72]], cores[i % cores.length], 0.8));
  }
  return d;
}

// Um punhado de confete: papeizinhos de três formatos, espalhados em um retângulo
function confete(esquerda, topo, largura, altura, quantos, cores) {
  let d = '';
  for (let i = 0; i < quantos; i++) {
    const cor = cores[Math.floor(acaso() * cores.length)];
    const formato = Math.floor(acaso() * 3);
    let papel;
    if (formato === 0) papel = retangulo(-5, -9, 10, 18, cor, 0.5);
    else if (formato === 1) papel = circulo(0, 0, 6, cor);
    else papel = recorte([[0, -9], [9, 7], [-9, 7]], cor, 0.5);
    d += colar(esquerda + acaso() * largura, topo + acaso() * altura, entre(0, 360), papel);
  }
  return d;
}

// ---------------------------------------------------------------------------
// 5. Montar a colagem de um tema
// ---------------------------------------------------------------------------

// Qual papel está atrás de uma altura da colagem? (0, 1, 2 ou 3)
// A passagem conta como o papel de cima até a metade dela.
function papelEm(y) {
  for (let i = 0; i < FIM_DE_CADA_PAPEL.length; i++) {
    if (y < FIM_DE_CADA_PAPEL[i] + PASSAGEM / 2) return i;
  }
  return 0;
}

function desenharColagem(cores) {
  semente = 2026;   // o sorteio recomeça: os dois temas saem com o mesmo desenho
  const papeis = [cores.fundo, cores['papel-2'], cores['papel-3'], cores['papel-4']];

  // As cores para quem vai ser colado na altura y: nunca a cor do papel de trás
  const coresEm = function (y) {
    const i = papelEm(y);
    return {
      papel: papeis[i], a: papeis[(i + 1) % 4], b: papeis[(i + 2) % 4], d: papeis[(i + 3) % 4],
      realce: cores['papel-realce'], destaque: cores['papel-destaque'],
    };
  };
  const pecas = [];
  // Atalho: cola o desenho no lugar, já com as cores certas para aquela altura
  const por = function (x, y, giro, desenhar) {
    pecas.push(colar(x, y, giro, desenhar(coresEm(y))));
  };
  const confeteEm = function (esquerda, topo, largura, altura, quantos) {
    const c = coresEm(topo + altura / 2);
    pecas.push(confete(esquerda, topo, largura, altura, quantos, [c.a, c.b, c.d, c.realce, c.realce, c.destaque]));
  };

  // ----- Papel 1 (o topo de toda página): o varal, estrelas e uma bola pequena
  let c = coresEm(100);
  pecas.push(bandeirinhas(84, 16, 34, [c.a, c.realce, c.b, c.destaque, c.d, c.realce], c.realce));
  confeteEm(60, 170, 1480, 300, 14);
  por(1250, 265, 12, function (k) { return estrela(34, k.destaque); });
  por(318, 352, -10, function (k) { return estrela(22, k.realce); });
  por(1392, 408, 18, function (k) { return bola(62, k); });
  por(150, 440, -12, function (k) { return figurinha(84, k); });

  // ----- Papel 2: o estádio com os raios atrás, as figurinhas, o apito e a tática
  por(1000, 1250, 0, function (k) { return raios(360, k.a, 7); });
  por(1000, 1250, 0, function (k) { return estadio(540, k); });
  por(210, 1100, -15, function (k) { return figurinha(124, k); });
  por(332, 1080, -1, function (k) { return figurinha(124, { realce: k.realce, a: k.b, b: k.a }); });
  por(454, 1104, 13, function (k) { return figurinha(124, { realce: k.realce, a: k.d, b: k.destaque }); });
  por(700, 880, -22, function (k) { return apito(116, k); });
  por(560, 1470, -4, function (k) { return tatica(300, k); });
  por(1440, 1480, 6, function (k) { return cartoes(112, k); });
  por(170, 1440, 8, function (k) { return estrela(30, k.destaque); });
  confeteEm(60, 800, 1480, 760, 22);

  // ----- Papel 3 (o verde): o gramado riscado de giz, a bola grande, a trave,
  //       a camisa e a bandeira de escanteio
  c = coresEm(2260);
  pecas.push(giz(2260, 170, c.realce));
  por(300, 2200, 14, function (k) { return bola(158, k); });
  por(1250, 2040, -2, function (k) { return trave(430, k); });
  por(1190, 2500, -7, function (k) { return camisa(196, k); });
  por(1500, 2400, 4, function (k) { return escanteio(190, k); });
  por(560, 1960, 16, function (k) { return estrela(26, k.destaque); });
  por(640, 2560, -12, function (k) { return estrela(20, k.realce); });
  confeteEm(60, 1880, 1480, 740, 18);

  // ----- Papel 4: o pacotinho com uma figurinha saindo, a tática, o cronômetro,
  //       os cartões e outra bola
  por(380, 3250, 16, function (k) { return figurinha(112, k); });
  por(280, 3210, -8, function (k) { return pacotinho(230, k); });
  por(1250, 3150, 8, function (k) { return cronometro(92, k); });
  por(880, 3540, -20, function (k) { return bola(84, k); });
  por(800, 3120, 5, function (k) { return tatica(270, k); });
  por(1440, 3600, -8, function (k) { return cartoes(104, k); });
  por(540, 3640, 10, function (k) { return estrela(28, k.destaque); });
  confeteEm(60, 2960, 1480, 740, 20);

  // ----- De volta ao papel 1 (o fim do desenho, que emenda com o topo)
  por(1100, 4190, -6, function (k) { return figurinha(108, k); });
  por(1216, 4176, 9, function (k) { return figurinha(108, { realce: k.realce, a: k.b, b: k.destaque }); });
  por(420, 4200, 24, function (k) { return apito(104, k); });
  por(800, 4170, 0, function (k) { return estrela(32, k.destaque); });
  confeteEm(60, 4040, 1480, 300, 10);

  return "<svg xmlns='http://www.w3.org/2000/svg' width='" + LARGURA_DA_COLAGEM + "' height='" + ALTURA + "' viewBox='0 0 " + LARGURA_DA_COLAGEM + ' ' + ALTURA + "'>\n" + pecas.join('\n') + '\n</svg>\n';
}

// ---------------------------------------------------------------------------
// 6. Ler as cores, desenhar e guardar
// ---------------------------------------------------------------------------

let css = fs.readFileSync(ARQUIVO_TOKENS, 'utf8').replace(/\r\n/g, '\n');

const claro = lerPapeis(css, ':root');
const escuro = Object.assign({}, claro, lerPapeis(css, '[data-tema="escuro"]'));
for (const tema of [claro, escuro]) {
  for (const nome of NOMES_DAS_CORES) {
    if (!tema[nome]) throw new Error('Não achei a cor --cor-' + nome + ' no tokens.css');
  }
}

// A tira dos papéis vai para o fim do tokens.css, entre as duas marcas
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

// A colagem vai para um arquivo por tema
fs.mkdirSync(PASTA_DA_COLAGEM, { recursive: true });
fs.writeFileSync(path.join(PASTA_DA_COLAGEM, 'colagem-claro.svg'), desenharColagem(claro), 'utf8');
fs.writeFileSync(path.join(PASTA_DA_COLAGEM, 'colagem-escuro.svg'), desenharColagem(escuro), 'utf8');

console.log('Fundo desenhado para os temas claro e escuro: a tira dos papéis (css/tokens.css) e a colagem (assets/img/fundo/).');

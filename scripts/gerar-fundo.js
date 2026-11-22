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

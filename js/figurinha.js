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

// Os quatro cortes de cabelo do retrato. Cada um é um desenho em SVG, posto
// por cima da cabeça. O último é o cabelo raspado, que sai mais claro.
const PENTEADOS = [
  // curto
  '<path class="busto-cabelo" d="M19.6 21C18.6 11 23.6 5.4 30 5.4C36.4 5.4 41.4 11 40.4 21C39.4 16.6 36.6 14.2 30 14.2C23.4 14.2 20.6 16.6 19.6 21Z"/>',
  // penteado para o lado
  '<path class="busto-cabelo" d="M19.6 21C18.2 10.4 24.4 4.2 31.6 4.8C38.2 5.4 42 11 40.4 21C39.6 17.4 38.2 15.2 35.6 14C31 16.4 25 16.6 21.8 15.4C20.6 17 20 19 19.6 21Z"/>',
  // cacheado: o cabelo curto com seis cachos em volta
  '<path class="busto-cabelo" d="M19.6 21C18.6 11 23.6 5.4 30 5.4C36.4 5.4 41.4 11 40.4 21C39.4 16.6 36.6 14.2 30 14.2C23.4 14.2 20.6 16.6 19.6 21Z"/>' +
  '<circle class="busto-cabelo" cx="21.4" cy="13.8" r="3.6"/><circle class="busto-cabelo" cx="25" cy="9.2" r="3.9"/><circle class="busto-cabelo" cx="30" cy="7.2" r="4.1"/>' +
  '<circle class="busto-cabelo" cx="35" cy="9.2" r="3.9"/><circle class="busto-cabelo" cx="38.6" cy="13.8" r="3.6"/><circle class="busto-cabelo" cx="30" cy="11.6" r="4"/>',
  // raspado
  '<path class="busto-cabelo busto-cabelo-raspado" d="M20.2 18.6C20.4 11.4 24.4 7.2 30 7.2C35.6 7.2 39.6 11.4 39.8 18.6C38.2 14.4 35.4 12.6 30 12.6C24.6 12.6 21.8 14.4 20.2 18.6Z"/>',
];

// O retrato: uma pessoa de frente, da cabeça aos ombros, com a camisa da
// seleção e o número. É um desenho genérico, igual para todos; só o corte de
// cabelo muda, conforme o número da figurinha (para o álbum não parecer uma
// fila de bonecos iguais). Não é foto nem tenta parecer com o jogador de verdade.
// As cores vêm do CSS (ver ".busto-...", em css/componentes.css).
function desenharRetrato(numeroDaCamisa, penteado) {
  return '<svg class="figurinha-busto" viewBox="0 0 60 60" preserveAspectRatio="xMidYMax meet" aria-hidden="true" focusable="false">' +
    // a camisa, com a costura das duas mangas
    '<path class="busto-camisa" d="M3 61C3 50 8 45.5 17 43.5L24.5 41.5Q30 45 35.5 41.5L43 43.5C52 45.5 57 50 57 61Z"/>' +
    '<path class="busto-traco" d="M12.5 48.5L14.5 61M47.5 48.5L45.5 61"/>' +
    // o pescoço, a sombra do queixo e a gola
    '<path class="busto-pele" d="M25 32V41.8Q30 45.6 35 41.8V32Z"/>' +
    '<path class="busto-sombra" d="M25 35.2Q30 39.5 35 35.2V37.6Q30 41.8 25 37.6Z"/>' +
    '<path class="busto-gola" d="M23.6 41.2Q30 45.6 36.4 41.2L38.6 42.4Q30 48.2 21.4 42.4Z"/>' +
    // as orelhas e o rosto, com a sombra de um dos lados
    '<ellipse class="busto-pele" cx="19.8" cy="22.6" rx="2.3" ry="3.3"/><ellipse class="busto-pele" cx="40.2" cy="22.6" rx="2.3" ry="3.3"/>' +
    '<path class="busto-pele" d="M20.2 19.5C20.2 11.5 24.4 7.2 30 7.2C35.6 7.2 39.8 11.5 39.8 19.5V24C39.8 31.2 35.4 36 30 36C24.6 36 20.2 31.2 20.2 24Z"/>' +
    '<path class="busto-sombra" d="M34.6 9.2C38 11.3 39.8 14.8 39.8 19.5V24C39.8 31.2 35.4 36 30 36C33.6 33.4 35.6 29.2 35.6 24Z"/>' +
    PENTEADOS[penteado % PENTEADOS.length] +
    // as sobrancelhas, os olhos, o nariz e a boca
    '<path class="busto-traco" d="M23.6 19.4Q25.8 18.2 28 19.2M32 19.2Q34.2 18.2 36.4 19.4M30 23.2L29.1 27.2L30.9 27.5M27 31Q30 32.8 33 31"/>' +
    '<circle class="busto-olho" cx="25.9" cy="22.4" r="1.1"/><circle class="busto-olho" cx="34.1" cy="22.4" r="1.1"/>' +
    '<text class="busto-numero" x="30" y="58" text-anchor="middle">' + Number(numeroDaCamisa) + '</text>' +
    '</svg>';
}

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
    // Retrato genérico, desenhado: não é foto de ninguém
    arte.innerHTML = desenharRetrato(fig.camisa, fig.numero);

    // A bandeirinha da seleção, no canto de cima
    const pais = document.createElement('img');
    pais.className = 'figurinha-pais';
    pais.src = 'assets/bandeiras/' + selecao.bandeira + '.svg';
    pais.alt = '';                // o nome da seleção vem escrito na tarja, logo abaixo
    pais.loading = 'lazy';
    pais.draggable = false;
    arte.append(pais);
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

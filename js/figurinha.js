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
    // Retrato genérico: uma cabeça lisa e uma camisa com o número. Não é foto de ninguém.
    arte.innerHTML =
      '<svg class="figurinha-busto" viewBox="0 0 60 60" preserveAspectRatio="xMidYMax meet" aria-hidden="true" focusable="false">' +
      '<circle class="busto-cabeca" cx="30" cy="17" r="10"/>' +
      '<path class="busto-camisa" d="M7 61c0-15 9-24 23-24s23 9 23 24z"/>' +
      '<text class="busto-numero" x="30" y="57" text-anchor="middle">' + Number(fig.camisa) + '</text>' +
      '</svg>';
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

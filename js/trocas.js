// ============================================================================
// trocas.js
// ----------------------------------------------------------------------------
// A página de trocas. Faz três coisas:
//   1. Lista as repetidas ("tenho para trocar") e as que faltam ("preciso").
//   2. Monta o texto da lista de troca, para copiar ou mandar pelo WhatsApp.
//   3. Simula uma troca na "banca": sai uma repetida, chega uma que faltava.
//
// Depende de: js/dados.js, js/estado.js e js/figurinha.js.
// ============================================================================

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  const OFERTAS_DA_BANCA = 3;

  const campoTexto = document.getElementById('texto-troca');
  const formulario = document.getElementById('form-troca');
  const avisoDaTroca = document.getElementById('troca-aviso');

  // Como a figurinha é chamada nas listas: "Alisson (Brasil)" ou "Brasil (bandeira)"
  function nomeNaLista(fig) {
    const selecao = selecaoPorId(fig.selecao);
    return fig.tipo === 'bandeira' ? selecao.nome + ' (bandeira)' : fig.nome + ' (' + selecao.nome + ')';
  }

  function textoDeRepetidas(quantas) {
    return quantas === 1 ? '1 repetida' : quantas + ' repetidas';
  }

  // As figurinhas com pelo menos uma repetida, e as que ainda não saíram
  function separar(album) {
    return {
      repetidas: FIGURINHAS.filter(function (fig) { return repetidasDe(album, fig.numero) > 0; }),
      faltam: FIGURINHAS.filter(function (fig) { return quantasTenho(album, fig.numero) === 0; }),
    };
  }

  // -------------------------------------------------------------------------
  // 1 e 2. As duas listas e o texto pronto
  // -------------------------------------------------------------------------

  function desenharListas() {
    const album = lerAlbum();
    const listas = separar(album);

    // Tenho para trocar
    const listaRepetidas = document.getElementById('lista-repetidas');
    listaRepetidas.textContent = '';
    for (const fig of listas.repetidas) {
      const item = document.createElement('li');
      item.append(criarElemento('span', '', 'Nº ' + fig.numero + ', ' + nomeNaLista(fig)));
      item.append(criarElemento('span', 'etiqueta', textoDeRepetidas(repetidasDe(album, fig.numero))));
      listaRepetidas.append(item);
    }
    document.getElementById('repetidas-texto').textContent = listas.repetidas.length === 0
      ? 'Nenhuma repetida por enquanto. Elas aparecem quando uma figurinha sai de novo no pacotinho.'
      : 'Estas saíram mais de uma vez. A primeira cópia é do álbum; as outras podem ir embora.';

    // Preciso
    const listaFaltam = document.getElementById('lista-faltam');
    listaFaltam.textContent = '';
    for (const fig of listas.faltam) {
      const item = document.createElement('li');
      item.append(criarElemento('strong', '', String(fig.numero)), ' ' + (fig.tipo === 'bandeira' ? fig.nome + ' (bandeira)' : fig.nome));
      listaFaltam.append(item);
    }
    let textoFaltam = 'Faltam ' + listas.faltam.length + ' figurinhas diferentes.';
    if (listas.faltam.length === 1) textoFaltam = 'Falta só 1 figurinha.';
    if (listas.faltam.length === 0) textoFaltam = 'Não falta nenhuma: todas as figurinhas já saíram para você.';
    document.getElementById('faltam-texto').textContent = textoFaltam;

    // O texto da lista de troca, uma linha para cada parte
    const tenho = listas.repetidas.map(function (fig) {
      return fig.numero + ' ' + (fig.tipo === 'bandeira' ? 'Bandeira ' + fig.nome : fig.nome) + ' (x' + repetidasDe(album, fig.numero) + ')';
    });
    const preciso = listas.faltam.map(function (fig) { return fig.numero; });
    const linhas = [
      'Colei! Álbum da Copa 2026',
      'Tenho para trocar: ' + (tenho.length > 0 ? tenho.join(', ') : 'nada por enquanto'),
      'Preciso: ' + (preciso.length > 0 ? preciso.join(', ') : 'nada, já tenho todas'),
    ];
    campoTexto.value = linhas.join('\n');

    // O link do WhatsApp leva o texto no endereço. encodeURIComponent troca
    // espaços, acentos e quebras de linha por códigos que cabem em um endereço.
    document.getElementById('mandar-whatsapp').href = 'https://wa.me/?text=' + encodeURIComponent(campoTexto.value);
  }

  // Copiar: usa a área de transferência do navegador. Se ele não deixar,
  // o texto fica selecionado para a pessoa copiar com Ctrl+C.
  document.getElementById('copiar-lista').addEventListener('click', function () {
    const aviso = document.getElementById('copiar-aviso');

    function selecionarParaCopiar() {
      campoTexto.focus();
      campoTexto.select();
      aviso.textContent = 'O texto está selecionado. Aperte Ctrl+C para copiar.';
    }

    if (!navigator.clipboard) {
      selecionarParaCopiar();
      return;
    }
    navigator.clipboard.writeText(campoTexto.value).then(function () {
      aviso.textContent = 'Lista copiada. Agora é só colar na conversa.';
    }, selecionarParaCopiar);
  });

  // -------------------------------------------------------------------------
  // 3. A banca de trocas
  // -------------------------------------------------------------------------

  // Uma opção de escolha: uma caixinha redonda (radio) com o texto ao lado
  function criarOpcao(grupo, fig, texto, marcada) {
    const caixa = document.createElement('input');
    caixa.type = 'radio';
    caixa.name = grupo;
    caixa.value = fig.numero;
    caixa.checked = marcada;

    const rotulo = criarElemento('label', 'opcao');
    rotulo.append(caixa, criarElemento('span', '', texto));
    return rotulo;
  }

  function desenharBanca() {
    const album = lerAlbum();
    const listas = separar(album);
    const vazia = document.getElementById('banca-vazia');

    // Sem repetida para dar ou sem figurinha faltando, não há troca possível
    if (listas.repetidas.length === 0 || listas.faltam.length === 0) {
      formulario.hidden = true;
      vazia.hidden = false;
      vazia.textContent = listas.faltam.length === 0
        ? 'Você já tem todas as figurinhas. Não sobrou nada para a banca oferecer.'
        : 'A banca só troca por repetida, e você ainda não tem nenhuma. Abra mais pacotinhos e volte aqui.';
      return;
    }
    formulario.hidden = false;
    vazia.hidden = true;

    // Você dá: todas as repetidas. A primeira já vem marcada.
    const opcoesDou = document.getElementById('opcoes-dou');
    opcoesDou.textContent = '';
    listas.repetidas.forEach(function (fig, posicao) {
      const texto = 'Nº ' + fig.numero + ', ' + nomeNaLista(fig) + ', ' + textoDeRepetidas(repetidasDe(album, fig.numero));
      opcoesDou.append(criarOpcao('dou', fig, texto, posicao === 0));
    });

    // Você recebe: a banca sorteia até três das que faltam
    const sobra = listas.faltam.slice();   // cópia, para poder tirar as sorteadas
    const opcoesRecebo = document.getElementById('opcoes-recebo');
    opcoesRecebo.textContent = '';
    for (let i = 0; i < OFERTAS_DA_BANCA && sobra.length > 0; i++) {
      const sorteada = sobra.splice(Math.floor(Math.random() * sobra.length), 1)[0];
      const texto = 'Nº ' + sorteada.numero + ', ' + nomeNaLista(sorteada) + ', ' + NOME_DA_RARIDADE[sorteada.raridade].toLowerCase();
      opcoesRecebo.append(criarOpcao('recebo', sorteada, texto, i === 0));
    }
  }

  formulario.addEventListener('submit', function (evento) {
    evento.preventDefault();   // não deixa o navegador recarregar a página

    // Descobre qual opção está marcada em cada grupo
    const sai = figurinhaPorNumero(Number(formulario.querySelector('input[name="dou"]:checked').value));
    const chega = figurinhaPorNumero(Number(formulario.querySelector('input[name="recebo"]:checked').value));

    const conquistas = trocarFigurinha(sai.numero, chega.numero);
    if (conquistas === null) return;   // a troca não valia mais (o álbum mudou em outra aba, por exemplo)

    let texto = 'Troca feita. Saiu uma repetida da Nº ' + sai.numero + ', ' + sai.nome + ', e chegou a Nº ' + chega.numero + ', ' + chega.nome + '. ';
    for (const nome of conquistas) texto += 'Conquista: ' + nome + '. Você ganhou um pacotinho extra. ';

    const link = criarElemento('a', '', 'Colar no álbum');
    link.href = 'album.html#casa-' + chega.numero;
    avisoDaTroca.textContent = texto;
    avisoDaTroca.append(link);

    desenharListas();
    desenharBanca();
    avisoDaTroca.focus();
  });

  document.getElementById('outras-ofertas').addEventListener('click', desenharBanca);

  // -------------------------------------------------------------------------
  // Começar
  // -------------------------------------------------------------------------

  desenharListas();
  desenharBanca();
});

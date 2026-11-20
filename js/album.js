// ============================================================================
// album.js
// ----------------------------------------------------------------------------
// A página do álbum. Faz quatro coisas:
//   1. Monta as páginas: grupo > seleção > uma "casa" para cada figurinha.
//   2. Mostra o que está na mão e cola: arrastando até a vaga ou pelo botão
//      "Colar". Dá para desfazer a última colagem.
//   3. Aplica a busca, as abas e os filtros.
//   4. Mantém o placar e as conquistas em dia.
//
// Depende de: js/dados.js, js/estado.js e js/figurinha.js.
// ============================================================================

// Espera o HTML ficar pronto antes de mexer na página
document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // O que está escolhido na busca, nas abas e nos filtros
  const escolha = { aba: 'todas', busca: '', grupo: '', selecao: '', posicao: '', raridade: '' };

  let ultimaColada = null;   // número da última figurinha colada: é a que o "Desfazer" descola
  let arrastando = null;     // número da figurinha que está sendo arrastada agora

  // Os pedaços da página que este arquivo usa
  const paginas = document.getElementById('paginas');
  const bandeja = document.getElementById('bandeja');
  const painel = document.getElementById('painel-album');
  const campoBusca = document.getElementById('busca');
  const recado = document.getElementById('recado');
  const abas = Array.from(document.querySelectorAll('.aba'));
  const filtros = {
    grupo: document.getElementById('filtro-grupo'),
    selecao: document.getElementById('filtro-selecao'),
    posicao: document.getElementById('filtro-posicao'),
    raridade: document.getElementById('filtro-raridade'),
  };

  // -------------------------------------------------------------------------
  // 1. Montar as páginas (feito uma vez só)
  // -------------------------------------------------------------------------

  function acrescentarOpcao(select, valor, texto) {
    const opcao = criarElemento('option', '', texto);
    opcao.value = valor;
    select.append(opcao);
  }

  // As opções dos filtros saem dos dados: assim nunca ficam diferentes do álbum
  function montarFiltros() {
    for (const grupo of gruposDoAlbum()) acrescentarOpcao(filtros.grupo, grupo, 'Grupo ' + grupo);
    for (const selecao of SELECOES) acrescentarOpcao(filtros.selecao, selecao.id, selecao.nome);
    for (const posicao of ['Goleiro', 'Defensor', 'Meio-campista', 'Atacante']) acrescentarOpcao(filtros.posicao, posicao, posicao);
    for (const raridade of ['comum', 'brilhante', 'lendaria']) acrescentarOpcao(filtros.raridade, raridade, NOME_DA_RARIDADE[raridade]);
  }

  // Uma linha da ficha da seleção: "Técnico" e o nome dele, por exemplo
  function acrescentarDado(lista, rotulo, valor) {
    lista.append(criarElemento('dt', '', rotulo), criarElemento('dd', '', valor));
  }

  // A página dupla de uma seleção: a ficha à esquerda e as seis casas à direita
  function montarSelecao(selecao) {
    const pagina = criarElemento('section', 'selecao dobra');
    pagina.id = 'selecao-' + selecao.id;
    pagina.setAttribute('aria-labelledby', 'titulo-' + selecao.id);

    const ficha = criarElemento('div', 'fluxo');
    const titulo = criarElemento('h3', 'selecao-titulo');
    titulo.id = 'titulo-' + selecao.id;
    titulo.append(criarBandeirinha(selecao), selecao.nome);

    const conta = criarElemento('p', 'selecao-conta');
    conta.id = 'conta-selecao-' + selecao.id;
    const barra = criarElemento('div', 'barra');
    barra.setAttribute('aria-hidden', 'true');
    const barraCheia = criarElemento('span', 'barra-cheia');
    barraCheia.id = 'barra-selecao-' + selecao.id;
    barra.append(barraCheia);

    const dados = criarElemento('dl', 'selecao-dados');
    acrescentarDado(dados, 'Técnico', selecao.tecnico);
    acrescentarDado(dados, 'Capitão', selecao.capitao);
    acrescentarDado(dados, 'Na fase de grupos', selecao.campanha);
    acrescentarDado(dados, 'Depois do grupo', selecao.depoisDoGrupo === 'a confirmar' ? 'A confirmar.' : selecao.depoisDoGrupo);

    ficha.append(titulo, conta, barra, dados, criarElemento('p', '', selecao.curiosidade));

    const vagas = criarElemento('ol', 'vagas');
    vagas.setAttribute('aria-label', 'Figurinhas: ' + selecao.nome);
    for (const fig of figurinhasDaSelecao(selecao.id)) {
      const casa = criarElemento('li', 'casa');
      casa.id = 'casa-' + fig.numero;
      casa.dataset.numero = fig.numero;
      vagas.append(casa);
    }

    // A lista fica dentro de uma caixa: é a caixa que recebe o espaço da dobra da página
    const direita = document.createElement('div');
    direita.append(vagas);

    pagina.append(ficha, direita);
    return pagina;
  }

  // A bandeirinha que acompanha o nome de uma seleção.
  // É decorativa (alt vazio): o nome vem sempre escrito ao lado.
  function criarBandeirinha(selecao) {
    const bandeira = document.createElement('img');
    bandeira.className = 'bandeirinha';
    bandeira.src = 'assets/bandeiras/' + selecao.bandeira + '.svg';
    bandeira.alt = '';
    bandeira.width = 48;
    bandeira.height = 36;
    bandeira.loading = 'lazy';   // só baixa a imagem quando ela está perto de aparecer na tela
    return bandeira;
  }

  // O índice: uma casa por grupo, que é um link para o grupo.
  // O preenchimento de cada casa é atualizado em atualizarPlacar().
  function montarIndice() {
    const indice = document.getElementById('indice-grupos');
    for (const grupo of gruposDoAlbum()) {
      const link = document.createElement('a');
      link.href = '#titulo-grupo-' + grupo;
      link.dataset.grupo = grupo;

      const quadro = criarElemento('span', 'tira-quadro');
      quadro.id = 'indice-quadro-' + grupo;
      const letra = document.createElement('span');
      const conta = criarElemento('span', 'escondido');
      conta.id = 'indice-conta-' + grupo;
      letra.append(criarElemento('span', 'escondido', 'Grupo '), grupo, conta);
      link.append(quadro, letra);

      // Se a busca ou um filtro estiver escondendo o grupo, limpa tudo antes de ir até ele
      link.addEventListener('click', function () {
        if (document.getElementById('titulo-grupo-' + grupo).closest('.grupo').hidden) limparFiltros();
      });

      const item = criarElemento('li', 'tira-casa');
      item.append(link);
      indice.append(item);
    }
  }

  // A última página do álbum: como a Copa terminou
  function montarFinal() {
    const campea = selecaoPorId(COPA.campea);
    const titulo = document.getElementById('final-campea');
    titulo.append(criarBandeirinha(campea), 'Seleção campeã: ' + campea.nome);

    document.getElementById('final-placar').textContent = COPA.final.placar + '. Gol de ' + COPA.final.gol + '.';
    document.getElementById('final-onde').textContent = 'A final foi em ' + COPA.final.data + ', no ' + COPA.final.estadio + '.';
    document.getElementById('final-numeros').textContent = 'A Copa teve ' + COPA.numeros.jogos + ' jogos e ' + COPA.numeros.gols + ' gols.';

    const podio = document.getElementById('final-podio');
    [COPA.campea, COPA.vice, COPA.terceiro, COPA.quarto].forEach(function (id, posicao) {
      const selecao = selecaoPorId(id);
      const item = document.createElement('li');
      item.append(criarElemento('span', 'podio-lugar', (posicao + 1) + 'º'), criarBandeirinha(selecao), selecao.nome);
      podio.append(item);
    });
    document.getElementById('final-terceiro').textContent = 'Disputa do terceiro lugar: ' + COPA.terceiroLugar.placar + ', em ' + COPA.terceiroLugar.data + '.';

    const premios = document.getElementById('final-premios');
    for (const premio of COPA.premios) {
      let quem = premio.nome + ' (' + selecaoPorId(premio.selecao).nome + ')';
      if (premio.detalhe) quem += ', ' + premio.detalhe;
      acrescentarDado(premios, premio.premio, quem);
    }
  }

  function montarPaginas() {
    for (const grupo of gruposDoAlbum()) {
      const secao = criarElemento('section', 'grupo');
      secao.setAttribute('aria-labelledby', 'titulo-grupo-' + grupo);

      const cabeca = criarElemento('div', 'grupo-cabeca');
      const titulo = criarElemento('h2', '', 'Grupo ' + grupo);
      titulo.id = 'titulo-grupo-' + grupo;
      const conta = criarElemento('p', 'grupo-conta');
      conta.id = 'conta-grupo-' + grupo;
      cabeca.append(titulo, conta);
      secao.append(cabeca);

      for (const selecao of SELECOES) {
        if (selecao.grupo === grupo) secao.append(montarSelecao(selecao));
      }
      paginas.append(secao);
    }
  }

  // -------------------------------------------------------------------------
  // 2. Desenhar o que muda: casas, bandeja, placar e conquistas
  // -------------------------------------------------------------------------

  function textoDeRepetidas(quantas) {
    if (quantas === 0) return '';
    return quantas === 1 ? '+1 repetida' : '+' + quantas + ' repetidas';
  }

  // O botão "Colar" de uma figurinha (o mesmo na vaga e na bandeja)
  function criarBotaoColar(fig) {
    const botao = criarElemento('button', 'botao botao-pequeno', 'Colar');
    botao.type = 'button';
    botao.dataset.colar = fig.numero;
    // Para o leitor de tela o botão diz qual figurinha cola: "Colar a figurinha 50, Alisson"
    botao.append(criarElemento('span', 'escondido', ' a figurinha ' + fig.numero + ', ' + fig.nome));
    return botao;
  }

  // Uma casa do álbum tem três situações: figurinha colada, vaga com a
  // figurinha na mão (mostra o botão "Colar") ou vaga em que ainda falta.
  function desenharCasa(numero, acabouDeColar) {
    const album = lerAlbum();
    const fig = figurinhaPorNumero(numero);
    const casa = document.getElementById('casa-' + numero);
    casa.textContent = '';   // apaga o desenho anterior

    if (estaColada(album, numero)) {
      const figurinha = criarFigurinha(fig, { vira: true, etiqueta: textoDeRepetidas(repetidasDe(album, numero)) });
      if (acabouDeColar) figurinha.classList.add('figurinha-colando');
      casa.append(figurinha);

      // Cola fresca: só a última figurinha colada tem o botão "Desfazer"
      if (numero === ultimaColada) {
        const desfazer = criarElemento('button', 'botao botao-contorno botao-pequeno', 'Desfazer');
        desfazer.type = 'button';
        desfazer.dataset.desfazer = numero;
        desfazer.append(criarElemento('span', 'escondido', ' a colagem da figurinha ' + numero));
        casa.append(desfazer);
      }
      return;
    }

    const vaga = criarElemento('div', 'vaga');
    vaga.append(criarElemento('span', 'vaga-numero', String(numero)));
    vaga.append(criarElemento('span', 'vaga-nome', fig.tipo === 'bandeira' ? 'Bandeira' : fig.nome));
    if (estaNaMao(album, numero)) {
      vaga.classList.add('vaga-na-mao');
      vaga.append(criarElemento('span', 'vaga-legenda', 'Está na sua mão'));
      vaga.append(criarBotaoColar(fig));
    } else {
      vaga.append(criarElemento('span', 'vaga-legenda', 'Falta'));
    }
    casa.append(vaga);
  }

  // A bandeja: as figurinhas que já saíram e ainda não foram coladas
  function desenharBandeja() {
    const album = lerAlbum();
    bandeja.textContent = '';
    let quantas = 0;

    for (const fig of FIGURINHAS) {
      if (!estaNaMao(album, fig.numero)) continue;
      quantas += 1;

      const figurinha = criarFigurinha(fig, { solta: true, etiqueta: textoDeRepetidas(repetidasDe(album, fig.numero)) });
      figurinha.draggable = true;   // liga o arrastar do próprio navegador

      const item = document.createElement('li');
      item.append(figurinha, criarBotaoColar(fig));
      bandeja.append(item);
    }

    let texto = 'Nada na mão por enquanto. As figurinhas que saem do pacotinho aparecem aqui, prontas para colar.';
    if (quantas === 1) texto = '1 figurinha para colar. Arraste até a vaga com o número dela ou use o botão Colar.';
    if (quantas > 1) texto = quantas + ' figurinhas para colar. Arraste cada uma até a vaga com o número dela ou use o botão Colar.';
    document.getElementById('mao-texto').textContent = texto;
    document.getElementById('mao-vazia').hidden = quantas > 0;
  }

  // "3 de 6 coladas"
  function textoDeColadas(coladas, total) {
    return coladas + ' de ' + total + (coladas === 1 ? ' colada' : ' coladas');
  }

  function atualizarPlacar() {
    const album = lerAlbum();
    const resumo = resumoDoAlbum(album);

    document.getElementById('placar-coladas').textContent = resumo.coladas;
    document.getElementById('placar-total').textContent = resumo.total;
    document.getElementById('placar-barra').style.setProperty('--parte', resumo.coladas / resumo.total);

    let texto = 'Falta colar tudo: o álbum está novinho.';
    if (resumo.coladas > 0) texto = 'Faltam ' + resumo.faltaColar + ' para completar. Você já colou ' + resumo.porcento + '% do álbum.';
    if (resumo.faltaColar === 1) texto = 'Falta só 1 para completar o álbum.';
    if (resumo.faltaColar === 0) texto = 'Álbum completo. Colou tudo!';
    document.getElementById('placar-texto').textContent = texto;

    for (const grupo of gruposDoAlbum()) {
      const lista = figurinhasDoGrupo(grupo);
      const coladas = contarColadas(album, lista);
      document.getElementById('conta-grupo-' + grupo).textContent = textoDeColadas(coladas, lista.length);
      // A casa do grupo no índice enche junto, e o leitor de tela ouve a conta
      document.getElementById('indice-quadro-' + grupo).style.setProperty('--parte', coladas / lista.length);
      document.getElementById('indice-conta-' + grupo).textContent = ': ' + textoDeColadas(coladas, lista.length);
    }
    for (const selecao of SELECOES) {
      const lista = figurinhasDaSelecao(selecao.id);
      const coladas = contarColadas(album, lista);
      document.getElementById('conta-selecao-' + selecao.id).textContent = textoDeColadas(coladas, lista.length);
      document.getElementById('barra-selecao-' + selecao.id).style.setProperty('--parte', coladas / lista.length);
    }

    // Os números das abas
    document.getElementById('conta-todas').textContent = resumo.total;
    document.getElementById('conta-tenho').textContent = resumo.tenho;
    document.getElementById('conta-faltam').textContent = resumo.faltam;
    document.getElementById('conta-repetidas').textContent = resumo.comRepetida;
  }

  function desenharConquistas() {
    const album = lerAlbum();
    const lista = document.getElementById('conquistas');
    lista.textContent = '';

    for (const conquista of CONQUISTAS) {
      const dia = album.conquistas[conquista.id];
      const item = criarElemento('li', dia ? 'conquista conquista-feita' : 'conquista');
      item.append(criarElemento('span', 'conquista-nome', conquista.nome));
      item.append(criarElemento('span', 'conquista-como', conquista.como));
      item.append(criarElemento('span', 'conquista-estado', dia ? 'Feita em ' + dataPorExtenso(dia) : 'Ainda não'));
      lista.append(item);
    }
  }

  // -------------------------------------------------------------------------
  // 3. Busca, abas e filtros
  // -------------------------------------------------------------------------

  // "Vinícius" vira "vinicius": sem acento e em minúsculas,
  // para a busca achar mesmo que a pessoa não digite o acento.
  function semAcento(texto) {
    return String(texto).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  }

  // Esta figurinha passa pela aba, pelos filtros e pela busca escolhidos?
  function combina(fig, album) {
    const selecao = selecaoPorId(fig.selecao);
    const quantas = quantasTenho(album, fig.numero);

    if (escolha.aba === 'tenho' && quantas === 0) return false;
    if (escolha.aba === 'faltam' && quantas > 0) return false;
    if (escolha.aba === 'repetidas' && quantas < 2) return false;

    if (escolha.grupo && selecao.grupo !== escolha.grupo) return false;
    if (escolha.selecao && fig.selecao !== escolha.selecao) return false;
    if (escolha.posicao && fig.posicao !== escolha.posicao) return false;
    if (escolha.raridade && fig.raridade !== escolha.raridade) return false;

    // Busca: todas as palavras digitadas precisam aparecer em algum dado da figurinha
    const dados = semAcento([fig.numero, fig.nome, selecao.nome, fig.posicao || 'bandeira', fig.clube || '', NOME_DA_RARIDADE[fig.raridade]].join(' '));
    for (const palavra of semAcento(escolha.busca).split(' ')) {
      if (!dados.includes(palavra)) return false;
    }
    return true;
  }

  function aplicarFiltros() {
    const album = lerAlbum();
    let achadas = 0;

    for (const fig of FIGURINHAS) {
      const aparece = combina(fig, album);
      document.getElementById('casa-' + fig.numero).hidden = !aparece;
      if (aparece) achadas += 1;
    }

    // Seleção e grupo que ficaram sem nenhuma casa à mostra também somem
    for (const pagina of paginas.querySelectorAll('.selecao')) {
      pagina.hidden = pagina.querySelector('.casa:not([hidden])') === null;
    }
    for (const grupo of paginas.querySelectorAll('.grupo')) {
      grupo.hidden = grupo.querySelector('.selecao:not([hidden])') === null;
    }

    const filtrando = escolha.aba !== 'todas' || escolha.busca !== '' || escolha.grupo !== '' ||
      escolha.selecao !== '' || escolha.posicao !== '' || escolha.raridade !== '';

    let texto = achadas + ' figurinhas encontradas';
    if (achadas === 1) texto = '1 figurinha encontrada';
    if (achadas === 0) texto = 'Nenhuma figurinha encontrada';
    if (!filtrando) texto = achadas + ' figurinhas no álbum';

    document.getElementById('resultado').textContent = texto;
    document.getElementById('vazio').hidden = achadas > 0;
    document.getElementById('limpar-filtros').hidden = !filtrando;
  }

  // Marca uma aba como escolhida. Só a aba escolhida fica na ordem do Tab;
  // para ir às outras, usam-se as setas (padrão de abas do WAI-ARIA).
  function escolherAba(aba) {
    for (const outra of abas) {
      outra.setAttribute('aria-selected', outra === aba ? 'true' : 'false');
      outra.tabIndex = outra === aba ? 0 : -1;
    }
    painel.setAttribute('aria-labelledby', aba.id);
    escolha.aba = aba.dataset.aba;
    aplicarFiltros();
  }

  // -------------------------------------------------------------------------
  // 4. Colar e desfazer
  // -------------------------------------------------------------------------

  function mostrarRecado(texto, podeDesfazer) {
    document.getElementById('recado-texto').textContent = texto;
    document.getElementById('recado-desfazer').hidden = !podeDesfazer;
    recado.hidden = false;
    document.body.classList.add('com-recado');   // abre uma folga no fim da página (ver css/paginas.css)
    avisar(texto);   // o mesmo texto, lido pelo leitor de tela
  }

  function atualizarTudo() {
    desenharBandeja();
    atualizarPlacar();
    desenharConquistas();
    aplicarFiltros();
  }

  // "origem" diz de onde veio o pedido: 'vaga', 'bandeja' ou 'arrasto'
  function colar(numero, origem) {
    // Guarda a posição do botão na bandeja, para devolver o foco ao vizinho depois
    const botoesAntes = Array.from(bandeja.querySelectorAll('[data-colar]'));
    const posicao = botoesAntes.findIndex(function (botao) { return Number(botao.dataset.colar) === numero; });

    const conquistas = colarFigurinha(numero);
    if (conquistas === null) return;   // não estava na mão

    const anterior = ultimaColada;
    ultimaColada = numero;
    if (anterior !== null) desenharCasa(anterior);   // a colagem anterior perde o "Desfazer"
    desenharCasa(numero, true);
    atualizarTudo();

    const fig = figurinhaPorNumero(numero);
    const resumo = resumoDoAlbum(lerAlbum());
    let texto = 'Colou a Nº ' + numero + ', ' + fig.nome + '.';
    if (resumo.faltaColar === 0) texto += ' Álbum completo!';
    if (resumo.faltaColar === 1) texto += ' Falta 1.';
    if (resumo.faltaColar > 1) texto += ' Faltam ' + resumo.faltaColar + '.';
    for (const nome of conquistas) {
      texto += ' Conquista: ' + nome + '. Você ganhou um pacotinho extra.';
    }
    mostrarRecado(texto, true);

    // Para onde vai o foco do teclado: o botão em que ele estava deixou de existir
    if (origem === 'vaga') {
      document.querySelector('#casa-' + numero + ' .figurinha').focus();
    }
    if (origem === 'bandeja') {
      const botoes = bandeja.querySelectorAll('[data-colar]');
      const vizinho = botoes[Math.min(posicao, botoes.length - 1)];
      if (vizinho) vizinho.focus();
      else document.getElementById('titulo-mao').focus();
    }
  }

  function desfazer() {
    if (ultimaColada === null) return;
    const numero = ultimaColada;
    ultimaColada = null;

    descolarFigurinha(numero);
    desenharCasa(numero);
    atualizarTudo();

    const fig = figurinhaPorNumero(numero);
    mostrarRecado('Desfeito. A Nº ' + numero + ', ' + fig.nome + ', voltou para a mão.', false);
    document.getElementById('recado-fechar').focus();
  }

  function fecharRecado() {
    recado.hidden = true;
    document.body.classList.remove('com-recado');
    // O foco estava no recado, que sumiu: volta para o começo do conteúdo, sem rolar a página
    document.getElementById('conteudo').focus({ preventScroll: true });
  }

  // -------------------------------------------------------------------------
  // 5. Ligar os botões, a busca, as abas e o arrastar
  // -------------------------------------------------------------------------

  // Um ouvinte só para todos os botões "Colar" e "Desfazer": como eles são
  // criados e apagados o tempo todo, é mais simples ouvir o clique na página
  // inteira e descobrir em que botão foi.
  document.addEventListener('click', function (evento) {
    const botaoColar = evento.target.closest('[data-colar]');
    if (botaoColar) {
      colar(Number(botaoColar.dataset.colar), botaoColar.closest('.bandeja') ? 'bandeja' : 'vaga');
    }
    if (evento.target.closest('[data-desfazer]')) desfazer();
  });

  document.getElementById('recado-desfazer').addEventListener('click', desfazer);
  document.getElementById('recado-fechar').addEventListener('click', fecharRecado);

  // Busca: espera a pessoa parar de digitar por um instante antes de procurar,
  // para o leitor de tela não anunciar um resultado a cada letra.
  let esperaDaBusca = null;
  campoBusca.addEventListener('input', function () {
    clearTimeout(esperaDaBusca);
    esperaDaBusca = setTimeout(function () {
      escolha.busca = campoBusca.value.trim();
      aplicarFiltros();
    }, 250);
  });

  for (const nome in filtros) {
    filtros[nome].addEventListener('change', function () {
      escolha[nome] = filtros[nome].value;
      aplicarFiltros();
    });
  }

  // Volta tudo ao começo: busca vazia, filtros em "Todos" e aba "Todas"
  function limparFiltros() {
    campoBusca.value = '';
    escolha.busca = '';
    for (const nome in filtros) {
      filtros[nome].value = '';
      escolha[nome] = '';
    }
    escolherAba(abas[0]);
  }

  document.getElementById('limpar-filtros').addEventListener('click', function () {
    limparFiltros();
    campoBusca.focus();
  });

  for (const aba of abas) {
    aba.addEventListener('click', function () { escolherAba(aba); });
  }

  // Setas, Home e End passam de uma aba para a outra
  document.querySelector('.abas').addEventListener('keydown', function (evento) {
    const atual = abas.indexOf(document.activeElement);
    let proxima = null;
    if (evento.key === 'ArrowRight') proxima = (atual + 1) % abas.length;
    if (evento.key === 'ArrowLeft') proxima = (atual - 1 + abas.length) % abas.length;
    if (evento.key === 'Home') proxima = 0;
    if (evento.key === 'End') proxima = abas.length - 1;
    if (atual === -1 || proxima === null) return;

    evento.preventDefault();   // a seta não rola a página
    abas[proxima].focus();
    escolherAba(abas[proxima]);
  });

  // Arrastar e soltar, com a API do próprio HTML.
  // 1) Começou a arrastar uma figurinha da bandeja: anota qual é e marca a vaga dela.
  bandeja.addEventListener('dragstart', function (evento) {
    const figurinha = evento.target.closest('.figurinha');
    if (!figurinha) return;
    arrastando = Number(figurinha.dataset.numero);
    evento.dataTransfer.setData('text/plain', String(arrastando));   // o Firefox só arrasta se houver algum dado
    evento.dataTransfer.effectAllowed = 'move';
    document.getElementById('casa-' + arrastando).classList.add('casa-alvo');
  });

  function terminarArrasto() {
    for (const casa of paginas.querySelectorAll('.casa-alvo, .casa-em-cima')) {
      casa.classList.remove('casa-alvo', 'casa-em-cima');
    }
    arrastando = null;
  }

  bandeja.addEventListener('dragend', terminarArrasto);

  // A casa embaixo do mouse é a da figurinha arrastada?
  function casaCerta(evento) {
    const casa = evento.target.closest('.casa');
    if (casa && arrastando !== null && Number(casa.dataset.numero) === arrastando) return casa;
    return null;
  }

  // 2) Passando por cima da vaga certa: o preventDefault() avisa o navegador
  //    que ali pode soltar. Nas outras vagas ele mostra o sinal de "proibido".
  paginas.addEventListener('dragover', function (evento) {
    const casa = casaCerta(evento);
    if (!casa) return;
    evento.preventDefault();
    casa.classList.add('casa-em-cima');
  });

  paginas.addEventListener('dragleave', function (evento) {
    const casa = evento.target.closest('.casa');
    if (casa && !casa.contains(evento.relatedTarget)) casa.classList.remove('casa-em-cima');
  });

  // 3) Soltou na vaga certa: cola.
  paginas.addEventListener('drop', function (evento) {
    const casa = casaCerta(evento);
    if (!casa) return;
    evento.preventDefault();
    const numero = arrastando;
    terminarArrasto();
    colar(numero, 'arrasto');
  });

  // -------------------------------------------------------------------------
  // 6. Começar
  // -------------------------------------------------------------------------

  montarFiltros();
  montarIndice();
  montarPaginas();
  montarFinal();
  for (const fig of FIGURINHAS) desenharCasa(fig.numero);
  atualizarTudo();

  // Se o endereço veio com uma âncora (album.html#casa-50), rola até ela.
  // O navegador não faz isso sozinho porque as casas só passam a existir agora.
  if (location.hash.length > 1) {
    const alvo = document.getElementById(location.hash.slice(1));
    if (alvo) alvo.scrollIntoView();
  }
});

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  const escolha = { aba: 'todas', busca: '', grupo: '', selecao: '', posicao: '', raridade: '' };

  let ultimaColada = null;
  let arrastando = null;

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

  function acrescentarOpcao(select, valor, texto) {
    const opcao = criarElemento('option', '', texto);
    opcao.value = valor;
    select.append(opcao);
  }

  function montarFiltros() {
    for (const grupo of gruposDoAlbum()) acrescentarOpcao(filtros.grupo, grupo, 'Grupo ' + grupo);
    for (const selecao of SELECOES) acrescentarOpcao(filtros.selecao, selecao.id, selecao.nome);
    for (const posicao of ['Goleiro', 'Defensor', 'Meio-campista', 'Atacante']) acrescentarOpcao(filtros.posicao, posicao, posicao);
    for (const raridade of ['comum', 'brilhante', 'lendaria']) acrescentarOpcao(filtros.raridade, raridade, NOME_DA_RARIDADE[raridade]);
  }

  function acrescentarDado(lista, rotulo, valor) {
    lista.append(criarElemento('dt', '', rotulo), criarElemento('dd', '', valor));
  }

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

    const direita = document.createElement('div');
    direita.append(vagas);

    pagina.append(ficha, direita);
    return pagina;
  }

  function criarBandeirinha(selecao) {
    const bandeira = document.createElement('img');
    bandeira.className = 'bandeirinha';
    bandeira.src = 'assets/bandeiras/' + selecao.bandeira + '.svg';
    bandeira.alt = '';
    bandeira.width = 48;
    bandeira.height = 36;
    bandeira.loading = 'lazy';
    return bandeira;
  }

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

      link.addEventListener('click', function () {
        if (document.getElementById('titulo-grupo-' + grupo).closest('.grupo').hidden) limparFiltros();
      });

      const item = criarElemento('li', 'tira-casa');
      item.append(link);
      indice.append(item);
    }
  }

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

  function textoDeRepetidas(quantas) {
    if (quantas === 0) return '';
    return quantas === 1 ? '+1 repetida' : '+' + quantas + ' repetidas';
  }

  function criarBotaoColar(fig) {
    const botao = criarElemento('button', 'botao botao-pequeno', 'Colar');
    botao.type = 'button';
    botao.dataset.colar = fig.numero;
    botao.append(criarElemento('span', 'escondido', ' a figurinha ' + fig.numero + ', ' + fig.nome));
    return botao;
  }

  function desenharCasa(numero, acabouDeColar) {
    const album = lerAlbum();
    const fig = figurinhaPorNumero(numero);
    const casa = document.getElementById('casa-' + numero);
    casa.textContent = '';
    casa.classList.toggle('bateu', acabouDeColar === true);

    if (estaColada(album, numero)) {
      const figurinha = criarFigurinha(fig, { vira: true, etiqueta: textoDeRepetidas(repetidasDe(album, numero)) });
      if (acabouDeColar) figurinha.classList.add('figurinha-colando');
      casa.append(figurinha);

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

  function desenharBandeja() {
    const album = lerAlbum();
    bandeja.textContent = '';
    let quantas = 0;

    for (const fig of FIGURINHAS) {
      if (!estaNaMao(album, fig.numero)) continue;
      quantas += 1;

      const figurinha = criarFigurinha(fig, { solta: true, etiqueta: textoDeRepetidas(repetidasDe(album, fig.numero)) });
      figurinha.draggable = true;

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

  function textoDeColadas(coladas, total) {
    return coladas + ' de ' + total + (coladas === 1 ? ' colada' : ' coladas');
  }

  function mostrarNoOdometro(odometro, valor) {
    const algarismos = String(valor);
    odometro.dataset.valor = algarismos;

    function subir() {
      const atual = odometro.dataset.valor;
      Array.from(odometro.children).forEach(function (casa, i) {
        casa.firstChild.style.setProperty('--digito', atual[i]);
      });
    }

    if (odometro.children.length === algarismos.length) {
      subir();
      return;
    }

    odometro.textContent = '';
    for (let i = 0; i < algarismos.length; i++) {
      const casa = criarElemento('span', 'odo-casa');
      const fita = criarElemento('span', 'odo-fita');
      for (let n = 0; n <= 9; n++) fita.append(criarElemento('span', '', String(n)));
      fita.style.transitionDelay = (i * 120) + 'ms';
      casa.append(fita);
      odometro.append(casa);
    }
    requestAnimationFrame(function () { requestAnimationFrame(subir); });
  }

  function atualizarPlacar() {
    const album = lerAlbum();
    const resumo = resumoDoAlbum(album);

    document.getElementById('placar-coladas').textContent = resumo.coladas;
    mostrarNoOdometro(document.getElementById('placar-odometro'), resumo.coladas);
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
      document.getElementById('indice-quadro-' + grupo).style.setProperty('--parte', coladas / lista.length);
      document.getElementById('indice-conta-' + grupo).textContent = ': ' + textoDeColadas(coladas, lista.length);
    }
    for (const selecao of SELECOES) {
      const lista = figurinhasDaSelecao(selecao.id);
      const coladas = contarColadas(album, lista);
      document.getElementById('conta-selecao-' + selecao.id).textContent = textoDeColadas(coladas, lista.length);
      document.getElementById('barra-selecao-' + selecao.id).style.setProperty('--parte', coladas / lista.length);
    }

    document.getElementById('conta-todas').textContent = resumo.total;
    document.getElementById('conta-tenho').textContent = resumo.tenho;
    document.getElementById('conta-faltam').textContent = resumo.faltam;
    document.getElementById('conta-repetidas').textContent = resumo.comRepetida;
  }

  const carimbosPorBater = [];
  const vigiaDosCarimbos = 'IntersectionObserver' in window ? new IntersectionObserver(function (entradas) {
    for (const entrada of entradas) {
      if (!entrada.isIntersecting) continue;
      entrada.target.classList.add('conquista-carimbando');
      vigiaDosCarimbos.unobserve(entrada.target);
      const posicao = carimbosPorBater.indexOf(entrada.target.dataset.conquista);
      if (posicao >= 0) carimbosPorBater.splice(posicao, 1);
    }
  }, { threshold: 0.6 }) : null;

  function desenharConquistas(novas) {
    const album = lerAlbum();
    const lista = document.getElementById('conquistas');
    lista.textContent = '';
    for (const nome of novas || []) {
      if (vigiaDosCarimbos && !movimentoReduzido() && !carimbosPorBater.includes(nome)) carimbosPorBater.push(nome);
    }

    for (const conquista of CONQUISTAS) {
      const dia = album.conquistas[conquista.id];
      const item = criarElemento('li', dia ? 'conquista conquista-feita' : 'conquista');
      item.append(criarElemento('span', 'conquista-nome', conquista.nome));
      item.append(criarElemento('span', 'conquista-como', conquista.como));
      item.append(criarElemento('span', 'conquista-estado', dia ? 'Feita em ' + dataPorExtenso(dia) : 'Ainda não'));
      lista.append(item);

      if (dia && carimbosPorBater.includes(conquista.nome)) {
        item.classList.add('conquista-nova');
        item.dataset.conquista = conquista.nome;
        vigiaDosCarimbos.observe(item);
      }
    }
  }

  function semAcento(texto) {
    return String(texto).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  }

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

  function escolherAba(aba) {
    for (const outra of abas) {
      outra.setAttribute('aria-selected', outra === aba ? 'true' : 'false');
      outra.tabIndex = outra === aba ? 0 : -1;
    }
    painel.setAttribute('aria-labelledby', aba.id);
    escolha.aba = aba.dataset.aba;
    aplicarFiltros();
  }

  function mostrarRecado(texto, podeDesfazer) {
    document.getElementById('recado-texto').textContent = texto;
    document.getElementById('recado-desfazer').hidden = !podeDesfazer;
    recado.hidden = false;
    document.body.classList.add('com-recado');
    avisar(texto);
  }

  function atualizarTudo(conquistasNovas) {
    desenharBandeja();
    atualizarPlacar();
    desenharConquistas(conquistasNovas);
    aplicarFiltros();
  }

  function colar(numero, origem) {
    const botoesAntes = Array.from(bandeja.querySelectorAll('[data-colar]'));
    const posicao = botoesAntes.findIndex(function (botao) { return Number(botao.dataset.colar) === numero; });

    const conquistas = colarFigurinha(numero);
    if (conquistas === null) return;

    const anterior = ultimaColada;
    ultimaColada = numero;
    if (anterior !== null) desenharCasa(anterior);
    desenharCasa(numero, true);
    atualizarTudo(conquistas);

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
    document.getElementById('conteudo').focus({ preventScroll: true });
  }

  document.addEventListener('click', function (evento) {
    const botaoColar = evento.target.closest('[data-colar]');
    if (botaoColar) {
      colar(Number(botaoColar.dataset.colar), botaoColar.closest('.bandeja') ? 'bandeja' : 'vaga');
    }
    if (evento.target.closest('[data-desfazer]')) desfazer();
  });

  document.getElementById('recado-desfazer').addEventListener('click', desfazer);
  document.getElementById('recado-fechar').addEventListener('click', fecharRecado);

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

  document.querySelector('.abas').addEventListener('keydown', function (evento) {
    const atual = abas.indexOf(document.activeElement);
    let proxima = null;
    if (evento.key === 'ArrowRight') proxima = (atual + 1) % abas.length;
    if (evento.key === 'ArrowLeft') proxima = (atual - 1 + abas.length) % abas.length;
    if (evento.key === 'Home') proxima = 0;
    if (evento.key === 'End') proxima = abas.length - 1;
    if (atual === -1 || proxima === null) return;

    evento.preventDefault();
    abas[proxima].focus();
    escolherAba(abas[proxima]);
  });

  bandeja.addEventListener('dragstart', function (evento) {
    const figurinha = evento.target.closest('.figurinha');
    if (!figurinha) return;
    arrastando = Number(figurinha.dataset.numero);
    evento.dataTransfer.setData('text/plain', String(arrastando));
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

  function casaCerta(evento) {
    const casa = evento.target.closest('.casa');
    if (casa && arrastando !== null && Number(casa.dataset.numero) === arrastando) return casa;
    return null;
  }

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

  paginas.addEventListener('drop', function (evento) {
    const casa = casaCerta(evento);
    if (!casa) return;
    evento.preventDefault();
    const numero = arrastando;
    terminarArrasto();
    colar(numero, 'arrasto');
  });

  montarFiltros();
  montarIndice();
  montarPaginas();
  montarFinal();
  for (const fig of FIGURINHAS) desenharCasa(fig.numero);
  atualizarTudo();

  const campoDoFinal = document.getElementById('campo-do-final');
  if (campoDoFinal && 'IntersectionObserver' in window && !movimentoReduzido()) {
    campoDoFinal.classList.add('por-desenhar');
    const vigiaDoCampo = new IntersectionObserver(function (entradas) {
      if (!entradas[0].isIntersecting) return;
      campoDoFinal.classList.remove('por-desenhar');
      campoDoFinal.classList.add('desenhando');
      vigiaDoCampo.disconnect();
    }, { threshold: 0.4 });
    vigiaDoCampo.observe(campoDoFinal);
  }

  if (location.hash.length > 1) {
    const alvo = document.getElementById(location.hash.slice(1));
    if (alvo) alvo.scrollIntoView();
  }
});

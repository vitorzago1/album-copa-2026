document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  const IDEIAS = [
    { id: 'grao', grupo: 'fundo', nome: 'Grão de papel', resumo: 'A página deixa de ser uma cor lisa e ganha a fibra de um papel de verdade.', como: 'Um filtro do SVG (feTurbulence) desenha um chuvisco. Ele fica por cima da página, bem fraco.', onde: 'Todo navegador atual.', acesso: 'É só enfeite: o leitor de tela ignora. O contraste do texto precisa ser conferido de novo.', explicar: 'Fácil' },
    { id: 'reticula', grupo: 'fundo', nome: 'Retícula nos cantos', resumo: 'Pontinhos de impressão que crescem em direção ao canto, como em gibi e jornal.', como: 'Três camadas de bolinhas (radial-gradient). Uma máscara (mask-image) faz as maiores aparecerem só perto do canto.', onde: 'Todo navegador atual.', acesso: 'Enfeite. Fica atrás do texto, com pouca força.', explicar: 'Médio' },
    { id: 'marcas', grupo: 'fundo', nome: 'Marcas de gráfica', resumo: 'Marcas de corte, cruz de registro, barra de tons e número de página: a tela vira uma prova de impressão.', como: 'Caixinhas posicionadas nas bordas, desenhadas só com bordas e gradientes do CSS.', onde: 'Todo navegador atual.', acesso: 'Enfeite, escondido do leitor de tela.', explicar: 'Fácil' },
    { id: 'campo', grupo: 'fundo', nome: 'Linhas do campo', resumo: 'O desenho de um campo de futebol, em traço fino, por trás do conteúdo.', como: 'Um SVG com retângulos e círculos, na cor da tinta e quase transparente.', onde: 'Todo navegador atual.', acesso: 'Enfeite. Com pouca força, para não disputar com o texto.', explicar: 'Fácil' },
    { id: 'dobra', grupo: 'fundo', nome: 'Dobra e grampos', resumo: 'A sombra da dobra no meio da página dupla e dois grampos, como em álbum de banca.', como: 'Um degradê estreito no lugar da dobra e duas barrinhas com degradê cinza.', onde: 'Todo navegador atual. Só em tela larga, onde a página é dupla.', acesso: 'Enfeite.', explicar: 'Fácil' },
    { id: 'rabiscos', grupo: 'fundo', nome: 'Rabiscos de caneta', resumo: 'Círculos, setas e sublinhados feitos à mão, na cor da caneta, como se o dono do álbum tivesse anotado.', como: 'Traços em SVG, feitos de curvas. Uma animação faz o traço se desenhar (stroke-dashoffset).', onde: 'Todo navegador atual.', acesso: 'Enfeite. Com menos movimento, o traço aparece pronto.', explicar: 'Médio' },
    { id: 'carimbos', grupo: 'fundo', nome: 'Carimbos de tinta gasta', resumo: 'Carimbos tortos, com a tinta falhando nas bordas.', como: 'Borda dupla, um giro de poucos graus e um filtro do SVG (feDisplacementMap) que entorta o contorno.', onde: 'Todo navegador atual.', acesso: 'O texto do carimbo continua sendo texto de verdade.', explicar: 'Médio' },
    { id: 'falhada', grupo: 'fundo', nome: 'Títulos com tinta falhada', resumo: 'Os títulos e os números grandes ganham pequenas falhas, como impressão antiga.', como: 'Uma máscara (mask-image) de chuvisco deixa o papel aparecer em pontinhos.', onde: 'Todo navegador atual.', acesso: 'Só em letra grande. É preciso conferir se não atrapalha a leitura.', explicar: 'Médio' },
    { id: 'picote', grupo: 'fundo', nome: 'Picote com tesourinha', resumo: 'As seções passam a ser separadas por uma linha de picote com uma tesoura, no lugar do fio liso.', como: 'Borda tracejada e um desenho pequeno em SVG.', onde: 'Todo navegador atual.', acesso: 'Enfeite.', explicar: 'Fácil' },

    { id: 'holografica', grupo: 'movimento', nome: 'Lendária holográfica', resumo: 'A figurinha lendária inclina e o brilho corre conforme o mouse passa por cima.', como: 'O JavaScript lê a posição do ponteiro e guarda em variáveis do CSS. O CSS usa as variáveis para inclinar a figurinha e mover um degradê colorido.', onde: 'Todo navegador atual. No celular, funciona arrastando o dedo.', acesso: 'Com menos movimento, a figurinha não inclina: fica só o brilho.', explicar: 'Médio' },
    { id: 'batida', grupo: 'movimento', nome: 'Colar com batida', resumo: 'A figurinha desce, bate no lugar, amassa de leve e solta um anel de tinta.', como: 'Três animações de CSS (@keyframes) disparadas juntas: a queda, o anel e a tremida.', onde: 'Todo navegador atual.', acesso: 'Com menos movimento, a figurinha só aparece no lugar.', explicar: 'Fácil' },
    { id: 'carimbada', grupo: 'movimento', nome: 'Carimbo de conquista', resumo: 'Ao ganhar uma conquista, o carimbo bate com força no quadro.', como: 'Uma animação de CSS: o carimbo começa grande e transparente e encolhe até o tamanho certo.', onde: 'Todo navegador atual.', acesso: 'Com menos movimento, o carimbo só aparece.', explicar: 'Fácil' },
    { id: 'pacote', grupo: 'movimento', nome: 'Pacotinho com rasgo de verdade', resumo: 'O pacotinho balança, rasga em dente de serra, brilha como papel laminado e as figurinhas saem em leque.', como: 'O recorte em serra é um clip-path (uma lista de pontos). O resto são animações de CSS.', onde: 'Todo navegador atual.', acesso: 'Com menos movimento, o pacotinho abre direto, como hoje.', explicar: 'Médio' },
    { id: 'pagina', grupo: 'movimento', nome: 'Virar a página', resumo: 'Trocar de página do site com o movimento de uma folha virando.', como: 'A View Transitions API tira um retrato da página velha e um da nova e anima entre os dois. No site, bastaria uma regra de CSS.', onde: 'Chrome, Edge e Safari recentes. No Firefox a troca acontece sem animação, e nada quebra.', acesso: 'Com menos movimento, a troca é seca.', explicar: 'Fácil' },
    { id: 'rolagem', grupo: 'movimento', nome: 'Entrar ao rolar', resumo: 'As figurinhas e as vagas assentam no lugar conforme aparecem na tela.', como: 'Uma animação presa à rolagem (animation-timeline: view), sem JavaScript.', onde: 'Chrome, Edge e Safari recentes. Onde não funciona, tudo aparece parado no lugar.', acesso: 'Com menos movimento, nada se mexe.', explicar: 'Médio' },
    { id: 'confete', grupo: 'movimento', nome: 'Papel picado', resumo: 'Ao completar uma seleção, cai papel picado nas cores dela.', como: 'Um <canvas> (uma tela de desenho) e um laço que redesenha os papeizinhos a cada quadro.', onde: 'Todo navegador atual.', acesso: 'Dura 2 segundos e não aparece para quem pediu menos movimento.', explicar: 'Difícil' },
    { id: 'placar', grupo: 'movimento', nome: 'Placar girando', resumo: 'Os números do placar giram como um marcador antigo até chegar no valor.', como: 'Cada casa é uma fita com os números de 0 a 9. O CSS sobe a fita até o número certo (transform).', onde: 'Todo navegador atual.', acesso: 'O leitor de tela lê só o número final.', explicar: 'Médio' },
    { id: 'vivo', grupo: 'movimento', nome: 'Retícula que acende', resumo: 'No fundo, os pontinhos de impressão aparecem em volta do mouse, como uma lanterna no papel.', como: 'O JavaScript passa a posição do ponteiro ao CSS, que move uma máscara.', onde: 'Computador. No celular, os pontinhos ficam parados no meio.', acesso: 'Enfeite. Não esconde texto.', explicar: 'Médio' },
    { id: 'traco', grupo: 'movimento', nome: 'Traço que se desenha', resumo: 'As linhas do campo se desenham sozinhas quando a seção aparece.', como: 'O tracejado do SVG é animado (stroke-dashoffset), como uma caneta percorrendo a linha.', onde: 'Todo navegador atual.', acesso: 'Com menos movimento, o desenho aparece pronto.', explicar: 'Fácil' },

    { id: 'sons', grupo: 'tecnologia', nome: 'Sons feitos na hora', resumo: 'Rasgar, colar, virar e carimbar com som, sem nenhum arquivo de áudio.', como: 'A Web Audio API fabrica o som com contas: um chiado para o rasgo, uma batida grave para a colagem.', onde: 'Todo navegador atual.', acesso: 'Só toca depois de um clique. Precisa de uma chave para ligar e desligar no painel de acessibilidade.', explicar: 'Difícil' },
    { id: 'vibracao', grupo: 'tecnologia', nome: 'Vibração no celular', resumo: 'O celular dá uma tremidinha na hora de colar.', como: 'Uma linha de código: navigator.vibrate.', onde: 'Só no Android. O iPhone não tem esse recurso.', acesso: 'Entraria junto com a chave dos sons.', explicar: 'Fácil' },
    { id: 'inclinacao', grupo: 'tecnologia', nome: 'Brilho pela inclinação do celular', resumo: 'A figurinha lendária brilha conforme a pessoa inclina o aparelho.', como: 'O navegador avisa a inclinação do aparelho (evento deviceorientation), e ela move o mesmo brilho da ideia 10.', onde: 'Celulares. O iPhone pede permissão antes.', acesso: 'Depende da ideia 10. Desliga com menos movimento.', explicar: 'Difícil' },
    { id: 'app', grupo: 'tecnologia', nome: 'Instalar como aplicativo', resumo: 'O site ganha ícone na tela do celular e abre sem internet.', como: 'Um arquivo de manifesto (nome, ícone, cores) e um service worker, um script que guarda os arquivos no aparelho.', onde: 'Só no site publicado (https). Abrindo o arquivo direto do computador, não funciona.', acesso: 'Risco: se a cópia guardada ficar velha, a pessoa vê uma versão antiga do site.', explicar: 'Difícil' },
    { id: 'compartilhar', grupo: 'tecnologia', nome: 'Compartilhar pelo sistema', resumo: 'Na página de trocas, um botão abre a janela de compartilhar do próprio celular.', como: 'A Web Share API: navigator.share com o texto da lista.', onde: 'Celulares e alguns navegadores de computador. Onde não existe, ficam os botões de hoje.', acesso: 'Usa a janela do próprio sistema, que já é acessível.', explicar: 'Fácil' },
  ];

  IDEIAS.forEach(function (ideia, posicao) { ideia.numero = posicao + 1; });

  const CHAVE = 'colei.laboratorio';
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

  const prova = document.getElementById('prova');

  function acrescentarDado(lista, rotulo, valor) {
    lista.append(criarElemento('dt', '', rotulo), criarElemento('dd', '', valor));
  }

  function criarFicha(ideia) {
    const titulo = criarElemento('h3', 'lab-nome');
    titulo.append(criarElemento('span', 'lab-numero', String(ideia.numero)), ideia.nome);
    const resumo = criarElemento('p', 'lab-resumo', ideia.resumo);

    const caixa = document.createElement('input');
    caixa.type = 'checkbox';
    caixa.dataset.quero = ideia.id;
    caixa.checked = guardado.quero.includes(ideia.id);
    const chave = criarElemento('label', 'opcao lab-quero');
    chave.append(caixa, criarElemento('span', '', ideia.grupo === 'fundo' ? 'Ligar na folha e querer no site' : 'Quero no site'));

    const detalhes = criarElemento('details', 'lab-detalhes');
    const lista = document.createElement('dl');
    acrescentarDado(lista, 'Como funciona', ideia.como);
    acrescentarDado(lista, 'Onde funciona', ideia.onde);
    acrescentarDado(lista, 'Acessibilidade', ideia.acesso);
    acrescentarDado(lista, 'Explicar o código na apresentação', ideia.explicar);
    detalhes.append(criarElemento('summary', '', 'Detalhes técnicos'), lista);

    return { titulo: titulo, resumo: resumo, chave: chave, detalhes: detalhes, caixa: caixa };
  }

  for (const ideia of IDEIAS) {
    const ficha = criarFicha(ideia);

    if (ideia.grupo === 'fundo') {
      const caixa = criarElemento('div', 'lab-ficha');
      caixa.append(ficha.titulo, ficha.resumo, ficha.chave, ficha.detalhes);
      document.getElementById('lista-fundo').append(caixa);
      prova.classList.toggle('ef-' + ideia.id, ficha.caixa.checked);
    } else {
      const cartao = document.querySelector('.lab-item[data-id="' + ideia.id + '"]');
      cartao.prepend(ficha.titulo, ficha.resumo);
      cartao.append(ficha.chave, ficha.detalhes);
    }
  }

  const campoNotas = document.getElementById('escolhas-notas');
  const campoTexto = document.getElementById('escolhas-texto');
  campoNotas.value = guardado.notas;

  function desenharEscolhas() {
    const marcadas = IDEIAS.filter(function (ideia) { return guardado.quero.includes(ideia.id); });
    const naoMarcadas = IDEIAS.filter(function (ideia) { return !guardado.quero.includes(ideia.id); });

    const lista = document.getElementById('escolhas-lista');
    lista.textContent = '';
    for (const ideia of marcadas) {
      const item = document.createElement('li');
      item.append(criarElemento('span', 'lab-numero', String(ideia.numero)), ideia.nome);
      lista.append(item);
    }

    let conta = 'Nada marcado ainda.';
    if (marcadas.length === 1) conta = '1 ideia marcada.';
    if (marcadas.length > 1) conta = marcadas.length + ' ideias marcadas.';
    document.getElementById('escolhas-conta').textContent = conta;

    const linhas = ['Escolhas do laboratório do Colei!'];
    linhas.push('Quero (' + marcadas.length + '): ' + (marcadas.length > 0 ? marcadas.map(function (i) { return i.numero + ' ' + i.nome; }).join('; ') : 'nada'));
    linhas.push('Não marquei: ' + (naoMarcadas.length > 0 ? naoMarcadas.map(function (i) { return i.numero; }).join(', ') : 'nada'));
    linhas.push('Observações: ' + (campoNotas.value.trim() || 'nenhuma'));
    campoTexto.value = linhas.join('\n');
  }

  document.addEventListener('change', function (evento) {
    const id = evento.target.dataset ? evento.target.dataset.quero : undefined;
    if (!id) return;
    guardado.quero = guardado.quero.filter(function (outro) { return outro !== id; });
    if (evento.target.checked) guardado.quero.push(id);
    guardar();

    const ideia = IDEIAS.find(function (i) { return i.id === id; });
    if (ideia.grupo === 'fundo') prova.classList.toggle('ef-' + id, evento.target.checked);
    desenharEscolhas();
  });

  campoNotas.addEventListener('input', function () {
    guardado.notas = campoNotas.value;
    guardar();
    desenharEscolhas();
  });

  document.getElementById('escolhas-limpar').addEventListener('click', function () {
    guardado.quero = [];
    guardar();
    for (const caixa of document.querySelectorAll('[data-quero]')) caixa.checked = false;
    for (const ideia of IDEIAS) prova.classList.remove('ef-' + ideia.id);
    desenharEscolhas();
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

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.getElementById('aviso-movimento').hidden = false;
  }

  document.getElementById('forcar-movimento').addEventListener('click', function () {
    const raiz = document.documentElement;
    raiz.dataset.movimento = 'completo';
    new MutationObserver(function () {
      if (raiz.dataset.movimento === 'normal') raiz.dataset.movimento = 'completo';
    }).observe(raiz, { attributes: true, attributeFilter: ['data-movimento'] });
    document.getElementById('forcar-aviso').textContent = 'Animações ligadas nesta página, até ela ser fechada ou recarregada.';
  });

  function criarVaga(numero, nome) {
    const vaga = criarElemento('div', 'vaga');
    vaga.append(criarElemento('span', 'vaga-numero', String(numero)), criarElemento('span', 'vaga-nome', nome), criarElemento('span', 'vaga-legenda', 'Falta'));
    return vaga;
  }

  function criarRabisco(classe, caixa, d) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'rabisco ' + classe);
    svg.setAttribute('viewBox', caixa);
    svg.setAttribute('preserveAspectRatio', 'none');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('focusable', 'false');
    const traco = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    traco.setAttribute('pathLength', '1');
    traco.setAttribute('d', d);
    svg.append(traco);
    return svg;
  }

  const casasDaProva = document.getElementById('prova-casas');
  for (const numero of [54, 50]) {
    const casa = document.createElement('div');
    casa.append(criarFigurinha(figurinhaPorNumero(numero), {}));
    casasDaProva.append(casa);
  }
  const casaVazia = document.createElement('div');
  casaVazia.append(criarVaga(52, 'Casemiro'));
  casaVazia.append(criarRabisco('rabisco-circulo', '0 0 100 60', 'M58 6C26 1 5 14 6 32c1 18 34 26 62 20 22-5 30-22 22-36C82 6 60 2 40 7'));
  casaVazia.append(criarRabisco('rabisco-seta', '0 0 60 40', 'M4 6c14 16 30 24 50 26M54 32 42 34M54 32 46 22'));
  casasDaProva.append(casaVazia);

  function recomecar(elemento, classe) {
    elemento.classList.remove(classe);
    void elemento.offsetWidth;
    elemento.classList.add(classe);
  }

  const holo = criarFigurinha(figurinhaPorNumero(54), {});
  holo.classList.add('holo');
  document.getElementById('palco-holografica').append(holo);

  holo.addEventListener('pointermove', function (evento) {
    const caixa = holo.getBoundingClientRect();
    const x = (evento.clientX - caixa.left) / caixa.width;
    const y = (evento.clientY - caixa.top) / caixa.height;
    holo.style.setProperty('--px', (x * 100) + '%');
    holo.style.setProperty('--py', (y * 100) + '%');
    holo.style.setProperty('--brilho', '0.9');
    if (!movimentoReduzido()) {
      holo.style.setProperty('--ry', ((x - 0.5) * 26) + 'deg');
      holo.style.setProperty('--rx', ((0.5 - y) * 26) + 'deg');
    }
  });

  holo.addEventListener('pointerleave', function () {
    for (const nome of ['--px', '--py', '--rx', '--ry', '--brilho']) holo.style.removeProperty(nome);
  });

  const palcoBatida = document.getElementById('palco-batida');
  const casaDeBatida = criarElemento('div', 'casa-de-batida');
  palcoBatida.append(casaDeBatida);

  function desenharBatida(colada) {
    casaDeBatida.textContent = '';
    casaDeBatida.classList.remove('bateu');
    if (!colada) {
      casaDeBatida.append(criarVaga(52, 'Casemiro'));
      return;
    }
    const figurinha = criarFigurinha(figurinhaPorNumero(52), {});
    figurinha.classList.add('figurinha-batendo');
    casaDeBatida.append(figurinha);
    recomecar(casaDeBatida, 'bateu');
  }

  document.getElementById('batida-colar').addEventListener('click', function () { desenharBatida(true); });
  document.getElementById('batida-desfazer').addEventListener('click', function () { desenharBatida(false); });
  desenharBatida(false);

  const carimbo = document.getElementById('carimbada-carimbo');
  const cartaoDoCarimbo = document.getElementById('carimbada-cartao');

  document.getElementById('carimbada-bater').addEventListener('click', function () {
    carimbo.hidden = false;
    recomecar(carimbo, 'carimbo-batendo');
    recomecar(cartaoDoCarimbo, 'cartao-tremendo');
  });

  document.getElementById('carimbada-limpar').addEventListener('click', function () {
    carimbo.hidden = true;
  });

  const pacote = document.getElementById('pacote-2');
  const leque = document.querySelector('.leque');

  function rasgarPacote() {
    recomecar(pacote, 'rasgado');
    leque.classList.add('aberto');
  }

  document.getElementById('pacote-rasgar').addEventListener('click', rasgarPacote);
  pacote.addEventListener('click', rasgarPacote);
  document.getElementById('pacote-fechar').addEventListener('click', function () {
    pacote.classList.remove('rasgado');
    leque.classList.remove('aberto');
  });

  const folha = document.getElementById('folha-de-album');
  const LETRAS = ['A', 'B', 'C', 'D'];
  let paginaAtual = 0;

  function desenharFolha() {
    folha.textContent = '';
    folha.append(criarElemento('h4', '', 'Grupo ' + LETRAS[paginaAtual]));
    const casas = criarElemento('div', 'folha-de-album-casas');
    for (let i = 1; i <= 8; i++) casas.append(criarElemento('span', '', String(paginaAtual * 24 + i)));
    folha.append(casas);
  }

  function virarPagina(passo) {
    function trocar() {
      paginaAtual = (paginaAtual + passo + LETRAS.length) % LETRAS.length;
      desenharFolha();
    }
    if (!document.startViewTransition || movimentoReduzido()) {
      trocar();
      return;
    }
    document.documentElement.dataset.virada = passo > 0 ? 'avancar' : 'voltar';
    document.startViewTransition(trocar);
  }

  document.getElementById('pagina-proxima').addEventListener('click', function () { virarPagina(1); });
  document.getElementById('pagina-anterior').addEventListener('click', function () { virarPagina(-1); });
  document.getElementById('pagina-suporte').textContent = document.startViewTransition
    ? 'Este navegador tem a View Transitions API.'
    : 'Este navegador ainda não tem a View Transitions API: aqui a troca é seca.';
  desenharFolha();

  const gradeDaRolagem = criarElemento('div', 'rolagem-grade');
  for (const numero of [217, 220, 222, 49, 53, 54, 193, 195, 196, 271, 274, 276]) {
    const item = criarElemento('div', 'rolagem-item');
    item.append(criarFigurinha(figurinhaPorNumero(numero), {}));
    gradeDaRolagem.append(item);
  }
  document.getElementById('palco-rolagem').append(gradeDaRolagem);
  if (!(window.CSS && CSS.supports('animation-timeline: view()'))) {
    document.getElementById('rolagem-suporte').textContent = 'Este navegador ainda não tem animação presa à rolagem: aqui as figurinhas aparecem paradas.';
  }

  const tela = document.getElementById('confete-tela');

  function soltarConfete() {
    if (movimentoReduzido()) return;

    const caixa = tela.getBoundingClientRect();
    tela.width = caixa.width;
    tela.height = caixa.height;
    const pincel = tela.getContext('2d');
    const CORES = ['#228B59', '#F7D417', '#1B3F8F', '#F2C230', '#FFFFFF', '#14204F'];

    const papeis = [];
    for (let i = 0; i < 110; i++) {
      papeis.push({
        x: caixa.width / 2 + (Math.random() - 0.5) * 40,
        y: caixa.height * 0.6,
        velX: (Math.random() - 0.5) * 11,
        velY: -(4 + Math.random() * 8),
        giro: Math.random() * 6.28,
        velGiro: (Math.random() - 0.5) * 0.5,
        largura: 5 + Math.random() * 6,
        altura: 8 + Math.random() * 8,
        cor: CORES[i % CORES.length],
      });
    }

    const inicio = performance.now();
    const DURACAO = 2000;

    function quadro(agora) {
      const passou = agora - inicio;
      pincel.clearRect(0, 0, tela.width, tela.height);
      pincel.globalAlpha = Math.max(0, 1 - Math.max(0, passou - 1300) / 700);
      for (const papel of papeis) {
        papel.velY += 0.3;
        papel.velX *= 0.99;
        papel.x += papel.velX;
        papel.y += papel.velY;
        papel.giro += papel.velGiro;
        pincel.save();
        pincel.translate(papel.x, papel.y);
        pincel.rotate(papel.giro);
        pincel.fillStyle = papel.cor;
        pincel.fillRect(-papel.largura / 2, -papel.altura / 2, papel.largura, papel.altura);
        pincel.restore();
      }
      if (passou < DURACAO) requestAnimationFrame(quadro);
      else pincel.clearRect(0, 0, tela.width, tela.height);
    }
    requestAnimationFrame(quadro);
  }

  document.getElementById('confete-soltar').addEventListener('click', soltarConfete);

  const odometro = document.getElementById('odometro');

  function mostrarNoOdometro(valor) {
    const digitos = String(valor).split('');
    odometro.textContent = '';
    odometro.setAttribute('aria-label', String(valor));

    const fitas = [];
    digitos.forEach(function (digito, posicao) {
      const casa = criarElemento('span', 'odo-casa');
      casa.setAttribute('aria-hidden', 'true');
      const fita = criarElemento('span', 'odo-fita');
      for (let n = 0; n <= 9; n++) fita.append(criarElemento('span', '', String(n)));
      fita.style.transitionDelay = (posicao * 140) + 'ms';
      casa.append(fita);
      odometro.append(casa);
      fitas.push({ fita: fita, digito: digito });
    });

    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        for (const item of fitas) item.fita.style.setProperty('--digito', item.digito);
      });
    });
  }

  document.getElementById('placar-girar').addEventListener('click', function () { mostrarNoOdometro(127); });
  document.getElementById('placar-zerar').addEventListener('click', function () { mostrarNoOdometro(0); });
  mostrarNoOdometro(0);

  const palcoVivo = document.getElementById('palco-vivo');
  palcoVivo.addEventListener('pointermove', function (evento) {
    const caixa = palcoVivo.getBoundingClientRect();
    palcoVivo.style.setProperty('--x', (evento.clientX - caixa.left) + 'px');
    palcoVivo.style.setProperty('--y', (evento.clientY - caixa.top) + 'px');
  });

  document.getElementById('traco-desenhar').addEventListener('click', function () {
    recomecar(document.getElementById('traco-campo'), 'desenhando');
  });

  let mesaDeSom = null;

  function pegarMesaDeSom() {
    if (!mesaDeSom) mesaDeSom = new (window.AudioContext || window.webkitAudioContext)();
    return mesaDeSom;
  }

  function tocarChiado(duracao, tipoDeFiltro, agudoNoComeco, agudoNoFim, volume) {
    const mesa = pegarMesaDeSom();
    const agora = mesa.currentTime;

    const amostras = mesa.createBuffer(1, mesa.sampleRate * duracao, mesa.sampleRate);
    const dados = amostras.getChannelData(0);
    for (let i = 0; i < dados.length; i++) dados[i] = Math.random() * 2 - 1;
    const fonte = mesa.createBufferSource();
    fonte.buffer = amostras;

    const filtro = mesa.createBiquadFilter();
    filtro.type = tipoDeFiltro;
    filtro.frequency.setValueAtTime(agudoNoComeco, agora);
    filtro.frequency.exponentialRampToValueAtTime(agudoNoFim, agora + duracao);

    const ganho = mesa.createGain();
    ganho.gain.setValueAtTime(volume, agora);
    ganho.gain.exponentialRampToValueAtTime(0.001, agora + duracao);

    fonte.connect(filtro).connect(ganho).connect(mesa.destination);
    fonte.start(agora);
  }

  function tocarBatida(notaNoComeco, notaNoFim, duracao, volume) {
    const mesa = pegarMesaDeSom();
    const agora = mesa.currentTime;

    const nota = mesa.createOscillator();
    nota.type = 'sine';
    nota.frequency.setValueAtTime(notaNoComeco, agora);
    nota.frequency.exponentialRampToValueAtTime(notaNoFim, agora + duracao);

    const ganho = mesa.createGain();
    ganho.gain.setValueAtTime(volume, agora);
    ganho.gain.exponentialRampToValueAtTime(0.001, agora + duracao);

    nota.connect(ganho).connect(mesa.destination);
    nota.start(agora);
    nota.stop(agora + duracao);
  }

  const SONS = {
    rasgar: function () { tocarChiado(0.38, 'bandpass', 3200, 700, 0.3); },
    colar: function () { tocarBatida(170, 55, 0.14, 0.4); tocarChiado(0.05, 'highpass', 1800, 1200, 0.12); },
    virar: function () { tocarChiado(0.2, 'lowpass', 1400, 4200, 0.14); },
    carimbar: function () { tocarBatida(120, 42, 0.2, 0.5); tocarChiado(0.09, 'lowpass', 900, 300, 0.25); },
  };

  for (const botao of document.querySelectorAll('[data-som]')) {
    botao.addEventListener('click', function () { SONS[botao.dataset.som](); });
  }

  document.getElementById('vibrar').addEventListener('click', function () {
    const aviso = document.getElementById('vibrar-aviso');
    if (!navigator.vibrate) {
      aviso.textContent = 'Este aparelho ou navegador não tem vibração. Teste em um celular Android.';
      return;
    }
    navigator.vibrate([18, 40, 30]);
    aviso.textContent = 'Pedido de vibração enviado. No computador não acontece nada.';
  });

  document.getElementById('compartilhar').addEventListener('click', function () {
    const aviso = document.getElementById('compartilhar-aviso');
    if (!navigator.share) {
      aviso.textContent = 'Este navegador não tem a janela de compartilhar. No site, ficariam os botões de copiar e do WhatsApp.';
      return;
    }
    navigator.share({ title: 'Colei!', text: 'Colei! Tenho para trocar: 50 Alisson. Preciso: 52, 55, 56.' }).then(function () {
      aviso.textContent = 'Janela de compartilhar aberta.';
    }, function () {
      aviso.textContent = 'O compartilhamento foi fechado sem enviar.';
    });
  });

  desenharEscolhas();
});

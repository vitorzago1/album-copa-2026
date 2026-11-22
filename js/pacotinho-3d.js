// ============================================================================
// pacotinho-3d.js
// ----------------------------------------------------------------------------
// Na página Pacotinhos, troca o desenho do pacotinho fechado (feito em CSS)
// pelo pacotinho 3D ao vivo (js/pacote3d.js, com a biblioteca Three.js).
//
// O que ele faz a mais que o de CSS:
//   - inclina conforme o mouse (ou o dedo) passa por cima, e o brilho do papel
//     laminado anda junto;
//   - na hora de rasgar, a aba sai de verdade e mostra o lado prateado.
//
// Este arquivo NÃO mexe nas regras da página: quem sorteia, guarda e mostra as
// figurinhas continua sendo o js/pacotinho.js. Aqui só se troca o desenho.
// Se o navegador não tiver WebGL (o desenho 3D), nada acontece e o pacotinho
// de CSS continua no lugar.
//
// Depende de: js/vendor/three.min.js, js/pacote3d.js, js/figurinha.js
// (movimentoReduzido) e js/pacotinho.js.
// ============================================================================

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  const palco = document.getElementById('palco');
  if (!palco || typeof THREE === 'undefined' || typeof criarPacote3d !== 'function') return;

  // Uma única tela de desenho para a página inteira. Ela é guardada e posta de
  // novo dentro de cada pacotinho que aparece ("Abrir outro pacotinho").
  const tela = document.createElement('canvas');
  tela.className = 'pacotinho-vivo';

  // O navegador sabe desenhar em 3D (WebGL)? A pergunta é feita antes, com uma
  // tela de teste, para a Three.js não escrever um erro no console à toa.
  function temWebGL() {
    try {
      const teste = document.createElement('canvas');
      return Boolean(teste.getContext('webgl') || teste.getContext('experimental-webgl'));
    } catch (erro) {
      return false;
    }
  }
  if (!temWebGL()) return;   // sem WebGL: fica o pacotinho de CSS

  let pacote;
  try {
    // alturaVisivel: 10.5 = a altura do pacotinho (7) mais metade de folga,
    // para a aba ter para onde voar
    pacote = criarPacote3d(tela, { alturaVisivel: 10.5 });
  } catch (erro) {
    return;   // algo deu errado ao montar o 3D: fica o pacotinho de CSS
  }

  const TEMPO_DE_RASGAR = 800;   // o mesmo do js/pacotinho.js, em milésimos de segundo
  let dono = null;               // o pacotinho de CSS que está "vestido" com a tela
  let rasgando = false;
  let quadroPedido = false;

  // A pose de agora e a pose para onde o pacotinho quer ir
  const pose = { giroX: 0, giroY: 0, rasgo: 0, y: 0 };
  const alvo = { giroX: 0, giroY: 0 };

  function desenhar() {
    pacote.aplicar(pose);
    pacote.desenhar();
  }

  // Põe a tela dentro de um pacotinho de CSS que acabou de aparecer no palco
  function vestir(pacotinho) {
    dono = pacotinho;
    rasgando = false;
    pose.giroX = pose.giroY = pose.rasgo = pose.y = 0;
    alvo.giroX = alvo.giroY = 0;
    tela.style.opacity = '';

    pacotinho.classList.add('pacotinho-com-3d');   // o CSS esconde o desenho antigo
    pacotinho.append(tela);
    pacote.medir();
    desenhar();

    // O pacotinho inclina para o lado em que o ponteiro está
    pacotinho.addEventListener('pointermove', function (evento) {
      if (rasgando || movimentoReduzido()) return;
      const caixa = pacotinho.getBoundingClientRect();
      const x = (evento.clientX - caixa.left) / caixa.width - 0.5;    // de -0,5 (esquerda) a 0,5 (direita)
      const y = (evento.clientY - caixa.top) / caixa.height - 0.5;    // de -0,5 (em cima) a 0,5 (embaixo)
      alvo.giroY = x * 34;
      alvo.giroX = y * 22;
      pedirQuadroDoPacote();
    });
    pacotinho.addEventListener('pointerleave', function () {
      alvo.giroX = alvo.giroY = 0;
      pedirQuadroDoPacote();
    });
  }

  // Um quadro da inclinação: anda 15% do caminho até o alvo e desenha.
  // O laço para sozinho quando o pacotinho chega: nada fica rodando à toa.
  function quadroDoPacote() {
    quadroPedido = false;
    if (rasgando || !tela.isConnected) return;
    pose.giroX += (alvo.giroX - pose.giroX) * 0.15;
    pose.giroY += (alvo.giroY - pose.giroY) * 0.15;
    desenhar();
    if (Math.abs(alvo.giroX - pose.giroX) + Math.abs(alvo.giroY - pose.giroY) > 0.05) pedirQuadroDoPacote();
  }

  function pedirQuadroDoPacote() {
    if (quadroPedido) return;
    quadroPedido = true;
    requestAnimationFrame(quadroDoPacote);
  }

  // A animação de rasgar, no mesmo tempo da animação de CSS que ela substitui:
  // primeiro a aba sai; no fim, o pacotinho vazio escorrega e some.
  function rasgar() {
    if (rasgando || movimentoReduzido()) return;   // com menos movimento, a página nem espera a animação
    rasgando = true;
    const inicio = performance.now();
    const giroX = pose.giroX;
    const giroY = pose.giroY;

    function quadroDoRasgo(agora) {
      if (!tela.isConnected) return;   // o palco já foi trocado pelas figurinhas
      const t = Math.min(1, (agora - inicio) / TEMPO_DE_RASGAR);
      const fim = Math.max(0, (t - 0.55) / 0.45);   // 0 até 55% do tempo; depois sobe até 1
      pose.rasgo = Math.min(1, t / 0.65);
      pose.giroX = giroX * (1 - t);
      pose.giroY = giroY * (1 - t);
      pose.y = -fim * 1.2;
      tela.style.opacity = String(1 - fim);
      desenhar();
      if (t < 1) requestAnimationFrame(quadroDoRasgo);
    }
    requestAnimationFrame(quadroDoRasgo);
  }

  // Um vigia olha o palco. Ele avisa em dois casos:
  //   - apareceu um pacotinho novo (a página desenhou o palco de novo);
  //   - o pacotinho ganhou a classe "pacotinho-rasgando" (a pessoa rasgou).
  function olharOPalco() {
    const pacotinho = palco.querySelector('.pacotinho');
    if (pacotinho && pacotinho !== dono) vestir(pacotinho);
    if (pacotinho && pacotinho.classList.contains('pacotinho-rasgando')) rasgar();
  }
  new MutationObserver(olharOPalco).observe(palco, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] });
  olharOPalco();

  // Tema novo, cores novas: a estampa é refeita
  new MutationObserver(function () {
    pacote.estampar();
    if (tela.isConnected) desenhar();
  }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-tema', 'data-contraste'] });

  window.addEventListener('resize', function () {
    if (!tela.isConnected) return;
    pacote.medir();
    desenhar();
  });

  // A estampa usa as letras do site: quando elas chegam, é desenhada de novo
  if (document.fonts && document.fonts.load) {
    Promise.all([
      document.fonts.load('900 100px "Londrina Solid"'),
      document.fonts.load('700 60px "Atkinson Hyperlegible Next"'),
    ]).then(function () {
      pacote.estampar();
      if (tela.isConnected) desenhar();
    });
  }
});

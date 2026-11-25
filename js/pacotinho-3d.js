document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  const palco = document.getElementById('palco');
  if (!palco || typeof THREE === 'undefined' || typeof criarPacote3d !== 'function') return;

  const tela = document.createElement('canvas');
  tela.className = 'pacotinho-vivo';

  function temWebGL() {
    try {
      const teste = document.createElement('canvas');
      return Boolean(teste.getContext('webgl') || teste.getContext('experimental-webgl'));
    } catch (erro) {
      return false;
    }
  }
  if (!temWebGL()) return;

  let pacote;
  try {
    pacote = criarPacote3d(tela, { alturaVisivel: 10.5 });
  } catch (erro) {
    return;
  }

  const TEMPO_DE_RASGAR = 800;
  let dono = null;
  let rasgando = false;
  let quadroPedido = false;

  const pose = { giroX: 0, giroY: 0, rasgo: 0, y: 0 };
  const alvo = { giroX: 0, giroY: 0 };

  function desenhar() {
    pacote.aplicar(pose);
    pacote.desenhar();
  }

  function vestir(pacotinho) {
    dono = pacotinho;
    rasgando = false;
    pose.giroX = pose.giroY = pose.rasgo = pose.y = 0;
    alvo.giroX = alvo.giroY = 0;
    tela.style.opacity = '';

    pacotinho.classList.add('pacotinho-com-3d');
    pacotinho.append(tela);
    pacote.medir();
    desenhar();

    pacotinho.addEventListener('pointermove', function (evento) {
      if (rasgando || movimentoReduzido()) return;
      const caixa = pacotinho.getBoundingClientRect();
      const x = (evento.clientX - caixa.left) / caixa.width - 0.5;
      const y = (evento.clientY - caixa.top) / caixa.height - 0.5;
      alvo.giroY = x * 34;
      alvo.giroX = y * 22;
      pedirQuadroDoPacote();
    });
    pacotinho.addEventListener('pointerleave', function () {
      alvo.giroX = alvo.giroY = 0;
      pedirQuadroDoPacote();
    });
  }

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

  function rasgar() {
    if (rasgando || movimentoReduzido()) return;
    rasgando = true;
    const inicio = performance.now();
    const giroX = pose.giroX;
    const giroY = pose.giroY;

    function quadroDoRasgo(agora) {
      if (!tela.isConnected) return;
      const t = Math.min(1, (agora - inicio) / TEMPO_DE_RASGAR);
      const fim = Math.max(0, (t - 0.55) / 0.45);
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

  function olharOPalco() {
    const pacotinho = palco.querySelector('.pacotinho');
    if (pacotinho && pacotinho !== dono) vestir(pacotinho);
    if (pacotinho && pacotinho.classList.contains('pacotinho-rasgando')) rasgar();
  }
  new MutationObserver(olharOPalco).observe(palco, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] });
  olharOPalco();

  new MutationObserver(function () {
    pacote.estampar();
    if (tela.isConnected) desenhar();
  }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-tema', 'data-contraste'] });

  window.addEventListener('resize', function () {
    if (!tela.isConnected) return;
    pacote.medir();
    desenhar();
  });

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

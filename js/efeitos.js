document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  function querMenosMovimento() {
    const pedido = document.documentElement.dataset.movimento;
    if (pedido === 'reduzido') return true;
    if (pedido === 'completo') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  const lanterna = document.createElement('div');
  lanterna.className = 'lanterna';
  lanterna.setAttribute('aria-hidden', 'true');
  document.body.prepend(lanterna);

  function apagarLanterna() {
    lanterna.classList.remove('lanterna-acesa');
  }

  let brilhando = null;

  function apagarBrilho() {
    if (!brilhando) return;
    for (const nome of ['--px', '--py', '--rx', '--ry', '--brilho', '--tempo-do-movimento']) {
      brilhando.style.removeProperty(nome);
    }
    brilhando = null;
  }

  document.addEventListener('pointermove', function (evento) {
    const parado = querMenosMovimento();

    if (evento.pointerType === 'mouse' && !parado) {
      lanterna.style.setProperty('--x', evento.clientX + 'px');
      lanterna.style.setProperty('--y', evento.clientY + 'px');
      lanterna.classList.add('lanterna-acesa');
    } else {
      apagarLanterna();
    }

    let figurinha = evento.target.closest ? evento.target.closest('.figurinha-lendaria') : null;
    if (figurinha && (figurinha.dataset.face === 'verso' || figurinha.dataset.face === 'costas')) figurinha = null;
    if (figurinha !== brilhando) apagarBrilho();
    if (!figurinha) return;
    brilhando = figurinha;

    const caixa = figurinha.getBoundingClientRect();
    const x = (evento.clientX - caixa.left) / caixa.width;
    const y = (evento.clientY - caixa.top) / caixa.height;
    figurinha.style.setProperty('--px', (x * 100).toFixed(1) + '%');
    figurinha.style.setProperty('--py', (y * 100).toFixed(1) + '%');
    figurinha.style.setProperty('--brilho', '0.9');
    if (!parado) {
      figurinha.style.setProperty('--ry', ((x - 0.5) * 22).toFixed(1) + 'deg');
      figurinha.style.setProperty('--rx', ((0.5 - y) * 22).toFixed(1) + 'deg');
      figurinha.style.setProperty('--tempo-do-movimento', '160ms');
    }
  });

  document.addEventListener('click', apagarBrilho, true);

  document.documentElement.addEventListener('pointerleave', function () {
    apagarLanterna();
    apagarBrilho();
  });
});

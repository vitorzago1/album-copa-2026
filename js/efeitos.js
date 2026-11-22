// ============================================================================
// efeitos.js
// ----------------------------------------------------------------------------
// Dois efeitos que valem nas 7 páginas e respondem ao ponteiro (o mouse):
//
//   1. Retícula que acende: os pontinhos de impressão aparecem no papel em
//      volta do ponteiro, como uma lanterna passando pela página.
//   2. Lendária holográfica: a figurinha lendária inclina e o brilho colorido
//      corre conforme o ponteiro passa por cima dela.
//
// Nos dois casos o JavaScript só anota a posição do ponteiro em variáveis do
// CSS (--x, --y, --px, --py...). Quem desenha é o CSS (base.css e componentes.css).
//
// Não depende de nenhum outro arquivo do site.
// ============================================================================

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // A pessoa pediu menos movimento? (no painel de acessibilidade ou no aparelho)
  // "completo" é o pedido contrário: ver as animações mesmo que o aparelho peça menos.
  function querMenosMovimento() {
    const pedido = document.documentElement.dataset.movimento;
    if (pedido === 'reduzido') return true;
    if (pedido === 'completo') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  // -------------------------------------------------------------------------
  // 1. Retícula que acende
  // -------------------------------------------------------------------------
  // Uma camada do tamanho da tela, atrás de tudo, coberta de pontinhos. Uma
  // máscara (no CSS) só deixa ver os que estão perto do ponteiro. A posição
  // fica guardada na própria camada, que não tem nada dentro: assim, mexer o
  // mouse não obriga o navegador a recalcular o estilo da página inteira.

  const lanterna = document.createElement('div');
  lanterna.className = 'lanterna';
  lanterna.setAttribute('aria-hidden', 'true');   // é só enfeite
  document.body.prepend(lanterna);

  function apagarLanterna() {
    lanterna.classList.remove('lanterna-acesa');
  }

  // -------------------------------------------------------------------------
  // 2. Lendária holográfica
  // -------------------------------------------------------------------------

  let brilhando = null;   // a figurinha lendária que está sob o ponteiro agora

  function apagarBrilho() {
    if (!brilhando) return;
    for (const nome of ['--px', '--py', '--rx', '--ry', '--brilho', '--tempo-do-movimento']) {
      brilhando.style.removeProperty(nome);
    }
    brilhando = null;
  }

  // -------------------------------------------------------------------------
  // Um ouvinte só para o site inteiro
  // -------------------------------------------------------------------------

  document.addEventListener('pointermove', function (evento) {
    const parado = querMenosMovimento();

    // A lanterna segue só o mouse. No celular não existe ponteiro parado em cima da página.
    if (evento.pointerType === 'mouse' && !parado) {
      lanterna.style.setProperty('--x', evento.clientX + 'px');
      lanterna.style.setProperty('--y', evento.clientY + 'px');
      lanterna.classList.add('lanterna-acesa');
    } else {
      apagarLanterna();
    }

    // A figurinha lendária que está embaixo do ponteiro (se houver uma, e de frente)
    let figurinha = evento.target.closest ? evento.target.closest('.figurinha-lendaria') : null;
    if (figurinha && (figurinha.dataset.face === 'verso' || figurinha.dataset.face === 'costas')) figurinha = null;
    if (figurinha !== brilhando) apagarBrilho();
    if (!figurinha) return;
    brilhando = figurinha;

    const caixa = figurinha.getBoundingClientRect();
    const x = (evento.clientX - caixa.left) / caixa.width;    // 0 na esquerda, 1 na direita
    const y = (evento.clientY - caixa.top) / caixa.height;    // 0 em cima, 1 embaixo
    figurinha.style.setProperty('--px', (x * 100).toFixed(1) + '%');
    figurinha.style.setProperty('--py', (y * 100).toFixed(1) + '%');
    figurinha.style.setProperty('--brilho', '0.9');
    // Com menos movimento, a figurinha não inclina: fica só o brilho
    if (!parado) {
      figurinha.style.setProperty('--ry', ((x - 0.5) * 22).toFixed(1) + 'deg');
      figurinha.style.setProperty('--rx', ((0.5 - y) * 22).toFixed(1) + 'deg');
      figurinha.style.setProperty('--tempo-do-movimento', '160ms');   // inclina rápido, para acompanhar o ponteiro
    }
  });

  // Ao clicar, a figurinha vai virar: ela volta ao prumo antes, para o giro
  // sair inteiro. O "true" faz este ouvinte rodar antes do clique da figurinha.
  document.addEventListener('click', apagarBrilho, true);

  // O ponteiro saiu da janela
  document.documentElement.addEventListener('pointerleave', function () {
    apagarLanterna();
    apagarBrilho();
  });
});

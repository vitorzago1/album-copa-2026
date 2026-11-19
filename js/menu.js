// ============================================================================
// menu.js
// ----------------------------------------------------------------------------
// Em telas pequenas, o menu fica recolhido atrás do botão "Menu".
// Este arquivo abre e fecha o menu e conta isso ao leitor de tela pelo
// atributo aria-expanded ("expandido: sim ou não").
// Em telas grandes o CSS mostra o menu sempre aberto e esconde o botão.
// ============================================================================

document.addEventListener('DOMContentLoaded', function () {
  const botao = document.querySelector('.botao-menu');
  const menu = document.getElementById('menu-principal');
  if (!botao || !menu) return;

  function definirAberto(aberto) {
    botao.setAttribute('aria-expanded', String(aberto));
    menu.classList.toggle('menu-aberto', aberto);
  }

  botao.addEventListener('click', function () {
    const estaAberto = botao.getAttribute('aria-expanded') === 'true';
    definirAberto(!estaAberto);
  });

  // A tecla Esc fecha o menu e devolve o foco para o botão
  document.addEventListener('keydown', function (evento) {
    const estaAberto = botao.getAttribute('aria-expanded') === 'true';
    if (evento.key === 'Escape' && estaAberto) {
      definirAberto(false);
      botao.focus();
    }
  });
});

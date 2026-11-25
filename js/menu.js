function atualizarLinkDaConta() {
  let entrou = false;
  try {
    const sessao = JSON.parse(localStorage.getItem('colei.sessao'));
    entrou = Boolean(sessao && sessao.email);
  } catch (erro) {
  }
  for (const link of document.querySelectorAll('.menu-entrar')) {
    link.textContent = entrou ? 'Minha conta' : 'Entrar';
  }
}

document.addEventListener('DOMContentLoaded', function () {
  atualizarLinkDaConta();

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

  document.addEventListener('keydown', function (evento) {
    const estaAberto = botao.getAttribute('aria-expanded') === 'true';
    if (evento.key === 'Escape' && estaAberto) {
      definirAberto(false);
      botao.focus();
    }
  });
});

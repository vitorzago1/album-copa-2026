// ============================================================================
// menu.js
// ----------------------------------------------------------------------------
// Em telas pequenas, o menu fica recolhido atrás do botão "Menu".
// Este arquivo abre e fecha o menu e conta isso ao leitor de tela pelo
// atributo aria-expanded ("expandido: sim ou não").
// Em telas grandes o CSS mostra o menu sempre aberto e esconde o botão.
//
// Também troca o link "Entrar" por "Minha conta" quando alguém já entrou.
// ============================================================================

// Quem entrou no site fica anotado no localStorage (ver js/login.js).
// Se houver alguém, o link "Entrar" do menu passa a dizer "Minha conta".
function atualizarLinkDaConta() {
  let entrou = false;
  try {
    const sessao = JSON.parse(localStorage.getItem('colei.sessao'));
    entrou = Boolean(sessao && sessao.email);
  } catch (erro) {
    // Sem localStorage, ninguém entrou.
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

  // A tecla Esc fecha o menu e devolve o foco para o botão
  document.addEventListener('keydown', function (evento) {
    const estaAberto = botao.getAttribute('aria-expanded') === 'true';
    if (evento.key === 'Escape' && estaAberto) {
      definirAberto(false);
      botao.focus();
    }
  });
});

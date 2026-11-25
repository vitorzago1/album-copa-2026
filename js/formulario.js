const ICONE_DE_ERRO =
  '<svg viewBox="0 0 16 20" width="16" height="20" aria-hidden="true" focusable="false">' +
  '<rect x="1" y="1" width="14" height="18" rx="2" fill="currentColor"/>' +
  '<path class="cartao-x" d="M5 7l6 6M11 7l-6 6" stroke-width="2" stroke-linecap="round"/>' +
  '</svg>';

function mostrarErro(campo, mensagem) {
  const caixa = document.getElementById(campo.id + '-erro');
  campo.setAttribute('aria-invalid', 'true');
  caixa.innerHTML = ICONE_DE_ERRO;
  caixa.append(mensagem);
  caixa.hidden = false;
}

function limparErro(campo) {
  const caixa = document.getElementById(campo.id + '-erro');
  campo.removeAttribute('aria-invalid');
  caixa.textContent = '';
  caixa.hidden = true;
}

function emailValido(texto) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(texto);
}

document.addEventListener('DOMContentLoaded', function () {
  for (const botao of document.querySelectorAll('[data-mostrar-senha]')) {
    botao.addEventListener('click', function () {
      const campo = document.getElementById(botao.dataset.mostrarSenha);
      const mostrando = campo.type === 'text';
      campo.type = mostrando ? 'password' : 'text';
      botao.textContent = mostrando ? 'Mostrar senha' : 'Ocultar senha';
    });
  }
});

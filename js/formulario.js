// ============================================================================
// formulario.js
// ----------------------------------------------------------------------------
// Ajudantes usados pelos formulários das páginas Entrar e Contato:
// mostrar e limpar o erro de um campo, conferir e-mail e o botão de mostrar a senha.
//
// Como o erro chega a quem usa leitor de tela: no HTML, cada campo aponta para
// a sua caixa de erro com aria-describedby. Quando o campo recebe o foco, o
// leitor lê o rótulo e, em seguida, a frase do erro.
// ============================================================================

// O ícone que acompanha toda mensagem de erro: um cartão com um "x".
// (O erro nunca é avisado só pela cor: vem com ícone e frase.)
const ICONE_DE_ERRO =
  '<svg viewBox="0 0 16 20" width="16" height="20" aria-hidden="true" focusable="false">' +
  '<rect x="1" y="1" width="14" height="18" rx="2" fill="currentColor"/>' +
  '<path class="cartao-x" d="M5 7l6 6M11 7l-6 6" stroke-width="2" stroke-linecap="round"/>' +
  '</svg>';

// Mostra o erro de um campo. A caixa do erro tem o id do campo mais "-erro".
function mostrarErro(campo, mensagem) {
  const caixa = document.getElementById(campo.id + '-erro');
  campo.setAttribute('aria-invalid', 'true');   // "este campo está com problema"
  caixa.innerHTML = ICONE_DE_ERRO;
  caixa.append(mensagem);   // append com texto escreve o texto como ele é, sem interpretar HTML
  caixa.hidden = false;
}

function limparErro(campo) {
  const caixa = document.getElementById(campo.id + '-erro');
  campo.removeAttribute('aria-invalid');
  caixa.textContent = '';
  caixa.hidden = true;
}

// Confere o formato do e-mail: algo, arroba, algo, ponto, algo. Sem espaços.
function emailValido(texto) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(texto);
}

// Botões "Mostrar senha": cada um aponta para o campo dele pelo atributo
// data-mostrar-senha. O campo troca entre type="password" (bolinhas) e
// type="text" (letras), e o texto do botão acompanha.
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

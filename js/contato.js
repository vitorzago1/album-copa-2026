document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  const formulario = document.getElementById('form-contato');
  const resumo = document.getElementById('resumo-erros');
  const sucesso = document.getElementById('contato-sucesso');

  const campos = {
    nome: document.getElementById('contato-nome'),
    email: document.getElementById('contato-email'),
    assunto: document.getElementById('contato-assunto'),
    mensagem: document.getElementById('contato-mensagem'),
  };

  function erroDoCampo(nome) {
    const valor = campos[nome].value.trim();

    if (nome === 'nome') {
      if (valor === '') return 'Escreva o seu nome.';
    }
    if (nome === 'email') {
      if (valor === '') return 'Escreva o seu e-mail.';
      if (!emailValido(valor)) return 'Esse e-mail parece incompleto. O formato é nome@exemplo.com.';
    }
    if (nome === 'assunto') {
      if (valor === '') return 'Escolha um assunto na lista.';
    }
    if (nome === 'mensagem') {
      if (valor === '') return 'Escreva a mensagem.';
      if (valor.length < 10) return 'A mensagem está curta demais. Escreva pelo menos 10 caracteres.';
    }
    return '';
  }

  function conferirCampo(nome) {
    const erro = erroDoCampo(nome);
    if (erro === '') limparErro(campos[nome]);
    else mostrarErro(campos[nome], erro);
    return erro;
  }

  formulario.addEventListener('submit', function (evento) {
    evento.preventDefault();
    sucesso.textContent = '';

    const erros = [];
    for (const nome in campos) {
      const erro = conferirCampo(nome);
      if (erro !== '') erros.push({ campo: campos[nome], frase: erro });
    }

    if (erros.length > 0) {
      document.getElementById('resumo-titulo').textContent =
        erros.length === 1 ? 'Falta acertar 1 campo' : 'Falta acertar ' + erros.length + ' campos';

      const lista = document.getElementById('resumo-lista');
      lista.textContent = '';
      for (const erro of erros) {
        const link = document.createElement('a');
        link.href = '#' + erro.campo.id;
        link.textContent = erro.campo.labels[0].textContent + ': ' + erro.frase;
        link.addEventListener('click', function (clique) {
          clique.preventDefault();
          erro.campo.focus();
        });
        const item = document.createElement('li');
        item.append(link);
        lista.append(item);
      }

      resumo.hidden = false;
      resumo.focus();
      return;
    }

    const nome = campos.nome.value.trim();
    resumo.hidden = true;
    formulario.reset();
    sucesso.textContent = 'Tudo certo, ' + nome + ': a mensagem passou na conferência. Como o envio é simulado, ela não saiu deste navegador.';
    sucesso.focus();
  });

  for (const nome in campos) {
    campos[nome].addEventListener('input', function () {
      if (campos[nome].getAttribute('aria-invalid') === 'true') conferirCampo(nome);
    });
  }
});

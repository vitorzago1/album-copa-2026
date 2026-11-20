// ============================================================================
// contato.js
// ----------------------------------------------------------------------------
// Confere o formulário de contato na hora de enviar. O envio é SIMULADO:
// não existe servidor, a mensagem não vai para lugar nenhum.
//
// Quando algo está errado:
//   - cada campo com problema ganha a sua frase de erro, com ícone;
//   - um resumo no topo lista tudo o que falta, com um link para cada campo;
//   - o foco vai para o resumo, para ele ser a primeira coisa lida.
// Quando está tudo certo, aparece a mensagem de sucesso, que o leitor de tela
// lê sozinho (ela fica em uma região com aria-live).
//
// Depende de: js/formulario.js.
// ============================================================================

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

  // A regra de cada campo. Devolve a frase do erro, ou '' se está certo.
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

  // Confere um campo e mostra ou tira o erro dele. Devolve a frase do erro.
  function conferirCampo(nome) {
    const erro = erroDoCampo(nome);
    if (erro === '') limparErro(campos[nome]);
    else mostrarErro(campos[nome], erro);
    return erro;
  }

  formulario.addEventListener('submit', function (evento) {
    evento.preventDefault();   // não deixa o navegador recarregar a página
    sucesso.textContent = '';

    // Confere todos os campos e junta os erros
    const erros = [];
    for (const nome in campos) {
      const erro = conferirCampo(nome);
      if (erro !== '') erros.push({ campo: campos[nome], frase: erro });
    }

    if (erros.length > 0) {
      // Monta o resumo: um link para cada campo com problema
      document.getElementById('resumo-titulo').textContent =
        erros.length === 1 ? 'Falta acertar 1 campo' : 'Falta acertar ' + erros.length + ' campos';

      const lista = document.getElementById('resumo-lista');
      lista.textContent = '';
      for (const erro of erros) {
        const link = document.createElement('a');
        link.href = '#' + erro.campo.id;
        link.textContent = erro.campo.labels[0].textContent + ': ' + erro.frase;
        // O link leva o foco direto para o campo (só a âncora não faria isso em todo navegador)
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

    // Tudo certo: aqui um site de verdade mandaria a mensagem ao servidor
    const nome = campos.nome.value.trim();
    resumo.hidden = true;
    formulario.reset();
    sucesso.textContent = 'Tudo certo, ' + nome + ': a mensagem passou na conferência. Como o envio é simulado, ela não saiu deste navegador.';
    sucesso.focus();
  });

  // Depois que um campo ganhou erro, ele é conferido de novo a cada mudança:
  // assim a frase some na hora em que a pessoa conserta.
  for (const nome in campos) {
    campos[nome].addEventListener('input', function () {
      if (campos[nome].getAttribute('aria-invalid') === 'true') conferirCampo(nome);
    });
  }
});

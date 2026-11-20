// ============================================================================
// login.js
// ----------------------------------------------------------------------------
// A página Entrar: criar conta, entrar e sair. É uma SIMULAÇÃO: não existe
// servidor, tudo fica guardado no localStorage deste navegador.
//
// O que fica guardado:
//   colei.contas  = as contas criadas: { "ana@exemplo.com": { nome, sal, hash } }
//   colei.sessao  = quem entrou agora: { email, nome }
//
// A SENHA NUNCA É GUARDADA. Guarda-se o "hash" dela.
//   Hash é como um moedor de carne: a senha entra, sai uma sequência de letras
//   e números, e não existe caminho de volta (não dá para "desmoer"). Para
//   conferir a senha na hora de entrar, mói-se de novo o que a pessoa digitou
//   e compara-se o resultado com o que está guardado.
//   O "sal" é um tempero sorteado para cada conta e misturado à senha antes de
//   moer. Com ele, duas pessoas com a mesma senha ficam com hashes diferentes.
//
// Em um site de verdade, essa conta seria feita no servidor, com um moedor
// mais lento de propósito (para atrapalhar quem tenta adivinhar senhas).
//
// Depende de: js/dados.js, js/estado.js, js/formulario.js e js/menu.js.
// ============================================================================

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  const CHAVE_CONTAS = 'colei.contas';
  const CHAVE_SESSAO = 'colei.sessao';
  const TAMANHO_MINIMO_DA_SENHA = 8;

  const painelConta = document.getElementById('painel-conta');
  const formEntrar = document.getElementById('form-entrar');
  const formCriar = document.getElementById('form-criar');
  const aviso = document.getElementById('conta-aviso');

  // -------------------------------------------------------------------------
  // 1. Guardar e ler contas e sessão
  // -------------------------------------------------------------------------

  function lerDaGaveta(chave) {
    try {
      return JSON.parse(localStorage.getItem(chave));
    } catch (erro) {
      return null;   // gaveta bloqueada ou texto estragado
    }
  }

  // Devolve true se conseguiu guardar
  function guardarNaGaveta(chave, valor) {
    try {
      localStorage.setItem(chave, JSON.stringify(valor));
      return true;
    } catch (erro) {
      return false;
    }
  }

  function lerContas() {
    return lerDaGaveta(CHAVE_CONTAS) || {};
  }

  function lerSessao() {
    const sessao = lerDaGaveta(CHAVE_SESSAO);
    return sessao && sessao.email ? sessao : null;
  }

  // -------------------------------------------------------------------------
  // 2. O hash da senha
  // -------------------------------------------------------------------------

  // O navegador tem a ferramenta de hash? (Ela se chama crypto.subtle e só
  // funciona em página aberta do próprio computador ou por https.)
  function temFerramentaDeHash() {
    return Boolean(window.crypto && window.crypto.subtle && window.TextEncoder);
  }

  // Transforma uma lista de bytes em texto. Cada byte (um número de 0 a 255)
  // vira dois caracteres em hexadecimal: 255 vira "ff", 10 vira "0a".
  function emHexadecimal(bytes) {
    let texto = '';
    for (const numero of bytes) {
      texto += numero.toString(16).padStart(2, '0');
    }
    return texto;
  }

  // Sorteia o sal: 16 bytes ao acaso, pedidos ao sorteador seguro do navegador
  function sortearSal() {
    return emHexadecimal(crypto.getRandomValues(new Uint8Array(16)));
  }

  // Mistura o sal com a senha e passa pelo moedor (o algoritmo SHA-256).
  // "async" e "await": a conta demora um instante, e o await espera a resposta
  // chegar antes de continuar.
  async function calcularHash(sal, senha) {
    const bytes = new TextEncoder().encode(sal + ':' + senha);   // texto vira bytes
    const resultado = await crypto.subtle.digest('SHA-256', bytes);
    return emHexadecimal(new Uint8Array(resultado));
  }

  // -------------------------------------------------------------------------
  // 3. O que aparece na tela
  // -------------------------------------------------------------------------

  // Mostra só uma das três partes: 'conta', 'entrar' ou 'criar'
  function mostrarParte(parte) {
    painelConta.hidden = parte !== 'conta';
    formEntrar.hidden = parte !== 'entrar';
    formCriar.hidden = parte !== 'criar';
  }

  function desenharConta() {
    const sessao = lerSessao();
    if (!sessao) {
      mostrarParte('entrar');
      return;
    }
    const resumo = resumoDoAlbum(lerAlbum());
    document.getElementById('conta-quem').textContent = 'Você entrou como ' + sessao.nome + ' (' + sessao.email + ').';
    document.getElementById('conta-album').textContent = 'Seu álbum: ' + resumo.coladas + ' de ' + resumo.total + ' figurinhas coladas.';
    mostrarParte('conta');
  }

  // Tira os erros e os valores de um formulário
  function limparFormulario(formulario) {
    formulario.reset();
    for (const campo of formulario.querySelectorAll('.campo-entrada')) limparErro(campo);
    for (const caixa of formulario.querySelectorAll('[role="alert"]')) {
      caixa.textContent = '';
      caixa.hidden = true;
    }
  }

  // Erro do formulário inteiro (não de um campo só)
  function mostrarErroGeral(id, mensagem) {
    const caixa = document.getElementById(id);
    caixa.innerHTML = ICONE_DE_ERRO;
    caixa.append(mensagem);
    caixa.hidden = false;
  }

  // -------------------------------------------------------------------------
  // 4. Criar conta
  // -------------------------------------------------------------------------

  formCriar.addEventListener('submit', async function (evento) {
    evento.preventDefault();   // não deixa o navegador recarregar a página

    const campoNome = document.getElementById('criar-nome');
    const campoEmail = document.getElementById('criar-email');
    const campoSenha = document.getElementById('criar-senha');
    const nome = campoNome.value.trim();
    const email = campoEmail.value.trim().toLowerCase();
    const senha = campoSenha.value;
    const contas = lerContas();

    // Confere campo por campo e guarda o primeiro que tiver problema
    let primeiroComErro = null;
    function conferir(campo, mensagem) {
      if (mensagem === '') {
        limparErro(campo);
      } else {
        mostrarErro(campo, mensagem);
        if (!primeiroComErro) primeiroComErro = campo;
      }
    }

    conferir(campoNome, nome === '' ? 'Escreva o seu nome.' : '');

    let erroDoEmail = '';
    if (email === '') erroDoEmail = 'Escreva o seu e-mail.';
    else if (!emailValido(email)) erroDoEmail = 'Esse e-mail parece incompleto. O formato é nome@exemplo.com.';
    else if (contas[email]) erroDoEmail = 'Já existe uma conta com esse e-mail neste navegador. Use "Entrar".';
    conferir(campoEmail, erroDoEmail);

    let erroDaSenha = '';
    if (senha === '') erroDaSenha = 'Escreva uma senha.';
    else if (senha.length < TAMANHO_MINIMO_DA_SENHA) erroDaSenha = 'A senha precisa de pelo menos 8 caracteres. Faltam ' + (TAMANHO_MINIMO_DA_SENHA - senha.length) + '.';
    conferir(campoSenha, erroDaSenha);

    if (primeiroComErro) {
      primeiroComErro.focus();   // leva o teclado direto ao primeiro campo a consertar
      return;
    }

    if (!temFerramentaDeHash()) {
      mostrarErroGeral('criar-erro', 'Este navegador não liberou a ferramenta que protege a senha, então a conta não foi criada. Tente abrir o site pelo endereço publicado (https).');
      return;
    }

    const sal = sortearSal();
    contas[email] = { nome: nome, sal: sal, hash: await calcularHash(sal, senha) };
    if (!guardarNaGaveta(CHAVE_CONTAS, contas)) {
      mostrarErroGeral('criar-erro', 'O navegador não deixou guardar a conta. Confira se ele não está em modo anônimo.');
      return;
    }

    // As figurinhas de visitante vão junto para a conta nova
    let trouxeFigurinhas = false;
    try {
      const albumDeVisitante = localStorage.getItem('colei.album.visitante');
      if (albumDeVisitante !== null) {
        localStorage.setItem('colei.album.' + email, albumDeVisitante);
        localStorage.removeItem('colei.album.visitante');
        trouxeFigurinhas = true;
      }
    } catch (erro) {
      // Sem gaveta não há o que trazer.
    }

    guardarNaGaveta(CHAVE_SESSAO, { email: email, nome: nome });
    limparFormulario(formCriar);
    atualizarLinkDaConta();   // o menu passa a mostrar "Minha conta" (função de js/menu.js)
    desenharConta();
    aviso.textContent = 'Conta criada. ' + (trouxeFigurinhas ? 'As figurinhas que você tinha como visitante vieram junto.' : 'O álbum desta conta começa vazio.');
    document.getElementById('titulo-conta').focus();
  });

  // -------------------------------------------------------------------------
  // 5. Entrar e sair
  // -------------------------------------------------------------------------

  formEntrar.addEventListener('submit', async function (evento) {
    evento.preventDefault();

    const campoEmail = document.getElementById('entrar-email');
    const campoSenha = document.getElementById('entrar-senha');
    const email = campoEmail.value.trim().toLowerCase();
    const senha = campoSenha.value;
    const caixaGeral = document.getElementById('entrar-erro');
    caixaGeral.hidden = true;
    caixaGeral.textContent = '';

    let primeiroComErro = null;
    if (email === '') {
      mostrarErro(campoEmail, 'Escreva o seu e-mail.');
      primeiroComErro = campoEmail;
    } else if (!emailValido(email)) {
      mostrarErro(campoEmail, 'Esse e-mail parece incompleto. O formato é nome@exemplo.com.');
      primeiroComErro = campoEmail;
    } else {
      limparErro(campoEmail);
    }

    if (senha === '') {
      mostrarErro(campoSenha, 'Escreva a sua senha.');
      if (!primeiroComErro) primeiroComErro = campoSenha;
    } else {
      limparErro(campoSenha);
    }

    if (primeiroComErro) {
      primeiroComErro.focus();
      return;
    }

    if (!temFerramentaDeHash()) {
      mostrarErroGeral('entrar-erro', 'Este navegador não liberou a ferramenta que confere a senha. Tente abrir o site pelo endereço publicado (https).');
      return;
    }

    // Mói a senha digitada com o sal da conta e compara com o hash guardado.
    // A mensagem de erro é a mesma para e-mail desconhecido e para senha
    // errada: assim ninguém descobre quais e-mails têm conta.
    const conta = lerContas()[email];
    const confere = Boolean(conta) && (await calcularHash(conta.sal, senha)) === conta.hash;
    if (!confere) {
      mostrarErroGeral('entrar-erro', 'E-mail ou senha não conferem. Confira os dois e tente de novo.');
      campoEmail.focus();
      return;
    }

    guardarNaGaveta(CHAVE_SESSAO, { email: email, nome: conta.nome });
    limparFormulario(formEntrar);
    atualizarLinkDaConta();
    desenharConta();
    aviso.textContent = 'Você entrou. O álbum desta conta está valendo.';
    document.getElementById('titulo-conta').focus();
  });

  document.getElementById('sair').addEventListener('click', function () {
    try {
      localStorage.removeItem(CHAVE_SESSAO);
    } catch (erro) {
      // Sem gaveta não há sessão para apagar.
    }
    atualizarLinkDaConta();
    desenharConta();
    aviso.textContent = 'Você saiu. Agora vale o álbum de visitante.';
    document.getElementById('titulo-entrar').focus();
  });

  // Trocar entre "Entrar" e "Criar conta"
  document.getElementById('ir-criar').addEventListener('click', function () {
    aviso.textContent = '';
    mostrarParte('criar');
    document.getElementById('titulo-criar').focus();
  });

  document.getElementById('ir-entrar').addEventListener('click', function () {
    aviso.textContent = '';
    mostrarParte('entrar');
    document.getElementById('titulo-entrar').focus();
  });

  // -------------------------------------------------------------------------
  // 6. Começar
  // -------------------------------------------------------------------------

  desenharConta();
});

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  const CHAVE_CONTAS = 'colei.contas';
  const CHAVE_SESSAO = 'colei.sessao';
  const TAMANHO_MINIMO_DA_SENHA = 8;

  const painelConta = document.getElementById('painel-conta');
  const formEntrar = document.getElementById('form-entrar');
  const formCriar = document.getElementById('form-criar');
  const aviso = document.getElementById('conta-aviso');

  function lerDaGaveta(chave) {
    try {
      return JSON.parse(localStorage.getItem(chave));
    } catch (erro) {
      return null;
    }
  }

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

  function temFerramentaDeHash() {
    return Boolean(window.crypto && window.crypto.subtle && window.TextEncoder);
  }

  function emHexadecimal(bytes) {
    let texto = '';
    for (const numero of bytes) {
      texto += numero.toString(16).padStart(2, '0');
    }
    return texto;
  }

  function sortearSal() {
    return emHexadecimal(crypto.getRandomValues(new Uint8Array(16)));
  }

  async function calcularHash(sal, senha) {
    const bytes = new TextEncoder().encode(sal + ':' + senha);
    const resultado = await crypto.subtle.digest('SHA-256', bytes);
    return emHexadecimal(new Uint8Array(resultado));
  }

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

  function limparFormulario(formulario) {
    formulario.reset();
    for (const campo of formulario.querySelectorAll('.campo-entrada')) limparErro(campo);
    for (const caixa of formulario.querySelectorAll('[role="alert"]')) {
      caixa.textContent = '';
      caixa.hidden = true;
    }
  }

  function mostrarErroGeral(id, mensagem) {
    const caixa = document.getElementById(id);
    caixa.innerHTML = ICONE_DE_ERRO;
    caixa.append(mensagem);
    caixa.hidden = false;
  }

  formCriar.addEventListener('submit', async function (evento) {
    evento.preventDefault();

    const campoNome = document.getElementById('criar-nome');
    const campoEmail = document.getElementById('criar-email');
    const campoSenha = document.getElementById('criar-senha');
    const nome = campoNome.value.trim();
    const email = campoEmail.value.trim().toLowerCase();
    const senha = campoSenha.value;
    const contas = lerContas();

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
      primeiroComErro.focus();
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

    let trouxeFigurinhas = false;
    try {
      const albumDeVisitante = localStorage.getItem('colei.album.visitante');
      if (albumDeVisitante !== null) {
        localStorage.setItem('colei.album.' + email, albumDeVisitante);
        localStorage.removeItem('colei.album.visitante');
        trouxeFigurinhas = true;
      }
    } catch (erro) {
    }

    guardarNaGaveta(CHAVE_SESSAO, { email: email, nome: nome });
    limparFormulario(formCriar);
    atualizarLinkDaConta();
    desenharConta();
    aviso.textContent = 'Conta criada. ' + (trouxeFigurinhas ? 'As figurinhas que você tinha como visitante vieram junto.' : 'O álbum desta conta começa vazio.');
    document.getElementById('titulo-conta').focus();
  });

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
    }
    atualizarLinkDaConta();
    desenharConta();
    aviso.textContent = 'Você saiu. Agora vale o álbum de visitante.';
    document.getElementById('titulo-entrar').focus();
  });

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

  desenharConta();
});

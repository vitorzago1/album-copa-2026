// ============================================================================
// tema-acessibilidade.js
// ----------------------------------------------------------------------------
// Cuida de duas coisas:
//   1. Aplicar as preferências salvas (tema, tamanho da letra etc.) ANTES de a
//      página aparecer. Por isso este arquivo é chamado lá no <head>.
//   2. Montar o painel de acessibilidade e guardar o que a pessoa escolher.
//
// As preferências viram atributos no <html>, por exemplo:
//   <html data-tema="escuro" data-fonte="grande">
// e o CSS (tokens.css e acessibilidade.css) faz o resto.
//
// Onde fica guardado: no localStorage, uma "gaveta" do navegador que mantém
// pequenos textos mesmo depois de fechar a página.
// ============================================================================

(function () {
  'use strict';

  const CHAVE = 'colei.preferencias';

  // O que vale quando a pessoa ainda não escolheu nada
  const PADRAO = {
    tema: 'automatico',      // claro, escuro ou automatico (segue o aparelho)
    fonte: 'normal',         // normal, grande ou maior
    contraste: 'normal',     // normal ou alto
    movimento: 'normal',     // normal (segue o aparelho), reduzido ou completo
    espacamento: 'normal',   // normal ou amplo
    links: 'normal',         // normal ou destacados
  };

  // Os únicos valores aceitos. Qualquer outra coisa é ignorada.
  const VALORES = {
    tema: ['claro', 'escuro', 'automatico'],
    fonte: ['normal', 'grande', 'maior'],
    contraste: ['normal', 'alto'],
    movimento: ['normal', 'reduzido', 'completo'],
    espacamento: ['normal', 'amplo'],
    links: ['normal', 'destacados'],
  };

  // -------------------------------------------------------------------------
  // 1. Ler, guardar e aplicar
  // -------------------------------------------------------------------------

  function lerPreferencias() {
    const preferencias = Object.assign({}, PADRAO);
    try {
      const salvo = JSON.parse(localStorage.getItem(CHAVE) || '{}');
      for (const nome in PADRAO) {
        if (VALORES[nome].includes(salvo[nome])) preferencias[nome] = salvo[nome];
      }
    } catch (erro) {
      // localStorage bloqueado ou texto estragado: fica o padrão.
    }
    return preferencias;
  }

  function salvarPreferencias() {
    try {
      localStorage.setItem(CHAVE, JSON.stringify(preferencias));
    } catch (erro) {
      // Sem localStorage a escolha vale só até fechar a página.
    }
  }

  // Pergunta ao aparelho se ele está em modo escuro
  const sistemaEscuro = window.matchMedia('(prefers-color-scheme: dark)');

  function aplicar() {
    const raiz = document.documentElement; // o <html>

    let tema = preferencias.tema;
    if (tema === 'automatico') tema = sistemaEscuro.matches ? 'escuro' : 'claro';

    raiz.setAttribute('data-tema', tema);
    raiz.setAttribute('data-fonte', preferencias.fonte);
    raiz.setAttribute('data-contraste', preferencias.contraste);
    raiz.setAttribute('data-movimento', preferencias.movimento);
    raiz.setAttribute('data-espacamento', preferencias.espacamento);
    raiz.setAttribute('data-links', preferencias.links);
  }

  const preferencias = lerPreferencias();

  // Atalho pelo endereço: index.html?tema=escuro abre no tema escuro sem mexer
  // no que está salvo. Serve para mandar um link e para tirar os prints.
  const doEndereco = new URLSearchParams(window.location.search);
  for (const nome in PADRAO) {
    if (VALORES[nome].includes(doEndereco.get(nome))) preferencias[nome] = doEndereco.get(nome);
  }

  aplicar();

  // Avisa o CSS de que o JavaScript está ligado (mostra os botões que dependem dele)
  document.documentElement.classList.add('com-js');

  // Se o aparelho trocar de claro para escuro com a página aberta, acompanha
  sistemaEscuro.addEventListener('change', aplicar);

  // Deixa outro script do site guardar uma preferência, do mesmo jeito que o
  // painel faz. Exemplo: guardarPreferencia('movimento', 'completo').
  window.guardarPreferencia = function (nome, valor) {
    if (!VALORES[nome] || !VALORES[nome].includes(valor)) return;
    preferencias[nome] = valor;
    salvarPreferencias();
    aplicar();
  };

  // -------------------------------------------------------------------------
  // 2. O painel
  // -------------------------------------------------------------------------

  const HTML_DO_PAINEL = `
    <dialog class="painel" id="painel-acessibilidade" aria-labelledby="painel-titulo">
      <div class="painel-dentro">
        <div class="painel-cabeca">
          <h2 id="painel-titulo">Acessibilidade</h2>
          <button type="button" class="botao botao-contorno" data-fechar>Fechar</button>
        </div>

        <p class="texto-apoio">As mudanças valem na hora e ficam salvas neste navegador.</p>

        <fieldset class="painel-grupo">
          <legend>Tema</legend>
          <label class="opcao"><input type="radio" name="tema" value="claro"> Claro</label>
          <label class="opcao"><input type="radio" name="tema" value="escuro"> Escuro</label>
          <label class="opcao"><input type="radio" name="tema" value="automatico"> Automático (segue o aparelho)</label>
        </fieldset>

        <fieldset class="painel-grupo">
          <legend>Tamanho da letra</legend>
          <label class="opcao"><input type="radio" name="fonte" value="normal"> Normal</label>
          <label class="opcao"><input type="radio" name="fonte" value="grande"> Grande</label>
          <label class="opcao"><input type="radio" name="fonte" value="maior"> Maior</label>
        </fieldset>

        <fieldset class="painel-grupo">
          <legend>Ajustes de leitura</legend>
          <label class="opcao"><input type="checkbox" name="contraste" value="alto"> Alto contraste</label>
          <label class="opcao"><input type="checkbox" name="movimento" value="reduzido"> Reduzir animações</label>
          <label class="opcao" data-so-com-menos-movimento><input type="checkbox" name="movimento" value="completo"> Mostrar as animações, mesmo com o aparelho pedindo menos</label>
          <label class="opcao"><input type="checkbox" name="espacamento" value="amplo"> Mais espaço no texto</label>
          <label class="opcao"><input type="checkbox" name="links" value="destacados"> Destacar links</label>
        </fieldset>

        <div class="painel-pe">
          <button type="button" class="botao botao-contorno" data-padrao>Voltar ao padrão</button>
          <p class="painel-aviso" role="status"></p>
        </div>
      </div>
    </dialog>`;

  function montarPainel() {
    const botaoAbrir = document.getElementById('abrir-acessibilidade');
    if (!botaoAbrir) return;

    document.body.insertAdjacentHTML('beforeend', HTML_DO_PAINEL);
    const painel = document.getElementById('painel-acessibilidade');

    // Navegador muito antigo, sem <dialog>: esconde o botão em vez de quebrar.
    if (typeof painel.showModal !== 'function') {
      botaoAbrir.hidden = true;
      return;
    }

    const aviso = painel.querySelector('.painel-aviso');
    const campos = painel.querySelectorAll('input');

    // Marca nos campos o que está valendo agora
    function mostrarNosCampos() {
      campos.forEach(function (campo) {
        campo.checked = preferencias[campo.name] === campo.value;
      });
    }

    // A opção de mostrar as animações só faz sentido quando o aparelho pede menos movimento
    const pedeMenosMovimento = window.matchMedia('(prefers-reduced-motion: reduce)');

    botaoAbrir.addEventListener('click', function () {
      painel.querySelector('[data-so-com-menos-movimento]').hidden = !pedeMenosMovimento.matches;
      mostrarNosCampos();
      aviso.textContent = '';
      painel.showModal(); // abre por cima da página e prende o foco dentro
    });

    painel.querySelector('[data-fechar]').addEventListener('click', function () {
      painel.close(); // o navegador devolve o foco para o botão que abriu
    });

    // Clicar no fundo escurecido (fora da caixa) também fecha
    painel.addEventListener('click', function (evento) {
      if (evento.target === painel) painel.close();
    });

    campos.forEach(function (campo) {
      campo.addEventListener('change', function () {
        const nomeDaOpcao = campo.closest('label').textContent.trim();

        if (campo.type === 'checkbox') {
          preferencias[campo.name] = campo.checked ? campo.value : 'normal';
          aviso.textContent = nomeDaOpcao + (campo.checked ? ': ligado.' : ': desligado.');
        } else {
          preferencias[campo.name] = campo.value;
          const pergunta = campo.closest('fieldset').querySelector('legend').textContent;
          aviso.textContent = pergunta + ': ' + nomeDaOpcao + '.';
        }

        salvarPreferencias();
        aplicar();
        mostrarNosCampos();   // "reduzir" e "mostrar" são a mesma preferência: marcar uma desmarca a outra
      });
    });

    painel.querySelector('[data-padrao]').addEventListener('click', function () {
      Object.assign(preferencias, PADRAO);
      salvarPreferencias();
      aplicar();
      mostrarNosCampos();
      aviso.textContent = 'Tudo de volta ao padrão.';
    });
  }

  // O painel só pode ser montado depois que o <body> existir
  document.addEventListener('DOMContentLoaded', montarPainel);
})();

(function () {
  'use strict';

  const CHAVE = 'colei.preferencias';

  const PADRAO = {
    tema: 'automatico',
    fonte: 'normal',
    contraste: 'normal',
    movimento: 'normal',
    espacamento: 'normal',
    links: 'normal',
  };

  const VALORES = {
    tema: ['claro', 'escuro', 'automatico'],
    fonte: ['normal', 'grande', 'maior'],
    contraste: ['normal', 'alto'],
    movimento: ['normal', 'reduzido', 'completo'],
    espacamento: ['normal', 'amplo'],
    links: ['normal', 'destacados'],
  };

  function lerPreferencias() {
    const preferencias = Object.assign({}, PADRAO);
    try {
      const salvo = JSON.parse(localStorage.getItem(CHAVE) || '{}');
      for (const nome in PADRAO) {
        if (VALORES[nome].includes(salvo[nome])) preferencias[nome] = salvo[nome];
      }
    } catch (erro) {
    }
    return preferencias;
  }

  function salvarPreferencias() {
    try {
      localStorage.setItem(CHAVE, JSON.stringify(preferencias));
    } catch (erro) {
    }
  }

  const sistemaEscuro = window.matchMedia('(prefers-color-scheme: dark)');

  function aplicar() {
    const raiz = document.documentElement;

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

  const doEndereco = new URLSearchParams(window.location.search);
  for (const nome in PADRAO) {
    if (VALORES[nome].includes(doEndereco.get(nome))) preferencias[nome] = doEndereco.get(nome);
  }

  aplicar();

  document.documentElement.classList.add('com-js');

  sistemaEscuro.addEventListener('change', aplicar);

  window.guardarPreferencia = function (nome, valor) {
    if (!VALORES[nome] || !VALORES[nome].includes(valor)) return;
    preferencias[nome] = valor;
    salvarPreferencias();
    aplicar();
  };

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

    if (typeof painel.showModal !== 'function') {
      botaoAbrir.hidden = true;
      return;
    }

    const aviso = painel.querySelector('.painel-aviso');
    const campos = painel.querySelectorAll('input');

    function mostrarNosCampos() {
      campos.forEach(function (campo) {
        campo.checked = preferencias[campo.name] === campo.value;
      });
    }

    const pedeMenosMovimento = window.matchMedia('(prefers-reduced-motion: reduce)');

    botaoAbrir.addEventListener('click', function () {
      painel.querySelector('[data-so-com-menos-movimento]').hidden = !pedeMenosMovimento.matches;
      mostrarNosCampos();
      aviso.textContent = '';
      painel.showModal();
    });

    painel.querySelector('[data-fechar]').addEventListener('click', function () {
      painel.close();
    });

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
        mostrarNosCampos();
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

  document.addEventListener('DOMContentLoaded', montarPainel);
})();

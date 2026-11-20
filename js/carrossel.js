// ============================================================================
// carrossel.js
// ----------------------------------------------------------------------------
// O carrossel das 16 sedes, na página inicial. Mostra uma sede por vez, com a
// foto do estádio e os dados dela.
//
// Como é feito para funcionar com teclado e leitor de tela:
//   - botões "Anterior" e "Próxima" de verdade (<button>);
//   - um botão numerado para cada sede (os indicadores), que leva direto a ela;
//   - a posição ("3 de 16: Dallas") fica em um texto com role="status", que o
//     leitor de tela lê sozinho a cada troca;
//   - não passa sozinho: só muda quando a pessoa pede.
//
// Depende de: js/dados.js (a lista SEDES).
// ============================================================================

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  const carrossel = document.getElementById('carrossel');
  if (!carrossel) return;

  const indicadores = document.getElementById('sede-indicadores');
  let atual = 0;   // posição da sede que está na tela (0 é a primeira)

  // Escreve os números com ponto de milhar, do jeito brasileiro: 80824 vira "80.824"
  function comPonto(numero) {
    return numero.toLocaleString('pt-BR');
  }

  // Cria um botão numerado para cada sede
  SEDES.forEach(function (sede, posicao) {
    const botao = document.createElement('button');
    botao.type = 'button';
    botao.className = 'carrossel-numero';
    botao.textContent = posicao + 1;
    botao.setAttribute('aria-label', 'Sede ' + (posicao + 1) + ': ' + sede.cidade);
    botao.addEventListener('click', function () { mostrar(posicao); });

    const item = document.createElement('li');
    item.append(botao);
    indicadores.append(item);
  });

  // Troca a sede que está na tela
  function mostrar(posicao) {
    atual = posicao;
    const sede = SEDES[atual];

    // Textos
    document.getElementById('sede-cidade').textContent = sede.cidade;
    document.getElementById('sede-estadio').textContent = sede.estadio;
    document.getElementById('sede-pais').textContent = sede.municipio ? sede.municipio + ', ' + sede.pais : sede.pais;
    document.getElementById('sede-bandeira').src = 'assets/bandeiras/' + sede.bandeira + '.svg';
    document.getElementById('sede-numeros').textContent = sede.jogos + ' jogos e ' + comPonto(sede.capacidade) + ' lugares';
    document.getElementById('sede-nome-na-copa').textContent = sede.nomeNaCopa;

    const nota = document.getElementById('sede-nota');
    nota.textContent = sede.nota;
    nota.hidden = sede.nota === '';

    // Foto e crédito
    const foto = document.getElementById('sede-foto');
    foto.src = 'assets/img/sedes/' + sede.id + '.jpg';
    foto.alt = sede.foto.alt;
    const credito = document.getElementById('sede-credito');
    credito.textContent = 'Foto: ' + sede.foto.autor + ', ' + sede.foto.licenca + ', Wikimedia Commons';
    credito.href = sede.foto.origem;

    // Posição: lida pelo leitor de tela a cada troca
    document.getElementById('sede-posicao').textContent = (atual + 1) + ' de ' + SEDES.length + ': ' + sede.cidade;

    // Marca o indicador da sede atual (aria-current diz ao leitor de tela qual é)
    const botoes = indicadores.querySelectorAll('button');
    for (let i = 0; i < botoes.length; i++) {
      if (i === atual) botoes[i].setAttribute('aria-current', 'true');
      else botoes[i].removeAttribute('aria-current');
    }
  }

  // "Anterior" na primeira vai para a última, e "Próxima" na última volta para a primeira
  document.getElementById('sede-anterior').addEventListener('click', function () {
    mostrar((atual - 1 + SEDES.length) % SEDES.length);
  });

  document.getElementById('sede-proxima').addEventListener('click', function () {
    mostrar((atual + 1) % SEDES.length);
  });

  carrossel.hidden = false;   // o carrossel só aparece se o JavaScript estiver ligado
  mostrar(0);
});

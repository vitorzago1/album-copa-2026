document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  const album = lerAlbum();
  const resumo = resumoDoAlbum(album);

  const letras = 'ABCDEFGHIJKL';
  const casas = document.querySelectorAll('.tira-casa');
  for (let i = 0; i < casas.length; i++) {
    const lista = figurinhasDoGrupo(letras[i]);
    if (lista.length === 0) continue;

    const coladas = contarColadas(album, lista);
    casas[i].querySelector('.tira-quadro').style.setProperty('--parte', coladas / lista.length);

    const conta = document.createElement('span');
    conta.className = 'escondido';
    conta.textContent = ': ' + coladas + ' de ' + lista.length + ' coladas';
    casas[i].append(conta);
  }

  let texto = 'Nenhuma figurinha colada ainda. Cada casa é um grupo, de A a L, e vai enchendo conforme você cola.';
  if (resumo.coladas > 0) {
    texto = resumo.coladas + ' de ' + resumo.total + ' figurinhas coladas. Cada casa é um grupo, de A a L, e vai enchendo conforme você cola.';
  }
  if (resumo.naMao === 1) texto += ' Há 1 figurinha na mão, esperando para ser colada.';
  if (resumo.naMao > 1) texto += ' Há ' + resumo.naMao + ' figurinhas na mão, esperando para ser coladas.';
  document.getElementById('progresso-texto').textContent = texto;

  let pacotinho = temPacotinhoDoDia(album)
    ? 'O pacotinho de hoje está fechado, esperando você. São cinco figurinhas.'
    : 'O pacotinho de hoje já foi aberto. Amanhã tem outro.';
  if (album.extras === 1) pacotinho += ' Você tem 1 pacotinho extra guardado.';
  if (album.extras > 1) pacotinho += ' Você tem ' + album.extras + ' pacotinhos extras guardados.';
  document.getElementById('pacotinho-texto').textContent = pacotinho;

  document.getElementById('sequencia-texto').textContent = marcarCartela(document.getElementById('cartela'), album);
});

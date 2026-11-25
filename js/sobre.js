document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  function criarLink(texto, endereco) {
    const link = document.createElement('a');
    link.href = endereco;
    link.textContent = texto;
    return link;
  }

  const listaFotos = document.getElementById('creditos-fotos');
  for (const sede of SEDES) {
    const item = document.createElement('li');
    item.append(criarLink(sede.cidade + ', ' + sede.estadio, sede.foto.origem));
    item.append('. Foto de ' + sede.foto.autor + ', licença ');
    if (sede.foto.licencaUrl) item.append(criarLink(sede.foto.licenca, sede.foto.licencaUrl));
    else item.append(sede.foto.licenca);
    item.append('.');
    listaFotos.append(item);
  }

  const listaFontes = document.getElementById('fontes-dados');
  for (const apelido in FONTES) {
    const item = document.createElement('li');
    item.append(criarLink(FONTES[apelido].titulo, FONTES[apelido].url));
    listaFontes.append(item);
  }
});

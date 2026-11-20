// ============================================================================
// sobre.js
// ----------------------------------------------------------------------------
// Na página Sobre, monta duas listas a partir de js/dados.js:
//   - o crédito de cada foto de estádio (autor, licença e link para a original);
//   - as fontes dos dados da Copa.
// Como as listas saem dos mesmos dados que o site usa, o crédito nunca fica
// diferente da foto que está no ar.
//
// Depende de: js/dados.js (as listas SEDES e FONTES).
// ============================================================================

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // Cria um link que abre a página de origem
  function criarLink(texto, endereco) {
    const link = document.createElement('a');
    link.href = endereco;
    link.textContent = texto;
    return link;
  }

  // Créditos das fotos: "Cidade do México, Estadio Azteca. Foto de Fulano, licença CC BY 4.0."
  const listaFotos = document.getElementById('creditos-fotos');
  for (const sede of SEDES) {
    const item = document.createElement('li');
    item.append(criarLink(sede.cidade + ', ' + sede.estadio, sede.foto.origem));
    item.append('. Foto de ' + sede.foto.autor + ', licença ');
    // Domínio público não tem página de licença para apontar
    if (sede.foto.licencaUrl) item.append(criarLink(sede.foto.licenca, sede.foto.licencaUrl));
    else item.append(sede.foto.licenca);
    item.append('.');
    listaFotos.append(item);
  }

  // Fontes dos dados: um link para cada uma
  const listaFontes = document.getElementById('fontes-dados');
  for (const apelido in FONTES) {
    const item = document.createElement('li');
    item.append(criarLink(FONTES[apelido].titulo, FONTES[apelido].url));
    listaFontes.append(item);
  }
});

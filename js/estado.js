const FIGURINHAS_POR_PACOTINHO = 5;

const BILHETES_DA_RARIDADE = { comum: 6, brilhante: 3, lendaria: 1 };

const CONQUISTAS = [
  { id: 'primeira-colada', nome: 'Primeira colada', como: 'Cole a sua primeira figurinha.' },
  { id: 'achei-lendaria', nome: 'Achei uma lendária', como: 'Tire uma figurinha lendária no pacotinho.' },
  { id: 'selecao-completa', nome: 'Seleção completa', como: 'Cole as 6 figurinhas de uma seleção.' },
  { id: 'tres-dias', nome: 'Três dias seguidos', como: 'Abra o pacotinho do dia três dias seguidos.' },
  { id: 'meio-album', nome: 'Meio álbum', como: 'Cole metade das figurinhas do álbum.' },
  { id: 'grupo-fechado', nome: 'Grupo fechado', como: 'Cole todas as figurinhas de um grupo.' },
  { id: 'primeira-troca', nome: 'Primeira troca', como: 'Troque uma repetida na banca de trocas.' },
];

function usuarioAtual() {
  try {
    const sessao = JSON.parse(localStorage.getItem('colei.sessao'));
    if (sessao && sessao.email) return sessao.email;
  } catch (erro) {
  }
  return 'visitante';
}

function chaveDoAlbum() {
  return 'colei.album.' + usuarioAtual();
}

function albumVazio() {
  return {
    quantidade: {},
    coladas: [],
    extras: 0,
    pacotinhos: 0,
    trocas: 0,
    ultimoDia: '',
    sequencia: 0,
    conquistas: {},
  };
}

const albunsDeReserva = {};

function lerAlbum() {
  const chave = chaveDoAlbum();
  let texto = null;
  try {
    texto = localStorage.getItem(chave);
  } catch (erro) {
  }
  if (texto === null && albunsDeReserva[chave]) texto = albunsDeReserva[chave];

  try {
    const salvo = JSON.parse(texto);
    if (salvo && typeof salvo === 'object') return Object.assign(albumVazio(), salvo);
  } catch (erro) {
  }
  return albumVazio();
}

function salvarAlbum(album) {
  const chave = chaveDoAlbum();
  const texto = JSON.stringify(album);
  try {
    localStorage.setItem(chave, texto);
    delete albunsDeReserva[chave];
  } catch (erro) {
    albunsDeReserva[chave] = texto;
  }
}

function zerarAlbum() {
  const chave = chaveDoAlbum();
  delete albunsDeReserva[chave];
  try {
    localStorage.removeItem(chave);
  } catch (erro) {
  }
}

function quantasTenho(album, numero) {
  return album.quantidade[numero] || 0;
}

function estaColada(album, numero) {
  return album.coladas.includes(numero);
}

function repetidasDe(album, numero) {
  return Math.max(0, quantasTenho(album, numero) - 1);
}

function estaNaMao(album, numero) {
  return quantasTenho(album, numero) > 0 && !estaColada(album, numero);
}

function contarColadas(album, figurinhas) {
  let conta = 0;
  for (const fig of figurinhas) {
    if (estaColada(album, fig.numero)) conta += 1;
  }
  return conta;
}

function figurinhasDaSelecao(idDaSelecao) {
  return FIGURINHAS.filter(function (fig) { return fig.selecao === idDaSelecao; });
}

function figurinhasDoGrupo(grupo) {
  return FIGURINHAS.filter(function (fig) {
    const selecao = SELECOES.find(function (s) { return s.id === fig.selecao; });
    return selecao.grupo === grupo;
  });
}

function gruposDoAlbum() {
  const grupos = [];
  for (const selecao of SELECOES) {
    if (!grupos.includes(selecao.grupo)) grupos.push(selecao.grupo);
  }
  return grupos;
}

function resumoDoAlbum(album) {
  const total = FIGURINHAS.length;
  const coladas = contarColadas(album, FIGURINHAS);
  let tenho = 0;
  let naMao = 0;
  let comRepetida = 0;
  for (const fig of FIGURINHAS) {
    if (quantasTenho(album, fig.numero) > 0) tenho += 1;
    if (estaNaMao(album, fig.numero)) naMao += 1;
    if (repetidasDe(album, fig.numero) > 0) comRepetida += 1;
  }
  return {
    total: total,
    coladas: coladas,
    faltaColar: total - coladas,
    porcento: Math.round((coladas / total) * 100),
    tenho: tenho,
    faltam: total - tenho,
    naMao: naMao,
    comRepetida: comRepetida,
  };
}

function dataEmTexto(data) {
  const ano = data.getFullYear();
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const dia = String(data.getDate()).padStart(2, '0');
  return ano + '-' + mes + '-' + dia;
}

function hoje() {
  return dataEmTexto(new Date());
}

function ontem() {
  const data = new Date();
  data.setDate(data.getDate() - 1);
  return dataEmTexto(data);
}

function dataPorExtenso(texto) {
  const partes = texto.split('-');
  return partes[2] + '/' + partes[1] + '/' + partes[0];
}

function temPacotinhoDoDia(album) {
  return album.ultimoDia !== hoje();
}

function temPacotinho(album) {
  return temPacotinhoDoDia(album) || album.extras > 0;
}

function conquistaFeita(id, album) {
  if (id === 'primeira-colada') {
    return album.coladas.length >= 1;
  }
  if (id === 'achei-lendaria') {
    return FIGURINHAS.some(function (fig) {
      return fig.raridade === 'lendaria' && quantasTenho(album, fig.numero) > 0;
    });
  }
  if (id === 'selecao-completa') {
    return SELECOES.some(function (selecao) {
      const lista = figurinhasDaSelecao(selecao.id);
      return contarColadas(album, lista) === lista.length;
    });
  }
  if (id === 'tres-dias') {
    return album.sequencia >= 3;
  }
  if (id === 'meio-album') {
    return album.coladas.length >= Math.ceil(FIGURINHAS.length / 2);
  }
  if (id === 'grupo-fechado') {
    return gruposDoAlbum().some(function (grupo) {
      const lista = figurinhasDoGrupo(grupo);
      return contarColadas(album, lista) === lista.length;
    });
  }
  if (id === 'primeira-troca') {
    return album.trocas >= 1;
  }
  return false;
}

function conferirConquistas(album) {
  const novas = [];
  for (const conquista of CONQUISTAS) {
    const jaAnotada = Boolean(album.conquistas[conquista.id]);
    if (!jaAnotada && conquistaFeita(conquista.id, album)) {
      album.conquistas[conquista.id] = hoje();
      album.extras += 1;
      novas.push(conquista.nome);
    }
  }
  return novas;
}

function sortearFigurinhas(quantas) {
  const urna = FIGURINHAS.slice();
  const sorteadas = [];

  while (sorteadas.length < quantas && urna.length > 0) {
    let bilhetes = 0;
    for (const fig of urna) bilhetes += BILHETES_DA_RARIDADE[fig.raridade];

    let sorteado = Math.random() * bilhetes;
    let posicao = urna.length - 1;
    for (let i = 0; i < urna.length; i++) {
      sorteado -= BILHETES_DA_RARIDADE[urna[i].raridade];
      if (sorteado < 0) {
        posicao = i;
        break;
      }
    }

    sorteadas.push(urna[posicao]);
    urna.splice(posicao, 1);
  }
  return sorteadas;
}

function abrirPacotinho() {
  const album = lerAlbum();
  const eDoDia = temPacotinhoDoDia(album);
  if (!eDoDia && album.extras < 1) return null;

  if (eDoDia) {
    album.sequencia = album.ultimoDia === ontem() ? album.sequencia + 1 : 1;
    album.ultimoDia = hoje();
  } else {
    album.extras -= 1;
  }
  album.pacotinhos += 1;

  const figurinhas = [];
  for (const fig of sortearFigurinhas(FIGURINHAS_POR_PACOTINHO)) {
    const nova = quantasTenho(album, fig.numero) === 0;
    album.quantidade[fig.numero] = quantasTenho(album, fig.numero) + 1;
    figurinhas.push({ figurinha: fig, nova: nova });
  }

  const conquistas = conferirConquistas(album);
  salvarAlbum(album);
  return { figurinhas: figurinhas, conquistas: conquistas };
}

function colarFigurinha(numero) {
  const album = lerAlbum();
  if (!estaNaMao(album, numero)) return null;

  album.coladas.push(numero);
  const conquistas = conferirConquistas(album);
  salvarAlbum(album);
  return conquistas;
}

function descolarFigurinha(numero) {
  const album = lerAlbum();
  album.coladas = album.coladas.filter(function (colada) { return colada !== numero; });
  salvarAlbum(album);
}

function trocarFigurinha(numeroQueSai, numeroQueChega) {
  const album = lerAlbum();
  if (repetidasDe(album, numeroQueSai) < 1) return null;
  if (quantasTenho(album, numeroQueChega) > 0) return null;

  album.quantidade[numeroQueSai] -= 1;
  album.quantidade[numeroQueChega] = 1;
  album.trocas += 1;

  const conquistas = conferirConquistas(album);
  salvarAlbum(album);
  return conquistas;
}

function ganharPacotinhosExtras(quantos) {
  const album = lerAlbum();
  album.extras += quantos;
  salvarAlbum(album);
}

function sequenciaAtual(album) {
  const emDia = album.ultimoDia === hoje() || album.ultimoDia === ontem();
  return emDia ? album.sequencia : 0;
}

function marcarCartela(lista, album) {
  const dias = sequenciaAtual(album);
  const marcadas = dias === 0 ? 0 : ((dias - 1) % 7) + 1;
  const casas = lista.querySelectorAll('li');

  for (let i = 0; i < casas.length; i++) {
    const carimbado = i < marcadas;
    casas[i].classList.toggle('carimbado', carimbado);
    casas[i].innerHTML = '<span class="cartela-dia"><span class="escondido">Dia </span>' + (i + 1) +
      (carimbado ? '<span class="escondido">, carimbado</span>' : '') + '</span>';
  }

  if (dias === 0) return 'Nenhum dia marcado. Cada pacotinho do dia ganha um carimbo.';
  let frase = dias === 1 ? '1 dia marcado.' : dias + ' dias seguidos.';
  if (temPacotinhoDoDia(album)) frase += ' Abra o pacotinho de hoje para a sequência não parar.';
  else frase += ' Volte amanhã para continuar.';
  return frase;
}

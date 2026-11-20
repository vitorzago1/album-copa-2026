// ============================================================================
// estado.js
// ----------------------------------------------------------------------------
// O "caderninho" do álbum: guarda no navegador o que a pessoa já ganhou, o que
// já colou, os pacotinhos, a sequência de dias e as conquistas.
//
// Onde fica guardado: no localStorage, uma gaveta que todo navegador tem e que
// continua lá depois de fechar a página. A gaveta só guarda texto. Por isso o
// álbum vira texto na hora de guardar (JSON.stringify) e volta a ser objeto na
// hora de ler (JSON.parse).
//
// Cada pessoa tem a sua gaveta: o nome da gaveta leva quem entrou no site.
// Enquanto ninguém entrou, a gaveta é "colei.album.visitante".
//
// Depende de: js/dados.js (as listas SELECOES e FIGURINHAS).
// ============================================================================

const FIGURINHAS_POR_PACOTINHO = 5;

// Chance de cada raridade sair. Pense em uma urna de sorteio: cada figurinha
// comum entra com 6 bilhetes, cada brilhante com 3 e cada lendária com 1.
const BILHETES_DA_RARIDADE = { comum: 6, brilhante: 3, lendaria: 1 };

// As conquistas do álbum. Cada uma vale um pacotinho extra.
// A regra de cada uma está na função conquistaFeita(), mais abaixo.
const CONQUISTAS = [
  { id: 'primeira-colada', nome: 'Primeira colada', como: 'Cole a sua primeira figurinha.' },
  { id: 'achei-lendaria', nome: 'Achei uma lendária', como: 'Tire uma figurinha lendária no pacotinho.' },
  { id: 'selecao-completa', nome: 'Seleção completa', como: 'Cole as 6 figurinhas de uma seleção.' },
  { id: 'tres-dias', nome: 'Três dias seguidos', como: 'Abra o pacotinho do dia três dias seguidos.' },
  { id: 'meio-album', nome: 'Meio álbum', como: 'Cole metade das figurinhas do álbum.' },
  { id: 'grupo-fechado', nome: 'Grupo fechado', como: 'Cole todas as figurinhas de um grupo.' },
  { id: 'primeira-troca', nome: 'Primeira troca', como: 'Troque uma repetida na banca de trocas.' },
];

// ---------------------------------------------------------------------------
// 1. Ler e guardar
// ---------------------------------------------------------------------------

// Quem está usando o álbum agora. A página Entrar grava a sessão;
// sem sessão, a pessoa é "visitante".
function usuarioAtual() {
  try {
    const sessao = JSON.parse(localStorage.getItem('colei.sessao'));
    if (sessao && sessao.email) return sessao.email;
  } catch (erro) {
    // Sem sessão ou gaveta bloqueada: segue como visitante.
  }
  return 'visitante';
}

function chaveDoAlbum() {
  return 'colei.album.' + usuarioAtual();
}

// Um álbum que ainda não tem nada
function albumVazio() {
  return {
    quantidade: {},   // quantas cópias de cada figurinha já saíram: { "50": 2, "54": 1 }
    coladas: [],      // números das figurinhas coladas: [50, 54]
    extras: 0,        // pacotinhos extras guardados
    pacotinhos: 0,    // quantos pacotinhos já foram abertos
    trocas: 0,        // quantas trocas já foram feitas na banca
    ultimoDia: '',    // dia do último pacotinho grátis, no formato "2026-11-19"
    sequencia: 0,     // dias seguidos abrindo o pacotinho grátis
    conquistas: {},   // conquistas feitas e o dia de cada uma: { "primeira-colada": "2026-11-19" }
  };
}

// Se o navegador bloquear o localStorage (acontece em janela anônima de alguns
// navegadores), o álbum fica guardado aqui, uma reserva por pessoa, e vale só
// até fechar a página.
const albunsDeReserva = {};

function lerAlbum() {
  const chave = chaveDoAlbum();
  let texto = null;
  try {
    texto = localStorage.getItem(chave);
  } catch (erro) {
    // Gaveta bloqueada: vale a reserva, logo abaixo.
  }
  if (texto === null && albunsDeReserva[chave]) texto = albunsDeReserva[chave];

  try {
    const salvo = JSON.parse(texto);
    // Object.assign completa o que estiver faltando com os valores do álbum vazio
    if (salvo && typeof salvo === 'object') return Object.assign(albumVazio(), salvo);
  } catch (erro) {
    // Texto estragado: começa um álbum novo.
  }
  return albumVazio();
}

function salvarAlbum(album) {
  const chave = chaveDoAlbum();
  const texto = JSON.stringify(album);
  try {
    localStorage.setItem(chave, texto);
    delete albunsDeReserva[chave];   // guardou na gaveta: a reserva não é mais necessária
  } catch (erro) {
    albunsDeReserva[chave] = texto;  // não deu para guardar: fica na reserva
  }
}

// Apaga tudo de quem está usando o álbum agora
function zerarAlbum() {
  const chave = chaveDoAlbum();
  delete albunsDeReserva[chave];
  try {
    localStorage.removeItem(chave);
  } catch (erro) {
    // Nada a apagar.
  }
}

// ---------------------------------------------------------------------------
// 2. Perguntas sobre o álbum
// ---------------------------------------------------------------------------

function quantasTenho(album, numero) {
  return album.quantidade[numero] || 0;
}

function estaColada(album, numero) {
  return album.coladas.includes(numero);
}

// Repetidas: tudo o que passar de uma cópia (a primeira é a do álbum)
function repetidasDe(album, numero) {
  return Math.max(0, quantasTenho(album, numero) - 1);
}

// Está na mão: já saiu no pacotinho, mas ainda não foi colada
function estaNaMao(album, numero) {
  return quantasTenho(album, numero) > 0 && !estaColada(album, numero);
}

// Quantas figurinhas de uma lista estão coladas
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

// As letras dos grupos que já têm figurinhas, sem repetir: ["C"]
function gruposDoAlbum() {
  const grupos = [];
  for (const selecao of SELECOES) {
    if (!grupos.includes(selecao.grupo)) grupos.push(selecao.grupo);
  }
  return grupos;
}

// Os números do placar
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
    tenho: tenho,                 // figurinhas diferentes que já saíram
    faltam: total - tenho,        // figurinhas que ainda não saíram
    naMao: naMao,
    comRepetida: comRepetida,     // figurinhas diferentes com pelo menos uma repetida
  };
}

// ---------------------------------------------------------------------------
// 3. Datas (para o pacotinho do dia e a sequência)
// ---------------------------------------------------------------------------

// Transforma uma data em texto "2026-11-19", no horário do aparelho
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

// "2026-11-19" vira "19/11/2026"
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

// ---------------------------------------------------------------------------
// 4. Conquistas
// ---------------------------------------------------------------------------

// A regra de cada conquista. Devolve true se ela já foi cumprida.
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

// Confere se alguma conquista nova foi cumprida. Cada conquista nova é
// anotada com a data e vale um pacotinho extra. Devolve os nomes das novas.
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

// ---------------------------------------------------------------------------
// 5. Ações: abrir pacotinho, colar e descolar
// ---------------------------------------------------------------------------

// Sorteia figurinhas diferentes entre si, respeitando a chance de cada raridade
function sortearFigurinhas(quantas) {
  const urna = FIGURINHAS.slice();   // uma cópia da lista, para poder tirar figurinhas dela
  const sorteadas = [];

  while (sorteadas.length < quantas && urna.length > 0) {
    // Conta quantos bilhetes há na urna
    let bilhetes = 0;
    for (const fig of urna) bilhetes += BILHETES_DA_RARIDADE[fig.raridade];

    // Sorteia um bilhete e descobre de qual figurinha ele é
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
    urna.splice(posicao, 1);   // sai da urna: não repete no mesmo pacotinho
  }
  return sorteadas;
}

// Abre um pacotinho: primeiro o grátis do dia; se já foi aberto hoje, um extra.
// Devolve null se não há pacotinho, ou um objeto com:
//   figurinhas: lista de { figurinha, nova }   (nova = ainda não tinha)
//   conquistas: nomes das conquistas feitas com este pacotinho
function abrirPacotinho() {
  const album = lerAlbum();
  const eDoDia = temPacotinhoDoDia(album);
  if (!eDoDia && album.extras < 1) return null;

  if (eDoDia) {
    // Abriu ontem também? A sequência cresce. Senão, recomeça do 1.
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

// Cola uma figurinha que está na mão. Devolve os nomes das conquistas novas,
// ou null se não deu para colar (não tem a figurinha ou ela já está colada).
function colarFigurinha(numero) {
  const album = lerAlbum();
  if (!estaNaMao(album, numero)) return null;

  album.coladas.push(numero);
  const conquistas = conferirConquistas(album);
  salvarAlbum(album);
  return conquistas;
}

// Desfaz a colagem: a figurinha volta para a mão.
// (Conquista já feita continua feita.)
function descolarFigurinha(numero) {
  const album = lerAlbum();
  album.coladas = album.coladas.filter(function (colada) { return colada !== numero; });
  salvarAlbum(album);
}

// Troca na banca (simulação): sai uma repetida e chega uma figurinha que faltava.
// Devolve os nomes das conquistas novas, ou null se a troca não vale
// (a figurinha dada não é repetida, ou a recebida a pessoa já tem).
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

// Modo demonstração: ganha pacotinhos extras de uma vez
function ganharPacotinhosExtras(quantos) {
  const album = lerAlbum();
  album.extras += quantos;
  salvarAlbum(album);
}

// ---------------------------------------------------------------------------
// 6. Cartela da sequência (aparece nas páginas Início e Pacotinhos)
// ---------------------------------------------------------------------------

// A sequência só continua valendo se o último pacotinho do dia foi aberto
// hoje ou ontem. Passou disso, ela recomeça no próximo pacotinho.
function sequenciaAtual(album) {
  const emDia = album.ultimoDia === hoje() || album.ultimoDia === ontem();
  return emDia ? album.sequencia : 0;
}

// Carimba as casas da cartela (uma lista com 7 itens) e devolve a frase que
// explica a sequência. No 8º dia a cartela recomeça: 8 dias marcam 1 casa.
function marcarCartela(lista, album) {
  const dias = sequenciaAtual(album);
  const marcadas = dias === 0 ? 0 : ((dias - 1) % 7) + 1;
  const casas = lista.querySelectorAll('li');

  for (let i = 0; i < casas.length; i++) {
    const carimbado = i < marcadas;
    casas[i].classList.toggle('carimbado', carimbado);
    // O texto escondido é para o leitor de tela: "Dia 2, carimbado"
    casas[i].innerHTML = '<span class="cartela-dia"><span class="escondido">Dia </span>' + (i + 1) +
      (carimbado ? '<span class="escondido">, carimbado</span>' : '') + '</span>';
  }

  if (dias === 0) return 'Nenhum dia marcado. Cada pacotinho do dia ganha um carimbo.';
  let frase = dias === 1 ? '1 dia marcado.' : dias + ' dias seguidos.';
  if (temPacotinhoDoDia(album)) frase += ' Abra o pacotinho de hoje para a sequência não parar.';
  else frase += ' Volte amanhã para continuar.';
  return frase;
}

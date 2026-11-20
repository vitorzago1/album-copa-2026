// ============================================================================
// dados.js
// ----------------------------------------------------------------------------
// Tudo o que o álbum sabe sobre a Copa de 2026: seleções, figurinhas e sedes.
//
// Fica em um arquivo .js (e não em .json carregado com fetch) para o site
// funcionar abrindo o index.html direto do computador.
//
// REGRA: nada aqui é inventado. Cada registro tem o campo "fonte", com os
// apelidos das fontes listadas em FONTES. O que não foi possível confirmar
// está escrito como 'a confirmar'.
//
// Por enquanto só o Grupo C está completo (etapa 4 do projeto). As 16 sedes
// já estão todas aqui.
// Consulta das fontes: 19 e 20/11/2026.
// ============================================================================

// ---------------------------------------------------------------------------
// FONTES: de onde veio cada informação
// ---------------------------------------------------------------------------

const FONTES = {
  'fifa-elencos': {
    titulo: 'FIFA. World Cup 2026: 48 squads confirmed (comunicado de 2 de junho de 2026)',
    url: 'https://inside.fifa.com/media-releases/world-cup-2026-48-squads-confirmed',
  },
  'wiki-elencos': {
    titulo: 'Wikipedia. 2026 FIFA World Cup squads (lista dos 48 elencos, com número, posição e clube)',
    url: 'https://en.wikipedia.org/wiki/2026_FIFA_World_Cup_squads',
  },
  'f365-elencos': {
    titulo: 'Football365. 2026 World Cup: final confirmed squad lists and squad numbers for all 48 nations',
    url: 'https://www.football365.com/news/2026-world-cup-squads-full-48-teams-every-player',
  },
  'wiki-grupo-c': {
    titulo: 'Wikipedia. 2026 FIFA World Cup Group C (classificação e jogos)',
    url: 'https://en.wikipedia.org/wiki/2026_FIFA_World_Cup_Group_C',
  },
  'itatiaia-alisson': {
    titulo: 'Itatiaia. Sob dúvidas e após lesão, Alisson é convocado e vai à 3ª Copa do Mundo pelo Brasil',
    url: 'https://www.itatiaia.com.br/esportes/futebol/selecao-brasileira/sob-duvidas-e-apos-lesao-alisson-e-convocado-e-vai-a-3a-copa-do-mundo-pelo-brasil/',
  },
  'dp-alisson': {
    titulo: 'Diário de Pernambuco. Alisson celebra terceira Copa seguida pelo Brasil',
    url: 'https://www.diariodepernambuco.com.br/esportes-dp/selecao-brasileira/2026/06/11716381-alisson-celebra-terceira-copa-seguida-pelo-brasil-e-garante-capacidade-fisica-no-mundial.html',
  },
  'itatiaia-marquinhos': {
    titulo: 'Itatiaia. Capitão com Ancelotti, Marquinhos disputará terceira Copa do Mundo pelo Brasil',
    url: 'https://www.itatiaia.com.br/esportes/futebol/selecao-brasileira/capitao-com-ancelotti-marquinhos-disputara-terceira-copa-do-mundo-pelo-brasil/',
  },
  'opopular-capitao': {
    titulo: 'O Popular. Ancelotti escala Brasil para amistoso e confirma Marquinhos capitão na Copa do Mundo',
    url: 'https://opopular.com.br/esporte/ancelotti-escala-brasil-para-amistoso-e-confirma-marquinhos-capit-o-na-copa-do-mundo-1.3416667',
  },
  'fourfourtwo-brasil': {
    titulo: "FourFourTwo. Brazil squad World Cup 2026: Carlo Ancelotti's 26 players",
    url: 'https://www.fourfourtwo.com/us/team/brazil-world-cup-2026-squad',
  },
  'si-numeros-brasil': {
    titulo: 'Sports Illustrated. Brazil 2026 World Cup Shirt Numbers',
    url: 'https://www.si.com/soccer/brazil-2026-world-cup-shirt-numbers-neymar-selecao-history',
  },
  'espn-escocia-brasil': {
    titulo: 'ESPN. Scotland 0-3 Brazil: Vinícius Júnior leaves Tartan Army World Cup hopes in tatters',
    url: 'https://global.espn.com/football/story/_/id/49167442/scotland-0-3-brazil-vinicius-junior-leaves-tartan-army-2026-world-cup-hopes-serious-jeopardy-miami',
  },
  'bein-escocia-brasil': {
    titulo: 'beIN Sports. Scotland 0-3 Brazil: Vinicius brace seals top spot in Group C',
    url: 'https://www.beinsports.com/en-us/soccer/fifa-world-cup-2026/articles/scotland-0-3-brazil-vinicius-brace-seals-top-spot-in-group-c-2026-06-25',
  },
  'aljazeera-escocia-brasil': {
    titulo: 'Al Jazeera. Brazil 3-0 Scotland: World Cup 2026, as it happened',
    url: 'https://www.aljazeera.com/amp/sports/liveblog/2026/6/24/scotland-vs-brazil-live-world-cup-2026',
  },
  'thenational-marrocos': {
    titulo: 'The National. Morocco World Cup talking points: Atlas Lions have high hopes under Mohamed Ouahbi',
    url: 'https://www.thenationalnews.com/sport/2026/05/29/morocco-world-cup-talking-points-atlas-lions-have-high-hopes-under-new-leadership-of-mohamed-ouahbi/',
  },
  'bein-marrocos': {
    titulo: "beIN Sports. Mohamed Ouahbi's official Morocco squad for the 2026 FIFA World Cup",
    url: 'https://www.beinsports.com/en-us/soccer/fifa-world-cup-2026/articles/mohamed-ouahbi-s-official-morocco-squad-for-the-2026-fifa-world-cup-2026-05-26',
  },
  'fox-saibari': {
    titulo: 'Fox Sports. Ismael Saibari scores in second minute to lift Morocco over Scotland 1-0',
    url: 'https://www.foxsports.com/articles/soccer/ismael-saibari-scores-in-second-minute-to-lift-morocco-over-scotland-10-at-the-world-cup',
  },
  'aljazeera-saibari': {
    titulo: 'Al Jazeera. Morocco beat Scotland 1-0 as Saibari scores fastest World Cup 2026 goal',
    url: 'https://www.aljazeera.com/amp/sports/2026/6/20/morocco-beat-scotland-1-0-as-saibari-scores-fastest-world-cup-2026',
  },
  'concacaf-haiti': {
    titulo: 'Concacaf. FIFA World Cup 2026 Team Profile: Haiti',
    url: 'https://www.concacaf.com/competitions/fifa-world-cup/news/fifa-world-cup-2026-team-profile-haiti',
  },
  'heavy-haiti': {
    titulo: 'Heavy. Haiti Announces Squad for 2026 FIFA World Cup',
    url: 'https://heavy.com/sports/soccer/world-cup/haiti-announces-squad-fifa-world-cup/',
  },
  'uefa-escocia': {
    titulo: 'UEFA. Scotland at the World Cup 2026: squad, fixtures, group and history',
    url: 'https://www.uefa.com/european-qualifiers/news/02a6-20d159741fe9-a2a8fac9839d-1000--scotland-at-the-world-cup-2026-squad-fixtures-group-and-hi/',
  },
  'espn-haiti-escocia': {
    titulo: 'ESPN. Haiti 0-1 Scotland: John McGinn scores winner as Tartan Army end World Cup drought',
    url: 'https://global.espn.com/football/story/_/id/49055260/haiti-scotland-world-cup-2026-result-score-recap-john-mcginn-ben-gannon-doak-group-c',
  },
  'thescore-haiti-escocia': {
    titulo: 'theScore. Scotland beats Haiti for 1st World Cup win since 1990',
    url: 'https://beta.thescore.com/news/3553489/scotland-beats-haiti-for-1-st-world-cup-win-since-1990',
  },
  'wiki-copa': {
    titulo: 'Wikipedia. 2026 FIFA World Cup (seção Venues: cidades, estádios, número de jogos e capacidade). Consulta em 20/11/2026',
    url: 'https://en.wikipedia.org/wiki/2026_FIFA_World_Cup',
  },
};

// ---------------------------------------------------------------------------
// SELEÇÕES
// ---------------------------------------------------------------------------
// "cores" partem das cores da bandeira e são usadas no desenho da figurinha:
//   campo  = fundo do retrato      camisa = cor da camisa      numero = cor do número
// Foram ajustadas para o número ter pelo menos 3:1 de contraste com a camisa
// e a silhueta (azul-tinteiro) ter pelo menos 3:1 com o campo.
// "depoisDoGrupo" ainda não foi pesquisado com segurança: fica para a etapa
// da página "Como terminou".

const SELECOES = [
  {
    id: 'brasil',
    nome: 'Brasil',
    grupo: 'C',
    bandeira: 'br',
    confederacao: 'CONMEBOL (América do Sul)',
    tecnico: 'Carlo Ancelotti',
    capitao: 'Marquinhos',
    campanha: 'Primeiro lugar do Grupo C, com 7 pontos: 1 a 1 com Marrocos, 3 a 0 no Haiti e 3 a 0 na Escócia.',
    depoisDoGrupo: 'a confirmar',
    curiosidade: 'Chegou à Copa de 2026 como a única seleção cinco vezes campeã do mundo.',
    cores: { campo: '#228B59', camisa: '#F7D417', numero: '#1B3F8F' },
    fonte: ['wiki-elencos', 'wiki-grupo-c', 'bein-escocia-brasil', 'opopular-capitao', 'fourfourtwo-brasil'],
  },
  {
    id: 'marrocos',
    nome: 'Marrocos',
    grupo: 'C',
    bandeira: 'ma',
    confederacao: 'CAF (África)',
    tecnico: 'Mohamed Ouahbi',
    capitao: 'Achraf Hakimi',
    campanha: 'Segundo lugar do Grupo C, com 7 pontos: 1 a 1 com o Brasil, 1 a 0 na Escócia e 4 a 2 no Haiti.',
    depoisDoGrupo: 'a confirmar',
    curiosidade: 'Em 2022, foi a primeira seleção africana a chegar a uma semifinal de Copa do Mundo.',
    cores: { campo: '#2E9B5F', camisa: '#C1272D', numero: '#FFFFFF' },
    fonte: ['wiki-elencos', 'wiki-grupo-c', 'thenational-marrocos', 'bein-marrocos', 'aljazeera-saibari'],
  },
  {
    id: 'haiti',
    nome: 'Haiti',
    grupo: 'C',
    bandeira: 'ht',
    confederacao: 'Concacaf (América do Norte, Central e Caribe)',
    tecnico: 'Sébastien Migné',
    capitao: 'Johny Placide',
    campanha: 'Quarto lugar do Grupo C, sem pontos: 0 a 1 para a Escócia, 0 a 3 para o Brasil e 2 a 4 para Marrocos.',
    depoisDoGrupo: 'Eliminado na fase de grupos.',
    curiosidade: 'Disputou em 2026 a sua segunda Copa do Mundo. A primeira tinha sido em 1974.',
    cores: { campo: '#DC2B47', camisa: '#00209F', numero: '#FFFFFF' },
    fonte: ['wiki-elencos', 'wiki-grupo-c', 'concacaf-haiti'],
  },
  {
    id: 'escocia',
    nome: 'Escócia',
    grupo: 'C',
    bandeira: 'gb-sct',
    confederacao: 'UEFA (Europa)',
    tecnico: 'Steve Clarke',
    capitao: 'Andy Robertson',
    campanha: 'Terceiro lugar do Grupo C, com 3 pontos: 1 a 0 no Haiti, 0 a 1 para Marrocos e 0 a 3 para o Brasil.',
    depoisDoGrupo: 'Eliminada na fase de grupos: não ficou entre os oito melhores terceiros colocados.',
    curiosidade: 'Voltou à Copa do Mundo depois de 28 anos. A última participação tinha sido em 1998.',
    cores: { campo: '#DCE6F5', camisa: '#005EB8', numero: '#FFFFFF' },
    fonte: ['wiki-elencos', 'wiki-grupo-c', 'uefa-escocia'],
  },
];

// ---------------------------------------------------------------------------
// FIGURINHAS
// ---------------------------------------------------------------------------
// Numeração: cada grupo tem 24 figurinhas (4 seleções x 6). O Grupo A fica com
// 1 a 24, o B com 25 a 48, o C com 49 a 72 e assim por diante. Dentro do grupo,
// as seleções seguem a ordem do sorteio (C1 Brasil, C2 Marrocos, C3 Haiti,
// C4 Escócia): primeiro a bandeira, depois os 5 jogadores pelo número da camisa.
//
// Raridade (regra do álbum, não é dado da Copa):
//   lendaria  = o camisa 10 da seleção
//   brilhante = a bandeira e o capitão
//   comum     = os demais
//
// Posição: as quatro categorias da lista oficial (Goleiro, Defensor,
// Meio-campista, Atacante). "clube" é o clube do jogador na época da Copa.

const FIGURINHAS = [
  // ----- Brasil -----
  { numero: 49, tipo: 'bandeira', selecao: 'brasil', nome: 'Brasil', raridade: 'brilhante', fonte: ['wiki-grupo-c'] },
  {
    numero: 50, tipo: 'jogador', selecao: 'brasil', nome: 'Alisson', camisa: 1, posicao: 'Goleiro', clube: 'Liverpool', raridade: 'comum',
    curiosidade: 'Foi à terceira Copa seguida como goleiro do Brasil: 2018, 2022 e 2026.',
    fonte: ['wiki-elencos', 'f365-elencos', 'itatiaia-alisson', 'dp-alisson'],
  },
  {
    numero: 51, tipo: 'jogador', selecao: 'brasil', nome: 'Marquinhos', camisa: 4, posicao: 'Defensor', clube: 'Paris Saint-Germain', raridade: 'brilhante',
    curiosidade: 'Capitão do Brasil na Copa de 2026, a terceira da carreira dele.',
    fonte: ['wiki-elencos', 'f365-elencos', 'itatiaia-marquinhos', 'opopular-capitao'],
  },
  {
    numero: 52, tipo: 'jogador', selecao: 'brasil', nome: 'Casemiro', camisa: 5, posicao: 'Meio-campista', clube: 'Manchester United', raridade: 'comum',
    curiosidade: 'Usou a braçadeira de capitão no último amistoso antes da Copa, contra o Panamá.',
    fonte: ['wiki-elencos', 'f365-elencos', 'opopular-capitao'],
  },
  {
    numero: 53, tipo: 'jogador', selecao: 'brasil', nome: 'Vinícius Júnior', camisa: 7, posicao: 'Atacante', clube: 'Real Madrid', raridade: 'comum',
    curiosidade: 'Fez dois gols nos 3 a 0 sobre a Escócia e foi eleito o melhor em campo.',
    fonte: ['wiki-elencos', 'f365-elencos', 'espn-escocia-brasil', 'aljazeera-escocia-brasil'],
  },
  {
    numero: 54, tipo: 'jogador', selecao: 'brasil', nome: 'Neymar', camisa: 10, posicao: 'Atacante', clube: 'Santos', raridade: 'lendaria',
    curiosidade: 'Maior artilheiro da história da seleção brasileira. Vestiu a camisa 10 na Copa de 2026.',
    fonte: ['wiki-elencos', 'f365-elencos', 'fourfourtwo-brasil', 'si-numeros-brasil'],
  },

  // ----- Marrocos -----
  { numero: 55, tipo: 'bandeira', selecao: 'marrocos', nome: 'Marrocos', raridade: 'brilhante', fonte: ['wiki-grupo-c'] },
  {
    numero: 56, tipo: 'jogador', selecao: 'marrocos', nome: 'Yassine Bounou', camisa: 1, posicao: 'Goleiro', clube: 'Al-Hilal', raridade: 'comum',
    curiosidade: 'Parte da imprensa o chama pelo apelido: Bono.',
    fonte: ['wiki-elencos', 'f365-elencos', 'bein-marrocos'],
  },
  {
    numero: 57, tipo: 'jogador', selecao: 'marrocos', nome: 'Achraf Hakimi', camisa: 2, posicao: 'Defensor', clube: 'Paris Saint-Germain', raridade: 'brilhante',
    curiosidade: 'Capitão de Marrocos e o jogador com mais partidas pela seleção no elenco.',
    fonte: ['wiki-elencos', 'f365-elencos', 'thenational-marrocos'],
  },
  {
    numero: 58, tipo: 'jogador', selecao: 'marrocos', nome: 'Brahim Díaz', camisa: 10, posicao: 'Atacante', clube: 'Real Madrid', raridade: 'lendaria',
    curiosidade: 'Vestiu a camisa 10 de Marrocos na Copa de 2026.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 59, tipo: 'jogador', selecao: 'marrocos', nome: 'Ismael Saibari', camisa: 11, posicao: 'Meio-campista', clube: 'PSV Eindhoven', raridade: 'comum',
    curiosidade: 'Marcou contra o Brasil e, aos 71 segundos de jogo, contra a Escócia.',
    fonte: ['wiki-elencos', 'f365-elencos', 'fox-saibari', 'aljazeera-saibari'],
  },
  {
    numero: 60, tipo: 'jogador', selecao: 'marrocos', nome: 'Ayoub El Kaabi', camisa: 20, posicao: 'Atacante', clube: 'Olympiacos', raridade: 'comum',
    curiosidade: 'Chegou à Copa como o maior goleador do elenco marroquino.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },

  // ----- Haiti -----
  { numero: 61, tipo: 'bandeira', selecao: 'haiti', nome: 'Haiti', raridade: 'brilhante', fonte: ['wiki-grupo-c'] },
  {
    numero: 62, tipo: 'jogador', selecao: 'haiti', nome: 'Johny Placide', camisa: 1, posicao: 'Goleiro', clube: 'Bastia', raridade: 'brilhante',
    curiosidade: 'Capitão do Haiti e o mais experiente do elenco. Estreou pela seleção em 2011.',
    fonte: ['wiki-elencos', 'f365-elencos', 'concacaf-haiti'],
  },
  {
    numero: 63, tipo: 'jogador', selecao: 'haiti', nome: 'Ricardo Adé', camisa: 4, posicao: 'Defensor', clube: 'LDU Quito', raridade: 'comum',
    curiosidade: 'Aos 36 anos, era o defensor mais velho do elenco do Haiti.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 64, tipo: 'jogador', selecao: 'haiti', nome: 'Duckens Nazon', camisa: 9, posicao: 'Atacante', clube: 'Esteghlal', raridade: 'comum',
    curiosidade: 'Maior artilheiro da história do Haiti. Ninguém fez mais gols que ele nas Eliminatórias da Concacaf: 6.',
    fonte: ['wiki-elencos', 'f365-elencos', 'concacaf-haiti'],
  },
  {
    numero: 65, tipo: 'jogador', selecao: 'haiti', nome: 'Jean-Ricner Bellegarde', camisa: 10, posicao: 'Meio-campista', clube: 'Wolverhampton Wanderers', raridade: 'lendaria',
    curiosidade: 'Vestiu a camisa 10 do Haiti. Joga na primeira divisão da Inglaterra.',
    fonte: ['wiki-elencos', 'f365-elencos', 'heavy-haiti'],
  },
  {
    numero: 66, tipo: 'jogador', selecao: 'haiti', nome: 'Frantzdy Pierrot', camisa: 20, posicao: 'Atacante', clube: 'Çaykur Rizespor', raridade: 'comum',
    curiosidade: 'Nasceu no Haiti e cresceu nos Estados Unidos, um dos países-sede da Copa.',
    fonte: ['wiki-elencos', 'f365-elencos', 'concacaf-haiti'],
  },

  // ----- Escócia -----
  { numero: 67, tipo: 'bandeira', selecao: 'escocia', nome: 'Escócia', raridade: 'brilhante', fonte: ['wiki-grupo-c'] },
  {
    numero: 68, tipo: 'jogador', selecao: 'escocia', nome: 'Andy Robertson', camisa: 3, posicao: 'Defensor', clube: 'Liverpool', raridade: 'brilhante',
    curiosidade: 'Capitão da Escócia. Estreou pela seleção em 2014.',
    fonte: ['wiki-elencos', 'f365-elencos', 'uefa-escocia'],
  },
  {
    numero: 69, tipo: 'jogador', selecao: 'escocia', nome: 'Scott McTominay', camisa: 4, posicao: 'Meio-campista', clube: 'Napoli', raridade: 'comum',
    curiosidade: 'Um dos três artilheiros da Escócia nas Eliminatórias, com 2 gols.',
    fonte: ['wiki-elencos', 'f365-elencos', 'uefa-escocia'],
  },
  {
    numero: 70, tipo: 'jogador', selecao: 'escocia', nome: 'John McGinn', camisa: 7, posicao: 'Meio-campista', clube: 'Aston Villa', raridade: 'comum',
    curiosidade: 'Fez o gol do 1 a 0 sobre o Haiti: a primeira vitória da Escócia em Copas desde 1990.',
    fonte: ['wiki-elencos', 'f365-elencos', 'espn-haiti-escocia', 'thescore-haiti-escocia'],
  },
  {
    numero: 71, tipo: 'jogador', selecao: 'escocia', nome: 'Ché Adams', camisa: 10, posicao: 'Atacante', clube: 'Torino', raridade: 'lendaria',
    curiosidade: 'Um dos três artilheiros da Escócia nas Eliminatórias, com 2 gols.',
    fonte: ['wiki-elencos', 'f365-elencos', 'uefa-escocia'],
  },
  {
    numero: 72, tipo: 'jogador', selecao: 'escocia', nome: 'Craig Gordon', camisa: 21, posicao: 'Goleiro', clube: 'Heart of Midlothian', raridade: 'comum',
    curiosidade: 'Jogador mais velho da Copa de 2026: 43 anos e 162 dias.',
    fonte: ['wiki-elencos', 'f365-elencos', 'fifa-elencos'],
  },
];

// ---------------------------------------------------------------------------
// SEDES: as 16 cidades e os estádios da Copa
// ---------------------------------------------------------------------------
// Ordem: do maior estádio para o menor, como na tabela da fonte.
//   cidade      = nome usado pela organização (região metropolitana)
//   municipio   = onde o estádio fica de fato, quando não é na própria cidade
//   nomeNaCopa  = nome usado durante o torneio (a FIFA não usa nomes de patrocinador)
//   jogos       = quantas partidas da Copa de 2026 o estádio recebeu
//   capacidade  = lugares, segundo a tabela da fonte
//   nota        = um fato a mais, tirado da mesma tabela
//
// Fotos: Wikimedia Commons, todas com licença livre. O arquivo de cada foto é
// assets/img/sedes/ + id + .jpg (versão de 960 px de largura, sem outra
// alteração). "origem" é a página da foto original, com autor e licença.

const SEDES = [
  {
    id: 'cidade-do-mexico', cidade: 'Cidade do México', municipio: '', pais: 'México', bandeira: 'mx',
    estadio: 'Estadio Azteca', nomeNaCopa: 'Mexico City Stadium', jogos: 5, capacidade: 80824,
    nota: 'O único dos 16 estádios que já tinha recebido Copas do Mundo.',
    foto: {
      alt: 'Vista aérea do Estadio Azteca, com a cidade ao fundo.',
      autor: 'ProtoplasmaKid', licenca: 'CC BY 4.0', licencaUrl: 'https://creativecommons.org/licenses/by/4.0',
      origem: 'https://commons.wikimedia.org/wiki/File:Vista_a%C3%A9rea_del_Estadio_Azteca_-_2026_-_02.jpg',
    },
    fonte: ['wiki-copa'],
  },
  {
    id: 'nova-york-nova-jersey', cidade: 'Nova York/Nova Jersey', municipio: 'East Rutherford', pais: 'Estados Unidos', bandeira: 'us',
    estadio: 'MetLife Stadium', nomeNaCopa: 'New York New Jersey Stadium', jogos: 8, capacidade: 80663,
    nota: 'Palco da final.',
    foto: {
      alt: 'Vista aérea do MetLife Stadium, cercado de estacionamentos.',
      autor: 'Anthony Quintano', licenca: 'CC BY 2.0', licencaUrl: 'https://creativecommons.org/licenses/by/2.0',
      origem: 'https://commons.wikimedia.org/wiki/File:Metlife_stadium_(Aerial_view).jpg',
    },
    fonte: ['wiki-copa'],
  },
  {
    id: 'dallas', cidade: 'Dallas', municipio: 'Arlington', pais: 'Estados Unidos', bandeira: 'us',
    estadio: 'AT&T Stadium', nomeNaCopa: 'Dallas Stadium', jogos: 9, capacidade: 70649,
    nota: 'O estádio que mais recebeu jogos nesta Copa.',
    foto: {
      alt: 'AT&T Stadium visto de fora, atrás de um gramado com árvores.',
      autor: 'Michael Barera', licenca: 'CC BY-SA 4.0', licencaUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      origem: 'https://commons.wikimedia.org/wiki/File:Arlington_June_2020_4_(AT%26T_Stadium).jpg',
    },
    fonte: ['wiki-copa'],
  },
  {
    id: 'los-angeles', cidade: 'Los Angeles', municipio: 'Inglewood', pais: 'Estados Unidos', bandeira: 'us',
    estadio: 'SoFi Stadium', nomeNaCopa: 'Los Angeles Stadium', jogos: 8, capacidade: 70492,
    nota: '',
    foto: {
      alt: 'SoFi Stadium visto de fora, do outro lado de um lago.',
      autor: 'Troutfarm27', licenca: 'CC BY-SA 4.0', licencaUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      origem: 'https://commons.wikimedia.org/wiki/File:SoFi_Stadium_2023.jpg',
    },
    fonte: ['wiki-copa'],
  },
  {
    id: 'kansas-city', cidade: 'Kansas City', municipio: '', pais: 'Estados Unidos', bandeira: 'us',
    estadio: 'Arrowhead Stadium', nomeNaCopa: 'Kansas City Stadium', jogos: 6, capacidade: 69045,
    nota: '',
    foto: {
      alt: 'Vista aérea do Arrowhead Stadium, com as arquibancadas vazias.',
      autor: 'Ichabod', licenca: 'CC BY-SA 3.0', licencaUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      origem: 'https://commons.wikimedia.org/wiki/File:Aerial_view_of_Arrowhead_Stadium_08-31-2013.jpg',
    },
    fonte: ['wiki-copa'],
  },
  {
    id: 'baia-de-sao-francisco', cidade: 'Baía de São Francisco', municipio: 'Santa Clara', pais: 'Estados Unidos', bandeira: 'us',
    estadio: "Levi's Stadium", nomeNaCopa: 'San Francisco Bay Area Stadium', jogos: 6, capacidade: 68827,
    nota: '',
    foto: {
      alt: "Levi's Stadium visto de cima, com um helicóptero em primeiro plano.",
      autor: 'U.S. Customs and Border Protection', licenca: 'Domínio público', licencaUrl: '',
      origem: 'https://commons.wikimedia.org/wiki/File:Levi%27s_Stadium_in_February_2016_prior_to_Super_Bowl_50_(24398261729).jpg',
    },
    fonte: ['wiki-copa'],
  },
  {
    id: 'houston', cidade: 'Houston', municipio: '', pais: 'Estados Unidos', bandeira: 'us',
    estadio: 'NRG Stadium', nomeNaCopa: 'Houston Stadium', jogos: 7, capacidade: 68777,
    nota: '',
    foto: {
      alt: 'NRG Stadium iluminado ao anoitecer.',
      autor: 'Carlos.dkfi', licenca: 'CC0', licencaUrl: 'https://creativecommons.org/publicdomain/zero/1.0/deed.pt-br',
      origem: 'https://commons.wikimedia.org/wiki/File:Nrg_stadium.jpg',
    },
    fonte: ['wiki-copa'],
  },
  {
    id: 'filadelfia', cidade: 'Filadélfia', municipio: '', pais: 'Estados Unidos', bandeira: 'us',
    estadio: 'Lincoln Financial Field', nomeNaCopa: 'Philadelphia Stadium', jogos: 6, capacidade: 68324,
    nota: '',
    foto: {
      alt: 'Vista aérea do Lincoln Financial Field, ao lado de uma linha de trem.',
      autor: 'Dough4872', licenca: 'CC BY-SA 4.0', licencaUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      origem: 'https://commons.wikimedia.org/wiki/File:Lincoln_Financial_Field,_Philadelphia,_Pennsylvania,_United_States.jpg',
    },
    fonte: ['wiki-copa'],
  },
  {
    id: 'atlanta', cidade: 'Atlanta', municipio: '', pais: 'Estados Unidos', bandeira: 'us',
    estadio: 'Mercedes-Benz Stadium', nomeNaCopa: 'Atlanta Stadium', jogos: 8, capacidade: 68239,
    nota: '',
    foto: {
      alt: 'Mercedes-Benz Stadium visto de cima, com a fachada de painéis em ângulo.',
      autor: 'Atlanta Falcons', licenca: 'CC BY 3.0', licencaUrl: 'https://creativecommons.org/licenses/by/3.0',
      origem: 'https://commons.wikimedia.org/wiki/File:Mercedes_Benz_Stadium_time_lapse_capture_2017-08-13.jpg',
    },
    fonte: ['wiki-copa'],
  },
  {
    id: 'seattle', cidade: 'Seattle', municipio: '', pais: 'Estados Unidos', bandeira: 'us',
    estadio: 'Lumen Field', nomeNaCopa: 'Seattle Stadium', jogos: 6, capacidade: 66925,
    nota: '',
    foto: {
      alt: 'Vista aérea do estádio de Seattle em 2002, com os prédios do centro ao fundo.',
      autor: 'Seattle Municipal Archives', licenca: 'CC BY 2.0', licencaUrl: 'https://creativecommons.org/licenses/by/2.0',
      origem: 'https://commons.wikimedia.org/wiki/File:Aerial_of_Qwest_Field_and_downtown_skyline,_2002.jpg',
    },
    fonte: ['wiki-copa'],
  },
  {
    id: 'miami', cidade: 'Miami', municipio: 'Miami Gardens', pais: 'Estados Unidos', bandeira: 'us',
    estadio: 'Hard Rock Stadium', nomeNaCopa: 'Miami Stadium', jogos: 7, capacidade: 64478,
    nota: 'Palco da disputa do terceiro lugar.',
    foto: {
      alt: 'Hard Rock Stadium visto de fora, com os mastros brancos da cobertura.',
      autor: 'elisfkc2', licenca: 'CC BY-SA 2.0', licencaUrl: 'https://creativecommons.org/licenses/by-sa/2.0',
      origem: 'https://commons.wikimedia.org/wiki/File:Hard_Rock_Stadium_for_Super_Bowl_LIV_(49606710103).jpg',
    },
    fonte: ['wiki-copa'],
  },
  {
    id: 'boston', cidade: 'Boston', municipio: 'Foxborough', pais: 'Estados Unidos', bandeira: 'us',
    estadio: 'Gillette Stadium', nomeNaCopa: 'Boston Stadium', jogos: 7, capacidade: 64146,
    nota: '',
    foto: {
      alt: 'Vista aérea do Gillette Stadium.',
      autor: 'Art N.', licenca: 'CC BY 2.0', licencaUrl: 'https://creativecommons.org/licenses/by/2.0',
      origem: 'https://commons.wikimedia.org/wiki/File:Gillette_Stadium_(Top_View).jpg',
    },
    fonte: ['wiki-copa'],
  },
  {
    id: 'vancouver', cidade: 'Vancouver', municipio: '', pais: 'Canadá', bandeira: 'ca',
    estadio: 'BC Place', nomeNaCopa: 'BC Place Vancouver', jogos: 7, capacidade: 52497,
    nota: '',
    foto: {
      alt: 'BC Place visto de fora, com os mastros brancos da cobertura.',
      autor: 'Robert Ashworth', licenca: 'CC BY 2.0', licencaUrl: 'https://creativecommons.org/licenses/by/2.0',
      origem: 'https://commons.wikimedia.org/wiki/File:BC_Place_Stadium_(6179392956).jpg',
    },
    fonte: ['wiki-copa'],
  },
  {
    id: 'monterrey', cidade: 'Monterrey', municipio: 'Guadalupe', pais: 'México', bandeira: 'mx',
    estadio: 'Estadio BBVA', nomeNaCopa: 'Estadio Monterrey', jogos: 4, capacidade: 51243,
    nota: '',
    foto: {
      alt: 'Vista aérea do Estadio BBVA, de cobertura metálica ondulada.',
      autor: 'Arne Müseler', licenca: 'CC BY-SA 3.0 DE', licencaUrl: 'https://creativecommons.org/licenses/by-sa/3.0/de/deed.pt-br',
      origem: 'https://commons.wikimedia.org/wiki/File:Mexico_Guadalupe_Monterrey_Estadio_BBVA_Bancomer_fifa_world_cup_2026_6.JPG',
    },
    fonte: ['wiki-copa'],
  },
  {
    id: 'guadalajara', cidade: 'Guadalajara', municipio: 'Zapopan', pais: 'México', bandeira: 'mx',
    estadio: 'Estadio Akron', nomeNaCopa: 'Estadio Guadalajara', jogos: 4, capacidade: 45664,
    nota: '',
    foto: {
      alt: 'Arquibancadas e gramado do Estadio Akron, vistos de dentro.',
      autor: 'Alejan98', licenca: 'CC0', licencaUrl: 'https://creativecommons.org/publicdomain/zero/1.0/deed.pt-br',
      origem: 'https://commons.wikimedia.org/wiki/File:Estadio_Akron_02-07-2022_cabecera_sur_lado_derecho_(3).jpg',
    },
    fonte: ['wiki-copa'],
  },
  {
    id: 'toronto', cidade: 'Toronto', municipio: '', pais: 'Canadá', bandeira: 'ca',
    estadio: 'BMO Field', nomeNaCopa: 'Toronto Stadium', jogos: 6, capacidade: 43036,
    nota: 'O menor dos 16 estádios.',
    foto: {
      alt: 'Arquibancada coberta do BMO Field, vista de fora.',
      autor: 'Fabian Roudra Baroi', licenca: 'CC BY-SA 4.0', licencaUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      origem: 'https://commons.wikimedia.org/wiki/File:BMO_Field_Closeups_03.jpg',
    },
    fonte: ['wiki-copa'],
  },
];

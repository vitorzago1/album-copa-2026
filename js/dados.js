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
// Os 12 grupos estão completos: 48 seleções e 288 figurinhas, mais as 16 sedes
// e o resumo de como a Copa terminou.
//   - O Grupo C foi pesquisado e escrito à mão (etapa 4 do projeto).
//   - Os outros 11 grupos foram lidos por script das páginas listadas em
//     FONTES e conferidos com uma segunda lista de elencos. As frases
//     (campanha, curiosidade) são montadas a partir desses dados.
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
  'wiki-grupo-a': {
    titulo: 'Wikipedia. 2026 FIFA World Cup Group A (seleções, classificação e jogos)',
    url: 'https://en.wikipedia.org/wiki/2026_FIFA_World_Cup_Group_A',
  },
  'wiki-grupo-b': {
    titulo: 'Wikipedia. 2026 FIFA World Cup Group B (seleções, classificação e jogos)',
    url: 'https://en.wikipedia.org/wiki/2026_FIFA_World_Cup_Group_B',
  },
  'wiki-grupo-d': {
    titulo: 'Wikipedia. 2026 FIFA World Cup Group D (seleções, classificação e jogos)',
    url: 'https://en.wikipedia.org/wiki/2026_FIFA_World_Cup_Group_D',
  },
  'wiki-grupo-e': {
    titulo: 'Wikipedia. 2026 FIFA World Cup Group E (seleções, classificação e jogos)',
    url: 'https://en.wikipedia.org/wiki/2026_FIFA_World_Cup_Group_E',
  },
  'wiki-grupo-f': {
    titulo: 'Wikipedia. 2026 FIFA World Cup Group F (seleções, classificação e jogos)',
    url: 'https://en.wikipedia.org/wiki/2026_FIFA_World_Cup_Group_F',
  },
  'wiki-grupo-g': {
    titulo: 'Wikipedia. 2026 FIFA World Cup Group G (seleções, classificação e jogos)',
    url: 'https://en.wikipedia.org/wiki/2026_FIFA_World_Cup_Group_G',
  },
  'wiki-grupo-h': {
    titulo: 'Wikipedia. 2026 FIFA World Cup Group H (seleções, classificação e jogos)',
    url: 'https://en.wikipedia.org/wiki/2026_FIFA_World_Cup_Group_H',
  },
  'wiki-grupo-i': {
    titulo: 'Wikipedia. 2026 FIFA World Cup Group I (seleções, classificação e jogos)',
    url: 'https://en.wikipedia.org/wiki/2026_FIFA_World_Cup_Group_I',
  },
  'wiki-grupo-j': {
    titulo: 'Wikipedia. 2026 FIFA World Cup Group J (seleções, classificação e jogos)',
    url: 'https://en.wikipedia.org/wiki/2026_FIFA_World_Cup_Group_J',
  },
  'wiki-grupo-k': {
    titulo: 'Wikipedia. 2026 FIFA World Cup Group K (seleções, classificação e jogos)',
    url: 'https://en.wikipedia.org/wiki/2026_FIFA_World_Cup_Group_K',
  },
  'wiki-grupo-l': {
    titulo: 'Wikipedia. 2026 FIFA World Cup Group L (seleções, classificação e jogos)',
    url: 'https://en.wikipedia.org/wiki/2026_FIFA_World_Cup_Group_L',
  },
  'wiki-mata-mata': {
    titulo: 'Wikipedia. 2026 FIFA World Cup knockout stage, com as páginas "round of 32" e "final" (jogos do mata-mata)',
    url: 'https://en.wikipedia.org/wiki/2026_FIFA_World_Cup_knockout_stage',
  },
  'wiki-jogos': {
    titulo: 'Wikipedia. Páginas dos 12 grupos e do mata-mata da Copa de 2026 (quem marcou os gols de cada jogo)',
    url: 'https://en.wikipedia.org/wiki/2026_FIFA_World_Cup',
  },
  'espn-final': {
    titulo: 'ESPN. Spain 1-0 Argentina (Jul 19, 2026) Final Score',
    url: 'https://www.espn.com/soccer/match/_/gameId/760517/argentina-spain',
  },
  'npr-final': {
    titulo: 'NPR. Spain is the 2026 World Cup champion, defeating Argentina for its 2nd title',
    url: 'https://www.npr.org/2026/07/19/nx-s1-5899071/2026-world-cup-fifa-argentina-spain-final-championship',
  },
  'cbs-final': {
    titulo: 'CBS News. Spain wins 2026 FIFA World Cup with grueling 1-0 victory over Argentina',
    url: 'https://www.cbsnews.com/news/2026-fifa-world-cup-final-spain-argentina-sunday/',
  },
};

// ---------------------------------------------------------------------------
// SELEÇÕES
// ---------------------------------------------------------------------------
// "cores" partem das cores da bandeira e são usadas no desenho da figurinha:
//   campo  = fundo do retrato      camisa = cor da camisa      numero = cor do número
// Foram ajustadas para o número ter pelo menos 3:1 de contraste com a camisa
// e a silhueta (azul-tinteiro) ter pelo menos 3:1 com o campo.
// "campanha" e "depoisDoGrupo" contam os resultados do ponto de vista da
// seleção: "2 a 0 no México" é vitória, "1 a 1 com o México" é empate e
// "0 a 2 para o México" é derrota.

const SELECOES = [
  // ===== Grupo A e Grupo B =====
  {
    id: 'mexico',
    nome: 'México',
    grupo: 'A',
    bandeira: 'mx',
    confederacao: 'Concacaf (América do Norte, Central e Caribe)',
    tecnico: 'Javier Aguirre',
    capitao: 'Edson Álvarez',
    campanha: 'Primeiro lugar do Grupo A, com 9 pontos: 2 a 0 na África do Sul, 1 a 0 na Coreia do Sul e 3 a 0 na Tchéquia.',
    depoisDoGrupo: 'Venceu o Equador por 2 a 0 nos 16 avos de final. Perdeu para a Inglaterra por 3 a 2 nas oitavas de final.',
    curiosidade: 'Disputou em 2026 a sua 18ª Copa do Mundo.',
    cores: { campo: '#D9534F', camisa: '#0B6B3A', numero: '#FFFFFF' },
    fonte: ['wiki-elencos', 'wiki-grupo-a', 'wiki-mata-mata'],
  },
  {
    id: 'africa-do-sul',
    nome: 'África do Sul',
    grupo: 'A',
    bandeira: 'za',
    confederacao: 'CAF (África)',
    tecnico: 'Hugo Broos',
    capitao: 'Ronwen Williams',
    campanha: 'Segundo lugar do Grupo A, com 4 pontos: 0 a 2 para o México, 1 a 1 com a Tchéquia e 1 a 0 na Coreia do Sul.',
    depoisDoGrupo: 'Perdeu para o Canadá por 1 a 0 nos 16 avos de final.',
    curiosidade: 'Disputou em 2026 a sua 4ª Copa do Mundo. A anterior tinha sido em 2010.',
    cores: { campo: '#2E9E6B', camisa: '#F7C531', numero: '#0B5A3C' },
    fonte: ['wiki-elencos', 'wiki-grupo-a', 'wiki-mata-mata'],
  },
  {
    id: 'coreia-do-sul',
    nome: 'Coreia do Sul',
    grupo: 'A',
    bandeira: 'kr',
    confederacao: 'AFC (Ásia)',
    tecnico: 'Hong Myung-bo',
    capitao: 'Son Heung-min',
    campanha: 'Terceiro lugar do Grupo A, com 3 pontos: 2 a 1 na Tchéquia, 0 a 1 para o México e 0 a 1 para a África do Sul.',
    depoisDoGrupo: 'Eliminada na fase de grupos: não ficou entre os oito melhores terceiros colocados.',
    curiosidade: 'Disputou em 2026 a sua 12ª Copa do Mundo.',
    cores: { campo: '#DCE6F5', camisa: '#D8242F', numero: '#FFFFFF' },
    fonte: ['wiki-elencos', 'wiki-grupo-a'],
  },
  {
    id: 'tchequia',
    nome: 'Tchéquia',
    grupo: 'A',
    bandeira: 'cz',
    confederacao: 'UEFA (Europa)',
    tecnico: 'Miroslav Koubek',
    capitao: 'Ladislav Krejčí',
    campanha: 'Quarto lugar do Grupo A, com 1 ponto: 1 a 2 para a Coreia do Sul, 1 a 1 com a África do Sul e 0 a 3 para o México.',
    depoisDoGrupo: 'Eliminada na fase de grupos.',
    curiosidade: 'Disputou em 2026 a sua 10ª Copa do Mundo. A anterior tinha sido em 2006.',
    cores: { campo: '#5B8BD6', camisa: '#C8102E', numero: '#FFFFFF' },
    fonte: ['wiki-elencos', 'wiki-grupo-a'],
  },
  {
    id: 'canada',
    nome: 'Canadá',
    grupo: 'B',
    bandeira: 'ca',
    confederacao: 'Concacaf (América do Norte, Central e Caribe)',
    tecnico: 'Jesse Marsch',
    capitao: 'Alphonso Davies',
    campanha: 'Segundo lugar do Grupo B, com 4 pontos: 1 a 1 com a Bósnia e Herzegovina, 6 a 0 no Catar e 1 a 2 para a Suíça.',
    depoisDoGrupo: 'Venceu a África do Sul por 1 a 0 nos 16 avos de final. Perdeu para Marrocos por 3 a 0 nas oitavas de final.',
    curiosidade: 'Disputou em 2026 a sua 3ª Copa do Mundo.',
    cores: { campo: '#F0E6E6', camisa: '#D52B1E', numero: '#FFFFFF' },
    fonte: ['wiki-elencos', 'wiki-grupo-b', 'wiki-mata-mata'],
  },
  {
    id: 'bosnia',
    nome: 'Bósnia e Herzegovina',
    grupo: 'B',
    bandeira: 'ba',
    confederacao: 'UEFA (Europa)',
    tecnico: 'Sergej Barbarez',
    capitao: 'Edin Džeko',
    campanha: 'Terceiro lugar do Grupo B, com 4 pontos: 1 a 1 com o Canadá, 1 a 4 para a Suíça e 3 a 1 no Catar.',
    depoisDoGrupo: 'Perdeu para os Estados Unidos por 2 a 0 nos 16 avos de final.',
    curiosidade: 'Disputou em 2026 a sua 2ª Copa do Mundo. A anterior tinha sido em 2014.',
    cores: { campo: '#F2D34B', camisa: '#1F4AA8', numero: '#FFFFFF' },
    fonte: ['wiki-elencos', 'wiki-grupo-b', 'wiki-mata-mata'],
  },
  {
    id: 'catar',
    nome: 'Catar',
    grupo: 'B',
    bandeira: 'qa',
    confederacao: 'AFC (Ásia)',
    tecnico: 'Julen Lopetegui',
    capitao: 'Hassan Al-Haydos',
    campanha: 'Quarto lugar do Grupo B, com 1 ponto: 1 a 1 com a Suíça, 0 a 6 para o Canadá e 1 a 3 para a Bósnia e Herzegovina.',
    depoisDoGrupo: 'Eliminado na fase de grupos.',
    curiosidade: 'Disputou em 2026 a sua 2ª Copa do Mundo.',
    cores: { campo: '#E9DDE2', camisa: '#8A1538', numero: '#FFFFFF' },
    fonte: ['wiki-elencos', 'wiki-grupo-b'],
  },
  {
    id: 'suica',
    nome: 'Suíça',
    grupo: 'B',
    bandeira: 'ch',
    confederacao: 'UEFA (Europa)',
    tecnico: 'Murat Yakin',
    capitao: 'Granit Xhaka',
    campanha: 'Primeiro lugar do Grupo B, com 7 pontos: 1 a 1 com o Catar, 4 a 1 na Bósnia e Herzegovina e 2 a 1 no Canadá.',
    depoisDoGrupo: 'Venceu a Argélia por 2 a 0 nos 16 avos de final. Passou pela Colômbia nos pênaltis (4 a 3) nas oitavas de final, depois de 0 a 0. Perdeu para a Argentina por 3 a 1 nas quartas de final, na prorrogação.',
    curiosidade: 'Disputou em 2026 a sua 13ª Copa do Mundo.',
    cores: { campo: '#EADADA', camisa: '#D52B1E', numero: '#FFFFFF' },
    fonte: ['wiki-elencos', 'wiki-grupo-b', 'wiki-mata-mata'],
  },

  // ===== Grupo C (pesquisado e escrito à mão) =====
  {
    id: 'brasil',
    nome: 'Brasil',
    grupo: 'C',
    bandeira: 'br',
    confederacao: 'CONMEBOL (América do Sul)',
    tecnico: 'Carlo Ancelotti',
    capitao: 'Marquinhos',
    campanha: 'Primeiro lugar do Grupo C, com 7 pontos: 1 a 1 com Marrocos, 3 a 0 no Haiti e 3 a 0 na Escócia.',
    depoisDoGrupo: 'Venceu o Japão por 2 a 1 nos 16 avos de final. Perdeu para a Noruega por 2 a 1 nas oitavas de final.',
    curiosidade: 'Chegou à Copa de 2026 como a única seleção cinco vezes campeã do mundo.',
    cores: { campo: '#228B59', camisa: '#F7D417', numero: '#1B3F8F' },
    fonte: ['wiki-elencos', 'wiki-grupo-c', 'wiki-mata-mata', 'bein-escocia-brasil', 'opopular-capitao', 'fourfourtwo-brasil'],
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
    depoisDoGrupo: 'Passou pela Holanda nos pênaltis (3 a 2) nos 16 avos de final, depois de 1 a 1. Venceu o Canadá por 3 a 0 nas oitavas de final. Perdeu para a França por 2 a 0 nas quartas de final.',
    curiosidade: 'Em 2022, foi a primeira seleção africana a chegar a uma semifinal de Copa do Mundo.',
    cores: { campo: '#2E9B5F', camisa: '#C1272D', numero: '#FFFFFF' },
    fonte: ['wiki-elencos', 'wiki-grupo-c', 'wiki-mata-mata', 'thenational-marrocos', 'bein-marrocos', 'aljazeera-saibari'],
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

  // ===== Grupos D a L =====
  {
    id: 'estados-unidos',
    nome: 'Estados Unidos',
    grupo: 'D',
    bandeira: 'us',
    confederacao: 'Concacaf (América do Norte, Central e Caribe)',
    tecnico: 'Mauricio Pochettino',
    capitao: 'Tim Ream',
    campanha: 'Primeiro lugar do Grupo D, com 6 pontos: 4 a 1 no Paraguai, 2 a 0 na Austrália e 2 a 3 para a Turquia.',
    depoisDoGrupo: 'Venceu a Bósnia e Herzegovina por 2 a 0 nos 16 avos de final. Perdeu para a Bélgica por 4 a 1 nas oitavas de final.',
    curiosidade: 'Disputou em 2026 a sua 12ª Copa do Mundo.',
    cores: { campo: '#DE5B64', camisa: '#FFFFFF', numero: '#1B2A6B' },
    fonte: ['wiki-elencos', 'wiki-grupo-d', 'wiki-mata-mata'],
  },
  {
    id: 'paraguai',
    nome: 'Paraguai',
    grupo: 'D',
    bandeira: 'py',
    confederacao: 'CONMEBOL (América do Sul)',
    tecnico: 'Gustavo Alfaro',
    capitao: 'Gustavo Gómez',
    campanha: 'Terceiro lugar do Grupo D, com 4 pontos: 1 a 4 para os Estados Unidos, 1 a 0 na Turquia e 0 a 0 com a Austrália.',
    depoisDoGrupo: 'Passou pela Alemanha nos pênaltis (4 a 3) nos 16 avos de final, depois de 1 a 1. Perdeu para a França por 1 a 0 nas oitavas de final.',
    curiosidade: 'Disputou em 2026 a sua 9ª Copa do Mundo. A anterior tinha sido em 2010.',
    cores: { campo: '#5B8BD6', camisa: '#D52B1E', numero: '#FFFFFF' },
    fonte: ['wiki-elencos', 'wiki-grupo-d', 'wiki-mata-mata'],
  },
  {
    id: 'australia',
    nome: 'Austrália',
    grupo: 'D',
    bandeira: 'au',
    confederacao: 'AFC (Ásia)',
    tecnico: 'Tony Popovic',
    capitao: 'Mathew Ryan',
    campanha: 'Segundo lugar do Grupo D, com 4 pontos: 2 a 0 na Turquia, 0 a 2 para os Estados Unidos e 0 a 0 com o Paraguai.',
    depoisDoGrupo: 'Caiu nos pênaltis para o Egito (4 a 2) nos 16 avos de final, depois de 1 a 1.',
    curiosidade: 'Disputou em 2026 a sua 7ª Copa do Mundo.',
    cores: { campo: '#2E9E6B', camisa: '#F7C531', numero: '#0B5A3C' },
    fonte: ['wiki-elencos', 'wiki-grupo-d', 'wiki-mata-mata'],
  },
  {
    id: 'turquia',
    nome: 'Turquia',
    grupo: 'D',
    bandeira: 'tr',
    confederacao: 'UEFA (Europa)',
    tecnico: 'Vincenzo Montella',
    capitao: 'Hakan Çalhanoğlu',
    campanha: 'Quarto lugar do Grupo D, com 3 pontos: 0 a 2 para a Austrália, 0 a 1 para o Paraguai e 3 a 2 nos Estados Unidos.',
    depoisDoGrupo: 'Eliminada na fase de grupos.',
    curiosidade: 'Disputou em 2026 a sua 3ª Copa do Mundo. A anterior tinha sido em 2002.',
    cores: { campo: '#F0E0E0', camisa: '#E30A17', numero: '#FFFFFF' },
    fonte: ['wiki-elencos', 'wiki-grupo-d'],
  },
  {
    id: 'alemanha',
    nome: 'Alemanha',
    grupo: 'E',
    bandeira: 'de',
    confederacao: 'UEFA (Europa)',
    tecnico: 'Julian Nagelsmann',
    capitao: 'Joshua Kimmich',
    campanha: 'Primeiro lugar do Grupo E, com 6 pontos: 7 a 1 em Curaçao, 2 a 1 na Costa do Marfim e 1 a 2 para o Equador.',
    depoisDoGrupo: 'Caiu nos pênaltis para o Paraguai (4 a 3) nos 16 avos de final, depois de 1 a 1.',
    curiosidade: 'Disputou em 2026 a sua 21ª Copa do Mundo.',
    cores: { campo: '#E6B93C', camisa: '#FFFFFF', numero: '#1A1A1A' },
    fonte: ['wiki-elencos', 'wiki-grupo-e', 'wiki-mata-mata'],
  },
  {
    id: 'curacao',
    nome: 'Curaçao',
    grupo: 'E',
    bandeira: 'cw',
    confederacao: 'Concacaf (América do Norte, Central e Caribe)',
    tecnico: 'Dick Advocaat',
    capitao: 'Leandro Bacuna',
    campanha: 'Quarto lugar do Grupo E, com 1 ponto: 1 a 7 para a Alemanha, 0 a 0 com o Equador e 0 a 2 para a Costa do Marfim.',
    depoisDoGrupo: 'Eliminado na fase de grupos.',
    curiosidade: 'Estreou em Copas do Mundo em 2026.',
    cores: { campo: '#F2D34B', camisa: '#1F4AA8', numero: '#FFFFFF' },
    fonte: ['wiki-elencos', 'wiki-grupo-e'],
  },
  {
    id: 'costa-do-marfim',
    nome: 'Costa do Marfim',
    grupo: 'E',
    bandeira: 'ci',
    confederacao: 'CAF (África)',
    tecnico: 'Emerse Faé',
    capitao: 'Franck Kessié',
    campanha: 'Segundo lugar do Grupo E, com 6 pontos: 1 a 0 no Equador, 1 a 2 para a Alemanha e 2 a 0 em Curaçao.',
    depoisDoGrupo: 'Perdeu para a Noruega por 2 a 1 nos 16 avos de final.',
    curiosidade: 'Disputou em 2026 a sua 4ª Copa do Mundo. A anterior tinha sido em 2014.',
    cores: { campo: '#3FA36B', camisa: '#F28C28', numero: '#14204F' },
    fonte: ['wiki-elencos', 'wiki-grupo-e', 'wiki-mata-mata'],
  },
  {
    id: 'equador',
    nome: 'Equador',
    grupo: 'E',
    bandeira: 'ec',
    confederacao: 'CONMEBOL (América do Sul)',
    tecnico: 'Sebastián Beccacece',
    capitao: 'Enner Valencia',
    campanha: 'Terceiro lugar do Grupo E, com 4 pontos: 0 a 1 para a Costa do Marfim, 0 a 0 com Curaçao e 2 a 1 na Alemanha.',
    depoisDoGrupo: 'Perdeu para o México por 2 a 0 nos 16 avos de final.',
    curiosidade: 'Disputou em 2026 a sua 5ª Copa do Mundo.',
    cores: { campo: '#5B8BD6', camisa: '#F7D417', numero: '#1B3F8F' },
    fonte: ['wiki-elencos', 'wiki-grupo-e', 'wiki-mata-mata'],
  },
  {
    id: 'holanda',
    nome: 'Holanda',
    grupo: 'F',
    bandeira: 'nl',
    confederacao: 'UEFA (Europa)',
    tecnico: 'Ronald Koeman',
    capitao: 'Virgil van Dijk',
    campanha: 'Primeiro lugar do Grupo F, com 7 pontos: 2 a 2 com o Japão, 5 a 1 na Suécia e 3 a 1 na Tunísia.',
    depoisDoGrupo: 'Caiu nos pênaltis para Marrocos (3 a 2) nos 16 avos de final, depois de 1 a 1.',
    curiosidade: 'Disputou em 2026 a sua 12ª Copa do Mundo.',
    cores: { campo: '#F2E2D0', camisa: '#F36C21', numero: '#1A1A1A' },
    fonte: ['wiki-elencos', 'wiki-grupo-f', 'wiki-mata-mata'],
  },
  {
    id: 'japao',
    nome: 'Japão',
    grupo: 'F',
    bandeira: 'jp',
    confederacao: 'AFC (Ásia)',
    tecnico: 'Hajime Moriyasu',
    capitao: 'Kō Itakura',
    campanha: 'Segundo lugar do Grupo F, com 5 pontos: 2 a 2 com a Holanda, 4 a 0 na Tunísia e 1 a 1 com a Suécia.',
    depoisDoGrupo: 'Perdeu para o Brasil por 2 a 1 nos 16 avos de final.',
    curiosidade: 'Disputou em 2026 a sua 8ª Copa do Mundo.',
    cores: { campo: '#E8ECF5', camisa: '#1D3C8F', numero: '#FFFFFF' },
    fonte: ['wiki-elencos', 'wiki-grupo-f', 'wiki-mata-mata'],
  },
  {
    id: 'suecia',
    nome: 'Suécia',
    grupo: 'F',
    bandeira: 'se',
    confederacao: 'UEFA (Europa)',
    tecnico: 'Graham Potter',
    capitao: 'Victor Lindelöf',
    campanha: 'Terceiro lugar do Grupo F, com 4 pontos: 5 a 1 na Tunísia, 1 a 5 para a Holanda e 1 a 1 com o Japão.',
    depoisDoGrupo: 'Perdeu para a França por 3 a 0 nos 16 avos de final.',
    curiosidade: 'Disputou em 2026 a sua 13ª Copa do Mundo. A anterior tinha sido em 2018.',
    cores: { campo: '#5B8BD6', camisa: '#F7D417', numero: '#1B4F9C' },
    fonte: ['wiki-elencos', 'wiki-grupo-f', 'wiki-mata-mata'],
  },
  {
    id: 'tunisia',
    nome: 'Tunísia',
    grupo: 'F',
    bandeira: 'tn',
    confederacao: 'CAF (África)',
    tecnico: 'Sabri Lamouchi (primeiro jogo) e Hervé Renard (demais jogos)',
    capitao: 'Ellyes Skhiri',
    campanha: 'Quarto lugar do Grupo F, sem pontos: 1 a 5 para a Suécia, 0 a 4 para o Japão e 1 a 3 para a Holanda.',
    depoisDoGrupo: 'Eliminada na fase de grupos.',
    curiosidade: 'Disputou em 2026 a sua 7ª Copa do Mundo.',
    cores: { campo: '#DE5B64', camisa: '#FFFFFF', numero: '#C8102E' },
    fonte: ['wiki-elencos', 'wiki-grupo-f'],
  },
  {
    id: 'belgica',
    nome: 'Bélgica',
    grupo: 'G',
    bandeira: 'be',
    confederacao: 'UEFA (Europa)',
    tecnico: 'Rudi Garcia',
    capitao: 'Youri Tielemans',
    campanha: 'Primeiro lugar do Grupo G, com 5 pontos: 1 a 1 com o Egito, 0 a 0 com o Irã e 5 a 1 na Nova Zelândia.',
    depoisDoGrupo: 'Venceu o Senegal por 3 a 2 nos 16 avos de final, na prorrogação. Venceu os Estados Unidos por 4 a 1 nas oitavas de final. Perdeu para a Espanha por 2 a 1 nas quartas de final.',
    curiosidade: 'Disputou em 2026 a sua 15ª Copa do Mundo.',
    cores: { campo: '#E6B93C', camisa: '#C8102E', numero: '#FFFFFF' },
    fonte: ['wiki-elencos', 'wiki-grupo-g', 'wiki-mata-mata'],
  },
  {
    id: 'egito',
    nome: 'Egito',
    grupo: 'G',
    bandeira: 'eg',
    confederacao: 'CAF (África)',
    tecnico: 'Hossam Hassan',
    capitao: 'Mohamed Salah',
    campanha: 'Segundo lugar do Grupo G, com 5 pontos: 1 a 1 com a Bélgica, 3 a 1 na Nova Zelândia e 1 a 1 com o Irã.',
    depoisDoGrupo: 'Passou pela Austrália nos pênaltis (4 a 2) nos 16 avos de final, depois de 1 a 1. Perdeu para a Argentina por 3 a 2 nas oitavas de final.',
    curiosidade: 'Disputou em 2026 a sua 4ª Copa do Mundo. A anterior tinha sido em 2018.',
    cores: { campo: '#E9E2D0', camisa: '#C8102E', numero: '#FFFFFF' },
    fonte: ['wiki-elencos', 'wiki-grupo-g', 'wiki-mata-mata'],
  },
  {
    id: 'ira',
    nome: 'Irã',
    grupo: 'G',
    bandeira: 'ir',
    confederacao: 'AFC (Ásia)',
    tecnico: 'Amir Ghalenoei',
    capitao: 'Ehsan Hajsafi',
    campanha: 'Terceiro lugar do Grupo G, com 3 pontos: 2 a 2 com a Nova Zelândia, 0 a 0 com a Bélgica e 1 a 1 com o Egito.',
    depoisDoGrupo: 'Eliminado na fase de grupos: não ficou entre os oito melhores terceiros colocados.',
    curiosidade: 'Disputou em 2026 a sua 7ª Copa do Mundo.',
    cores: { campo: '#3FA36B', camisa: '#FFFFFF', numero: '#C8102E' },
    fonte: ['wiki-elencos', 'wiki-grupo-g'],
  },
  {
    id: 'nova-zelandia',
    nome: 'Nova Zelândia',
    grupo: 'G',
    bandeira: 'nz',
    confederacao: 'OFC (Oceania)',
    tecnico: 'Darren Bazeley',
    capitao: 'Chris Wood',
    campanha: 'Quarto lugar do Grupo G, com 1 ponto: 2 a 2 com o Irã, 1 a 3 para o Egito e 1 a 5 para a Bélgica.',
    depoisDoGrupo: 'Eliminada na fase de grupos.',
    curiosidade: 'Disputou em 2026 a sua 3ª Copa do Mundo. A anterior tinha sido em 2010.',
    cores: { campo: '#A9B1BB', camisa: '#FFFFFF', numero: '#1A1A1A' },
    fonte: ['wiki-elencos', 'wiki-grupo-g'],
  },
  {
    id: 'espanha',
    nome: 'Espanha',
    grupo: 'H',
    bandeira: 'es',
    confederacao: 'UEFA (Europa)',
    tecnico: 'Luis de la Fuente',
    capitao: 'Rodri',
    campanha: 'Primeiro lugar do Grupo H, com 7 pontos: 0 a 0 com Cabo Verde, 4 a 0 na Arábia Saudita e 1 a 0 no Uruguai.',
    depoisDoGrupo: 'Venceu a Áustria por 3 a 0 nos 16 avos de final. Venceu Portugal por 1 a 0 nas oitavas de final. Venceu a Bélgica por 2 a 1 nas quartas de final. Venceu a França por 2 a 0 na semifinal. Venceu a Argentina por 1 a 0 na final, na prorrogação. Campeã do mundo.',
    curiosidade: 'Disputou em 2026 a sua 17ª Copa do Mundo.',
    cores: { campo: '#F1BF00', camisa: '#C60B1E', numero: '#FFFFFF' },
    fonte: ['wiki-elencos', 'wiki-grupo-h', 'wiki-mata-mata'],
  },
  {
    id: 'cabo-verde',
    nome: 'Cabo Verde',
    grupo: 'H',
    bandeira: 'cv',
    confederacao: 'CAF (África)',
    tecnico: 'Bubista',
    capitao: 'Ryan Mendes',
    campanha: 'Segundo lugar do Grupo H, com 3 pontos: 0 a 0 com a Espanha, 2 a 2 com o Uruguai e 0 a 0 com a Arábia Saudita.',
    depoisDoGrupo: 'Perdeu para a Argentina por 3 a 2 nos 16 avos de final, na prorrogação.',
    curiosidade: 'Estreou em Copas do Mundo em 2026.',
    cores: { campo: '#DDE3F2', camisa: '#1F4AA8', numero: '#FFFFFF' },
    fonte: ['wiki-elencos', 'wiki-grupo-h', 'wiki-mata-mata'],
  },
  {
    id: 'arabia-saudita',
    nome: 'Arábia Saudita',
    grupo: 'H',
    bandeira: 'sa',
    confederacao: 'AFC (Ásia)',
    tecnico: 'Georgios Donis',
    capitao: 'Salem Al-Dawsari',
    campanha: 'Quarto lugar do Grupo H, com 2 pontos: 1 a 1 com o Uruguai, 0 a 4 para a Espanha e 0 a 0 com Cabo Verde.',
    depoisDoGrupo: 'Eliminada na fase de grupos.',
    curiosidade: 'Disputou em 2026 a sua 7ª Copa do Mundo.',
    cores: { campo: '#E6EFE9', camisa: '#0B6B3A', numero: '#FFFFFF' },
    fonte: ['wiki-elencos', 'wiki-grupo-h'],
  },
  {
    id: 'uruguai',
    nome: 'Uruguai',
    grupo: 'H',
    bandeira: 'uy',
    confederacao: 'CONMEBOL (América do Sul)',
    tecnico: 'Marcelo Bielsa',
    capitao: 'José María Giménez',
    campanha: 'Terceiro lugar do Grupo H, com 2 pontos: 1 a 1 com a Arábia Saudita, 2 a 2 com Cabo Verde e 0 a 1 para a Espanha.',
    depoisDoGrupo: 'Eliminado na fase de grupos: não ficou entre os oito melhores terceiros colocados.',
    curiosidade: 'Disputou em 2026 a sua 15ª Copa do Mundo.',
    cores: { campo: '#F2F2EA', camisa: '#6CACE4', numero: '#14204F' },
    fonte: ['wiki-elencos', 'wiki-grupo-h'],
  },
  {
    id: 'franca',
    nome: 'França',
    grupo: 'I',
    bandeira: 'fr',
    confederacao: 'UEFA (Europa)',
    tecnico: 'Didier Deschamps',
    capitao: 'Kylian Mbappé',
    campanha: 'Primeiro lugar do Grupo I, com 9 pontos: 3 a 1 no Senegal, 3 a 0 no Iraque e 4 a 1 na Noruega.',
    depoisDoGrupo: 'Venceu a Suécia por 3 a 0 nos 16 avos de final. Venceu o Paraguai por 1 a 0 nas oitavas de final. Venceu Marrocos por 2 a 0 nas quartas de final. Perdeu para a Espanha por 2 a 0 na semifinal. Perdeu para a Inglaterra por 6 a 4 na disputa do terceiro lugar. Ficou em quarto lugar.',
    curiosidade: 'Disputou em 2026 a sua 17ª Copa do Mundo.',
    cores: { campo: '#DE5B64', camisa: '#1F3A8A', numero: '#FFFFFF' },
    fonte: ['wiki-elencos', 'wiki-grupo-i', 'wiki-mata-mata'],
  },
  {
    id: 'senegal',
    nome: 'Senegal',
    grupo: 'I',
    bandeira: 'sn',
    confederacao: 'CAF (África)',
    tecnico: 'Pape Thiaw',
    capitao: 'Kalidou Koulibaly',
    campanha: 'Terceiro lugar do Grupo I, com 3 pontos: 1 a 3 para a França, 2 a 3 para a Noruega e 5 a 0 no Iraque.',
    depoisDoGrupo: 'Perdeu para a Bélgica por 3 a 2 nos 16 avos de final, na prorrogação.',
    curiosidade: 'Disputou em 2026 a sua 4ª Copa do Mundo.',
    cores: { campo: '#F2D34B', camisa: '#FFFFFF', numero: '#0B6B3A' },
    fonte: ['wiki-elencos', 'wiki-grupo-i', 'wiki-mata-mata'],
  },
  {
    id: 'iraque',
    nome: 'Iraque',
    grupo: 'I',
    bandeira: 'iq',
    confederacao: 'AFC (Ásia)',
    tecnico: 'Graham Arnold',
    capitao: 'Jalal Hassan',
    campanha: 'Quarto lugar do Grupo I, sem pontos: 1 a 4 para a Noruega, 0 a 3 para a França e 0 a 5 para o Senegal.',
    depoisDoGrupo: 'Eliminado na fase de grupos.',
    curiosidade: 'Disputou em 2026 a sua 2ª Copa do Mundo. A anterior tinha sido em 1986.',
    cores: { campo: '#E9E2D0', camisa: '#0B7A45', numero: '#FFFFFF' },
    fonte: ['wiki-elencos', 'wiki-grupo-i'],
  },
  {
    id: 'noruega',
    nome: 'Noruega',
    grupo: 'I',
    bandeira: 'no',
    confederacao: 'UEFA (Europa)',
    tecnico: 'Ståle Solbakken',
    capitao: 'Martin Ødegaard',
    campanha: 'Segundo lugar do Grupo I, com 6 pontos: 4 a 1 no Iraque, 3 a 2 no Senegal e 1 a 4 para a França.',
    depoisDoGrupo: 'Venceu a Costa do Marfim por 2 a 1 nos 16 avos de final. Venceu o Brasil por 2 a 1 nas oitavas de final. Perdeu para a Inglaterra por 2 a 1 nas quartas de final, na prorrogação.',
    curiosidade: 'Disputou em 2026 a sua 4ª Copa do Mundo. A anterior tinha sido em 1998.',
    cores: { campo: '#5B8BD6', camisa: '#C8102E', numero: '#FFFFFF' },
    fonte: ['wiki-elencos', 'wiki-grupo-i', 'wiki-mata-mata'],
  },
  {
    id: 'argentina',
    nome: 'Argentina',
    grupo: 'J',
    bandeira: 'ar',
    confederacao: 'CONMEBOL (América do Sul)',
    tecnico: 'Lionel Scaloni',
    capitao: 'Lionel Messi',
    campanha: 'Primeiro lugar do Grupo J, com 9 pontos: 3 a 0 na Argélia, 2 a 0 na Áustria e 3 a 1 na Jordânia.',
    depoisDoGrupo: 'Venceu Cabo Verde por 3 a 2 nos 16 avos de final, na prorrogação. Venceu o Egito por 3 a 2 nas oitavas de final. Venceu a Suíça por 3 a 1 nas quartas de final, na prorrogação. Venceu a Inglaterra por 2 a 1 na semifinal. Perdeu para a Espanha por 1 a 0 na final, na prorrogação. Vice-campeã.',
    curiosidade: 'Disputou em 2026 a sua 19ª Copa do Mundo.',
    cores: { campo: '#F3F3F0', camisa: '#75AADB', numero: '#14204F' },
    fonte: ['wiki-elencos', 'wiki-grupo-j', 'wiki-mata-mata'],
  },
  {
    id: 'argelia',
    nome: 'Argélia',
    grupo: 'J',
    bandeira: 'dz',
    confederacao: 'CAF (África)',
    tecnico: 'Vladimir Petković',
    capitao: 'Riyad Mahrez',
    campanha: 'Terceiro lugar do Grupo J, com 4 pontos: 0 a 3 para a Argentina, 2 a 1 na Jordânia e 3 a 3 com a Áustria.',
    depoisDoGrupo: 'Perdeu para a Suíça por 2 a 0 nos 16 avos de final.',
    curiosidade: 'Disputou em 2026 a sua 5ª Copa do Mundo. A anterior tinha sido em 2014.',
    cores: { campo: '#3FA36B', camisa: '#FFFFFF', numero: '#0B6B3A' },
    fonte: ['wiki-elencos', 'wiki-grupo-j', 'wiki-mata-mata'],
  },
  {
    id: 'austria',
    nome: 'Áustria',
    grupo: 'J',
    bandeira: 'at',
    confederacao: 'UEFA (Europa)',
    tecnico: 'Ralf Rangnick',
    capitao: 'David Alaba',
    campanha: 'Segundo lugar do Grupo J, com 4 pontos: 3 a 1 na Jordânia, 0 a 2 para a Argentina e 3 a 3 com a Argélia.',
    depoisDoGrupo: 'Perdeu para a Espanha por 3 a 0 nos 16 avos de final.',
    curiosidade: 'Disputou em 2026 a sua 8ª Copa do Mundo. A anterior tinha sido em 1998.',
    cores: { campo: '#F0E6E6', camisa: '#D52B1E', numero: '#FFFFFF' },
    fonte: ['wiki-elencos', 'wiki-grupo-j', 'wiki-mata-mata'],
  },
  {
    id: 'jordania',
    nome: 'Jordânia',
    grupo: 'J',
    bandeira: 'jo',
    confederacao: 'AFC (Ásia)',
    tecnico: 'Jamal Sellami',
    capitao: 'Ihsan Haddad',
    campanha: 'Quarto lugar do Grupo J, sem pontos: 1 a 3 para a Áustria, 1 a 2 para a Argélia e 1 a 3 para a Argentina.',
    depoisDoGrupo: 'Eliminada na fase de grupos.',
    curiosidade: 'Estreou em Copas do Mundo em 2026.',
    cores: { campo: '#B9BEC6', camisa: '#FFFFFF', numero: '#C8102E' },
    fonte: ['wiki-elencos', 'wiki-grupo-j'],
  },
  {
    id: 'portugal',
    nome: 'Portugal',
    grupo: 'K',
    bandeira: 'pt',
    confederacao: 'UEFA (Europa)',
    tecnico: 'Roberto Martínez',
    capitao: 'Cristiano Ronaldo',
    campanha: 'Segundo lugar do Grupo K, com 5 pontos: 1 a 1 com a RD Congo, 5 a 0 no Uzbequistão e 0 a 0 com a Colômbia.',
    depoisDoGrupo: 'Venceu a Croácia por 2 a 1 nos 16 avos de final. Perdeu para a Espanha por 1 a 0 nas oitavas de final.',
    curiosidade: 'Disputou em 2026 a sua 9ª Copa do Mundo.',
    cores: { campo: '#2E9E6B', camisa: '#C8102E', numero: '#FFFFFF' },
    fonte: ['wiki-elencos', 'wiki-grupo-k', 'wiki-mata-mata'],
  },
  {
    id: 'rd-congo',
    nome: 'RD Congo',
    grupo: 'K',
    bandeira: 'cd',
    confederacao: 'CAF (África)',
    tecnico: 'Sébastien Desabre',
    capitao: 'Chancel Mbemba',
    campanha: 'Terceiro lugar do Grupo K, com 4 pontos: 1 a 1 com Portugal, 0 a 1 para a Colômbia e 3 a 1 no Uzbequistão.',
    depoisDoGrupo: 'Perdeu para a Inglaterra por 2 a 1 nos 16 avos de final.',
    curiosidade: 'Disputou em 2026 a sua 2ª Copa do Mundo. A anterior tinha sido em 1974.',
    cores: { campo: '#F2D34B', camisa: '#1F6FD0', numero: '#FFFFFF' },
    fonte: ['wiki-elencos', 'wiki-grupo-k', 'wiki-mata-mata'],
  },
  {
    id: 'uzbequistao',
    nome: 'Uzbequistão',
    grupo: 'K',
    bandeira: 'uz',
    confederacao: 'AFC (Ásia)',
    tecnico: 'Fabio Cannavaro',
    capitao: 'Eldor Shomurodov',
    campanha: 'Quarto lugar do Grupo K, sem pontos: 1 a 3 para a Colômbia, 0 a 5 para Portugal e 1 a 3 para a RD Congo.',
    depoisDoGrupo: 'Eliminado na fase de grupos.',
    curiosidade: 'Estreou em Copas do Mundo em 2026.',
    cores: { campo: '#6FC0EA', camisa: '#FFFFFF', numero: '#1F5FBF' },
    fonte: ['wiki-elencos', 'wiki-grupo-k'],
  },
  {
    id: 'colombia',
    nome: 'Colômbia',
    grupo: 'K',
    bandeira: 'co',
    confederacao: 'CONMEBOL (América do Sul)',
    tecnico: 'Néstor Lorenzo',
    capitao: 'James Rodríguez',
    campanha: 'Primeiro lugar do Grupo K, com 7 pontos: 3 a 1 no Uzbequistão, 1 a 0 na RD Congo e 0 a 0 com Portugal.',
    depoisDoGrupo: 'Venceu Gana por 1 a 0 nos 16 avos de final. Caiu nos pênaltis para a Suíça (4 a 3) nas oitavas de final, depois de 0 a 0.',
    curiosidade: 'Disputou em 2026 a sua 7ª Copa do Mundo. A anterior tinha sido em 2018.',
    cores: { campo: '#5B8BD6', camisa: '#F7D417', numero: '#1B3F8F' },
    fonte: ['wiki-elencos', 'wiki-grupo-k', 'wiki-mata-mata'],
  },
  {
    id: 'inglaterra',
    nome: 'Inglaterra',
    grupo: 'L',
    bandeira: 'gb-eng',
    confederacao: 'UEFA (Europa)',
    tecnico: 'Thomas Tuchel',
    capitao: 'Harry Kane',
    campanha: 'Primeiro lugar do Grupo L, com 7 pontos: 4 a 2 na Croácia, 0 a 0 com Gana e 2 a 0 no Panamá.',
    depoisDoGrupo: 'Venceu a RD Congo por 2 a 1 nos 16 avos de final. Venceu o México por 3 a 2 nas oitavas de final. Venceu a Noruega por 2 a 1 nas quartas de final, na prorrogação. Perdeu para a Argentina por 2 a 1 na semifinal. Venceu a França por 6 a 4 na disputa do terceiro lugar. Ficou em terceiro lugar.',
    curiosidade: 'Disputou em 2026 a sua 17ª Copa do Mundo.',
    cores: { campo: '#DE5B64', camisa: '#FFFFFF', numero: '#1B2A6B' },
    fonte: ['wiki-elencos', 'wiki-grupo-l', 'wiki-mata-mata'],
  },
  {
    id: 'croacia',
    nome: 'Croácia',
    grupo: 'L',
    bandeira: 'hr',
    confederacao: 'UEFA (Europa)',
    tecnico: 'Zlatko Dalić',
    capitao: 'Luka Modrić',
    campanha: 'Segundo lugar do Grupo L, com 6 pontos: 2 a 4 para a Inglaterra, 1 a 0 no Panamá e 2 a 1 em Gana.',
    depoisDoGrupo: 'Perdeu para Portugal por 2 a 1 nos 16 avos de final.',
    curiosidade: 'Disputou em 2026 a sua 7ª Copa do Mundo.',
    cores: { campo: '#F2F2F2', camisa: '#E03A3E', numero: '#FFFFFF' },
    fonte: ['wiki-elencos', 'wiki-grupo-l', 'wiki-mata-mata'],
  },
  {
    id: 'gana',
    nome: 'Gana',
    grupo: 'L',
    bandeira: 'gh',
    confederacao: 'CAF (África)',
    tecnico: 'Carlos Queiroz',
    capitao: 'Jordan Ayew',
    campanha: 'Terceiro lugar do Grupo L, com 4 pontos: 1 a 0 no Panamá, 0 a 0 com a Inglaterra e 1 a 2 para a Croácia.',
    depoisDoGrupo: 'Perdeu para a Colômbia por 1 a 0 nos 16 avos de final.',
    curiosidade: 'Disputou em 2026 a sua 5ª Copa do Mundo.',
    cores: { campo: '#E6B93C', camisa: '#FFFFFF', numero: '#1A1A1A' },
    fonte: ['wiki-elencos', 'wiki-grupo-l', 'wiki-mata-mata'],
  },
  {
    id: 'panama',
    nome: 'Panamá',
    grupo: 'L',
    bandeira: 'pa',
    confederacao: 'Concacaf (América do Norte, Central e Caribe)',
    tecnico: 'Thomas Christiansen',
    capitao: 'Aníbal Godoy',
    campanha: 'Quarto lugar do Grupo L, sem pontos: 0 a 1 para Gana, 0 a 1 para a Croácia e 0 a 2 para a Inglaterra.',
    depoisDoGrupo: 'Eliminado na fase de grupos.',
    curiosidade: 'Disputou em 2026 a sua 2ª Copa do Mundo. A anterior tinha sido em 2018.',
    cores: { campo: '#5B8BD6', camisa: '#D52B1E', numero: '#FFFFFF' },
    fonte: ['wiki-elencos', 'wiki-grupo-l'],
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
//   brilhante = a bandeira e o capitão (se o capitão veste a 10, vale a lendária)
//   comum     = os demais
//
// Quem entra, nos grupos lidos por script (todos menos o C), por ordem:
//   1. o capitão;  2. o camisa 10;  3. quem fez mais gols pela seleção na Copa;
//   4. o goleiro com mais jogos pela seleção;
//   5. os jogadores com mais jogos pela seleção, primeiro nas posições que
//      ainda não têm ninguém, até completar cinco.
// "Jogos" e "gols pela seleção" são os da lista de elencos, contados até o
// começo da Copa. "Gols na Copa" foram somados jogo a jogo.
//
// Posição: as quatro categorias da lista oficial (Goleiro, Defensor,
// Meio-campista, Atacante). "clube" é o clube do jogador na época da Copa.

const FIGURINHAS = [
  // =============== Grupo A e Grupo B ===============
  // ----- México -----
  { numero: 1, tipo: 'bandeira', selecao: 'mexico', nome: 'México', raridade: 'brilhante', fonte: ['wiki-grupo-a'] },
  {
    numero: 2, tipo: 'jogador', selecao: 'mexico', nome: 'Edson Álvarez', camisa: 4, posicao: 'Defensor', clube: 'Fenerbahçe', raridade: 'brilhante',
    curiosidade: 'Capitão do México na Copa de 2026. Chegou à Copa com 98 jogos e 7 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 3, tipo: 'jogador', selecao: 'mexico', nome: 'Alexis Vega', camisa: 10, posicao: 'Atacante', clube: 'Toluca', raridade: 'lendaria',
    curiosidade: 'Vestiu a camisa 10 do México. Chegou à Copa com 52 jogos e 7 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 4, tipo: 'jogador', selecao: 'mexico', nome: 'Guillermo Ochoa', camisa: 13, posicao: 'Goleiro', clube: 'AEL Limassol', raridade: 'comum',
    curiosidade: 'É quem mais jogou pela seleção no elenco: 152 partidas.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 5, tipo: 'jogador', selecao: 'mexico', nome: 'Julián Quiñones', camisa: 16, posicao: 'Atacante', clube: 'Al-Qadsiah', raridade: 'comum',
    curiosidade: 'Fez 4 gols na Copa de 2026. Chegou à Copa com 22 jogos e 2 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos', 'wiki-jogos'],
  },
  {
    numero: 6, tipo: 'jogador', selecao: 'mexico', nome: 'Orbelín Pineda', camisa: 17, posicao: 'Meio-campista', clube: 'AEK Athens', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 92 jogos e 12 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },

  // ----- África do Sul -----
  { numero: 7, tipo: 'bandeira', selecao: 'africa-do-sul', nome: 'África do Sul', raridade: 'brilhante', fonte: ['wiki-grupo-a'] },
  {
    numero: 8, tipo: 'jogador', selecao: 'africa-do-sul', nome: 'Ronwen Williams', camisa: 1, posicao: 'Goleiro', clube: 'Mamelodi Sundowns', raridade: 'brilhante',
    curiosidade: 'Capitão da África do Sul na Copa de 2026. É quem mais jogou pela seleção no elenco: 62 partidas.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 9, tipo: 'jogador', selecao: 'africa-do-sul', nome: 'Teboho Mokoena', camisa: 4, posicao: 'Meio-campista', clube: 'Mamelodi Sundowns', raridade: 'comum',
    curiosidade: 'Fez 1 gol na Copa de 2026. Chegou à Copa com 51 jogos e 9 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos', 'wiki-jogos'],
  },
  {
    numero: 10, tipo: 'jogador', selecao: 'africa-do-sul', nome: 'Aubrey Modiba', camisa: 6, posicao: 'Defensor', clube: 'Mamelodi Sundowns', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 44 jogos e 3 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 11, tipo: 'jogador', selecao: 'africa-do-sul', nome: 'Relebohile Mofokeng', camisa: 10, posicao: 'Atacante', clube: 'Orlando Pirates', raridade: 'lendaria',
    curiosidade: 'Vestiu a camisa 10 da África do Sul. Chegou à Copa com 13 jogos e 1 gol pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 12, tipo: 'jogador', selecao: 'africa-do-sul', nome: 'Themba Zwane', camisa: 11, posicao: 'Meio-campista', clube: 'Mamelodi Sundowns', raridade: 'comum',
    curiosidade: 'Maior goleador do elenco, com 12 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },

  // ----- Coreia do Sul -----
  { numero: 13, tipo: 'bandeira', selecao: 'coreia-do-sul', nome: 'Coreia do Sul', raridade: 'brilhante', fonte: ['wiki-grupo-a'] },
  {
    numero: 14, tipo: 'jogador', selecao: 'coreia-do-sul', nome: 'Kim Seung-gyu', camisa: 1, posicao: 'Goleiro', clube: 'FC Tokyo', raridade: 'comum',
    curiosidade: 'O mais velho do elenco, com 35 anos.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 15, tipo: 'jogador', selecao: 'coreia-do-sul', nome: 'Kim Min-jae', camisa: 4, posicao: 'Defensor', clube: 'Bayern Munich', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 79 jogos e 4 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 16, tipo: 'jogador', selecao: 'coreia-do-sul', nome: 'Hwang In-beom', camisa: 6, posicao: 'Meio-campista', clube: 'Feyenoord', raridade: 'comum',
    curiosidade: 'Fez 1 gol na Copa de 2026. Chegou à Copa com 73 jogos e 6 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos', 'wiki-jogos'],
  },
  {
    numero: 17, tipo: 'jogador', selecao: 'coreia-do-sul', nome: 'Son Heung-min', camisa: 7, posicao: 'Atacante', clube: 'Los Angeles FC', raridade: 'brilhante',
    curiosidade: 'Capitão da Coreia do Sul na Copa de 2026. É quem mais jogou pela seleção no elenco: 144 partidas.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 18, tipo: 'jogador', selecao: 'coreia-do-sul', nome: 'Lee Jae-sung', camisa: 10, posicao: 'Meio-campista', clube: 'Mainz 05', raridade: 'lendaria',
    curiosidade: 'Vestiu a camisa 10 da Coreia do Sul. Chegou à Copa com 105 jogos e 15 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },

  // ----- Tchéquia -----
  { numero: 19, tipo: 'bandeira', selecao: 'tchequia', nome: 'Tchéquia', raridade: 'brilhante', fonte: ['wiki-grupo-a'] },
  {
    numero: 20, tipo: 'jogador', selecao: 'tchequia', nome: 'Matěj Kovář', camisa: 1, posicao: 'Goleiro', clube: 'PSV Eindhoven', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 20 jogos pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 21, tipo: 'jogador', selecao: 'tchequia', nome: 'Ladislav Krejčí', camisa: 7, posicao: 'Defensor', clube: 'Wolverhampton Wanderers', raridade: 'brilhante',
    curiosidade: 'Capitão da Tchéquia na Copa de 2026. Fez 1 gol na Copa de 2026.',
    fonte: ['wiki-elencos', 'f365-elencos', 'wiki-jogos'],
  },
  {
    numero: 22, tipo: 'jogador', selecao: 'tchequia', nome: 'Patrik Schick', camisa: 10, posicao: 'Atacante', clube: 'Bayer Leverkusen', raridade: 'lendaria',
    curiosidade: 'Vestiu a camisa 10 da Tchéquia. Maior goleador do elenco, com 26 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 23, tipo: 'jogador', selecao: 'tchequia', nome: 'Michal Sadílek', camisa: 18, posicao: 'Meio-campista', clube: 'Slavia Prague', raridade: 'comum',
    curiosidade: 'Fez 1 gol na Copa de 2026. Chegou à Copa com 35 jogos e 1 gol pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos', 'wiki-jogos'],
  },
  {
    numero: 24, tipo: 'jogador', selecao: 'tchequia', nome: 'Tomáš Souček', camisa: 22, posicao: 'Meio-campista', clube: 'West Ham United', raridade: 'comum',
    curiosidade: 'É quem mais jogou pela seleção no elenco: 90 partidas.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },

  // ----- Canadá -----
  { numero: 25, tipo: 'bandeira', selecao: 'canada', nome: 'Canadá', raridade: 'brilhante', fonte: ['wiki-grupo-b'] },
  {
    numero: 26, tipo: 'jogador', selecao: 'canada', nome: 'Cyle Larin', camisa: 9, posicao: 'Atacante', clube: 'Southampton', raridade: 'comum',
    curiosidade: 'Fez 2 gols na Copa de 2026. É quem mais jogou pela seleção no elenco: 90 partidas.',
    fonte: ['wiki-elencos', 'f365-elencos', 'wiki-jogos'],
  },
  {
    numero: 27, tipo: 'jogador', selecao: 'canada', nome: 'Jonathan David', camisa: 10, posicao: 'Atacante', clube: 'Juventus', raridade: 'lendaria',
    curiosidade: 'Vestiu a camisa 10 do Canadá. Fez 3 gols na Copa de 2026.',
    fonte: ['wiki-elencos', 'f365-elencos', 'wiki-jogos'],
  },
  {
    numero: 28, tipo: 'jogador', selecao: 'canada', nome: 'Maxime Crépeau', camisa: 16, posicao: 'Goleiro', clube: 'Orlando City SC', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 32 jogos pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 29, tipo: 'jogador', selecao: 'canada', nome: 'Alphonso Davies', camisa: 19, posicao: 'Defensor', clube: 'Bayern Munich', raridade: 'brilhante',
    curiosidade: 'Capitão do Canadá na Copa de 2026. Chegou à Copa com 58 jogos e 15 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 30, tipo: 'jogador', selecao: 'canada', nome: 'Jonathan Osorio', camisa: 21, posicao: 'Meio-campista', clube: 'Toronto FC', raridade: 'comum',
    curiosidade: 'É quem mais jogou pela seleção no elenco: 90 partidas.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },

  // ----- Bósnia e Herzegovina -----
  { numero: 31, tipo: 'bandeira', selecao: 'bosnia', nome: 'Bósnia e Herzegovina', raridade: 'brilhante', fonte: ['wiki-grupo-b'] },
  {
    numero: 32, tipo: 'jogador', selecao: 'bosnia', nome: 'Nikola Vasilj', camisa: 1, posicao: 'Goleiro', clube: 'FC St. Pauli', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 26 jogos pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 33, tipo: 'jogador', selecao: 'bosnia', nome: 'Sead Kolašinac', camisa: 5, posicao: 'Defensor', clube: 'Atalanta', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 65 jogos pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 34, tipo: 'jogador', selecao: 'bosnia', nome: 'Ermedin Demirović', camisa: 10, posicao: 'Atacante', clube: 'VfB Stuttgart', raridade: 'lendaria',
    curiosidade: 'Vestiu a camisa 10 da Bósnia e Herzegovina. Chegou à Copa com 40 jogos e 4 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 35, tipo: 'jogador', selecao: 'bosnia', nome: 'Edin Džeko', camisa: 11, posicao: 'Atacante', clube: 'Schalke 04', raridade: 'brilhante',
    curiosidade: 'Capitão da Bósnia e Herzegovina na Copa de 2026. É quem mais jogou pela seleção no elenco: 148 partidas.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 36, tipo: 'jogador', selecao: 'bosnia', nome: 'Ermin Mahmić', camisa: 26, posicao: 'Meio-campista', clube: 'Slovan Liberec', raridade: 'comum',
    curiosidade: 'Fez 2 gols na Copa de 2026. Chegou à Copa com 2 jogos pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos', 'wiki-jogos'],
  },

  // ----- Catar -----
  { numero: 37, tipo: 'bandeira', selecao: 'catar', nome: 'Catar', raridade: 'brilhante', fonte: ['wiki-grupo-b'] },
  {
    numero: 38, tipo: 'jogador', selecao: 'catar', nome: 'Abdulaziz Hatem', camisa: 6, posicao: 'Meio-campista', clube: 'Al-Rayyan', raridade: 'comum',
    curiosidade: 'O mais velho do elenco, com 36 anos.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 39, tipo: 'jogador', selecao: 'catar', nome: 'Hassan Al-Haydos', camisa: 10, posicao: 'Atacante', clube: 'Al-Sadd', raridade: 'lendaria',
    curiosidade: 'Capitão e camisa 10 do Catar. Fez 1 gol na Copa de 2026.',
    fonte: ['wiki-elencos', 'f365-elencos', 'wiki-jogos'],
  },
  {
    numero: 40, tipo: 'jogador', selecao: 'catar', nome: 'Akram Afif', camisa: 11, posicao: 'Atacante', clube: 'Al-Sadd', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 125 jogos e 39 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 41, tipo: 'jogador', selecao: 'catar', nome: 'Boualem Khoukhi', camisa: 16, posicao: 'Defensor', clube: 'Al-Sadd', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 116 jogos e 20 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 42, tipo: 'jogador', selecao: 'catar', nome: 'Meshaal Barsham', camisa: 22, posicao: 'Goleiro', clube: 'Al-Sadd', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 52 jogos pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },

  // ----- Suíça -----
  { numero: 43, tipo: 'bandeira', selecao: 'suica', nome: 'Suíça', raridade: 'brilhante', fonte: ['wiki-grupo-b'] },
  {
    numero: 44, tipo: 'jogador', selecao: 'suica', nome: 'Gregor Kobel', camisa: 1, posicao: 'Goleiro', clube: 'Borussia Dortmund', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 21 jogos pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 45, tipo: 'jogador', selecao: 'suica', nome: 'Breel Embolo', camisa: 7, posicao: 'Atacante', clube: 'Rennes', raridade: 'comum',
    curiosidade: 'Fez 2 gols na Copa de 2026. Maior goleador do elenco, com 24 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos', 'wiki-jogos'],
  },
  {
    numero: 46, tipo: 'jogador', selecao: 'suica', nome: 'Johan Manzambi', camisa: 9, posicao: 'Meio-campista', clube: 'SC Freiburg', raridade: 'comum',
    curiosidade: 'Fez 3 gols na Copa de 2026. O mais novo do elenco, com 20 anos.',
    fonte: ['wiki-elencos', 'f365-elencos', 'wiki-jogos'],
  },
  {
    numero: 47, tipo: 'jogador', selecao: 'suica', nome: 'Granit Xhaka', camisa: 10, posicao: 'Meio-campista', clube: 'Sunderland', raridade: 'lendaria',
    curiosidade: 'Capitão e camisa 10 da Suíça. Fez 1 gol na Copa de 2026.',
    fonte: ['wiki-elencos', 'f365-elencos', 'wiki-jogos'],
  },
  {
    numero: 48, tipo: 'jogador', selecao: 'suica', nome: 'Ricardo Rodriguez', camisa: 13, posicao: 'Defensor', clube: 'Real Betis', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 138 jogos e 9 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },

  // =============== Grupo C (pesquisado e escrito à mão) ===============
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

  // =============== Grupos D a L ===============
  // ----- Estados Unidos -----
  { numero: 73, tipo: 'bandeira', selecao: 'estados-unidos', nome: 'Estados Unidos', raridade: 'brilhante', fonte: ['wiki-grupo-d'] },
  {
    numero: 74, tipo: 'jogador', selecao: 'estados-unidos', nome: 'Matt Turner', camisa: 1, posicao: 'Goleiro', clube: 'New England Revolution', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 54 jogos pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 75, tipo: 'jogador', selecao: 'estados-unidos', nome: 'Weston McKennie', camisa: 8, posicao: 'Meio-campista', clube: 'Juventus', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 66 jogos e 12 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 76, tipo: 'jogador', selecao: 'estados-unidos', nome: 'Christian Pulisic', camisa: 10, posicao: 'Atacante', clube: 'AC Milan', raridade: 'lendaria',
    curiosidade: 'Vestiu a camisa 10 dos Estados Unidos. É quem mais jogou pela seleção no elenco: 86 partidas.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 77, tipo: 'jogador', selecao: 'estados-unidos', nome: 'Tim Ream', camisa: 13, posicao: 'Defensor', clube: 'Charlotte FC', raridade: 'brilhante',
    curiosidade: 'Capitão dos Estados Unidos na Copa de 2026. O mais velho do elenco, com 38 anos.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 78, tipo: 'jogador', selecao: 'estados-unidos', nome: 'Folarin Balogun', camisa: 20, posicao: 'Atacante', clube: 'Monaco', raridade: 'comum',
    curiosidade: 'Fez 3 gols na Copa de 2026. Chegou à Copa com 27 jogos e 9 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos', 'wiki-jogos'],
  },

  // ----- Paraguai -----
  { numero: 79, tipo: 'bandeira', selecao: 'paraguai', nome: 'Paraguai', raridade: 'brilhante', fonte: ['wiki-grupo-d'] },
  {
    numero: 80, tipo: 'jogador', selecao: 'paraguai', nome: 'Gatito Fernández', camisa: 1, posicao: 'Goleiro', clube: 'Cerro Porteño', raridade: 'comum',
    curiosidade: 'O mais velho do elenco, com 38 anos.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 81, tipo: 'jogador', selecao: 'paraguai', nome: 'Júnior Alonso', camisa: 6, posicao: 'Defensor', clube: 'Atlético Mineiro', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 71 jogos e 3 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 82, tipo: 'jogador', selecao: 'paraguai', nome: 'Miguel Almirón', camisa: 10, posicao: 'Meio-campista', clube: 'Atlanta United FC', raridade: 'lendaria',
    curiosidade: 'Vestiu a camisa 10 do Paraguai. Maior goleador do elenco, com 10 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 83, tipo: 'jogador', selecao: 'paraguai', nome: 'Gustavo Gómez', camisa: 15, posicao: 'Defensor', clube: 'Palmeiras', raridade: 'brilhante',
    curiosidade: 'Capitão do Paraguai na Copa de 2026. É quem mais jogou pela seleção no elenco: 89 partidas.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 84, tipo: 'jogador', selecao: 'paraguai', nome: 'Julio Enciso', camisa: 19, posicao: 'Atacante', clube: 'Strasbourg', raridade: 'comum',
    curiosidade: 'Fez 1 gol na Copa de 2026. Chegou à Copa com 32 jogos e 4 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos', 'wiki-jogos'],
  },

  // ----- Austrália -----
  { numero: 85, tipo: 'bandeira', selecao: 'australia', nome: 'Austrália', raridade: 'brilhante', fonte: ['wiki-grupo-d'] },
  {
    numero: 86, tipo: 'jogador', selecao: 'australia', nome: 'Mathew Ryan', camisa: 1, posicao: 'Goleiro', clube: 'Levante', raridade: 'brilhante',
    curiosidade: 'Capitão da Austrália na Copa de 2026. É quem mais jogou pela seleção no elenco: 104 partidas.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 87, tipo: 'jogador', selecao: 'australia', nome: 'Connor Metcalfe', camisa: 8, posicao: 'Meio-campista', clube: 'FC St. Pauli', raridade: 'comum',
    curiosidade: 'Fez 1 gol na Copa de 2026. Chegou à Copa com 36 jogos e 1 gol pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos', 'wiki-jogos'],
  },
  {
    numero: 88, tipo: 'jogador', selecao: 'australia', nome: 'Ajdin Hrustic', camisa: 10, posicao: 'Atacante', clube: 'Heracles Almelo', raridade: 'lendaria',
    curiosidade: 'Vestiu a camisa 10 da Austrália. Chegou à Copa com 37 jogos e 4 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 89, tipo: 'jogador', selecao: 'australia', nome: 'Aziz Behich', camisa: 16, posicao: 'Defensor', clube: 'Melbourne City', raridade: 'comum',
    curiosidade: 'O mais velho do elenco, com 35 anos.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 90, tipo: 'jogador', selecao: 'australia', nome: 'Jackson Irvine', camisa: 22, posicao: 'Meio-campista', clube: 'FC St. Pauli', raridade: 'comum',
    curiosidade: 'Maior goleador do elenco, com 14 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },

  // ----- Turquia -----
  { numero: 91, tipo: 'bandeira', selecao: 'turquia', nome: 'Turquia', raridade: 'brilhante', fonte: ['wiki-grupo-d'] },
  {
    numero: 92, tipo: 'jogador', selecao: 'turquia', nome: 'Merih Demiral', camisa: 3, posicao: 'Defensor', clube: 'Al-Ahli', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 62 jogos e 6 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 93, tipo: 'jogador', selecao: 'turquia', nome: 'Kerem Aktürkoğlu', camisa: 7, posicao: 'Atacante', clube: 'Fenerbahçe', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 52 jogos e 15 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 94, tipo: 'jogador', selecao: 'turquia', nome: 'Hakan Çalhanoğlu', camisa: 10, posicao: 'Meio-campista', clube: 'Inter Milan', raridade: 'lendaria',
    curiosidade: 'Capitão e camisa 10 da Turquia. É quem mais jogou pela seleção no elenco: 105 partidas.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 95, tipo: 'jogador', selecao: 'turquia', nome: 'Kaan Ayhan', camisa: 22, posicao: 'Meio-campista', clube: 'Galatasaray', raridade: 'comum',
    curiosidade: 'Fez 1 gol na Copa de 2026. Chegou à Copa com 73 jogos e 5 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos', 'wiki-jogos'],
  },
  {
    numero: 96, tipo: 'jogador', selecao: 'turquia', nome: 'Uğurcan Çakır', camisa: 23, posicao: 'Goleiro', clube: 'Galatasaray', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 39 jogos pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },

  // ----- Alemanha -----
  { numero: 97, tipo: 'bandeira', selecao: 'alemanha', nome: 'Alemanha', raridade: 'brilhante', fonte: ['wiki-grupo-e'] },
  {
    numero: 98, tipo: 'jogador', selecao: 'alemanha', nome: 'Manuel Neuer', camisa: 1, posicao: 'Goleiro', clube: 'Bayern Munich', raridade: 'comum',
    curiosidade: 'É quem mais jogou pela seleção no elenco: 124 partidas.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 99, tipo: 'jogador', selecao: 'alemanha', nome: 'Antonio Rüdiger', camisa: 2, posicao: 'Defensor', clube: 'Real Madrid', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 82 jogos e 3 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 100, tipo: 'jogador', selecao: 'alemanha', nome: 'Joshua Kimmich', camisa: 6, posicao: 'Defensor', clube: 'Bayern Munich', raridade: 'brilhante',
    curiosidade: 'Capitão da Alemanha na Copa de 2026. Chegou à Copa com 110 jogos e 10 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 101, tipo: 'jogador', selecao: 'alemanha', nome: 'Kai Havertz', camisa: 7, posicao: 'Atacante', clube: 'Arsenal', raridade: 'comum',
    curiosidade: 'Fez 3 gols na Copa de 2026. Maior goleador do elenco, com 22 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos', 'wiki-jogos'],
  },
  {
    numero: 102, tipo: 'jogador', selecao: 'alemanha', nome: 'Jamal Musiala', camisa: 10, posicao: 'Meio-campista', clube: 'Bayern Munich', raridade: 'lendaria',
    curiosidade: 'Vestiu a camisa 10 da Alemanha. Fez 1 gol na Copa de 2026.',
    fonte: ['wiki-elencos', 'f365-elencos', 'wiki-jogos'],
  },

  // ----- Curaçao -----
  { numero: 103, tipo: 'bandeira', selecao: 'curacao', nome: 'Curaçao', raridade: 'brilhante', fonte: ['wiki-grupo-e'] },
  {
    numero: 104, tipo: 'jogador', selecao: 'curacao', nome: 'Eloy Room', camisa: 1, posicao: 'Goleiro', clube: 'Miami FC', raridade: 'comum',
    curiosidade: 'O mais velho do elenco, com 37 anos.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 105, tipo: 'jogador', selecao: 'curacao', nome: 'Juriën Gaari', camisa: 3, posicao: 'Defensor', clube: 'Abha', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 60 jogos e 1 gol pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 106, tipo: 'jogador', selecao: 'curacao', nome: 'Livano Comenencia', camisa: 8, posicao: 'Meio-campista', clube: 'Zürich', raridade: 'comum',
    curiosidade: 'Fez 1 gol na Copa de 2026. O mais novo do elenco, com 22 anos.',
    fonte: ['wiki-elencos', 'f365-elencos', 'wiki-jogos'],
  },
  {
    numero: 107, tipo: 'jogador', selecao: 'curacao', nome: 'Leandro Bacuna', camisa: 10, posicao: 'Meio-campista', clube: 'Iğdır', raridade: 'lendaria',
    curiosidade: 'Capitão e camisa 10 de Curaçao. É quem mais jogou pela seleção no elenco: 72 partidas.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 108, tipo: 'jogador', selecao: 'curacao', nome: 'Kenji Gorré', camisa: 14, posicao: 'Atacante', clube: 'Maccabi Haifa', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 38 jogos e 6 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },

  // ----- Costa do Marfim -----
  { numero: 109, tipo: 'bandeira', selecao: 'costa-do-marfim', nome: 'Costa do Marfim', raridade: 'brilhante', fonte: ['wiki-grupo-e'] },
  {
    numero: 110, tipo: 'jogador', selecao: 'costa-do-marfim', nome: 'Yahia Fofana', camisa: 1, posicao: 'Goleiro', clube: 'Çaykur Rizespor', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 35 jogos pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 111, tipo: 'jogador', selecao: 'costa-do-marfim', nome: 'Ghislain Konan', camisa: 3, posicao: 'Defensor', clube: 'Gil Vicente', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 54 jogos pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 112, tipo: 'jogador', selecao: 'costa-do-marfim', nome: 'Franck Kessié', camisa: 8, posicao: 'Meio-campista', clube: 'Al-Ahli', raridade: 'brilhante',
    curiosidade: 'Capitão da Costa do Marfim na Copa de 2026. Fez 1 gol na Copa de 2026.',
    fonte: ['wiki-elencos', 'f365-elencos', 'wiki-jogos'],
  },
  {
    numero: 113, tipo: 'jogador', selecao: 'costa-do-marfim', nome: 'Simon Adingra', camisa: 10, posicao: 'Atacante', clube: 'Monaco', raridade: 'lendaria',
    curiosidade: 'Vestiu a camisa 10 da Costa do Marfim. Chegou à Copa com 29 jogos e 5 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 114, tipo: 'jogador', selecao: 'costa-do-marfim', nome: 'Nicolas Pépé', camisa: 19, posicao: 'Atacante', clube: 'Villarreal', raridade: 'comum',
    curiosidade: 'Fez 2 gols na Copa de 2026. Chegou à Copa com 56 jogos e 12 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos', 'wiki-jogos'],
  },

  // ----- Equador -----
  { numero: 115, tipo: 'bandeira', selecao: 'equador', nome: 'Equador', raridade: 'brilhante', fonte: ['wiki-grupo-e'] },
  {
    numero: 116, tipo: 'jogador', selecao: 'equador', nome: 'Hernán Galíndez', camisa: 1, posicao: 'Goleiro', clube: 'Huracán', raridade: 'comum',
    curiosidade: 'O mais velho do elenco, com 39 anos.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 117, tipo: 'jogador', selecao: 'equador', nome: 'Kendry Páez', camisa: 10, posicao: 'Meio-campista', clube: 'River Plate', raridade: 'lendaria',
    curiosidade: 'Vestiu a camisa 10 do Equador. O mais novo do elenco, com 19 anos.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 118, tipo: 'jogador', selecao: 'equador', nome: 'Enner Valencia', camisa: 13, posicao: 'Atacante', clube: 'Pachuca', raridade: 'brilhante',
    curiosidade: 'Capitão do Equador na Copa de 2026. É quem mais jogou pela seleção no elenco: 105 partidas.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 119, tipo: 'jogador', selecao: 'equador', nome: 'Ángelo Preciado', camisa: 17, posicao: 'Defensor', clube: 'Atlético Mineiro', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 55 jogos pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 120, tipo: 'jogador', selecao: 'equador', nome: 'Gonzalo Plata', camisa: 19, posicao: 'Atacante', clube: 'Flamengo', raridade: 'comum',
    curiosidade: 'Fez 1 gol na Copa de 2026. Chegou à Copa com 50 jogos e 8 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos', 'wiki-jogos'],
  },

  // ----- Holanda -----
  { numero: 121, tipo: 'bandeira', selecao: 'holanda', nome: 'Holanda', raridade: 'brilhante', fonte: ['wiki-grupo-f'] },
  {
    numero: 122, tipo: 'jogador', selecao: 'holanda', nome: 'Bart Verbruggen', camisa: 1, posicao: 'Goleiro', clube: 'Brighton & Hove Albion', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 29 jogos pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 123, tipo: 'jogador', selecao: 'holanda', nome: 'Virgil van Dijk', camisa: 4, posicao: 'Defensor', clube: 'Liverpool', raridade: 'brilhante',
    curiosidade: 'Capitão da Holanda na Copa de 2026. Fez 1 gol na Copa de 2026.',
    fonte: ['wiki-elencos', 'f365-elencos', 'wiki-jogos'],
  },
  {
    numero: 124, tipo: 'jogador', selecao: 'holanda', nome: 'Memphis Depay', camisa: 10, posicao: 'Atacante', clube: 'Corinthians', raridade: 'lendaria',
    curiosidade: 'Vestiu a camisa 10 da Holanda. É quem mais jogou pela seleção no elenco: 109 partidas.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 125, tipo: 'jogador', selecao: 'holanda', nome: 'Cody Gakpo', camisa: 11, posicao: 'Atacante', clube: 'Liverpool', raridade: 'comum',
    curiosidade: 'Fez 3 gols na Copa de 2026. Chegou à Copa com 50 jogos e 21 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos', 'wiki-jogos'],
  },
  {
    numero: 126, tipo: 'jogador', selecao: 'holanda', nome: 'Frenkie de Jong', camisa: 21, posicao: 'Meio-campista', clube: 'Barcelona', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 66 jogos e 2 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },

  // ----- Japão -----
  { numero: 127, tipo: 'bandeira', selecao: 'japao', nome: 'Japão', raridade: 'brilhante', fonte: ['wiki-grupo-f'] },
  {
    numero: 128, tipo: 'jogador', selecao: 'japao', nome: 'Zion Suzuki', camisa: 1, posicao: 'Goleiro', clube: 'Parma', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 24 jogos pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 129, tipo: 'jogador', selecao: 'japao', nome: 'Kō Itakura', camisa: 4, posicao: 'Defensor', clube: 'Ajax', raridade: 'brilhante',
    curiosidade: 'Capitão do Japão na Copa de 2026. Chegou à Copa com 40 jogos e 2 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 130, tipo: 'jogador', selecao: 'japao', nome: 'Ritsu Dōan', camisa: 10, posicao: 'Meio-campista', clube: 'Eintracht Frankfurt', raridade: 'lendaria',
    curiosidade: 'Vestiu a camisa 10 do Japão. Chegou à Copa com 65 jogos e 11 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 131, tipo: 'jogador', selecao: 'japao', nome: 'Daichi Kamada', camisa: 15, posicao: 'Meio-campista', clube: 'Crystal Palace', raridade: 'comum',
    curiosidade: 'Fez 2 gols na Copa de 2026. Chegou à Copa com 49 jogos e 12 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos', 'wiki-jogos'],
  },
  {
    numero: 132, tipo: 'jogador', selecao: 'japao', nome: 'Ayase Ueda', camisa: 18, posicao: 'Atacante', clube: 'Feyenoord', raridade: 'comum',
    curiosidade: 'Fez 2 gols na Copa de 2026. Maior goleador do elenco, com 16 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos', 'wiki-jogos'],
  },

  // ----- Suécia -----
  { numero: 133, tipo: 'bandeira', selecao: 'suecia', nome: 'Suécia', raridade: 'brilhante', fonte: ['wiki-grupo-f'] },
  {
    numero: 134, tipo: 'jogador', selecao: 'suecia', nome: 'Victor Lindelöf', camisa: 3, posicao: 'Defensor', clube: 'Aston Villa', raridade: 'brilhante',
    curiosidade: 'Capitão da Suécia na Copa de 2026. É quem mais jogou pela seleção no elenco: 76 partidas.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 135, tipo: 'jogador', selecao: 'suecia', nome: 'Alexander Isak', camisa: 9, posicao: 'Atacante', clube: 'Liverpool', raridade: 'comum',
    curiosidade: 'Fez 1 gol na Copa de 2026. Chegou à Copa com 58 jogos e 17 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos', 'wiki-jogos'],
  },
  {
    numero: 136, tipo: 'jogador', selecao: 'suecia', nome: 'Benjamin Nygren', camisa: 10, posicao: 'Meio-campista', clube: 'Celtic', raridade: 'lendaria',
    curiosidade: 'Vestiu a camisa 10 da Suécia. Chegou à Copa com 11 jogos e 3 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 137, tipo: 'jogador', selecao: 'suecia', nome: 'Anthony Elanga', camisa: 11, posicao: 'Atacante', clube: 'Newcastle United', raridade: 'comum',
    curiosidade: 'Fez 2 gols na Copa de 2026. Chegou à Copa com 30 jogos e 6 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos', 'wiki-jogos'],
  },
  {
    numero: 138, tipo: 'jogador', selecao: 'suecia', nome: 'Kristoffer Nordfeldt', camisa: 23, posicao: 'Goleiro', clube: 'AIK', raridade: 'comum',
    curiosidade: 'O mais velho do elenco, com 36 anos.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },

  // ----- Tunísia -----
  { numero: 139, tipo: 'bandeira', selecao: 'tunisia', nome: 'Tunísia', raridade: 'brilhante', fonte: ['wiki-grupo-f'] },
  {
    numero: 140, tipo: 'jogador', selecao: 'tunisia', nome: 'Montassar Talbi', camisa: 3, posicao: 'Defensor', clube: 'Lorient', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 64 jogos e 4 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 141, tipo: 'jogador', selecao: 'tunisia', nome: 'Hazem Mastouri', camisa: 9, posicao: 'Atacante', clube: 'Dynamo Makhachkala', raridade: 'comum',
    curiosidade: 'Fez 1 gol na Copa de 2026. Chegou à Copa com 19 jogos e 4 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos', 'wiki-jogos'],
  },
  {
    numero: 142, tipo: 'jogador', selecao: 'tunisia', nome: 'Hannibal Mejbri', camisa: 10, posicao: 'Meio-campista', clube: 'Burnley', raridade: 'lendaria',
    curiosidade: 'Vestiu a camisa 10 da Tunísia. Chegou à Copa com 45 jogos e 1 gol pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 143, tipo: 'jogador', selecao: 'tunisia', nome: 'Aymen Dahmen', camisa: 16, posicao: 'Goleiro', clube: 'CS Sfaxien', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 37 jogos pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 144, tipo: 'jogador', selecao: 'tunisia', nome: 'Ellyes Skhiri', camisa: 17, posicao: 'Meio-campista', clube: 'Eintracht Frankfurt', raridade: 'brilhante',
    curiosidade: 'Capitão da Tunísia na Copa de 2026. É quem mais jogou pela seleção no elenco: 83 partidas.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },

  // ----- Bélgica -----
  { numero: 145, tipo: 'bandeira', selecao: 'belgica', nome: 'Bélgica', raridade: 'brilhante', fonte: ['wiki-grupo-g'] },
  {
    numero: 146, tipo: 'jogador', selecao: 'belgica', nome: 'Thibaut Courtois', camisa: 1, posicao: 'Goleiro', clube: 'Real Madrid', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 109 jogos pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 147, tipo: 'jogador', selecao: 'belgica', nome: 'Youri Tielemans', camisa: 8, posicao: 'Meio-campista', clube: 'Aston Villa', raridade: 'brilhante',
    curiosidade: 'Capitão da Bélgica na Copa de 2026. Fez 2 gols na Copa de 2026.',
    fonte: ['wiki-elencos', 'f365-elencos', 'wiki-jogos'],
  },
  {
    numero: 148, tipo: 'jogador', selecao: 'belgica', nome: 'Romelu Lukaku', camisa: 9, posicao: 'Atacante', clube: 'Napoli', raridade: 'comum',
    curiosidade: 'Fez 3 gols na Copa de 2026. Maior goleador do elenco, com 90 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos', 'wiki-jogos'],
  },
  {
    numero: 149, tipo: 'jogador', selecao: 'belgica', nome: 'Leandro Trossard', camisa: 10, posicao: 'Atacante', clube: 'Arsenal', raridade: 'lendaria',
    curiosidade: 'Vestiu a camisa 10 da Bélgica. Fez 2 gols na Copa de 2026.',
    fonte: ['wiki-elencos', 'f365-elencos', 'wiki-jogos'],
  },
  {
    numero: 150, tipo: 'jogador', selecao: 'belgica', nome: 'Thomas Meunier', camisa: 15, posicao: 'Defensor', clube: 'Lille', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 80 jogos e 10 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },

  // ----- Egito -----
  { numero: 151, tipo: 'bandeira', selecao: 'egito', nome: 'Egito', raridade: 'brilhante', fonte: ['wiki-grupo-g'] },
  {
    numero: 152, tipo: 'jogador', selecao: 'egito', nome: 'Mohamed El Shenawy', camisa: 1, posicao: 'Goleiro', clube: 'Al Ahly', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 76 jogos pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 153, tipo: 'jogador', selecao: 'egito', nome: 'Ramy Rabia', camisa: 5, posicao: 'Defensor', clube: 'Al Ain', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 44 jogos e 5 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 154, tipo: 'jogador', selecao: 'egito', nome: 'Trézéguet', camisa: 7, posicao: 'Atacante', clube: 'Al Ahly', raridade: 'comum',
    curiosidade: 'Fez 1 gol na Copa de 2026. Chegou à Copa com 96 jogos e 23 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos', 'wiki-jogos'],
  },
  {
    numero: 155, tipo: 'jogador', selecao: 'egito', nome: 'Emam Ashour', camisa: 8, posicao: 'Meio-campista', clube: 'Al Ahly', raridade: 'comum',
    curiosidade: 'Fez 2 gols na Copa de 2026. Chegou à Copa com 29 jogos pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos', 'wiki-jogos'],
  },
  {
    numero: 156, tipo: 'jogador', selecao: 'egito', nome: 'Mohamed Salah', camisa: 10, posicao: 'Atacante', clube: 'Liverpool', raridade: 'lendaria',
    curiosidade: 'Capitão e camisa 10 do Egito. Fez 1 gol na Copa de 2026.',
    fonte: ['wiki-elencos', 'f365-elencos', 'wiki-jogos'],
  },

  // ----- Irã -----
  { numero: 157, tipo: 'bandeira', selecao: 'ira', nome: 'Irã', raridade: 'brilhante', fonte: ['wiki-grupo-g'] },
  {
    numero: 158, tipo: 'jogador', selecao: 'ira', nome: 'Alireza Beiranvand', camisa: 1, posicao: 'Goleiro', clube: 'Tractor', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 86 jogos pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 159, tipo: 'jogador', selecao: 'ira', nome: 'Ehsan Hajsafi', camisa: 3, posicao: 'Defensor', clube: 'Sepahan', raridade: 'brilhante',
    curiosidade: 'Capitão do Irã na Copa de 2026. É quem mais jogou pela seleção no elenco: 146 partidas.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 160, tipo: 'jogador', selecao: 'ira', nome: 'Alireza Jahanbakhsh', camisa: 7, posicao: 'Meio-campista', clube: 'Dender EH', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 99 jogos e 17 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 161, tipo: 'jogador', selecao: 'ira', nome: 'Mehdi Ghayedi', camisa: 10, posicao: 'Atacante', clube: 'Al Nasr', raridade: 'lendaria',
    curiosidade: 'Vestiu a camisa 10 do Irã. Chegou à Copa com 30 jogos e 10 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 162, tipo: 'jogador', selecao: 'ira', nome: 'Ramin Rezaeian', camisa: 23, posicao: 'Defensor', clube: 'Foolad', raridade: 'comum',
    curiosidade: 'Fez 2 gols na Copa de 2026. Chegou à Copa com 74 jogos e 8 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos', 'wiki-jogos'],
  },

  // ----- Nova Zelândia -----
  { numero: 163, tipo: 'bandeira', selecao: 'nova-zelandia', nome: 'Nova Zelândia', raridade: 'brilhante', fonte: ['wiki-grupo-g'] },
  {
    numero: 164, tipo: 'jogador', selecao: 'nova-zelandia', nome: 'Max Crocombe', camisa: 1, posicao: 'Goleiro', clube: 'Millwall', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 24 jogos pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 165, tipo: 'jogador', selecao: 'nova-zelandia', nome: 'Michael Boxall', camisa: 5, posicao: 'Defensor', clube: 'Minnesota United FC', raridade: 'comum',
    curiosidade: 'O mais velho do elenco, com 37 anos.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 166, tipo: 'jogador', selecao: 'nova-zelandia', nome: 'Chris Wood', camisa: 9, posicao: 'Atacante', clube: 'Nottingham Forest', raridade: 'brilhante',
    curiosidade: 'Capitão da Nova Zelândia na Copa de 2026. É quem mais jogou pela seleção no elenco: 90 partidas.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 167, tipo: 'jogador', selecao: 'nova-zelandia', nome: 'Sarpreet Singh', camisa: 10, posicao: 'Meio-campista', clube: 'Wellington Phoenix', raridade: 'lendaria',
    curiosidade: 'Vestiu a camisa 10 da Nova Zelândia. Chegou à Copa com 28 jogos e 3 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 168, tipo: 'jogador', selecao: 'nova-zelandia', nome: 'Elijah Just', camisa: 11, posicao: 'Meio-campista', clube: 'Motherwell', raridade: 'comum',
    curiosidade: 'Fez 3 gols na Copa de 2026. Chegou à Copa com 44 jogos e 9 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos', 'wiki-jogos'],
  },

  // ----- Espanha -----
  { numero: 169, tipo: 'bandeira', selecao: 'espanha', nome: 'Espanha', raridade: 'brilhante', fonte: ['wiki-grupo-h'] },
  {
    numero: 170, tipo: 'jogador', selecao: 'espanha', nome: 'Dani Olmo', camisa: 10, posicao: 'Atacante', clube: 'Barcelona', raridade: 'lendaria',
    curiosidade: 'Vestiu a camisa 10 da Espanha. Chegou à Copa com 50 jogos e 12 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 171, tipo: 'jogador', selecao: 'espanha', nome: 'Aymeric Laporte', camisa: 14, posicao: 'Defensor', clube: 'Athletic Bilbao', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 46 jogos e 2 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 172, tipo: 'jogador', selecao: 'espanha', nome: 'Rodri', camisa: 16, posicao: 'Meio-campista', clube: 'Manchester City', raridade: 'brilhante',
    curiosidade: 'Capitão da Espanha na Copa de 2026. É quem mais jogou pela seleção no elenco: 62 partidas.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 173, tipo: 'jogador', selecao: 'espanha', nome: 'Mikel Oyarzabal', camisa: 21, posicao: 'Atacante', clube: 'Real Sociedad', raridade: 'comum',
    curiosidade: 'Fez 5 gols na Copa de 2026. Maior goleador do elenco, com 25 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos', 'wiki-jogos'],
  },
  {
    numero: 174, tipo: 'jogador', selecao: 'espanha', nome: 'Unai Simón', camisa: 23, posicao: 'Goleiro', clube: 'Athletic Bilbao', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 58 jogos pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },

  // ----- Cabo Verde -----
  { numero: 175, tipo: 'bandeira', selecao: 'cabo-verde', nome: 'Cabo Verde', raridade: 'brilhante', fonte: ['wiki-grupo-h'] },
  {
    numero: 176, tipo: 'jogador', selecao: 'cabo-verde', nome: 'Vozinha', camisa: 1, posicao: 'Goleiro', clube: 'Chaves', raridade: 'comum',
    curiosidade: 'O mais velho do elenco, com 40 anos.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 177, tipo: 'jogador', selecao: 'cabo-verde', nome: 'Stopira', camisa: 2, posicao: 'Defensor', clube: 'Torreense', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 61 jogos e 4 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 178, tipo: 'jogador', selecao: 'cabo-verde', nome: 'Jamiro Monteiro', camisa: 10, posicao: 'Meio-campista', clube: 'PEC Zwolle', raridade: 'lendaria',
    curiosidade: 'Vestiu a camisa 10 de Cabo Verde. Chegou à Copa com 55 jogos e 5 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 179, tipo: 'jogador', selecao: 'cabo-verde', nome: 'Deroy Duarte', camisa: 14, posicao: 'Meio-campista', clube: 'Ludogorets Razgrad', raridade: 'comum',
    curiosidade: 'Fez 1 gol na Copa de 2026. Chegou à Copa com 33 jogos pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos', 'wiki-jogos'],
  },
  {
    numero: 180, tipo: 'jogador', selecao: 'cabo-verde', nome: 'Ryan Mendes', camisa: 20, posicao: 'Atacante', clube: 'Iğdır', raridade: 'brilhante',
    curiosidade: 'Capitão de Cabo Verde na Copa de 2026. É quem mais jogou pela seleção no elenco: 96 partidas.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },

  // ----- Arábia Saudita -----
  { numero: 181, tipo: 'bandeira', selecao: 'arabia-saudita', nome: 'Arábia Saudita', raridade: 'brilhante', fonte: ['wiki-grupo-h'] },
  {
    numero: 182, tipo: 'jogador', selecao: 'arabia-saudita', nome: 'Abdulelah Al-Amri', camisa: 4, posicao: 'Defensor', clube: 'Al-Nassr', raridade: 'comum',
    curiosidade: 'Fez 1 gol na Copa de 2026. Chegou à Copa com 44 jogos e 1 gol pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos', 'wiki-jogos'],
  },
  {
    numero: 183, tipo: 'jogador', selecao: 'arabia-saudita', nome: 'Firas Al-Buraikan', camisa: 9, posicao: 'Atacante', clube: 'Al-Ahli', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 72 jogos e 16 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 184, tipo: 'jogador', selecao: 'arabia-saudita', nome: 'Salem Al-Dawsari', camisa: 10, posicao: 'Atacante', clube: 'Al-Hilal', raridade: 'lendaria',
    curiosidade: 'Capitão e camisa 10 da Arábia Saudita. É quem mais jogou pela seleção no elenco: 111 partidas.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 185, tipo: 'jogador', selecao: 'arabia-saudita', nome: 'Mohammed Al-Owais', camisa: 21, posicao: 'Goleiro', clube: 'Al-Ula', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 65 jogos pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 186, tipo: 'jogador', selecao: 'arabia-saudita', nome: 'Mohamed Kanno', camisa: 23, posicao: 'Meio-campista', clube: 'Al-Hilal', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 79 jogos e 8 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },

  // ----- Uruguai -----
  { numero: 187, tipo: 'bandeira', selecao: 'uruguai', nome: 'Uruguai', raridade: 'brilhante', fonte: ['wiki-grupo-h'] },
  {
    numero: 188, tipo: 'jogador', selecao: 'uruguai', nome: 'José María Giménez', camisa: 2, posicao: 'Defensor', clube: 'Atlético Madrid', raridade: 'brilhante',
    curiosidade: 'Capitão do Uruguai na Copa de 2026. Chegou à Copa com 99 jogos e 8 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 189, tipo: 'jogador', selecao: 'uruguai', nome: 'Giorgian de Arrascaeta', camisa: 10, posicao: 'Meio-campista', clube: 'Flamengo', raridade: 'lendaria',
    curiosidade: 'Vestiu a camisa 10 do Uruguai. Maior goleador do elenco, com 13 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 190, tipo: 'jogador', selecao: 'uruguai', nome: 'Facundo Pellistri', camisa: 11, posicao: 'Atacante', clube: 'Panathinaikos', raridade: 'comum',
    curiosidade: 'O mais novo do elenco, com 24 anos.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 191, tipo: 'jogador', selecao: 'uruguai', nome: 'Maximiliano Araújo', camisa: 20, posicao: 'Meio-campista', clube: 'Sporting CP', raridade: 'comum',
    curiosidade: 'Fez 2 gols na Copa de 2026. Chegou à Copa com 28 jogos e 3 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos', 'wiki-jogos'],
  },
  {
    numero: 192, tipo: 'jogador', selecao: 'uruguai', nome: 'Fernando Muslera', camisa: 23, posicao: 'Goleiro', clube: 'Estudiantes', raridade: 'comum',
    curiosidade: 'É quem mais jogou pela seleção no elenco: 134 partidas.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },

  // ----- França -----
  { numero: 193, tipo: 'bandeira', selecao: 'franca', nome: 'França', raridade: 'brilhante', fonte: ['wiki-grupo-i'] },
  {
    numero: 194, tipo: 'jogador', selecao: 'franca', nome: 'Lucas Digne', camisa: 3, posicao: 'Defensor', clube: 'Aston Villa', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 58 jogos pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 195, tipo: 'jogador', selecao: 'franca', nome: 'Ousmane Dembélé', camisa: 7, posicao: 'Atacante', clube: 'Paris Saint-Germain', raridade: 'comum',
    curiosidade: 'Fez 6 gols na Copa de 2026. Chegou à Copa com 59 jogos e 7 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos', 'wiki-jogos'],
  },
  {
    numero: 196, tipo: 'jogador', selecao: 'franca', nome: 'Kylian Mbappé', camisa: 10, posicao: 'Atacante', clube: 'Real Madrid', raridade: 'lendaria',
    curiosidade: 'Capitão e camisa 10 da França. Fez 10 gols na Copa de 2026.',
    fonte: ['wiki-elencos', 'f365-elencos', 'wiki-jogos'],
  },
  {
    numero: 197, tipo: 'jogador', selecao: 'franca', nome: 'N\'Golo Kanté', camisa: 13, posicao: 'Meio-campista', clube: 'Fenerbahçe', raridade: 'comum',
    curiosidade: 'O mais velho do elenco, com 35 anos.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 198, tipo: 'jogador', selecao: 'franca', nome: 'Mike Maignan', camisa: 16, posicao: 'Goleiro', clube: 'AC Milan', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 40 jogos pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },

  // ----- Senegal -----
  { numero: 199, tipo: 'bandeira', selecao: 'senegal', nome: 'Senegal', raridade: 'brilhante', fonte: ['wiki-grupo-i'] },
  {
    numero: 200, tipo: 'jogador', selecao: 'senegal', nome: 'Kalidou Koulibaly', camisa: 3, posicao: 'Defensor', clube: 'Al-Hilal', raridade: 'brilhante',
    curiosidade: 'Capitão do Senegal na Copa de 2026. Chegou à Copa com 104 jogos e 2 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 201, tipo: 'jogador', selecao: 'senegal', nome: 'Idrissa Gueye', camisa: 5, posicao: 'Meio-campista', clube: 'Everton', raridade: 'comum',
    curiosidade: 'É quem mais jogou pela seleção no elenco: 132 partidas.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 202, tipo: 'jogador', selecao: 'senegal', nome: 'Sadio Mané', camisa: 10, posicao: 'Atacante', clube: 'Al-Nassr', raridade: 'lendaria',
    curiosidade: 'Vestiu a camisa 10 do Senegal. Maior goleador do elenco, com 55 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 203, tipo: 'jogador', selecao: 'senegal', nome: 'Édouard Mendy', camisa: 16, posicao: 'Goleiro', clube: 'Al-Ahli', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 58 jogos pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 204, tipo: 'jogador', selecao: 'senegal', nome: 'Ismaïla Sarr', camisa: 18, posicao: 'Atacante', clube: 'Crystal Palace', raridade: 'comum',
    curiosidade: 'Fez 4 gols na Copa de 2026. Chegou à Copa com 84 jogos e 19 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos', 'wiki-jogos'],
  },

  // ----- Iraque -----
  { numero: 205, tipo: 'bandeira', selecao: 'iraque', nome: 'Iraque', raridade: 'brilhante', fonte: ['wiki-grupo-i'] },
  {
    numero: 206, tipo: 'jogador', selecao: 'iraque', nome: 'Rebin Sulaka', camisa: 2, posicao: 'Defensor', clube: 'Port', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 56 jogos e 1 gol pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 207, tipo: 'jogador', selecao: 'iraque', nome: 'Ibrahim Bayesh', camisa: 8, posicao: 'Meio-campista', clube: 'Al Dhafra', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 76 jogos e 8 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 208, tipo: 'jogador', selecao: 'iraque', nome: 'Mohanad Ali', camisa: 10, posicao: 'Atacante', clube: 'Dibba', raridade: 'lendaria',
    curiosidade: 'Vestiu a camisa 10 do Iraque. Chegou à Copa com 72 jogos e 27 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 209, tipo: 'jogador', selecao: 'iraque', nome: 'Jalal Hassan', camisa: 12, posicao: 'Goleiro', clube: 'Al-Zawraa', raridade: 'brilhante',
    curiosidade: 'Capitão do Iraque na Copa de 2026. É quem mais jogou pela seleção no elenco: 102 partidas.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 210, tipo: 'jogador', selecao: 'iraque', nome: 'Aymen Hussein', camisa: 18, posicao: 'Atacante', clube: 'Al-Karma', raridade: 'comum',
    curiosidade: 'Fez 1 gol na Copa de 2026. Maior goleador do elenco, com 33 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos', 'wiki-jogos'],
  },

  // ----- Noruega -----
  { numero: 211, tipo: 'bandeira', selecao: 'noruega', nome: 'Noruega', raridade: 'brilhante', fonte: ['wiki-grupo-i'] },
  {
    numero: 212, tipo: 'jogador', selecao: 'noruega', nome: 'Ørjan Nyland', camisa: 1, posicao: 'Goleiro', clube: 'Sevilla', raridade: 'comum',
    curiosidade: 'O mais velho do elenco, com 35 anos.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 213, tipo: 'jogador', selecao: 'noruega', nome: 'Kristoffer Ajer', camisa: 3, posicao: 'Defensor', clube: 'Brentford', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 52 jogos e 2 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 214, tipo: 'jogador', selecao: 'noruega', nome: 'Alexander Sørloth', camisa: 7, posicao: 'Atacante', clube: 'Atlético Madrid', raridade: 'comum',
    curiosidade: 'É quem mais jogou pela seleção no elenco: 72 partidas.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 215, tipo: 'jogador', selecao: 'noruega', nome: 'Erling Haaland', camisa: 9, posicao: 'Atacante', clube: 'Manchester City', raridade: 'comum',
    curiosidade: 'Fez 7 gols na Copa de 2026. Maior goleador do elenco, com 55 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos', 'wiki-jogos'],
  },
  {
    numero: 216, tipo: 'jogador', selecao: 'noruega', nome: 'Martin Ødegaard', camisa: 10, posicao: 'Meio-campista', clube: 'Arsenal', raridade: 'lendaria',
    curiosidade: 'Capitão e camisa 10 da Noruega. Chegou à Copa com 68 jogos e 5 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },

  // ----- Argentina -----
  { numero: 217, tipo: 'bandeira', selecao: 'argentina', nome: 'Argentina', raridade: 'brilhante', fonte: ['wiki-grupo-j'] },
  {
    numero: 218, tipo: 'jogador', selecao: 'argentina', nome: 'Leandro Paredes', camisa: 5, posicao: 'Meio-campista', clube: 'Boca Juniors', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 77 jogos e 5 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 219, tipo: 'jogador', selecao: 'argentina', nome: 'Rodrigo De Paul', camisa: 7, posicao: 'Meio-campista', clube: 'Inter Miami CF', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 87 jogos e 2 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 220, tipo: 'jogador', selecao: 'argentina', nome: 'Lionel Messi', camisa: 10, posicao: 'Atacante', clube: 'Inter Miami CF', raridade: 'lendaria',
    curiosidade: 'Capitão e camisa 10 da Argentina. Fez 8 gols na Copa de 2026.',
    fonte: ['wiki-elencos', 'f365-elencos', 'wiki-jogos'],
  },
  {
    numero: 221, tipo: 'jogador', selecao: 'argentina', nome: 'Nicolás Otamendi', camisa: 19, posicao: 'Defensor', clube: 'Benfica', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 132 jogos e 8 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 222, tipo: 'jogador', selecao: 'argentina', nome: 'Emiliano Martínez', camisa: 23, posicao: 'Goleiro', clube: 'Aston Villa', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 59 jogos pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },

  // ----- Argélia -----
  { numero: 223, tipo: 'bandeira', selecao: 'argelia', nome: 'Argélia', raridade: 'brilhante', fonte: ['wiki-grupo-j'] },
  {
    numero: 224, tipo: 'jogador', selecao: 'argelia', nome: 'Aïssa Mandi', camisa: 2, posicao: 'Defensor', clube: 'Lille', raridade: 'comum',
    curiosidade: 'É quem mais jogou pela seleção no elenco: 119 partidas.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 225, tipo: 'jogador', selecao: 'argelia', nome: 'Riyad Mahrez', camisa: 7, posicao: 'Atacante', clube: 'Al-Ahli', raridade: 'brilhante',
    curiosidade: 'Capitão da Argélia na Copa de 2026. Fez 2 gols na Copa de 2026.',
    fonte: ['wiki-elencos', 'f365-elencos', 'wiki-jogos'],
  },
  {
    numero: 226, tipo: 'jogador', selecao: 'argelia', nome: 'Farès Chaïbi', camisa: 10, posicao: 'Meio-campista', clube: 'Eintracht Frankfurt', raridade: 'lendaria',
    curiosidade: 'Vestiu a camisa 10 da Argélia. Chegou à Copa com 31 jogos e 3 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 227, tipo: 'jogador', selecao: 'argelia', nome: 'Ramy Bensebaini', camisa: 21, posicao: 'Defensor', clube: 'Borussia Dortmund', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 82 jogos e 9 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 228, tipo: 'jogador', selecao: 'argelia', nome: 'Luca Zidane', camisa: 23, posicao: 'Goleiro', clube: 'Granada', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 7 jogos pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },

  // ----- Áustria -----
  { numero: 229, tipo: 'bandeira', selecao: 'austria', nome: 'Áustria', raridade: 'brilhante', fonte: ['wiki-grupo-j'] },
  {
    numero: 230, tipo: 'jogador', selecao: 'austria', nome: 'Alexander Schlager', camisa: 1, posicao: 'Goleiro', clube: 'Red Bull Salzburg', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 26 jogos pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 231, tipo: 'jogador', selecao: 'austria', nome: 'Marko Arnautović', camisa: 7, posicao: 'Atacante', clube: 'Red Star Belgrade', raridade: 'comum',
    curiosidade: 'Fez 2 gols na Copa de 2026. É quem mais jogou pela seleção no elenco: 133 partidas.',
    fonte: ['wiki-elencos', 'f365-elencos', 'wiki-jogos'],
  },
  {
    numero: 232, tipo: 'jogador', selecao: 'austria', nome: 'David Alaba', camisa: 8, posicao: 'Defensor', clube: 'Real Madrid', raridade: 'brilhante',
    curiosidade: 'Capitão da Áustria na Copa de 2026. Chegou à Copa com 113 jogos e 15 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 233, tipo: 'jogador', selecao: 'austria', nome: 'Marcel Sabitzer', camisa: 9, posicao: 'Meio-campista', clube: 'Borussia Dortmund', raridade: 'comum',
    curiosidade: 'Fez 1 gol na Copa de 2026. Chegou à Copa com 98 jogos e 26 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos', 'wiki-jogos'],
  },
  {
    numero: 234, tipo: 'jogador', selecao: 'austria', nome: 'Florian Grillitsch', camisa: 10, posicao: 'Meio-campista', clube: 'Braga', raridade: 'lendaria',
    curiosidade: 'Vestiu a camisa 10 da Áustria. Chegou à Copa com 58 jogos e 1 gol pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },

  // ----- Jordânia -----
  { numero: 235, tipo: 'bandeira', selecao: 'jordania', nome: 'Jordânia', raridade: 'brilhante', fonte: ['wiki-grupo-j'] },
  {
    numero: 236, tipo: 'jogador', selecao: 'jordania', nome: 'Yazeed Abulaila', camisa: 1, posicao: 'Goleiro', clube: 'Al-Hussein', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 76 jogos pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 237, tipo: 'jogador', selecao: 'jordania', nome: 'Musa Al-Taamari', camisa: 10, posicao: 'Atacante', clube: 'Rennes', raridade: 'lendaria',
    curiosidade: 'Vestiu a camisa 10 da Jordânia. Fez 1 gol na Copa de 2026.',
    fonte: ['wiki-elencos', 'f365-elencos', 'wiki-jogos'],
  },
  {
    numero: 238, tipo: 'jogador', selecao: 'jordania', nome: 'Mahmoud Al-Mardi', camisa: 13, posicao: 'Atacante', clube: 'Al-Hussein', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 89 jogos e 9 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 239, tipo: 'jogador', selecao: 'jordania', nome: 'Rajaei Ayed', camisa: 14, posicao: 'Meio-campista', clube: 'Al-Hussein', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 72 jogos pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 240, tipo: 'jogador', selecao: 'jordania', nome: 'Ihsan Haddad', camisa: 23, posicao: 'Defensor', clube: 'Al-Hussein', raridade: 'brilhante',
    curiosidade: 'Capitão da Jordânia na Copa de 2026. É quem mais jogou pela seleção no elenco: 92 partidas.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },

  // ----- Portugal -----
  { numero: 241, tipo: 'bandeira', selecao: 'portugal', nome: 'Portugal', raridade: 'brilhante', fonte: ['wiki-grupo-k'] },
  {
    numero: 242, tipo: 'jogador', selecao: 'portugal', nome: 'Diogo Costa', camisa: 1, posicao: 'Goleiro', clube: 'Porto', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 43 jogos pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 243, tipo: 'jogador', selecao: 'portugal', nome: 'Rúben Dias', camisa: 3, posicao: 'Defensor', clube: 'Manchester City', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 76 jogos e 3 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 244, tipo: 'jogador', selecao: 'portugal', nome: 'Cristiano Ronaldo', camisa: 7, posicao: 'Atacante', clube: 'Al-Nassr', raridade: 'brilhante',
    curiosidade: 'Capitão de Portugal na Copa de 2026. Fez 3 gols na Copa de 2026.',
    fonte: ['wiki-elencos', 'f365-elencos', 'wiki-jogos'],
  },
  {
    numero: 245, tipo: 'jogador', selecao: 'portugal', nome: 'Bruno Fernandes', camisa: 8, posicao: 'Meio-campista', clube: 'Manchester United', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 89 jogos e 29 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 246, tipo: 'jogador', selecao: 'portugal', nome: 'Bernardo Silva', camisa: 10, posicao: 'Meio-campista', clube: 'Manchester City', raridade: 'lendaria',
    curiosidade: 'Vestiu a camisa 10 de Portugal. Chegou à Copa com 109 jogos e 14 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },

  // ----- RD Congo -----
  { numero: 247, tipo: 'bandeira', selecao: 'rd-congo', nome: 'RD Congo', raridade: 'brilhante', fonte: ['wiki-grupo-k'] },
  {
    numero: 248, tipo: 'jogador', selecao: 'rd-congo', nome: 'Lionel Mpasi', camisa: 1, posicao: 'Goleiro', clube: 'Le Havre', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 29 jogos pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 249, tipo: 'jogador', selecao: 'rd-congo', nome: 'Théo Bongonda', camisa: 10, posicao: 'Meio-campista', clube: 'Spartak Moscow', raridade: 'lendaria',
    curiosidade: 'Vestiu a camisa 10 da RD Congo. Chegou à Copa com 38 jogos e 7 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 250, tipo: 'jogador', selecao: 'rd-congo', nome: 'Cédric Bakambu', camisa: 17, posicao: 'Atacante', clube: 'Real Betis', raridade: 'comum',
    curiosidade: 'Maior goleador do elenco, com 21 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 251, tipo: 'jogador', selecao: 'rd-congo', nome: 'Yoane Wissa', camisa: 20, posicao: 'Atacante', clube: 'Newcastle United', raridade: 'comum',
    curiosidade: 'Fez 3 gols na Copa de 2026. Chegou à Copa com 38 jogos e 9 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos', 'wiki-jogos'],
  },
  {
    numero: 252, tipo: 'jogador', selecao: 'rd-congo', nome: 'Chancel Mbemba', camisa: 22, posicao: 'Defensor', clube: 'Lille', raridade: 'brilhante',
    curiosidade: 'Capitão da RD Congo na Copa de 2026. É quem mais jogou pela seleção no elenco: 109 partidas.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },

  // ----- Uzbequistão -----
  { numero: 253, tipo: 'bandeira', selecao: 'uzbequistao', nome: 'Uzbequistão', raridade: 'brilhante', fonte: ['wiki-grupo-k'] },
  {
    numero: 254, tipo: 'jogador', selecao: 'uzbequistao', nome: 'Utkir Yusupov', camisa: 1, posicao: 'Goleiro', clube: 'Navbahor Namangan', raridade: 'comum',
    curiosidade: 'O mais velho do elenco, com 35 anos.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 255, tipo: 'jogador', selecao: 'uzbequistao', nome: 'Rustam Ashurmatov', camisa: 5, posicao: 'Defensor', clube: 'Esteghlal', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 49 jogos e 1 gol pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 256, tipo: 'jogador', selecao: 'uzbequistao', nome: 'Otabek Shukurov', camisa: 7, posicao: 'Meio-campista', clube: 'Baniyas', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 84 jogos e 9 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 257, tipo: 'jogador', selecao: 'uzbequistao', nome: 'Ruslanbek Jiyanov', camisa: 10, posicao: 'Meio-campista', clube: 'Navbahor Namangan', raridade: 'lendaria',
    curiosidade: 'Entrou no elenco em 15 de junho, no lugar de Jaloliddin Masharipov, machucado, e ficou com a camisa 10.',
    fonte: ['wiki-elencos'],
  },
  {
    numero: 258, tipo: 'jogador', selecao: 'uzbequistao', nome: 'Eldor Shomurodov', camisa: 14, posicao: 'Atacante', clube: 'İstanbul Başakşehir', raridade: 'brilhante',
    curiosidade: 'Capitão do Uzbequistão na Copa de 2026. Fez 1 gol na Copa de 2026.',
    fonte: ['wiki-elencos', 'f365-elencos', 'wiki-jogos'],
  },

  // ----- Colômbia -----
  { numero: 259, tipo: 'bandeira', selecao: 'colombia', nome: 'Colômbia', raridade: 'brilhante', fonte: ['wiki-grupo-k'] },
  {
    numero: 260, tipo: 'jogador', selecao: 'colombia', nome: 'David Ospina', camisa: 1, posicao: 'Goleiro', clube: 'Atlético Nacional', raridade: 'comum',
    curiosidade: 'É quem mais jogou pela seleção no elenco: 130 partidas.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 261, tipo: 'jogador', selecao: 'colombia', nome: 'Daniel Muñoz', camisa: 2, posicao: 'Defensor', clube: 'Crystal Palace', raridade: 'comum',
    curiosidade: 'Fez 2 gols na Copa de 2026. Chegou à Copa com 46 jogos e 3 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos', 'wiki-jogos'],
  },
  {
    numero: 262, tipo: 'jogador', selecao: 'colombia', nome: 'Luis Díaz', camisa: 7, posicao: 'Atacante', clube: 'Bayern Munich', raridade: 'comum',
    curiosidade: 'Fez 1 gol na Copa de 2026. Chegou à Copa com 74 jogos e 22 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos', 'wiki-jogos'],
  },
  {
    numero: 263, tipo: 'jogador', selecao: 'colombia', nome: 'James Rodríguez', camisa: 10, posicao: 'Meio-campista', clube: 'Minnesota United FC', raridade: 'lendaria',
    curiosidade: 'Capitão e camisa 10 da Colômbia. Maior goleador do elenco, com 31 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 264, tipo: 'jogador', selecao: 'colombia', nome: 'Davinson Sánchez', camisa: 23, posicao: 'Defensor', clube: 'Galatasaray', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 79 jogos e 4 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },

  // ----- Inglaterra -----
  { numero: 265, tipo: 'bandeira', selecao: 'inglaterra', nome: 'Inglaterra', raridade: 'brilhante', fonte: ['wiki-grupo-l'] },
  {
    numero: 266, tipo: 'jogador', selecao: 'inglaterra', nome: 'Jordan Pickford', camisa: 1, posicao: 'Goleiro', clube: 'Everton', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 84 jogos pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 267, tipo: 'jogador', selecao: 'inglaterra', nome: 'John Stones', camisa: 5, posicao: 'Defensor', clube: 'Manchester City', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 89 jogos e 3 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 268, tipo: 'jogador', selecao: 'inglaterra', nome: 'Harry Kane', camisa: 9, posicao: 'Atacante', clube: 'Bayern Munich', raridade: 'brilhante',
    curiosidade: 'Capitão da Inglaterra na Copa de 2026. Fez 6 gols na Copa de 2026.',
    fonte: ['wiki-elencos', 'f365-elencos', 'wiki-jogos'],
  },
  {
    numero: 269, tipo: 'jogador', selecao: 'inglaterra', nome: 'Jude Bellingham', camisa: 10, posicao: 'Meio-campista', clube: 'Real Madrid', raridade: 'lendaria',
    curiosidade: 'Vestiu a camisa 10 da Inglaterra. Fez 7 gols na Copa de 2026.',
    fonte: ['wiki-elencos', 'f365-elencos', 'wiki-jogos'],
  },
  {
    numero: 270, tipo: 'jogador', selecao: 'inglaterra', nome: 'Jordan Henderson', camisa: 14, posicao: 'Meio-campista', clube: 'Brentford', raridade: 'comum',
    curiosidade: 'O mais velho do elenco, com 35 anos.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },

  // ----- Croácia -----
  { numero: 271, tipo: 'bandeira', selecao: 'croacia', nome: 'Croácia', raridade: 'brilhante', fonte: ['wiki-grupo-l'] },
  {
    numero: 272, tipo: 'jogador', selecao: 'croacia', nome: 'Dominik Livaković', camisa: 1, posicao: 'Goleiro', clube: 'Dinamo Zagreb', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 75 jogos pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 273, tipo: 'jogador', selecao: 'croacia', nome: 'Joško Gvardiol', camisa: 4, posicao: 'Defensor', clube: 'Manchester City', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 48 jogos e 4 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 274, tipo: 'jogador', selecao: 'croacia', nome: 'Andrej Kramarić', camisa: 9, posicao: 'Atacante', clube: 'TSG Hoffenheim', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 116 jogos e 36 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 275, tipo: 'jogador', selecao: 'croacia', nome: 'Luka Modrić', camisa: 10, posicao: 'Meio-campista', clube: 'AC Milan', raridade: 'lendaria',
    curiosidade: 'Capitão e camisa 10 da Croácia. É quem mais jogou pela seleção no elenco: 198 partidas.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 276, tipo: 'jogador', selecao: 'croacia', nome: 'Ivan Perišić', camisa: 14, posicao: 'Atacante', clube: 'PSV Eindhoven', raridade: 'comum',
    curiosidade: 'Fez 1 gol na Copa de 2026. Maior goleador do elenco, com 38 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos', 'wiki-jogos'],
  },

  // ----- Gana -----
  { numero: 277, tipo: 'bandeira', selecao: 'gana', nome: 'Gana', raridade: 'brilhante', fonte: ['wiki-grupo-l'] },
  {
    numero: 278, tipo: 'jogador', selecao: 'gana', nome: 'Lawrence Ati-Zigi', camisa: 1, posicao: 'Goleiro', clube: 'St. Gallen', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 29 jogos pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 279, tipo: 'jogador', selecao: 'gana', nome: 'Caleb Yirenkyi', camisa: 3, posicao: 'Meio-campista', clube: 'Nordsjælland', raridade: 'comum',
    curiosidade: 'Fez 1 gol na Copa de 2026. O mais novo do elenco, com 20 anos.',
    fonte: ['wiki-elencos', 'f365-elencos', 'wiki-jogos'],
  },
  {
    numero: 280, tipo: 'jogador', selecao: 'gana', nome: 'Jordan Ayew', camisa: 9, posicao: 'Atacante', clube: 'Leicester City', raridade: 'brilhante',
    curiosidade: 'Capitão de Gana na Copa de 2026. É quem mais jogou pela seleção no elenco: 120 partidas.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 281, tipo: 'jogador', selecao: 'gana', nome: 'Brandon Thomas-Asante', camisa: 10, posicao: 'Atacante', clube: 'Coventry City', raridade: 'lendaria',
    curiosidade: 'Vestiu a camisa 10 de Gana. Chegou à Copa com 8 jogos e 1 gol pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 282, tipo: 'jogador', selecao: 'gana', nome: 'Abdul Rahman Baba', camisa: 17, posicao: 'Defensor', clube: 'PAOK', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 51 jogos e 1 gol pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },

  // ----- Panamá -----
  { numero: 283, tipo: 'bandeira', selecao: 'panama', nome: 'Panamá', raridade: 'brilhante', fonte: ['wiki-grupo-l'] },
  {
    numero: 284, tipo: 'jogador', selecao: 'panama', nome: 'Luis Mejía', camisa: 1, posicao: 'Goleiro', clube: 'Nacional', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 56 jogos pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 285, tipo: 'jogador', selecao: 'panama', nome: 'Ismael Díaz', camisa: 10, posicao: 'Meio-campista', clube: 'León', raridade: 'lendaria',
    curiosidade: 'Vestiu a camisa 10 do Panamá. Maior goleador do elenco, com 17 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 286, tipo: 'jogador', selecao: 'panama', nome: 'Eric Davis', camisa: 15, posicao: 'Defensor', clube: 'Plaza Amador', raridade: 'comum',
    curiosidade: 'Chegou à Copa com 107 jogos e 9 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 287, tipo: 'jogador', selecao: 'panama', nome: 'José Fajardo', camisa: 17, posicao: 'Atacante', clube: 'Universidad Católica', raridade: 'comum',
    curiosidade: 'Maior goleador do elenco, com 17 gols pela seleção.',
    fonte: ['wiki-elencos', 'f365-elencos'],
  },
  {
    numero: 288, tipo: 'jogador', selecao: 'panama', nome: 'Aníbal Godoy', camisa: 20, posicao: 'Meio-campista', clube: 'San Diego FC', raridade: 'brilhante',
    curiosidade: 'Capitão do Panamá na Copa de 2026. É quem mais jogou pela seleção no elenco: 159 partidas.',
    fonte: ['wiki-elencos', 'f365-elencos'],
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

// ---------------------------------------------------------------------------
// COPA: como terminou
// ---------------------------------------------------------------------------
// Resumo usado na última página do álbum. O placar da final foi conferido em
// três reportagens além da Wikipedia. O total de gols e o artilheiro foram
// somados jogo a jogo pelo script e batem com a tabela de prêmios da fonte.

const COPA = {
  campea: 'espanha',
  vice: 'argentina',
  terceiro: 'inglaterra',
  quarto: 'franca',
  final: {
    placar: 'Espanha 1 a 0 Argentina, na prorrogação',
    gol: 'Ferran Torres',
    data: '19 de julho de 2026',
    estadio: 'MetLife Stadium, em East Rutherford (sede Nova York/Nova Jersey)',
  },
  terceiroLugar: {
    placar: 'Inglaterra 6 a 4 França',
    data: '18 de julho de 2026',
    estadio: 'Hard Rock Stadium, em Miami Gardens (sede Miami)',
  },
  premios: [
    { premio: 'Artilheiro', nome: 'Kylian Mbappé', selecao: 'franca', detalhe: '10 gols' },
    { premio: 'Melhor jogador (Bola de Ouro)', nome: 'Rodri', selecao: 'espanha', detalhe: '' },
    { premio: 'Melhor goleiro (Luva de Ouro)', nome: 'Unai Simón', selecao: 'espanha', detalhe: '' },
    { premio: 'Melhor jogador jovem', nome: 'Pau Cubarsí', selecao: 'espanha', detalhe: '' },
  ],
  numeros: { jogos: 104, gols: 308 },
  fonte: ['wiki-copa', 'wiki-mata-mata', 'wiki-jogos', 'espn-final', 'npr-final', 'cbs-final'],
};

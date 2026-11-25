const fs = require('fs');
const path = require('path');

const ARQUIVO_TOKENS = path.join(__dirname, '..', 'css', 'tokens.css');
const ARQUIVO_SAIDA = path.join(__dirname, '..', 'docs', 'cores.md');

function canalLinear(valor) {
  const c = valor / 255;
  return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

function luminancia(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return 0.2126 * canalLinear(r) + 0.7152 * canalLinear(g) + 0.0722 * canalLinear(b);
}

function contraste(corA, corB) {
  const a = luminancia(corA);
  const b = luminancia(corB);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}

function lerBlocos(css) {
  const semComentarios = css.replace(/\/\*[\s\S]*?\*\//g, '');
  const blocos = {};
  const regra = /([^{}]+)\{([^{}]*)\}/g;
  let achado;
  while ((achado = regra.exec(semComentarios)) !== null) {
    const seletor = achado[1].trim();
    const cores = blocos[seletor] || {};
    const linha = /--cor-([a-z0-9-]+)\s*:\s*(#[0-9a-fA-F]{6})\s*;/g;
    let cor;
    while ((cor = linha.exec(achado[2])) !== null) {
      cores[cor[1]] = cor[2].toUpperCase();
    }
    blocos[seletor] = cores;
  }
  return blocos;
}

const blocos = lerBlocos(fs.readFileSync(ARQUIVO_TOKENS, 'utf8'));

const claro = blocos[':root'];
const escuro = { ...claro, ...blocos['[data-tema="escuro"]'] };
const altoClaro = { ...claro, ...blocos['[data-contraste="alto"]'] };
const altoEscuro = { ...escuro, ...blocos['[data-contraste="alto"]'], ...blocos['[data-tema="escuro"][data-contraste="alto"]'] };

const TEMAS = [
  { nome: 'Tema claro', cores: claro },
  { nome: 'Tema escuro', cores: escuro },
  { nome: 'Alto contraste, claro', cores: altoClaro },
  { nome: 'Alto contraste, escuro', cores: altoEscuro },
];

const PARES = [
  { frente: 'texto', fundo: 'fundo', tipo: 'texto', uso: 'Texto principal sobre o fundo da página' },
  { frente: 'texto', fundo: 'superficie', tipo: 'texto', uso: 'Texto principal sobre cartão, campo e painel' },
  { frente: 'texto-secundario', fundo: 'fundo', tipo: 'texto', uso: 'Texto de apoio sobre o fundo' },
  { frente: 'texto-secundario', fundo: 'superficie', tipo: 'texto', uso: 'Texto de apoio sobre cartão e campo' },
  { frente: 'texto-secundario', fundo: 'vaga', tipo: 'texto', uso: 'Número e legenda dentro do espaço vazio' },
  { frente: 'texto', fundo: 'vaga', tipo: 'texto', uso: 'Nome impresso dentro do espaço vazio' },
  { frente: 'fundo', fundo: 'texto', tipo: 'texto', uso: 'Texto da aba escolhida e do dia carimbado na cartela' },
  { frente: 'acao', fundo: 'fundo', tipo: 'texto', uso: 'Link sobre o fundo' },
  { frente: 'acao', fundo: 'superficie', tipo: 'texto', uso: 'Link sobre cartão' },
  { frente: 'sobre-acao', fundo: 'acao', tipo: 'texto', uso: 'Texto do botão principal' },
  { frente: 'sobre-acao', fundo: 'acao-forte', tipo: 'texto', uso: 'Texto do botão com o mouse em cima' },
  { frente: 'sucesso', fundo: 'fundo', tipo: 'texto', uso: 'Mensagem de sucesso sobre o fundo' },
  { frente: 'sucesso', fundo: 'superficie', tipo: 'texto', uso: 'Mensagem de sucesso sobre cartão' },
  { frente: 'erro', fundo: 'fundo', tipo: 'texto', uso: 'Mensagem de erro sobre o fundo' },
  { frente: 'erro', fundo: 'superficie', tipo: 'texto', uso: 'Mensagem de erro sobre cartão e campo' },
  { frente: 'etiqueta-texto', fundo: 'etiqueta-fundo', tipo: 'texto', uso: 'Texto da etiqueta ("Nova", "Repetida")' },
  { frente: 'figurinha-tinta', fundo: 'figurinha-papel', tipo: 'texto', uso: 'Texto da figurinha comum' },
  { frente: 'figurinha-tinta', fundo: 'prata-clara', tipo: 'texto', uso: 'Texto da figurinha brilhante' },
  { frente: 'figurinha-tinta', fundo: 'prata', tipo: 'texto', uso: 'Texto sobre a listra mais escura da brilhante' },
  { frente: 'figurinha-tinta', fundo: 'ouro', tipo: 'texto', uso: 'Texto da figurinha lendária' },
  { frente: 'borda', fundo: 'fundo', tipo: 'componente', uso: 'Borda de campo e de vaga sobre o fundo' },
  { frente: 'borda', fundo: 'superficie', tipo: 'componente', uso: 'Borda de campo sobre cartão' },
  { frente: 'borda', fundo: 'vaga', tipo: 'componente', uso: 'Moldura da vaga sobre o preenchimento da vaga' },
  { frente: 'acao', fundo: 'fundo', tipo: 'componente', uso: 'Botão principal como forma sobre o fundo' },
  { frente: 'acao', fundo: 'vaga', tipo: 'componente', uso: 'Botão "Colar" como forma dentro do espaço vazio' },
  { frente: 'texto', fundo: 'vaga', tipo: 'componente', uso: 'Preenchimento da barra de progresso sobre o trilho' },
  { frente: 'figurinha-papel', fundo: 'figurinha-tinta', tipo: 'texto', uso: 'Texto da etiqueta colada na figurinha' },

  { frente: ['figurinha-tinta', 'figurinha-papel'], fundo: 'fundo', tipo: 'componente', uso: 'Etiqueta da figurinha (fundo ou contorno) sobre a página' },
  { frente: 'foco', fundo: 'foco-vao', tipo: 'componente', uso: 'Os dois tons do foco, um ao lado do outro' },
  { frente: ['foco', 'foco-vao'], fundo: 'fundo', tipo: 'componente', uso: 'Foco (anel ou vão) sobre o fundo' },
  { frente: ['foco', 'foco-vao'], fundo: 'superficie', tipo: 'componente', uso: 'Foco (anel ou vão) sobre cartão' },
  { frente: ['foco', 'foco-vao'], fundo: 'vaga', tipo: 'componente', uso: 'Foco (anel ou vão) sobre o espaço vazio' },
  { frente: ['foco', 'foco-vao'], fundo: 'figurinha-papel', tipo: 'componente', uso: 'Foco (anel ou vão) sobre a figurinha' },
  { frente: ['foco', 'foco-vao'], fundo: 'acao', tipo: 'componente', uso: 'Foco (anel ou vão) em volta do botão principal' },
  { frente: ['foco', 'foco-vao'], fundo: 'etiqueta-fundo', tipo: 'componente', uso: 'Foco (anel ou vão) sobre área na cor da tinta' },
];

const PAPEIS = [
  { token: 'papel-2', nome: 'papel 2' },
  { token: 'papel-3', nome: 'papel 3' },
  { token: 'papel-4', nome: 'papel 4' },
  { token: 'papel-realce', nome: 'recorte de realce' },
  { token: 'papel-destaque', nome: 'recorte de destaque' },
];
for (const papel of PAPEIS) {
  PARES.push(
    { frente: 'texto', fundo: papel.token, tipo: 'texto', uso: 'Texto principal sobre o ' + papel.nome },
    { frente: 'texto-secundario', fundo: papel.token, tipo: 'texto', uso: 'Texto de apoio sobre o ' + papel.nome },
    { frente: 'acao', fundo: papel.token, tipo: 'texto', uso: 'Link e botão principal sobre o ' + papel.nome },
    { frente: 'sucesso', fundo: papel.token, tipo: 'texto', uso: 'Mensagem de sucesso sobre o ' + papel.nome },
    { frente: 'erro', fundo: papel.token, tipo: 'texto', uso: 'Mensagem de erro sobre o ' + papel.nome },
    { frente: 'borda', fundo: papel.token, tipo: 'componente', uso: 'Borda de campo e de vaga sobre o ' + papel.nome },
    { frente: ['figurinha-tinta', 'figurinha-papel'], fundo: papel.token, tipo: 'componente', uso: 'Etiqueta da figurinha (fundo ou contorno) sobre o ' + papel.nome },
    { frente: ['foco', 'foco-vao'], fundo: papel.token, tipo: 'componente', uso: 'Foco (anel ou vão) sobre o ' + papel.nome }
  );
}

const DESCRICAO = [
  { token: 'fundo', nome: 'Papel rosa / papel azul', onde: 'Primeira faixa do fundo de todas as páginas (e a cor do cabeçalho)', motivo: 'Rosa claro é lido como lúdico, acolhedor e nostálgico (papel de figurinha de chiclete). No escuro, o azul profundo acalma e descansa a vista mais que o preto.' },
  { token: 'papel-2', nome: 'Papel pêssego / papel roxo', onde: 'Segunda faixa do fundo', motivo: 'Vizinho do rosa no círculo das cores: o papel muda sem brigar com o anterior. No escuro, o roxo é o vizinho do azul.' },
  { token: 'papel-3', nome: 'Papel menta / papel petróleo', onde: 'Terceira faixa do fundo', motivo: 'Verde claro lembra o gramado: é a faixa onde fica o desenho da grande área. No escuro, um azul-petróleo.' },
  { token: 'papel-4', nome: 'Papel lilás / papel vinho', onde: 'Quarta faixa do fundo', motivo: 'Fica entre o verde e o rosa do começo, para o fundo emendar quando se repete em páginas compridas.' },
  { token: 'papel-realce', nome: 'Recorte branco / recorte fundo', onde: 'Desenhos recortados do fundo: estádio, bola, figurinhas, linhas de giz', motivo: 'O tom mais claro do tema claro e o mais fundo do escuro: o desenho aparece e o texto que passa por cima dele ganha contraste, em vez de perder.' },
  { token: 'papel-destaque', nome: 'Recorte amarelo / recorte verde', onde: 'Detalhes dos desenhos do fundo: sol, estrelas, bandeiras, um dos cartões', motivo: 'A única cor que não está nos papéis: amarelo lembra o sol e o cartão do juiz; no escuro, um verde de gramado à noite.' },
  { token: 'superficie', nome: 'Papel de cupom', onde: 'Cartões, campos de formulário e painel', motivo: 'Quase branco: passa limpeza e marca o que é papel solto em cima da página. No escuro, o que está na frente fica mais claro.' },
  { token: 'vaga', nome: 'Rosa-sombra / rebaixo', onde: 'Espaço vazio da figurinha e trilho da barra de progresso', motivo: 'O próprio papel um tom abaixo: comunica ausência e lugar reservado sem usar cinza.' },
  { token: 'texto', nome: 'Azul-tinteiro / tinta rosa', onde: 'Textos, títulos e fios', motivo: 'Azul-escuro transmite confiança e seriedade de coisa impressa. No escuro, um rosa quase branco é mais macio que o branco puro.' },
  { token: 'texto-secundario', nome: 'Tinta diluída', onde: 'Legendas, dicas e números das vagas', motivo: 'O mesmo matiz com menos força: cria hierarquia sem trazer uma cor nova.' },
  { token: 'borda', nome: 'Linha impressa', onde: 'Bordas de campo, de vaga e de cartão', motivo: 'Tom neutro da família da tinta: delimita sem chamar atenção, porque borda é estrutura e não mensagem.' },
  { token: 'acao', nome: 'Azul-caneta / caneta gel', onde: 'Botões e links', motivo: 'Azul vivo comunica clareza e decisão e respeita o costume de link azul. É a caneta: o que a pessoa faz, separado do que já veio impresso.' },
  { token: 'acao-forte', nome: 'Caneta apertada', onde: 'Botão com o mouse em cima ou pressionado', motivo: 'Mesma cor com mais força: confirma o toque sem mudar de matiz. No escuro clareia, porque ali a luz é que indica resposta.' },
  { token: 'sobre-acao', nome: 'Texto do botão', onde: 'Texto escrito em cima do botão principal', motivo: 'A cor do papel sobre a cor da caneta: o maior contraste disponível no tema.' },
  { token: 'foco', nome: 'Anel de foco', onde: 'Contorno do elemento em uso pelo teclado', motivo: 'A tinta mais forte do tema, para o foco ser sempre o que mais aparece na tela.' },
  { token: 'foco-vao', nome: 'Vão do foco', onde: 'Faixa entre o elemento e o anel de foco', motivo: 'O tom oposto ao do anel: assim o foco aparece tanto sobre fundo claro quanto sobre fundo escuro.' },
  { token: 'sucesso', nome: 'Verde-gramado', onde: 'Mensagens de "deu certo" e selos', motivo: 'Verde é o sinal universal de "pode seguir" e é a cor do campo.' },
  { token: 'erro', nome: 'Vermelho-cartão', onde: 'Mensagens de erro', motivo: 'Vermelho interrompe e pede correção; no futebol é o cartão que para o jogo. Vem sempre com ícone e frase.' },
  { token: 'etiqueta-fundo', nome: 'Etiqueta (fundo)', onde: 'Etiquetas "Nova" e "Repetida"', motivo: 'O negativo da tinta: destaca sem trazer cor nova, mantendo a página em uma tinta só.' },
  { token: 'etiqueta-texto', nome: 'Etiqueta (texto)', onde: 'Texto das etiquetas', motivo: 'A cor do papel escrita sobre a cor da tinta.' },
  { token: 'figurinha-papel', nome: 'Fosca', onde: 'Figurinha comum e borda de toda figurinha', motivo: 'Branco é neutro e honesto: comunica o básico do álbum e faz as outras raridades valerem mais.' },
  { token: 'figurinha-tinta', nome: 'Tinta da figurinha', onde: 'Texto dentro da figurinha', motivo: 'A figurinha é um objeto impresso: a tinta dela não muda quando o tema muda.' },
  { token: 'prata', nome: 'Laminada', onde: 'Listras da figurinha brilhante', motivo: 'Prata é o segundo degrau do pódio: valor acima do comum, sem competir com o ouro.' },
  { token: 'prata-clara', nome: 'Laminada clara', onde: 'Base da figurinha brilhante', motivo: 'O claro e o escuro alternados é o que o olho lê como brilho de metal.' },
  { token: 'ouro', nome: 'Holográfica', onde: 'Figurinha lendária', motivo: 'Ouro é a cor do prêmio máximo: quente e rara na página.' },
  { token: 'foto-sombra', nome: 'Sombra da foto', onde: 'Partes escuras das fotos dos estádios', motivo: 'A foto é mostrada como se fosse impressa com a tinta da página: assim ela não quebra a regra de uma tinta só e a cor continua reservada às figurinhas.' },
  { token: 'foto-luz', nome: 'Luz da foto', onde: 'Partes claras das fotos dos estádios', motivo: 'A cor do papel (no escuro, a da tinta rosa): a foto parece pertencer à página em vez de ser um retângulo colado nela.' },
];

function formatar(razao) {
  return razao.toFixed(2).replace('.', ',') + ':1';
}

function resultado(razao, tipo) {
  if (tipo === 'componente') return razao >= 3 ? 'Passa (3:1)' : 'REPROVA';
  if (razao >= 7) return 'Passa AAA';
  if (razao >= 4.5) return 'Passa AA';
  return 'REPROVA';
}

let reprovados = 0;
let total = 0;
const linhas = [];

linhas.push('# Cores do site');
linhas.push('');
linhas.push('Arquivo gerado por `node scripts/contraste.js`. Não edite à mão: mude as cores em `css/tokens.css` e rode o script de novo.');
linhas.push('');
linhas.push('## Como ler');
linhas.push('');
linhas.push('- Contraste é a diferença de claridade entre duas cores, de 1:1 (iguais) a 21:1 (preto no branco).');
linhas.push('- Mínimos do WCAG 2.2: texto normal 4,5:1 (nível AA) e 7:1 (nível AAA); texto grande, bordas, ícones, anel de foco e barras 3:1.');
linhas.push('- Direção visual: "Uma tinta só, vários papéis". A tinta é uma só (azul no tema claro, rosa no escuro). O papel do fundo muda de cor ao longo da página (quatro papéis por tema) e leva desenhos recortados em mais duas cores de papel.');
linhas.push('- O grão e as manchas do fundo não entram na tabela porque não tiram contraste: no tema claro só clareiam o papel e no escuro só escurecem.');
linhas.push('');
linhas.push('## Paleta e motivo de cada cor');
linhas.push('');
linhas.push('| Cor | Token | Claro | Escuro | Onde é usada | Motivo |');
linhas.push('|---|---|---|---|---|---|');
for (const d of DESCRICAO) {
  linhas.push(`| ${d.nome} | \`--cor-${d.token}\` | \`${claro[d.token]}\` | \`${escuro[d.token]}\` | ${d.onde} | ${d.motivo} |`);
}
linhas.push('');

for (const tema of TEMAS) {
  linhas.push(`## Contraste: ${tema.nome.toLowerCase()}`);
  linhas.push('');
  linhas.push('| Uso | Frente | Fundo | Contraste | Mínimo | Resultado |');
  linhas.push('|---|---|---|---|---|---|');
  for (const par of PARES) {
    const fundo = tema.cores[par.fundo];
    const candidatas = Array.isArray(par.frente) ? par.frente : [par.frente];
    let frente = tema.cores[candidatas[0]];
    for (const nome of candidatas) {
      if (contraste(tema.cores[nome], fundo) > contraste(frente, fundo)) frente = tema.cores[nome];
    }
    const razao = contraste(frente, fundo);
    const veredito = resultado(razao, par.tipo);
    total += 1;
    if (veredito === 'REPROVA') {
      reprovados += 1;
      console.log(`REPROVA  ${tema.nome}: ${par.uso} (${frente} sobre ${fundo}) = ${formatar(razao)}`);
    }
    const minimo = par.tipo === 'texto' ? '4,5:1' : '3:1';
    linhas.push(`| ${par.uso} | \`${frente}\` | \`${fundo}\` | ${formatar(razao)} | ${minimo} | ${veredito} |`);
  }
  linhas.push('');
}

const codigoDosDados = fs.readFileSync(path.join(__dirname, '..', 'js', 'dados.js'), 'utf8');
const SELECOES = new Function(codigoDosDados + '; return SELECOES;')();

const TINTAS = [
  { nome: 'tinta normal', cor: claro['figurinha-tinta'] },
  { nome: 'tinta do alto contraste', cor: altoClaro['figurinha-tinta'] },
];

linhas.push('## Contraste: cores das seleções');
linhas.push('');
linhas.push('O número é escrito sobre a camisa, e o contorno do retrato (na tinta da figurinha) fica sobre o campo. Mínimo de 3:1 nos dois casos. A última coluna é o pior resultado entre a tinta normal e a do alto contraste.');
linhas.push('');
linhas.push('| Seleção | Campo | Camisa | Número | Número sobre a camisa | Contorno sobre o campo | Resultado |');
linhas.push('|---|---|---|---|---|---|---|');
for (const selecao of SELECOES) {
  const cores = selecao.cores;
  const numeroNaCamisa = contraste(cores.numero, cores.camisa);
  let contornoNoCampo = 21;
  for (const tinta of TINTAS) contornoNoCampo = Math.min(contornoNoCampo, contraste(tinta.cor, cores.campo));
  const passou = numeroNaCamisa >= 3 && contornoNoCampo >= 3;
  total += 2;
  if (!passou) {
    reprovados += 1;
    console.log(`REPROVA  Seleção ${selecao.nome}: número/camisa ${formatar(numeroNaCamisa)}, contorno/campo ${formatar(contornoNoCampo)}`);
  }
  linhas.push(`| ${selecao.nome} | \`${cores.campo}\` | \`${cores.camisa}\` | \`${cores.numero}\` | ${formatar(numeroNaCamisa)} | ${formatar(contornoNoCampo)} | ${passou ? 'Passa (3:1)' : 'REPROVA'} |`);
}
linhas.push('');

linhas.push('## Resumo');
linhas.push('');
linhas.push(`- Pares conferidos: ${total} (${PARES.length} pares da página em ${TEMAS.length} temas, mais 2 pares do desenho de cada uma das ${SELECOES.length} seleções).`);
linhas.push(`- Reprovados: ${reprovados}.`);
linhas.push('- A raridade da figurinha nunca depende só da cor: vem sempre com palavra, ícone e textura.');
linhas.push('- A seleção de cada figurinha também vem escrita: as cores da camisa não são a única informação.');
linhas.push('');

fs.writeFileSync(ARQUIVO_SAIDA, linhas.join('\n'), 'utf8');

console.log(`${total} pares conferidos, ${reprovados} reprovados. Tabela escrita em docs/cores.md`);

process.exit(reprovados > 0 ? 1 : 0);

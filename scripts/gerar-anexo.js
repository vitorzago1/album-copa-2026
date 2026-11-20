// ============================================================================
// gerar-anexo.js
// ----------------------------------------------------------------------------
// O que faz: junta todos os arquivos HTML, CSS e JavaScript do projeto em um
// arquivo só, docs/anexo-codigo.md, para o anexo de código do relatório.
//
// Como rodar (na pasta do projeto):   node scripts/gerar-anexo.js
//
// Rode de novo sempre que o código mudar: o anexo é reescrito do zero.
// ============================================================================

const fs = require('fs');
const path = require('path');

const RAIZ = path.join(__dirname, '..');
const ARQUIVO_SAIDA = path.join(RAIZ, 'docs', 'anexo-codigo.md');

// Os grupos de arquivos, na ordem em que aparecem no anexo.
// "primeiro" lista os arquivos que vêm na frente, na ordem em que fazem mais
// sentido para ler. Os que não estiverem na lista entram depois, em ordem
// alfabética: assim um arquivo novo nunca fica de fora.
const GRUPOS = [
  {
    titulo: 'Páginas (HTML)', pasta: '', extensao: '.html', linguagem: 'html',
    primeiro: ['index.html', 'album.html', 'pacotinhos.html', 'trocas.html', 'login.html', 'contato.html', 'sobre.html'],
  },
  {
    titulo: 'Estilos (CSS)', pasta: 'css', extensao: '.css', linguagem: 'css',
    primeiro: ['tokens.css', 'base.css', 'componentes.css', 'paginas.css', 'acessibilidade.css'],
  },
  {
    titulo: 'Comportamento (JavaScript)', pasta: 'js', extensao: '.js', linguagem: 'js',
    primeiro: ['tema-acessibilidade.js', 'menu.js', 'estado.js', 'figurinha.js', 'album.js', 'pacotinho.js', 'trocas.js', 'inicio.js', 'carrossel.js', 'formulario.js', 'login.js', 'contato.js', 'sobre.js', 'demonstracao.js', 'dados.js'],
  },
  {
    titulo: 'Scripts de apoio (Node.js)', pasta: 'scripts', extensao: '.js', linguagem: 'js',
    primeiro: ['contraste.js', 'gerar-anexo.js'],
  },
];

// Lista os arquivos de um grupo: primeiro os da lista "primeiro", depois os outros
function arquivosDoGrupo(grupo) {
  const pasta = path.join(RAIZ, grupo.pasta);
  const todos = fs.readdirSync(pasta).filter(function (nome) { return nome.endsWith(grupo.extensao); }).sort();
  const naFrente = grupo.primeiro.filter(function (nome) { return todos.includes(nome); });
  const resto = todos.filter(function (nome) { return !grupo.primeiro.includes(nome); });
  return naFrente.concat(resto);
}

const linhas = [];
const sumario = [];
let totalDeLinhas = 0;
let totalDeArquivos = 0;

for (const grupo of GRUPOS) {
  linhas.push('## ' + grupo.titulo);
  linhas.push('');

  for (const nome of arquivosDoGrupo(grupo)) {
    const caminho = grupo.pasta ? grupo.pasta + '/' + nome : nome;
    const conteudo = fs.readFileSync(path.join(RAIZ, caminho), 'utf8').replace(/\r\n/g, '\n').trimEnd();
    const quantas = conteudo.split('\n').length;
    totalDeLinhas += quantas;
    totalDeArquivos += 1;
    sumario.push('| `' + caminho + '` | ' + quantas + ' |');

    linhas.push('### ' + caminho);
    linhas.push('');
    // Quatro crases abrem e fecham o bloco de código: assim um arquivo que
    // tenha três crases dentro dele não fecha o bloco antes da hora.
    linhas.push('````' + grupo.linguagem);
    linhas.push(conteudo);
    linhas.push('````');
    linhas.push('');
  }
}

const cabecalho = [
  '# Anexo: código do projeto',
  '',
  'Arquivo gerado por `node scripts/gerar-anexo.js`. Não edite à mão: mude o código e rode o script de novo.',
  '',
  'Projeto: Colei! Álbum de figurinhas da Copa 2026. Aluno: Vitor Zago Pontes Morais.',
  '',
  '- Arquivos: ' + totalDeArquivos + '.',
  '- Linhas de código (com comentários): ' + totalDeLinhas + '.',
  '',
  '| Arquivo | Linhas |',
  '|---|---|',
].concat(sumario, ['']);

fs.writeFileSync(ARQUIVO_SAIDA, cabecalho.concat(linhas).join('\n'), 'utf8');
console.log(totalDeArquivos + ' arquivos, ' + totalDeLinhas + ' linhas. Anexo escrito em docs/anexo-codigo.md');

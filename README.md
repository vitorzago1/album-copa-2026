# Colei! Álbum de figurinhas da Copa 2026

Álbum de figurinhas digital e interativo da Copa do Mundo de 2026 (Estados Unidos, México e Canadá).

Projeto Final da disciplina Desenvolvimento de Interfaces (CEUB, 2/2026), do Prof. Dr. Felipe Batista da Silva. Aluno: Vitor Zago Pontes Morais.

Projeto acadêmico, sem fins comerciais e sem vínculo com a FIFA, a Panini ou as federações.

## Como abrir

Não precisa instalar nada. Abra o arquivo `index.html` no navegador (dois cliques).

Link do site publicado: a definir (entra aqui depois da publicação no GitHub Pages).

## Estrutura de pastas

```
album-copa-2026/
├── index.html, album.html, pacotinhos.html, trocas.html, login.html, contato.html, sobre.html
├── css/      estilos (cores, base, componentes, páginas, acessibilidade)
├── js/       comportamento (dados, tema e acessibilidade, álbum, pacotinho...)
├── assets/   imagens, SVG e fontes
├── docs/     cores, decisões, referências, prints e anexo de código
├── scripts/  ferramentas de apoio (contraste, anexo de código)
├── README.md
├── CHANGELOG.md
└── CLAUDE.md regras do projeto para a IA que ajudou na construção
```

## Construção passo a passo

Cada etapa abaixo corresponde a uma versão marcada no git (uma "tag", que funciona como um marcador de página no histórico).

### Etapa 1: escolha da direção visual

- Foram exploradas 3 direções visuais, cada uma com conceito, paleta nos dois temas, par de fontes e esboço da página inicial.
- Escolhida: **Uma tinta só**. A página é impressa em papel rosa com uma única tinta azul, e a cor de verdade só chega pelas figurinhas coladas.
- Nome do site: **Colei!**

### Etapa 2: estrutura (versão `v0.1-estrutura`)

- Criada a pasta do projeto e iniciado o git (o histórico de versões).
- Criadas as 7 páginas em HTML semântico (`header`, `nav`, `main`, `footer`), todas com o mesmo cabeçalho e o mesmo rodapé.
- Cada página tem o link "Pular para o conteúdo", que ajuda quem navega só pelo teclado.
- O cabeçalho e o rodapé são repetidos nos 7 arquivos de propósito: sem ferramenta de build, é o jeito mais simples e mais fácil de explicar.

### Etapa 3: design system (versão `v0.2-design`)

"Design system" é o conjunto de regras e peças que deixa o site inteiro com a mesma cara: cores, letras, espaços, botões, cartões.

1. **Cores com nome (`css/tokens.css`).** Cada cor tem um nome pela função (`--cor-fundo`, `--cor-texto`, `--cor-acao`...). São 4 conjuntos: tema claro, tema escuro e as duas versões de alto contraste.
2. **Contraste calculado (`scripts/contraste.js`).** O script lê o `tokens.css`, calcula o contraste de cada par de cores usado e escreve `docs/cores.md`. Resultado: 128 pares, 0 reprovados.
3. **Fontes dentro do projeto (`assets/fontes/`).** Londrina Solid para títulos e números, Atkinson Hyperlegible Next para leitura. Ficam no projeto para o site funcionar sem internet.
4. **Estilos gerais (`css/base.css`).** Texto, links sempre sublinhados, foco do teclado em dois tons, cabeçalho, rodapé e a grade de "página dupla".
5. **Componentes (`css/componentes.css`).** Botão, etiqueta, cartão, cupom, vaga, figurinha (comum, brilhante e lendária), tira de grupos, passos numerados e campo de formulário.
6. **Painel de acessibilidade (`js/tema-acessibilidade.js` e `css/acessibilidade.css`).** Tema (claro, escuro ou automático), tamanho da letra (3 níveis), alto contraste, reduzir animações, mais espaço no texto e destacar links. Tudo fica salvo no navegador e é aplicado antes de a página aparecer.
7. **Menu do celular (`js/menu.js`).** Em telas pequenas o menu fica atrás do botão "Menu".
8. **Página inicial (`index.html`)** montada com essas peças, e um **guia de estilo** na página Sobre, com todas as peças juntas.
9. **Testes.** 42 verificações automáticas: temas, painel, teclado, 320 px de largura, alvos de toque e console sem erros nas 7 páginas.

## Como conferir o contraste

Com o Node.js instalado, na pasta do projeto:

```
node scripts/contraste.js
```

O script reescreve `docs/cores.md` e avisa se algum par de cores reprovar.

## Tecnologias

- HTML, CSS e JavaScript puros, sem framework e sem etapa de build.
- Git e GitHub para o histórico de versões.
- Node.js só para rodar o script de contraste (o site em si não precisa dele).

## Documentação

- `docs/cores.md`: paleta dos temas, motivo de cada cor e tabela de contraste calculada.
- `docs/decisoes.md`: decisões de design e onde cada critério do WCAG e cada heurística de Nielsen foi aplicado.
- `docs/referencias.md`: fontes, ferramentas e IAs usadas.
- `CHANGELOG.md`: o que mudou em cada versão.

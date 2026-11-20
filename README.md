# Colei! Álbum de figurinhas da Copa 2026

Álbum de figurinhas digital e interativo da Copa do Mundo de 2026 (Estados Unidos, México e Canadá).

Projeto Final da disciplina Desenvolvimento de Interfaces (CEUB, 2/2026), do Prof. Dr. Felipe Batista da Silva. Aluno: Vitor Zago Pontes Morais.

Projeto acadêmico, sem fins comerciais e sem vínculo com a FIFA, a Panini ou as federações.

## Como abrir

Não precisa instalar nada. Abra o arquivo `index.html` no navegador (dois cliques).

Link do site publicado: a definir (entra aqui depois da publicação no GitHub Pages).

### Para testar rápido (modo demonstração)

O álbum dá um pacotinho grátis por dia. Para não depender disso na apresentação:

1. Abra a página **Sobre** e clique em **Ganhar 5 pacotinhos extras**.
2. Vá em **Pacotinhos**, rasgue o pacotinho e vire as figurinhas.
3. Vá em **Álbum** e cole: arrastando a figurinha até a vaga ou pelo botão **Colar**.
4. Para começar do zero, volte em **Sobre** e clique em **Zerar álbum**.

O progresso fica guardado só no navegador em que o site foi aberto (não existe servidor).

## Estrutura de pastas

```
album-copa-2026/
├── index.html, album.html, pacotinhos.html, trocas.html, login.html, contato.html, sobre.html
├── css/      estilos (cores, base, componentes, páginas, acessibilidade)
├── js/       comportamento, um arquivo por assunto:
│             dados.js (seleções e figurinhas), estado.js (progresso guardado),
│             figurinha.js (desenho e virar), album.js, pacotinho.js, inicio.js,
│             demonstracao.js, menu.js e tema-acessibilidade.js
├── assets/   bandeiras, SVG e fontes
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

### Etapa 4: pesquisa dos dados de um grupo

- Pesquisado o Grupo C (Brasil, Marrocos, Haiti e Escócia): 4 seleções e 24 figurinhas (a bandeira e 5 jogadores de cada seleção).
- Tudo fica em `js/dados.js`, e cada registro tem o campo `fonte`. Número da camisa, posição e clube foram conferidos em duas listas independentes.
- O que não deu para confirmar está escrito como "a confirmar" (o que Brasil e Marrocos fizeram depois da fase de grupos).
- Regras do álbum: 24 figurinhas por grupo, numeradas em sequência (o Grupo C vai da 49 à 72); lendária é o camisa 10, brilhante é a bandeira e o capitão, comum são as demais.

### Etapa 5: álbum de ponta a ponta com um grupo (versão `v0.3-album`)

1. **Progresso guardado (`js/estado.js`).** O álbum de cada pessoa fica no `localStorage` do navegador, em uma chave com o nome de quem entrou (`colei.album.visitante` enquanto ninguém entrou). Guarda quantas cópias saíram de cada figurinha, quais foram coladas, os pacotinhos extras, a sequência de dias e as conquistas.
2. **Figurinha que vira (`js/figurinha.js`).** A figurinha é um `<button>`: clique, Enter ou Espaço viram. A frente tem o retrato, o nome, a seleção, a raridade e o número; o verso tem posição, clube e uma curiosidade. O giro é feito no CSS e, com "Reduzir animações", a face só é trocada.
3. **Página do álbum (`album.html` e `js/album.js`).** Cada seleção é uma página dupla: a ficha de um lado e seis casas numeradas do outro. A casa mostra a figurinha colada, a vaga com o botão "Colar" (quando a figurinha está na mão) ou a vaga com "Falta".
4. **Colar de dois jeitos.** Arrastando a figurinha da bandeja "Na mão" até a vaga com o número dela, ou pelo botão "Colar" (na bandeja e na própria vaga). O botão existe porque nem todo mundo consegue arrastar.
5. **Desfazer.** Depois de colar aparece um recado no pé da tela com o botão "Desfazer", e o mesmo botão embaixo da figurinha recém-colada. O recado não some sozinho: fica até a próxima ação ou até ser fechado.
6. **Busca, abas e filtros.** Busca por nome, número, seleção, posição ou clube (sem depender de acento); abas Todas, Tenho, Faltam e Repetidas, no padrão WAI-ARIA (setas, Home e End); filtros de grupo, seleção, posição e raridade. O número de resultados é anunciado para o leitor de tela.
7. **Pacotinho do dia (`pacotinhos.html` e `js/pacotinho.js`).** Um pacotinho grátis por dia, com 5 figurinhas diferentes. O sorteio funciona como uma urna: cada comum entra com 6 bilhetes, cada brilhante com 3 e cada lendária com 1. As figurinhas saem de costas e são viradas uma por uma (ou todas de uma vez). Dá para colar as novas direto dali.
8. **Repetidas, sequência e conquistas.** Cada figurinha tem um contador de repetidas. A cartela marca os dias seguidos abrindo o pacotinho. São 6 conquistas, e cada uma vale um pacotinho extra.
9. **Página inicial com progresso de verdade (`js/inicio.js`).** A tira de grupos, o resumo, o pacotinho do dia e a cartela passam a mostrar o que está guardado.
10. **Modo demonstração (`sobre.html` e `js/demonstracao.js`).** Dois botões para a apresentação: ganhar 5 pacotinhos extras e zerar o álbum (com janela de confirmação).
11. **Bandeiras.** As 4 bandeiras vêm da biblioteca `flag-icons` (licença MIT), copiadas para `assets/bandeiras/`. Só os arquivos SVG foram usados: nenhum código da biblioteca roda no site.
12. **Testes.** 114 verificações automáticas novas (regras do álbum, colar, desfazer, arrastar, virar, abas pelo teclado, busca, filtros, pacotinho, 320 px, menos movimento), além das 42 da etapa 3. O script de contraste passou a conferir 140 pares, com 0 reprovados.

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
- `flag-icons` (licença MIT): só as imagens das bandeiras, copiadas para dentro do projeto. Motivo: desenhar à mão cada bandeira com fidelidade daria muito trabalho e mais chance de erro, e o enunciado do projeto permite bandeiras de fonte com licença livre.

## Documentação

- `docs/cores.md`: paleta dos temas, motivo de cada cor e tabela de contraste calculada.
- `docs/decisoes.md`: decisões de design e onde cada critério do WCAG e cada heurística de Nielsen foi aplicado.
- `docs/referencias.md`: fontes, ferramentas e IAs usadas.
- `CHANGELOG.md`: o que mudou em cada versão.

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
│             figurinha.js (desenho e virar), album.js, pacotinho.js, trocas.js,
│             inicio.js, carrossel.js, login.js, contato.js, formulario.js,
│             sobre.js, demonstracao.js, menu.js e tema-acessibilidade.js
├── assets/   bandeiras, fotos dos estádios, SVG e fontes
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

### Etapa 6: as outras páginas (entra na versão `v0.4-acessibilidade`)

1. **Entrar (`login.html` e `js/login.js`).** Criar conta, entrar e sair. É uma simulação: não existe servidor, e isso está escrito na própria página. Os campos têm `label`, `autocomplete` (`email`, `current-password`, `new-password`), botão de mostrar a senha e mensagens de erro ligadas ao campo. Colar a senha e usar gerenciador de senhas funcionam.
2. **A senha nunca é guardada.** Guarda-se o "hash" dela, feito com a ferramenta `crypto.subtle` do navegador (algoritmo SHA-256). Hash é como um moedor de carne: a senha entra, sai uma sequência de letras e números, e não há caminho de volta. Para conferir a senha, mói-se de novo o que foi digitado e compara-se o resultado. Antes de moer, a senha é misturada a um "sal", um tempero sorteado para cada conta: assim duas contas com a mesma senha ficam com hashes diferentes. Em um site de verdade essa conta seria feita no servidor, com um algoritmo lento de propósito.
3. **Álbum por pessoa.** Quem entra passa a usar o álbum da própria conta. Ao criar a conta, as figurinhas de visitante vão junto. O menu mostra "Minha conta" no lugar de "Entrar".
4. **Contato (`contato.html` e `js/contato.js`).** Nome, e-mail, assunto e mensagem. Ao enviar com erro, cada campo ganha a sua frase e um resumo no topo lista o que falta, com link para cada campo. Ao enviar certo, a mensagem de sucesso é lida pelo leitor de tela (`aria-live`). O envio é simulado.
5. **Trocas (`trocas.html` e `js/trocas.js`).** Lista das repetidas e das que faltam, texto pronto para copiar ou mandar pelo WhatsApp (link `wa.me`) e a "banca de trocas", que simula uma troca: sai uma repetida e chega uma figurinha que faltava.
6. **Carrossel das 16 sedes (`index.html` e `js/carrossel.js`).** Uma sede por vez, com foto do estádio, botões Anterior e Próxima, um botão numerado para cada sede e a posição anunciada ("3 de 16: Dallas"). Não passa sozinho.
7. **Fotos em uma tinta só.** As 16 fotos vêm do Wikimedia Commons, com licença livre. O arquivo é colorido; o CSS é que mostra a foto como se fosse impressa com a tinta da página (duas camadas de cor por cima de uma foto em preto e branco).
8. **Sobre (`sobre.html` e `js/sobre.js`).** O que é o projeto, o que é de verdade e o que é simulado, como foi feito, os créditos de fontes, bandeiras e fotos, e as fontes dos dados.
9. **Testes.** 67 verificações automáticas novas (conta, hash, erros de formulário, trocas, carrossel, créditos). Somando as etapas anteriores, são 223.

### Etapa 7: os 12 grupos (entra na versão `v0.4-acessibilidade`)

1. **De 1 para 12 grupos.** O álbum passou de 24 para 288 figurinhas: 48 seleções, cada uma com a bandeira e 5 jogadores. A numeração segue a ordem do sorteio: Grupo A da 1 à 24, Grupo B da 25 à 48 e assim por diante.
2. **Dados lidos por script, não digitados.** Os elencos, os 72 jogos da fase de grupos e os 32 do mata-mata foram lidos das páginas da Wikipedia listadas em `js/dados.js`. Digitar 220 jogadores à mão daria muito mais chance de erro.
3. **Conferência.** Número, nome e clube de cada jogador foram cruzados com uma segunda lista (Football365): 212 bateram por completo e 7 só por nome e clube, porque a segunda lista não trazia o número. O caso que sobrou é explicado pela própria fonte (jogador que entrou no lugar de um machucado). A soma dos gols de cada jogador bate com o placar nos 104 jogos.
4. **Regra para escolher os 5 jogadores** (todos os grupos menos o C, que foi escolhido à mão): o capitão; o camisa 10; quem fez mais gols pela seleção na Copa; o goleiro com mais jogos pela seleção; e os jogadores com mais jogos pela seleção, primeiro nas posições que ainda não têm ninguém.
5. **Textos montados a partir dos dados.** A campanha de cada seleção, o que ela fez no mata-mata e a curiosidade de cada jogador são frases montadas com os números lidos (jogos, gols, idade, resultados). Nada foi escrito de cabeça.
6. **Como terminou.** A última página do álbum mostra a campeã, os quatro primeiros, a final e os prêmios. O resultado da final foi conferido em três reportagens além da Wikipedia.
7. **Índice de grupos.** No topo do álbum, 12 casas levam direto a cada grupo e enchem conforme o grupo é colado.
8. **Bandeiras.** As 48 bandeiras vêm da `flag-icons` (licença MIT).
9. **Testes.** As verificações automáticas foram atualizadas para o álbum completo: 224 no total, todas passando. A página do álbum, com as 288 casas, é montada em menos de um décimo de segundo.

### Etapa 8: acessibilidade e polimento (versão `v0.4-acessibilidade`)

1. **Auditoria de estrutura em 15 telas** (todas as páginas, com erros de formulário, janelas abertas e os dois temas): toda imagem com `alt`, todo campo com rótulo, todo botão e link com nome, nenhum `id` repetido, toda referência ARIA apontando para algo que existe, títulos em ordem, listas bem formadas. Nenhum problema encontrado.
2. **Teste só com o teclado em 9 telas.** Um script aperta Tab até dar a volta na página e confere, em cada parada, se o elemento está na tela, se tem o anel de foco e se nada o cobre. Também confere se algum controle ficou sem receber foco.
3. **Problema achado e corrigido.** Com o recado de "Desfazer" aberto, os últimos links do rodapé ficavam embaixo dele ao receber o foco. Agora a página ganha uma folga no fim enquanto o recado está na tela.
4. **Zoom.** Com 200% e com 400% de zoom (janelas de 640 e 320 px), com letra maior e mais espaço no texto, as 7 páginas ficam sem rolagem lateral e sem texto cortado.
5. **Mais espaço no texto também nos botões.** A opção do painel passou a valer para botões, campos e figurinhas.
6. **Contraste das cores das seleções.** O script de contraste passou a conferir também o desenho de cada seleção (número sobre a camisa e silhueta sobre o campo): 236 pares no total, 0 reprovados.
7. **Total de verificações automáticas:** 254, todas passando.

## Onde está cada item pedido pelo professor

| Item | Onde está |
|---|---|
| Cartões | Figurinhas (`album.html`, `pacotinhos.html`), cartões "É uma simulação" (`login.html`, `contato.html`), cupom do pacotinho e bilhete de troca (`index.html`) |
| Abas de pesquisa | `album.html`: busca, abas Todas, Tenho, Faltam e Repetidas, e filtros de grupo, seleção, posição e raridade |
| Contato com formulário | `contato.html` |
| Carrossel de imagens | `index.html`, seção "As 16 sedes" |
| Imagens | Fotos dos 16 estádios (`assets/img/sedes/`), 48 bandeiras (`assets/bandeiras/`) e desenhos próprios em SVG e CSS |
| Cartões explicativos | `index.html`: "Como funciona", "Pacotinho do dia", "Raridades" e "Como trocar" |
| Modo escuro e claro | Painel de acessibilidade (botão no cabeçalho de todas as páginas); cores em `css/tokens.css` |
| Rodapé | Igual nas 7 páginas, com navegação, link do GitHub e créditos |
| Página de login | `login.html` (simulação, com a senha guardada só como hash) |
| Aba de acessibilidade | Botão "Acessibilidade" no cabeçalho: tema, tamanho da letra, alto contraste, reduzir animações, mais espaço no texto e destacar links |
| WCAG e análise de contraste | `docs/decisoes.md` (critério por critério) e `docs/cores.md` (tabela calculada por `scripts/contraste.js`) |
| Psicologia das cores | `docs/cores.md`, coluna "Motivo" |
| GitHub com versões | Histórico de commits e marcas `v0.1` a `v0.4`; `CHANGELOG.md` |
| README passo a passo | Este arquivo |
| Referências e IAs usadas | `docs/referencias.md` e página Sobre |
| Site publicado | A definir (depende da publicação no GitHub Pages) |

## Como conferir a acessibilidade

- **Contraste.** Com o Node.js instalado, na pasta do projeto, rode `node scripts/contraste.js`. O script reescreve `docs/cores.md` e avisa se algum par de cores reprovar.
- **Lighthouse (ainda não rodado).** No Edge ou no Chrome, abra o site, aperte F12, escolha a aba "Lighthouse", marque só "Acessibilidade" e clique em "Analisar carregamento de página". Anote a nota de cada página em `docs/decisoes.md`.
- **Só teclado.** Use Tab, Shift+Tab, Enter, Espaço, as setas (nas abas do álbum) e Esc (para fechar o painel e o menu).
- **Leitor de tela (ainda não testado).** No Windows, o NVDA é gratuito: https://www.nvaccess.org/

## Tecnologias

- HTML, CSS e JavaScript puros, sem framework e sem etapa de build.
- Git e GitHub para o histórico de versões.
- Node.js só para rodar o script de contraste (o site em si não precisa dele).
- `flag-icons` (licença MIT): só as imagens das bandeiras, copiadas para dentro do projeto. Motivo: desenhar à mão cada bandeira com fidelidade daria muito trabalho e mais chance de erro, e o enunciado do projeto permite bandeiras de fonte com licença livre.
- Fotos do Wikimedia Commons (licenças CC BY, CC BY-SA, CC0 e domínio público), com autor e licença de cada uma na página Sobre e em `docs/referencias.md`.
- `crypto.subtle` (já vem no navegador): calcula o hash da senha. Não é biblioteca externa.

## Documentação

- `docs/cores.md`: paleta dos temas, motivo de cada cor e tabela de contraste calculada.
- `docs/decisoes.md`: decisões de design e onde cada critério do WCAG e cada heurística de Nielsen foi aplicado.
- `docs/referencias.md`: fontes, ferramentas e IAs usadas.
- `CHANGELOG.md`: o que mudou em cada versão.

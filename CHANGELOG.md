# Histórico de versões

O que mudou em cada versão do projeto, da mais nova para a mais antiga.

## A caminho da v1.0 (ainda sem marca)

- Projeto enviado ao GitHub (ramo `main` e marcas de versão).
- Link do site publicado no rodapé das 7 páginas, na página Sobre e no README.
- Passo a passo de publicação no GitHub Pages no README.
- Anexo de código (`docs/anexo-codigo.md`), gerado por `scripts/gerar-anexo.js`.
- Site publicado no GitHub Pages: https://vitorzago1.github.io/album-copa-2026/
- As 254 verificações automáticas passam também no endereço publicado.
- Duas páginas de teste, fora do site entregue, para escolher efeitos: `laboratorio.html` (24 ideias) e `laboratorio-2.html` (8 cenas presas à rolagem).
- Página inicial refeita como uma apresentação em oito cenas presas à rolagem: retícula que forma a marca, frase que acende, pacotinho em 3D, álbum em 3D, mergulho na figurinha, números que contam, faixa dos 12 grupos e voo pelas figurinhas.
- Toda cena tem uma versão parada, usada com "Reduzir animações", com letra maior, com mais espaço no texto e sem JavaScript.
- Painel de acessibilidade: nova opção "Mostrar as animações, mesmo com o aparelho pedindo menos". Aparece só quando o aparelho pede menos movimento.
- Aviso na página inicial, com botão, para quem vê a versão parada por causa do aparelho.
- Saiu da abertura a página de amostra com três vagas: o álbum em 3D faz esse papel.
- 81 verificações automáticas novas (335 no total).
- Pacotinho em 3D, com a biblioteca Three.js r128 (a única do site, guardada em `js/vendor/`).
- Cena do pacotinho da página inicial com sequência de quadros: 90 imagens por tema, escolhidas pela rolagem. O pacotinho de CSS fica como plano B.
- Página Pacotinhos: o pacotinho fechado é o modelo 3D ao vivo, que inclina com o ponteiro e rasga mostrando o lado prateado. Sem WebGL, fica o de CSS.
- Ferramenta `scripts/quadros.html`, que gera os quadros.
- Crédito da Three.js na página Sobre e em `docs/referencias.md`.
- 34 verificações automáticas novas (369 no total).
- Nove efeitos escolhidos no primeiro laboratório: lendária holográfica, colar com batida, carimbo de conquista, rasgo em serra e saída em leque no pacotinho, virar a página entre as 7 páginas, casas do álbum que assentam ao rolar, placar girando, retícula que acende em volta do mouse e traço que se desenha (campo atrás dos números e no fim do álbum).
- Corrigido: a figurinha recém-colada passava alguns pixels da beirada da tela durante a animação.
- 47 verificações automáticas novas (416 no total).
- Fundo das 7 páginas com quatro papéis por tema (rosa, pêssego, menta e lilás; no escuro, azul, roxo, petróleo e vinho), com passagem em retícula entre eles. A tinta continua uma só.
- Linhas de campo bem fracas desenhadas no fundo: círculo central, grande área, cantos e cruzes de registro.
- Script `scripts/gerar-fundo.js`, que desenha a tira dos papéis com as cores do `css/tokens.css`.
- Aviso "Desça para continuar" nas oito cenas da página inicial.
- Corrigido: em janela com menos de 640 px de altura, o link "Ver o Grupo no álbum" ficava muito perto do pé do palco.
- Script de contraste confere também os papéis novos e o texto sobre as linhas do fundo: 372 pares, 0 reprovados.
- 37 verificações automáticas novas (453 no total).
- Fundo ilustrado: colagem de papel recortado por cima dos papéis (varal de bandeirinhas, estádio, figurinhas, apito, tática, bola, trave, camisa, escanteio, pacotinho, cronômetro, cartões, estrelas e confete), desenhada pelo `scripts/gerar-fundo.js` em `assets/img/fundo/`.
- Duas cores novas para os recortes: realce e destaque. Contraste: 396 pares, 0 reprovados.
- Grão e manchas de papel no fundo, feitos com filtro de ruído do SVG.
- As linhas de campo cinza saíram; a faixa verde ganhou linhas de giz.
- No celular, o desenho do fundo fica com metade do tamanho.
- Abertura da página inicial: convite centralizado, com os pontinhos contornando o texto.
- Corrigido: os botões da abertura ficavam 26 px fora do centro.
- 39 verificações automáticas novas (490 no total).
- A frase "São 48 seleções..." deixou de ser cena presa à rolagem: acende sozinha quando aparece na tela.
- Os 12 grupos viraram um carrossel, com botões, indicadores de A a L e rolagem para os lados. A página inicial ficou com seis cenas.
- Papéis do fundo e amarelo dos recortes com cores mais vivas. Contraste: 396 pares, 0 reprovados.
- "Reduzir animações" passou a tirar também o tempo de espera das transições.
- 30 verificações automáticas novas (510 no total).
- Retrato novo nas figurinhas de jogador: uma pessoa desenhada (rosto, cabelo em quatro cortes, pescoço, camisa com gola e número), no lugar do boneco de círculo e meio círculo. Continua genérico e sem foto.
- Bandeirinha da seleção no canto de cada figurinha de jogador.
- 22 verificações automáticas novas (532 no total).
- Comentários retirados de todo o código (HTML, CSS e JavaScript). A biblioteca Three.js fica como veio, com a licença.

## v0.4-acessibilidade (20/11/2026)

- Auditoria de estrutura em 15 telas e teste só com o teclado em 9 telas, sem problemas restantes.
- Corrigido: o recado de "Desfazer" podia cobrir os últimos links do rodapé quando eles recebiam o foco.
- "Mais espaço no texto" passou a valer também para botões, campos e figurinhas.
- Zoom de 200% e de 400% conferido nas 7 páginas, sem rolagem lateral.
- Script de contraste confere também as cores das 48 seleções: 236 pares, 0 reprovados.
- Tabela "Onde está cada item pedido pelo professor" no README.

- Página Entrar: criar conta, entrar e sair, com a senha guardada só como hash (SHA-256 com sal). Simulação, sem servidor.
- Álbum separado por conta; as figurinhas de visitante vão para a conta nova; o menu mostra "Minha conta".
- Página Contato: formulário com validação, resumo dos erros e mensagem de sucesso anunciada. Envio simulado.
- Página Trocas: repetidas, faltantes, lista para copiar ou mandar pelo WhatsApp e banca de trocas (simulação).
- Nova conquista: "Primeira troca".
- Carrossel das 16 sedes na página inicial, com fotos dos estádios mostradas em uma tinta só.
- Dados das 16 sedes em `js/dados.js`, com fonte.
- Página Sobre: o que é o projeto, o que é simulado, créditos e fontes dos dados.
- Crédito das fotos no rodapé.
- Álbum completo: 12 grupos, 48 seleções e 288 figurinhas, com fonte em cada registro.
- "Depois do grupo" de todas as seleções, inclusive Brasil e Marrocos (antes "a confirmar").
- Página "Como terminou" no fim do álbum: campeã, quatro primeiros, final e prêmios.
- Índice de grupos no topo do álbum.
- Bandeiras das 48 seleções.
- Na página de trocas, a lista do que falta fica em uma gaveta quando é longa.

## v0.3-album (20/11/2026)

- Dados do Grupo C em `js/dados.js`: 4 seleções e 24 figurinhas, com fonte em cada registro.
- Página do álbum: página dupla por seleção, casas numeradas, placar total, por grupo e por seleção.
- Figurinha que vira (clique, Enter ou Espaço), com posição, clube e curiosidade no verso.
- Colar arrastando ou pelo botão "Colar", com "Desfazer".
- Busca, abas (Todas, Tenho, Faltam, Repetidas) e filtros (grupo, seleção, posição, raridade).
- Pacotinho do dia com abertura animada, figurinhas reveladas uma a uma e opção de colar as novas direto.
- Repetidas com contador, cartela da sequência de dias e 6 conquistas que valem pacotinho extra.
- Progresso guardado no navegador, separado por usuário.
- Página inicial mostra o progresso de verdade.
- Modo demonstração na página Sobre: ganhar pacotinhos extras e zerar o álbum, com confirmação.
- Bandeiras das 4 seleções (`flag-icons`, licença MIT) e crédito no rodapé.
- Script de contraste: 140 pares de cor, 0 reprovados.

## v0.2-design (19/11/2026)

- Direção visual "Uma tinta só" aplicada: papel rosa com tinta azul no tema claro, papel azul com tinta rosa no escuro.
- Cores por função em `css/tokens.css`, com tema claro, tema escuro e duas versões de alto contraste.
- Script `scripts/contraste.js` e tabela `docs/cores.md`: 128 pares de cor, 0 reprovados.
- Fontes Londrina Solid e Atkinson Hyperlegible Next guardadas no projeto.
- Componentes: botão, etiqueta, cartão, cupom, vaga, figurinha (comum, brilhante, lendária), tira de grupos, passos e campo de formulário.
- Painel de acessibilidade: tema, tamanho da letra, alto contraste, reduzir animações, mais espaço no texto e destacar links, com as escolhas salvas no navegador.
- Menu recolhido atrás do botão "Menu" em telas pequenas.
- Página inicial montada e guia de estilo na página Sobre.
- Ícone do site.

## v0.1-estrutura (19/11/2026)

- Pasta do projeto, git e arquivo de regras (`CLAUDE.md`).
- 7 páginas em HTML semântico: Início, Álbum, Pacotinhos, Trocas, Entrar, Contato e Sobre.
- Cabeçalho, navegação e rodapé iguais em todas as páginas.
- Link "Pular para o conteúdo" em todas as páginas.
- README com o passo a passo da construção.

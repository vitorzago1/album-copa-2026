# Histórico de versões

O que mudou em cada versão do projeto, da mais nova para a mais antiga.

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

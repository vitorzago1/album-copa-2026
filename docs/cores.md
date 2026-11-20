# Cores do site

Arquivo gerado por `node scripts/contraste.js`. Não edite à mão: mude as cores em `css/tokens.css` e rode o script de novo.

## Como ler

- Contraste é a diferença de claridade entre duas cores, de 1:1 (iguais) a 21:1 (preto no branco).
- Mínimos do WCAG 2.2: texto normal 4,5:1 (nível AA) e 7:1 (nível AAA); texto grande, bordas, ícones, anel de foco e barras 3:1.
- Direção visual: "Uma tinta só". Tema claro é tinta azul sobre papel rosa; tema escuro é tinta rosa sobre papel azul.

## Paleta e motivo de cada cor

| Cor | Token | Claro | Escuro | Onde é usada | Motivo |
|---|---|---|---|---|---|
| Papel rosa / papel azul | `--cor-fundo` | `#F6CDD7` | `#1B2A80` | Fundo de todas as páginas | Rosa claro é lido como lúdico, acolhedor e nostálgico (papel de figurinha de chiclete). No escuro, o azul profundo acalma e descansa a vista mais que o preto. |
| Papel de cupom | `--cor-superficie` | `#FDF1F4` | `#25359A` | Cartões, campos de formulário e painel | Quase branco: passa limpeza e marca o que é papel solto em cima da página. No escuro, o que está na frente fica mais claro. |
| Rosa-sombra / rebaixo | `--cor-vaga` | `#EDB5C3` | `#131D4A` | Espaço vazio da figurinha e trilho da barra de progresso | O próprio papel um tom abaixo: comunica ausência e lugar reservado sem usar cinza. |
| Azul-tinteiro / tinta rosa | `--cor-texto` | `#14204F` | `#FBE3E9` | Textos, títulos e fios | Azul-escuro transmite confiança e seriedade de coisa impressa. No escuro, um rosa quase branco é mais macio que o branco puro. |
| Tinta diluída | `--cor-texto-secundario` | `#474C7A` | `#C9B4CC` | Legendas, dicas e números das vagas | O mesmo matiz com menos força: cria hierarquia sem trazer uma cor nova. |
| Linha impressa | `--cor-borda` | `#4F5487` | `#9AA3E6` | Bordas de campo, de vaga e de cartão | Tom neutro da família da tinta: delimita sem chamar atenção, porque borda é estrutura e não mensagem. |
| Azul-caneta / caneta gel | `--cor-acao` | `#2340C4` | `#A9BEFF` | Botões e links | Azul vivo comunica clareza e decisão e respeita o costume de link azul. É a caneta: o que a pessoa faz, separado do que já veio impresso. |
| Caneta apertada | `--cor-acao-forte` | `#1A3299` | `#C5D3FF` | Botão com o mouse em cima ou pressionado | Mesma cor com mais força: confirma o toque sem mudar de matiz. No escuro clareia, porque ali a luz é que indica resposta. |
| Texto do botão | `--cor-sobre-acao` | `#FDF1F4` | `#1B2A80` | Texto escrito em cima do botão principal | A cor do papel sobre a cor da caneta: o maior contraste disponível no tema. |
| Anel de foco | `--cor-foco` | `#14204F` | `#FBE3E9` | Contorno do elemento em uso pelo teclado | A tinta mais forte do tema, para o foco ser sempre o que mais aparece na tela. |
| Vão do foco | `--cor-foco-vao` | `#FDF1F4` | `#131D4A` | Faixa entre o elemento e o anel de foco | O tom oposto ao do anel: assim o foco aparece tanto sobre fundo claro quanto sobre fundo escuro. |
| Verde-gramado | `--cor-sucesso` | `#0A5C33` | `#6EDB9B` | Mensagens de "deu certo" e selos | Verde é o sinal universal de "pode seguir" e é a cor do campo. |
| Vermelho-cartão | `--cor-erro` | `#9E001A` | `#FF9A9A` | Mensagens de erro | Vermelho interrompe e pede correção; no futebol é o cartão que para o jogo. Vem sempre com ícone e frase. |
| Etiqueta (fundo) | `--cor-etiqueta-fundo` | `#14204F` | `#FBE3E9` | Etiquetas "Nova" e "Repetida" | O negativo da tinta: destaca sem trazer cor nova, mantendo a página em uma tinta só. |
| Etiqueta (texto) | `--cor-etiqueta-texto` | `#F6CDD7` | `#1B2A80` | Texto das etiquetas | A cor do papel escrita sobre a cor da tinta. |
| Fosca | `--cor-figurinha-papel` | `#FFFFFF` | `#EFE6EC` | Figurinha comum e borda de toda figurinha | Branco é neutro e honesto: comunica o básico do álbum e faz as outras raridades valerem mais. |
| Tinta da figurinha | `--cor-figurinha-tinta` | `#14204F` | `#14204F` | Texto dentro da figurinha | A figurinha é um objeto impresso: a tinta dela não muda quando o tema muda. |
| Laminada | `--cor-prata` | `#C5CAD6` | `#AEB6C6` | Listras da figurinha brilhante | Prata é o segundo degrau do pódio: valor acima do comum, sem competir com o ouro. |
| Laminada clara | `--cor-prata-clara` | `#ECEEF3` | `#DDE1E9` | Base da figurinha brilhante | O claro e o escuro alternados é o que o olho lê como brilho de metal. |
| Holográfica | `--cor-ouro` | `#F2C230` | `#E0AC1F` | Figurinha lendária | Ouro é a cor do prêmio máximo: quente e rara na página. |
| Sombra da foto | `--cor-foto-sombra` | `#14204F` | `#131D4A` | Partes escuras das fotos dos estádios | A foto é mostrada como se fosse impressa com a tinta da página: assim ela não quebra a regra de uma tinta só e a cor continua reservada às figurinhas. |
| Luz da foto | `--cor-foto-luz` | `#F6CDD7` | `#FBE3E9` | Partes claras das fotos dos estádios | A cor do papel (no escuro, a da tinta rosa): a foto parece pertencer à página em vez de ser um retângulo colado nela. |

## Contraste: tema claro

| Uso | Frente | Fundo | Contraste | Mínimo | Resultado |
|---|---|---|---|---|---|
| Texto principal sobre o fundo da página | `#14204F` | `#F6CDD7` | 10,84:1 | 4,5:1 | Passa AAA |
| Texto principal sobre cartão, campo e painel | `#14204F` | `#FDF1F4` | 14,13:1 | 4,5:1 | Passa AAA |
| Texto de apoio sobre o fundo | `#474C7A` | `#F6CDD7` | 5,67:1 | 4,5:1 | Passa AA |
| Texto de apoio sobre cartão e campo | `#474C7A` | `#FDF1F4` | 7,38:1 | 4,5:1 | Passa AAA |
| Número e legenda dentro do espaço vazio | `#474C7A` | `#EDB5C3` | 4,65:1 | 4,5:1 | Passa AA |
| Nome impresso dentro do espaço vazio | `#14204F` | `#EDB5C3` | 8,89:1 | 4,5:1 | Passa AAA |
| Texto da aba escolhida e do dia carimbado na cartela | `#F6CDD7` | `#14204F` | 10,84:1 | 4,5:1 | Passa AAA |
| Link sobre o fundo | `#2340C4` | `#F6CDD7` | 5,62:1 | 4,5:1 | Passa AA |
| Link sobre cartão | `#2340C4` | `#FDF1F4` | 7,33:1 | 4,5:1 | Passa AAA |
| Texto do botão principal | `#FDF1F4` | `#2340C4` | 7,33:1 | 4,5:1 | Passa AAA |
| Texto do botão com o mouse em cima | `#FDF1F4` | `#1A3299` | 9,73:1 | 4,5:1 | Passa AAA |
| Mensagem de sucesso sobre o fundo | `#0A5C33` | `#F6CDD7` | 5,65:1 | 4,5:1 | Passa AA |
| Mensagem de sucesso sobre cartão | `#0A5C33` | `#FDF1F4` | 7,36:1 | 4,5:1 | Passa AAA |
| Mensagem de erro sobre o fundo | `#9E001A` | `#F6CDD7` | 5,93:1 | 4,5:1 | Passa AA |
| Mensagem de erro sobre cartão e campo | `#9E001A` | `#FDF1F4` | 7,72:1 | 4,5:1 | Passa AAA |
| Texto da etiqueta ("Nova", "Repetida") | `#F6CDD7` | `#14204F` | 10,84:1 | 4,5:1 | Passa AAA |
| Texto da figurinha comum | `#14204F` | `#FFFFFF` | 15,56:1 | 4,5:1 | Passa AAA |
| Texto da figurinha brilhante | `#14204F` | `#ECEEF3` | 13,41:1 | 4,5:1 | Passa AAA |
| Texto sobre a listra mais escura da brilhante | `#14204F` | `#C5CAD6` | 9,48:1 | 4,5:1 | Passa AAA |
| Texto da figurinha lendária | `#14204F` | `#F2C230` | 9,29:1 | 4,5:1 | Passa AAA |
| Borda de campo e de vaga sobre o fundo | `#4F5487` | `#F6CDD7` | 4,96:1 | 3:1 | Passa (3:1) |
| Borda de campo sobre cartão | `#4F5487` | `#FDF1F4` | 6,46:1 | 3:1 | Passa (3:1) |
| Moldura da vaga sobre o preenchimento da vaga | `#4F5487` | `#EDB5C3` | 4,07:1 | 3:1 | Passa (3:1) |
| Botão principal como forma sobre o fundo | `#2340C4` | `#F6CDD7` | 5,62:1 | 3:1 | Passa (3:1) |
| Botão "Colar" como forma dentro do espaço vazio | `#2340C4` | `#EDB5C3` | 4,61:1 | 3:1 | Passa (3:1) |
| Preenchimento da barra de progresso sobre o trilho | `#14204F` | `#EDB5C3` | 8,89:1 | 3:1 | Passa (3:1) |
| Texto da etiqueta colada na figurinha | `#FFFFFF` | `#14204F` | 15,56:1 | 4,5:1 | Passa AAA |
| Etiqueta da figurinha (fundo ou contorno) sobre a página | `#14204F` | `#F6CDD7` | 10,84:1 | 3:1 | Passa (3:1) |
| Os dois tons do foco, um ao lado do outro | `#14204F` | `#FDF1F4` | 14,13:1 | 3:1 | Passa (3:1) |
| Foco (anel ou vão) sobre o fundo | `#14204F` | `#F6CDD7` | 10,84:1 | 3:1 | Passa (3:1) |
| Foco (anel ou vão) sobre cartão | `#14204F` | `#FDF1F4` | 14,13:1 | 3:1 | Passa (3:1) |
| Foco (anel ou vão) sobre o espaço vazio | `#14204F` | `#EDB5C3` | 8,89:1 | 3:1 | Passa (3:1) |
| Foco (anel ou vão) sobre a figurinha | `#14204F` | `#FFFFFF` | 15,56:1 | 3:1 | Passa (3:1) |
| Foco (anel ou vão) em volta do botão principal | `#FDF1F4` | `#2340C4` | 7,33:1 | 3:1 | Passa (3:1) |
| Foco (anel ou vão) sobre área na cor da tinta | `#FDF1F4` | `#14204F` | 14,13:1 | 3:1 | Passa (3:1) |

## Contraste: tema escuro

| Uso | Frente | Fundo | Contraste | Mínimo | Resultado |
|---|---|---|---|---|---|
| Texto principal sobre o fundo da página | `#FBE3E9` | `#1B2A80` | 10,22:1 | 4,5:1 | Passa AAA |
| Texto principal sobre cartão, campo e painel | `#FBE3E9` | `#25359A` | 8,40:1 | 4,5:1 | Passa AAA |
| Texto de apoio sobre o fundo | `#C9B4CC` | `#1B2A80` | 6,44:1 | 4,5:1 | Passa AA |
| Texto de apoio sobre cartão e campo | `#C9B4CC` | `#25359A` | 5,30:1 | 4,5:1 | Passa AA |
| Número e legenda dentro do espaço vazio | `#C9B4CC` | `#131D4A` | 8,36:1 | 4,5:1 | Passa AAA |
| Nome impresso dentro do espaço vazio | `#FBE3E9` | `#131D4A` | 13,26:1 | 4,5:1 | Passa AAA |
| Texto da aba escolhida e do dia carimbado na cartela | `#1B2A80` | `#FBE3E9` | 10,22:1 | 4,5:1 | Passa AAA |
| Link sobre o fundo | `#A9BEFF` | `#1B2A80` | 6,80:1 | 4,5:1 | Passa AA |
| Link sobre cartão | `#A9BEFF` | `#25359A` | 5,60:1 | 4,5:1 | Passa AA |
| Texto do botão principal | `#1B2A80` | `#A9BEFF` | 6,80:1 | 4,5:1 | Passa AA |
| Texto do botão com o mouse em cima | `#1B2A80` | `#C5D3FF` | 8,37:1 | 4,5:1 | Passa AAA |
| Mensagem de sucesso sobre o fundo | `#6EDB9B` | `#1B2A80` | 7,26:1 | 4,5:1 | Passa AAA |
| Mensagem de sucesso sobre cartão | `#6EDB9B` | `#25359A` | 5,97:1 | 4,5:1 | Passa AA |
| Mensagem de erro sobre o fundo | `#FF9A9A` | `#1B2A80` | 6,12:1 | 4,5:1 | Passa AA |
| Mensagem de erro sobre cartão e campo | `#FF9A9A` | `#25359A` | 5,03:1 | 4,5:1 | Passa AA |
| Texto da etiqueta ("Nova", "Repetida") | `#1B2A80` | `#FBE3E9` | 10,22:1 | 4,5:1 | Passa AAA |
| Texto da figurinha comum | `#14204F` | `#EFE6EC` | 12,75:1 | 4,5:1 | Passa AAA |
| Texto da figurinha brilhante | `#14204F` | `#DDE1E9` | 11,87:1 | 4,5:1 | Passa AAA |
| Texto sobre a listra mais escura da brilhante | `#14204F` | `#AEB6C6` | 7,64:1 | 4,5:1 | Passa AAA |
| Texto da figurinha lendária | `#14204F` | `#E0AC1F` | 7,48:1 | 4,5:1 | Passa AAA |
| Borda de campo e de vaga sobre o fundo | `#9AA3E6` | `#1B2A80` | 5,18:1 | 3:1 | Passa (3:1) |
| Borda de campo sobre cartão | `#9AA3E6` | `#25359A` | 4,26:1 | 3:1 | Passa (3:1) |
| Moldura da vaga sobre o preenchimento da vaga | `#9AA3E6` | `#131D4A` | 6,72:1 | 3:1 | Passa (3:1) |
| Botão principal como forma sobre o fundo | `#A9BEFF` | `#1B2A80` | 6,80:1 | 3:1 | Passa (3:1) |
| Botão "Colar" como forma dentro do espaço vazio | `#A9BEFF` | `#131D4A` | 8,83:1 | 3:1 | Passa (3:1) |
| Preenchimento da barra de progresso sobre o trilho | `#FBE3E9` | `#131D4A` | 13,26:1 | 3:1 | Passa (3:1) |
| Texto da etiqueta colada na figurinha | `#EFE6EC` | `#14204F` | 12,75:1 | 4,5:1 | Passa AAA |
| Etiqueta da figurinha (fundo ou contorno) sobre a página | `#EFE6EC` | `#1B2A80` | 10,18:1 | 3:1 | Passa (3:1) |
| Os dois tons do foco, um ao lado do outro | `#FBE3E9` | `#131D4A` | 13,26:1 | 3:1 | Passa (3:1) |
| Foco (anel ou vão) sobre o fundo | `#FBE3E9` | `#1B2A80` | 10,22:1 | 3:1 | Passa (3:1) |
| Foco (anel ou vão) sobre cartão | `#FBE3E9` | `#25359A` | 8,40:1 | 3:1 | Passa (3:1) |
| Foco (anel ou vão) sobre o espaço vazio | `#FBE3E9` | `#131D4A` | 13,26:1 | 3:1 | Passa (3:1) |
| Foco (anel ou vão) sobre a figurinha | `#131D4A` | `#EFE6EC` | 13,21:1 | 3:1 | Passa (3:1) |
| Foco (anel ou vão) em volta do botão principal | `#131D4A` | `#A9BEFF` | 8,83:1 | 3:1 | Passa (3:1) |
| Foco (anel ou vão) sobre área na cor da tinta | `#131D4A` | `#FBE3E9` | 13,26:1 | 3:1 | Passa (3:1) |

## Contraste: alto contraste, claro

| Uso | Frente | Fundo | Contraste | Mínimo | Resultado |
|---|---|---|---|---|---|
| Texto principal sobre o fundo da página | `#000000` | `#FFFFFF` | 21,00:1 | 4,5:1 | Passa AAA |
| Texto principal sobre cartão, campo e painel | `#000000` | `#FFFFFF` | 21,00:1 | 4,5:1 | Passa AAA |
| Texto de apoio sobre o fundo | `#1F1F1F` | `#FFFFFF` | 16,48:1 | 4,5:1 | Passa AAA |
| Texto de apoio sobre cartão e campo | `#1F1F1F` | `#FFFFFF` | 16,48:1 | 4,5:1 | Passa AAA |
| Número e legenda dentro do espaço vazio | `#1F1F1F` | `#FFFFFF` | 16,48:1 | 4,5:1 | Passa AAA |
| Nome impresso dentro do espaço vazio | `#000000` | `#FFFFFF` | 21,00:1 | 4,5:1 | Passa AAA |
| Texto da aba escolhida e do dia carimbado na cartela | `#FFFFFF` | `#000000` | 21,00:1 | 4,5:1 | Passa AAA |
| Link sobre o fundo | `#0A1FA8` | `#FFFFFF` | 11,84:1 | 4,5:1 | Passa AAA |
| Link sobre cartão | `#0A1FA8` | `#FFFFFF` | 11,84:1 | 4,5:1 | Passa AAA |
| Texto do botão principal | `#FFFFFF` | `#0A1FA8` | 11,84:1 | 4,5:1 | Passa AAA |
| Texto do botão com o mouse em cima | `#FFFFFF` | `#06157A` | 15,04:1 | 4,5:1 | Passa AAA |
| Mensagem de sucesso sobre o fundo | `#00471D` | `#FFFFFF` | 10,94:1 | 4,5:1 | Passa AAA |
| Mensagem de sucesso sobre cartão | `#00471D` | `#FFFFFF` | 10,94:1 | 4,5:1 | Passa AAA |
| Mensagem de erro sobre o fundo | `#8A0014` | `#FFFFFF` | 10,04:1 | 4,5:1 | Passa AAA |
| Mensagem de erro sobre cartão e campo | `#8A0014` | `#FFFFFF` | 10,04:1 | 4,5:1 | Passa AAA |
| Texto da etiqueta ("Nova", "Repetida") | `#FFFFFF` | `#000000` | 21,00:1 | 4,5:1 | Passa AAA |
| Texto da figurinha comum | `#000000` | `#FFFFFF` | 21,00:1 | 4,5:1 | Passa AAA |
| Texto da figurinha brilhante | `#000000` | `#FFFFFF` | 21,00:1 | 4,5:1 | Passa AAA |
| Texto sobre a listra mais escura da brilhante | `#000000` | `#D9D9D9` | 14,88:1 | 4,5:1 | Passa AAA |
| Texto da figurinha lendária | `#000000` | `#FFE066` | 16,11:1 | 4,5:1 | Passa AAA |
| Borda de campo e de vaga sobre o fundo | `#000000` | `#FFFFFF` | 21,00:1 | 3:1 | Passa (3:1) |
| Borda de campo sobre cartão | `#000000` | `#FFFFFF` | 21,00:1 | 3:1 | Passa (3:1) |
| Moldura da vaga sobre o preenchimento da vaga | `#000000` | `#FFFFFF` | 21,00:1 | 3:1 | Passa (3:1) |
| Botão principal como forma sobre o fundo | `#0A1FA8` | `#FFFFFF` | 11,84:1 | 3:1 | Passa (3:1) |
| Botão "Colar" como forma dentro do espaço vazio | `#0A1FA8` | `#FFFFFF` | 11,84:1 | 3:1 | Passa (3:1) |
| Preenchimento da barra de progresso sobre o trilho | `#000000` | `#FFFFFF` | 21,00:1 | 3:1 | Passa (3:1) |
| Texto da etiqueta colada na figurinha | `#FFFFFF` | `#000000` | 21,00:1 | 4,5:1 | Passa AAA |
| Etiqueta da figurinha (fundo ou contorno) sobre a página | `#000000` | `#FFFFFF` | 21,00:1 | 3:1 | Passa (3:1) |
| Os dois tons do foco, um ao lado do outro | `#0A1FA8` | `#FFFFFF` | 11,84:1 | 3:1 | Passa (3:1) |
| Foco (anel ou vão) sobre o fundo | `#0A1FA8` | `#FFFFFF` | 11,84:1 | 3:1 | Passa (3:1) |
| Foco (anel ou vão) sobre cartão | `#0A1FA8` | `#FFFFFF` | 11,84:1 | 3:1 | Passa (3:1) |
| Foco (anel ou vão) sobre o espaço vazio | `#0A1FA8` | `#FFFFFF` | 11,84:1 | 3:1 | Passa (3:1) |
| Foco (anel ou vão) sobre a figurinha | `#0A1FA8` | `#FFFFFF` | 11,84:1 | 3:1 | Passa (3:1) |
| Foco (anel ou vão) em volta do botão principal | `#FFFFFF` | `#0A1FA8` | 11,84:1 | 3:1 | Passa (3:1) |
| Foco (anel ou vão) sobre área na cor da tinta | `#FFFFFF` | `#000000` | 21,00:1 | 3:1 | Passa (3:1) |

## Contraste: alto contraste, escuro

| Uso | Frente | Fundo | Contraste | Mínimo | Resultado |
|---|---|---|---|---|---|
| Texto principal sobre o fundo da página | `#FFFFFF` | `#000000` | 21,00:1 | 4,5:1 | Passa AAA |
| Texto principal sobre cartão, campo e painel | `#FFFFFF` | `#000000` | 21,00:1 | 4,5:1 | Passa AAA |
| Texto de apoio sobre o fundo | `#E6E6E6` | `#000000` | 16,83:1 | 4,5:1 | Passa AAA |
| Texto de apoio sobre cartão e campo | `#E6E6E6` | `#000000` | 16,83:1 | 4,5:1 | Passa AAA |
| Número e legenda dentro do espaço vazio | `#E6E6E6` | `#000000` | 16,83:1 | 4,5:1 | Passa AAA |
| Nome impresso dentro do espaço vazio | `#FFFFFF` | `#000000` | 21,00:1 | 4,5:1 | Passa AAA |
| Texto da aba escolhida e do dia carimbado na cartela | `#000000` | `#FFFFFF` | 21,00:1 | 4,5:1 | Passa AAA |
| Link sobre o fundo | `#9CB4FF` | `#000000` | 10,39:1 | 4,5:1 | Passa AAA |
| Link sobre cartão | `#9CB4FF` | `#000000` | 10,39:1 | 4,5:1 | Passa AAA |
| Texto do botão principal | `#000000` | `#9CB4FF` | 10,39:1 | 4,5:1 | Passa AAA |
| Texto do botão com o mouse em cima | `#000000` | `#C2D0FF` | 13,76:1 | 4,5:1 | Passa AAA |
| Mensagem de sucesso sobre o fundo | `#7CF0AD` | `#000000` | 14,92:1 | 4,5:1 | Passa AAA |
| Mensagem de sucesso sobre cartão | `#7CF0AD` | `#000000` | 14,92:1 | 4,5:1 | Passa AAA |
| Mensagem de erro sobre o fundo | `#FFB3B3` | `#000000` | 12,35:1 | 4,5:1 | Passa AAA |
| Mensagem de erro sobre cartão e campo | `#FFB3B3` | `#000000` | 12,35:1 | 4,5:1 | Passa AAA |
| Texto da etiqueta ("Nova", "Repetida") | `#000000` | `#FFFFFF` | 21,00:1 | 4,5:1 | Passa AAA |
| Texto da figurinha comum | `#000000` | `#FFFFFF` | 21,00:1 | 4,5:1 | Passa AAA |
| Texto da figurinha brilhante | `#000000` | `#FFFFFF` | 21,00:1 | 4,5:1 | Passa AAA |
| Texto sobre a listra mais escura da brilhante | `#000000` | `#D9D9D9` | 14,88:1 | 4,5:1 | Passa AAA |
| Texto da figurinha lendária | `#000000` | `#FFE066` | 16,11:1 | 4,5:1 | Passa AAA |
| Borda de campo e de vaga sobre o fundo | `#FFFFFF` | `#000000` | 21,00:1 | 3:1 | Passa (3:1) |
| Borda de campo sobre cartão | `#FFFFFF` | `#000000` | 21,00:1 | 3:1 | Passa (3:1) |
| Moldura da vaga sobre o preenchimento da vaga | `#FFFFFF` | `#000000` | 21,00:1 | 3:1 | Passa (3:1) |
| Botão principal como forma sobre o fundo | `#9CB4FF` | `#000000` | 10,39:1 | 3:1 | Passa (3:1) |
| Botão "Colar" como forma dentro do espaço vazio | `#9CB4FF` | `#000000` | 10,39:1 | 3:1 | Passa (3:1) |
| Preenchimento da barra de progresso sobre o trilho | `#FFFFFF` | `#000000` | 21,00:1 | 3:1 | Passa (3:1) |
| Texto da etiqueta colada na figurinha | `#FFFFFF` | `#000000` | 21,00:1 | 4,5:1 | Passa AAA |
| Etiqueta da figurinha (fundo ou contorno) sobre a página | `#FFFFFF` | `#000000` | 21,00:1 | 3:1 | Passa (3:1) |
| Os dois tons do foco, um ao lado do outro | `#FFD60A` | `#000000` | 14,88:1 | 3:1 | Passa (3:1) |
| Foco (anel ou vão) sobre o fundo | `#FFD60A` | `#000000` | 14,88:1 | 3:1 | Passa (3:1) |
| Foco (anel ou vão) sobre cartão | `#FFD60A` | `#000000` | 14,88:1 | 3:1 | Passa (3:1) |
| Foco (anel ou vão) sobre o espaço vazio | `#FFD60A` | `#000000` | 14,88:1 | 3:1 | Passa (3:1) |
| Foco (anel ou vão) sobre a figurinha | `#000000` | `#FFFFFF` | 21,00:1 | 3:1 | Passa (3:1) |
| Foco (anel ou vão) em volta do botão principal | `#000000` | `#9CB4FF` | 10,39:1 | 3:1 | Passa (3:1) |
| Foco (anel ou vão) sobre área na cor da tinta | `#000000` | `#FFFFFF` | 21,00:1 | 3:1 | Passa (3:1) |

## Contraste: cores das seleções

O número é escrito sobre a camisa e a silhueta (na tinta da figurinha) fica sobre o campo. Mínimo de 3:1 nos dois casos. A última coluna é o pior resultado entre a tinta normal e a do alto contraste.

| Seleção | Campo | Camisa | Número | Número sobre a camisa | Silhueta sobre o campo | Resultado |
|---|---|---|---|---|---|---|
| México | `#D9534F` | `#0B6B3A` | `#FFFFFF` | 6,61:1 | 3,93:1 | Passa (3:1) |
| África do Sul | `#2E9E6B` | `#F7C531` | `#0B5A3C` | 5,11:1 | 4,61:1 | Passa (3:1) |
| Coreia do Sul | `#DCE6F5` | `#D8242F` | `#FFFFFF` | 4,98:1 | 12,36:1 | Passa (3:1) |
| Tchéquia | `#5B8BD6` | `#C8102E` | `#FFFFFF` | 5,88:1 | 4,53:1 | Passa (3:1) |
| Canadá | `#F0E6E6` | `#D52B1E` | `#FFFFFF` | 5,01:1 | 12,72:1 | Passa (3:1) |
| Bósnia e Herzegovina | `#F2D34B` | `#1F4AA8` | `#FFFFFF` | 8,07:1 | 10,52:1 | Passa (3:1) |
| Catar | `#E9DDE2` | `#8A1538` | `#FFFFFF` | 9,35:1 | 11,79:1 | Passa (3:1) |
| Suíça | `#EADADA` | `#D52B1E` | `#FFFFFF` | 5,01:1 | 11,52:1 | Passa (3:1) |
| Brasil | `#228B59` | `#F7D417` | `#1B3F8F` | 6,68:1 | 3,64:1 | Passa (3:1) |
| Marrocos | `#2E9B5F` | `#C1272D` | `#FFFFFF` | 5,84:1 | 4,42:1 | Passa (3:1) |
| Haiti | `#DC2B47` | `#00209F` | `#FFFFFF` | 12,30:1 | 3,32:1 | Passa (3:1) |
| Escócia | `#DCE6F5` | `#005EB8` | `#FFFFFF` | 6,38:1 | 12,36:1 | Passa (3:1) |
| Estados Unidos | `#DE5B64` | `#FFFFFF` | `#1B2A6B` | 13,21:1 | 4,29:1 | Passa (3:1) |
| Paraguai | `#5B8BD6` | `#D52B1E` | `#FFFFFF` | 5,01:1 | 4,53:1 | Passa (3:1) |
| Austrália | `#2E9E6B` | `#F7C531` | `#0B5A3C` | 5,11:1 | 4,61:1 | Passa (3:1) |
| Turquia | `#F0E0E0` | `#E30A17` | `#FFFFFF` | 4,86:1 | 12,19:1 | Passa (3:1) |
| Alemanha | `#E6B93C` | `#FFFFFF` | `#1A1A1A` | 17,40:1 | 8,43:1 | Passa (3:1) |
| Curaçao | `#F2D34B` | `#1F4AA8` | `#FFFFFF` | 8,07:1 | 10,52:1 | Passa (3:1) |
| Costa do Marfim | `#3FA36B` | `#F28C28` | `#14204F` | 6,34:1 | 4,94:1 | Passa (3:1) |
| Equador | `#5B8BD6` | `#F7D417` | `#1B3F8F` | 6,68:1 | 4,53:1 | Passa (3:1) |
| Holanda | `#F2E2D0` | `#F36C21` | `#1A1A1A` | 5,78:1 | 12,28:1 | Passa (3:1) |
| Japão | `#E8ECF5` | `#1D3C8F` | `#FFFFFF` | 10,02:1 | 13,15:1 | Passa (3:1) |
| Suécia | `#5B8BD6` | `#F7D417` | `#1B4F9C` | 5,44:1 | 4,53:1 | Passa (3:1) |
| Tunísia | `#DE5B64` | `#FFFFFF` | `#C8102E` | 5,88:1 | 4,29:1 | Passa (3:1) |
| Bélgica | `#E6B93C` | `#C8102E` | `#FFFFFF` | 5,88:1 | 8,43:1 | Passa (3:1) |
| Egito | `#E9E2D0` | `#C8102E` | `#FFFFFF` | 5,88:1 | 12,05:1 | Passa (3:1) |
| Irã | `#3FA36B` | `#FFFFFF` | `#C8102E` | 5,88:1 | 4,94:1 | Passa (3:1) |
| Nova Zelândia | `#A9B1BB` | `#FFFFFF` | `#1A1A1A` | 17,40:1 | 7,18:1 | Passa (3:1) |
| Espanha | `#F1BF00` | `#C60B1E` | `#FFFFFF` | 6,06:1 | 9,04:1 | Passa (3:1) |
| Cabo Verde | `#DDE3F2` | `#1F4AA8` | `#FFFFFF` | 8,07:1 | 12,11:1 | Passa (3:1) |
| Arábia Saudita | `#E6EFE9` | `#0B6B3A` | `#FFFFFF` | 6,61:1 | 13,26:1 | Passa (3:1) |
| Uruguai | `#F2F2EA` | `#6CACE4` | `#14204F` | 6,42:1 | 13,83:1 | Passa (3:1) |
| França | `#DE5B64` | `#1F3A8A` | `#FFFFFF` | 10,34:1 | 4,29:1 | Passa (3:1) |
| Senegal | `#F2D34B` | `#FFFFFF` | `#0B6B3A` | 6,61:1 | 10,52:1 | Passa (3:1) |
| Iraque | `#E9E2D0` | `#0B7A45` | `#FFFFFF` | 5,41:1 | 12,05:1 | Passa (3:1) |
| Noruega | `#5B8BD6` | `#C8102E` | `#FFFFFF` | 5,88:1 | 4,53:1 | Passa (3:1) |
| Argentina | `#F3F3F0` | `#75AADB` | `#14204F` | 6,32:1 | 14,00:1 | Passa (3:1) |
| Argélia | `#3FA36B` | `#FFFFFF` | `#0B6B3A` | 6,61:1 | 4,94:1 | Passa (3:1) |
| Áustria | `#F0E6E6` | `#D52B1E` | `#FFFFFF` | 5,01:1 | 12,72:1 | Passa (3:1) |
| Jordânia | `#B9BEC6` | `#FFFFFF` | `#C8102E` | 5,88:1 | 8,33:1 | Passa (3:1) |
| Portugal | `#2E9E6B` | `#C8102E` | `#FFFFFF` | 5,88:1 | 4,61:1 | Passa (3:1) |
| RD Congo | `#F2D34B` | `#1F6FD0` | `#FFFFFF` | 4,95:1 | 10,52:1 | Passa (3:1) |
| Uzbequistão | `#6FC0EA` | `#FFFFFF` | `#1F5FBF` | 6,09:1 | 7,71:1 | Passa (3:1) |
| Colômbia | `#5B8BD6` | `#F7D417` | `#1B3F8F` | 6,68:1 | 4,53:1 | Passa (3:1) |
| Inglaterra | `#DE5B64` | `#FFFFFF` | `#1B2A6B` | 13,21:1 | 4,29:1 | Passa (3:1) |
| Croácia | `#F2F2F2` | `#E03A3E` | `#FFFFFF` | 4,34:1 | 13,90:1 | Passa (3:1) |
| Gana | `#E6B93C` | `#FFFFFF` | `#1A1A1A` | 17,40:1 | 8,43:1 | Passa (3:1) |
| Panamá | `#5B8BD6` | `#D52B1E` | `#FFFFFF` | 5,01:1 | 4,53:1 | Passa (3:1) |

## Resumo

- Pares conferidos: 236 (35 pares da página em 4 temas, mais 2 pares do desenho de cada uma das 48 seleções).
- Reprovados: 0.
- A raridade da figurinha nunca depende só da cor: vem sempre com palavra, ícone e textura.
- A seleção de cada figurinha também vem escrita: as cores da camisa não são a única informação.

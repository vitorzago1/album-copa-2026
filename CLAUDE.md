# Colei! Álbum de figurinhas da Copa 2026

Projeto Final de Desenvolvimento de Interfaces (CEUB, 2/2026), do aluno Vitor Zago Pontes Morais, para o Prof. Dr. Felipe Batista da Silva. Vale nota, será apresentado e vai para o portfólio.

O prompt mestre do projeto é a fonte da verdade. Este arquivo resume as regras do dia a dia.

## Como trabalhar com o Vitor

- Falar em português, passo a passo, com analogias do dia a dia. Explicar cada termo técnico na primeira vez que aparecer.
- Ser objetivo: o que foi feito, o que falta, o que precisa dele.
- Ajuste pontual é ajuste pontual: mudar só o necessário, sem reescrever arquivos inteiros.
- Em conflito ou dúvida, perguntar em vez de adivinhar.
- Ao fim de cada etapa: fazer commit e dizer o que testar.
- Nunca fazer `push` sem avisar antes.
- Parar nos pontos de aprovação do plano de etapas (seção 17 do prompt mestre).

## Regras técnicas

- HTML, CSS e JavaScript puros. Sem framework, sem etapa de build.
- O site precisa funcionar abrindo o `index.html` direto do computador (`file://`) e também no GitHub Pages. Por isso:
  - dados ficam em `js/dados.js`, nunca em `.json` carregado com `fetch`;
  - scripts comuns (`<script src>`), sem `type="module"`;
  - SVG escrito dentro do HTML, sem `<use>` apontando para outro arquivo;
  - fontes guardadas em `assets/fontes/`, sem depender de outro site.
- Código comentado em português simples, explicando o porquê. Clareza vale mais que esperteza: o Vitor precisa explicar cada parte na apresentação.
- Mobile first. Tem que funcionar em 320 px de largura.
- Biblioteca externa só com autorização dele, e justificada no README. Autorizada até agora: Three.js r128 (em 21/11/2026), só para o pacotinho em 3D. Ela roda na página Pacotinhos e na ferramenta `scripts/quadros.html`; a página inicial usa as imagens já prontas.
- Cabeçalho e rodapé são repetidos nas 7 páginas. Ao mudar um, mudar nos 7 arquivos.

## Acessibilidade (WCAG 2.2 nível AA, nos dois temas)

- Contraste: texto normal 4,5:1; texto grande e componentes 3:1. Toda cor nova entra em `css/tokens.css` e é conferida com `node scripts/contraste.js`.
- Cor nunca é a única informação: raridade, tenho/falta, erro e status sempre com texto ou ícone.
- Tudo funciona só com teclado, com foco sempre visível.
- Arrastar sempre tem alternativa por botão.
- Movimento respeita `prefers-reduced-motion` e a chave "Reduzir animações" do painel.

## Design: direção "Uma tinta só, vários papéis"

- A página é impressa em uma tinta só: tinta azul no tema claro, tinta rosa no escuro. A cor viva só chega pelas figurinhas.
- O papel do fundo muda ao longo da página (pedido do Vitor em 22/11/2026; cores deixadas mais vivas a pedido dele em 23/11/2026): quatro papéis por tema (rosa, pêssego, menta e lilás; no escuro, azul, roxo, petróleo e vinho), com passagem em retícula. Fica tudo no `body::before` (`css/base.css`). No alto contraste o fundo é liso.
- Por cima dos papéis há uma colagem de papel recortado (estádio, bola, bandeirinhas, figurinhas...), grão e manchas de papel. O Vitor pediu isso em 22/11/2026 porque só cores ficava "seco e artificial": ele quer detalhes e imagens no fundo. Os desenhos são próprios, feitos por código no `scripts/gerar-fundo.js`, e só usam as cores de papel do `css/tokens.css` (os quatro papéis, o realce e o destaque), todas conferidas no contraste. Foto no fundo foi testada e não funcionou.
- Ao mudar uma cor de papel em `css/tokens.css` ou um desenho da colagem: rodar `node scripts/gerar-fundo.js` (redesenha o fundo) e depois `node scripts/contraste.js`.
- Na abertura da página inicial, em movimento, o convite fica centralizado e os pontinhos contornam o texto (pedido do Vitor em 22/11/2026).
- Fontes: Londrina Solid (títulos e números) e Atkinson Hyperlegible Next (leitura). No máximo essas duas famílias.
- Cantos têm significado: canto vivo é o que está impresso na página (vaga, fio); 4 px é ferramenta (botão, campo); 10 px com borda branca é o que se cola (figurinha, pacotinho, cupom).
- Só a figurinha colada tem sombra. Só o que foi posto à mão fica levemente torto.
- Linha tracejada significa picote ("dá para destacar").
- Nada de emoji no lugar de ícone, rótulos em caixa-alta, seta no fim de botão ou cards todos iguais.
- A figurinha é numerada em sequência ("Nº 127"). Não usar código de três letras mais número.
- Movimento: a página inicial é uma apresentação em seis cenas presas à rolagem (decisão do Vitor em 21/11/2026, depois dos dois laboratórios). Em 23/11/2026 ele pediu para tirar duas cenas: a frase "São 48 seleções..." virou uma animação que toca sozinha ao aparecer, e os 12 grupos viraram um carrossel. Ele não quer ter que descer a página para ver um texto ou uma lista. Nas outras páginas, o movimento só responde a uma ação da pessoa. Toda cena tem uma versão parada, usada com menos movimento, com letra maior e sem JavaScript. Toda cena em movimento mostra o aviso "Desça para continuar", criado pelo `js/cenas.js` (pedido do Vitor em 22/11/2026).
- Efeitos escolhidos pelo Vitor no laboratório 1 e já aplicados (etapa 12): lendária holográfica, colar com batida, carimbo de conquista, rasgo em serra e saída em leque, virar a página, entrar ao rolar, placar girando, retícula que acende e traço que se desenha. As outras ideias do laboratório (incluindo as texturas de fundo de lá) não foram escolhidas: não aplicar. O fundo com vários papéis não veio do laboratório; foi um pedido à parte.

## Conteúdo e direitos

- Nenhum dado inventado. Tudo o que é real (seleções, grupos, sedes, jogadores, resultados) vem de pesquisa com fonte registrada no campo `fonte`. O que não der para confirmar fica marcado como "a confirmar".
- Proibido: fotos de jogadores; logos, emblemas e mascotes da FIFA ou da Copa; escudos de federações; layout ou identidade dos álbuns da Panini; imagem sem licença.
- Toda imagem com `alt` útil (ou `alt=""` se for decorativa).

## Git

- Commits pequenos e frequentes, em português, no formato `tipo: o que mudou` (por exemplo `feat: carrossel acessível na página inicial`).
- Tags nos marcos: `v0.1-estrutura`, `v0.2-design`, `v0.3-album`, `v0.4-acessibilidade`, `v1.0-entrega-final`.
- Manter o `CHANGELOG.md` atualizado a cada versão.

## Limite da IA no relatório

A Parte C.1 do trabalho é uma redação que o Vitor escreve sem IA (WCAG, heurísticas de Nielsen, UI/UX e paletas de cores). Não escrever essa redação nem textos dissertativos que façam esse papel. Em `docs/`, ficar em fatos e tópicos objetivos sobre o site.

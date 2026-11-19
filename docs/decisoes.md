# Decisões de design

Registro curto, em tópicos, do que foi decidido e de onde cada critério aparece no site. Atualizado até a versão `v0.2-design`.

## Direção visual

- Foram propostas 3 direções: "Uma tinta só", "Rua enfeitada" e "Time de botão".
- Escolhida em 19/11/2026: **Uma tinta só**. Nome do site: **Colei!**
- Conceito: a página é impressa em uma tinta só (papel rosa com tinta azul); a cor de verdade só chega pelas figurinhas coladas.
- Tema escuro: papel e tinta trocam de lugar (papel azul com tinta rosa). Não é inversão automática de cores.
- A figurinha é um objeto impresso: a tinta dela não muda quando o tema muda.

## Regras visuais

- Cantos têm significado: canto vivo é o que está impresso na página (vaga, tira de grupos); 4 px é ferramenta (botão, campo); 10 px é o que se cola (figurinha, cartão, cupom).
- Só a figurinha colada tem sombra. No tema escuro a sombra vira contorno.
- Só o que foi posto à mão fica levemente torto (figurinha colada ou solta).
- Linha tracejada significa picote (o canhoto do cupom).
- A raridade aparece de três jeitos ao mesmo tempo: palavra, ícone (círculo, losango, estrela) e acabamento (liso, listras, trama). A cor da moldura é um quarto reforço.
- Etiquetas usam o negativo da tinta, sem cor nova.
- Numeração da figurinha em sequência ("Nº 127").
- Um único momento animado está previsto: a abertura do pacotinho.

## Tipografia

- Londrina Solid (pesos 300 e 900): títulos e números. Usada só a partir de 24 px.
- Atkinson Hyperlegible Next (pesos 400 a 800): leitura. Desenhada para diferenciar letras e números parecidos (0 e O; 1, l e I).
- Tamanhos em `rem`, para o texto inteiro crescer junto com a escolha do painel.
- Linha de texto limitada a cerca de 62 caracteres.

## Estrutura e código

- Cabeçalho e rodapé repetidos nos 7 arquivos HTML (sem ferramenta de build).
- O painel de acessibilidade é montado pelo JavaScript em um `<dialog>`; o HTML do painel fica em um lugar só (`js/tema-acessibilidade.js`).
- Sem JavaScript, o menu fica sempre aberto e os botões que dependem de script não aparecem.
- As preferências viram atributos no `<html>` (`data-tema`, `data-fonte`, `data-contraste`, `data-movimento`, `data-espacamento`, `data-links`).
- O endereço aceita atalhos, como `index.html?tema=escuro`, sem alterar o que está salvo.

## Onde cada critério do WCAG 2.2 foi aplicado

| Critério | O que foi feito | Onde |
|---|---|---|
| 1.3.1 Informações e relações | `header`, `nav`, `main`, `footer`; títulos em ordem; `fieldset` e `legend` no painel; `label` em todo campo | os 7 HTML, `js/tema-acessibilidade.js` |
| 1.4.1 Uso de cor | Raridade com palavra, ícone e textura; link sempre sublinhado; página atual com sublinhado grosso; erro com ícone e frase | `css/componentes.css`, `css/base.css` |
| 1.4.3 Contraste (mínimo) | 128 pares calculados, 0 reprovados | `docs/cores.md`, `scripts/contraste.js` |
| 1.4.4 Redimensionar texto | Medidas em `rem`; letra em 3 tamanhos (100%, 112,5% e 125%) | `css/tokens.css`, `css/acessibilidade.css` |
| 1.4.10 Refluxo | Sem rolagem lateral em 320 px, inclusive com letra maior | `css/base.css`, `css/paginas.css` |
| 1.4.11 Contraste não textual | Bordas, anel de foco e barra com pelo menos 3:1 | `docs/cores.md` |
| 1.4.12 Espaçamento de texto | Opção "Mais espaço no texto" | `css/acessibilidade.css` |
| 2.1.1 Teclado | Só botões e links nativos; painel em `<dialog>` | os 7 HTML, `js/tema-acessibilidade.js` |
| 2.3.3 e 2.2.2 Movimento | Opção "Reduzir animações" e respeito a `prefers-reduced-motion` | `css/acessibilidade.css` |
| 2.4.1 Ignorar blocos | Link "Pular para o conteúdo" | os 7 HTML, `css/base.css` |
| 2.4.3 Ordem do foco | A ordem do Tab segue a ordem da página | os 7 HTML |
| 2.4.7 Foco visível | Anel de 3 px em dois tons (anel e vão) | `css/base.css` |
| 2.4.11 Foco não encoberto | O cabeçalho não é fixo | `css/base.css` |
| 2.5.8 Tamanho do alvo | Botões e links de menu com 44 px de altura | `css/base.css`, `css/componentes.css` |
| 3.1.1 Idioma da página | `lang="pt-BR"` | os 7 HTML |
| 3.2.3 Navegação consistente | Mesmo cabeçalho e rodapé em todas as páginas | os 7 HTML |
| 4.1.2 Nome, função, valor | `aria-expanded` no botão Menu; `aria-current` na página atual; `aria-labelledby` no painel | os 7 HTML, `js/menu.js` |
| 4.1.3 Mensagens de status | Aviso com `role="status"` ao salvar uma preferência | `js/tema-acessibilidade.js` |

## Onde cada heurística de Nielsen aparece

| Heurística | Onde aparece no site (até a v0.2) |
|---|---|
| 1. Visibilidade do status do sistema | Página atual marcada no menu; aviso "Tema: Escuro." ao mudar uma preferência; tira de progresso por grupo |
| 2. Correspondência com o mundo real | Vocabulário de quem coleciona (pacotinho, colar, repetidas, falta); vaga numerada como no álbum de papel |
| 3. Controle e liberdade do usuário | "Voltar ao padrão" no painel; Esc fecha o painel e o menu |
| 4. Consistência e padrões | Mesmo cabeçalho e rodapé; link sempre sublinhado; botão principal sempre na mesma cor; cantos com significado fixo |
| 5. Prevenção de erros | Entra com os formulários (etapa 6) |
| 6. Reconhecimento em vez de memorização | Raridade escrita na própria figurinha; painel abre com as opções atuais já marcadas |
| 7. Flexibilidade e eficiência de uso | "Pular para o conteúdo"; preferências salvas; atalho pelo endereço (`?tema=escuro`) |
| 8. Estética e design minimalista | Página em uma tinta só; um único momento animado previsto |
| 9. Ajudar a reconhecer e corrigir erros | Mensagem de erro com ícone, texto e instrução de conserto (guia de estilo; formulários na etapa 6) |
| 10. Ajuda e documentação | Seção "Como funciona" na página inicial; texto de apoio no painel |

## Verificação feita na v0.2

- 42 verificações automáticas no Microsoft Edge sem janela: fontes locais, temas, tema automático, painel (abrir, escolher, salvar, Esc, volta do foco), ordem do Tab, 320 px sem rolagem lateral, alvos de toque, 7 páginas sem erro no console.
- Ainda não verificado: leitor de tela real (NVDA), Firefox e Safari.

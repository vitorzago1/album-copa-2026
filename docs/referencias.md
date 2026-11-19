# Referências

Tudo o que o projeto usa e de onde veio. Atualizado até a versão `v0.2-design`.

## Fontes tipográficas

| Fonte | Autor | Licença | Origem | Onde está |
|---|---|---|---|---|
| Londrina Solid | Marcelo Magalhães | SIL Open Font License 1.1 | Google Fonts: https://fonts.google.com/specimen/Londrina+Solid | `assets/fontes/londrina-solid-300.woff2` e `-900.woff2` |
| Atkinson Hyperlegible Next | Braille Institute of America e parceiros | SIL Open Font License 1.1 | Google Fonts: https://fonts.google.com/specimen/Atkinson+Hyperlegible+Next | `assets/fontes/atkinson-next-*.woff2` |

As duas licenças estão copiadas em `assets/fontes/LICENCA-*.txt`, do repositório oficial https://github.com/google/fonts.

## Imagens

- Retrato das figurinhas: desenho próprio em SVG (busto genérico, sem representar nenhuma pessoa).
- Ícone do site (`assets/svg/favicon.svg`): desenho próprio.
- Bandeiras: a definir na etapa dos dados (previsto: biblioteca `flag-icons`, licença MIT).

## Dados da Copa de 2026

A preencher na etapa de pesquisa. Cada registro de `js/dados.js` terá um campo `fonte`.

## Normas e documentação das técnicas usadas

- W3C. Web Content Accessibility Guidelines (WCAG) 2.2: https://www.w3.org/TR/WCAG22/
- W3C. Definição de razão de contraste, usada em `scripts/contraste.js`: https://www.w3.org/TR/WCAG22/#dfn-contrast-ratio
- W3C WAI. ARIA Authoring Practices Guide, padrão de diálogo modal: https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/
- W3C WAI. ARIA Authoring Practices Guide, padrão de abrir e fechar (disclosure), usado no botão Menu: https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/
- MDN Web Docs. Elemento `<dialog>`: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog
- MDN Web Docs. `prefers-color-scheme` e `prefers-reduced-motion`: https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme
- Nielsen Norman Group. 10 Usability Heuristics for User Interface Design: https://www.nngroup.com/articles/ten-usability-heuristics/

## Ferramentas

- Git: histórico de versões.
- Node.js: roda o `scripts/contraste.js`.
- Microsoft Edge em modo sem janela: testes automáticos e prints.

## Inteligência artificial

- **Claude Code (modelo Claude, da Anthropic).** Usado para:
  - propor e comparar as direções visuais (5 designers de IA independentes, dos quais 3 concluíram, e 3 jurados de IA);
  - escrever o HTML, o CSS, o JavaScript e os scripts, a partir do prompt e das escolhas do aluno;
  - calcular o contraste das cores e rodar os testes automáticos;
  - escrever esta documentação técnica.
- A redação da Parte C.1 do relatório não usa IA.
- Outras IAs usadas pelo aluno: a preencher pelo Vitor, se houver.

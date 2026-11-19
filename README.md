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

## Tecnologias

- HTML, CSS e JavaScript puros, sem framework e sem etapa de build.
- Git e GitHub para o histórico de versões.

## Documentação

- `docs/decisoes.md`: decisões de design e onde cada critério foi aplicado.
- `docs/referencias.md`: fontes, ferramentas e IAs usadas.
- `CHANGELOG.md`: o que mudou em cada versão.

// ============================================================================
// cenas.js
// ----------------------------------------------------------------------------
// O motor das cenas presas à rolagem. Ele não sabe o que cada cena desenha:
// só mede a rolagem e avisa cada cena do quanto ela já andou.
//
// A ideia:
//   1. A cena é uma seção bem alta (240vh = quase duas telas e meia).
//   2. Dentro dela, o palco fica grudado na tela (position: sticky, no CSS).
//   3. Enquanto a pessoa rola por dentro da cena, o motor transforma a rolagem
//      em um número de 0 a 1: o "progresso".
//   4. Cada cena tem uma função desenhar(progresso), que põe cada peça no lugar
//      certo para aquele progresso. Rolar para cima desfaz tudo.
//
// As cenas existem de dois jeitos (ver css/cenas.css):
//   - em movimento: o <html> ganha a classe "com-cenas";
//   - paradas: para quem pede menos movimento, cada cena vira uma seção comum.
//
// Quem cria as cenas da página inicial é o js/cenas-inicio.js.
// Depende de: js/figurinha.js (a função movimentoReduzido).
// ============================================================================

// ---------------------------------------------------------------------------
// Contas que as cenas usam
// ---------------------------------------------------------------------------

// Prende um número entre 0 e 1
function limitar(valor) {
  return Math.min(1, Math.max(0, valor));
}

// "Quanto deste trecho já passou?" Devolve 0 antes de "inicio", 1 depois de
// "fim" e, no meio, um valor que arranca e freia com suavidade.
// Exemplo: trecho(0.2, 0.5, p) faz uma peça se mover só entre 20% e 50% da cena.
function trecho(inicio, fim, p) {
  const t = limitar((p - inicio) / (fim - inicio));
  return t * t * (3 - 2 * t);
}

// O valor que fica entre "a" e "b": com t = 0 é "a", com t = 1 é "b"
function misturar(a, b, t) {
  return a + (b - a) * t;
}

// Um sorteio que se repete: dá sempre a mesma sequência de números "ao acaso".
// Assim a cena fica igual toda vez que a página é aberta.
function sorteador(semente) {
  return function () {
    semente = (semente * 1664525 + 1013904223) % 4294967296;
    return semente / 4294967296;
  };
}

// Tira os estilos que o JavaScript escreveu direto nos elementos,
// para eles voltarem a obedecer só ao CSS
function limparEstilos(elementos) {
  for (const elemento of elementos) elemento.removeAttribute('style');
}

// ---------------------------------------------------------------------------
// A lista de cenas
// ---------------------------------------------------------------------------

const CENAS = [];
let cenasEmMovimento = false;   // as cenas estão presas à rolagem agora?
let quadroPedido = false;       // já existe um próximo quadro agendado?

// Guarda uma cena. "cena" é um objeto com até quatro funções:
//   medir()               mede o que depende do tamanho da tela
//   desenhar(p, agora)    põe as peças no lugar para o progresso p (de 0 a 1)
//   parar()               deixa a cena pronta para ser vista parada
//   viva(agora)           (opcional) responde se a cena se mexe sozinha agora
function registrarCena(elemento, cena) {
  cena.elemento = elemento;
  cena.alvo = 0;          // o progresso que a rolagem pede agora
  cena.p = 0;             // o progresso mostrado (corre atrás do alvo, com suavidade)
  cena.naTela = false;
  cena.suja = true;       // "precisa ser redesenhada"
  cena.comecou = false;

  // O aviso "Desça para continuar", no pé do palco. Ele avisa que a cena só
  // anda com a rolagem. Por padrão aparece desde o começo da cena; o atributo
  // data-aviso-de="0.2" no HTML faz aparecer só a partir de 20%.
  // É uma ajuda para os olhos: fica fora da leitura de tela.
  cena.aviso = document.createElement('p');
  cena.aviso.className = 'cena-desca';
  cena.aviso.setAttribute('aria-hidden', 'true');
  cena.aviso.append(document.createElement('i'), 'Desça para continuar');
  elemento.querySelector('.cena-palco').append(cena.aviso);
  cena.avisoDe = Number(elemento.dataset.avisoDe || -1);

  CENAS.push(cena);
  return cena;
}

// Põe a cena direto no progresso p, sem a suavização. Usado quando um botão
// recebe o foco do teclado: ele precisa aparecer na hora, não meio segundo depois.
function mostrarJa(cena, p) {
  cena.p = p;
  cena.comecou = true;
  cena.suja = true;
}

// Alguém dentro da cena recebeu o foco do teclado e só aparece no progresso p.
// Ao dar o foco, o navegador pode rolar a página por conta própria, tentando
// "mostrar" o elemento, e com isso a cena andaria e o esconderia. Por isso a
// correção espera o próximo quadro: aí mede onde a rolagem foi parar e a põe
// no ponto certo.
function focarNaCena(cena, p) {
  requestAnimationFrame(function () {
    medirRolagem();
    if (Math.abs(cena.alvo - p) > 0.02) irParaProgresso(cena, p);
    mostrarJa(cena, p);
  });
}

// Leva a rolagem da página até o ponto em que a cena está no progresso p
function irParaProgresso(cena, p) {
  const topo = cena.elemento.getBoundingClientRect().top + window.scrollY;
  window.scrollTo(0, topo + p * (cena.elemento.offsetHeight - window.innerHeight));
}

// ---------------------------------------------------------------------------
// O laço: mede a rolagem e chama o desenho de cada cena
// ---------------------------------------------------------------------------

// Transforma a posição de cada cena na tela em progresso de 0 a 1.
// caixa.top é a distância do topo da cena até o topo da tela: começa em 0
// (a cena acabou de grudar) e vai ficando negativa conforme a pessoa rola.
function medirRolagem() {
  const alturaDaTela = window.innerHeight;
  for (const cena of CENAS) {
    const caixa = cena.elemento.getBoundingClientRect();
    cena.alvo = limitar(-caixa.top / (caixa.height - alturaDaTela));
    const naTela = caixa.bottom > 0 && caixa.top < alturaDaTela;
    // A classe "cena-na-tela" faz o fio do aviso descer de novo quando a cena chega
    if (naTela !== cena.naTela) cena.elemento.classList.toggle('cena-na-tela', naTela);
    cena.naTela = naTela;
  }
}

// Um "quadro": o navegador chama esta função cerca de 60 vezes por segundo
function quadro(agora) {
  quadroPedido = false;
  if (!cenasEmMovimento) return;

  medirRolagem();
  for (const cena of CENAS) {
    if (!cena.naTela) continue;

    const antes = cena.p;
    if (!cena.comecou) {
      cena.p = cena.alvo;   // na primeira vez, vai direto para onde a rolagem está
      cena.comecou = true;
    } else {
      // Suavização: a cada quadro, anda 14% do caminho que falta até o alvo
      cena.p += (cena.alvo - cena.p) * 0.14;
      if (Math.abs(cena.alvo - cena.p) < 0.0004) cena.p = cena.alvo;
    }

    if (cena.p !== antes || cena.suja || (cena.viva && cena.viva(agora))) {
      cena.desenhar(cena.p, agora);
      cena.suja = false;
      // O aviso de descer some perto do fim da cena, quando não há mais o que esperar
      cena.aviso.style.opacity = String(trecho(cena.avisoDe, cena.avisoDe + 0.06, cena.p) * (1 - trecho(0.8, 0.88, cena.p)));
    }
  }
  pedirQuadro();
}

function pedirQuadro() {
  if (quadroPedido) return;
  quadroPedido = true;
  requestAnimationFrame(quadro);
}

// ---------------------------------------------------------------------------
// Ligar e desligar
// ---------------------------------------------------------------------------

function medirCenas() {
  for (const cena of CENAS) {
    if (cena.medir) cena.medir();
    cena.suja = true;
  }
}

// As cenas podem ficar em movimento? Duas coisas pedem a versão parada:
//   1. a pessoa (ou o aparelho dela) pediu menos movimento;
//   2. a letra está maior que o normal ou o texto está com mais espaço. O palco
//      tem a altura exata da tela: um texto que cresce poderia não caber e
//      ficar cortado. Parada, a página deixa o texto crescer à vontade.
function cenasPodemMover() {
  const raiz = document.documentElement;
  const letraNormal = parseFloat(getComputedStyle(raiz).fontSize) <= 17;
  return !movimentoReduzido() && letraNormal && raiz.dataset.espacamento !== 'amplo';
}

// Decide se as cenas ficam em movimento ou paradas e arruma a página para isso.
// É chamada ao abrir a página e sempre que uma preferência muda.
function aplicarModoDasCenas() {
  cenasEmMovimento = cenasPodemMover();
  document.documentElement.classList.toggle('com-cenas', cenasEmMovimento);

  // Primeiro tudo volta ao que o CSS manda; depois cada cena mede a tela nova
  for (const cena of CENAS) {
    cena.parar();
    cena.aviso.removeAttribute('style');
    cena.comecou = false;
  }
  medirCenas();

  if (cenasEmMovimento) pedirQuadro();
  else for (const cena of CENAS) cena.parar();

  // Quem vê a página parada só porque o aparelho pede menos movimento (sem ter
  // escolhido nada no painel) recebe um aviso com um botão para ligar as animações
  const aviso = document.getElementById('aviso-movimento');
  const soPeloAparelho = document.documentElement.dataset.movimento === 'normal' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (aviso) aviso.hidden = !soPeloAparelho;
}

// Chamada pelo js/cenas-inicio.js depois de registrar todas as cenas
function comecarCenas() {
  aplicarModoDasCenas();

  // A janela mudou de tamanho: espera a pessoa parar de arrastar e mede de novo
  let espera = 0;
  window.addEventListener('resize', function () {
    clearTimeout(espera);
    espera = setTimeout(function () {
      medirCenas();
      if (!cenasEmMovimento) for (const cena of CENAS) cena.parar();
    }, 150);
  });

  // O painel de acessibilidade mexe nos atributos do <html>. Um vigia avisa
  // quando isso acontece. Se a mudança troca o modo (movimento, letra ou
  // espaço), a página é arrumada de novo; se muda só cores ou medidas, basta
  // medir e desenhar de novo.
  new MutationObserver(function (mudancas) {
    const mudouOMovimento = mudancas.some(function (mudanca) { return mudanca.attributeName === 'data-movimento'; });
    if (mudouOMovimento || cenasPodemMover() !== cenasEmMovimento) {
      aplicarModoDasCenas();
      return;
    }
    medirCenas();
    if (!cenasEmMovimento) for (const cena of CENAS) cena.parar();
  }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-movimento', 'data-tema', 'data-contraste', 'data-fonte', 'data-espacamento'] });

  // O aparelho também pode mudar de ideia com a página aberta
  window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', aplicarModoDasCenas);

  // As fontes e as imagens chegam depois e mudam medidas
  window.addEventListener('load', function () {
    medirCenas();
    if (!cenasEmMovimento) for (const cena of CENAS) cena.parar();
  });

  // Teclado: um botão ou link dentro de uma cena pode estar invisível no ponto
  // em que a rolagem está (ele só aparece no fim da cena, por exemplo).
  // O atributo data-visivel-em="1" diz em que progresso ele aparece: quando
  // ele recebe o foco, a rolagem vai até lá. Assim o foco nunca fica escondido.
  document.addEventListener('focusin', function (evento) {
    if (!cenasEmMovimento || !evento.target.closest) return;
    const marcado = evento.target.closest('[data-visivel-em]');
    if (!marcado) return;
    const cena = CENAS.find(function (c) { return c.elemento.contains(marcado); });
    if (!cena) return;
    focarNaCena(cena, Number(marcado.dataset.visivelEm));
  });
}

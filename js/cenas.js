function limitar(valor) {
  return Math.min(1, Math.max(0, valor));
}

function trecho(inicio, fim, p) {
  const t = limitar((p - inicio) / (fim - inicio));
  return t * t * (3 - 2 * t);
}

function misturar(a, b, t) {
  return a + (b - a) * t;
}

function sorteador(semente) {
  return function () {
    semente = (semente * 1664525 + 1013904223) % 4294967296;
    return semente / 4294967296;
  };
}

function limparEstilos(elementos) {
  for (const elemento of elementos) elemento.removeAttribute('style');
}

const CENAS = [];
let cenasEmMovimento = false;
let quadroPedido = false;

function registrarCena(elemento, cena) {
  cena.elemento = elemento;
  cena.alvo = 0;
  cena.p = 0;
  cena.naTela = false;
  cena.suja = true;
  cena.comecou = false;

  cena.aviso = document.createElement('p');
  cena.aviso.className = 'cena-desca';
  cena.aviso.setAttribute('aria-hidden', 'true');
  cena.aviso.append(document.createElement('i'), 'Desça para continuar');
  elemento.querySelector('.cena-palco').append(cena.aviso);
  cena.avisoDe = Number(elemento.dataset.avisoDe || -1);

  CENAS.push(cena);
  return cena;
}

function mostrarJa(cena, p) {
  cena.p = p;
  cena.comecou = true;
  cena.suja = true;
}

function focarNaCena(cena, p) {
  requestAnimationFrame(function () {
    medirRolagem();
    if (Math.abs(cena.alvo - p) > 0.02) irParaProgresso(cena, p);
    mostrarJa(cena, p);
  });
}

function irParaProgresso(cena, p) {
  const topo = cena.elemento.getBoundingClientRect().top + window.scrollY;
  window.scrollTo(0, topo + p * (cena.elemento.offsetHeight - window.innerHeight));
}

function medirRolagem() {
  const alturaDaTela = window.innerHeight;
  for (const cena of CENAS) {
    const caixa = cena.elemento.getBoundingClientRect();
    cena.alvo = limitar(-caixa.top / (caixa.height - alturaDaTela));
    const naTela = caixa.bottom > 0 && caixa.top < alturaDaTela;
    if (naTela !== cena.naTela) cena.elemento.classList.toggle('cena-na-tela', naTela);
    cena.naTela = naTela;
  }
}

function quadro(agora) {
  quadroPedido = false;
  if (!cenasEmMovimento) return;

  medirRolagem();
  for (const cena of CENAS) {
    if (!cena.naTela) continue;

    const antes = cena.p;
    if (!cena.comecou) {
      cena.p = cena.alvo;
      cena.comecou = true;
    } else {
      cena.p += (cena.alvo - cena.p) * 0.14;
      if (Math.abs(cena.alvo - cena.p) < 0.0004) cena.p = cena.alvo;
    }

    if (cena.p !== antes || cena.suja || (cena.viva && cena.viva(agora))) {
      cena.desenhar(cena.p, agora);
      cena.suja = false;
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

function medirCenas() {
  for (const cena of CENAS) {
    if (cena.medir) cena.medir();
    cena.suja = true;
  }
}

function cenasPodemMover() {
  const raiz = document.documentElement;
  const letraNormal = parseFloat(getComputedStyle(raiz).fontSize) <= 17;
  return !movimentoReduzido() && letraNormal && raiz.dataset.espacamento !== 'amplo';
}

function aplicarModoDasCenas() {
  cenasEmMovimento = cenasPodemMover();
  document.documentElement.classList.toggle('com-cenas', cenasEmMovimento);

  for (const cena of CENAS) {
    cena.parar();
    cena.aviso.removeAttribute('style');
    cena.comecou = false;
  }
  medirCenas();

  if (cenasEmMovimento) pedirQuadro();
  else for (const cena of CENAS) cena.parar();

  const aviso = document.getElementById('aviso-movimento');
  const soPeloAparelho = document.documentElement.dataset.movimento === 'normal' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (aviso) aviso.hidden = !soPeloAparelho;
}

function comecarCenas() {
  aplicarModoDasCenas();

  let espera = 0;
  window.addEventListener('resize', function () {
    clearTimeout(espera);
    espera = setTimeout(function () {
      medirCenas();
      if (!cenasEmMovimento) for (const cena of CENAS) cena.parar();
    }, 150);
  });

  new MutationObserver(function (mudancas) {
    const mudouOMovimento = mudancas.some(function (mudanca) { return mudanca.attributeName === 'data-movimento'; });
    if (mudouOMovimento || cenasPodemMover() !== cenasEmMovimento) {
      aplicarModoDasCenas();
      return;
    }
    medirCenas();
    if (!cenasEmMovimento) for (const cena of CENAS) cena.parar();
  }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-movimento', 'data-tema', 'data-contraste', 'data-fonte', 'data-espacamento'] });

  window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', aplicarModoDasCenas);

  window.addEventListener('load', function () {
    medirCenas();
    if (!cenasEmMovimento) for (const cena of CENAS) cena.parar();
  });

  document.addEventListener('focusin', function (evento) {
    if (!cenasEmMovimento || !evento.target.closest) return;
    const marcado = evento.target.closest('[data-visivel-em]');
    if (!marcado) return;
    const cena = CENAS.find(function (c) { return c.elemento.contains(marcado); });
    if (!cena) return;
    focarNaCena(cena, Number(marcado.dataset.visivelEm));
  });
}

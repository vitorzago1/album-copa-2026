// ============================================================================
// pacote3d.js
// ----------------------------------------------------------------------------
// O pacotinho de figurinhas como um objeto 3D de verdade, desenhado pela placa
// de vídeo (WebGL) com a biblioteca Three.js.
//
// É a ÚNICA parte do site que usa uma biblioteca externa. Ela serve para duas
// coisas:
//   1. gerar a sequência de quadros da página inicial (scripts/quadros.html);
//   2. mostrar o pacotinho ao vivo na página Pacotinhos.
//
// Como o pacotinho é montado:
//   - duas folhas (frente e costas), cada uma um plano cheio de pontos;
//   - cada ponto é empurrado para fora no meio, formando a "barriga" do
//     pacotinho cheio, e fica chato nas bordas, onde ele é selado;
//   - a estampa (marca, picote, retícula) é desenhada em um <canvas> comum e
//     colada nas folhas como uma textura;
//   - a parte de cima (a aba) é uma peça separada, para poder ser rasgada.
//
// Depende de: js/vendor/three.min.js (Three.js r128, licença MIT).
// ============================================================================

function criarPacote3d(tela, opcoes) {
  'use strict';
  opcoes = opcoes || {};

  // Medidas do pacotinho, em "unidades" do mundo 3D. A proporção é 5 por 7,
  // a mesma do pacotinho desenhado em CSS.
  const LARGURA = 5;
  const ALTURA = 7;
  const CORTE = 0.86;      // o picote fica a 86% da altura; acima dele é a aba
  const BARRIGA = 0.5;     // o quanto o meio do pacotinho estufa
  const DISTANCIA = 30;    // da câmera até o pacotinho

  // "Quanto deste trecho já passou?" (0 antes, 1 depois, suave no meio)
  function suave(inicio, fim, t) {
    const x = Math.min(1, Math.max(0, (t - inicio) / (fim - inicio)));
    return x * x * (3 - 2 * x);
  }

  function misturar(a, b, t) {
    return a + (b - a) * t;
  }

  const GRAU = Math.PI / 180;   // a Three.js mede ângulos em radianos

  // -------------------------------------------------------------------------
  // 1. Desenhista, cena, câmera e luz
  // -------------------------------------------------------------------------

  // alpha: true deixa o fundo transparente: só o pacotinho é desenhado.
  // preserveDrawingBuffer: true permite copiar o desenho para uma imagem.
  const desenhista = new THREE.WebGLRenderer({ canvas: tela, alpha: true, antialias: true, preserveDrawingBuffer: true });
  desenhista.setClearColor(0x000000, 0);
  desenhista.outputEncoding = THREE.sRGBEncoding;   // cores na tela iguais às do CSS

  const cena = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(30, 1, 1, 100);
  camera.position.z = DISTANCIA;

  cena.add(new THREE.HemisphereLight(0xffffff, 0xd0c8cc, 0.5));   // luz geral, de cima e de baixo
  const lampada = new THREE.DirectionalLight(0xffffff, 0.8);       // uma lâmpada, em cima à esquerda
  lampada.position.set(-9, 10, 9);
  cena.add(lampada);

  // Papel laminado só parece laminado se tiver o que refletir. Aqui é montado
  // um "estúdio" de mentira: uma sala escura com painéis de luz. A Three.js
  // fotografa essa sala em todas as direções e usa a foto como reflexo.
  function criarReflexos() {
    const estudio = new THREE.Scene();
    estudio.background = new THREE.Color(0x303034);
    function painel(cor, largura, altura, x, y, z) {
      const luz = new THREE.Mesh(new THREE.PlaneGeometry(largura, altura), new THREE.MeshBasicMaterial({ color: cor, side: THREE.DoubleSide }));
      luz.position.set(x, y, z);
      luz.lookAt(0, 0, 0);
      estudio.add(luz);
    }
    painel(0xffffff, 14, 8, -10, 12, 10);    // janela grande, em cima à esquerda
    painel(0xffffff, 3, 16, 14, 2, 6);       // faixa de luz à direita
    painel(0xd8d2d6, 20, 6, 0, -12, 8);      // rebatedor embaixo
    painel(0xffffff, 10, 10, 0, 6, -14);     // luz de trás
    const fotografo = new THREE.PMREMGenerator(desenhista);
    const reflexos = fotografo.fromScene(estudio, 0.03).texture;
    fotografo.dispose();
    return reflexos;
  }
  const reflexos = criarReflexos();

  // -------------------------------------------------------------------------
  // 2. A estampa: desenhada em <canvas> comum e usada como textura
  // -------------------------------------------------------------------------

  const ESTAMPA_L = 1000;
  const ESTAMPA_A = 1400;
  const FONTE_DESTAQUE = '"Londrina Solid", "Arial Black", sans-serif';
  const FONTE_LEITURA = '"Atkinson Hyperlegible Next", "Segoe UI", Arial, sans-serif';

  function novaTela() {
    const nova = document.createElement('canvas');
    nova.width = ESTAMPA_L;
    nova.height = ESTAMPA_A;
    return nova;
  }

  const telaDaFrente = novaTela();
  const telaDasCostas = novaTela();
  const telaDoRecorte = novaTela();
  const telaDoRelevo = novaTela();

  // As cores vêm do CSS (tokens.css): as mesmas do pacotinho desenhado em CSS.
  // Assim o pacotinho 3D troca de cor junto com o tema.
  function lerCores() {
    const estilo = getComputedStyle(document.documentElement);
    return {
      papel: estilo.getPropertyValue('--cor-etiqueta-fundo').trim() || '#14204F',
      tinta: estilo.getPropertyValue('--cor-etiqueta-texto').trim() || '#F6CDD7',
      prata: estilo.getPropertyValue('--cor-prata').trim() || '#C5CAD6',
    };
  }

  // O que frente e costas têm em comum: o papel, a retícula, o picote e as
  // faixas seladas em cima e embaixo
  function estamparBase(pincel, cores) {
    pincel.globalCompositeOperation = 'source-over';
    pincel.globalAlpha = 1;
    pincel.fillStyle = cores.papel;
    pincel.fillRect(0, 0, ESTAMPA_L, ESTAMPA_A);

    // Retícula: pontinhos na cor da tinta, bem fracos
    pincel.fillStyle = cores.tinta;
    pincel.globalAlpha = 0.3;
    pincel.beginPath();
    for (let y = 13; y < ESTAMPA_A; y += 26) {
      for (let x = 13; x < ESTAMPA_L; x += 26) {
        pincel.moveTo(x + 3, y);
        pincel.arc(x, y, 3, 0, 6.283);
      }
    }
    pincel.fill();

    // As faixas seladas: risquinhos deitados, como o papel prensado
    pincel.globalAlpha = 0.28;
    for (let y = 6; y < 74; y += 10) {
      pincel.fillRect(0, y, ESTAMPA_L, 3);
      pincel.fillRect(0, ESTAMPA_A - y - 3, ESTAMPA_L, 3);
    }

    // O picote: linha tracejada na altura do corte
    pincel.globalAlpha = 1;
    pincel.strokeStyle = cores.tinta;
    pincel.lineWidth = 6;
    pincel.setLineDash([24, 16]);
    pincel.beginPath();
    pincel.moveTo(0, ESTAMPA_A * (1 - CORTE));
    pincel.lineTo(ESTAMPA_L, ESTAMPA_A * (1 - CORTE));
    pincel.stroke();
    pincel.setLineDash([]);
  }

  // Um texto em cima de uma faixa lisa, para os pontinhos não atrapalharem a leitura
  function estamparTexto(pincel, cores, texto, fonte, x, y, giro) {
    pincel.save();
    pincel.translate(x, y);
    pincel.rotate((giro || 0) * GRAU);
    pincel.font = fonte;
    pincel.textAlign = 'center';
    pincel.textBaseline = 'middle';
    const medida = pincel.measureText(texto);
    const altura = (medida.actualBoundingBoxAscent + medida.actualBoundingBoxDescent) || 60;
    pincel.fillStyle = cores.papel;
    pincel.fillRect(-medida.width / 2 - 22, -altura / 2 - 14, medida.width + 44, altura + 28);
    pincel.fillStyle = cores.tinta;
    pincel.fillText(texto, 0, 0);
    pincel.restore();
  }

  // As bordas de cima e de baixo são cortadas em serrilha, como em um pacotinho
  // de verdade. O recorte é feito apagando triângulos do desenho.
  function serrilhar(pincel) {
    pincel.globalCompositeOperation = 'destination-out';
    pincel.beginPath();
    for (let x = 0; x < ESTAMPA_L; x += 40) {
      pincel.moveTo(x, 0);
      pincel.lineTo(x + 20, 22);
      pincel.lineTo(x + 40, 0);
      pincel.moveTo(x, ESTAMPA_A);
      pincel.lineTo(x + 20, ESTAMPA_A - 22);
      pincel.lineTo(x + 40, ESTAMPA_A);
    }
    pincel.fill();
    pincel.globalCompositeOperation = 'source-over';
  }

  function estampar() {
    const cores = lerCores();

    // Frente
    let pincel = telaDaFrente.getContext('2d');
    pincel.clearRect(0, 0, ESTAMPA_L, ESTAMPA_A);
    estamparBase(pincel, cores);
    estamparTexto(pincel, cores, 'Rasgue aqui', '700 58px ' + FONTE_LEITURA, 500, 112);
    estamparTexto(pincel, cores, 'Colei!', '900 290px ' + FONTE_DESTAQUE, 500, 760, -6);
    estamparTexto(pincel, cores, '5 figurinhas', '700 74px ' + FONTE_LEITURA, 500, 1010);
    serrilhar(pincel);

    // Costas: a emenda do papel no meio e dois textos
    pincel = telaDasCostas.getContext('2d');
    pincel.clearRect(0, 0, ESTAMPA_L, ESTAMPA_A);
    estamparBase(pincel, cores);
    pincel.fillStyle = cores.tinta;
    pincel.globalAlpha = 0.16;
    pincel.fillRect(468, 0, 64, ESTAMPA_A);
    pincel.globalAlpha = 0.5;
    pincel.fillRect(468, 0, 4, ESTAMPA_A);
    pincel.fillRect(528, 0, 4, ESTAMPA_A);
    pincel.globalAlpha = 1;
    estamparTexto(pincel, cores, 'Álbum da Copa 2026', '700 66px ' + FONTE_LEITURA, 500, 620);
    estamparTexto(pincel, cores, 'Abra pelo picote', '700 66px ' + FONTE_LEITURA, 500, 760);
    serrilhar(pincel);

    // O recorte sozinho, em preto e branco, para o lado de dentro do pacotinho
    pincel = telaDoRecorte.getContext('2d');
    pincel.fillStyle = '#FFFFFF';
    pincel.fillRect(0, 0, ESTAMPA_L, ESTAMPA_A);
    pincel.fillStyle = '#000000';
    pincel.beginPath();
    for (let x = 0; x < ESTAMPA_L; x += 40) {
      pincel.moveTo(x, 0);
      pincel.lineTo(x + 20, 22);
      pincel.lineTo(x + 40, 0);
      pincel.moveTo(x, ESTAMPA_A);
      pincel.lineTo(x + 20, ESTAMPA_A - 22);
      pincel.lineTo(x + 40, ESTAMPA_A);
    }
    pincel.fill();

    texturaDaFrente.needsUpdate = true;
    texturaDasCostas.needsUpdate = true;
    texturaDoRecorte.needsUpdate = true;
    materialDeDentro.color.set(cores.prata);
  }

  // O relevo: um desenho em tons de cinza que diz onde o papel é amassado.
  // Claro = alto, escuro = fundo. A luz usa isso para fazer brilhos e sombras.
  function desenharRelevo() {
    const pincel = telaDoRelevo.getContext('2d');
    pincel.fillStyle = '#808080';
    pincel.fillRect(0, 0, ESTAMPA_L, ESTAMPA_A);

    // Um sorteio que se repete, para o amassado ser sempre o mesmo
    let semente = 2026;
    function acaso() {
      semente = (semente * 1664525 + 1013904223) % 4294967296;
      return semente / 4294967296;
    }

    // Vincos: riscos largos e esfumados, uns claros e outros escuros
    pincel.lineCap = 'round';
    for (let i = 0; i < 70; i++) {
      const x = acaso() * ESTAMPA_L;
      const y = acaso() * ESTAMPA_A;
      const angulo = acaso() * 6.283;
      const comprimento = 120 + acaso() * 380;
      const tom = acaso() < 0.5 ? 255 : 0;
      pincel.strokeStyle = 'rgba(' + tom + ',' + tom + ',' + tom + ',0.1)';
      for (const largura of [60, 34, 14]) {
        pincel.lineWidth = largura;
        pincel.beginPath();
        pincel.moveTo(x, y);
        pincel.lineTo(x + Math.cos(angulo) * comprimento, y + Math.sin(angulo) * comprimento);
        pincel.stroke();
      }
    }

    // Faixas seladas: degraus bem marcados
    for (let y = 0; y < 76; y += 10) {
      pincel.fillStyle = '#C8C8C8';
      pincel.fillRect(0, y, ESTAMPA_L, 5);
      pincel.fillRect(0, ESTAMPA_A - y - 5, ESTAMPA_L, 5);
      pincel.fillStyle = '#404040';
      pincel.fillRect(0, y + 5, ESTAMPA_L, 5);
      pincel.fillRect(0, ESTAMPA_A - y - 10, ESTAMPA_L, 5);
    }
  }

  function criarTextura(telaDeOrigem, colorida) {
    const textura = new THREE.CanvasTexture(telaDeOrigem);
    if (colorida) textura.encoding = THREE.sRGBEncoding;
    textura.anisotropy = desenhista.capabilities.getMaxAnisotropy();   // nitidez quando o pacotinho está de lado
    return textura;
  }

  const texturaDaFrente = criarTextura(telaDaFrente, true);
  const texturaDasCostas = criarTextura(telaDasCostas, true);
  const texturaDoRecorte = criarTextura(telaDoRecorte, false);
  const texturaDoRelevo = criarTextura(telaDoRelevo, false);

  // -------------------------------------------------------------------------
  // 3. Os materiais
  // -------------------------------------------------------------------------
  // metalness = o quanto parece metal; roughness = o quanto é áspero (fosco).
  // Papel laminado: bastante metal e pouco áspero.

  function criarMaterialDeFora(textura, some) {
    return new THREE.MeshStandardMaterial({
      map: textura,
      bumpMap: texturaDoRelevo,
      bumpScale: 0.06,
      metalness: 0.55,
      roughness: 0.36,
      envMap: reflexos,
      envMapIntensity: 1,      // a força dos reflexos
      alphaTest: 0.5,          // o que é transparente na estampa (a serrilha) não é desenhado
      transparent: some,       // só a aba precisa sumir aos poucos
    });
  }

  // O lado de dentro é prateado, como em todo pacotinho laminado
  const materialDeDentro = new THREE.MeshStandardMaterial({
    color: 0xC5CAD6,
    metalness: 0.85,
    roughness: 0.3,
    envMap: reflexos,
    alphaMap: texturaDoRecorte,
    alphaTest: 0.5,
    side: THREE.BackSide,      // só é desenhado quando visto por dentro
  });

  // -------------------------------------------------------------------------
  // 4. A forma
  // -------------------------------------------------------------------------

  // O quanto o ponto (u, v) estufa para fora. u vai de 0 (esquerda) a 1
  // (direita); v vai de 0 (embaixo) a 1 (em cima).
  function barriga(u, v) {
    const dosLados = Math.pow(Math.sin(Math.PI * u), 0.55);           // chato nas laterais
    const dasPontas = suave(0.05, 0.24, v) * (1 - suave(0.78, 0.95, v));   // chato nas faixas seladas
    const rugas = 0.03 * Math.sin(u * 19 + v * 9) * Math.sin(v * 27 - u * 6);
    return (BARRIGA * dosLados + rugas) * dasPontas;
  }

  // Uma folha: um plano que vai de vInicio a vFim da altura do pacotinho.
  // Ela tem dois lados: o de fora, com a estampa, e o de dentro, prateado.
  function criarFolha(vInicio, vFim, materialDeFora) {
    const fatia = vFim - vInicio;
    const forma = new THREE.PlaneGeometry(LARGURA, ALTURA * fatia, 28, Math.max(6, Math.round(64 * fatia)));
    const lugares = forma.attributes.position;
    const uvs = forma.attributes.uv;
    for (let i = 0; i < lugares.count; i++) {
      const u = uvs.getX(i);
      const v = vInicio + uvs.getY(i) * fatia;
      uvs.setY(i, v);                         // a textura usa só a fatia que cabe a esta folha
      lugares.setZ(i, barriga(u, v));         // empurra o ponto para fora
    }
    forma.computeVertexNormals();             // recalcula para onde cada pedacinho "olha", para a luz

    const folha = new THREE.Group();
    folha.add(new THREE.Mesh(forma, materialDeFora), new THREE.Mesh(forma, materialDeDentro));
    return folha;
  }

  // Uma peça: frente e costas da mesma fatia. As costas são a mesma folha,
  // virada meia volta.
  function criarPeca(vInicio, vFim, some) {
    const materiais = [criarMaterialDeFora(texturaDaFrente, some), criarMaterialDeFora(texturaDasCostas, some)];
    const peca = new THREE.Group();
    const frente = criarFolha(vInicio, vFim, materiais[0]);
    const costas = criarFolha(vInicio, vFim, materiais[1]);
    costas.rotation.y = Math.PI;
    peca.add(frente, costas);
    peca.userData.materiais = materiais;
    return peca;
  }

  const pacote = new THREE.Group();   // o pacotinho inteiro: é ele que gira e cai
  cena.add(pacote);

  // O corpo: do pé até o picote
  const corpo = criarPeca(0, CORTE, false);
  corpo.position.y = ALTURA * (CORTE / 2 - 0.5);
  pacote.add(corpo);

  // A aba: do picote até o topo. Ela fica presa a um "eixo" no canto de baixo,
  // à esquerda: é em torno desse canto que ela gira quando é rasgada.
  const alturaDaAba = ALTURA * (1 - CORTE);
  const eixoDaAba = new THREE.Group();
  eixoDaAba.position.set(-LARGURA / 2, ALTURA * (CORTE - 0.5), 0);
  const aba = criarPeca(CORTE, 1, true);
  aba.position.set(LARGURA / 2, alturaDaAba / 2, 0);
  eixoDaAba.add(aba);
  pacote.add(eixoDaAba);

  // -------------------------------------------------------------------------
  // 5. As poses
  // -------------------------------------------------------------------------

  // Põe o pacotinho em uma pose. Tudo em graus e em unidades do mundo 3D.
  //   rasgo: 0 = aba no lugar; 1 = aba arrancada e sumida
  function aplicar(pose) {
    pacote.rotation.set((pose.giroX || 0) * GRAU, (pose.giroY || 0) * GRAU, (pose.giroZ || 0) * GRAU);
    pacote.position.set(pose.x || 0, pose.y || 0, 0);
    pacote.scale.setScalar(pose.tamanho === undefined ? 1 : pose.tamanho);

    const rasgo = pose.rasgo || 0;
    eixoDaAba.visible = rasgo < 1;
    eixoDaAba.rotation.set(rasgo * -70 * GRAU, rasgo * 40 * GRAU, rasgo * 52 * GRAU);
    eixoDaAba.position.set(-LARGURA / 2 + rasgo * 2.4, ALTURA * (CORTE - 0.5) + rasgo * 3.4, rasgo * 1.5);
    const opacidade = 1 - suave(0.55, 1, rasgo);
    for (const material of aba.userData.materiais) material.opacity = opacidade;
  }

  // A coreografia da cena da página inicial. t vai de 0 a 1:
  //   0,00 a 0,39  o pacotinho entra girando, de costas para a frente
  //   0,39 a 0,56  a aba é rasgada pelo picote
  //   0,56 a 0,76  ele espera, aberto, virando devagar (é quando as figurinhas sobem)
  //   0,76 a 1,00  vazio, ele cai para fora do quadro
  function posar(t) {
    const chegada = suave(0, 0.39, t);
    const rasgo = suave(0.39, 0.56, t);
    const queda = suave(0.76, 1, t);
    aplicar({
      giroY: misturar(-205, 9, chegada) - suave(0.39, 0.76, t) * 18,   // depois de chegar, vira devagar de um lado para o outro
      giroX: misturar(22, 0, chegada) + queda * 62,
      giroZ: Math.sin(rasgo * Math.PI) * -3 + queda * -12,   // dá um tranco quando a aba sai
      y: misturar(-3.2, 0, chegada) - queda * queda * 13,     // a queda acelera, como tudo que cai
      tamanho: misturar(0.72, 1, chegada),
      rasgo: rasgo,
    });
  }

  // -------------------------------------------------------------------------
  // 6. Tamanho e desenho
  // -------------------------------------------------------------------------

  // Ajusta o desenho ao tamanho da tela. "alturaVisivel" diz quantas unidades
  // do mundo 3D cabem de cima a baixo: quanto maior, menor o pacotinho aparece.
  // O tamanho vem da página (o espaço que a tela ocupa). O gerador de quadros
  // passa um tamanho fixo em 'opcoes', para toda imagem sair igual.
  function medir() {
    const largura = opcoes.largura || tela.clientWidth || tela.width;
    const altura = opcoes.altura || tela.clientHeight || tela.height;
    desenhista.setPixelRatio(opcoes.nitidez || Math.min(window.devicePixelRatio || 1, 2));
    desenhista.setSize(largura, altura, false);
    camera.aspect = largura / altura;
    camera.fov = 2 * Math.atan(((opcoes.alturaVisivel || 9) / 2) / DISTANCIA) / GRAU;
    camera.updateProjectionMatrix();
  }

  function desenhar() {
    desenhista.render(cena, camera);
  }

  desenharRelevo();
  texturaDoRelevo.needsUpdate = true;
  estampar();
  medir();
  aplicar({});

  return {
    posar: posar,         // coreografia da página inicial (t de 0 a 1)
    aplicar: aplicar,     // pose livre (página Pacotinhos)
    estampar: estampar,   // refaz a estampa (quando o tema muda ou a fonte chega)
    medir: medir,
    desenhar: desenhar,
  };
}

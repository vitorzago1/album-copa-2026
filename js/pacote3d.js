function criarPacote3d(tela, opcoes) {
  'use strict';
  opcoes = opcoes || {};

  const LARGURA = 5;
  const ALTURA = 7;
  const CORTE = 0.86;
  const BARRIGA = 0.5;
  const DISTANCIA = 30;

  function suave(inicio, fim, t) {
    const x = Math.min(1, Math.max(0, (t - inicio) / (fim - inicio)));
    return x * x * (3 - 2 * x);
  }

  function misturar(a, b, t) {
    return a + (b - a) * t;
  }

  const GRAU = Math.PI / 180;

  const desenhista = new THREE.WebGLRenderer({ canvas: tela, alpha: true, antialias: true, preserveDrawingBuffer: true });
  desenhista.setClearColor(0x000000, 0);
  desenhista.outputEncoding = THREE.sRGBEncoding;

  const cena = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(30, 1, 1, 100);
  camera.position.z = DISTANCIA;

  cena.add(new THREE.HemisphereLight(0xffffff, 0xd0c8cc, 0.5));
  const lampada = new THREE.DirectionalLight(0xffffff, 0.8);
  lampada.position.set(-9, 10, 9);
  cena.add(lampada);

  function criarReflexos() {
    const estudio = new THREE.Scene();
    estudio.background = new THREE.Color(0x303034);
    function painel(cor, largura, altura, x, y, z) {
      const luz = new THREE.Mesh(new THREE.PlaneGeometry(largura, altura), new THREE.MeshBasicMaterial({ color: cor, side: THREE.DoubleSide }));
      luz.position.set(x, y, z);
      luz.lookAt(0, 0, 0);
      estudio.add(luz);
    }
    painel(0xffffff, 14, 8, -10, 12, 10);
    painel(0xffffff, 3, 16, 14, 2, 6);
    painel(0xd8d2d6, 20, 6, 0, -12, 8);
    painel(0xffffff, 10, 10, 0, 6, -14);
    const fotografo = new THREE.PMREMGenerator(desenhista);
    const reflexos = fotografo.fromScene(estudio, 0.03).texture;
    fotografo.dispose();
    return reflexos;
  }
  const reflexos = criarReflexos();

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

  function lerCores() {
    const estilo = getComputedStyle(document.documentElement);
    return {
      papel: estilo.getPropertyValue('--cor-etiqueta-fundo').trim() || '#14204F',
      tinta: estilo.getPropertyValue('--cor-etiqueta-texto').trim() || '#F6CDD7',
      prata: estilo.getPropertyValue('--cor-prata').trim() || '#C5CAD6',
    };
  }

  function estamparBase(pincel, cores) {
    pincel.globalCompositeOperation = 'source-over';
    pincel.globalAlpha = 1;
    pincel.fillStyle = cores.papel;
    pincel.fillRect(0, 0, ESTAMPA_L, ESTAMPA_A);

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

    pincel.globalAlpha = 0.28;
    for (let y = 6; y < 74; y += 10) {
      pincel.fillRect(0, y, ESTAMPA_L, 3);
      pincel.fillRect(0, ESTAMPA_A - y - 3, ESTAMPA_L, 3);
    }

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

    let pincel = telaDaFrente.getContext('2d');
    pincel.clearRect(0, 0, ESTAMPA_L, ESTAMPA_A);
    estamparBase(pincel, cores);
    estamparTexto(pincel, cores, 'Rasgue aqui', '700 58px ' + FONTE_LEITURA, 500, 112);
    estamparTexto(pincel, cores, 'Colei!', '900 290px ' + FONTE_DESTAQUE, 500, 760, -6);
    estamparTexto(pincel, cores, '5 figurinhas', '700 74px ' + FONTE_LEITURA, 500, 1010);
    serrilhar(pincel);

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

  function desenharRelevo() {
    const pincel = telaDoRelevo.getContext('2d');
    pincel.fillStyle = '#808080';
    pincel.fillRect(0, 0, ESTAMPA_L, ESTAMPA_A);

    let semente = 2026;
    function acaso() {
      semente = (semente * 1664525 + 1013904223) % 4294967296;
      return semente / 4294967296;
    }

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
    textura.anisotropy = desenhista.capabilities.getMaxAnisotropy();
    return textura;
  }

  const texturaDaFrente = criarTextura(telaDaFrente, true);
  const texturaDasCostas = criarTextura(telaDasCostas, true);
  const texturaDoRecorte = criarTextura(telaDoRecorte, false);
  const texturaDoRelevo = criarTextura(telaDoRelevo, false);

  function criarMaterialDeFora(textura, some) {
    return new THREE.MeshStandardMaterial({
      map: textura,
      bumpMap: texturaDoRelevo,
      bumpScale: 0.06,
      metalness: 0.55,
      roughness: 0.36,
      envMap: reflexos,
      envMapIntensity: 1,
      alphaTest: 0.5,
      transparent: some,
    });
  }

  const materialDeDentro = new THREE.MeshStandardMaterial({
    color: 0xC5CAD6,
    metalness: 0.85,
    roughness: 0.3,
    envMap: reflexos,
    alphaMap: texturaDoRecorte,
    alphaTest: 0.5,
    side: THREE.BackSide,
  });

  function barriga(u, v) {
    const dosLados = Math.pow(Math.sin(Math.PI * u), 0.55);
    const dasPontas = suave(0.05, 0.24, v) * (1 - suave(0.78, 0.95, v));
    const rugas = 0.03 * Math.sin(u * 19 + v * 9) * Math.sin(v * 27 - u * 6);
    return (BARRIGA * dosLados + rugas) * dasPontas;
  }

  function criarFolha(vInicio, vFim, materialDeFora) {
    const fatia = vFim - vInicio;
    const forma = new THREE.PlaneGeometry(LARGURA, ALTURA * fatia, 28, Math.max(6, Math.round(64 * fatia)));
    const lugares = forma.attributes.position;
    const uvs = forma.attributes.uv;
    for (let i = 0; i < lugares.count; i++) {
      const u = uvs.getX(i);
      const v = vInicio + uvs.getY(i) * fatia;
      uvs.setY(i, v);
      lugares.setZ(i, barriga(u, v));
    }
    forma.computeVertexNormals();

    const folha = new THREE.Group();
    folha.add(new THREE.Mesh(forma, materialDeFora), new THREE.Mesh(forma, materialDeDentro));
    return folha;
  }

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

  const pacote = new THREE.Group();
  cena.add(pacote);

  const corpo = criarPeca(0, CORTE, false);
  corpo.position.y = ALTURA * (CORTE / 2 - 0.5);
  pacote.add(corpo);

  const alturaDaAba = ALTURA * (1 - CORTE);
  const eixoDaAba = new THREE.Group();
  eixoDaAba.position.set(-LARGURA / 2, ALTURA * (CORTE - 0.5), 0);
  const aba = criarPeca(CORTE, 1, true);
  aba.position.set(LARGURA / 2, alturaDaAba / 2, 0);
  eixoDaAba.add(aba);
  pacote.add(eixoDaAba);

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

  function posar(t) {
    const chegada = suave(0, 0.39, t);
    const rasgo = suave(0.39, 0.56, t);
    const queda = suave(0.76, 1, t);
    aplicar({
      giroY: misturar(-205, 9, chegada) - suave(0.39, 0.76, t) * 18,
      giroX: misturar(22, 0, chegada) + queda * 62,
      giroZ: Math.sin(rasgo * Math.PI) * -3 + queda * -12,
      y: misturar(-3.2, 0, chegada) - queda * queda * 13,
      tamanho: misturar(0.72, 1, chegada),
      rasgo: rasgo,
    });
  }

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
    posar: posar,
    aplicar: aplicar,
    estampar: estampar,
    medir: medir,
    desenhar: desenhar,
  };
}

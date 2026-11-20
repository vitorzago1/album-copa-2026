// ============================================================================
// demonstracao.js
// ----------------------------------------------------------------------------
// O modo demonstração da página Sobre: dois botões para testar o álbum rápido
// na apresentação.
//   - "Ganhar 5 pacotinhos extras": para não depender de um pacotinho por dia.
//   - "Zerar álbum": apaga tudo, depois de uma confirmação.
//
// Depende de: js/dados.js e js/estado.js.
// ============================================================================

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  const aviso = document.getElementById('demo-aviso');
  const dialogo = document.getElementById('dialogo-zerar');

  document.getElementById('demo-extras').addEventListener('click', function () {
    ganharPacotinhosExtras(5);
    const extras = lerAlbum().extras;
    aviso.textContent = 'Pronto: agora há ' + extras + ' pacotinhos extras esperando na página Pacotinhos.';
  });

  // Zerar é uma ação sem volta, por isso passa por uma janela de confirmação.
  // showModal() abre o <dialog> por cima da página e prende o foco dentro dele.
  document.getElementById('demo-zerar').addEventListener('click', function () {
    dialogo.showModal();
  });

  document.getElementById('zerar-cancelar').addEventListener('click', function () {
    dialogo.close();   // o navegador devolve o foco ao botão que abriu a janela
  });

  document.getElementById('zerar-confirmar').addEventListener('click', function () {
    zerarAlbum();
    dialogo.close();
    aviso.textContent = 'Álbum zerado. O pacotinho do dia está disponível de novo.';
  });
});

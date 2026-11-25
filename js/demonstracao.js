document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  const aviso = document.getElementById('demo-aviso');
  const dialogo = document.getElementById('dialogo-zerar');

  document.getElementById('demo-extras').addEventListener('click', function () {
    ganharPacotinhosExtras(5);
    const extras = lerAlbum().extras;
    aviso.textContent = 'Pronto: agora há ' + extras + ' pacotinhos extras esperando na página Pacotinhos.';
  });

  document.getElementById('demo-zerar').addEventListener('click', function () {
    dialogo.showModal();
  });

  document.getElementById('zerar-cancelar').addEventListener('click', function () {
    dialogo.close();
  });

  document.getElementById('zerar-confirmar').addEventListener('click', function () {
    zerarAlbum();
    dialogo.close();
    aviso.textContent = 'Álbum zerado. O pacotinho do dia está disponível de novo.';
  });
});

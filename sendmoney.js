$(document).ready(function () {
  // 1. Función para cargar contactos desde LocalStorage al Select
  function cargarContactos() {
    const contactos = JSON.parse(localStorage.getItem('contacts') || '[]');
    const $select = $('#contactSelect');

    $select.empty().append('<option value="">Selecciona un contacto...</option>');

    contactos.forEach((c) => {
      $select.append(`<option value="${c.nombre}">${c.nombre} (${c.banco})</option>`);
    });
  }

  // 2. Guardar nuevo contacto
  $('#btnGuardarContacto').click(function () {
    const nombre = $('#nombreContacto').val().trim();
    const banco = $('#bancoContacto').val().trim();
    const cuenta = $('#cuentaContacto').val().trim();

    if (nombre && banco) {
      let contactos = JSON.parse(localStorage.getItem('contacts') || '[]');
      contactos.push({ nombre, banco, cuenta });
      localStorage.setItem('contacts', JSON.stringify(contactos));

      // Limpiar inputs y cerrar modal
      $('#nombreContacto, #bancoContacto, #cuentaContacto').val('');
      $('#modalNuevoContacto').modal('hide');

      cargarContactos(); // Refrescar lista
      alert('Contacto guardado con éxito');
    } else {
      alert('Por favor completa el Nombre y el Banco');
    }
  });

  // 3. Procesar Envío de Dinero
  $('#btnEnviar').click(function () {
    const monto = parseFloat($('#sendAmount').val());
    const destino = $('#contactSelect').val();
    let saldoActual = parseFloat(localStorage.getItem('balance') || '0');

    if (!destino) {
      alert('Selecciona un destinatario');
      return;
    }

    if (isNaN(monto) || monto <= 0) {
      alert('Ingresa un monto válido');
      return;
    }

    if (monto > saldoActual) {
      alert('Saldo insuficiente. Tu saldo es: $' + saldoActual);
      return;
    }

    // Ejecutar Transacción
    saldoActual -= monto;
    localStorage.setItem('balance', saldoActual.toFixed(2));

    // Registrar en el historial de transacciones
    let movimientos = JSON.parse(localStorage.getItem('transactions') || '[]');
    movimientos.unshift({
      type: `Envío a ${destino}`,
      amount: `-$${monto.toFixed(2)}`,
      date: new Date().toLocaleString(),
    });
    localStorage.setItem('transactions', JSON.stringify(movimientos));

    alert('¡Transferencia exitosa!');
    window.location.href = 'menu.html';
  });

  // Inicializar la carga al abrir la página
  cargarContactos();
});

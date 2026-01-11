$(document).ready(function () {
  // Inicialización de la "Base de Datos" local
  if (!localStorage.getItem('wallet_db')) {
    const initialDB = {
      balance: 21050,
      userName: 'Usuario Alkemist',
      history: [{ type: 'Depósito', detail: 'Saldo inicial', amount: 21050, date: '10/01/2026' }],
    };
    localStorage.setItem('wallet_db', JSON.stringify(initialDB));
  }

  let db = JSON.parse(localStorage.getItem('wallet_db'));

  // Actualizar elementos visuales de saldo
  function updateUI() {
    $('.current-balance').text('$' + db.balance.toLocaleString('es-CL'));
    if ($('#transaction-container').length) renderHistory();
  }

  // Manejo de Login
  $('#loginForm').on('submit', function (e) {
    e.preventDefault();
    window.location.href = 'menu.html';
  });

  // Manejo de Depósitos
  $('#depositForm').on('submit', function (e) {
    e.preventDefault();
    const amount = parseFloat($('#depAmount').val());
    if (amount > 0) {
      db.balance += amount;
      db.history.unshift({
        type: 'Depósito',
        detail: 'Abono a cuenta',
        amount: amount,
        date: new Date().toLocaleDateString(),
      });
      saveAndRedirect('¡Depósito exitoso!');
    }
  });

  // Manejo de Envío de Dinero
  $('#sendForm').on('submit', function (e) {
    e.preventDefault();
    const amount = parseFloat($('#sendAmount').val());
    const contact = $('#contactSelect').val();
    if (amount > db.balance) {
      alert('Saldo insuficiente para esta operación.');
    } else {
      db.balance -= amount;
      db.history.unshift({
        type: 'Envío',
        detail: 'Transferencia a ' + contact,
        amount: amount,
        date: new Date().toLocaleDateString(),
      });
      saveAndRedirect('Dinero enviado correctamente a ' + contact);
    }
  });

  // Renderizar Historial (menu y transactions)
  function renderHistory() {
    const container = $('#transaction-container');
    container.empty();
    db.history.forEach((item) => {
      const isNegative = item.type === 'Envío';
      container.append(`
                <div class="list-group-item d-flex justify-content-between align-items-center transaction-item shadow-sm">
                    <div>
                        <h6 class="mb-0 font-weight-bold">${item.detail}</h6>
                        <small class="text-muted">${item.date} • ${item.type}</small>
                    </div>
                    <span class="h5 font-weight-bold ${
                      isNegative ? 'text-danger' : 'text-success'
                    }">
                        ${isNegative ? '-' : '+'}$${item.amount.toLocaleString('es-CL')}
                    </span>
                </div>
            `);
    });
  }

  function saveAndRedirect(msg) {
    localStorage.setItem('wallet_db', JSON.stringify(db));
    alert(msg);
    window.location.href = 'menu.html';
  }

  updateUI();
});

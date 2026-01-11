$(document).ready(function () {
  function load() {
    let contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
    $('#contactSelect').html('<option value="">Elegir destinatario...</option>');
    contacts.forEach((c) =>
      $('#contactSelect').append(`<option value="${c.name}">${c.name}</option>`)
    );
  }

  $('#saveContact').click(function () {
    let contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
    contacts.push({ name: $('#newName').val() });
    localStorage.setItem('contacts', JSON.stringify(contacts));
    load();
    $('#contactModal').modal('hide');
  });

  $('#confirmSend').click(function () {
    let amount = parseFloat($('#amount').val()),
      balance = parseFloat(localStorage.getItem('balance'));
    let dest = $('#contactSelect').val();
    if (dest && amount <= balance) {
      balance -= amount;
      localStorage.setItem('balance', balance.toFixed(2));
      let txs = JSON.parse(localStorage.getItem('transactions') || '[]');
      txs.unshift({
        type: `Envío a ${dest}`,
        amount: `-$${amount.toFixed(2)}`,
        date: new Date().toLocaleString(),
      });
      localStorage.setItem('transactions', JSON.stringify(txs));
      window.location.href = 'menu.html';
    } else {
      alert('Revisa el saldo o el destinatario');
    }
  });
  load();
});

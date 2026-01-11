$(document).ready(function () {
  $('#btnConfirmDeposit').click(function () {
    const amount = parseFloat($('#depAmount').val());
    if (amount > 0) {
      let balance = parseFloat(localStorage.getItem('balance'));
      balance += amount;
      localStorage.setItem('balance', balance.toFixed(2));

      let txs = JSON.parse(localStorage.getItem('transactions') || '[]');
      txs.unshift({
        type: 'Depósito',
        amount: `+$${amount.toFixed(2)}`,
        date: new Date().toLocaleString(),
      });
      localStorage.setItem('transactions', JSON.stringify(txs));

      alert('¡Saldo actualizado!');
      window.location.href = 'menu.html';
    }
  });
});

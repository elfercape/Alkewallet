$(document).ready(function () {
  let txs = JSON.parse(localStorage.getItem('transactions') || '[]');
  const $list = $('#txList');
  if (txs.length === 0)
    $list.append('<li class="list-group-item bg-transparent text-center">Sin movimientos</li>');
  txs.forEach((t) => {
    let color = t.amount.includes('+') ? 'text-success' : 'text-danger';
    $list.append(`<li class="list-group-item bg-transparent d-flex justify-content-between">
            <div><b>${t.type}</b><br><small class="text-muted">${t.date}</small></div>
            <span class="${color} font-weight-bold">${t.amount}</span></li>`);
  });
});

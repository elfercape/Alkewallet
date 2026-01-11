$(document).ready(function () {
  if (!localStorage.getItem('balance')) {
    localStorage.setItem('balance', '21050.00');
    localStorage.setItem('transactions', JSON.stringify([]));
  }
  $('#loginForm').on('submit', function (e) {
    e.preventDefault();
    if ($('#email').val() === 'user@wallet.com' && $('#password').val() === '123456') {
      window.location.href = 'menu.html';
    } else {
      alert('Datos incorrectos. Intenta con user@wallet.com / 123456');
    }
  });
});

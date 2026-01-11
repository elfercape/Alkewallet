$(document).ready(function () {
  const balance = localStorage.getItem('balance') || '0.00';
  $('#displayBalance').text(`$${balance}`);
});

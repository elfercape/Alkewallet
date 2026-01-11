$(document).ready(function () {
  console.log('Iniciando Alke Wallet...');

  // 1. Configuración Inicial (Opcional)
  // Si es la primera vez que se abre la app, podemos setear valores base
  if (!localStorage.getItem('balance')) {
    localStorage.setItem('balance', '21050.00'); // Saldo de ejemplo
  }

  if (!localStorage.getItem('transactions')) {
    localStorage.setItem('transactions', JSON.stringify([])); // Historial vacío
  }

  if (!localStorage.getItem('contacts')) {
    // Contactos de prueba iniciales
    const initialContacts = [
      { name: 'Juan Pérez', bank: 'Banco Estado' },
      { name: 'María García', bank: 'Santander' },
    ];
    localStorage.setItem('contacts', JSON.stringify(initialContacts));
  }

  // 2. Efecto de salida y redirección
  // Usamos jQuery para un efecto de desvanecimiento suave antes de cambiar de página
  $('body').fadeOut(1000, function () {
    window.location.href = 'login.html';
  });
});

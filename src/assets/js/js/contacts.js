// Обработка формы обратной связи
document.getElementById('feedback-form').addEventListener('submit', function(e) {
  e.preventDefault();
  alert('Спасибо! Ваше сообщение отправлено. Мы свяжемся с вами в ближайшее время.');
  this.reset();
});
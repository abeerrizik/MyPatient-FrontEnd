self.addEventListener("push", function (e) {
  const message = e.data.json();
  self.registration.showNotification(message.text);
});

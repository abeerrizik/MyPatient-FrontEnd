self.addEventListener("push", function (e) {
    const data = e.data.json();
    self.registration.showNotification(data.text, {data});

});


self.addEventListener('notificationclick', function (event) {
    const url = `http://localhost:3000/treatment/${event.notification.data.treatmentId}`

    event.waitUntil(
        clients.matchAll({type: 'window'}).then( windowClients => {
          for (var i = 0; i < windowClients.length; i++) {
            var client = windowClients[i];
            if (client.url === url && 'focus' in client) {
              return client.focus();
            }
          }
          if (clients.openWindow) {
            return clients.openWindow(url);
          }
        })
    );
});

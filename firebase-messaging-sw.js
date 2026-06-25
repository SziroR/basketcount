// Import Firebase Cloud Messaging scripts inside the worker
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

// Initialize Firebase inside the service worker using your config keys
firebase.initializeApp({
  apiKey: "AIzaSyCYY1wMsyEkwXFlbIx0jzfRA5ayDTnTqqY",
  authDomain: "basketcount-kozgaz.firebaseapp.com",
  projectId: "basketcount-kozgaz",
  storageBucket: "basketcount-kozgaz.firebasestorage.app",
  messagingSenderId: "464249124868",
  appId: "1:464249124868:web:79b46b23180d1efc479d51"
});

const messaging = firebase.messaging();

// Listen for notifications when the app is in the background or closed
messaging.onBackgroundMessage((payload) => {
  console.log('Background Notification Received: ', payload);
  
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/icon.png', // path to your app icon
    badge: '/icon.png',
    data: { url: 'https://sziror.github.io/basketcount/' } 
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle notification tap to open the app directly
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data.url)
  );
});
// public/firebase-messaging-sw.js
importScripts(
  "https://www.gstatic.com/firebasejs/9.1.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.1.0/firebase-messaging-compat.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyC0C8FqB1_Nx1g8VOZBNKxilolICqx2ngE",
  authDomain: "carveeps-test.firebaseapp.com",
  projectId: "carveeps-test",
  storageBucket: "carveeps-test.appspot.com",
  messagingSenderId: "942195275591",
  appId: "1:942195275591:web:f75f16f92d5db9e342be62",
};
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

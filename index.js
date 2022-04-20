const admin = require('firebase-admin');


// var serviceAccount = require("./serviceAcount.json");

admin.initializeApp({
  credential: admin.credential.cert(proces.env.GOOGLE_APPLICATION_CREDENTIALS),
})

const sendMessageToDevice = (deviceToken, data) => {
  const mensaje = {
    data: data,
    token: deviceToken
  }

  admin.messaging().send(mensaje)
    .then((response) => {
      return response;

    })
    .catch((error) => {
      console.log('Error sending message:', error);
    })
};

const sendMessageToAllDevices = (tokensDevices, data) => {
  const mensaje = {
    data: data,
    tokens: tokensDevices
  }

  admin.messaging().sendMulticast(mensaje)
    .then((response) => {
      if (response.failureCount > 0) {
        const failedTokens = [];
        response.responses.forEach((resp, idx) => {
          if (!resp.success) {
            failedTokens.push(registrationTokens[idx]);
          }
        });
        console.log('List of tokens that caused failures: ' + failedTokens);
      }
      return response;

    })
    .catch((error) => {
      console.log('Error sending message:', error);
    })
}

const sendMessageToTopic = (topic, data) => {
  const mensaje = {
    data: data,
    topic: topic
  }

  admin.messaging().send(mensaje)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log('Error sending message:', error);
    })
}

module.exports = { sendMessageToDevice, sendMessageToAllDevices, sendMessageToTopic };
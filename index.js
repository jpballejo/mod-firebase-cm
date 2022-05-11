const admin = require("firebase-admin");

// var serviceAccount = require("./serviceAcount.json");

admin.initializeApp({
  credential: admin.credential.cert(process.env.GOOGLE_APPLICATION_CREDENTIALS),
});

const sendMessageToDevice = (deviceToken, data) => {
  const mensaje = {
    data: { data: JSON.stringify(data) },
    token: deviceToken,
  };

  admin
    .messaging()
    .send(mensaje)
    .then((response) => {
      return "Send message ";
    })
    .catch((error) => {
      console.log("Error sending message:", error);
      return error;
    });
};

const sendMessageToAllDevices = (tokensDevices, data) => {
  const mensaje = {
    data: { data: JSON.stringify(data) },
    tokens: tokensDevices,
  };

  admin
    .messaging()
    .sendMulticast(mensaje)
    .then((response) => {
      if (response.failureCount > 0) {
        const failedTokens = [];
        response.responses.forEach((resp, idx) => {
          if (!resp.success) {
            failedTokens.push(registrationTokens[idx]);
          }
        });
        console.log("List of tokens that caused failures: " + failedTokens);
      }
      return "Send all messages ";
    })
    .catch((error) => {
      console.log("Error sending message:", error);
      return error;
    });
};

const sendMessageToTopic = (topic, data) => {
  const mensaje = {
    data: { data: JSON.stringify(data) },
    topic: topic,
  };

  admin
    .messaging()
    .send(mensaje)
    .then((response) => {
      return "Send message to topic";
    })
    .catch((error) => {
      console.log("Error sending message:", error);
      return error;
    });
};

module.exports = {
  sendMessageToDevice,
  sendMessageToAllDevices,
  sendMessageToTopic,
};

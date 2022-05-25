const admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert(process.env.GOOGLE_APPLICATION_CREDENTIALS),
});

const sendMessageToDevice = (deviceToken, data) => {
  const message = {
    notification: data.notification,
    data: { data: JSON.stringify(data.data) },
    token: deviceToken,
  };
  admin
    .messaging()
    .send(message)
    .then((response) => {
      return "Send message ";
    })
    .catch((error) => {
      console.log("Error sending message to device:", error);
      return error;
    });
};

const sendMessageToAllDevices = (tokensDevices, data) => {
  const message = {
    notification: data.notification,
    data: { data: JSON.stringify(data.data) },
    tokens: tokensDevices,
  };

  admin
    .messaging()
    .sendMulticast(message)
    .then((response) => {
      if (response.failureCount > 0) {
        const failedTokens = [];
        response.responses.forEach((resp, idx) => {
          if (!resp.success) {
            failedTokens.push(tokensDevices[idx]);
          }
        });
        console.log("List of tokens that caused failures: " + failedTokens);
      }
      return "Send all messages ";
    })
    .catch((error) => {
      console.log("Error sending multicast message:", error);
      return error;
    });
};

const sendMessageToTopic = (topic, data) => {
  const message = {
    notification: data.notification,
    data: { data: JSON.stringify(data.data) },
    topic: topic,
  };

  admin
    .messaging()
    .send(message)
    .then((response) => {
      return "Send message to topic" + topic;
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

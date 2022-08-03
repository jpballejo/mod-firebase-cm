const admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert(process.env.GOOGLE_APPLICATION_CREDENTIALS),
});

const sendMessageToDevice = (deviceToken, data, callback) => {
  const message = {
    notification: data.notification,
    data: { data: JSON.stringify(data.data) },
    token: deviceToken,
  };
  admin
    .messaging()
    .send(message)
    .then((response) => {
      if (callback) {
        return callback(true, response);
      } else {
        return "Send message to device success";
      }
    })
    .catch((error) => {
      if (callback) {
        return callback(false, error);
      } else {
        return "Send message to device failed " + error;
      }
    });
};

const sendMessageToAllDevices = (tokensDevices, data, callback) => {
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
      if (callback) {
        return callback(true, response);
      } else {
        return "Send message to all devices success";
      }
    })
    .catch((error) => {
      if (callback) {
        return callback(false, error);
      } else {
        return "Send message to all devices failed " + error;
      }
    });
};

const sendMessageToTopic = (topic, data, callback) => {
  const message = {
    notification: data.notification,
    data: { data: JSON.stringify(data.data) },
    topic: topic,
  };

  admin
    .messaging()
    .send(message)
    .then((response) => {
      if (callback) {
        return callback(true, response);
      } else {
        return "Send message to topic success";
      }
    })
    .catch((error) => {
      if (callback) {
        return callback(false, error);
      } else {
        return "Send message to topic failed " + error;
      }
    });
};

module.exports = {
  sendMessageToDevice,
  sendMessageToAllDevices,
  sendMessageToTopic,
};

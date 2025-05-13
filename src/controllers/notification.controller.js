const { request, response } = require("express");
const admin = require("firebase-admin");

const notificationGroupUsers = async (req = request, res = response) => {
  try {
    const { tokens, title, body, image, data } = req.body;
    var today = new Date();
    var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + ":" + today.getMilliseconds();
    data.date = date + ' ' + time;
    const message = {
      tokens: tokens,
      notification: {
        title: title,
        body: body,
      },
      data: data,
      android: {
        priority: "normal",
        notification: {
          visibility: 'public',
          channelId: 'title',
          priority: 'max',
          defaultVibrateTimings: true,
          icon: 'stock_ticker_update',
          color: '#419388',
          sound: 'default',
          notification_priority: 'priority_high'
        }
      },
      apns: {
        payload: {
          aps: {
            contentAvailable: true,
            mutableContent: 1,
            sound: 'default',
            priority: 'high'
          },
        },
        headers: {
          "apns-priority": "5",
        },
      },
    };
    if (image != null) {
      message.notification.image = image;
    }
    console.log(tokens)
    admin
      .messaging()
      .sendEachForMulticast(message)
      .then((response) => {
        res.json({ msg: "Successfully sent message", message: response });
      })
      .catch((error) => {
        console.log(error);
        res.status(400).json({ msg: "error", message: error });
      })
      ;
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador", message: error
    });
  }
};

module.exports = {
  notificationGroupUsers,
};

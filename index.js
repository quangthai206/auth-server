const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const Pusher = require("pusher");
const pusher = new Pusher({
  appId: "1329740",
  key: "35311733394757534659",
  secret: "1400adb010651368c687",
  cluster: "ap3",
  useTLS: true,
});
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// SEND_MESSAGE
app.post("/messages", (req, res) => {
  req.body.value.commentBadges = [];

  pusher.trigger(req.body.channelName, "message", req.body)
    .then(() => {
      res.json({"message": "send message success"});
    })
    .catch(() => {
      res.status(400).json({"message": "something wrong happened."});
    })
});

// MUTE
app.put("/live/:liveIdentifier/setting/mute/:state", (req, res) => {
  let pusherBody = {
    "type": req.params.state == "ON" ? "START_MUTE/1": "END_MUTE/1"
  }

  pusher.trigger(req.params.liveIdentifier, "message", pusherBody)
    .then(() => {
      res.json({"message": "mute function success"});
    })
    .catch(() => {
      res.status(400).json({"message": "something wrong happened."});
    })
});

// MIRROR
app.put("/live/:liveIdentifier/setting/mirror/:state", (req, res) => {
  let pusherBody = {
    "type": req.params.state == "ON" ? "START_MIRROR/1": "END_MIRROR/1"
  }

  pusher.trigger(req.params.liveIdentifier, "message", pusherBody)
    .then(() => {
      res.json({"message": "mirror function success"});
    })
    .catch(() => {
      res.status(400).json({"message": "something wrong happened."});
    })
});

// FINISH_LIVE
app.delete("/live/:liveIdentifier", (req, res) => {
  let pusherBody = {
    "type": "END_LIVE/1"
  }

  pusher.trigger(req.params.liveIdentifier, "message", pusherBody)
    .then(() => {
      res.json({"message": "finish live success"});
    })
    .catch(() => {
      res.status(400).json({"message": "something wrong happened."});
    })
});

// SEND_NICE
app.post("/live/nice", (req, res) => {
  req.body.value.commentBadges = [];

  pusher.trigger(req.body.channelName, "message", req.body)
    .then(() => {
      res.json({"message": "send message success"});
    })
    .catch(() => {
      res.status(400).json({"message": "something wrong happened."});
    })
});

// SEND_GIFT
app.post("/gift", (req, res) => {
  let pusherBody = {
    receiver: null,
    type: "SEND_GIFT/1",
    value: {
      id: "2eb49b1c-355f-48dc-a175-47b94e39dfe9",
      liveId: req.body.channelName,
      localDateTime: "2022-01-24T12:06:34.577Z",
      expiredDateTime: null,
      sourceGiftType: {
        id: "c87174c4-439f-4097-85b6-da78c218483d",
        name: "HELLO!（軽）",
        amount: 1,
        coins: 1,
        giftCategories: [
          {
            id: "cc471585-3a3c-4bff-b43d-5f8f7bac70c7",
            name: "定番",
            description: "まずはコレ！安心の定番ギフト"
          }
        ],
        icon: {
          id: "08528591-e4b7-4c25-a10c-1d84d6ec8cae",
          uri: "https://user-cdn.dev.everylive.jp/582883969ff74feaa4029e420ecc62d4_2de46c3a954741b6971a8c1ca5605a3f",
          mediaType: "image/png"
        },
        animation: {
          id: "c56aa830-ab41-4602-ace2-46f75c152c91",
          uri: "https://system-cdn.dev.everylive.jp/gift/animation/5812ec4a7bf143f39b652bea15f339f6_hello.png",
          mediaType: "image/apng"
        }
      },
      sender: req.body.user,
      giftType: {
        id: "c87174c4-439f-4097-85b6-da78c218483d",
        name: "HELLO!（軽）",
        amount: 1,
        coins: 1,
        giftCategories: [
          {
            id: "cc471585-3a3c-4bff-b43d-5f8f7bac70c7",
            name: "定番",
            description: "まずはコレ！安心の定番ギフト"
          }
        ],
        icon: {
          id: "08528591-e4b7-4c25-a10c-1d84d6ec8cae",
          uri: "https://user-cdn.dev.everylive.jp/582883969ff74feaa4029e420ecc62d4_2de46c3a954741b6971a8c1ca5605a3f",
          mediaType: "image/png"
        },
        animation: {
          id: "c56aa830-ab41-4602-ace2-46f75c152c91",
          uri: "https://system-cdn.dev.everylive.jp/gift/animation/5812ec4a7bf143f39b652bea15f339f6_hello.png",
          mediaType: "image/apng"
        }
      },
      combo: {
        id: "7fa742c1-f1bb-4582-91be-3804ad6c79f3",
        sendDateTime: "2022-01-24T12:06:35.340Z",
        count: 1,
        comboId: "7fa742c1-f1bb-4582-91be-3804ad6c79f3"
      }
    },
    sendDateTime: "2022-01-24T12:06:35.414Z"
  }

  pusher.trigger(req.body.channelName, "message", pusherBody)
    .then(() => {
      res.json(pusherBody.value);
    })
    .catch(() => {
      res.status(400).json({"message": "something wrong happened."});
    })
});

const port = process.env.PORT || 1234;
app.listen(port, () => {
  console.log(`Start listening on port ${port}`);
});
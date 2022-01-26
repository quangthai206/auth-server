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
    type: req.params.state == "ON" ? "START_MUTE/1": "END_MUTE/1"
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
    type: req.params.state == "ON" ? "START_MIRROR/1": "END_MIRROR/1"
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
    type: "END_LIVE/1"
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

// PUBLISH_LIVE
app.post("/publish-live", (req, res) => {
  let pusherBody = {
    type: "PUBLISH_LIVE/1"
  }

  pusher.trigger(req.body.channelName, "message", pusherBody)
    .then(() => {
      res.json({"message": "publish live success"});
    })
    .catch(() => {
      res.status(400).json({"message": "something wrong happened."});
    })
});

// PRIVATE_LIVE
app.post("/private-live", (req, res) => {
  let pusherBody = {
    type: "PRIVATE_LIVE/1"
  }

  pusher.trigger(req.body.channelName, "message", pusherBody)
    .then(() => {
      res.json({"message": "private live success"});
    })
    .catch(() => {
      res.status(400).json({"message": "something wrong happened."});
    })
});

// JOIN_USER
app.post("/join-user", (req, res) => {
  let pusherBody = {
    type: "JOIN_USER/1",
    value: {
      registeredDateTime:"2021-04-13T01:56:13.184Z",
      catchPhrase:{
        id:"eb870be8-0164-4bb9-b547-0a42784e11a0",
        value:""
      },
      id:"f0951350-89c5-413d-a1f2-f39def9799fc",
      level:63,
      sub:"ZfOMNvXYFYUTUnt5IQfUKfQWNid2",
      picture:{
        id:"4ec75437-92aa-4962-aec7-8ac61f7acbfe",
        uri:"https://user-cdn.dev.everylive.jp/f095135089c5413da1f2f39def9799fc_01bbacea947c4092b7e43d99cc7bc97e",
        mediaType:"image/png"
      },
      loginId:"th93",
      description:{
        id:"da870811-ba58-467d-807f-6b51917153f4",
        value:""
      },
      liverLeague:1
    }
  }

  pusher.trigger(req.body.channelName, "message", pusherBody)
    .then(() => {
      res.json({"message": "join user success"});
    })
    .catch(() => {
      res.status(400).json({"message": "something wrong happened."});
    })
});

// LEAVE_USER
app.post("/leave-user", (req, res) => {
  let pusherBody = {
    type: "LEAVE_USER/1",
    value: {
      registeredDateTime:"2021-04-13T01:56:13.184Z",
      catchPhrase:{
        id:"eb870be8-0164-4bb9-b547-0a42784e11a0",
        value:""
      },
      id:"f0951350-89c5-413d-a1f2-f39def9799fc",
      level:63,
      sub:"ZfOMNvXYFYUTUnt5IQfUKfQWNid2",
      picture:{
        id:"4ec75437-92aa-4962-aec7-8ac61f7acbfe",
        uri:"https://user-cdn.dev.everylive.jp/f095135089c5413da1f2f39def9799fc_01bbacea947c4092b7e43d99cc7bc97e",
        mediaType:"image/png"
      },
      loginId:"th93",
      description:{
        id:"da870811-ba58-467d-807f-6b51917153f4",
        value:""
      },
      liverLeague:1
    }
  }

  pusher.trigger(req.body.channelName, "message", pusherBody)
    .then(() => {
      res.json({"message": "leave user success"});
    })
    .catch(() => {
      res.status(400).json({"message": "something wrong happened."});
    })
});

// FOLLOW_USER
app.post("/follow-user", (req, res) => {
  let pusherBody = {
    type: "FOLLOW_USER/1",
    value: {
      registeredDateTime:"2021-04-13T01:56:13.184Z",
      catchPhrase:{
        id:"eb870be8-0164-4bb9-b547-0a42784e11a0",
        value:""
      },
      id:"f0951350-89c5-413d-a1f2-f39def9799fc",
      level:63,
      sub:"ZfOMNvXYFYUTUnt5IQfUKfQWNid2",
      picture:{
        id:"4ec75437-92aa-4962-aec7-8ac61f7acbfe",
        uri:"https://user-cdn.dev.everylive.jp/f095135089c5413da1f2f39def9799fc_01bbacea947c4092b7e43d99cc7bc97e",
        mediaType:"image/png"
      },
      loginId:"th93",
      description:{
        id:"da870811-ba58-467d-807f-6b51917153f4",
        value:""
      },
      liverLeague:1
    }
  }

  pusher.trigger(req.body.channelName, "message", pusherBody)
    .then(() => {
      res.json({"message": "follow user success"});
    })
    .catch(() => {
      res.status(400).json({"message": "something wrong happened."});
    })
});

// NOTIFY_BERRY_COIN
app.post("/notify-berry-coin", (req, res) => {
  let pusherBody = {
    type: "NOTIFY_BERRY_COIN/1",
    value: {
      coin: 69
    }
  }

  pusher.trigger(req.body.channelName, "message", pusherBody)
    .then(() => {
      res.json({"message": "notify berry coin success"});
    })
    .catch(() => {
      res.status(400).json({"message": "something wrong happened."});
    })
});

// NOTIFY_SCORE
app.post("/notify-score", (req, res) => {
  let pusherBody = {
    type: "NOTIFY_SCORE/1",
    value: {
      score: 180
    }
  }

  pusher.trigger(req.body.channelName, "message", pusherBody)
    .then(() => {
      res.json({"message": "notify score success"});
    })
    .catch(() => {
      res.status(400).json({"message": "something wrong happened."});
    })
});

// NOTIFY_LIVER_LEVEL
app.post("/notify-level", (req, res) => {
  let pusherBody = {
    type: "NOTIFY_LIVER_LEVEL/1",
    value: {
      registeredDateTime:"2021-04-13T01:56:13.184Z",
      catchPhrase:{
        id:"eb870be8-0164-4bb9-b547-0a42784e11a0",
        value:""
      },
      id:"f0951350-89c5-413d-a1f2-f39def9799fc",
      level: 69,
      sub:"ZfOMNvXYFYUTUnt5IQfUKfQWNid2",
      picture:{
        id:"4ec75437-92aa-4962-aec7-8ac61f7acbfe",
        uri:"https://user-cdn.dev.everylive.jp/f095135089c5413da1f2f39def9799fc_01bbacea947c4092b7e43d99cc7bc97e",
        mediaType:"image/png"
      },
      loginId:"th93",
      description:{
        id:"da870811-ba58-467d-807f-6b51917153f4",
        value:""
      },
      liverLeague:1
    }
  }

  pusher.trigger(req.body.channelName, "message", pusherBody)
    .then(() => {
      res.json({"message": "notify liver level success"});
    })
    .catch(() => {
      res.status(400).json({"message": "something wrong happened."});
    })
});

// NOTIFY_BOARD
app.post("/notify-board", (req, res) => {
  let pusherBody = {
    type:"NOTIFY_BOARD/1",
    value:{
      id:"42d731df-e3df-492e-9a2b-a6363ed48c6b",
      point:{
        x:50,
        y:50
      },
      message:"hello",
      type:{
        id:"8b406bd9-fa3f-48a3-88a9-89692789c47d",
        textColor:"#000000",
        image:{
          id:"87979132-e482-46e0-a9c3-d9966a1e8680",
          uri:"https://system-cdn.dev.everylive.jp/system/a4ad44c13ba641c0a003f60d19efadd5_board_01_adjust_2.png",
          mediaType:"image/png"
        }
      }
    }
 }

  pusher.trigger(req.body.channelName, "message", pusherBody)
    .then(() => {
      res.json({"message": "notify board success"});
    })
    .catch(() => {
      res.status(400).json({"message": "something wrong happened."});
    })
});

// NOTIFY_GIFTTOP_AUDIENCE
app.post("/notify-gifttop", (req, res) => {
  let pusherBody = {
    type:"NOTIFY_GIFTTOP_AUDIENCE/1",
    value:[
      {
        id:"6616b4c4-80fd-427f-a6e3-5e3871b882f1",
        sub:"h5BtZkj43yZjgtTwpyIdjLbfPQC3",
        registeredDateTime:"2021-07-27T08:37:05.115Z",
        loginId:"kysubon",
        level:1,
        notAllowedStreamingUntilDateTime:null,
        liverLeague:3,
        isCertifiedLiver:false,
        picture:{
          id:"3341840e-91dc-4f79-9634-cb460fea2bf1",
          uri:"https://user-cdn.everylive.jp/2ab192a2ae1f4292961fa41e3683627d_ee3409616a6b43f6ba7402d8d00ee9da",
          mediaType:"image/png"
        },
        description:{
          id:"a24f83eb-ccb6-4d5e-87dd-18db5fe1b73f",
          value:""
        },
        catchPhrase:{
          id:"97f8cc9c-adf0-4652-8d1b-72e028bcd384",
          value:""
        },
        coin:20,
        star:1
      }
    ],
    sendDateTime:"2022-01-26T04:45:40.102Z"
 }

  pusher.trigger(req.body.channelName, "message", pusherBody)
    .then(() => {
      res.json({"message": "notify gift top success"});
    })
    .catch(() => {
      res.status(400).json({"message": "something wrong happened."});
    })
});

const port = process.env.PORT || 1234;
app.listen(port, () => {
  console.log(`Start listening on port ${port}`);
});
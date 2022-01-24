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

const port = process.env.PORT || 1234;
app.listen(port, () => {
  console.log(`Start listening on port ${port}`);
});
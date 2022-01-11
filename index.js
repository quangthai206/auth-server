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

app.post("/messages", (req, res) => {
  console.log(req.body);

  pusher.trigger(req.body.channelName, req.body.event, req.body)
    .then(() => {
      res.json({"message": "send message success"});
    })
    .catch(() => {
      res.status(400).json({"message": "something wrong happened."});
    })
});

app.post("/pusher/auth", (req, res) => {
  const socketId = req.body.socket_id;
  const channel = req.body.channel_name;
  console.log(`new auth request: socketId = ${socketId}, channel = ${channel}`);
  const auth = pusher.authenticate(socketId, channel);
  res.send(auth);
});

const port = process.env.PORT || 1999;
app.listen(port, () => {
  console.log(`Start listening on port ${port}`);
});
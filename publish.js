const express = require("express");
const redis = require("redis");
const app = express();

let publisher = redis.createClient({
  url: "redis://localhost:6379",
});

publisher.on("error", (err) => console.log("redis error"));
publisher.on("connect", (err) => console.log("redis connected"));

const connect = async () => {
  await publisher.connect();
};

connect();

app.get("/", (req, res) => {
  console.log("Publisher is 4001 port");
  res.send({ message: "Publisher is 4001 port " });
});
app.get("/publish", async (req, res) => {
  const id = Math.floor(Math.random() * 10);
  console.log(`Publisher id ${id}`);
  let data = {
    id: id,
    message: `Publisher id is ${id} `,
  };
  await publisher.publish("message", JSON.stringify(data));
  res.send({ message: "data Publish successfull!!" });
});

app.listen(4001, () => {
  console.log(`Publisher server start on posrt 4001`);
});

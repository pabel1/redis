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

app.listen(4001, () => {
  console.log(`Publisher server start on posrt 4001`);
});

const express = require("express");
const redis = require("redis");
const app = express();

let subscriber = redis.createClient({
  url: "redis://localhost:6379",
});

subscriber.on("error", (err) => console.log("redis error"));
subscriber.on("connect", (err) => console.log("redis connected"));

const connect = async () => {
  await subscriber.connect();

  await subscriber.subscribe("message", (data) => {
    console.log(data);
  });
};

connect();

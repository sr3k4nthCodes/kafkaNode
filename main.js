const kafka = require("kafka-node");
const bp = require("body-parser");
const config = require("./config");

const Producer = kafka.Producer;
const client = new kafka.KafkaClient({ kafkaHost: config.kafka_server });
const producer = new Producer(client);
const topic = "first-topic";
const partitions = 3;
const TIME_INTERVAL = 2000;

let count = 0;
let payloads = [];
producer.on("ready", () => {
  console.log("ready");
  setInterval(() => {
    payloads = [
      { topic, messages: `I have ${count} devices`, partitions },
    ];

    producer.send(payloads, (err, data) => {
      console.log(data);
      count += 1;
    });
  }, TIME_INTERVAL);
});

producer.on("error", (err) => {
  console.log(err);
});

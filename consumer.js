const kafka = require("kafka-node");
const config = require("./config");

const Consumer = kafka.Consumer;
const TOPIC = 'first-topic';

const client = new kafka.KafkaClient({
    autoConnect: false,
    kafkaHost: config.kafka_server,
});

consumer = new Consumer(client, [{ topic: TOPIC, partitions: 3 }], {
    autoCommit: false,
});

consumer.on("message", (message) => {
    console.log(message);
});

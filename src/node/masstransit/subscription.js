const assert = require("assert");

function subscription(parameters) {
  const { consumerFactory, queueName } = parameters;
  const noAck = {
    noAck: true
  };

  async function subscribe(bus, channel) {
    const messageType = consumerFactory().subscribeTo();
    await channel.assertExchange(messageType, "fanout");
    await channel.bindExchange(queueName, messageType);
    await channel.consume(queueName, createHandler(bus), noAck);
  }

  async function unsubscribe() {}

  function createHandler(bus) {
    return message => {
      const content = convertToJSON(message);
      const consumer = consumerFactory();
      const context = { ...content, ...bus };
      consumer.handle(context);
    };
  }

  function convertToJSON(message) {
    return JSON.parse(message.content);
  }

  return Object.freeze({ subscribe, unsubscribe });
}

module.exports = subscription;

var rabbitUrl = require("url-parse");
var wrapMessageInMassTransitStructure = require("./wrapMessageInMassTransitStructure");
const ROUTING_KEY = "";

function publisher(parameters) {
  const { channel, url, queueName } = parameters;
  const urlParts = rabbitUrl(url);

  async function publish(content) {
    const message = wrapMessageInMassTransitStructure(
      content,
      urlParts,
      queueName,
      content.messageType
    );
    await channel.assertExchange(content.messageType, "fanout");
    await channel.publish(content.messageType, ROUTING_KEY, message);
  }

  return Object.freeze({ publish });
}

module.exports = publisher;

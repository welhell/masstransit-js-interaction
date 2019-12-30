var rabbitUrl = require("url-parse");
var wrapMessageInMassTransitStructure = require("./wrapMessageInMassTransitStructure");

function sender(parameters) {
  const { channel, url, queueName } = parameters;
  const urlParts = rabbitUrl(url);

  async function send(endpoint, content) {
    const message = wrapMessageInMassTransitStructure(
      content,
      urlParts,
      queueName,
      endpoint
    );
    await channel.sendToQueue(endpoint, message);
  }

  return Object.freeze({ send });
}

module.exports = sender;

const sender = require("./sender");
const publisher = require("./publisher");

function startableBus(parameters) {
  const { internalBus, channel, subscriptions } = parameters;

  async function start() {
    const promises = subscriptions.map(s => s.subscribe(internalBus, channel));
    await Promise.all(promises);
  }

  async function stop() {
    const promises = subscriptions.map(s => s.unsubscribe(channel));
    await Promise.all(promises);
    await channel.connection.close();
  }
  return Object.freeze({ start, stop });
}

function bus(parameters) {
  const internalBus = { ...sender(parameters), ...publisher(parameters) };

  return {
    ...internalBus,
    ...startableBus({ internalBus, ...parameters })
  };
}

module.exports = bus;

const amqp = require("amqplib");
const subscription = require("./subscription");
const bus = require("./bus");

function busBuilder(parameters) {
  const { queueName, url } = parameters;
  const consumerFactories = [];

  function addConsumer(consumerFactory) {
    consumerFactories.push(consumerFactory);
    return this;
  }

  async function build() {
    const connection = await amqp.connect(url);
    const channel = await createChannel(connection);
    const subscriptions = createSubscriptions(channel);
    return bus({ channel, subscriptions, url, queueName });
  }

  async function createChannel(connection) {
    const channel = await connection.createChannel();
    await configureChannel(channel);
    return channel;
  }
  async function configureChannel(channel) {
    await channel.assertQueue(queueName);
    await channel.assertExchange(queueName, "fanout");
    await channel.bindQueue(queueName, queueName);
  }

  function createSubscriptions(channel) {
    return consumerFactories.map(factory =>
      createSubscription(factory, channel)
    );
  }

  function createSubscription(consumerFactory, channel) {
    return subscription({
      channel,
      consumerFactory,
      queueName
    });
  }

  return Object.freeze({ addConsumer, build });
}

module.exports = busBuilder;

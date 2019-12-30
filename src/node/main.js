const uuidv1 = require("uuid/v1");
const busBuilder = require("./masstransit/busBuilder");
const doSomethingNodeConsumer = require("./consumers/doSomethingNodeConsumer");
const somethingHappenNodeConsumer = require("./consumers/somethingHappenNodeConsumer");
const readKey = require("./util/readKey");
const messageFactory = require("./messageFactories/messageFactory");

const queueName = "node.client";
const endpointName = "net.client";
const url = "amqp://guest:guest@localhost";

(async function main() {
  const bus = await busBuilder({ url, queueName })
    .addConsumer(doSomethingNodeConsumer)
    .addConsumer(somethingHappenNodeConsumer)
    .build();
  await bus.start();

  while (true) {
    const value = await readKey();
    if (value === "exit") {
      break;
    }
    console.log(`The value is:${value}`);
    await sendCommand(bus);
  }
  await bus.stop();
  process.exit(0);
})().catch(error => console.error(error));

async function sendCommand(sender) {
  const message = messageFactory.doSomethingNet({
    id: uuidv1(),
    someProperty: "From node"
  });
  console.log(`Sending message:${JSON.stringify(message)}`);
  await sender.send(endpointName, message);
}

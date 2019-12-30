const uuidv1 = require("uuid/v1");
const messageFactory = require("../messageFactories/messageFactory");

function doSomethingNodeConsumer() {
  function subscribeTo() {
    return "Net.Commands:IDoSomethingNode";
  }

  async function handle(context) {
    console.log(context);
    await sendSomethingHappend(context);
  }

  async function sendSomethingHappend(context) {
    const message = messageFactory.somethingHappenNet({
      id: uuidv1(),
      commandId: context.message.id,
      someProperty: "From node"
    });
    await context.publish(message);
  }

  return Object.freeze({ subscribeTo, handle });
}

module.exports = doSomethingNodeConsumer;

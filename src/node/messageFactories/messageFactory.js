function doSomethingNet(message) {
  return {
    messageType: "Net.Commands:IDoSomethingNet",
    message: message
  };
}

function somethingHappenNet(message) {
  return {
    messageType: "Net.Events:ISomethingHappenNet",
    message: message
  };
}

module.exports = {
  doSomethingNet: doSomethingNet,
  somethingHappenNet: somethingHappenNet
};

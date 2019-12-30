function somethingHappenNodeConsumer() {
  function subscribeTo() {
    return "Net.Events:ISomethingHappenNode";
  }

  function handle(context) {
    console.log(context);
  }

  return Object.freeze({ subscribeTo, handle });
}

module.exports = somethingHappenNodeConsumer;

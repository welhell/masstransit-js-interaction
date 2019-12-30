const readline = require("readline");
const lineReader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const readKey = (function() {
  const getLine = (async function*() {
    for await (const line of lineReader) {
      yield line;
    }
  })();
  return async () => (await getLine.next()).value;
})();

module.exports = readKey;

function wrapMessageInMassTransitStructure(
  content,
  urlParts,
  sourceQueue,
  destinationQueue
) {
  const messageType = { messageType: [`urn:message:${content.messageType}`] };
  const strMessage = JSON.stringify({
    ...messageType,
    sourceAddress: getAddress(urlParts, sourceQueue),
    destinationAddress: getAddress(urlParts, destinationQueue),
    headers: {},
    message: {
      ...content.message
    },
    sentTime: new Date().toISOString()
  });
  console.log(strMessage);
  return Buffer.from(strMessage);
}

function getAddress(urlParts, destinationQueue) {
  const protocol = urlParts.protocol;
  const hostname = urlParts.hostname;
  const port = urlParts.port ? ":" + urlParts.port : "";
  return `${protocol}//${hostname}${port}/${destinationQueue}`;
}

module.exports = wrapMessageInMassTransitStructure;

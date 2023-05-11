chrome.runtime.onMessage.addListener(function (request, sender) {
  if (request.type === "TAB_UPDATED") {
    const container = document.createElement("div");
    container.id = "javis-extension-container";
    document.body.appendChild(container);
  }
});

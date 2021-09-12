console.log("background running");

chrome.action.onClicked.addListener(buttonClicked);

function buttonClicked(tab) {
  let msg = {
    txt: "calculate-safety"
  }
  chrome.tabs.sendMessage(tab.id, msg);
}

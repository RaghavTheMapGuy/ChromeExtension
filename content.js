console.log("Chrome extension go!");

chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message, sender, sendResponse) {
  console.log(message.txt);

  if (message.txt === "calculate-safety") {
    let start = document.getElementById('sb_ifc50').getElementsByTagName("input")[0].getAttribute("aria-label");
    let end = document.getElementById('sb_ifc51').getElementsByTagName("input")[0].getAttribute("aria-label");
    
    let s = start.replace("Starting point ", "");
    let e = end.replace("Destination ", "");
    
    console.log(s, e);
    // var s = "ResMed, Innovation Centre, 1 Elizabeth MacArthur Dr, Bella Vista NSW 2153";
    // var e = "UNSW Library, Library, Kensington NSW 2035"; 
    makeCall(s, e);
  }

}

function makeCall(start, end) {
  const req = new XMLHttpRequest();
  const serverhost = 'http://127.0.0.1:63380/suburbs';
  const urlParams = `source=${start}&destination=${end}`;

  req.open("POST", serverhost, true);
  req.setRequestHeader("Content-type", "application/json");
  req.send(urlParams);

  req.onreadystatechange = function() { // Call a function when the state changes.
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
        console.log("Got response 200!");
        console.log(req.response);
    } else if (this.status !== 200) {
      console.log("Status" + this.status);
    }
  }
}
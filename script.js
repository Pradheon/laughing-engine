var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;

// start the speech recognition and send the text captured to the "sendToBrain" function.
//var recognition = new SpeechRecognition();
const recognition = new webkitSpeechRecognition();
recognition.lang = "en-US";
recognition.continuous = false;
recognition.interimResults = false;

window.onclick = function() {
    recognition.start();
    console.log("Speech recognition started. Awaiting command...");
}

recognition.onResult = function (event) {
    var capturedText = event.results[0][0].transcript;
    console.log(capturedText);
    sendToBrain(capturedText);
    console.log("Confidence: " + event.results[0][0].confidence);
};

// function to use Ajax to send recognized speech to the brain.
function sendToBrain(msg) {
    url = "https://www.securetransaction.uk/aibaas/brigitkylie/engen/jsontest2.php";
    fields = "?msg="+msg;

    var xhttp;
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readystate == 4 && xhttp.status == 200) {
            handleresponse(xhttp);
        }
    };
    try {
        xhttp.open("GET", url+fields, true);
        xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhttp.send(fields);
    }
    catch (err) {
        console.log(err.message);
    }
}

// function to speak the response from the brain.
function handleResponse(xhttp) {
    reply = xhttp.responseText;
    sayText(reply, 4, 1, 4);
}

// Chrome support for speech recognition with prefixed properties
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
//const SpeechGrammarList = SpeechGrammarList || window.webkitSpeechGrammarList;
//const SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;


// start the speech recognition and send the text captured to the "sendToBrain" function.
var recognition = new SpeechRecognition();
recognition.lang = "en-US";
recognition.continuous = false;
recognition.interimResults = false;

document.body.onclick = function() {
    recognition.start();
    console.log("Speech recognition started. Awaiting command...");
}

// In the event the above method does not function, use the below method provided by Darren
/* 
$(document).ready(function() {
    $("button").click(function() {
        recognition.start();
    });
});
*/

recognition.onResult = function (event) {
    var capturedText = event.results[0][0].transcript;
    console.log("Captured Text: " + capturedText);
    sendToBrain(capturedText);
    console.log("Confidence: " + event.results[0][0].confidence);
};

// function to use Ajax to send recognized speech to the brain.
function sendToBrain(msg) {
    url = "https://www.securetransaction.uk/aibaas/birgitkylie/engen/jsontest2.php";
    fields = "?msg="+msg;

    var xhttp;
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            handleResponse(xhttp);
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
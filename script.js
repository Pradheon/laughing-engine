// Chrome support for speech recognition with prefixed properties
const SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
const SpeechGrammarList = window.SpeechGrammarList || webkitSpeechGrammarList;
const SpeechRecognitionEvent = window.SpeechRecognitionEvent || webkitSpeechRecognitionEvent;


// start the speech recognition and send the text captured to the "SendToBrain" function.
var recognition = new webkitSpeechRecognition();
recognition.language = "en-GB";
recognition.continuous = false;
recognition.interimResults = false;

//var diagnostic = document.querySelector('.output');

document.body.onload = function () {
    recognition.start();
    console.log("Ready to recieve a command.");
}

/*
recognition.onSpeechStart = function() {
    recognition.start();
    console.log("Speech recognition ready to recieve query.")
}
*/

recognition.onResult = function (event) {
    console.log("recognition.result called");
    captureText = event.results[0][0].transcript;
    SendToBrain(captureText);
};

recognition.onSpeechEnd = function () {
    recognition.stop();
}
/*
recognition.onnomatch = (event) => {
    diagnostic.textContent = "I didn't quite catch that, could you repeat that?";
}

recognition.onerror = (event) => {
    diagnostic.textContent = `Error occurred in recognition: ${event.error}`;
}
*/

// function to use Ajax to send recognized speech to the brain.
function SendToBrain(message) {
    url = "https://www.securetransaction.uk/aibaas/brigitkylie/engen/jsontest2.php";
    fields = "?message=" + message;

    var xhttp;
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readystate == 4 && xhttp.status == 200) {
            handleresponse(xhttp);
        }
    };
    try {
        xhttp.open("GET", url + fields, true);
        xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhttp.send(fields);
    }
    catch (error) {
        console.log(error.message);
    }
}

// function to speak the response from the brain.
function handleResponse(xhttp) {
    reply = xhttp.responseText;
    sayText(reply, 4, 1, 4);
}
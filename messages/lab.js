// Script File for Message Parsing

request = new XMLHttpRequest();

function parse() {
        // Step 1: Set Up the HTTP Request
        request.open("GET", "data.json", true);

        // Step 2: Handle the Response
        request.onreadystatechange = function() {
                if (request.readyState == 4) {
                        data = request.responseText;
                        messages = JSON.parse(data);
                        elem = document.getElementById("messages");
                        elem.innerHTML = ""; 
                        for (i = 0; i < messages.length; i++) {
                                elem.innerHTML += "<p>" + messages[i]["content"] + 
                                                  " " + messages[i]["username"] + 
                                                  "</p>" + "\n";
                        }
                }
        };
        // Step 3: Fire Off The Request
        request.send(null);
}
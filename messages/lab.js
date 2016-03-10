// Script File for Message Parsing

request = new XMLHttpRequest();

function parse() {
        request.open("GET", "data.json", true);

        request.onreadystatechange = function() {
                if (request.readyState == 4 && request.status == 200) {
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
                else if (request.readyState == 4 && request.status != 200) {
                        elem.innerHTML = "<p>Unable to Load</p>";
            }
        };
        request.send(null);
}
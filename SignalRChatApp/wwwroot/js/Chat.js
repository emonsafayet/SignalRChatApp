"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/chathub").build();

//Disable send button untill connection is established

document.getElementById("sendButton").disable = true;

connection.on("ReceiveMessage", function (user, message) {
    var msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    var encodeMsg = user + " says: " + msg;
    var li = document.createElement("li");
    li.textContent = encodeMsg;
    document.getElementById("messageList").appendChild(li);
});

connection.start().then(function () {
    connection.invoke("GetConnection").then(function (id) {
        document.getElementById("connectionId").innerHTML = id;
    });
    document.getElementById("sendButton").disabled = false;
}).catch(function (err) {
    return console.log(err.tostring());
});

document.getElementById("sendButton").addEventListener("click", function (event) {
    var user = document.getElementById("userInput").value;
    var message = document.getElementById("messageInput").value;
    connection.invoke("SendMessage", user, message).catch(function (err) {
        return console.error(err.tostring());
    });
    event.preventDefault();
});
document.getElementById("sendToUser").addEventListener("click", function (event) {
    var user = document.getElementById("userInput").value;
    var receiverConnectionId = document.getElementById("receiverId").value;
    var message = document.getElementById("messageInput").value;
    connection.invoke("SendToUser", user, receiverConnectionId, message).catch(function (err) {
        return console.error(err.tostring());
    });
    event.preventDefault();
});
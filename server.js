// Setup basic express server
const express = require("express");
const app = express();
const path = require("path");

// Routing for frontend static files
app.use(express.static(path.join(__dirname, "public")));

//This would use the port configured on the OS (probablly there's none configured) or port 3000
app.set("port", process.env.PORT || 3000);

// Start server
const server = app.listen(app.get("port"), () => {
    console.log(`LISTENING ON PORT ${app.get("port")}`);
})

// WEBSOCKETS
const socketIO = require("socket.io");
const io = socketIO(server);

let turn = true;                    // True when it's player's 1 turn. False when it is player's 2 turn

io.on("connection", (socket) => {
    console.log("New connection", socket.id);

    // Every time the server gets the turn from a player
    socket.on("sendTurn", (turnChosen) => {
        io.sockets.emit("sendTurnFromServer", turnChosen);
    });

    // When the server gets the message of a player winning
    socket.on("winningMessage", (WinningMsg) => {
        io.sockets.emit("winningMessageFromServer", WinningMsg);
    });

});
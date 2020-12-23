# tictactoeOverServer
A server hosting a tictactoe game over 2 clients

------------

This repository consists on the following files:
- A server.js file which starts the server and manages requests from clients (the players).
- An index.html file that serves as the landing page, where the game is displayed.
- A client.js file that manages the interaction of the players with the game and sends them to the server.
- A main.css file with the decoration of the html.

The server uses the frameworks:
- express
- socket.io

------------

The game is a simple tictactoe game. Starts with player 1 who chooses a number between 1 and 9, then an "X" is placed in that spot instead of the "."
After that, it is player 2 turn, who chooses a number and places "O" in that space.
The game ends after a player makes a line of 3 of his/her symbols.
The game shows an alert when a player wins. It also shows an alert when the player chooses something that is not a number between 1 and 9. And when the player chooses a space that has previously been chosen.

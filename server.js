const express = require('express');
const path = require('path');
const http = require('http');
const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'inputUser.html'));
});

app.get('/chat', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
});

server.listen(4000, '0.0.0.0', () => {
    console.log('listening on *: 4000');
});
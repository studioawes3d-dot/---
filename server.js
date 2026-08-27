const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('مستخدم متصل:', socket.id);

    // استقبال الضغط وإرسال الرنين للبقية
    socket.on('trigger-ring', () => {
        socket.broadcast.emit('start-ringing');
    });
});

server.listen(3000, () => {
    console.log('الخادم يعمل على المنفذ 3000');
});
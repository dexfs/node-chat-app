const express = require('express');
const path = require('path');
const http = require('http'); 
const socketIO = require('socket.io');
const publicPath = path.join(__dirname, '../public'); 
const port = process.env.PORT || 3000; 
const app = express(); 
const server = http.createServer(app);

const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('newMessage', {
        from: 'dexfs@example.com',
        text: 'Hey, what is going on.', 
        createdAt: 123
    });

    socket.on('createMessage', (message) => {
        console.log('createMessage', message);
        socket.emit('newMessage', message);
    })
    socket.on('disconnect', () => {
        console.log('User was disconnected');
    }); 
}); 
server.listen(port, () => {
    console.log(`App listening on port ${port}!`);
});
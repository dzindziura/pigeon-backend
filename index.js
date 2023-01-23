const express = require('express')
const mongoose = require('mongoose')
const bp = require('body-parser')
const cors = require('cors')
const session = require("cookie-session")
const checkAuth = require('./utils/checkAuth.js')
const { UserController, PageosController, ChatController } = require('./controller/index.js');
const { registration, login, setNewAvatar, getUser } = require('./controller/UserController.js');
const multer = require('multer');
const app = express();
const http = require('http').Server(app);
require('dotenv').config();

const PORT = 4000;
const HOST = 'localhost';
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))

const socketIO = require('socket.io')(http, {
    cors: {
        origin: process.env.FRONTEND_HOST
    }
});
app.get('/api', (req, res) => {
    res.json({
        message: 'Hello world',
    });
});
global.onlineUsers = new Map();

socketIO.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);
    socket.on('message', (data) => {
        socketIO.emit('messageResponse', data);
    });


    socket.on('newUser', (data) => {
        onlineUsers.set(data, socket.id)
    });

    socket.on("send-msg", (data) => {
        const sendUserSocket = onlineUsers.get(data.messageTo);
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit("msg-recieved", data.message);
        }
    });
});


mongoose.connect(process.env.MONGO_URL)
    .then(() => { console.log('DB OK') }
    ).catch((err) => console.log('DB ERROR', err))

app.set('view engine', 'ejs');
app.use(bp.json())
app.use(cors())
app.use(bp.urlencoded({ extended: false }))
app.use(express.static('public'))
app.use('/uploads', express.static('uploads'))

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads')
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname)
    },
})

const upload = multer({ storage });



app.post('/auth/register', registration)

app.post('/auth/login', login)

app.post('/posts/add', upload.single('file'), PageosController.add)

app.post('/api/setNewAvatar', upload.single('avatar'), setNewAvatar)

app.get('/api/posts/getAll/:userId', PageosController.getAll)

app.post('/api/sendMessage', ChatController.sendMessage);

app.delete("/post/:id", PageosController.deletePageos)

app.get("/getUser", getUser)

app.get("/api/getMessage/:id/:toId", ChatController.getMessage)



http.listen(PORT, () => {
    console.log(`Server is running: http:/${HOST}:${PORT}`)
})


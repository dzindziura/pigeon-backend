import express from 'express'
import mongoose from 'mongoose'
import bp from 'body-parser'
import cors from 'cors'
import session from "cookie-session"
import checkAuth from './utils/checkAuth.js'
import { UserController, PageosController } from './controller/index.js';


const app = express();
const PORT = 4000;
const HOST = 'localhost';
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))

mongoose.connect(
    'mongodb+srv://dzindzura:99fuduzat-99@cluster0.slpwi8p.mongodb.net/test2?retryWrites=true&w=majority'
).then(() => {console.log('DB OK')}
).catch((err) => console.log('DB ERROR', err))

app.set('view engine', 'ejs');

app.use(bp.json())
app.use(cors())
app.use(bp.urlencoded({ extended: false }))
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('index')
})
app.get('/register', (req, res) => {
    res.render('register')
})
app.get('/login', (req, res) => {
    res.render('login')
})

app.post('/auth/register', UserController.registration)

app.post('/auth/login', UserController.login)

app.post('/posts/add', checkAuth, PageosController.add)

app.get('/api/posts/getAll', PageosController.getAll)

app.delete("/users/:id/delete", PageosController.deletePageos)

app.listen(PORT, () => {
    console.log(`Server is running: http:/${HOST}:${PORT}`)
})
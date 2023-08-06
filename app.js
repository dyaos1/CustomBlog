const express = require('express')
const app = express()
const port = 3000
const session = require('express-session')
const cookieParser = require('cookie-parser')

const [ postCreate, postRead, postUpdate, postDelete ] = require('./router/post');
const [ userRouter ] = require('./router/user');

app.use(express.json()) // json
app.set('view engine', 'pug'); // pug
app.use(express.urlencoded({ extended: true })) // req.body

// app.use(cookieParser()); // cookie-parser

// app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'flzomb',
  resave: false,
  saveUninitialized: false,
}))

app.get('/', function (req, res) {
    res.render('index', { title: 'Hey', message: 'Hello there!'});
  });

app.use('/posts', postRead);
app.use('/update', postUpdate);
app.use('/create', postCreate);
app.use('/delete', postDelete);
app.use('/user', userRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


const express = require('express')
const app = express()
const port = 3000

const postRouter = express.Router()
const createRouter = express.Router()
const updateRouter = express.Router()

const POST = require('./src/post')

app.use(express.json()) // json
app.set('view engine', 'pug'); // pug
app.use(express.urlencoded({ extended: true })) // req.body

postRouter.param('id', (req, res, next, value) => {
    req.postRouternumber = value
    next()
})



app.get('/', function (req, res) {
    res.render('index', { title: 'Hey', message: 'Hello there!'});
  });

postRouter.get('/', (req, res) => {  
    res.render('home', { title: 'Phrase', message: 'Qoutes', posts: POST})
})

postRouter.get('/:id/', (req, res) => {

    console.log(typeof req.postRouternumber)
    const result = POST.find((e) => e.id.toString() === req.postRouternumber)
    console.log(result)
    console.log(typeof result.id)
    if (result === undefined) {
        res.writeHead(404);
        res.end('not found');
    } else {
        const id = result.id
        res.render('post', { title: id, post: result})
    }
})

createRouter.get('/', (req, res) => {
    res.render('create_post', { title:"create post", message:"create new post" })
})

createRouter.post('/', (req, res) => {
    const { title, content, nickname } = req.body

    const newPost = {
        id: POST.length,
        nickname: nickname,
        title: title,
        content: content,
    }
    console.log(newPost)
    res.render('post', {title: newPost.id, post: newPost})
})


updateRouter.param('id', (req, res, next, value) => {
    req.updateRouternumber = value
    next()
})

updateRouter
.route('/:id')
.get((req, res) => {
    const id = req.updateRouternumber
    const targetPost = POST.find((e) => e.id.toString() === id )
    res.render('update_post', { title: 'update', message: `update post: ${id}`, post: targetPost})
})
.post((req, res)=>{
    const { title, content, nickname } = req.body
    const id = req.updateRouternumber
    const newPost = {
        id: id,
        nickname: nickname,
        title: title,
        content: content,
    }
    console.log(newPost)
    res.render('post', {title: newPost.id, post: newPost})
})

app.use('/posts', postRouter)
app.use('/create', createRouter)
app.use('/update', updateRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


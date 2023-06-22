const express = require('express')
const app = express()
const port = 3000

const Board = express.Router()

const POST = require('./src/post')

app.use(express.json())


Board.param('id', (req, res, next, value) => {
    req.boardnumber = value
    next()
})

app.get('/', (req, res) => {
  res.send('list of board')
})

Board.get('/home', (req, res) => {
    const longStringOfPosts = POST.reduce((acc, v) => 
        acc + v.id.toString() + " | " + v.title.toString() + " | " + v.nickname.toString() + "<br>",
        ""
    )
    res.send(longStringOfPosts)
})

Board.get('/:id/', (req, res) => {
    const result = POST.filter((e)=>e.id == Number(req.boardnumber))[0]
    if (result === undefined) {
        res.writeHead(404);
        res.end('not found');
    } else {
        res.send(`author: ${result.nickname}<br>title: ${result.title}<br>content:${result.content}`)
    }
})

Board.post('/create', (req, res) => {
    const newPost = {
        id: POST.length+1,
        title: req.body.title,
        content: req.body.content,
        nickname: req.body.nickname
    }
    POST.push(newPost)
    const longStringOfPosts = POST.reduce((acc, v) => 
        acc + v.id.toString() + " | " + v.title.toString() + " | " + v.nickname.toString() + "<br>",
        ""
    )
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    res.send(longStringOfPosts)
})

app.use(Board)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


const express = require('express')
const postUpdate = express.Router()
const postCreate = express.Router()
const postRead = express.Router()
const postDelete = express.Router()

const POST = require('../src/posts')
const USER = require('../src/users')

// param
postUpdate.param('id', (req, res, next, value) => {
    req.postUpdateParamURL = value
    next()
})

postRead.param('id', (req, res, next, value) => {
    req.postReadParamURL = value
    next()
})

// login check
const loginCheck = (req, res, next) => {
    if (req.session.user) {
        console.log(req.session.user)
        next()
    } else {
        res.redirect('/user/login')
    }
}

const authorityCheck = (req, res, next) => {
    const post = POST.find((e) => e.id.toString() === req.postUpdateParamURL)

    if (req.session.user && req.session.user.id === post.author) {
        next()
    } else {
        res.render('index', {title: 'not authorized', message: "you are not authorized!" })
    }
}


// CRUD
postCreate.route('/')
.get(loginCheck, (req, res) => {
    res.render('create_post', { title:"create post", message:"create new post" })
})
.post((req, res) => {
    const { title, content, nickname } = req.body

    const authorId = req.session.user.id

    const newPost = {
        id: POST.length +1, // delete 추가시 바꿔야 함
        author: authorId,
        title: title,
        content: content,
    }
    POST.push(newPost)
    res.redirect('/posts/'+newPost.id.toString())
})


postRead.get('/', (req, res) => {

    let userSession = {
        authorized: false
    }
    if (req.session.user) {
        userSession = req.session.user
    }

    POST.map((el) => {
        const user = USER.find((item) => (el.id === item.id) )
        el.nickname = user.nickname
    })
    res.render('home', { title: 'Phrase', message: 'Qoutes', posts: POST, userSession: userSession })
})

postRead.get('/:id/', (req, res) => {
    const result = POST.find((e) => e.id.toString() === req.postReadParamURL)

    const user = USER.find((e) => e.id === result.author)
    result.nickname = user.nickname

    if (result === undefined) {
        res.writeHead(404);
        res.end('not found');
    } else {
        const id = result.id
        res.render('post', { title: id, post: result})
    }
})

postUpdate
.route('/:id')
.get(authorityCheck, (req, res) => {
    const id = req.postUpdateParamURL
    const targetPost = POST.find((e) => e.id.toString() === id )
    res.render('update_post', { title: 'update', message: `update post: ${id}`, post: targetPost})
})
.post((req, res)=>{
    const { title, content } = req.body
    const id = req.postUpdateParamURL
    const postNum = POST.findIndex((e) => (e.id.toString() === id))
    console.log(id, typeof id, postNum)
    const authorId = Number(req.session.user.id)

    const newPost = {
        id: Number(id),
        author: authorId,
        title: title,
        content: content,
    }
    POST[postNum] = newPost
    console.log(POST)
    res.render('post', {title: newPost.id, post: newPost})
})

postDelete.post('/', (req, res) => {
    console.log(req.body)
    const deletePostIdx = POST.findIndex(e=> e.id.toString() === req.body['delete'])
    console.log(deletePostIdx)
    POST.splice(deletePostIdx, 1)
    console.log(POST)
    res.redirect('/posts')
})

module.exports = [ postCreate, postRead, postUpdate, postDelete ]
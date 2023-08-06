const express = require('express')
const postCreate = express.Router()
const POST = require('../src/posts')

postCreate.get('/', (req, res) => {
    res.render('create_post', { title:"create post", message:"create new post" })
})

postCreate.post('/', (req, res) => {
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

module.exports = postCreate
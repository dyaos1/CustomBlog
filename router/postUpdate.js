const express = require('express')
const postUpdate = express.Router()

const POST = require('../src/posts')

postUpdate.param('id', (req, res, next, value) => {
    req.postUpdateParamURL = value
    next()
})

postUpdate
.route('/:id')
.get((req, res) => {
    const id = req.postUpdateParamURL
    const targetPost = POST.find((e) => e.id.toString() === id )
    res.render('update_post', { title: 'update', message: `update post: ${id}`, post: targetPost})
})
.post((req, res)=>{
    const { title, content, nickname } = req.body
    const id = req.postUpdateParamURL
    const newPost = {
        id: id,
        nickname: nickname,
        title: title,
        content: content,
    }
    console.log(newPost)
    res.render('post', {title: newPost.id, post: newPost})
})

module.exports = postUpdate
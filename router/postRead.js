const express = require('express');
const postRead = express.Router()
const POST = require('./src/post')


postRead.param('id', (req, res, next, value) => {
    req.postReadParamURL = value
    next()
})

postRead.get('/', (req, res) => {  
    res.render('home', { title: 'Phrase', message: 'Qoutes', posts: POST})
})

postRead.get('/:id/', (req, res) => {

    const result = POST.find((e) => e.id.toString() === req.postReadParamURL)

    if (result === undefined) {
        res.writeHead(404);
        res.end('not found');
    } else {
        const id = result.id
        res.render('post', { title: id, post: result})
    }
})

module.exports = postRead
const express = require('express')
const userRouter = express.Router()

const USER = require('../src/users')

// sign up
userRouter
.route('/signup/')
.get((req, res) => {
    res.render('user_signUp', {title: "sign up page", message: "Welcome To Join Us"})
})
.post((req, res) => {
    console.log(req.body)
    const { username, nickname, password, email } = req.body
    const date = new Date()
    const timeNow = date.getFullYear().toString()+'-'+
                    date.getMonth().toString()+'-'+
                    date.getDate().toString()
    console.log(timeNow)
    newUser = {
        id: USER.length,
        username: username,
        nickname: nickname,
        password: password,
        email: email,
        signUpDate: timeNow,
    }
    console.log(newUser)

    USER.push(newUser)
    res.render('index', {title: "Welcome New User", message: "Welcome New User: "+newUser.nickname})
})

// log in
userRouter
.route('/login/')
.get((req, res) => {
    res.render('user_login', {title: "log in page", message: "Login Plz"})
})
.post((req, res) => {
    const { username, password } = req.body
    const result = USER.find((e) => e.username === username && e.password === password )
    if (result) {
        req.session.user = {
            id: result.id,
            password: result.password,
            username: result.username,
            authorized: true,
        };
        res.redirect('/posts')
    } else {
        res.render('index', {title: 'login failed', message: 'login failed!'})
    }
})
// log out
userRouter
.route('/logout/')
.get((req, res) => {
    // req.session.user = {
    //     id: -1,
    //     password: '',
    //     username: '',
    //     authorized: false,
    // };
    if (req.session.user) {
        req.session.destroy((err) => {
            if (err) {
              console.log("세션 삭제시에 에러가 발생했습니다.");
              return;
            }
            console.log("세션이 삭제됐습니다.");
            res.redirect("/posts");
        });
    } else {
        res.redirect('/posts')
    }
})

module.exports = [userRouter]

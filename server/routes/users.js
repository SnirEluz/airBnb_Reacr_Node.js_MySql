const router = require('express').Router()
const SQL = require('../db');
const { onlyLoggedUsers } = require('../helpers/onlyMembers');

router.post('/login', async (req, res) => {
    const {userName, passWord } = req.body
    try {
        if (!userName || !passWord) { return res.send({ err: "Missing some info" }) }
        const user = await SQL(`SELECT * FROM users WHERE userName = "${userName}"`)
        const userLogin = user.find(user => user.userName == userName && user.passWord == passWord)
        if (!userLogin) { return res.send({ err: "Incorrect username or password" }) }
        req.session.userId = userLogin.id
        res.send({ msg: "Login Succes"})
    } catch (err) {
        res.sendStatus(400)
    }
})
router.delete('/logout', onlyLoggedUsers, (req, res) => {
    if (!req.session.userId) {
        return res.send({ err: "you are not logged" })
    }
    req.session.destroy()
    res.send({ msg: "bye bye! it was nice to see you again" })
})
router.post('/register', async (req, res) => {
    const { firstName, lastName, userName, passWord } = req.body
    try {
        if (!firstName || !lastName || !userName || !passWord) { return res.send({ err: "Missing some info" }) }
        const user = await SQL(`SELECT userName FROM users`)
        if (user.some(u => u.userName == userName)) {
            return res.send({ err: "Username already taken" })
        }
        await SQL(`
            INSERT INTO users (firstName, lastName, userName, passWord)
            VALUES("${firstName}","${lastName}","${userName}","${passWord}")`)
        const userId = await SQL(`SELECT * FROM users WHERE userName = "${userName}"`)
        req.session.userId = userId[0].id
        res.send({ msg: "User has been successfuly created" })
    } catch (err) {
        res.status(400).send(console.log(err))
    }
})
router.get('/userSession', onlyLoggedUsers, async (req, res) => {
    try {
        const user = await SQL(`SELECT * FROM users WHERE id = ${req.session.userId}`, )
        res.send(user[0])
    } catch (err) {
        res.status(400).send(req.session.userId)
    }
})

module.exports = router

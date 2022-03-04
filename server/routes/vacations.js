const router = require('express').Router()
const SQL = require('../db');
const { onlyLoggedUsers } = require('../helpers/onlyMembers');

router.get('/', onlyLoggedUsers, async (req, res) => {
    try {
        const vacations = await SQL(`SELECT * FROM vacations`)
        res.send(vacations)
    } catch (err) {
        res.sendStatus(400)
    }
})
router.get('/followers/:vacationsId', onlyLoggedUsers, async (req, res) => {
    const { vacationsId } = req.params
    try {
        const vacations = await SQL(`SELECT * FROM followers where vacationsId = ${vacationsId}`)
        res.send(vacations)
    } catch (err) {
        res.sendStatus(400)

    }
})
router.post('/follow', onlyLoggedUsers, async (req, res) => {
    const { userName, userId, vacationsId } = req.body
    try {
        await SQL(`UPDATE vacations SET followers = followers + 1 WHERE id = ${vacationsId}`)
        await SQL(`INSERT INTO
           followers (userName, userId, vacationsId)
           VALUES ("${userName}",${userId},${vacationsId})`)
        res.send({ msg: "follow success" })
    } catch (err) {
        res.sendStatus(400)
    }
})
router.delete('/unfollow', onlyLoggedUsers, async (req, res) => {
    const { followId, vacationsId } = req.body
    try {
        await SQL(`UPDATE vacations SET followers = followers - 1 WHERE id = ${vacationsId}`)
        await SQL(`DELETE FROM followers where id = ${followId}`)
        res.send({ msg: "Unfollow success" })
    } catch (err) {
        res.sendStatus(400)
    }
})
// Admin
router.post('/addVacation', async (req, res) => {
    const { info, destination, image, startDate, endDate, price } = req.body
    try {
        await SQL(`INSERT INTO
           vacations(info, destination, image, startDate, endDate, price)
           VALUES ("${info}","${destination}","${image}","${startDate}","${endDate}",${price})`)
        res.send({ msg: "Vacations Added" })
    } catch (err) {
        res.sendStatus(400)
    }
})
router.put('/editVacation', async (req, res) => {
    const { info, destination, image, startDate, endDate, price, vacationId } = req.body
    try {
        await SQL(`UPDATE vacations SET info = "${info}", destination = "${destination}", image = "${image}", startDate = "${startDate}", endDate = "${endDate}", price = ${price} WHERE id = ${vacationId}`)
        res.send({ msg: "Vacations Edited" })
    } catch (err) {
        res.status(400).send(console.log(err))
    }
})
router.delete('/delVacation', onlyLoggedUsers, async (req, res) => {
    const { vacationsId } = req.body
    try {
        await SQL(`DELETE FROM followers WHERE vacationsId = ${vacationsId}`)
        await SQL(`DELETE FROM vacations WHERE id = ${vacationsId}`)
        res.send({ msg: "Vacations Delete" })
    } catch (err) {
        res.sendStatus(400)
    }
});

module.exports = router
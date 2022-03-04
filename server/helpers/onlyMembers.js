module.exports.onlyLoggedUsers = (req, res, next) => {
    if (req.session.userId) {
        next()
    } else {
        res.send({err:"sensetive content for logged users only, plesae log in"})
    }
}

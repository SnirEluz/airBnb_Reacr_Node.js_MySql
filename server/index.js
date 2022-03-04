const express = require('express')
const session = require('express-session')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))
app.use(session({
    secret: "saasa(dsa)",
    name: "session",
    saveUninitialized: true,
    resave: true,
    secure: false,
    cookie: {
        maxAge: 1000 * 60 * 60
    }
}))

app.get('/', (req, res)=>{
    res.send(console.log("server is running"))
})

app.use('/users', require('./routes/users'))
app.use('/vacations', require('./routes/vacations'))

app.listen(1000, () => {
    console.log("server is runnimg")
});


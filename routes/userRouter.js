import User from "../models/userSchema.js"
import bcrypt from 'bcrypt'
import * as express from 'express'

const userRouter = express.Router()

userRouter.post('/login', async (req, res) => {
    const newData = req.body
    
    console.log(newData)
    if (!newData.username || !newData.password) {
        res.status(400).send({ error: "Username or password missing from request" })
        return
    } 


    try {
        const user = await User.findOne({ username: newData.username });
        const match = await bcrypt.compare(newData.password, user.password)
        if (!user || !match) {
            return res.status(401).send({ error: 'Invalid username or password' })
        }
        res.status(201).send({ username: user.username })
    } catch (err) {
        res.status(500).send({message: "There was an error"})
    }
})

userRouter.post('/register', async (req, res) => {
    const newData = req.body
    
    if (!newData.username || !newData.password) {
        res.status(400).send({ error: "Username or password missing from request" })
        return
    } 

    const exsitingUser = await User.findOne({ username: newData.username });
    if(exsitingUser) {
        return res.status(400).send({ error: 'Username already taken'})
    }

    try {
        const hashedPassword = await bcrypt.hash(newData.password, 10)
        const newUser = await User.create({ username: newData.username, password: hashedPassword}) 
        console.log(newUser)
        res.status(201).send(newUser)
    } catch (err) {
        res.status(500).send({message: "There was an error"})
    }
})

export { userRouter }
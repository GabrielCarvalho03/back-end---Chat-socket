import Express from "express";
import { Server } from "socket.io";
import { createServer } from 'http'
const app = Express()

const server = createServer(app)

const io = new Server(server, {cors:{origin:'*'}})
// 

io.on('connection', socket => {
    // console.log('user conected', socket.id)
})

app.get('/user', (req, res) =>{
    return res.send("ok")
})


export { server, io }
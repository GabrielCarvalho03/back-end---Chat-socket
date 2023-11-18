import Express from "express";
import { Server } from "socket.io";
import { createServer } from 'http'
import cors from 'cors'

const app = Express()
app.use(cors())

const server = createServer(app)

const io = new Server(server)

io.on('connection', socket => {
    // console.log('user conected', socket.id)
})

app.listen(3333, () => {
    console.log('server is running')
})

export { server, io }
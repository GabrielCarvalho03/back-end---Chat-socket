import Express from "express";
import { Server } from "socket.io";
import { createServer } from 'http'
import cors from 'cors'

const app = Express()
app.use(cors())

const server = createServer(app)

const io = new Server(server)

const port = process.env.PORT || 3333;

io.on('connection', socket => {
    // console.log('user conected', socket.id)
})

app.listen(Number(port),"0.0.0.0", () => {
    console.log('server is running')
})

export { server, io }
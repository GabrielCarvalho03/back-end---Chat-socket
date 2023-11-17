import  Express  from "express";
import { Server } from "socket.io";
import { createServer} from 'http'

const app = Express()
const server = createServer(app)

const io = new Server(server , {cors : {origin: 'https://front-end-chat-67re-rmmt7lo0a-biel192501ma.vercel.app'},} , )

io.on('connection', socket =>{
    // console.log('user conected', socket.id)
})

app.listen(3333, ()=>{
    console.log('server is running')
})

export { server , io}
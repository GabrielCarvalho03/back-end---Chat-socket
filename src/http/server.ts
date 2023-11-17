import  Express  from "express";
import { Server } from "socket.io";
import { createServer} from 'http'

const app = Express()
const server = createServer(app)

const io = new Server(server , {cors : {origin: 'http://127.0.0.1:5173'}})

io.on('connection', socket =>{
    // console.log('user conected', socket.id)
})

app.listen(3333, ()=>{
    console.log('server is running')
})

export { server , io}
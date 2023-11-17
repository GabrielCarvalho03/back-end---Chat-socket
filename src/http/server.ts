import  Express  from "express";
import { Server } from "socket.io";
import { createServer} from 'http'
import cors from 'cors'

const app = Express()
const server = createServer(app)

const io = new Server(server)

app.use(cors({
    origin: 'https://front-end-chat-67re-biel192501ma.vercel.app',
    methods: ['GET', 'POST'],
    credentials: true,
  }));
  

io.on('connection', socket =>{
    // console.log('user conected', socket.id)
})

app.listen(3333, ()=>{
    console.log('server is running')
})

export { server , io}
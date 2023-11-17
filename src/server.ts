import { server } from "./http/server"
import '../src/websocket/chat'
import '../Db'



server.listen(8000, ()=>{
    console.log('server is running')
})
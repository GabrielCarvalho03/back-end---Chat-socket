import { server } from "./http/server"
import '../src/websocket/chat'
import '../Db'
import Express from "express";

const port = process.env.PORT || 3333;




server.listen(port, ()=>{
    console.log(`server is running in port${port}`)
})
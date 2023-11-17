import { io } from "../http/server";
import { chatRom } from "../models/chatRom.model";
import { message } from "../models/message.model";
import { user} from "../models/user.model";





io.on('connect', (socket) =>{
    socket.on("disconnect", socket => {
        console.log('disconnect', socket)
      });

      socket.on('user', async data =>{
        const {email , photo, socketId, name} = data
        const EmailExist = await user.find({email})
       try{
        if(EmailExist.length) {
          for(let email of EmailExist){
             const userExist = await user.findByIdAndUpdate(email._id , {socketId})      
          }
          socket.emit('logged', { logged: true , email , socketId, photo ,name});

          return;
        }else{
          const newUser = await new user({name, email, photo,socketId,}).save()
          socket.emit('logged', { logged: true , email, socketId , photo, name});
        }
         
       }catch(err){
        console.log('erro', err)
       }
      })

      socket.on('getUser',async (data)=>{
        let aux = []
        const {email} = data
        const getUserByEmail = await user.find({email})
        for(let item of getUserByEmail){
          const allChats = await chatRom.find({idUsers:{ $all:[item._id]}})
          for(let chat of allChats){
            const allUserChat = await user.find({_id:{$in: chat.idUsers}})
              aux.push(allUserChat)
          }
          socket.emit('allChats', aux)

        }
      })

      socket.on('start_chat',  async  (data, callback) =>{
           try{
            console.log(data.socketId)
            const getUserBySocketID = await user.findOne({
              socketId: `${socket.id}`
              })
             const getChatRomExist = await chatRom.findOne({
              idUsers :{
                $all:[getUserBySocketID?._id ,data.userId ]
              }
             })

             if(getChatRomExist){
              socket.join(getChatRomExist.idChatRom)
              const messageAll = await message.find({
                idChatRom : getChatRomExist.idChatRom , 
              }).populate("to")
              return callback({getChatRomExist, messageAll});
             }
            const newChat = await new chatRom({idUsers:[data.userId ,getUserBySocketID?._id ] }).save()
            socket.join(newChat.idChatRom)
            console.log('recurso criado com sucesso',newChat)
              
                 callback(newChat)

           


           }catch(err){
            console.log("err", err)
           }
      } )

      socket.on('message', async (data) =>{

        try{
          const getUserBySocketID = await user.findOne({
            socketId: `${socket.id}`
            })

            const saveMessage = await new message({
              to: getUserBySocketID?._id , 
              text: data.message , 
              idChatRom: data.idChatRom
            }).save()

            const messageAll = await message.find({
              idChatRom : data.idChatRom , 
            }).populate("to")

            io.to(data.idChatRom).emit('message', {
              message:  saveMessage , 
              getUserBySocketID,
               messageAll 
            })

          
              
              let aux: any = []
            const allChats = await chatRom.find({idUsers:{ $all:[getUserBySocketID?._id]}})
            for(let chat of allChats){
              const allUserChat = await user.find({_id:{$in: chat.idUsers}})
                  aux.push(...aux , allUserChat)
                io.emit('allChats', aux)
            }




        }catch(err){
          console.log('err', err)
        }
      })

      socket.on('searchUsers',async (data, callback) =>{
        const {name} = data 

        const users = await user.find({name : name})

        callback(users)
      })
})
import mongoose from "mongoose";
import {v4} from 'uuid'
const { Schema } = mongoose




const chatRomSchema = new Schema({

    idUsers: [
        {type : Schema.Types.ObjectId ,
         ref: "users"
        }
    ],
    idChatRom : {
        type: String , 
        default: v4
    }
 

})


const chatRom = mongoose.model('chatRom', chatRomSchema)


export { chatRom}
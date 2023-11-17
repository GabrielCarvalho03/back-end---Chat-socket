import mongoose from "mongoose";
const { Schema } = mongoose




const messagemSchema = new Schema({

    to : {
        type: Schema.Types.ObjectId , 
        ref: "User"
    },
   text: String , 
    
   created_at :{
    type: Date , 
    default: Date.now()
   },
    idChatRom : {
        type: String , 
        ref : 'chatroms'
    }
 

})


const message = mongoose.model('message', messagemSchema)


export { message}
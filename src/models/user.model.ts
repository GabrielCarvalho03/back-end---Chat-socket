import mongoose from "mongoose";

const { Schema } = mongoose




const userSchema = new Schema({

    socketId: String,
    name: String ,
    email: {
        type: String,
        require: true,
        unique: true
    },
    photo: String

})


const user = mongoose.model('User', userSchema)


export { user}
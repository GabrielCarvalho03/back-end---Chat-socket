import { io } from "../http/server";
import { chatRom } from "../models/chatRom.model";
import { message } from "../models/message.model";
import { user } from "../models/user.model";

io.on("connect", (socket) => {
  socket.on("disconnect", (socket) => {
    console.log("disconnect", socket);
  });

  socket.on("UserLoged", async (data, callback) => {
    const { email } = data;
    const userExist = await user.findOne({ email });

    if (userExist) {
      user.findByIdAndUpdate(userExist._id, {
        socketId: socket.id,
      });
      return socket.emit("logged", {
        logged: true,
        email,
        socketId: userExist.socketId,
        photo: userExist.photo,
        name: userExist.name,
        userName: userExist?.userName,
      });
    } else {
      callback({ erro: "user not logged" });
    }
  });

  socket.on("userLogin", async (data, callback) => {
    const { email, socketId, password } = data;
    const userExist = await user.findOne({ email, password });

    if (userExist) {
      user.findByIdAndUpdate(userExist._id, {
        socketId,
      });
      return socket.emit("logged", {
        logged: true,
        email,
        socketId,
        photo: userExist.photo,
        name: userExist.name,
        userName: userExist?.userName,
      });
    } else {
      callback({ erro: "não existe usuário com essas crendenciais" });
    }
  });

  socket.on("userRegister", async (data, callback) => {
    const { email, photo, socketId, name, userName } = data;
    try {
      const EmailExist = await user.findOne({ email });
      if (EmailExist) {
        return callback({
          EmailExistErro: "Essa conta ja existe, por favor faça login",
        });
      } else {
        const ExistUserName = await user.findOne({ userName });
        if (ExistUserName) {
          return callback({ EmailExistErro: "Nome de usuário já existe!" });
        }
        const newuser = await user.create(data);
        socket.emit("logged", {
          logged: true,
          email,
          socketId,
          photo: newuser.photo,
          name: newuser.name,
          userName: newuser.userName,
        });
      }
    } catch (err) {
      console.log("erro", err);
    }
  });

  socket.on("getUser", async (data) => {
    let aux = [];
    const { email } = data;
    const getUserByEmail = await user.find({ email });
    for (let item of getUserByEmail) {
      const allChats = await chatRom.find({ idUsers: { $all: [item._id] } });
      for (let chat of allChats) {
        const allUserChat = await user.find({ _id: { $in: chat.idUsers } });
        aux.push(allUserChat);
      }
      socket.emit("allChats", aux);
    }
  });

  socket.on("start_chat", async (data, callback) => {
    try {
      console.log(data.socketId);
      const getUserBySocketID = await user.findOne({
        socketId: `${socket.id}`,
      });
      const getChatRomExist = await chatRom.findOne({
        idUsers: {
          $all: [getUserBySocketID?._id, data.userId],
        },
      });

      if (getChatRomExist) {
        socket.join(getChatRomExist.idChatRom);
        const messageAll = await message
          .find({
            idChatRom: getChatRomExist.idChatRom,
          })
          .populate("to");
        return callback({ getChatRomExist, messageAll });
      }
      const newChat = await new chatRom({
        idUsers: [data.userId, getUserBySocketID?._id],
      }).save();
      socket.join(newChat.idChatRom);
      console.log("recurso criado com sucesso", newChat);

      callback(newChat);
    } catch (err) {
      console.log("err", err);
    }
  });

  socket.on("message", async (data) => {
    try {
      const getUserBySocketID = await user.findOne({
        socketId: `${socket.id}`,
      });

      const saveMessage = await new message({
        to: getUserBySocketID?._id,
        text: data.message,
        idChatRom: data.idChatRom,
      }).save();

      const messageAll = await message
        .find({
          idChatRom: data.idChatRom,
        })
        .populate("to");

      io.to(data.idChatRom).emit("message", {
        message: saveMessage,
        getUserBySocketID,
        messageAll,
      });

      let aux: any = [];
      const allChats = await chatRom.find({
        idUsers: { $all: [getUserBySocketID?._id] },
      });
      for (let chat of allChats) {
        const allUserChat = await user.find({ _id: { $in: chat.idUsers } });
        aux.push(...aux, allUserChat);
        io.emit("allChats", aux);
      }
    } catch (err) {
      console.log("err", err);
    }
  });

  socket.on("searchUsers", async (data, callback) => {
    const { name } = data;

    const users = await user.find({ name: name });

    callback(users);
  });

  socket.on("editNameProfile", async (data, callback) => {
    console.log(data);
    const { name ,actualNameUser} = data;
    try {
      const findUserByName = await user.findOne({ name:actualNameUser });

      if (findUserByName) {
        const updateUser = await user.findByIdAndUpdate(
          findUserByName._id,
          {
            name:name
          }
        );
        console.log("recurso atualizado com sucesso", updateUser);

        return callback({
          logged: true,
          email: updateUser?.email,
          socketId: updateUser?.socketId,
          photo: updateUser?.photo,
          name: actualNameUser,
          userName: updateUser?.userName,
        });
      }
    } catch (err) {
      console.log(err);
    }
  });

  socket.on("editEmailProfile", async (data, callback) => {
    const { email,actualEmailUser} = data;
    try {
      const findUserByEmail = await user.findOne({ email:actualEmailUser });

      if (findUserByEmail) {
        let updateUser = await user.findByIdAndUpdate(
          findUserByEmail._id,
          {email: email}
        )
        return callback({
          logged: true,
          email: email,
          socketId: updateUser?.socketId,
          photo: updateUser?.photo,
          name: updateUser?.name,
          userName: updateUser?.userName,
        });
      }
    } catch (err) {
      console.log(err);
    }
  });
});

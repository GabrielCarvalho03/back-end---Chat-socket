"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("../http/server");
const chatRom_model_1 = require("../models/chatRom.model");
const message_model_1 = require("../models/message.model");
const user_model_1 = require("../models/user.model");
server_1.io.on('connect', (socket) => {
    socket.on("disconnect", socket => {
        console.log('disconnect', socket);
    });
    socket.on('user', (data) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, photo, socketId, name } = data;
        const EmailExist = yield user_model_1.user.find({ email });
        try {
            if (EmailExist.length) {
                for (let email of EmailExist) {
                    const userExist = yield user_model_1.user.findByIdAndUpdate(email._id, { socketId });
                }
                socket.emit('logged', { logged: true, email, socketId, photo, name });
                return;
            }
            else {
                const newUser = yield new user_model_1.user({ name, email, photo, socketId, }).save();
                socket.emit('logged', { logged: true, email, socketId, photo, name });
            }
        }
        catch (err) {
            console.log('erro', err);
        }
    }));
    socket.on('getUser', (data) => __awaiter(void 0, void 0, void 0, function* () {
        let aux = [];
        const { email } = data;
        const getUserByEmail = yield user_model_1.user.find({ email });
        for (let item of getUserByEmail) {
            const allChats = yield chatRom_model_1.chatRom.find({ idUsers: { $all: [item._id] } });
            for (let chat of allChats) {
                const allUserChat = yield user_model_1.user.find({ _id: { $in: chat.idUsers } });
                aux.push(allUserChat);
            }
            socket.emit('allChats', aux);
        }
    }));
    socket.on('start_chat', (data, callback) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log(data.socketId);
            const getUserBySocketID = yield user_model_1.user.findOne({
                socketId: `${socket.id}`
            });
            const getChatRomExist = yield chatRom_model_1.chatRom.findOne({
                idUsers: {
                    $all: [getUserBySocketID === null || getUserBySocketID === void 0 ? void 0 : getUserBySocketID._id, data.userId]
                }
            });
            if (getChatRomExist) {
                socket.join(getChatRomExist.idChatRom);
                const messageAll = yield message_model_1.message.find({
                    idChatRom: getChatRomExist.idChatRom,
                }).populate("to");
                return callback({ getChatRomExist, messageAll });
            }
            const newChat = yield new chatRom_model_1.chatRom({ idUsers: [data.userId, getUserBySocketID === null || getUserBySocketID === void 0 ? void 0 : getUserBySocketID._id] }).save();
            socket.join(newChat.idChatRom);
            console.log('recurso criado com sucesso', newChat);
            callback(newChat);
        }
        catch (err) {
            console.log("err", err);
        }
    }));
    socket.on('message', (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const getUserBySocketID = yield user_model_1.user.findOne({
                socketId: `${socket.id}`
            });
            const saveMessage = yield new message_model_1.message({
                to: getUserBySocketID === null || getUserBySocketID === void 0 ? void 0 : getUserBySocketID._id,
                text: data.message,
                idChatRom: data.idChatRom
            }).save();
            const messageAll = yield message_model_1.message.find({
                idChatRom: data.idChatRom,
            }).populate("to");
            server_1.io.to(data.idChatRom).emit('message', {
                message: saveMessage,
                getUserBySocketID,
                messageAll
            });
            let aux = [];
            const allChats = yield chatRom_model_1.chatRom.find({ idUsers: { $all: [getUserBySocketID === null || getUserBySocketID === void 0 ? void 0 : getUserBySocketID._id] } });
            for (let chat of allChats) {
                const allUserChat = yield user_model_1.user.find({ _id: { $in: chat.idUsers } });
                aux.push(...aux, allUserChat);
                server_1.io.emit('allChats', aux);
            }
        }
        catch (err) {
            console.log('err', err);
        }
    }));
    socket.on('searchUsers', (data, callback) => __awaiter(void 0, void 0, void 0, function* () {
        const { name } = data;
        const users = yield user_model_1.user.find({ name: name });
        callback(users);
    }));
});

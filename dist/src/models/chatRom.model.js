"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatRom = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const uuid_1 = require("uuid");
const { Schema } = mongoose_1.default;
const chatRomSchema = new Schema({
    idUsers: [
        { type: Schema.Types.ObjectId,
            ref: "users"
        }
    ],
    idChatRom: {
        type: String,
        default: uuid_1.v4
    }
});
const chatRom = mongoose_1.default.model('chatRom', chatRomSchema);
exports.chatRom = chatRom;

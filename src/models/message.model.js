"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.message = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const messagemSchema = new Schema({
    to: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    text: String,
    created_at: {
        type: Date,
        default: Date.now()
    },
    idChatRom: {
        type: String,
        ref: 'chatroms'
    }
});
const message = mongoose_1.default.model('message', messagemSchema);
exports.message = message;

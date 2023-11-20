"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const userSchema = new Schema({
    socketId: String,
    name: String,
    userName: String,
    email: {
        type: String,
        require: true,
        unique: true
    },
    photo: String,
    password: String,
});
const user = mongoose_1.default.model('User', userSchema);
exports.user = user;

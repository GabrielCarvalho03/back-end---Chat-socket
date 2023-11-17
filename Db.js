"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
require('dotenv').config();
const mongoKey = process.env.MONGODB_URI;
mongoose_1.default.connect(`${mongoKey}`).then(() => {
    console.log("DP is up");
});

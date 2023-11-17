"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = exports.server = void 0;
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
const http_1 = require("http");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: 'https://front-end-chat-67re.vercel.app',
    methods: ['GET', 'POST'],
    credentials: true,
}));
const server = (0, http_1.createServer)(app);
exports.server = server;
const io = new socket_io_1.Server(server);
exports.io = io;
io.on('connection', socket => {
    // console.log('user conected', socket.id)
});
app.listen(3333, () => {
    console.log('server is running');
});

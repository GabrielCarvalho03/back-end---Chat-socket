"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./http/server");
require("../src/websocket/chat");
require("../Db");
server_1.server.listen(8000, () => {
    console.log('server is running');
});

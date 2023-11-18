"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./http/server");
require("../src/websocket/chat");
require("../Db");
const port = process.env.PORT || 3333;
server_1.server.listen(port, () => {
    console.log(`server is running in port${port}`);
});

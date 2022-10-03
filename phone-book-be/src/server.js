"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const init_db_1 = __importDefault(require("./app/init-db"));
const init_apollo_server_1 = require("./app/init-apollo-server");
const _app = (0, express_1.default)();
const START_TIME = new Date().getTime();
(0, init_db_1.default)();
(0, init_apollo_server_1.initializeApollo)(_app).then(() => {
    console.log("Apollo server is running...");
    const port = process.env.PORT || 5000;
    _app.listen(port, () => {
        const NOW = new Date().getTime();
        const STARTUP_TIME = (NOW - START_TIME) / 1000;
        console.warn({ startup_time: STARTUP_TIME }, `💣\u00A0\u00A0Server running on port: ${port}`);
    });
}).catch((err) => {
    console.error("Error spinning up Apollo Server::", err);
});

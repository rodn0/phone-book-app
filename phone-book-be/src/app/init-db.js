"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const mongoose_1 = __importDefault(require("mongoose"));
const DATABASE_URL = process.env.DATABASE_URL;
const initializeMongo = () => {
    console.log('Connecting to mongodb');
    mongoose_1.default.connect(DATABASE_URL, err => {
        if (err) {
            console.error('Connection to DB failed');
        }
        else {
            console.log('Connection to DB was successful');
        }
    });
};
const db = mongoose_1.default.connection;
db.on('error', console.error.bind(console, "MongoDB connection failed"));
exports.default = initializeMongo;

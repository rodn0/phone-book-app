require('dotenv').config();

import mongoose from 'mongoose';

const DATABASE_URL = process.env.DATABASE_URL as string;

const initializeMongo = () => {
    console.log('Connecting to mongodb...')
    mongoose.connect(DATABASE_URL, err => {
        if (err){
            console.error('Connection to DB failed');
        } else{
            console.log('Connection to DB was successful');
        }
    })
}

const db = mongoose.connection;

db.on('error', console.error.bind(console, "MongoDB connection failed"));

export default initializeMongo;
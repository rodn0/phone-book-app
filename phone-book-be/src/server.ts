require('dotenv').config();
import express, { Express } from "express";
import initializeMongo from "./app/init-db";
import { initializeApollo } from './app/init-apollo-server';

const _app: Express = express();
const START_TIME = new Date().getTime();

initializeMongo();

initializeApollo(_app).then(() => {
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


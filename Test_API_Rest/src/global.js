import express from "express";
import compression from "compression";
import bodyParser from "body-parser";
import { Server as HttpServer } from "http";
import { Server as Socket } from "socket.io";
import os from "os";
import { routeLog } from "./middleware/routeLogging.js";

const app = express();
const httpServer = new HttpServer(app);
const io = new Socket(httpServer);

var rawBodySaver = function (req, res, buf, encoding) {
    if (buf && buf.length) {
        req.rawBody = buf.toString(encoding || "utf8");
    }
};

app.use(bodyParser.json({ verify: rawBodySaver }));
app.use(bodyParser.urlencoded({ verify: rawBodySaver, extended: true }));
app.use(bodyParser.raw({ verify: rawBodySaver, type: "*/*" }));
app.use(routeLog);

app.use(compression({ threshold: 0, level: 9, filter: () => true }));

const numCPUs = os.cpus().length;

export { app, io, httpServer, numCPUs };

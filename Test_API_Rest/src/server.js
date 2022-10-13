import express from "express";
import path from "path";
import yargs from "yargs/yargs";
import cluster from "cluster";
import * as config from "./config/config.js";
import { router } from "./routes/index.js";
import { passportConfig } from "./middleware/passport.js";
import { sessionConfig } from "./middleware/session.js";
import { app, httpServer, numCPUs } from "./global.js";
import { socketConfig } from "./socket.js";
import logger from "./lib/logger.js";
import { getRootDir } from "./lib/util.js";

sessionConfig();

passportConfig();

app.use(express.static(path.join(getRootDir(), "./public")));

app.use("/", router);

app.use((err, req, res, next) => {
    logger.error("Internal server error:" + err.stack);
    res.status(500).send("Internal server error");
});

socketConfig();

const args = yargs(process.argv.slice(2))
    .default({
        puerto: config.port, // puerto por defecto
        modo: "FORK",
    })
    .alias({
        p: "puerto",
        m: "modo",
    }).argv;

if (args.modo.toUpperCase() === "FORK") {
    const server = httpServer.listen(args.puerto, () => {
        logger.info(
            `Servidor fork escuchando en el puerto ${server.address().port}`
        );
    });
    server.on("error", (error) => logger.error(`Error en servidor ${error}`));
} else {
    if (cluster.isPrimary) {
        logger.info(`Servidor primario PID ${process.pid}`);
        for (let i = 0; i < numCPUs; i++) {
            logger.info(`Lanzando worker ${i + 1}`);
            cluster.fork();
        }
        cluster.on("exit", (worker, Code, signal) => {
            logger.info(`Worker ${worker.process.pid} finalizado`);
        });
    } else {
        const server = httpServer.listen(args.puerto, () => {
            logger.info(
                `Worker escuchando en el puerto ${server.address().port} PID ${
                    process.pid
                }`
            );
        });
        server.on("error", (error) =>
            logger.info(`Error en servidor ${error}`)
        );
        process.on("exit", (code) => {
            logger.info(`Exit code ${code} PID ${process.pid}`);
        });
    }
}

import connectMongo from "connect-mongo";
import session from "express-session";
import * as config from "../config/config.js";
import { HTTP_STATUS_ERROR_UNAUTHORIZED } from "../const.js";
import { mongoUrl } from "../config/config.js";
import { app } from "../global.js";

function webAuth(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect("/login");
    }
}

function apiAuth(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(HTTP_STATUS_ERROR_UNAUTHORIZED).send({
            error: "No tiene autorizacion para acceder este recurso",
        });
    }
}

function sessionConfig() {
    app.use(
        session({
            store: connectMongo.create({
                mongoUrl: mongoUrl,
                mongoOptions: {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                },
            }),
            secret: config.sessionSecret,
            resave: false,
            saveUninitialized: false,
            rolling: true,
            cookie: {
                secure: false,
                httpOnly: false,
                maxAge: config.sessionMaxAge,
            },
        })
    );
}

export { webAuth, apiAuth, sessionConfig };

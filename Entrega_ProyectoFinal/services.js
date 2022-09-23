import bcrypt from "bcrypt";
import { modelo, cart_model, products_model } from "./models.js";
import nodemailer from "nodemailer";

function auth(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.render("error", {
            data: "SIN AUTORIZACIÓN",
        });
    }
}

async function isAdmin(req, res, next) {
    const user = await modelo.findOne({ _id: req.session?.passport?.user });

    if (user?.admin) {
        return next();
    }

    res.render("error", { data: "SIN AUTORIZACIÓN" });
}

function hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

function isValidPassword(plainPassword, hashedPassword) {
    return bcrypt.compareSync(plainPassword, hashedPassword);
}

function validatePass(req, res, next) {
    if (req.body.password !== req.body.password2) {
        return res.render("error", { data: "Contraseñas no coinciden" });
    }

    if (req.body.password.length < 8) {
        return res.render("error", {
            data: "Contraseña es demasiado corta",
        });
    }

    return next();
}

//// MAILER ////

//config
const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
        user: process.env.MAIL,
        pass: "xzTMU1CuXnd8BuY4xP",
    },
});

// Function
const sendMail = async (mail, subject, body) => {
    const mailOptions = {
        from: "e-Commerce Fernando Diaz",
        to: mail,
        subject: subject,
        html: `<span>${body}</span>`,
    };

    const info = await transporter.sendMail(mailOptions);
};

export { auth, hashPassword, isValidPassword, validatePass, isAdmin, sendMail };

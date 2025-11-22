import appExpress from "express";
import {
    obtenerUsuarioPorMail,
    checkUserPassword,
    generarJwt,
    crearUsuario
} from "../services/usuarios.service.js";

const loginRouter = appExpress.Router();

loginRouter.post("/login", async (req, res) => {
    // console.log(req.body);
    const { userName, password } = req.body;

    if (!checkUserPassword(userName, password)) {
        res.status(401).send({
            error: "Usuario o contraseña inválidos"
        });
        return res;
    }
    const usr = await obtenerUsuarioPorMail(userName);
    console.log(usr);

    res.json({
        userName: usr.mail,
        nombre: `${usr.nombre} ${usr.apellido}`,
        token: generarJwt(usr)
    });
    return res;
});

loginRouter.post("/register", async (req, res, next) => {
    try {
        const { mail, nombre, apellido, password } = req.body;
        const usrExistente = await obtenerUsuarioPorMail(mail);
        console.log(usrExistente);
        if (usrExistente !== null) {
            console.log("entro");
            res.status(401).send({
                error: "Usuario ya registrado"
            });
            return false;
        }
        console.log(req.body);
        const usuario = await crearUsuario(nombre, apellido, mail, password);

        res.status(201).json(usuario);
    }
    catch (err) {
        next(err);
    }
    return true;
});

export default loginRouter;

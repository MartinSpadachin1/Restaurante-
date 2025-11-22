import appExpress from "express";
import { getAllMozos, getMozosByFilter, getMozoEspecifico, crearMozo, actualizarMozo, borrarMozo } from "../services/mozos.services.js";

const mozosRouter = appExpress.Router();

// ROUTERS DEL GET

// GET TODO... o GET CON FILTRO, ahora validaremos el pase de filtros...
// Nota: Si ya hacemos el filtro en el Backend, en el Front lo consumimos normal sin hacer más.
mozosRouter.get("/", async (req, res, next) => {
    try {
        // SI NO HAY FILTROS...
        if (Object.keys(req.query).length === 0) { // Si el usuario NO pasa parámetros de filtrado...
            const result = await getAllMozos();
            return res.status(200).json(result);
        // SI HAY FILTROS...
        } else {
            const { nombre } = req.query; // Sacamos el o los filtros de la petición HTTP GET...
            const mozosResultado = await getMozosByFilter(nombre); // Esperamos a que se resuelva la promesa
            return res.status(200).json(mozosResultado);
        }
    } catch (error) {
        next(error)
    }
});


// GET MOZO ESPECÍFICO

mozosRouter.get("/:idMozo", async ( req, res, next ) => {

    try {

        const mozoEspecifico = await getMozoEspecifico( req.params.idMozo );

        // Si lo consigue, lo manda al Response...

        if ( mozoEspecifico ) {

            res.status(200).json(mozoEspecifico);

        } else {

            res.status(404).send("Error: Mozo no Encontrado.");

        }

    } catch ( error ) {

        next(error);

    }

})

// POST - Crear un Mozo

mozosRouter.post("/", async ( req, res, next ) => {

    try {

        const mozoEspecifico = await crearMozo(req.body);
        res.status(200).json(mozoEspecifico);
        

    } catch ( error ) {

    // Usamos el next() porque tenemos un middleware de errorHandler... sino, no usar.
       next(error);

    }

})

// PUT - ACTUALIZAR UN Mozo

mozosRouter.put("/:idMozo", async (req, res, next) => {
    
    try {
        // const idMozo = req.params.idMozo;
        await actualizarMozo(req.body, req.params.idMozo);
        res.status(200).json({
            success: true,
            message: "Se actualizó correctamente el Mozo"
        });
    } catch (error) {
        next(error);
    }
});


// DELETE - BORRAR  UN DETALLEPEDIDO

mozosRouter.delete("/:idMozo", async ( req, res, next ) => {

    try {

        // const { idPedido, idItem } = req.params;
        const idMozo = req.params.idMozo;

        await borrarMozo(idMozo);
        res.status(200).json({
            success: true,
            message: "Se borró correctamente el Mozo"
        });

    } catch ( error ) {

        next(error);

    }

});

export default mozosRouter;

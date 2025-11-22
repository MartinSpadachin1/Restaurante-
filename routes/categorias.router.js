import appExpress from "express";
import { getAllCategorias, getCategoriasByFilter, getCategoriaEspecifica, actualizarCategoria, borrarCategoria, crearCategoria } from "../services/categorias.services.js"

const categoriasRouter = appExpress.Router();

// ROUTERS DEL GET

// GET - TODAS LAS CATEGORÍAS

categoriasRouter.get("/", async (req, res,next) => {
    try {
        // SI NO HAY FILTROS...
        if (Object.keys(req.query).length === 0) { // Si el usuario NO pasa parámetros de filtrado...
            const result = await getAllCategorias();
            return res.status(200).json(result);
        // SI HAY FILTROS...
        } else {
            const { nombre } = req.query; // Sacamos el o los filtros de la petición HTTP GET...
            const categoriasResultado = await getCategoriasByFilter(nombre); // Esperamos a que se resuelva la promesa
            return res.status(200).json(categoriasResultado);
        }
    } catch (error) {
        next(error)
    }
});




// GET - RUTA ESPECÍFICA PASADA POR URI

categoriasRouter.get("/:id", async ( req, res, next ) => {

    try {

        const categoriaEspecifica = await getCategoriaEspecifica( req.params.id );

        if (categoriaEspecifica) {

            res.status(200).json(categoriaEspecifica);

        } else {

            res.status(500).json({ error : "Error al realizar la solicitud: " + error });

        }

    } catch ( error ) {

        // Tenemos que implementar el Middleware que manejará los errores, el errorHandler...
        next(error);


    }

})

// POST - CREAR UNA CATEGORÍA

categoriasRouter.post("/", async ( req, res, next ) => {

    try {

        const nuevaCategoria = await crearCategoria( req.body );
        res.status(200).json(nuevaCategoria);
    }

    catch ( error ) {

        next(error);

    }

})

// PUT - ACTUALIZAR UNA CATEGORÍA

categoriasRouter.put("/:id", async ( req, res, next ) => {

    try {

        const idCategoria = req.params.id;
        await actualizarCategoria( req.body, idCategoria );
        res.status(200).json({
            success: true,
            message: "Se actualizó correctamente"
        });
    }

    catch ( error ) {

        next(error);

    }

});

// DELETE - BORRAR UNA CATEGORÍA

categoriasRouter.delete("/:id", async ( req, res, next ) => {

    try {

        const idCategoria = req.params.id;
        await borrarCategoria(idCategoria);
        res.status(200).json({
            success: true,
            message: "Se eliminó correctamente"
        });


    } catch ( error ) { next(error) }

});

export default categoriasRouter;
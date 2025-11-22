import appExpress from "express";
import { getrestaurantes, 
    getRestauranteById, 
    registrarRestaurante, 
    borrarRestaurante, 
    actualizarRestaurante,} from "../services/restaurantes.services.js";

const restauranteRouter = appExpress.Router();



// Routers de los servicios

// Router del GET :)

restauranteRouter.get("/", async (req, res, next) => {
    try {
        const restaurante = await getrestaurantes();
        res.status(200).json(restaurante)
    }
    catch (error) {
        next(error)
    }
})

// Router del GET BY ID

restauranteRouter.get("/:idResto", async (req, res, next) => {
    try {
        const restaurante = await getRestauranteById(req.params.idResto);
        res.status(200).json(restaurante)
    }
    catch (error) {
        next(error)
    }
})

// Router del POST :>

restauranteRouter.post("/", async (req, res, next) => {
    try {
        const regRestaurante = await registrarRestaurante(req.body);
        res.status(200).json(regRestaurante);
    }
    catch (error) {
        next(error)
    }
})

// Router del UPDATE/PUT :|

restauranteRouter.put("/:idResto", async(req, res, next) => {
    const {idResto} = req.params
    try{
        await actualizarRestaurante(req.body,idResto);
        res.status(200).json({
            success: true,
            message: "Se actualizó correctamente"
    });
    }
    catch(error){
        next(error);
    }
});



// Router del DELETE :/

restauranteRouter.delete("/:idResto", async(req, res, next) => {
    const {idResto} = req.params;
    try{
        await borrarRestaurante(idResto);
        res.status(200).json({
            success: true,
            message: "Se borro correctamente"
        })
    }
    catch(error){
        next(error)
    }
})

export default restauranteRouter;
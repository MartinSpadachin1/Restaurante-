import appExpress from "express";
import {obtenerMesa,
    obtenerMesas,
    actualizarMesa,
    borrarMesa,
    crearMesa,
    obtenerMesasDeResto,
    obtenerUltimoIdYSumarUno,
    getMesaByFilter
} from "../services/mesas.services.js"

const mesasRouter = appExpress.Router();

//Router para obtener las mesas --> SI HAY FILTRO TRAER SOLO FILTRADAS
mesasRouter.get("/", async (req, res, next) => {
    try {
        const { idMozo, idResto } = req.query;

        let mesas;
        if (idMozo || idResto) {
            // Si hay filtros, obtener mesas filtradas
            mesas = await getMesaByFilter(idMozo, idResto);
        } else {
            // Si no hay filtros, obtener todas las mesas
            mesas = await obtenerMesas();
        }

        // Verificar si se obtuvo un resultado válido
        if (mesas.error) {
            return res.status(400).json({ error: mesas.error });
        }

        // Enviar las mesas encontradas como respuesta
        res.json(mesas);
    } catch (error) {
        next(error)
    }
});

//Router para obtener todas las mesas de un resto
mesasRouter.get("/deResto/:idResto",async(req,res, next)=>{
    const {idResto} = req.params;
    try {
        const mesas = await obtenerMesasDeResto(idResto);
        if(mesas){
            res.status(200).json(mesas);
        }
        else{
            res.status(404).send("Mesas no encontradas");
        }  
    } catch (error) {
        next(error)
    }
});

mesasRouter.get("/deResto/ultimo/:idResto",async(req,res, next)=>{
    const {idResto} = req.params;
    try {
        const numero = await obtenerUltimoIdYSumarUno(idResto);
        if(numero){
            res.status(200).json(numero);
        }
        else{
            res.status(404).send("Mesas no encontradas");
        }  
    } catch (error) {
        next(error)
    }
});


//Router para obtener una mesa en particular 
mesasRouter.get("/:idMesa/:idRes",async(req,res, next)=>{
    const {idMesa,idRes} = req.params;
    try {
        const mesa = await obtenerMesa(idMesa,idRes);
        if(mesa){
        res.status(200).json(mesa);
        }
        else{
            res.status(404).send("Item no encontrado");
        }  
    } catch (error) {
        next(error)
    }
});

//Router para crear una mesa 
mesasRouter.post("/",async(req,res,next)=>{
    try {
        const mesa = await crearMesa(req.body);
        res.status(200).json(mesa);
    } catch (error) {
        next(error);
    }
});

//Router para actualizar una mesa en particular
mesasRouter.put("/:idMesa/:idRes",async(req,res,next)=>{
    const {idMesa,idRes} = req.params;
    try {
        await actualizarMesa(idMesa,idRes,req.body)
        res.status(200).json({
            success: true,
            message: "Se actualizó correctamente"
        });
    } catch (error) {
        next(error)    
    }
});

//Borrar una mesa en particular 
mesasRouter.delete("/:idMesa/:idRes", async (req, res, next) => {
    const { idMesa, idRes } = req.params;
    try {
        await borrarMesa(parseInt(idMesa), parseInt(idRes)); // Asegurarse de convertir a entero
        res.status(204).send(); // 204 significa "No Content", indicando éxito sin contenido
    } catch (error) {
        next(error); // Pasar el error al middleware de manejo de errores
    }
});

export default mesasRouter;

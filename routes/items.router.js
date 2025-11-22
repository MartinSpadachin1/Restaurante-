import appExpress from "express"
import {obtenerItems,
    obtenerItemPorId,
    actualizarItem,
    borrarItem,
    crearItem,
    getItemCategoria,
    } from "../services/items.services.js"

const itemsRouter = appExpress.Router();

//Router para obtener todos los items que existen 
itemsRouter.get("/",async (req,res,next)=>{
    try {
        const items = await obtenerItems();
        res.json(items)
    } 
    catch (error) {
        next(error)
    }
});

//Obtener item en particular 
itemsRouter.get("/:id",async (req,res,next) =>{
    try {
        const item = await obtenerItemPorId(req.params.id);
        if(item){
            res.json(item)
        }
        else{
            res.status(404).send("Item no encontrado");
        }      
    } 
    catch (error) {
      next(error);  
    }
});

//Crear un nuevo item 
itemsRouter.post("/", async(req,res,next)=>{
    try {
        const item = await crearItem(req.body);
        res.status(200).json(item);    
    } 
    catch (error) {
        next(error);
    }
});

//Eliminar item especifico 
itemsRouter.delete("/:id", async (req,res,next)=>{
    try {
        await borrarItem(req.params.id);
        res.status(204).send();
    } catch (error) {
        next(error)
    }
});

//Actualizar un Iten en particular 
itemsRouter.put("/:id", async (req,res,next)=>{
    try {
        console.log(req.params.id)
        await actualizarItem(req.params.id,req.body);
        res.status(200).json({
            success: true,
            message: "Se actualizó correctamente"
        });
    } catch (error) {
        next(error);
    }
});

itemsRouter.get("/byFilters/:idCat", async (req, res, next) => {
    const {idCat} = req.params; 
    try {
        const items = await getItemCategoria(idCat);
        res.status(200).json(items);
    }
    catch (error) {
      next(error)
    }
});



export default itemsRouter
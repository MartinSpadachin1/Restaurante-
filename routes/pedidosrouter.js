import appExpress from "express";
import { createPedido, deletePedido, getAllPedidos, getPedidoByCodigo, getPedidosMesaResto, updatePedido, getPedidosFiltrados } from "../services/pedidos.services.js";

const pedidosRouter = appExpress.Router();

// Obtener los pedidos que sean de un resto y una mesa en particular
// Si el nmesa es nulo se obtienen todos los del idResto
// Si solo el idResto es nulo no se retorna nada
// Si ambos son nulos se retornan todos los pedidos sin filtrar


pedidosRouter.get("/byFilters", async (req, res, next)=> {
    const {idResto, nmesa, fechaInf, fechaSup, noFinalizados} = req.query; 
    try {
        const pedidos = await getPedidosFiltrados(idResto, nmesa, fechaInf, fechaSup, noFinalizados);
        res.status(200).json(pedidos);
    }
    catch (error) {
        next(error);
    }
})


// Obtener todos los pedidos
pedidosRouter.get("/", async (req, res, next) => {
    try {
        console.log("hola")
        const pedidos = await getAllPedidos();
        res.status(200).json(pedidos);
    } 
    catch (error) {
        next(error);
    }
})

// Obtener un pedido by un codigo
pedidosRouter.get("/:codigo", async (req, res, next) => {
    try {
        console.log("hola")
        const pedido = await getPedidoByCodigo(req.params.codigo);
        res.status(200).json(pedido);
    }
    catch (error) {
        next(error);
    }
})


//Crear pedido 
pedidosRouter.post("/", async (req, res, next) => {
    try {
        const pedido = await createPedido(req.body);
        res.status(200).json(pedido);
    }
    catch (error) {
        next(error);
    }
});

//Actualizar pedido 
pedidosRouter.put("/:codigo", async (req, res, next) => {
    try {
        await updatePedido(req.params.codigo, req.body);
        res.status(200).json({
            success: true,
            message: "Se actualizó correctamente"
        });
    } catch (error) {
        next(error);
    }
})

//Eliminar pedido
pedidosRouter.delete("/:codigo", async (req, res, next) => {
    try {
        await deletePedido(req.params.codigo);
        res.status(200).json({
            success: true,
            message: "Se borró correctamente"
        });
    } catch ( error ) {
        next(error);
    }
})

export default pedidosRouter;
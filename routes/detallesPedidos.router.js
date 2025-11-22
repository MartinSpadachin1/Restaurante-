import appExpress from "express";
import {
  getAllDetalles,
  getDetallesPedidoEspecifico,
  crearDetallePedido,
  actualizarDetallePedido,
  borrarDetallePedido,
  getDetalleEspecifico
} from "../services/detallesPedidos.services.js";

const detallePedidoRouter = appExpress.Router();

// ROUTERS DEL GET

// GET TODO

detallePedidoRouter.get("/", async (req, res, next) => {
  try {
    const detallePedido = await getAllDetalles();

    res.status(200).json(detallePedido);
  } catch (error) {
    next(error)
  }
});

// GET DETALLE PEDIDO ESPECÍFICO

detallePedidoRouter.get("/:idPedido", async (req, res, next) => {
  try {
    const detallePedidoEspecifico = await getDetallesPedidoEspecifico(
      req.params.idPedido
    );

    // Si lo consigue, lo manda al Response...

    if (detallePedidoEspecifico) {
      res.status(200).json(detallePedidoEspecifico);
    } else {
      res.status(404).send("Error: Detalle de Pedido no Encontrado.");
    }
  } catch (error) {
    next(error);
  }
});

// GET DETALLE ESPECIFICO
detallePedidoRouter.get("/:idPedido/:idItem", async (req, res, next) => {
  try {
    const detallePedidoEspecifico = await getDetalleEspecifico(
      req.params.idPedido,
      req.params.idItem
    );
    // Si lo consigue, lo manda al Response...
    if (detallePedidoEspecifico) {
      res.status(200).json(detallePedidoEspecifico);
    } else {
      res.status(404).send("Error: Detalle de Pedido no Encontrado.");
    }
  } catch (error) {
    next(error);
  }
});

// POST - CREAR UN DETALLEPEDIDO

detallePedidoRouter.post("/", async (req, res, next) => {
  try {
    const detallePedido = await crearDetallePedido(req.body);
    res.status(200).json(detallePedido);
  } catch (error) {
    // Usamos el next() porque tenemos un middleware de errorHandler... sino, no usar.
    next(error);
  }
});

// PUT - ACTUALIZAR UN DETALLEPEDIDO

detallePedidoRouter.put("/:idPedido/:idItem", async (req, res, next) => {
  const { idPedido, idItem } = req.params;

  try {
    await actualizarDetallePedido(req.body, idPedido, idItem);
    res.status(200).json({
      success: true,
      message: "Se actualizó correctamente",
    });
  } catch (error) {
    next(error);
  }
});

// DELETE - BORRAR  UN DETALLEPEDIDO

detallePedidoRouter.delete("/:idPedido/:idItem", async (req, res, next) => {
  try {
    const { idPedido, idItem } = req.params;

    await borrarDetallePedido(idPedido, idItem);
    res.status(200).json({
      success: true,
      message: "Se borró correctamente",
    });
  } catch (error) {
    next(error);
  }
});


export default detallePedidoRouter;

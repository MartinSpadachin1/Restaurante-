import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import dbInit from "./data/db-init.js";
import notFound from './middlewares/notFound.js'
// Importando los Routers...

import detallePedidoRouter from "./routes/detallesPedidos.router.js";
import itemsRouter from "./routes/items.router.js";
import mesasRouter from "./routes/mesas.router.js";import pedidosRouter from "./routes/pedidosrouter.js"
import restauranteRouter from "./routes/restaurantesrouter.js";
import mozosRouter from "./routes/mozos.router.js";
import categoriasRouter from "./routes/categorias.router.js";



dotenv.config();

const app = express();

app.use(cors());
app.use(express.json()); // Si no hacemos ésto los JSON no serán parseados bien en POST y PUT




app.get("/status", (req, res) => {
    res.json({ respuesta: "API iniciada y escuchando..." });
});



// Usando las APIs de DetallePedido

app.use("/api/detalles", detallePedidoRouter);
app.use("/api/items",  itemsRouter);
app.use("/api/mesas",  mesasRouter);


// Usando las APIS de Restaurante
app.use("/api/pedidos",  pedidosRouter);

app.use("/api/restaurantes",  restauranteRouter);

// Usando las API de Mozos
app.use("/api/mozos", mozosRouter);
app.use("/api/categorias", categoriasRouter);
app.use(notFound);

(async function start() {
    const PORT = process.env.PORT || 3000;

    // Inicializar la conexión a la base de datos
    await dbInit();

    // Iniciar el servidor
    app.listen(PORT, () => {
        console.log(`Servidor iniciado y escuchando en el puerto ${PORT}`);
});
}());

export default app
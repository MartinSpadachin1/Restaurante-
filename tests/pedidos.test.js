import request from 'supertest';
import app from '../app.js';

let newPedido = null;

describe("Pedidos Endpoints", () => {
    // Test para el endpoint POST /pedidos
    describe(" POST /api/pedidos", () => {
        it("should create a new pedido", async () => {
            newPedido = {
                "nmesa": 1,
                "idResto": 1,
                "total": null
            };
            const res = await request(app)
                .post("/api/pedidos")
                .send(newPedido);
            newPedido = res.body;
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("codigo");
        });
    });



    // Test para el endpoint GET /pedidos/:id
    describe("GET /api/pedidos/:id", () => {
        it("should return a specific pedido", async () => {
            const idPedido = newPedido.codigo; // Usar el ID del nuevo pedido creado
            const res = await request(app).get(`/api/pedidos/${idPedido}`);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("codigo", idPedido);
        });
        /*
        it("should return 404 for non-existing item", async () => {
            const res = await request(app).get(`/api/pedidos/999`);
            expect(res.status).toBe(404);
        });*/
    });


    // Test para el endpoint GET /pedidos
    describe("GET /api/pedidos", () => {
        it("should return all pedidos", async () => {
            const res = await request(app).get("/api/pedidos");
            expect(res.status).toBe(200);
            expect(res.body).toBeInstanceOf(Array);
        });
    });

    // Test para el endpoint GET /pedidos
    describe("GET /api/pedidos/byFilters", () => {
        it("should return filtered pedidos", async () => {
            const existingResto = 1;
            const existingMesa = 1;
            const res = await request(app).get(`/api/pedidos/byFilters?idResto=${existingResto}&nmesa=${existingMesa}`);
            expect(res.status).toBe(200);
            expect(res.body).toBeInstanceOf(Array);
        });
    });

    // Test para el endpoint PUT /pedidos/:id
    describe("PUT /api/pedidos/:id", () => {
        it("should update a specific pedido", async () => {
            const updatedPedidoData = { fechaHoraCobro: new Date() };
            const res = await request(app)
                .put(`/api/pedidos/${newPedido.codigo}`)
                .send(updatedPedidoData);
            expect(res.status).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.message).toBe("Se actualizó correctamente");
        });
    });

    // Test para el endpoint DELETE /items/:id
    describe("DELETE /api/pedidos/:id", () => {
        it("should delete a specific pedido", async () => {
            const res = await request(app).delete(`/api/pedidos/${newPedido.codigo}`);
            expect(res.status).toBe(200);
            expect(res.body.message).toBe("Se borró correctamente");
        });
    });
});

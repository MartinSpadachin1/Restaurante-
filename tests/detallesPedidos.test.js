import request from "supertest";
import app from "../app.js";

let newdetallePedido = null;
// ON DOUIS REPARER
// NOS FALTA EL GET DETALLE POR PEDIDO, PERO NOS PUEDE TRAER PEDIDOS REPETIDOS POR QUE RESTURANTES PUEDEN TENER LOS MISMOS NROS DE PEDIDO
// Rta: el codigo de un pedido no depende del resto, es unico.

describe("Detalles Pedido Endpoints", () => {
  // Test para el endpoint POST /detalles
  describe("POST /api/detalles", () => {
    it("should create a new detalle", async () => {
      const detalleData = {
        idPedido: 1,
        idItem: 2,
        cantidad: 3,
        precioUnitario: 1500,
      };
      const res = await request(app).post("/api/detalles").send(detalleData);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("idPedido", detalleData.idPedido);
      expect(res.body).toHaveProperty("idItem", detalleData.idItem);
      newdetallePedido = res.body; // Actualizamos newdetallePedido con la respuesta del servidor
    });
  });

  // Test para el endpoint GET /detalles
  describe("GET /api/detalles", () => {
    it("should return all detalles", async () => {
      const res = await request(app).get("/api/detalles");
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  // Test para el endpoint GET /detalles/:idPedido
  describe("GET /api/detalles/:idPedido", () => {
    it("should return all detalles of a pedido", async () => {
      const idPedido = 1;
      const res = await request(app).get(`/api/detalles/${idPedido}`);
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
      res.body.forEach(item => {
        expect(item.idPedido).toBe(1);
        expect(item).toHaveProperty('idItem');
        expect(item).toHaveProperty('cantidad');
        expect(item).toHaveProperty('precioUnitario');
      });
    });
  });

  // Test para el endpoint PUT /detalles/:idPedido/:idItem
  describe("PUT /api/detalles/:idPedido/:idItem", () => {
    it("should update a specific detalle", async () => {
      const updatedDetalleData = {
        cantidad: 5,
        precioUnitario: 2000,
      };
      const res = await request(app)
        .put(
          `/api/detalles/${newdetallePedido.idPedido}/${newdetallePedido.idItem}`
        )
        .send(updatedDetalleData);
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.message).toBe("Se actualizó correctamente");
    });
  });

  // Test para el endpoint DELETE /detalles/:idPedido/:idItem
  describe("DELETE /api/detalles/:idPedido/:idItem", () => {
    it("should delete a specific detalle", async () => {
      const res = await request(app).delete(
        `/api/detalles/${newdetallePedido.idPedido}/${newdetallePedido.idItem}`
      );
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.message).toBe("Se borró correctamente");
    });
  });
});

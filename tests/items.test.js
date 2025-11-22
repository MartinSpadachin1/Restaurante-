import request from "supertest";
import app from "../app.js";

let newItem = null;

describe("Items Endpoints", () => {
  // Test para el endpoint POST /items
  describe("POST /api/items", () => {
    it("should create a new item", async () => {
      const itemData = { nombre: "Nuevo item", categoria: 1 };
      const res = await request(app).post("/api/items").send(itemData);
      newItem = res.body;
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("idItem");
      expect(res.body.nombre).toBe("Nuevo item");
    });
  });

  // Test para el endpoint GET /items/:id
  describe("GET /api/items/:id", () => {
    it("should return a specific item", async () => {
      const idItem = newItem.idItem; // Usar el ID del nuevo item creado
      const res = await request(app).get(`/api/items/${idItem}`);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("idItem", idItem);
      expect(res.body).toHaveProperty("nombre", "Nuevo item");
    });

    it("should return 404 for non-existing item", async () => {
      const res = await request(app).get(`/api/items/999`);
      expect(res.status).toBe(404);
    });
  });

  // Obtener los items que son de una categoria en particular
  describe("GET /api/items/byFilters/:idCat", () => {
    it("should return items of a specific category", async () => {
      const idCat = 1;
      const res = await request(app).get(`/api/items/byFilters/${idCat}`);
      expect(res.status).toBe(200);
      expect(res.body).toBeInstanceOf(Array);
      res.body.forEach((item) => {
        expect(item).toHaveProperty("categoria", idCat);
      });
    });
  });

  // Test para el endpoint GET /items
  describe("GET /api/items", () => {
    it("should return all items", async () => {
      const res = await request(app).get("/api/items");
      expect(res.status).toBe(200);
      expect(res.body).toBeInstanceOf(Array);
    });
  });

  // Test para el endpoint PUT /items/:id
  describe("PUT /api/items/:id", () => {
    it("should update a specific item", async () => {
      const updatedItemData = { nombre: "Updated Nombre" };
      const res = await request(app)
        .put(`/api/items/${newItem.idItem}`)
        .send(updatedItemData);
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.message).toBe("Se actualizó correctamente");
    });
  });

  // Test para el endpoint DELETE /items/:id
  describe("DELETE /api/items/:id", () => {
    it("should delete a specific item", async () => {
      const res = await request(app).delete(`/api/items/${newItem.idItem}`);
      expect(res.status).toBe(204);
    });
  });
});

import request from "supertest";
import app from "../app.js";

let newMesa = null;
// let idRestoExistente = 1; // Define un id de restaurante existente en tu base de datos
// let idRestoInexistente = 999; // Define un id de restaurante que no exista en tu base de datos

// Test para el endpoint POST /mesas
describe("POST /api/mesas", () => {
    it("should create a new mesa", async () => {
        const mesaData = {
            nmesa: 14,
            idResto: 1,
            cantPersonas: 1,
            idMozo: 1,
            estaLibre: true
        };
        try {
            const res = await request(app).post("/api/mesas").send(mesaData);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("nmesa", mesaData.nmesa);
            expect(res.body).toHaveProperty("idResto", mesaData.idResto);
            newMesa = res.body; // Actualizamos newMesa con la respuesta del servidor
        } catch (error) {
            console.error("Error en el test POST /api/mesas:", error);
            throw error;
        }
    });
});

// Test para el endpoint GET /mesas
describe("GET /api/mesas", () => {
    it("should return all mesas", async () => {
        const res = await request(app).get("/api/mesas");
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });
});

// Test para el endpoint GET /mesas/:idResto
describe("GET /api/mesas/:idResto", () => {
    it("should return all mesas of restaurante", async () => {
        const idResto = 1;
        const res = await request(app).get(`/api/mesas/deResto/${idResto}`);
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
        res.body.forEach(nromesa => {
            expect(nromesa.idResto).toBe(1);
            expect(nromesa).toHaveProperty('nmesa')
            expect(nromesa).toHaveProperty('cantPersonas');
            expect(nromesa).toHaveProperty('idMozo');
            expect(nromesa).toHaveProperty('estaLibre');
        });
    });
});

// Test para el endpoint GET /mesas/:nmesa/:idResto
describe("GET /api/mesas/:nmesa/:idResto", () => {
    it("should return all mesas of restaurante and nmesa", async () => {
        const idResto = 1;
        const nmesa = 1;
        const res = await request(app).get(`/api/mesas/${nmesa}/${idResto}`);
        expect(res.status).toBe(200);
    });
});

// Test para el endpoint PUT /mesas/:nmesa/:idResto
describe("PUT /api/mesas/:nmesa/:idResto", () => {
    it("should update a specific mesa", async () => {
        const updatedMesaData = {
            cantPersonas: 5,
            idMozo: 2,
            estaLibre: false
        };
        const res = await request(app)
            .put(
                `/api/mesas/${newMesa.nmesa}/${newMesa.idResto}`
            )
            .send(updatedMesaData);
        expect(res.status).toBe(200);
    });
});

// Test para el endpoint DELETE /mesas/:nmesa/:idResto
describe("DELETE /api/mesas/:nmesa/:idResto", () => {
    it("should delete a specific mesa", async () => {
        const res = await request(app).delete(
            `/api/mesas/${newMesa.nmesa}/${newMesa.idResto}`
        );
        expect(res.status).toBe(204);
    });
});
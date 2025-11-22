import request from 'supertest';
import app from '../app.js';

let newMozo = null;

describe("Mozos Endpoints", () => {
    // Test para el endpoint POST /mozos
    describe("POST /api/mozos", () => {
        it("should create a new mozo", async () => {
            newMozo = { nombre: "Nuevo Mozo" };
            const res = await request(app)
                .post("/api/mozos")
                .send(newMozo);
            newMozo = res.body;
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("idMozo");
            expect(res.body.nombre).toBe(newMozo.nombre);
        });
    });

    // Test para el endpoint GET /mozos/:idMozo
    describe("GET /api/mozos/:id", () => {
        it("should return a specific mozo", async () => {
            const idMozo = newMozo.idMozo;
            console.log(idMozo);
            const res = await request(app).get(`/api/mozos/${idMozo}`);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("idMozo", idMozo);
            expect(res.body).toHaveProperty("nombre", newMozo.nombre);
        });
    });

    // Test para TODOS los mozos
    describe("GET /api/mozos", () => {
        it("should return all mozos", async () => {
            const res = await request(app).get("/api/mozos");
            expect(res.status).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
        });
    });

    // Test para el endpoint PUT /mozos/:idMozo
    describe("PUT /api/mozos/:id", () => {
        it("should update a specific mozo", async () => {
            const existingMozoId = newMozo.idMozo;
            const updatedMozoData = { nombre: "Nuevo Nombre" };
            const res = await request(app)
                .put(`/api/mozos/${existingMozoId}`)
                .send(updatedMozoData);
            expect(res.status).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.message).toBe("Se actualizó correctamente el Mozo");
        });
    });

    // Test para el endpoint DELETE /mozos/:id
    describe("DELETE /api/mozos/:id", () => {
        it("should delete a specific mozo", async () => {
            const existingMozoId = newMozo.idMozo;
            const res = await request(app).delete(`/api/mozos/${existingMozoId}`);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("message", "Se borró correctamente el Mozo");
        });
    });


    // Test para el filtrado por nombre
    // describe("GET /api/mozos con filtro de nombre", () => {
    //     it("should return mozos that match the filter name", async () => {
    //         const filterName = "Mario";
    //         const res = await request(app).get(`/api/mozos?nombre=${filterName}`);
    //         expect(res.status).toBe(200);
    //         expect(Array.isArray(res.body)).toBe(true);
    //         res.body.forEach(mozo => {
    //             expect(mozo.nombre).toContain(filterName);
    //         });
    //     });

    //     it("should return an empty array if no mozos match the filter name", async () => {
    //         const filterName = "NombreQueNoExiste";
    //         const res = await request(app).get(`/api/mozos?nombre=${filterName}`);
    //         expect(res.status).toBe(200);
    //         expect(Array.isArray(res.body)).toBe(true);
    //         expect(res.body.length).toBe(0);
    //     });
    // });


});

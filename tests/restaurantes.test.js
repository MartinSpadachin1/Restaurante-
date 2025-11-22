import request from 'supertest';
import app from '../app.js';

let newRestaurante = null;

describe("Restaurantes Endpoints", () => {
    // Test para el endpoint POST /restaurantes
    describe(" POST /api/restaurantes", () => {
        it("should create a new restaurante", async () => {
            newRestaurante = { nombre: "La Bella Vista", horaApertura: "9:00", horaCierre: "21:00", usuario: "resto", contraseña: "123",
                direc: "Av.Martinolli"
             }
            const res = await request(app)
                .post("/api/restaurantes")
                .send(newRestaurante);
            newRestaurante = res.body;
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("idResto");
        });
    });
})


// Test para el endpoint GET /restuarntes/:idResto
describe("GET /api/restaurantes/:idResto", () => {
    it("should return a specific resturante", async () => {
        // Supongamos que aquí obtenemos el ID de un restaurante existente
        const idResto = 1;
        const res = await request(app).get(`/api/restaurantes/${idResto}`);
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("idResto", idResto);
        // expect(res.body).toHaveProperty("");
    });

    /*         it("should return 404 if restaurante does not exist", async () => {
                const nonExistingRestoId = 9999;
                const res = await request(app).get(`/api/restauarntes/${nonExistingRestoId}`);
                expect(res.status).toBe(404);
            });  */
});


// Test para TODAS los restaurantes
describe("GET /api/restaurantes", () => {
    it("should return all restaurantes", async () => {
        const res = await request(app).get("/api/restaurantes");
        expect(res.status).toBe(200);
    })
})

//    Test para el endpoint PUT /restaurantes/:idResto
describe("PUT /api/restaurantes/:idResto", () => {
    it("should update a specific restaurante", async () => {
        // Supongamos que aquí obtenemos el ID de un restaurante existente
        const existingRestoId = newRestaurante.idResto;
        const updatedRestoData = { nombre: "La Bella", horaApertura: "9:30", horaCierre: "21:30", usuario: "resto2", contraseña: "1234",
            direc: "Av.Martinolli 123" };
        const res = await request(app)
            .put(`/api/restaurantes/${existingRestoId}`)
            .send(updatedRestoData);
        expect(res.status).toBe(200);
    });
});

// Test para el endpoint DELETE /restaurantes/:idResto
describe("DELETE /api/restaurantes/:idResto", () => {
    it("should delete a specific restaurante", async () => {
        // Supongamos que aquí obtenemos el ID de un restaurante existente
        const existingRestoId = newRestaurante.idResto;
        const res = await request(app).delete(`/api/restaurantes/${existingRestoId}`);
        expect(res.status).toBe(200);
    });
});

import request from 'supertest';
import app from '../app.js';

let newCategoria = null;

describe("Categorias Endpoints", () => {
    // Test para el endpoint POST /categorias
    describe(" POST /api/categorias", () => {
        it("should create a new categoria", async () => {
            newCategoria = { nombre: "Nueva Categoria" };
            const res = await request(app)
                .post("/api/categorias")
                .send(newCategoria);
            newCategoria = res.body;
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("idCat");
        });
    });

    // Test para el endpoint GET /categorias/:id
    describe("GET /api/categorias/:id", () => {
        it("should return a specific categoria", async () => {
            // Supongamos que aquí obtenemos el ID de una categoria existente
            const idCat = 1;
            const res = await request(app).get(`/api/categorias/${idCat}`);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("idCat", idCat);
            expect(res.body).toHaveProperty("nombre", "Entradas");
        });

        /*         it("should return 404 if categoria does not exist", async () => {
                    const nonExistingCategoriaId = 9999;
                    const res = await request(app).get(`/api/categorias/${nonExistingCategoriaId}`);
                    expect(res.status).toBe(404);
                });  */
    });


    // Test para TODAS las categorias
    describe("GET /api/categorias", () => {
        it("should return all categorias", async () => {
            const res = await request(app).get("/api/categorias");
            expect(res.status).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
        });
    });

    //    Test para el endpoint PUT /categorias/:id
    describe("PUT /api/categorias/:id", () => {
        it("should update a specific categoria", async () => {
            // Supongamos que aquí obtenemos el ID de una categoria existente
            const existingCategoriaId = newCategoria.idCat;
            const updatedCategoriaData = { nombre: "Nuevo Nombre" };
            const res = await request(app)
                .put(`/api/categorias/${existingCategoriaId}`)
                .send(updatedCategoriaData);
            expect(res.status).toBe(200);
        });
    });

    // Test para el endpoint DELETE /categorias/:id
    describe("DELETE /api/categorias/:id", () => {
        it("should delete a specific categoria", async () => {
            // Supongamos que aquí obtenemos el ID de una categoria existente
            const existingCategoriaId = newCategoria.idCat;
            const res = await request(app).delete(`/api/categorias/${existingCategoriaId}`);
            expect(res.status).toBe(200);
        });
    });

    // Test para el filtrado por nombre
    // describe("GET /api/categorias con filtro de nombre", () => {
        
    //     it("should return categorias that match the filter name", async () => {
    //         const filterName = "Postres";
    //         const res = await request(app).get(`/api/categorias?nombre=${filterName}`);
    //         console.log(res);
    //         expect(res.status).toBe(200);
    //         expect(Array.isArray(res.body)).toBe(true);
    //         res.body.forEach(categoria => {
    //             // console.log(categoria.nombre);
    //             // console.log(categoria.nombre === filterName); 
    //             expect(categoria.nombre).toContain(filterName);
    //         });
    //     });
        

    //     it("should return an empty array if no categorias match the filter name", async () => {
    //         const filterName = "NombreQueNoExiste";
    //         const res = await request(app).get(`/api/categorias?nombre=${filterName}`);
    //         expect(res.status).toBe(200);
    //         expect(Array.isArray(res.body)).toBe(true);
    //         expect(res.body.length).toBe(0);
    //     });
    // });

});


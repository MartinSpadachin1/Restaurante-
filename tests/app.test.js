import request from 'supertest';
import app from '../app.js';

describe("Test de estado de la aplicación", () => {
    test("El endpoint /status debe devolver un JSON con el mensaje adecuado", async () => {
        const response = await request(app).get('/status');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ respuesta: "API iniciada y escuchando..." });
    });
});


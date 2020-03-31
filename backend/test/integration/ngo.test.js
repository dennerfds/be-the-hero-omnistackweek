const request = require('supertest');
const app = require('../../src/app');
const conn = require('../../src/database/connection');

describe('NGO - Non-Governmental Organization', () => {
    beforeEach(async () => {
        await conn.migrate.rollback();
        await conn.migrate.latest();
    });

    afterAll(async () => {
        conn.destroy();
    });

    it('Shoube be able to create a new NGO in the database', async () => {
        const response = await request(app) // use set() function when trying to access request headers. See the jest docs.
            .post('/ngos')
            .send({
                name: "Animal Kingdom",
                email: "ak@animalkingdom.com.br",
                whatsapp: "+55 11 97654-4444",
                city: "Diadema",
                uf: "SP"
            });
        
        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });
});
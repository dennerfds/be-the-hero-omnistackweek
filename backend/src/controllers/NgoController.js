const generateUniqueID = require('../utils/generateUniqueID');
const conn = require('../database/connection');

module.exports = { 
    async index(request, response) {
        const ngos = await conn('ngos').select('*');
        return response.json(ngos);
    },

    async create(request, response) {
        const { name, email, whatsapp, city, uf } = request.body;
        const id = generateUniqueID();

        await conn('ngos').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf
        });

        return response.json({ id });
    }    
};
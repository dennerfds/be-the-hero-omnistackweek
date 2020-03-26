const conn = require('../database/connection');

module.exports = {
    async index(request, response) {
        const ngo_id = request.headers.authorization;
        const incidents = await conn('incidents').select('*').where('ngo_id', ngo_id);

        return response.json(incidents);
    }
};
const conn = require('../database/connection');

module.exports = {
    async create(request, response) {
        const { id } = request.body;
        const ngo = await conn('ngos')
            .select('name')
            .where('id', id)
            .first();

        if (!ngo) {
            return response.status(400).json({ error: 'Authentication failed!' });
        }

        return response.json(ngo);
    }
};
const conn = require('../database/connection');

module.exports = {
    async index(request, response) {
        const { page = 1 } = request.query;

        const [count] = await conn('incidents').count();

        const incidents = await conn('incidents')
            .join('ngos', 'ngos.id', '=', 'incidents.ngo_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select([
                'incidents.*',
                'ngos.name',
                'ngos.email',
                'ngos.whatsapp',
                'ngos.city',
                'ngos.uf'
            ]);

        response.header('X-Total-Count', count['count(*)']);

        return response.json(incidents);
    },

    async create(request, response) {
        const { title, description, value } = request.body;
        const ngo_id = request.headers.authorization;
 
        const [id] = await conn('incidents').insert({
            title,
            description, 
            value,
            ngo_id
        });

        return response.json({ id });
    },

    async delete(request, response) {
        const { id } = request.params;
        const ngo_id = request.headers.authorization;

        const incident = await conn('incidents')
            .select('ngo_id')
            .where('id', id)
            .first();

        if (incident.ngo_id != ngo_id) {
            return response.status(401).json({ error: 'Operation not allowed!' });
        }

        await conn('incidents').where('id', id).delete();

        return response.status(204).send(); // Keep searching for HTTP Status Codes
    }
};
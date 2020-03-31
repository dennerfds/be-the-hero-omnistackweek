const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate'); // Lib responsible for api validations
const NgoController = require('./controllers/NgoController');
const IncidentsController = require('./controllers/IncidentsController');
const ProfileController = require('./controllers/ProfileController');
const SessionsController = require('./controllers/SessionController');
const routes = express.Router();

/**
 * Parameter types
 * Query Params: Named parameters sent through route after "?" (Filters, pagination, etc.);
 * Route Params: Used for identifying resources;
 * Request Body: Used for creating or changing resources;
 */

// NGO - Non-Governmental Organization
routes.get('/ngos', NgoController.index);

routes.post('/ngos', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(17),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2)
    })
}), NgoController.create);

// Incidents
routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number()
    }),
}), IncidentsController.index);

routes.post('/incidents', celebrate({
    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
        value: Joi.number().required()
    }),
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown()
}), IncidentsController.create);

routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
}), IncidentsController.delete);

// Profile
routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown()
}), ProfileController.index);

// Session
routes.post('/session', celebrate({
    [Segments.BODY]: Joi.object().keys({
        id: Joi.string().required()
    })
}), SessionsController.create);

module.exports = routes;
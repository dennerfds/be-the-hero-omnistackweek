const express = require('express');
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

routes.get('/ngos', NgoController.index);
routes.post('/ngos', NgoController.create);

routes.get('/incidents', IncidentsController.index);
routes.post('/incidents', IncidentsController.create);
routes.delete('/incidents/:id', IncidentsController.delete);

routes.get('/profile', ProfileController.index);

routes.post('/session', SessionsController.create);

module.exports = routes;
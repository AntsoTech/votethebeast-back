import { Express } from 'express';

import countriesController from './controllers/countries';
import playersController from './controllers/playerscontroller';

const setupRoutes = (server: Express) => {
  ////// PLAYERS //////

  // Get all players
  server.get('/api/players', playersController.getAllPlayers);

  // Get player by ID
  server.get('/api/players/:idPlayer', playersController.getPlayerById);

  // // Post a new player
  server.post('/api/players', playersController.addNewPlayer);

  // Update an existing player
  server.put('/api/players/:idPlayer', playersController.updatePlayer);

  // Delete player
  server.delete('/api/players/:idPlayer', playersController.deletePlayer);

  ////// COUNTRIES //////
  // Get all countries
  server.get('/api/countries', countriesController.getAllCountries);
};

export default setupRoutes;

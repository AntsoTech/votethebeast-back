import { NextFunction, Request, RequestHandler, Response } from 'express';
import IPlayer from '../interfaces/IPlayer';
import Player from '../models/playermodel';
import { ErrorHandler } from '../helpers/errors';
// import Joi from 'joi';

// Get all players
const getAllPlayers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const random = req.query.random as string;
    const country = req.query.country as string;
    const position = req.query.position as string;
    const filter = req.query.filter as string;
    const randomBool = (random === 'true') // transforming a bool string into real bool
    const allPlayers = await Player.getAllPlayers(filter, country, position, randomBool);
    return res.status(200).send(allPlayers);
  } catch (err) {
    next(err);
  }
};

// Get players by Id
const getPlayerById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { idPlayer } = req.params;
    const player = await Player.getPlayerById(Number(idPlayer));
    player ? res.status(200).send(player) : res.sendStatus(404);
  } catch (err) {
    next(err);
  }
};

// POST a new player
const addNewPlayer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const player = req.body as IPlayer;
    player.id = await Player.addNewPlayer(player);
    res.status(201).json({ ...player, points: 0 });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

// Update a player
const updatePlayer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { idPlayer } = req.params;
    const playerUpdated = await Player.updatePlayer(
      Number(idPlayer),
      req.body as IPlayer
    );
    if (playerUpdated) {
      const player = await Player.getPlayerById(Number(idPlayer));
      res.status(200).send(player);
    } else {
      throw new ErrorHandler(500, 'Player cannot be updated');
    }
  } catch (err) {
    next(err);
  }
};

//DELETE player
const deletePlayer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { idPlayer } = req.params;
    const player = await Player.getPlayerById(Number(idPlayer));
    const playerDeleted = await Player.deletePlayer(Number(idPlayer));
    if (playerDeleted) {
      res.status(200).send(player);
    } else {
      throw new ErrorHandler(500, 'Player cannot be deleted');
    }
  } catch (err) {
    next(err);
  }
};

export default {
  getAllPlayers,
  getPlayerById,
  addNewPlayer,
  updatePlayer,
  deletePlayer
};

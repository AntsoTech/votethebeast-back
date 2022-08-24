import 'dotenv/config';

import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';

import { handleError } from './helpers/errors';
import setupRoutes from './router';

const app = express();
const port = process.env.PORT || 3000;

// à faire des requetes axios
const corsOptions: cors.CorsOptions = {
  // must-have for frontend to communicate with API
  origin: [
    'http://localhost:3001',
    'http://localhost:3000',
    'https://votethebeast-antsotech.vercel.app',
    'https://votethebeast.vercel.app',
    'https://votethebeast-jnxwl1duu-antsotech.vercel.app',
  ],
  // for cookies
  credentials: true,
};

// middleware cors
app.use(cors(corsOptions));

//middleware perso pour ajouter les headers nécessaires à react-admin
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Expose-Headers', 'Content-Range');
  next();
});

//middleware pour lire le body
app.use(express.json());
//middleware pour envoyer des cookies
app.use(cookieParser());

setupRoutes(app);

// A mettre à la fin pour gèrer les erreurs qui sortiront des routes
app.use(handleError);

app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`server is listening on ${port}`);
  /* eslint-enable no-console */
});

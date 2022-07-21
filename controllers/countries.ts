import { NextFunction, Request, Response } from 'express';
import Country from '../models/countrymodel'

// Get all countries
const getAllCountries = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allCountries = await Country.getAllCountries();
    return res.status(200).send(allCountries);
  } catch (err) {
    next(err);
  }
};

export default { getAllCountries };

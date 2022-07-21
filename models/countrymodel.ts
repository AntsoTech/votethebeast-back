import connection from '../db-config';
import ICountry from '../interfaces/ICountry';

const getAllCountries = async (): Promise<ICountry[]> => {
  const results = await connection
    .promise()
    .query<ICountry[]>('SELECT * FROM countries');
  return results[0];
};

export default { getAllCountries };

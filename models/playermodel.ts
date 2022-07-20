import IPlayer from '../interfaces/IPlayer';
import connection from '../db-config';
import { ResultSetHeader } from 'mysql2';

// Get all Players
const getAllPlayers = async (
  country = '',
  position = '',
  namefilter = '',
  randomBool: boolean
): Promise<IPlayer[]> => {
  let sql = `SELECT * FROM players`;
  const sqlValues: string[] = [];
  if (randomBool) {
    sql +=
      ' ORDER BY RAND ( ) LIMIT 2';
  }
  if (country) {
    sql +=
      ' INNER JOIN countries ON countries.id = players.idCountry WHERE players.idCountry = ?';
    sqlValues.push(country);
  }
  if (position) {
    sql +=
      ' INNER JOIN positions ON positions.id = players.idPosition WHERE players.idPosition = ?';
    sqlValues.push(position);
  }
  if (namefilter) {
    if (country && position) {
      sql += ` AND players.lastname LIKE ? OR players.firstname LIKE ?`;
    } else {
      sql += ` WHERE players.lastname LIKE ? OR players.firstname LIKE ?`;
    }
    sqlValues.push(`%${namefilter}%`, `%${namefilter}%`);
  }
  const results = await connection.promise().query<IPlayer[]>(sql, sqlValues);
  return results[0];
};

// Get players by ID

const getPlayerById = async (idPlayer: number): Promise<IPlayer> => {
  const [results] = await connection
    .promise()
    .query<IPlayer[]>('SELECT * FROM players WHERE id = ?', [idPlayer]);
  return results[0];
};

// Add new player
const addNewPlayer = async (player: IPlayer): Promise<number> => {
  const results = await connection
    .promise()
    .query<ResultSetHeader>(
      'INSERT INTO players (firstname, lastname, birthdate, picture, winnerpicture, points, idPosition, idCountry) VALUES (?,?,?,?,?,0,?,?)',
      [
        player.firstname,
        player.lastname,
        player.birthdate,
        player.picture,
        player.winnerpicture,
        player.idPosition,
        player.idCountry,
      ]
    );
  return results[0].insertId;
};

// Update a player
const updatePlayer = async (
  idPlayer: number,
  player: IPlayer
): Promise<boolean> => {
  let sql = 'UPDATE players SET ';
  const sqlValues: Array<string | number | Date> = [];
  let oneValue = false;
  if (player.firstname) {
    sql += 'firstname = ?';
    sqlValues.push(player.firstname);
    oneValue = true;
  }
  if (player.lastname) {
    sql += oneValue ? ' , lastname = ? ' : ' lastname = ? ';
    sqlValues.push(player.lastname);
    oneValue = true;
  }
  if (player.birthdate) {
    sql += oneValue ? ' , birthdate = ? ' : ' birthdate = ? ';
    sqlValues.push(player.birthdate);
    oneValue = true;
  }
  if (player.picture) {
    sql += oneValue ? ' , picture = ? ' : ' picture = ? ';
    sqlValues.push(player.picture);
    oneValue = true;
  }
  if (player.winnerpicture) {
    sql += oneValue ? ' , winnerpicture = ? ' : ' winnerpicture = ? ';
    sqlValues.push(player.winnerpicture);
    oneValue = true;
  }
  if (player.points) {
    sql += oneValue ? ' , points = ? ' : ' points = ? ';
    sqlValues.push(player.points);
    oneValue = true;
  }
  if (player.idPosition) {
    sql += oneValue ? ' , idPosition = ? ' : ' idPosition = ? ';
    sqlValues.push(player.idPosition);
    oneValue = true;
  }
  if (player.idCountry) {
    sql += oneValue ? ' , idCountry = ? ' : ' idCountry = ? ';
    sqlValues.push(player.idCountry);
    oneValue = true;
  }

  sql += ' WHERE id = ?';
  sqlValues.push(idPlayer);

  const results = await connection
    .promise()
    .query<ResultSetHeader>(sql, sqlValues);
  return results[0].affectedRows === 1;
};

//DELETE player
const deletePlayer = async (idPlayer: number): Promise<boolean> => {
  const results = await connection
    .promise()
    .query<ResultSetHeader>('DELETE FROM players WHERE id = ?', [idPlayer]);
  return results[0].affectedRows === 1;
};

export default {
  getAllPlayers,
  getPlayerById,
  addNewPlayer,
  updatePlayer,
  deletePlayer,
};

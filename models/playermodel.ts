import { ResultSetHeader } from 'mysql2';

import connection from '../db-config';
import IPlayer from '../interfaces/IPlayer';

// Get all Players
const getAllPlayers = async (
  country = '',
  position = '',
  namefilter = '',
  randomBool: boolean
): Promise<IPlayer[]> => {
  let sql = `SELECT pl.id, pl.firstname, pl.lastname, pl.birthdate, pl.picture, pl.winnerpicture, pl.points, c.name as country, c.flag, po.name as position FROM players AS pl INNER JOIN countries AS c ON c.id = pl.idCountry INNER JOIN positions AS po ON po.id = pl.idPosition`;
  const sqlValues: string[] = [];
  if (country) {
    sql +=
      ' WHERE pl.idCountry = ?';
    sqlValues.push(country);
  }
  if (position) {
    sql +=
      ' WHERE pl.idPosition = ?';
    sqlValues.push(position);
  }
  if (namefilter) {
    if (country && position) {
      sql += ` AND pl.lastname LIKE ? OR pl.firstname LIKE ?`;
    } else {
      sql += ` WHERE pl.lastname LIKE ? OR pl.firstname LIKE ?`;
    }
    sqlValues.push(`%${namefilter}%`, `%${namefilter}%`);
  }
  if (randomBool) {
    sql += ' ORDER BY RAND ( ) LIMIT 2';
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

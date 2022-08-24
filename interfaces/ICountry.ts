import { RowDataPacket } from 'mysql2';

export default interface ICountry extends RowDataPacket {
  id: number;
  name: string;
  flag: string;
}

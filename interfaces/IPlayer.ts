import { RowDataPacket } from 'mysql2';

export default interface IPlayer extends RowDataPacket {
    id: number;
    firstname: string;
    lastname: string;
    country: string;
    birthdate: Date;
    picture: string;
    winnerpicture: string;
    points:number;
    idPosition: number;
    idCountry: number
}
import { Client } from 'pg';
import dotenv from 'dotenv';
import ConnectionDataBase from "../IConnectionDataBase";

dotenv.config();

export default class PgPromiseAdapter implements ConnectionDataBase {
	connection: any;

    constructor () {
		this.connection = new Client({
			host: process.env.DB_HOST,
			port: parseInt(process.env.DB_PORT),
			database: process.env.DB_DATABASE,
			user: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
		  });

		  this.connection.connect();
	}

	async query(statement: string, params: any): Promise<any> {
		return this.connection.query(statement, params);
	}

	async close(): Promise<any> {
		return this.connection.end();
	}
}
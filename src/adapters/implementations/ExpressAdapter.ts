import IHttpServer from "../IHttpServer";
import express, { Request, Response } from "express";

export default class ExpressAdapter implements IHttpServer {
	app: any;

	constructor () {
		this.app = express();
	}

	async register(method: string, url: string, callback: Function): Promise<void> {
		this.app[method](url, async function (req: Request, res: Response) {
			const output = await callback(req.params, req.body);
			res.json(output);
		});
	}

	async listen(port: number): Promise<void> {
		return this.app.listen(port);
	}

}

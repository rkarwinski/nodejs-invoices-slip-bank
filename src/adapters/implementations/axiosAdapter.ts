import axios from "axios";
import IHttpClient from "../IHttpClient";

export default class AxiosAdapter implements IHttpClient {

	async get(url: string): Promise<any> {
		const response = await axios.get(url);
		return response.data;
	}

	async post(url: string, body: any): Promise<any> {
		const response = await axios.post(url, body);
		return response.data;
	}

}

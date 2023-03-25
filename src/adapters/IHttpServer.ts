export default interface IHttpServer {
	register (method: string, url: string, callback: Function): Promise<void>;
	listen (port: number): Promise<void>;
}

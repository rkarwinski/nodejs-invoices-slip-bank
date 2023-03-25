export default interface ConnectionDataBase {
	query (statement: string, params: any): Promise<any>;
	close (): Promise<any>;
}
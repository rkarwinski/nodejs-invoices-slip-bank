import { CreateInvoiceUseCase } from "../useCases/createInvoiceUseCases";
import IHttpServer from "../adapters/IHttpServer";

export default class InvoiceController {

	constructor (
		readonly httpServer: IHttpServer, 
		readonly createInvoice: CreateInvoiceUseCase
	) {
		httpServer.register("post", "/invoice", async function (params: any, body: any) {
            console.log(body);
			const response = await createInvoice.execute(body);
			return response;
		});
	}
}

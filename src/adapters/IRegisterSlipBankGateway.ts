import { IInvoice } from "../entities/interfaces/IInvoice";
import { ISlipbank } from "../entities/interfaces/ISlipBank";

export default interface IRegisterSlipBankGateway {
	registerSlipBankBradesco (payload: IInvoice): Promise<ISlipbank>;
	registerSlipBankStarkBank (payload: IInvoice): Promise<ISlipbank>;
}
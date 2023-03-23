import { IInvoice } from "../../entities/interfaces/IInvoice";
import { ISlipbank } from "../../entities/interfaces/ISlipBank";
import IRegisterSlipBankGateway from "../IRegisterSlipBankGateway";

export class MockRegisterSlipBankGateway implements IRegisterSlipBankGateway {
    async registerSlipBankBradesco(payload: IInvoice): Promise<ISlipbank> {
        return {
            invoice: {
                    customer: {
                        document: payload.customer.document,
                        name: payload.customer.name,
                        person: payload.customer.person,
                        address: {
                            street: payload.customer.address.street,
                            number: payload.customer.address.number,
                            zipcode: payload.customer.address.zipcode,
                            district: payload.customer.address.district,
                            city: payload.customer.address.city,
                            state: payload.customer.address.state,
                        },
                    },
                recipient: {
                    document: payload.recipient.document,
                    wallet: payload.recipient.wallet,
                    agency: payload.recipient.agency,
                    account: payload.recipient.account,
                },
                dueDate: payload.dueDate,
                total: payload.total,
                interest: payload.interest, 
                fine: payload.fine,
            },
            seunum: '8888888',
            barcode: 'string', 
            digitableLine: 'string', 
            externalId: 'string', 
            bank: 237, 
            status: 2
        }
    }
    
    async registerSlipBankStarkBank(payload: IInvoice): Promise<ISlipbank> {
        return {
            invoice: {
                    customer: {
                        document: payload.customer.document,
                        name: payload.customer.name,
                        person: payload.customer.person,
                        address: {
                            street: payload.customer.address.street,
                            number: payload.customer.address.number,
                            zipcode: payload.customer.address.zipcode,
                            district: payload.customer.address.district,
                            city: payload.customer.address.city,
                            state: payload.customer.address.state,
                        },
                    },
                recipient: {
                    document: payload.recipient.document,
                    wallet: payload.recipient.wallet,
                    agency: payload.recipient.agency,
                    account: payload.recipient.account,
                },
                dueDate: payload.dueDate,
                total: payload.total,
                interest: payload.interest, 
                fine: payload.fine,
            },
            seunum: '8888777',
            barcode: 'string', 
            digitableLine: 'string', 
            externalId: 'string', 
            bank: 462, 
            status: 2
        }
    }
}
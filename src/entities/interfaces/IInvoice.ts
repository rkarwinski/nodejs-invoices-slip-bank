import { ICustomer } from "./ICustomer";

interface IRecipient {
    document: string,
    wallet: string,
    agency: string,
    account: string,
}

export interface IInvoice {
    id?: string,
    customer: ICustomer,
    recipient: IRecipient,
    dueDate: Date,
    total: number,
    interest: number, 
    fine: number,
    status?: number, 
    createdAt?: Date,
}
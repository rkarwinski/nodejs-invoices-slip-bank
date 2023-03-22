import { ICustomer } from "./ICustomer";
import { IRecipient } from "./IRecipient";

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
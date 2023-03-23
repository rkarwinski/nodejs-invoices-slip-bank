import { IInvoice } from "./IInvoice";

export interface ISlipbank {
    invoice: IInvoice,
    seunum: string,
    barcode: string, 
    digitableLine: string, 
    externalId: string, 
    bank: number, 
    status: number,
}
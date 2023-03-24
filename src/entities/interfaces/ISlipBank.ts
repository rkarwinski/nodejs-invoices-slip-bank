import { IInvoice } from "./IInvoice";

export interface ISlipbank {
    id?: string,
    invoice: IInvoice,
    seunum: string,
    nossonum: string,
    barcode: string, 
    digitableLine: string, 
    externalId: string, 
    bank: number, 
    status: number,
}
import { Invoice } from "../entities/invoice";

export interface IInvoiceRepository {
    findById(id: string): Promise<Invoice>;
    save(invoice: Invoice): Promise<string>;
}
import { Invoice } from "../entities/invoice";

export interface IInvoiceRepository {
    findByid(id: string): Promise<Invoice>;
    save(invoice: Invoice): Promise<string>;
}
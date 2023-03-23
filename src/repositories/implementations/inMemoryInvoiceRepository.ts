import { Invoice } from "../../entities/invoice";
import { IInvoiceRepository } from "../IInvoiceRepository";

export class InMemoryInvoiceRepository implements IInvoiceRepository {
    private invoices: Invoice[] = [];

    async findById(id: string): Promise<Invoice> {
        const invoice = this.invoices.find(invoice => invoice.id == id);
        return invoice;
    }

    async save(invoice: Invoice): Promise<string> {
        if(this.invoices.push(invoice)){
            return invoice.id;
        }
    }
}
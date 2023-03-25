import { exit } from "process";
import ConnectionDataBase from "../../adapters/IConnectionDataBase";
import { Invoice } from "../../entities/invoice";
import { IInvoiceRepository } from "../IInvoiceRepository";

export class PgInvoiceRepository implements IInvoiceRepository {

    constructor( readonly connection: ConnectionDataBase ){

    }

    async findById(id: string): Promise<Invoice> {
        const sql = ` 
            SELECT
                c.*,
                i.*
            FROM
                invoice i 
            JOIN customer c on c.tax_id = i.tax_id  
            WHERE i.id = $1
        `;
                  
        let invoiceFullDB = await this.connection.query(sql, [id]);

        if (invoiceFullDB.rowCount > 0) {
            invoiceFullDB = invoiceFullDB.rows[0];
        }


        const initInvoice = {
            customer: {
                document: invoiceFullDB.tax_id,
                name: invoiceFullDB.name, 
                person: invoiceFullDB.person,
                address: {
                    street: invoiceFullDB.street,
                    number: invoiceFullDB.number,
                    zipcode: invoiceFullDB.zipcode,
                    district: invoiceFullDB.district,
                    city: invoiceFullDB.city,
                    state: invoiceFullDB.state,
                }
            },
            recipient:{
                document: invoiceFullDB.ein_id,
                wallet: invoiceFullDB.wallet,
                agency: invoiceFullDB.agency,
                account: invoiceFullDB.account,
            },
            dueDate: invoiceFullDB.due_date,
            total: invoiceFullDB.total,
            interest: invoiceFullDB.interest,
            fine: invoiceFullDB.fine,
            status: invoiceFullDB.status,
            createdAt: invoiceFullDB.created_at,
        }

		return new Invoice(initInvoice);
    }

    async save(invoice: Invoice): Promise<string> {
        try {
            const sql = ` 
                INSERT INTO public.invoice (id,tax_id,ein_id,wallet,agency,account,due_date,total,interest,fine,status_id,created_at)
                VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,now());
            `;
                    
            await this.connection.query(sql, [
                invoice.id,
                invoice.customer.document,
                invoice.recipient.document,
                invoice.recipient.wallet,
                invoice.recipient.agency,
                invoice.recipient.account,
                invoice.dueDate,
                invoice.total,
                invoice.interest,
                invoice.fine,
                invoice.status
            ]);

        } catch (error) {
            throw new Error("Erro insert database in table: invoice " + error);
        }
        
        return invoice.id; 
    }

}
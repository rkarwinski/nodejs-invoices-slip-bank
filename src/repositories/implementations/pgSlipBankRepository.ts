import ConnectionDataBase from "../../adapters/IConnectionDataBase";
import { Slipbank } from "../../entities/slipbank";
import { ISlipBankRepository } from "../ISlipBankRepository";

export class PgSlipBankRepository implements ISlipBankRepository {

    constructor( readonly connection: ConnectionDataBase ){
    }

    async findByExternalId(id: string): Promise<Slipbank> {
        const sql = ` 
            SELECT
                c.*,
                i.*,
                sb.*
            FROM slipbank sb
            JOIN invoice i  ON i.id = sb.invoice_id
            JOIN customer c ON c.tax_id = i.tax_id  
            WHERE sb.external_id = $1
        `;
                  
        let slipbankFullDB = await this.connection.query(sql, [id]);

        if (slipbankFullDB.rowCount > 0) {
            slipbankFullDB = slipbankFullDB.rows[0];
        }

        const initSlipbank = {
            invoice: {
                customer: {
                    document: slipbankFullDB.tax_id,
                    name: slipbankFullDB.name,
                    person: slipbankFullDB.person,
                    address: {
                        street: slipbankFullDB.street,
                        number: slipbankFullDB.number,
                        zipcode: slipbankFullDB.zipcode,
                        district: slipbankFullDB.district,
                        city: slipbankFullDB.city,
                        state: slipbankFullDB.state,
                    }
                },
                recipient:{
                    document: slipbankFullDB.ein_id,
                    wallet: slipbankFullDB.wallet,
                    agency: slipbankFullDB.agency,
                    account: slipbankFullDB.account,
                },
                dueDate: slipbankFullDB.due_date,
                total: slipbankFullDB.total,
                interest: slipbankFullDB.interest,
                fine: slipbankFullDB.fine,
            },
            seunum: slipbankFullDB.seunum,
            nossonum: slipbankFullDB.nossonum,
            barcode: slipbankFullDB.barcode, 
            digitableLine: slipbankFullDB.digitableLine, 
            externalId: slipbankFullDB.externalId, 
            bank: slipbankFullDB.bank, 
            status: slipbankFullDB.status,
        }

		return new Slipbank(initSlipbank);
    }

    async save(slipbank: Slipbank): Promise<string> {
        try {
            const sql = ` 
                INSERT INTO public.slipbank (id,invoice_id,external_id,seunum,nossonum,barcode,digitableline,due_date,total,status,created_at)
                VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,now());
            `;
                    
            await this.connection.query(sql, [
                slipbank.id,
                slipbank.invoice.id,
                slipbank.externalId,
                slipbank.seunum,
                slipbank.nossonum,
                slipbank.barcode,
                slipbank.digitableLine,
                slipbank.invoice.dueDate,
                slipbank.invoice.interest,
                slipbank.invoice.fine,
                slipbank.invoice.status
            ]);

        } catch (error) {
            throw new Error("Erro insert database in table: slipbank " + error);
        }

        return slipbank.id;
    }

}
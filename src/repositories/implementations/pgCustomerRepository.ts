import ConnectionDataBase from "../../adapters/IConnectionDataBase";
import { Customer } from "../../entities/customer";
import { ICustomerRepository } from "../ICustomerRepository";

export class PgCustomerRepository implements ICustomerRepository {

    constructor( readonly connection: ConnectionDataBase ){
    }

    async findByDocument(document: string): Promise<Customer> {
        const sql = ` 
            SELECT
                *
            FROM
                customer 
            WHERE tax_id = $1
        `;
                  
        let customerFullDB = await this.connection.query(sql, [document]);

        if (customerFullDB.rowCount > 0) {
            customerFullDB = customerFullDB.rows[0];
        }

        const initCustomer = {
                document: customerFullDB.tax_id,
                name: customerFullDB.name, 
                person: customerFullDB.person,
                address: {
                    street: customerFullDB.street,
                    number: customerFullDB.number,
                    zipcode: customerFullDB.zipcode,
                    district: customerFullDB.district,
                    city: customerFullDB.city,
                    state: customerFullDB.state,
                }
            }

		return new Customer(initCustomer);
    }

    async save(customer: Customer): Promise<void> {
        try {
            const sql = ` 
                INSERT INTO public.customer (tax_id,"name",person,street,"number",zipcode,district,city,state,created_at)
                VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,now());
            `;
                    
            await this.connection.query(sql, [
                customer.document,
                customer.name,
                customer.person,
                customer.address.street,
                customer.address.number,
                customer.address.zipcode,
                customer.address.district,
                customer.address.city,
                customer.address.state
            ]);

        } catch (error) {
            throw new Error("Erro insert database in table: customer " + error);
        }
    }
}
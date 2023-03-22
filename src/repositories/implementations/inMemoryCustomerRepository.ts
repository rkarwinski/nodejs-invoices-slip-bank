import { Customer } from "../../entities/customer";
import { ICustomerRepository } from "../ICustomerRepository";

export class InMemoryCustomerRepository implements ICustomerRepository {
    private customers: Customer[] = []; 

    async findByDocument(document: string): Promise<Customer> {
        const customer = this.customers.find(customer => customer.document == document);
        return customer; 
    }

    async save(customer: Customer): Promise<void> {
        this.customers.push(customer);
    }
}
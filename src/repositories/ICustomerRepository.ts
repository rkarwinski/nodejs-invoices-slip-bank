import { Customer } from "../entities/customer";

export interface ICustomerRepository {
    findByDocument(document: string): Promise<Customer>;
    save(customer: Customer): Promise<void>;
}
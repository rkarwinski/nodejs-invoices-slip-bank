import { Customer } from "../entities/customer";
import { Invoice } from "../entities/invoice";
import { ICustomerRepository } from "../repositories/ICustomerRepository";
import { IInvoiceRepository } from "../repositories/IInvoiceRepository";
import { ICreateInvoiceDto } from "./dtos/createInvoiceDto";
import { DateHelper } from "./utils/dateHelper";

export class CreateInvoiceUseCase {
    constructor(
        private invoiceRepository: IInvoiceRepository,
        private customerRepository: ICustomerRepository,
    ) {}

    async execute(data: ICreateInvoiceDto): Promise<Invoice>{
        const customerAlreadyExists = await this.customerRepository.findByDocument(data.customer.document);

        if (!customerAlreadyExists || customerAlreadyExists.document == undefined) {
            const user = new Customer(data.customer);
            await this.customerRepository.save(user);    
        }

        const invoice = new Invoice(data);
        const idInvoice = await this.invoiceRepository.save(invoice);

        return this.invoiceRepository.findById(idInvoice);
    }
}
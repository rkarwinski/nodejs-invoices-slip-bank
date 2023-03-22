export class ICreateInvoiceDto {
    customer: {
        document: string;
        name: string;
        person: string;
        address: {
            street: string;
            number: string;
            zipcode: string;
            district: string;
            city: string;
            state: string;
        }
    };
    recipient:{
        document: string;
        wallet: string;
        agency: string;
        account: string;
    };
    dueDate: Date;
    total: number;
    interest: number;
    fine: number;
}
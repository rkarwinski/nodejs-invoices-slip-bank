import { expect, test } from 'vitest';
import PgPromiseAdapter from '../adapters/implementations/pgPromiseAdapter';
import { InMemoryCustomerRepository } from '../repositories/implementations/inMemoryCustomerRepository';
import { InMemoryInvoiceRepository } from '../repositories/implementations/inMemoryInvoiceRepository';
import { PgCustomerRepository } from '../repositories/implementations/pgCustomerRepository';
import { PgInvoiceRepository } from '../repositories/implementations/pgInvoiceRepository';
import { CreateInvoiceUseCase } from './createInvoiceUseCases';

test('create invoice', async () => {
    const dueDate = new Date(); 
    dueDate.setDate(dueDate.getDate() + 10); 
    const total = Math.floor(Math.random() * (5000 - 100) + 100);

    const createInvoice = new CreateInvoiceUseCase( new InMemoryInvoiceRepository, new InMemoryCustomerRepository);

    const result = await createInvoice.execute({
        customer: {
            document: '35816135066',
            name: 'Ted Mosby', 
            person: 'pf',
            address: {
                street: 'Rua rio branco',
                number: '80',
                zipcode: '94100340',
                district: 'neopolis',
                city: 'Gravataí',
                state: 'RS',
            }
        },
        recipient:{
            document: '55795017000174',
            wallet: '04',
            agency: '1548',
            account: '55505-5',
        },
        dueDate: dueDate,
        total: total,
        interest: 1,
        fine: 2,
    });

    expect(result.total).toEqual(total);
    expect(result.id).not.toBeUndefined();
});

test('create invoice in db', async () => {
    const dueDate = new Date(); 
    dueDate.setDate(dueDate.getDate() + 10); 
    const total = Math.floor(Math.random() * (5000 - 100) + 100);

    const connection = new PgPromiseAdapter;
    const createInvoice = new CreateInvoiceUseCase( new PgInvoiceRepository(connection), new PgCustomerRepository(connection));

    const result = await createInvoice.execute({
        customer: {
            document: '35816135066',
            name: 'Ted Mosby', 
            person: 'pf',
            address: {
                street: 'Rua rio branco',
                number: '80',
                zipcode: '94100340',
                district: 'neopolis',
                city: 'Gravataí',
                state: 'RS',
            }
        },
        recipient:{
            document: '55795017000174',
            wallet: '04',
            agency: '1548',
            account: '55505-5',
        },
        dueDate: dueDate,
        total: total,
        interest: 1,
        fine: 2,
    });

    expect(result.total).toEqual(total);
    expect(result.id).not.toBeUndefined();
});
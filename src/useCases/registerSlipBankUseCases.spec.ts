import { expect, test } from 'vitest';
import AxiosAdapter from '../adapters/implementations/axiosAdapter';
import { MockRegisterSlipBankGateway } from '../adapters/implementations/mockRegisterSlipBankGateway';
import PgPromiseAdapter from '../adapters/implementations/pgPromiseAdapter';
import { RegisterSlipBankGateway } from '../adapters/implementations/registerSlipBankGateway';
import { inMemorySlipBankRepository } from '../repositories/implementations/inMemorySlipBankRepository';
import { PgSlipBankRepository } from '../repositories/implementations/pgSlipBankRepository';
import { RegisterSlipBankUseCase } from './registerSlipBankUseCases';

test('register slipbank in bradesco', async () => {
    const idBanco = 237;
    const dueDate = new Date(); 
    dueDate.setDate(dueDate.getDate() + 10); 
    const total = Math.floor(Math.random() * (5000 - 100) + 100);

    const regiserSlipBank = new RegisterSlipBankUseCase( new inMemorySlipBankRepository, new MockRegisterSlipBankGateway );

    const result = await regiserSlipBank.execute(idBanco, {
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

    expect(result.barcode).toString();
    expect(result.digitableLine).toString();
});

test('register slipbank in starkbank', async () => {
    const idBanco = 462;
    const dueDate = new Date(); 
    dueDate.setDate(dueDate.getDate() + 10); 
    const total = Math.floor(Math.random() * (5000 - 100) + 100);

    const regiserSlipBank = new RegisterSlipBankUseCase( new inMemorySlipBankRepository, new MockRegisterSlipBankGateway );

    const result = await regiserSlipBank.execute(idBanco, {
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

    expect(result.barcode).toString();
    expect(result.digitableLine).toString();
    expect(result.bank).toEqual(462);
});


test('cannot register slipbank with id bank incorrect', async () => {
    const idBanco = 650;
    const dueDate = new Date(); 
    dueDate.setDate(dueDate.getDate() + 10); 
    const total = Math.floor(Math.random() * (5000 - 100) + 100);

    const regiserSlipBank = new RegisterSlipBankUseCase( new inMemorySlipBankRepository, new MockRegisterSlipBankGateway );

    const payload = {
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
    }; 

    await expect(() => regiserSlipBank.execute(idBanco, payload)).rejects.toThrowError('Invalid bank ID');
});

test.skip('register slipbank in bradesco API', async () => {
    const idBanco = 237;
    const dueDate = new Date(); 
    dueDate.setDate(dueDate.getDate() + 10); 
    const total = Math.floor(Math.random() * (5000 - 100) + 100);

    const connection = new PgPromiseAdapter();
    const httpClient = new AxiosAdapter();

    const regiserSlipBank = new RegisterSlipBankUseCase( new PgSlipBankRepository(connection), new RegisterSlipBankGateway(httpClient) );

    const result = await regiserSlipBank.execute(idBanco, {
        id: "f5d82ebd-8f8c-43b1-9f57-aee205b59ca4", 
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

    expect(result.barcode).toString();
    expect(result.digitableLine).toString();
});

test.skip('register slipbank in starkbank API', async () => {
    const idBanco = 462;
    const dueDate = new Date(); 
    dueDate.setDate(dueDate.getDate() + 10); 
    const total = Math.floor(Math.random() * (5000 - 100) + 100);

    const connection = new PgPromiseAdapter();
    const httpClient = new AxiosAdapter();

    const regiserSlipBank = new RegisterSlipBankUseCase( new PgSlipBankRepository(connection), new RegisterSlipBankGateway(httpClient) );

    const result = await regiserSlipBank.execute(idBanco, {
        id: '484d555d-f297-4b0e-8867-065b5d300ec8',
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

    expect(result.barcode).toString();
    expect(result.digitableLine).toString();
});
import { expect, test } from 'vitest';
import { MockRegisterSlipBankGateway } from '../adapters/implementations/mockRegisterSlipBankGateway';
import { inMemorySlipBankRepository } from '../repositories/implementations/inMemorySlipBankRepository';
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
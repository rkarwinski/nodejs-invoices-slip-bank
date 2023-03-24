import { expect, test } from 'vitest';
import { Slipbank } from './slipbank';

test('create customer', () => {
    const dueDate = new Date(); 
    dueDate.setDate(dueDate.getDate() + 10); 
    const total = Math.floor(Math.random() * (5000 - 100) + 100);

    const slipbank = new Slipbank({
        invoice: {
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
            fine: 3,
        },
        seunum: '555555555',
        nossonum: '0000555555555',
        barcode: '5a55555555555555555555555', 
        digitableLine: '555555555555555555', 
        externalId: '44444', 
        bank: 237, 
        status: 2,
    });

    expect(slipbank).toBeInstanceOf(Slipbank);
});
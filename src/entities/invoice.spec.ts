import { expect, test } from 'vitest';
import { Invoice } from './invoice';

test('create invoice', () => {
    const dueDate = new Date(); 
    dueDate.setDate(dueDate.getDate() + 10); 
    const total = Math.floor(Math.random() * (5000 - 100) + 100);

    const invoice = new Invoice({
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

    expect(invoice).toBeInstanceOf(Invoice);
    expect(invoice.total).toEqual(total);
});

test('cannot create invoice whit dueDate before now', () => {
    const dueDate = new Date(); 
    dueDate.setDate(dueDate.getDate() - 1); 

    const total = Math.floor(Math.random() * (5000 - 100) + 100);

    expect(() => {
        return new Invoice({
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
        })
    }).toThrow();
});


test('cannot create invoice whit total less than zero', () => {
    const dueDate = new Date(); 
    dueDate.setDate(dueDate.getDate() + 10); 

    const total = Math.floor(Math.random() * (100 - 5000) + 100);

    expect(() => {
        return new Invoice({
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
            total: 0,
            interest: 1,
            fine: 2,
        })
    }).toThrow();
});

test('cannot create invoice whit a fine greater than 2', () => {
    const dueDate = new Date(); 
    dueDate.setDate(dueDate.getDate() + 10); 
    const total = Math.floor(Math.random() * (5000 - 100) + 100);

    expect(() => {
        return new Invoice({
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
        })
    }).toThrow();
});
import { expect, test } from 'vitest';
import { Customer } from './customer';

test('create customer', () => {
    const customer = new Customer({
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
    });

    expect(customer).toBeInstanceOf(Customer);
    expect(customer.name).toEqual('Ted Mosby');
});
interface IAddress {
    street: string,
    number: string,
    complement?: string,
    zipcode: string,
    district: string,
    city: string,
    state: string,
}

export interface ICustomer {
    document: string,
    name: string,
    person: string,
    address: IAddress,
}
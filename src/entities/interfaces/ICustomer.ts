import { IAddress } from "./IAddress";

export interface ICustomer {
    document: string,
    name: string,
    person: string,
    address: IAddress,
}
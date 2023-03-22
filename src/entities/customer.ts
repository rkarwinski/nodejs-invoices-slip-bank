import { ICustomer } from "./interfaces/ICustomer";

export class Customer {
    private props: ICustomer; 

    get address () {
        return  this.props.address; 
    }

    get name () {
        return  this.props.name; 
    }

    get document () {
        return  this.props.document; 
    }

    constructor(props: ICustomer) {
        this.props = props; 
    }
}
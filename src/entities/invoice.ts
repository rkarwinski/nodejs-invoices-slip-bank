import { uuid } from "uuidv4";
import { IInvoice } from "./interfaces/IInvoice";


export class Invoice {
    private props: IInvoice; 

    get id () {
        return this.props.id;
    }

    get total () {
        return  this.props.total; 
    }

    get dueDate () {
        return  this.props.dueDate; 
    }
    
    get recipient () {
        return  this.props.recipient; 
    }

    get status () {
        return  this.props.status; 
    }
    
    constructor(props: IInvoice) {
        const { dueDate, interest, fine, total, status, id } = props;

        if (dueDate <= new Date()) {
            throw new Error("Invalid Due Date");
        }
        
        if (interest > 1) {
            throw new Error("Invalid Interest");
        }

        if (fine > 2) {
            throw new Error("Invalid fine");
        }

        if (total <= 0) {
            throw new Error("Invalid total");
        }

        if(!status){
            props.status = 1; 
        }

        if(!id){
            props.id = uuid(); 
        }

        props.createdAt = new Date(); 

        this.props = props; 
    }
}
import { IInvoice } from "./interfaces/IInvoice";

export interface SlipbankProps {
    invoice: IInvoice,
    seunum: string,
    barcode: string, 
    digitableLine: string, 
    externalId: string, 
    bank: string, 
    status: number,
}

export class Slipbank {
    private props: SlipbankProps; 

    get invoice () {
        return  this.props.invoice; 
    }

    get seunum () {
        return  this.props.seunum; 
    }
    
    get barcode () {
        return  this.props.barcode; 
    }

    get digitableLine () {
        return  this.props.digitableLine; 
    }
    
    constructor(props: SlipbankProps) {
        this.props = props; 
    }
}
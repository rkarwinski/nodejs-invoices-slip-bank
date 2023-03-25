import { uuid } from "uuidv4";
import { ISlipbank } from "./interfaces/ISlipBank";

export class Slipbank {
    private props: ISlipbank; 

    get invoice () {
        return  this.props.invoice; 
    }

    get id () {
        return  this.props.id; 
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

    get externalId () {
        return  this.props.externalId; 
    }

    get bank () {
        return  this.props.bank; 
    }

    get nossonum () {
        return  this.props.nossonum; 
    }
    
    constructor(props: ISlipbank) {
        const { id } = props;

        if(!id){
            props.id = uuid(); 
        }

        this.props = props; 
    }
}
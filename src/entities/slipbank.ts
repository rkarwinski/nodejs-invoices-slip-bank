import { uuid } from "uuidv4";
import { ISlipbank } from "./interfaces/ISlipBank";

export class Slipbank {
    private props: ISlipbank; 

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

    get externalId () {
        return  this.props.externalId; 
    }

    get bank () {
        return  this.props.bank; 
    }
    
    constructor(props: ISlipbank) {
        const { id } = props;

        if(!id){
            props.id = uuid(); 
        }

        this.props = props; 
    }
}
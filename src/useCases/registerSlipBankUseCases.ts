import IRegisterSlipBankGateway from "../adapters/IRegisterSlipBankGateway";
import { ISlipbank } from "../entities/interfaces/ISlipBank";
import { Slipbank } from "../entities/slipbank";
import { ISlipBankRepository } from "../repositories/ISlipBankRepository";
import { ICreateInvoiceDto } from "./dtos/createInvoiceDto";

export class RegisterSlipBankUseCase {
    private readonly banks: any 

    constructor(
        private slipBankRepository: ISlipBankRepository,
        private registerSlipBankGateway: IRegisterSlipBankGateway,
    ) {
        this.banks = [{ id: 237, name: "BRADESCO" },{id: 462, name: "STARKBANK"}];
    }

    async execute(bank: number, data: ICreateInvoiceDto): Promise<Slipbank>{
        let registerSlipBank: ISlipbank;
        const banks = this.banks.find(banks => banks.id == bank);
        
        if (!banks) {
            throw new Error("Invalid bank ID");
        }

        if (bank == banks.id) {
            registerSlipBank = await this.registerSlipBankGateway.registerSlipBankBradesco(data);
        }
        
        if (bank == banks.id) {
            registerSlipBank = await this.registerSlipBankGateway.registerSlipBankStarkBank(data);
        }

        const slipBank = new Slipbank(registerSlipBank); 
        await this.slipBankRepository.save(slipBank);

        return this.slipBankRepository.findByExternalId(slipBank.externalId);    
    }
}
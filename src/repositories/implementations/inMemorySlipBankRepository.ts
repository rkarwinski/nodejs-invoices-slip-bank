import { Slipbank } from "../../entities/slipbank";
import { ISlipBankRepository } from "../ISlipBankRepository";

export class inMemorySlipBankRepository implements ISlipBankRepository {
    private slipbank: Slipbank[] = [];

    async findByExternalId(id: string): Promise<Slipbank> {
        const slipbank = this.slipbank.find(slipbank => slipbank.externalId == id);
        return slipbank;
    }

    async save(slipbank: Slipbank): Promise<string> {
        if(this.slipbank.push(slipbank)){
            return slipbank.externalId;
        }
    }
}
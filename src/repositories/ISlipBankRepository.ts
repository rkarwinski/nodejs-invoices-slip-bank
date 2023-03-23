import { Slipbank } from "../entities/slipbank";

export interface ISlipBankRepository {
    findByExternalId(id: string): Promise<Slipbank>;
    save(slipbank: Slipbank): Promise<string>;
}
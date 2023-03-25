import { IInvoice } from "../../entities/interfaces/IInvoice";
import { ISlipbank } from "../../entities/interfaces/ISlipBank";
import HttpClient from "../IHttpClient";
import IRegisterSlipBankGateway from "../IRegisterSlipBankGateway";
import dotenv from 'dotenv';

dotenv.config();

export class RegisterSlipBankGateway implements IRegisterSlipBankGateway {
    constructor (readonly httpClient: HttpClient) {

	}

    async registerSlipBankBradesco(payload: IInvoice): Promise<ISlipbank> {

        const body = {
            nuCPFCNPJ: payload.recipient.document.padStart(14, '0').substr(0, 14 - 6),
            filialCPFCNPJ: payload.recipient.document.padStart(14, '0').substr(-6, 4),
            ctrlCPFCNPJ: payload.recipient.document.padStart(14, '0').substr(-2),
            idProduto: payload.recipient.wallet
                .substr(0, 3)
                .substr(-2)
                .padStart(2, '0'),
            nuNegociacao:
                payload.recipient.agency.substr(0, 5) +
                '0000000' +
                payload.recipient.account.padStart(7, '0'),
            cdBanco: 237,
            tpRegistro: '1',
            nuCliente: '0044454521',
            dtEmissaoTitulo: new Date(),
            dtVencimentoTitulo: payload.dueDate,
            tpVencimento: '0',
            vlNominalTitulo: payload.total,
            cdEspecieTitulo: '04',
            tpProtestoAutomaticoNegativacao: '0',
            prazoProtestoAutomaticoNegativacao: '0',
            controleParticipante: '0000000000000000000000000000',
            cdPagamentoParcial: '0',
            qtdePagamentoParcial: '0',
            percentualJuros: payload.interest,
            vlJuros: '0',
            qtdeDiasJuros: '1',
            percentualMulta: payload.fine,
            vlMulta: '0',
            qtdeDiasMulta: '1',
            percentualDesconto1: '0',
            vlDesconto1: '0',
            dataLimiteDesconto1: ' ',
            percentualDesconto2: '0',
            vlDesconto2: '0',
            dataLimiteDesconto2: ' ',
            percentualDesconto3: '0',
            vlDesconto3: '0',
            dataLimiteDesconto3: ' ',
            prazoBonificacao: '0',
            percentualBonificacao: '0',
            vlBonificacao: '0',
            dtLimiteBonificacao: ' ',
            vlAbatimento: '0',
            vlIOF: '0',
            nomePagador: payload.customer.name,
            logradouroPagador: payload.customer.address.street,
            nuLogradouroPagador: payload.customer.address.number,
            complementoLogradouroPagador: ' ',
            cepPagador: payload.customer.address.zipcode.substr(0, 5),
            complementoCepPagador: payload.customer.address.zipcode.substr(-3),
            bairroPagador: payload.customer.address.district,
            municipioPagador: payload.customer.address.city,
            ufPagador: payload.customer.address.state,
            cdIndCpfcnpjPagador: payload.customer.person == 'pf' ? '1' : '2',
            nuCpfcnpjPagador: payload.customer.document.padStart(14, '0'),
            endEletronicoPagador: ' ',
            nomeSacadorAvalista: ' ',
            logradouroSacadorAvalista: ' ',
            nuLogradouroSacadorAvalista: ' ',
            complementoLogradouroSacadorAvalista: ' ',
            cepSacadorAvalista: '0',
            complementoCepSacadorAvalista: '0',
            bairroSacadorAvalista: ' ',
            municipioSacadorAvalista: ' ',
            ufSacadorAvalista: ' ',
            cdIndCpfcnpjSacadorAvalista: '0',
            nuCpfcnpjSacadorAvalista: '0',
            endEletronicoSacadorAvalista: ' ',
        }

        const slipBank = await this.httpClient.post(`${process.env.URL_REGISTER}/v1/boleto/registrarBoleto`, body);

        let returnData;
        if (slipBank.nuTituloGerado != undefined) {
            returnData = {
                invoice: payload, 
                seunum: slipBank.cdProduto,
                nossonum: slipBank.numeroTitulo,
                barcode: slipBank.cdBarras,
                digitableLine: slipBank.linhaDigitavel,
                externalId: slipBank.nuTituloGerado,
                bank: 237, 
                status: 2
            }
        }
		return returnData;
    }
    async registerSlipBankStarkBank(payload: IInvoice): Promise<ISlipbank> {
        const body = {
            amount: payload.total,
            name: payload.customer.name,
            taxId: payload.customer.document, 
            streetLine1: payload.customer.address.street,
            streetLine2: payload.customer.address.complement,
            district: payload.customer.address.district,
            city: payload.customer.address.city,
            stateCode: payload.customer.address.state,
            zipCode: payload.customer.address.zipcode,
            due: payload.dueDate,
            fine: payload.fine,
            interest: payload.interest,
            overdueLimit: 5,
            tags: [
                "85888888"
            ],
            discounts: []
        }   
        const slipBank = await this.httpClient.post(`${process.env.URL_REGISTER}/v2/boleto`, body);

        let returnData;
        if (slipBank.id != undefined) {
            returnData = {
                invoice: payload, 
                seunum: slipBank.workspaceId,
                nossonum: slipBank.ourNumber,
                barcode: slipBank.barCode,
                digitableLine: slipBank.line,
                externalId: slipBank.id,
                bank: 462, 
                status: 2
            }
        }
		return returnData;
    } 
}
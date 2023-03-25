import AxiosAdapter from "./adapters/implementations/axiosAdapter";
import ExpressAdapter from "./adapters/implementations/ExpressAdapter";
import PgPromiseAdapter from "./adapters/implementations/pgPromiseAdapter";
import { RegisterSlipBankGateway } from "./adapters/implementations/registerSlipBankGateway";
import InvoiceController from "./controllers/InvoiceController";
import { PgCustomerRepository } from "./repositories/implementations/pgCustomerRepository";
import { PgInvoiceRepository } from "./repositories/implementations/pgInvoiceRepository";
import { PgSlipBankRepository } from "./repositories/implementations/pgSlipBankRepository";
import { CreateInvoiceUseCase } from "./useCases/createInvoiceUseCases";


const connection = new PgPromiseAdapter();
const InvoiceRepository = new PgInvoiceRepository(connection);
const SlipBankRepository = new PgSlipBankRepository(connection);
const CustomerRepository = new PgCustomerRepository(connection);
const httpClient = new AxiosAdapter();
const registerSlipBankGateway = new RegisterSlipBankGateway(httpClient);
const createInvoiceUseCase = new CreateInvoiceUseCase(InvoiceRepository, CustomerRepository);
const httpServer = new ExpressAdapter();

new InvoiceController(httpServer, createInvoiceUseCase);
httpServer.listen(3000);
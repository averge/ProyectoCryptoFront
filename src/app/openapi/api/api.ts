export * from './coinController.service';
import { CoinControllerService } from './coinController.service';
export * from './coinExchangeController.service';
import { CoinExchangeControllerService } from './coinExchangeController.service';
export * from './exchangeController.service';
import { ExchangeControllerService } from './exchangeController.service';
export * from './pingController.service';
import { PingControllerService } from './pingController.service';
export const APIS = [CoinControllerService, CoinExchangeControllerService, ExchangeControllerService, PingControllerService];

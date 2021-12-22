import { Exchange } from "../openapi/model/exchange";

export class coinEchange  { 
    nombre?: string;
    sufijo?: string;
    precio?: number;
    descripcion?: string;
    link?: string;
    exchange?: Array<Exchange>;
}

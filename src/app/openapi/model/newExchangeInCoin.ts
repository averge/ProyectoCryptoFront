/**
 * alfa
 * beta
 *
 * The version of the OpenAPI document: 0.0.1
 * Contact: 48928310+averge@users.noreply.github.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


/**
 * (tsType: @loopback/repository-json-schema#Optional<Omit<Exchange, \'id\'>, \'coinId\'>, schemaOptions: { title: \'NewExchangeInCoin\', exclude: [ \'id\' ], optional: [ \'coinId\' ] })
 */
export class NewExchangeInCoin { 
    nombre: string;
    link?: string;
    script?: string;
    coinId?: string;

    constructor(nombre: string, link?: string, script?: string, coinId?: string) {
        this.nombre = nombre; 
        this.link = link;
        this.script = script;
        this.coinId = coinId;
    }

}

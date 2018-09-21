import Axios from 'axios';
import { fetchApiConfig } from '../__mocks__/mockData';

export interface HttpClient {
    getInstance(): HttpClientInstance;
}

export interface HttpClientInstance {
    (config: any): Promise<any>;
    (url: string, config?: any): Promise<any>;
    get?(url: string, config?: object): Promise<any>;
    delete?(url: string, config?: object): Promise<any>;
    post?(url: string, data?: any, config?: object): Promise<any>;
    put?(url: string, data?: any, config?: object): Promise<any>;
}

export interface HttpResponse<T = any> extends Response {
    data: T;
    request?: any;
}

export class HttpError extends Error {
    public response;
    constructor(response) {
        super(`${response.status} for ${response.url}`);
        this.response = response;
    }
}

let EeHttpClient: HttpClient;
EeHttpClient = class EeHttpClient {
    private static _instance: HttpClientInstance;

    public static getInstance(httpClientLib = Axios): HttpClientInstance {

        if (!this._instance) {
            if (httpClientLib instanceof Axios) {
                this._instance = httpClientLib.create(fetchApiConfig);
            } else if (httpClientLib instanceof fetch) {
                this._instance = fetch;
            }
        }
        return this._instance
    }
}

export default EeHttpClient;
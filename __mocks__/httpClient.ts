import { httpResponseResolveMock, httpResponseRejectMock } from "../__mocks__/mockData";
import { DataSourceDescriptors } from "../src/interfaces";
import { HttpClient } from "../src/httpClient";

var EeHttpClientMock: HttpClient;
EeHttpClientMock = class EeHttpClientMock {
    private static _instance;

    public static getInstance() {

        if (!this._instance) {

            this._instance = new HttpClientInstanceMock();
        }
        return this._instance
    }
}

export default EeHttpClientMock;

class HttpClientInstanceMock {
    constructor() { }
    get(url: string, config?: object) {
        return new Promise((resolve, reject) => {
            if (url.includes('filter=')) {
                resolve(httpResponseResolveMock)
            } else {
                reject(httpResponseRejectMock)
            }
        });
    }

    post(url: string, descriptors: DataSourceDescriptors, config?: object) {
        return new Promise((resolve, reject) => {
            if (url && descriptors.filter) {
                resolve(httpResponseResolveMock)
            } else {
                reject(httpResponseRejectMock)
            }
        });
    }
}
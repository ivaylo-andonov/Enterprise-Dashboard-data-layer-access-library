import * as DataQuery from '@progress/kendo-data-query';
import { HttpConfiguration } from "./configuration";
import EeHttpClient, { HttpError, HttpResponse, HttpClientInstance, HttpClient } from './httpClient';
import { DataSourceDescriptors, ReportsViewData } from './interfaces';


export class BaseAPI {
    protected dataQuery: any;
    protected httpClient: HttpClientInstance;
    protected configuration: HttpConfiguration;

    constructor(configuration?: HttpConfiguration, fetchClient: HttpClient = EeHttpClient, dataQueryLib: any = DataQuery) {
        if (configuration) {
            this.configuration = configuration;
        }

        this.dataQuery = dataQueryLib;
        this.httpClient = fetchClient.getInstance();
    }
};

export default class EeDataAccessAPI extends BaseAPI {

    public async getReportsData(url: string, descriptors: DataSourceDescriptors, data?: any, getRequest?: boolean): Promise<ReportsViewData> {

        let result: ReportsViewData;
        let httpResponse: HttpResponse<ReportsViewData>;
        const requestParams = this.getRequestParams(this.configuration, url);

        if (data && descriptors) {
            result = this.applyInMemoryFiltersToData(data, descriptors);
            return result;
        }   

        try {
            httpResponse = getRequest ? await this.loadReportsGET(descriptors, requestParams) : await this.loadReportsPOST(descriptors, requestParams);
        } catch (err) {
            if (err instanceof HttpError) {
                console.log(`Error message: ${err.message}; ${err.response}`);
            } else {
                throw err;
            }
        }

        result = this.mapHttpResponseToViewData(httpResponse);
        return result;
    }

    private async loadReportsPOST(descriptors, requestParams) {

        let response: HttpResponse<ReportsViewData>;
        let url = this.configuration.basePath + requestParams.url;
        response = await this.httpClient.post(url, descriptors, requestParams.options);

        if (response.status == 200) {
            return response;
        } else {
            throw new HttpError(response);
        }
    }

    private async loadReportsGET(descriptors, requestParams) {

        let response: HttpResponse<ReportsViewData>;
        let url = this.configuration.basePath + requestParams.url;
        let queryStringDescriptors = DataQuery.toDataSourceRequestString(descriptors);

        response = await this.httpClient.get(`${url}?${queryStringDescriptors}`, requestParams.options);

        if (response.status == 200) {
            return response;
        } else {
            throw new HttpError(response);
        }
    }

    private applyInMemoryFiltersToData = (data, descriptors: DataSourceDescriptors): ReportsViewData => {

        let result: DataQuery.DataResult;
        result = this.dataQuery.process(data, descriptors);

        return {
            reports: result.data,
            totals: result.total
        };
    }

    private mapHttpResponseToViewData = (response: HttpResponse<ReportsViewData>): ReportsViewData => {
        if (response.data) {
            return {
                reports: response.data.reports,
                totals: response.data.totals
            };
        }
        return { reports: [], totals: 0 }
    };

    private getRequestParams = (configuration?: HttpConfiguration, url?: string) => {

        const localRequestOptions = {} as any;
        const localHeaderParameter = {} as any;

        // In case internal api authentication required
        if (configuration && configuration.apiKey) {
            localHeaderParameter["Authorization"] = configuration.apiKey;
        }

        //Overrides and adding additional headers if needed
        localHeaderParameter['Content-Type'] = 'application/json';
        localRequestOptions.headers = localHeaderParameter;

        return {
            url: url,
            options: localRequestOptions,
        };
    };
}


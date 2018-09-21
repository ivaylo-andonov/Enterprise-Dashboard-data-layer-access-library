import 'jest';
import EeDataAccessAPI, { BaseAPI } from '../src/api'
import { HttpConfiguration } from '../src/configuration';
import * as mocks from '../__mocks__/mockData';
import EeHttpClientMock from '../__mocks__/httpClient';

describe('EeDataAccessAPI', () => {

    const dataAccessLibMock = new EeDataAccessAPI(new HttpConfiguration(), EeHttpClientMock);

    test('constructor', () => {
        expect(dataAccessLibMock).toBeInstanceOf(BaseAPI);
    });

    test('getReportsData in-memory filtering one report', async () => {

        expect.hasAssertions();
        const reportData = await dataAccessLibMock.getReportsData(mocks.urlEndpoint, mocks.filterDescriptorForEquality, mocks.initialReportsData);
        const expectedReportIdVal = mocks.filterDescriptorForEquality.filter.filters[0].value;
        expect(reportData.totals).toEqual(1);
        expect(reportData.reports[0].id).toEqual(expectedReportIdVal);
    });

    test('getReportsData in-memory filtering and sort data', async () => {

        expect.assertions(1);
        const filteredAndSortedData = await dataAccessLibMock.getReportsData(mocks.urlEndpoint, mocks.dataSourceDescriptors, mocks.initialReportsData);
        expect(filteredAndSortedData).toEqual(mocks.filteredInitialReportsViewData);
    });

    test('getReportsData server side filtering data [POST][resolved]', () => {

        expect.hasAssertions();
        return expect(dataAccessLibMock.getReportsData(mocks.urlEndpoint, mocks.dataSourceDescriptors)).resolves.toEqual(mocks.testReportViewData);
    });

    test('getReportsData server side filtering data [POST][rejected]', () => {

        expect.hasAssertions();
        return expect(dataAccessLibMock.getReportsData(mocks.urlEndpoint, {})).rejects.toEqual(mocks.httpResponseRejectMock);
    });

    test('getReportsData server side filtering data [GET][resolved]', () => {

        expect.hasAssertions();
        return expect(dataAccessLibMock.getReportsData(mocks.urlEndpoint, mocks.dataSourceDescriptors, null, true)).resolves.toEqual(mocks.testReportViewData);
    });

    test('getReportsData server side filtering data [GET][rejected]', () => {

        expect.hasAssertions();
        return expect(dataAccessLibMock.getReportsData(mocks.urlEndpoint, {}, null, true)).rejects.toEqual(mocks.httpResponseRejectMock);
    });
});
import { AxiosRequestConfig } from 'axios'
import { DataSourceDescriptors, ReportsViewData, Report } from '../src/interfaces';
import { HttpResponse } from '../src/httpClient';

export const basePath = "http://localhost:8080/ee-api/";
export const urlEndpoint = "/reports";

export const fetchApiConfig: AxiosRequestConfig = {
    baseURL: basePath,
    url: urlEndpoint,
    responseType: 'json',
    headers: { 'X-Custom-Header': 'foobar' },
    timeout: 5000,
}

export const dataSourceDescriptors: DataSourceDescriptors =
{
    filter: {
        logic: "and",
        filters: [
            { field: "riskPercent", operator: "lt", value: 0.33 },
            { field: "isDanger", operator: "eq", value: false }
        ]
    },
    sort: [{ field: 'name', dir: 'desc' }]
}

export const filterDescriptorForEquality: DataSourceDescriptors =
{
    filter: {
        logic: "and",
        filters: [
            { field: "id", operator: "eq", value: '9599fb24-e1eb-48df-b9fe-a317b297da51' }
        ]
    }
}

export const initialReportsData = [
    {
        id: '9599fb24-e1eb-48df-b9fe-a317b297da51',
        name: 'Prevalent, Inc.',
        riskPercent: 0.23,
        domain: 'https://www.prevalent.net/',
        vtmId: 'M',
        isDanger: false
    },
    {
        id: '9599fb24-e1eb-48df-b9fe-a317b297da41',
        name: 'Merck',
        riskPercent: 0.32,
        domain: 'http://www.merck.com/',
        vtmId: '57d9b1c6b255ac354a67928b',
        isDanger: false
    },
    {
        id: '9599fb24-e1eb-48df-b9fe-a317b297da42',
        name: 'Johnson & Johnson',
        riskPercent: 0.99,
        domain: 'https://www.jnj.com/',
        vtmId: '573e78a3f52a9a9f49cdeff1',
        isDanger: false
    },
    {
        id: '9599fb24-e1eb-48df-b9fe-a317b297da43',
        name: 'Aetna Inc.',
        riskPercent: 0.54,
        domain: 'https://www.aetna.com',
        vtmId: '53a80cb01b99bfd0242fe9d4',
        isDanger: true
    },
    {
        id: '9599fb24-e1eb-48df-b9fe-a317b297da44',
        name: 'Amgen',
        riskPercent: 0.65,
        domain: 'http://www.amgen.com/',
        vtmId: '57d9bb4da807000a4a0b8701',
        isDanger: false
    },
    {
        id: '9599fb24-e1eb-48df-b9fe-a317b297da45',
        name: 'Cisco',
        riskPercent: 0.22,
        domain: 'https://www.cisco.com/',
        vtmId: 'G',
        isDanger: false
    },
    {
        id: '9599fb24-e1eb-48df-b9fe-a317b297da46',
        name: 'IBM',
        riskPercent: 0.23,
        domain: 'https://www.ibm.com/',
        vtmId: 'H',
        isDanger: false
    },
    {
        id: '9599fb24-e1eb-48df-b9fe-a317b297da47',
        name: 'Fiesta Services',
        riskPercent: 0.54,
        domain: 'https://www.fiesta.com/',
        vtmId: '55367b2f0c1644b946bd2046',
        isDanger: true
    }]

export const filteredInitialReportsViewData = {
    "reports":
        [
            { "domain": "https://www.prevalent.net/", "id": "9599fb24-e1eb-48df-b9fe-a317b297da51", "isDanger": false, "name": "Prevalent, Inc.", "riskPercent": 0.23, "vtmId": "M" },
            { "domain": "http://www.merck.com/", "id": "9599fb24-e1eb-48df-b9fe-a317b297da41", "isDanger": false, "name": "Merck", "riskPercent": 0.32, "vtmId": "57d9b1c6b255ac354a67928b" },
            { "domain": "https://www.ibm.com/", "id": "9599fb24-e1eb-48df-b9fe-a317b297da46", "isDanger": false, "name": "IBM", "riskPercent": 0.23, "vtmId": "H" },
            { "domain": "https://www.cisco.com/", "id": "9599fb24-e1eb-48df-b9fe-a317b297da45", "isDanger": false, "name": "Cisco", "riskPercent": 0.22, "vtmId": "G" }],
    "totals": 4
}

export const testReportViewData: ReportsViewData =
{
    reports: [{
        id: 323,
        name: "vendor1",
        riskPercent: 0.32,
        vtmId: 32452,
        isDanger: false
    }],
    totals: 1
}

export const testReport: Report =
{
    id: 324225,
    name: "vendor2",
    riskPercent: 0.87,
    vtmId: 55352,
    isDanger: true
}

export const httpResponseResolveMock = {
    data: testReportViewData,
    ok: true,
    status: 200,
    statusText: "OK"
}

export const httpResponseRejectMock = {
    data: {},
    ok: false,
    status: 404,
    statusText: "BAD",
    url: '/reports123'
}
export interface ReportsViewData {
    reports: Array<Report>;
    totals: number
}

export interface Report {
    id: number,
    name?: string,
    riskPercent?: number,
    vtmId: number,
    isDanger: boolean
}

export interface DataSourceDescriptors {
    filter?: FilterDescriptor;
    sort?: SortDescriptor;
}

export interface FilterDescriptor {
    logic: string;
    filters: Array<Filter>;
}

export interface Filter {
    operator: string,
    field?: string,
    value?: any,
    ignoreCase?: boolean
}

export interface SortDescriptor {
    [key: number]: Sort
}

export interface Sort {
    field: string;
    dir?: string;
}

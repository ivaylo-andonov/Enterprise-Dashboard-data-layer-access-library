# Enterprise Dashboard - client data layer access library

## Technical stack:

* React, TypeScript
* Axios ( by default , possibility of substitution with other http client lib )
* Kendo Data Query ( by default for in-memory data filtering, sorting and aggregation)
* Jest ( test framework )

# API

1. Class 'EeDataAccessAPI' with constructor signature
 `(configuration?: HttpConfiguration, fetchClient: HttpClient, dataQueryLib : any)`

2. The instance of the class 'EeDataAccessAPI' has followed methods:
* async  function "getReportsData" with signature 
`(url: string, descriptors: DataSourceDescriptors, data?: any, getRequest?: boolean)`

###### Main logic inside is if 'data' param is passed -> the report data is processed in-memory, otherwise backend is called via http, map raw data into view data and return it.

## Install

1. Install dependencies: `npm install`
4. Build the package: `npm run build`
5. Run tests : `npm run test`



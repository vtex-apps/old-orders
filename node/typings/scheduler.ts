export interface SchedulerBody {
    id?: string
    scheduler: {
      expression: string // '5 4 * * *'
      endDate: string // '2018-11-28T23:29:00'
    }
    request: {
      uri: string // 'http(s)://{{notification.api}}'
      method: string // '{[HTTP method]}'
      body: any
    }
  }
  
  export enum SchedulerRequestMethods {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
  }
  
  export interface CreateSchedulerParams {
    cronExpression: string
    cronRequestURI: string
    cronRequestMethod: string
    cronBody: any
    cronId?: string
  }
  
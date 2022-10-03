import { Context } from 'koa'

declare global {
    type LogLevel = 'info' | 'error' | 'warning' | 'debug'

    type Middleware = (ctx: ColossusContext) => Promise<void>

    interface IOContext {
        account: string
        workspace: string
        production: boolean
        authToken: string
        region: string
        route: {
            id: string
            declarer: string
            params: {
                [param: string]: string
            }
        }
        userAgent: string
    }

    export interface ColossusContext extends Context {
        vtex: IOContext
        colossusLogger: any
    }
}

export { }
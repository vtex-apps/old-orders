export const PING_CRON = {
    id: 'f3115a0d-ac67-4e1d-a549-85b453d7cad1',
    url: (host: string) => `https://${host}/_v/old-orders/cron`,
    expression: '*/5 * * * *', // every 5 minutes
  }
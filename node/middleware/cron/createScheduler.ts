import { PING_CRON } from '../../helpers/constants'
import { formatError } from '../../helpers/error'

export async function createScheduler(ctx: Context, next: () => Promise<any>) {
  const {
    clients: { scheduler },
    vtex: { logger },
  } = ctx

  try {
    logger.info({
      middleware: 'CREATE-CRON',
      message: 'Creating cron!',
    })

    await scheduler.createOrUpdateScheduler({
      cronId: PING_CRON.id,
      cronExpression: PING_CRON.expression,
      cronRequestMethod: 'GET',
      cronRequestURI: PING_CRON.url(ctx.host),
      cronBody: {},
    })

    ctx.status = 201
    ctx.body = 'Cron created'

    await next()
  } catch (e) {
    logger.error({
      middleware: 'CREATE-SCHEDULER',
      message: 'Error while creating cron',
      error: formatError(e),
      stackTrace: e
    })

    ctx.status = 500
  }
}

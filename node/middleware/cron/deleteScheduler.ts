import { PING_CRON } from "../../helpers/constants"
import { formatError } from "../../helpers/error"


export async function deleteScheduler(ctx: Context, next: () => Promise<any>) {
  const {
    clients: { scheduler },
    vtex: { logger },
  } = ctx

  try {
    logger.info({
      middleware: 'DELETE-SCHEDULERS',
      message: 'Deleting scheduler!',
    })

    await scheduler.deleteScheduler(PING_CRON.id)

    ctx.status = 200
    ctx.body = 'Cron deleted'

    await next()
  } catch (e) {
    logger.error({
      middleware: 'DELETE-SCHEDULERS',
      message: 'Error while deleting scheduler',
      error: formatError(e),
    })

    ctx.status = 500
  }
}

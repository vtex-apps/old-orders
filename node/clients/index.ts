import { IOClients } from '@vtex/api'

import SchedulerClient from './Scheduler'

// Extend the default IOClients implementation with our own custom clients.
export class Clients extends IOClients {
  public get scheduler() {
    return this.getOrSet('scheduler', SchedulerClient)
  }
}

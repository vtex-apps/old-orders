// import {getOldOrdersApi} from "./middleware/getOldOrdersApi";
import {ClientsConfig,  LRUCache, method, RecorderState, Service, ServiceContext} from "@vtex/api";
import { Clients } from "./clients";

// import { isAdminAuthenticated } from "./middleware/common/is-admin-authenticated";
// import { getSettingsValidationMiddleware } from "./middleware/common/validateSettingsMiddleware";
import { createScheduler, deleteScheduler, handlePingCron } from "./middleware/cron";
import { getOldOrdersApi } from "./middleware/getOldOrdersApi";


const TIMEOUT_MS = 800;

// Create a LRU memory cache for the Status client.
// The @vtex/api HttpClient respects Cache-Control headers and uses the provided cache.
const memoryCache = new LRUCache<string, any>({ max: 5000 });

// This is the configuration for clients available in `ctx.clients`.
const clients: ClientsConfig<Clients> = {
  // We pass our custom implementation of the clients bag, containing the Status client.
  implementation: Clients,
  options: {
    // All IO Clients will be initialized with these options, unless otherwise specified.
    default: {
      retries: 2,
      timeout: TIMEOUT_MS,
    },
    // This key will be merged with the default options and add this cache to our Status client.
    status: {
      memoryCache,
    },
  },
};
declare global {
  interface State<Payload> extends RecorderState {
    payload: Payload
  }

  type Context<Payload = unknown> = ServiceContext<Clients, State<Payload>>
}

export default new Service({
  clients,
  routes: {
    oldOrders: method({
      GET: [getOldOrdersApi],
    }),
    cron: method({
      GET: [handlePingCron],
      POST: [
        createScheduler,
      ],
      DELETE: [
        deleteScheduler,
      ],
    }),
  }
})

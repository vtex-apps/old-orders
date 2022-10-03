import {
  formatRequestError,
  getOldOrders,
  getOldOrdersSchemaV2,
  getSettings
} from "../helpers/helper";

export async function getOldOrdersApi(ctx: any) {
  const atob = (tkn: string) => Buffer.from(tkn, 'base64').toString('binary')
  const parseJwt = (token: string) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  };
  try {
    const parsedToken = parseJwt(ctx.vtex.storeUserAuthToken)
    const email = parsedToken.sub
    if (!email) {
      throw new Error('No email for the current user is defined');
    }

    const settings = await getSettings(ctx);
    const { fields = [], urlFields = []} = settings;

    const schemaData = (await getOldOrdersSchemaV2(ctx, settings))
      ?.find((schema: any) => schema.name === settings.schemaName);

    const { schema: { properties } } = schemaData;

    const orders = await getOldOrders(ctx, settings, email, properties);

    const schemaFromDataEntity = fields.filter((key: string) => key in properties)
    .reduce((oldObject: any, key: string) => ({
        ...oldObject,
        [key]: properties[key]
    }), {});

    const enhancedUrlFields = urlFields.reduce((oldObject: any, field: any) => {
      return {
        ...oldObject,
        [field.name]: {
          type: "url",
          title: field.title,
        }
      }
    }, {});

    ctx.response.body = {
      orders,
      schema: {
        ...schemaFromDataEntity,
        ...enhancedUrlFields,
      }
    };
    ctx.response.status = 200;
  } catch (e) {
    ctx.response.status = 500;
    ctx.response.body = formatRequestError(e);
  }

  return ctx.response.body
}


import serve, { HandlerReturn, response } from '@aexol/syncano-middleware';
import validate, { validators, ValidationResult, validateByEndpointName } from '@aexol/syncano-middleware-validate';
import Server, { Context, RequestArgs } from '@syncano/core';
import get from 'lodash.get';
import { newApi } from './utils';

export async function endpoint(ctx: Context,
                                syncano: Server): Promise<HandlerReturn> {
  return campaigns(ctx, syncano).then(o => response.success(o))
}

interface OrgAuthInfo {
  orgId: number;
  pem: string;
  key: string;
}
export async function validateCampaigns(
  ctx: Context,
  args: RequestArgs): Promise<ValidationResult> {
  return validateByEndpointName(args, ctx, 'apple-search-ads/campaigns')
}

export async function campaigns(ctx: Context,
                                syncano: Server): Promise<object> {
  const args = ctx.args || {}
  const api = await newApi(ctx, syncano);
  const meth = get(ctx, 'meta.request.REQUEST_METHOD', 'POST')
  if(meth === 'GET') {
    return api.campaigns.get()
  }
  return api.campaigns.post(args)
}

export default (ctx: Context) => serve(ctx, validate(endpoint))
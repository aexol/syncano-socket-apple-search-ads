import serve, { HandlerReturn, response } from '@aexol/syncano-middleware';
import validate from '@aexol/syncano-middleware-validate';
import Server, { Context, RequestArgs } from '@syncano/core';
import get from 'lodash.get';
import { newApi } from './utils';
import Api from '@aexol/searchads-js';

export async function endpoint(ctx: Context,
                                syncano: Server): Promise<HandlerReturn> {
  return campaigns(ctx, syncano).then(o => response.success(o))
}

interface OrgAuthInfo {
  orgId: number;
  pem: string;
  key: string;
}

/**
 * @function
 * @memberof apple-search-ads
 * @name apple-search-ads/campaigns
 * @variation GET
 * @description List all campaigns in this orgId.
 * @summary List campaigns.
 */
export function campaignsGet(api: Api, args: RequestArgs) {
    return api.campaigns.get()
}

/**
 * @function
 * @name apple-search-ads/campaigns
 * @variation POST
 * @param {string} name - New name.
 * @param {Object} budgetAmount Budget amount. Can only be increased.
 * @param {Object} dailyBudgetAmount Daily budget cap.
 * @param {number} adamId Application adamId.
 * @param {enum} status Campaign status. ENABLED|PAUSED.
 * @param {Array} negativeKeywords Negative keywords.
 * @param {Array} adGroups New adGroups
 * @param {enum} storefront 
 * @description Create new campaign. See [SearchAds API Campaign Object](https://developer.apple.com/library/content/documentation/General/Conceptual/AppStoreSearchAdsAPIReference/Campaign_Resources.html#//apple_ref/doc/uid/TP40017495-CH14-SW2) for more details
 * @summary Create campaign.
 * 
 */
export function campaignsPost(api: Api, args: RequestArgs) {
  return api.campaigns.post(args)
}

export async function campaigns(ctx: Context,
                                syncano: Server): Promise<object> {
  const args = ctx.args || {}
  const api = await newApi(ctx, syncano);
  const meth = get(ctx, 'meta.request.REQUEST_METHOD', 'POST')
  return meth === 'GET' ? campaignsGet(api, args) : campaignsPost(api, args)
}

export default (ctx: Context) => serve(ctx, validate(endpoint))
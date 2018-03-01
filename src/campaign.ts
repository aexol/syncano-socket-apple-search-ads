import serve, { response } from '@aexol/syncano-middleware';
import validate from '@aexol/syncano-middleware-validate';
import {toNumber} from '@aexol/syncano-middleware-common';
import Server, { Context } from '@syncano/core';
import get from 'lodash.get';
import { newApi } from './utils';
import Api from '@aexol/searchads-js';

/**
 * @function
 * @memberof apple-search-ads
 * @name apple-search-ads/campaign
 * @variation GET
 * @param {number} campaignId Campaign id in SearchAds.
 * @description Return details about campaign matching campaignId.
 * @summary Get campaign.
 */
export function campaignGet(api: Api, campaignId: any, args: any) {
  return api
        .campaigns[campaignId]
        .get()
        .then((p: any) => response.success(p))
}

/**
 * @function
 * @name apple-search-ads/campaign
 * @variation POST
 * @param {number} campaignId Campaign id.
 * @param {string} name - New name.
 * @param {Object} budgetAmount Update budget amount. Can only be increased.
 * @param {Object} dailyBudgetAmount Update daily budget cap.
 * @param {number} adamId Application adamId.
 * @param {enum} status Update campaign status. ENABLED|PAUSED.
 * @param {Array} negativeKeywords Negative keywords.
 * @param {Array} adGroups New adGroups
 * @param {enum} storefront 
 * @description Update campaign matching campaignId. See [SearchAds API Campaign Object](https://developer.apple.com/library/content/documentation/General/Conceptual/AppStoreSearchAdsAPIReference/Campaign_Resources.html#//apple_ref/doc/uid/TP40017495-CH14-SW2) for more details
 * @summary Update campaign.
 * 
 */
export function campaignPost(api: Api, campaignId: any, args: any): any {
  return response.success({})
  //return api
  //      .campaigns[campaignId]
  //      .put(args)
  //      .then((p: any) => response.success(p))
}

async function campaigns(ctx: Context,
                                syncano: Server) {
  const args = ctx.args || {}
  const api = await newApi(ctx, syncano);
  const meth = get(ctx, 'meta.request.REQUEST_METHOD', 'POST')
  const {campaignId} = args;
  delete args.campaignId;
  return meth === 'GET' ?
    campaignGet(api, campaignId, args) : campaignPost(api, campaignId, args)
}

export default (ctx: Context) => serve(
  ctx, toNumber(
    validate(
      campaigns
    ),
    ['campaignId']
  )
)
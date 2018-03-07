import serve, { cleanExit, HandlerReturn, response } from '@aexol/syncano-middleware';
import validate  from '@aexol/syncano-middleware-validate';
import {toNumber} from '@aexol/syncano-middleware-common';
import Server, { Context, RequestArgs } from '@syncano/core';
import get from 'lodash.get';
import { newApi } from './utils';
import Api from '@aexol/searchads-js';

/**
 * @function
 * @memberof apple-search-ads
 * @name apple-search-ads/adgroups
 * @variation GET
 * @description List all adgroups in campaign.
 * @summary List adgroups.
 */
export function adgroupsGet(api: Api, campaignId: number, args: RequestArgs) {
    return api.campaigns[campaignId].adgroups.get()
}

/**
 * @function
 * @name apple-search-ads/adgroups
 * @variation POST
 * @param {number} campaignId Campaign ID queried
 * @param {string} name - New name.
 * @param {Object} defaultCpcBid Default cost per click bid
 * @param {Object} cpaGoal Optional cost per click bid.
 * @param {Array} storefronts Storefronts
 * @param {datetime} startTime Start date for the ad group.
 * @param {datetime} endTime End date for the ad group.
 * @param {Array} keywords  Targeted keywords
 * @param {Array} negativeKeywords Negative keywords.
 * @param {boolean} automatedKeywordsOptIn
 * @param {Object} targetingDimenstions Targeting dimenstions.
 * @param {enum} status Adgroup status
 * @description Create new adgroup. See [SearchAds API AdGroup Object](https://developer.apple.com/library/content/documentation/General/Conceptual/AppStoreSearchAdsAPIReference/Campaign_Resources.html#//apple_ref/doc/uid/TP40017495-CH14-SW5) for more details
 * @summary Create adgroup.
 * 
 */
export function adgroupsPost(api: Api, campaignId: number, args: RequestArgs) {
  return api.campaigns[campaignId].adgroups.post(args)
}

async function adgroups(ctx: Context,
                                syncano: Server) {
  const args = ctx.args || {}
  const {campaignId = 0} = args
  delete args.campaignId
  const api = await newApi(ctx, syncano);
  const meth = get(ctx, 'meta.request.REQUEST_METHOD', 'POST')
  return (
    meth === 'GET' ?
      adgroupsGet(api, campaignId, args) :
      adgroupsPost(api, campaignId, args)
  ).then((r: any) => response.success(r))
}

export default (ctx: Context) => 
serve(
  ctx, cleanExit(
    toNumber(
      validate(
        adgroups
      ),
      ['campaignId']
    )
  )
)
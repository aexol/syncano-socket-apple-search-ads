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
 * @name apple-search-ads/adgroup
 * @variation GET
 * @param {number} campaignId Campaign id in SearchAds.
 * @param {number} adgroupId AdGroup id in SearchAds.
 * @description Return details about adgroup matching campaignId and adgroupid.
 * @summary Get adgroup
 */
export function adgroupGet(api: Api,
                            campaignId: any,
                            adgroupId: any,
                            args: any) {
  return api
        .campaigns[campaignId]
        .adgroups[adgroupId]
        .get()
        .then((p: any) => response.success(p))
}

/**
 * @function
 * @name apple-search-ads/adgroup
 * @variation POST
 * @param {number} campaignId Campaign id.
 * @param {number} adgroupId Adgroup id.
 * @param {string} name - New name. Unique within campaign
 * @param {AmountObject} defaultCpcBid - Default Cost Per Click bid.
 * @param {date-time} startTime - Adgroup start time.
 * @param {boolean} automatedKeywordsOptIn -Indicates whether search match has been enabled.
 * @param {TargetingDimensions} targetingDimenstions - Targeting dimensions
 * @param {enum} status - ENABLED/PAUSED
 * @description Update adgroups matching campaignId and adgroupId. See [SearchAds API AdGroup Object](https://developer.apple.com/library/content/documentation/General/Conceptual/AppStoreSearchAdsAPIReference/Campaign_Resources.html#//apple_ref/doc/uid/TP40017495-CH14-SW5) for more details
 * @summary Update adgroup.
 * 
 */
export function adgroupPost(api: Api,
                            campaignId: any,
                            adgroupId: any,
                            args: any): any {
  return api
        .campaigns[campaignId]
        .adgroups[adgroupId]
        .put(args)
        .then((p: any) => response.success(p))
}

async function campaigns(ctx: Context,
                                syncano: Server) {
  const args = ctx.args || {}
  const api = await newApi(ctx, syncano);
  const meth = get(ctx, 'meta.request.REQUEST_METHOD', 'POST')
  const {campaignId, adgroupId} = args;
  delete args.campaignId;
  delete args.adgroupId;
  return (meth === 'GET' ? adgroupGet : adgroupPost)
              (api, campaignId, adgroupId, args)
}

export default (ctx: Context) => serve(
  ctx, toNumber(
    validate(
      campaigns
    ),
    ['campaignId', 'adgroupId']
  )
)
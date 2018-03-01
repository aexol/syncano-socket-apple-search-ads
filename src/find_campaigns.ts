import serve, { response } from '@aexol/syncano-middleware';
import validate from '@aexol/syncano-middleware-validate';
import Server, { Context } from '@syncano/core';
import { newApi } from './utils';
import Api from '@aexol/searchads-js';

/**
 * @function
 * @name apple-search-ads/find-campaign
 * @memberof apple-search-ads
 * @variation POST
 * @param {Array} conditions Find conditions. Optional.
 * @param {array} fields  Limit returned fields. Optional.
 * @param {Object} orderBy Sort results.
 * @param {Object} pagination Results pagination.
 * @description Find campaigns in org. See [SearchAds API Selector](https://developer.apple.com/library/content/documentation/General/Conceptual/AppStoreSearchAdsAPIReference/API_Overview.html#//apple_ref/doc/uid/TP40017495-CH7-SW11) for more details
 * @summary Find campaigns.
 * 
 */
async function findCampaigns(ctx: Context, syncano: Server) {
  const api = await newApi(ctx, syncano);
  return api
        .campaigns
        .find
        .post(ctx.args)
        .then((r: any) => response.success(r))
}
export default (ctx: Context) => serve(ctx,
  validate(
    findCampaigns
  )
)
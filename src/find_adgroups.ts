import serve, { response } from '@aexol/syncano-middleware';
import validate from '@aexol/syncano-middleware-validate';
import Server, { Context } from '@syncano/core';
import { newApi } from './utils';
import Api from '@aexol/searchads-js';

/**
 * @function
 * @name apple-search-ads/find-adgroups
 * @memberof apple-search-ads
 * @variation POST
 * @param {number} campaignID Campaign id being searched.
 * @param {Array} conditions Find conditions. Optional.
 * @param {array} fields  Limit returned fields. Optional.
 * @param {Object} orderBy Sort results.
 * @param {Object} pagination Results pagination.
 * @description Find adgroups in campaign. See [SearchAds API Selector](https://developer.apple.com/library/content/documentation/General/Conceptual/AppStoreSearchAdsAPIReference/API_Overview.html#//apple_ref/doc/uid/TP40017495-CH7-SW11) for more details
 * @summary Find adgroups.
 * 
 */
async function findAdgroups(ctx: Context, syncano: Server) {
  const args = ctx.args || {}
  const {campaignId = undefined} = args
  delete args.campaignId
  const api = await newApi(ctx, syncano);
  return api
        .campaigns[campaignId]
        .adgroups
        .find
        .post(ctx.args)
        .then((r: any) => response.success(r))
}
export default (ctx: Context) =>  
serve(ctx,
  validate(
    findAdgroups
  )
)
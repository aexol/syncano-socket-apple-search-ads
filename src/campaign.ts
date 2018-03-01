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
 * @param campaignId 
 * @param args 
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
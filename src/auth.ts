import serve, {cleanExit, response} from '@aexol/syncano-middleware';
import Server, { Context } from '@syncano/core';
import get from 'lodash.get'
import { fetchAuth } from './utils';

/**
 * @function
 * @memberof apple-search-ads
 * @name apple-search-ads/auth
 * @description  If socket is configured to expose auth, this endpoint can be
 * called with Account Key or from another socket to access SearchAds auth
 * details.
 * @summary Get SearchAds auth info.
 */
async function auth(ctx: Context, syncano: Server) {
  const expose = get(ctx, 'config.expose')
  if(expose === true || expose === 'true') {
    return fetchAuth(ctx, syncano).then(auth => response.success(auth))
  }
  return response.forbidden({})
}

export default (ctx: Context) => serve(ctx, cleanExit(auth));
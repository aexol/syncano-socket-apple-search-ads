import serve, {cleanExit, response} from '@aexol/syncano-middleware';
import Server, { Context } from '@syncano/core';
import get from 'lodash.get'
import { fetchAuth } from './utils';

async function auth(ctx: Context, syncano: Server) {
  const expose = get(ctx, 'config.expose')
  if(expose === true || expose === 'true') {
    return fetchAuth(ctx, syncano).then(auth => response.success(auth))
  }
  return response.forbidden({})
}

export default (ctx: Context) => serve(ctx, cleanExit(auth));
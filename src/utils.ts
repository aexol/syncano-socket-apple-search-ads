import Server, { Context } from "@syncano/core";
import nodeFetch from 'node-fetch'
import Api from '@aexol/searchads-js'

export async function fetchAuth(ctx: Context, syncano: Server) {
  return ctx.config as {pem: string, key: string, orgId: number}
}

export async function newApi(ctx: Context, syncano: Server) {
  const {pem, key, orgId} = await fetchAuth(ctx, syncano)
  return new Api({pem, key, orgId})
}
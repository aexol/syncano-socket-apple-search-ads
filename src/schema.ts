import {readFileSync, readdirSync} from 'fs';
import {safeLoad} from 'js-yaml';
import Server, { Context } from '@syncano/core';

export default (ctx: Context) => {
  return new Server(ctx)
    .response
    .json(safeLoad(readFileSync('/app/code/schema.yml').toString()))
}
import 'hard-rejection/register';

import fs from 'fs';
import Koa from 'koa';
import koaLogger from 'koa-logger';
import koaCors from '@koa/cors';
import koaRoute from 'koa-route';

const PORT = process.env.PORT || 3000;

export const app = new Koa();

if (process.env.NODE_ENV !== 'test') {
  app.use(koaLogger());
}

app.use(
  koaRoute.get('/', ctx => {
    ctx.body = 'Hello, world!';
  })
);
app.use(koaCors);

if (require.main === module) {
  app.listen(PORT);
}

import 'hard-rejection/register';

import fs from 'fs';
import path from 'path';
import loader from 'assemblyscript/lib/loader';
import Koa from 'koa';
import koaLogger from 'koa-logger';
import koaCors from '@koa/cors';
import koaRoute from 'koa-route';

const PORT = process.env.PORT || 3000;

export const getServer = async () => {
  const app = new Koa();

  const instance = loader.instantiate<{ hello: () => number }>(
    new WebAssembly.Module(
      fs.readFileSync(path.resolve(__dirname, '../build/optimized.wasm'))
    ),
    { env: {} }
  );

  if (process.env.NODE_ENV !== 'test') {
    app.use(koaLogger());
  }

  app.use(
    koaRoute.get('/', ctx => {
      ctx.body = instance.__getString(instance.hello());
    })
  );
  app.use(koaCors);

  return app;
};

if (require.main === module) {
  (async () => {
    const app = await getServer();
    app.listen(PORT);
  })();
}

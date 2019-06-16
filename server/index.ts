import 'hard-rejection/register';

import fs from 'fs';
import path from 'path';
import loader from 'assemblyscript/lib/loader';
import Koa from 'koa';
import koaLogger from 'koa-logger';
import koaCors from '@koa/cors';

const PORT = process.env.PORT || 3000;

const myModule = new WebAssembly.Module(
  fs.readFileSync(path.resolve(__dirname, '../build/optimized.wasm'))
);

export const app = new Koa();

if (process.env.NODE_ENV !== 'test') {
  app.use(koaLogger());
}

app.use(ctx => {
  const instance = loader.instantiate<any>(myModule, { env: {} });
  const method = instance.__retain(instance.__allocString(ctx.request.method));
  const url = instance.__retain(instance.__allocString(ctx.request.url));
  const req = new instance.Request(method, url);

  ctx.body = instance.__getString(instance.template(req));

  instance.__release(method);
  instance.__release(url);
});

app.use(koaCors);

if (require.main === module) {
  app.listen(PORT);
}

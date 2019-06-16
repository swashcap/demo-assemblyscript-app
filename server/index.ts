import 'hard-rejection/register';

import fs from 'fs';
import path from 'path';
import loader from 'assemblyscript/lib/loader';
import Koa from 'koa';
import koaLogger from 'koa-logger';
import koaCors from '@koa/cors';
import koaRoute from 'koa-route';

const PORT = process.env.PORT || 3000;

interface MyModule {
  template: (title: number) => number;
}

const myModule = new WebAssembly.Module(
  fs.readFileSync(path.resolve(__dirname, '../build/optimized.wasm'))
);

export const app = new Koa();

if (process.env.NODE_ENV !== 'test') {
  app.use(koaLogger());
}

app.use(
  koaRoute.get('/', ctx => {
    const instance = loader.instantiate<MyModule>(myModule, { env: {} });
    const title = instance.__retain(instance.__allocString('Hello, World!'));

    ctx.body = instance.__getString(instance.template(title));

    instance.__release(title);
  })
);

app.use(koaCors);

if (require.main === module) {
  app.listen(PORT);
}

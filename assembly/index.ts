export class Request {
  constructor(public method: string, public url: string) {}
}

export function template(request: Request): String {
  return (
    '<!doctype html>\n' +
    '<html>\n' +
    '  <head>\n' +
    '    <meta charset="utf-8">\n' +
    '    <title>Hello, World!</title>\n' +
    '    <meta name="viewport" content="width=device-width, initial-scale=1">\n' +
    '  </head>\n' +
    '  <body>\n' +
    '    <h1>' +
    request.method +
    ': ' +
    request.url +
    '</h1>\n' +
    '  </body>\n' +
    '</html>'
  );
}

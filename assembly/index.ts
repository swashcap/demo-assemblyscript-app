export function template(title: String): String {
  return (
    '<!doctype html>\n' +
    '<html>\n' +
    '  <head>\n' +
    '    <meta charset="utf-8">\n' +
    '    <title>' +
    title +
    '</title>\n' +
    '    <meta name="viewport" content="width=device-width, initial-scale=1">\n' +
    '  </head>\n' +
    '  <body>\n' +
    '    <h1>' +
    title +
    '</h1>\n' +
    '  </body>\n' +
    '</html>'
  );
}

import serveIndex from 'serve-index';

export default function (path) {
  return serveIndex(path, {
    icons: true,
    hidden: true,
    stylesheet: `${__dirname}/main.css`,
    filter: (file) => file !== '.DS_Store',
  });
}

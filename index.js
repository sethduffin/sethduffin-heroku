import 'dotenv/config';
import express from 'express';
import vhost from 'vhost';

import serveIndex from './serve-index';

const port = process.env.PORT || 5000;
const domain = process.env.DOMAIN || 'localhost';
const root = `${__dirname}/public/`;

const subdomains = ['sandbox', 'dgm2120'];

const app = express();

subdomains.forEach((sub) => {
  const router = express.Router();
  router.use(express.static(`${root}/${sub}`));
  router.use(serveIndex(`${root}/${sub}`));
  app.use(vhost(`${sub}.${domain}`, router));
});

app.use(express.static(root));
app.use(serveIndex(root));

app.listen({ port }, () => {
  console.log(`Server on http://localhost:${port}`);
});

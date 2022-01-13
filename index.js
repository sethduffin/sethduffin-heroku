import 'dotenv/config';
import express from 'express';
import vhost from 'vhost';

import serveIndex from './serve-index';

const port = process.env.PORT || 5000;
const domain = process.env.DOMAIN || 'localhost';
const root = `${__dirname}/`;

const app = express();

/**
 * New subdomains must also be added to the Namecheap control pannel:
 * https://ap.www.namecheap.com/Domains/DomainControlPanel/sethduffin.com/advancedns
 */
const subdomains = {
  // sandbox: 'public/sandbox',
  // dgm2120: 'public/dgm2120',
  dev: 'public/dev',
};

Object.items(subdomains).forEach(([sub, path]) => {
  const router = express.Router();
  router.use(express.static(`${root}/${path}`));
  router.use(serveIndex(`${root}/${path}`));
  app.use(vhost(`${sub}.${domain}`, router));
});

app.use(express.static(root));
app.use(serveIndex(root));

app.listen({ port }, () => {
  console.log(`Server on http://localhost:${port}`);
});

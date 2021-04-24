import axios from 'axios';
import { parse } from 'node-html-parser';
import { decode } from 'html-entities';
import fs from 'fs';

const productResolvers = {
  'www.nike.com': {
    brand: 'nike',
    image: (document) =>
      document.querySelector('#pdp-6-up img[data-fade-in]').getAttribute('src'),
    name: (document) => document.querySelector('#pdp_product_title').innerHTML,
    price: (document) => document.querySelector('.product-price').innerHTML,
  },
};

const inputPath = process.argv[2];
const outputPath = process.argv[3];

const inputFile = fs.readFileSync(inputPath, 'utf-8');

async function run() {
  const urls = inputFile.split('\n');
  const products = await Promise.all(
    urls.map(async (url, index) => {
      const domain = url.split('/')[2];

      const resolvers =
        productResolvers[domain] ||
        console.warn(`No product resolver for: ${domain}`);
      const html = await axios
        .get(url)
        .then((response) => response.data)
        .catch(() => null);
      const ok = Boolean(resolvers && html);

      const data = {
        id: index + 1,
        url,
        ok,
      };

      if (ok) {
        const document = parse(html);
        Object.entries(resolvers).forEach(([prop, resolver]) => {
          if (typeof resolver === 'function') {
            data[prop] = decode(resolver(document));
          } else {
            data[prop] = resolver;
          }
        });
      }
      return data;
    }),
  );

  fs.writeFileSync(outputPath, JSON.stringify(products));
}

if (inputFile) {
  run();
}

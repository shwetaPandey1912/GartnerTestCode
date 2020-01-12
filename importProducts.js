const origin = process.argv[2];
const route = process.argv[3];
const sessionsProducts = [];


switch (origin) {
case 'capterra':
  pushCapterra(sessionsProducts);
  break;
case 'softwareAdvice':
  pushSA(sessionsProducts);
  break;
default:
  console.log('\x1b[31m%s\x1b[0m', `Unknown origin ${origin}`); 
}

const existingProducts = {
  Freshdesk: {
    'categories': [
      'Customer Service',
      'Call Center'
    ],
    'twitter': 'freshdesk',
    'name': 'Freshdesk'
  }
};

function pushCapterra(arr) {
  const capterraController = require('./app/capterra');
  const products = capterraController.getAllNormalized(route);
  arr.push(...products);
  return arr;
}

function pushSA(arr) {
  const sAController = require('./app/softwareAdvice');
  const products = sAController.getAllNormalized(route);
  arr.push(...products);
  return arr;
}

importProducts(sessionsProducts)
  .then(() => {
   
    console.log('\x1b[36m%s\x1b[0m', `existingProducts ${JSON.stringify(existingProducts, 1, 1)}`); 
  });

function productExists(product, products = existingProducts) {
  return !!products[product.name]; 
}

async function importProducts(products) {
  for (const product of products) {
    if (!productExists(product)) {
      await addProduct(product);
      console.log('\x1b[32m%s\x1b[0m', `Importing: Name: "${product.name}"${product.categories ? '; Categories: ' + product.categories : ''}${product.twitter ? '; Twitter: @' + product.twitter : ''}`); 
    } else {
      console.log('\x1b[33m%s\x1b[0m', `Skipping: Name: "${product.name}"`); 
    }
  }
  return true;
}

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function addProduct(product, products = existingProducts) {
 
  products[product.name] = product;
   
  await timeout(500);
  return products;
}


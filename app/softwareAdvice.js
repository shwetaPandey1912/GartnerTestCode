'use strict';

function loadData(url) {
  return require('../' + url).products;
}
exports.loadData = loadData;



function normalizeData(product) {
  const normalizedProduct = {
    name: product.title.replace(/(^|\s)\S/g, l => l.toUpperCase()),
    categories: product.categories || '?',
    twitter: (product.twitter || '').substr(1)
  };
  return normalizedProduct;
}
exports.normalizeData = normalizeData;

function getAllNormalized(url) {
  const products = loadData(url);
  const normalizedProducts = products.map(normalizeData);
  return normalizedProducts;
}
exports.getAllNormalized = getAllNormalized;

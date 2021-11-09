const express = require('express');
const app = express();
const axios = require('axios');
const configs = require('./configs');
const cache = require('./cache');

app.get(configs.DEFAULT_API_ROUTE, (req, res) => {
  res.send(
    `You currently triggered this route: ${configs.DEFAULT_API_ROUTE}. 
    To check out caching, trigger this route twice and compare the 
    performance of the 2 calls: ${configs.CACHING_API_ROUTE}`
  );
});

app.get(configs.CACHING_API_ROUTE, (req, res) => {
  const cacheKey = 'COVID_DATA';
  const publicApiEndpoint = 'https://corona.lmao.ninja/v2/jhucsse';

  cache
    .getOrSetCache(cacheKey, () => axios.get(publicApiEndpoint))
    .then(result => res.json(result));
});

app.listen(configs.PORT, () => {
  console.log(`Example app listening at http://localhost:${configs.PORT}`);
});

var Advertiser = require("./../models/advertiser");

module.exports = {
  create: function(query) {
    return new Promise(function(resolve, reject) {
      Advertiser.create(query)
      .then(function(res) {
        if (res) console.log({ query }, "Creates Advertiser");
        return resolve(res);
      })
      .catch(function(error) {
        return reject(error);
      });
    });
  }
}

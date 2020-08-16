var Campaign = require("./../models/campaign");

module.exports = {
  create: function(query) {
    return new Promise(function(resolve, reject) {
      Campaign.create(query)
      .then(function(res) {
        if (res) console.log({ query }, "Creates Campaign");
        return resolve(res);
      })
      .catch(function(error) {
        return reject(error);
      });
    });
  }
}

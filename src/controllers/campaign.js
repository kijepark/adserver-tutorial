var Campaign = require("./../models/campaign");

module.exports = {
  list: function(query) {
    return new Promise(function(resolve, reject) {
      Campaign.find(query)
      .then(function(res) {
        if (res) console.log({ query }, "Lists Campaigns");
        return resolve(res);
      })
      .catch(function(error) {
        return reject(error);
      });
    });
  },
  retrieve: function(query) {
    return new Promise(function(resolve, reject) {
      Campaign.findOne(query).lean().exec()
      .then(function(res) {
        if (res) console.log({ query }, "Retrieves Campaign");
        return resolve(res);
      })
      .catch(function(error) {
        return reject(error);
      });
    });
  },
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

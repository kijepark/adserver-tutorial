var AdItem = require("./../models/adItem");

module.exports = {
  list: function(query) {
    return new Promise(function(resolve, reject) {
      AdItem.find(query)
      .then(function(res) {
        if (res) console.log({ query }, "Lists AdItems");
        return resolve(res);
      })
      .catch(function(error) {
        return reject(error);
      });
    });
  },
  retrieve: function(query) {
    return new Promise(function(resolve, reject) {
      AdItem.findOne(query)
      .then(function(res) {
        if (res) console.log({ query }, "Retrieves AdItem");
        return resolve(res);
      })
      .catch(function(error) {
        return reject(error);
      });
    });
  },
  create: function(query) {
    return new Promise(function(resolve, reject) {
      AdItem.create(query)
      .then(function(res) {
        if (res) console.log({ query }, "Creates AdItem");
        return resolve(res);
      })
      .catch(function(error) {
        return reject(error);
      });
    });
  }
}

var Zone = require("./../models/zone");

module.exports = {
  list: function(query) {
    return new Promise(function(resolve, reject) {
      Zone.find(query)
      .then(function(res) {
        if (res) console.log({ query }, "Lists Zones");
        return resolve(res);
      })
      .catch(function(error) {
        return reject(error);
      });
    });
  },
  retrieve: function(query) {
    return new Promise(function(resolve, reject) {
      Zone.findOne(query).lean().exec()
      .then(function(res) {
        if (res) console.log({ query }, "Retrieves Zone");
        return resolve(res);
      })
      .catch(function(error) {
        return reject(error);
      });
    });
  },
  create: function(query) {
    return new Promise(function(resolve, reject) {
      Zone.create(query)
      .then(function(res) {
        if (res) console.log({ query }, "Creates Zone");
        return resolve(res);
      })
      .catch(function(error) {
        return reject(error);
      });
    });
  }
}

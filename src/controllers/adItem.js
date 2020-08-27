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
      AdItem.findOne(query).lean().exec()
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
  },
  delete: function(query) {
    return new Promise(function(resolve, reject) {
      AdItem.deleteMany(query)
      .then(res => {
        if (res.deletedCount) console.log({ query }, "Deletes AdItem");
        return resolve(res);
      })
      .catch(error => reject(error));
    });
  }
}

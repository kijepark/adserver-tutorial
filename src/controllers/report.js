var Report = require("./../models/report");

module.exports = {
  list: function(query) {
    return new Promise(function(resolve, reject) {
      Report.find(query)
      .then(function(res) {
        if (res) console.log({ query }, "Lists Reports");
        return resolve(res);
      })
      .catch(function(error) {
        return reject(error);
      });
    });
  },
  retrieve: function(query) {
    return new Promise(function(resolve, reject) {
      Report.findOne(query)
      .then(function(res) {
        if (res) console.log({ query }, "Retrieves Report");
        return resolve(res);
      })
      .catch(function(error) {
        return reject(error);
      });
    });
  },
  create: function(query) {
    return new Promise(function(resolve, reject) {
      Report.create(query)
      .then(function(res) {
        if (res) console.log({ query }, "Creates Report");
        return resolve(res);
      })
      .catch(function(error) {
        return reject(error);
      });
    });
  },
  update: function(query, document) {
    return new Promise(function(resolve, reject) {
      Report.findOneAndUpdate(query, document)
      .then(function(res) {
        if (res) console.log({ query }, "Updates Report");
        return resolve(res);
      })
      .catch(function(error) {
        return reject(error);
      });
    });
  }
}

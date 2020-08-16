var Placement = require("./../models/placement");

module.exports = {
  list: function(query) {
    return new Promise(function(resolve, reject) {
      Placement.find(query).lean().exec()
      .then(function(res) {
        if (res) console.log({ query }, "Lists Placements");
        return resolve(res);
      })
      .catch(function(error) {
        return reject(error);
      });
    });
  },  
  create: function(query) {
    return new Promise(function(resolve, reject) {
      Placement.create(query)
      .then(function(res) {
        if (res) console.log({ query }, "Creates Placement");
        return resolve(res);
      })
      .catch(function(error) {
        return reject(error);
      });
    });
  }
}

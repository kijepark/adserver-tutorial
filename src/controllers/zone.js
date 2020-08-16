var Zone = require("./../models/zone");

module.exports = {
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

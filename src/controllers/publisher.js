var Publisher = require("./../models/publisher");

module.exports = {
  create: function(query) {
    return new Promise(function(resolve, reject) {
      Publisher.create(query)
      .then(function(res) {
        if (res) console.log({ query }, "Creates Publisher");
        return resolve(res);
      })
      .catch(function(error) {
        return reject(error);
      });
    });
  }
}

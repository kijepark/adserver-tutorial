var Zone = require("./../models/zone");

module.exports = {
  list: function(query) {
    return new Promise(function(resolve, reject) {
      Zone.find(query).lean().exec()
      .then(function(res) {
        if (res) console.log({ query }, "Lists Zones");
        return resolve(res);
      })
      .catch(function(error) {
        return reject(error);
      });
    });
  },
  listAndPlacements: function(query) {
    return new Promise(function(resolve, reject) {
      Zone.aggregate([
        { $match: query },
        {
          $lookup: {
            from: "placements",
            localField: "id",
            foreignField: "zone.id",
            as: "placements"
          }
        }
      ])
      .then(function(res) {
        if (res) console.log({ query }, "Lists Zones and its Placements");
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
  },
  delete: function(query) {
    return new Promise(function(resolve, reject) {
      Zone.deleteMany(query)
      .then(res => {
        if (res.deletedCount) console.log({ query }, "Deletes Zone");
        return resolve(res);
      })
      .catch(error => reject(error));
    });
  }
}

var Advertiser = require("./../models/advertiser");

module.exports = {
  list: function(query) {
    return new Promise(function(resolve, reject) {
      Advertiser.find(query).lean().exec()
      .then(function(res) {
        if (res) console.log({ query }, "Lists Advertisers");
        return resolve(res);
      })
      .catch(function(error) {
        return reject(error);
      });
    });
  },
  listAndCampaigns: function(query) {
    return new Promise(function(resolve, reject) {
      Advertiser.aggregate([
        { $match: query },
        {
          $lookup: {
            from: "campaigns",
            localField: "id",
            foreignField: "advertiser",
            as: "campaigns"
          }
        }
      ])
      .then(function(res) {
        if (res) console.log({ query }, "Lists Advertisers and Campaigns");
        return resolve(res);
      })
      .catch(function(error) {
        return reject(error);
      });
    });
  },
  create: function(query) {
    return new Promise(function(resolve, reject) {
      Advertiser.create(query)
      .then(function(res) {
        if (res) console.log({ query }, "Creates Advertiser");
        return resolve(res);
      })
      .catch(function(error) {
        return reject(error);
      });
    });
  }
}

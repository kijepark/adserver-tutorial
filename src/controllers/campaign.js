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
  listAndCampaignAssignments: function(query) {
    return new Promise(function(resolve, reject) {
      Campaign.aggregate([
        { $match: query },
        {
          $lookup: {
            from: "campaign_assignments",
            localField: "id",
            foreignField: "campaign.id",
            as: "campaign_assignments"
          }
        }
      ])
      .then(function(res) {
        if (res) console.log({ query }, "Lists Campaigns and Its Assignments");
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

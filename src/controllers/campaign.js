import Campaign from "./../models/campaign";

export default {
  list: query => {
    return new Promise((resolve, reject) => {
      Campaign.find(query).lean().exec()
      .then(res => {
        if (res) console.log({ query }, "Lists Campaigns");
        return resolve(res);
      })
      .catch(error => reject(error));
    });
  },
  listAndCampaignAssignments: query => {
    return new Promise((resolve, reject) => {
      Campaign.aggregate([
        { $match: query },
        {
          $lookup: {
            from: "campaign_assignments",
            localField: "id",
            foreignField: "campaign.id",
            as: "campaign_assignments"
          }
        },
        {
          $lookup: {
            from: "placements",
            localField: "id",
            foreignField: "advertisement.id",
            as: "placements"
          }
        }
      ])
      .then(res => {
        if (res) console.log({ query }, "Lists Campaigns and Its Assignments");
        return resolve(res);
      })
      .catch(error => reject(error));
    });
  },
  retrieve: query => {
    return new Promise((resolve, reject) => {
      Campaign.findOne(query).lean().exec()
      .then(res => {
        if (res) console.log({ query }, "Retrieves Campaign");
        return resolve(res);
      })
      .catch(error => reject(error));
    });
  },
  create: query => {
    return new Promise((resolve, reject) => {
      Campaign.create(query)
      .then(res => {
        if (res) console.log({ query }, "Creates Campaign");
        return resolve(res);
      })
      .catch(error => reject(error));
    });
  },
  delete: query => {
    return new Promise((resolve, reject) => {
      Campaign.deleteMany(query)
      .then(res => {
        if (res.deletedCount) console.log({ query }, "Deletes Campaign");
        return resolve(res);
      })
      .catch(error => reject(error));
    });
  }
}

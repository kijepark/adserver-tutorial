import Advertiser from "./../models/advertiser";

export default {
  list: query => {
    return new Promise((resolve, reject) => {
      Advertiser.find(query).lean().exec()
      .then(res => {
        if (res) console.log({ query }, "Lists Advertisers");
        return resolve(res);
      })
      .catch(error => reject(error));
    });
  },
  listAndCampaigns: query => {
    return new Promise((resolve, reject) => {
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
      .then(res => {
        if (res) console.log({ query }, "Lists Advertisers and Campaigns");
        return resolve(res);
      })
      .catch(error => reject(error));
    });
  },
  retrieve: query => {
    return new Promise((resolve, reject) => {
      Advertiser.findOne(query).lean().exec()
      .then(res => {
        if (res) console.log({ query }, "Retrieves Advertiser");
        return resolve(res);
      })
      .catch(error => reject(error));
    });
  },
  create: query => {
    return new Promise((resolve, reject) => {
      Advertiser.create(query)
      .then(res => {
        if (res) console.log({ query }, "Creates Advertiser");
        return resolve(res);
      })
      .catch(error => reject(error));
    });
  },
  delete: query => {
    return new Promise((resolve, reject) => {
      Advertiser.deleteMany(query)
      .then(res => {
        if (res.deletedCount) console.log({ query }, "Deletes Advertiser");
        return resolve(res);
      })
      .catch(error => reject(error));
    });
  }
}

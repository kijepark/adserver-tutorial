import Publisher from "./../models/publisher";

export default {
  list: query => {
    return new Promise((resolve, reject) => {
      Publisher.find(query).lean().exec()
      .then(res => {
        if (res) console.log({ query }, "Lists Publishers");
        return resolve(res);
      })
      .catch(error => reject(error));
    });
  },
  listAndZones: query => {
    return new Promise((resolve, reject) => {
      Publisher.aggregate([
        { $match: query },
        {
          $lookup: {
            from: "zones",
            localField: "id",
            foreignField: "publisher",
            as: "zones"
          }
        }
      ])
      .then(res => {
        if (res) console.log({ query }, "Lists Publishers and Zones");
        return resolve(res);
      })
      .catch(error => reject(error));
    });
  },
  retrieve: query => {
    return new Promise((resolve, reject) => {
      Publisher.findOne(query).lean().exec()
      .then(res => {
        if (res) console.log({ query }, "Retrieves Publisher");
        return resolve(res);
      })
      .catch(error => reject(error));
    });
  },
  create: query => {
    return new Promise((resolve, reject) => {
      Publisher.create(query)
      .then(res => {
        if (res) console.log({ query }, "Creates Publisher");
        return resolve(res);
      })
      .catch(error => reject(error));
    });
  },
  delete: query => {
    return new Promise((resolve, reject) => {
      Publisher.deleteMany(query)
      .then(res => {
        if (res.deletedCount) console.log({ query }, "Deletes Publisher");
        return resolve(res);
      })
      .catch(error => reject(error));
    });
  }
}

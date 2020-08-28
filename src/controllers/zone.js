import Zone from "./../models/zone";

export default {
  list: query => {
    return new Promise((resolve, reject) => {
      Zone.find(query).lean().exec()
      .then(res => {
        if (res) console.log({ query }, "Lists Zones");
        return resolve(res);
      })
      .catch(error => reject(error));
    });
  },
  listAndPlacements: query => {
    return new Promise((resolve, reject) => {
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
      .then(res => {
        if (res) console.log({ query }, "Lists Zones and its Placements");
        return resolve(res);
      })
      .catch(error => reject(error));
    });
  },
  retrieve: query => {
    return new Promise((resolve, reject) => {
      Zone.findOne(query).lean().exec()
      .then(res => {
        if (res) console.log({ query }, "Retrieves Zone");
        return resolve(res);
      })
      .catch(error => reject(error));
    });
  },
  create: query => {
    return new Promise((resolve, reject) => {
      Zone.create(query)
      .then(res => {
        if (res) console.log({ query }, "Creates Zone");
        return resolve(res);
      })
      .catch(error => reject(error));
    });
  },
  delete: query => {
    return new Promise((resolve, reject) => {
      Zone.deleteMany(query)
      .then(res => {
        if (res.deletedCount) console.log({ query }, "Deletes Zone");
        return resolve(res);
      })
      .catch(error => reject(error));
    });
  }
}

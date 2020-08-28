import AdItem from "./../models/adItem";

export default {
  list: query => {
    return new Promise((resolve, reject) => {
      AdItem.find(query)
      .then(res => {
        if (res) console.log({ query }, "Lists AdItems");
        return resolve(res);
      })
      .catch(error => reject(error));
    });
  },
  retrieve: query => {
    return new Promise((resolve, reject) => {
      AdItem.findOne(query).lean().exec()
      .then(res => {
        if (res) console.log({ query }, "Retrieves AdItem");
        return resolve(res);
      })
      .catch(error => reject(error));
    });
  },
  create: query => {
    return new Promise((resolve, reject) => {
      AdItem.create(query)
      .then(res => {
        if (res) console.log({ query }, "Creates AdItem");
        return resolve(res);
      })
      .catch(error => reject(error));
    });
  },
  delete: query => {
    return new Promise((resolve, reject) => {
      AdItem.deleteMany(query)
      .then(res => {
        if (res.deletedCount) console.log({ query }, "Deletes AdItem");
        return resolve(res);
      })
      .catch(error => reject(error));
    });
  }
}

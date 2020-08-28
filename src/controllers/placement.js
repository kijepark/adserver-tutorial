import Placement from "./../models/placement";

export default {
  list: query => {
    return new Promise((resolve, reject) => {
      Placement.find(query).lean().exec()
      .then(res => {
        if (res) console.log({ query }, "Lists Placements");
        return resolve(res);
      })
      .catch(error => reject(error));
    });
  },  
  create: query => {
    return new Promise((resolve, reject) => {
      Placement.create(query)
      .then(res => {
        if (res) console.log({ query }, "Creates Placement");
        return resolve(res);
      })
      .catch(error => reject(error));
    });
  },
  delete: query => {
    return new Promise((resolve, reject) => {
      Placement.deleteMany(query)
      .then(res => {
        if (res.deletedCount) console.log({ query }, "Deletes Placement");
        return resolve(res);
      })
      .catch(error => reject(error));
    });
  }
}

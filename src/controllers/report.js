import Report from "./../models/report";

export default {
  list: query => {
    return new Promise((resolve, reject) => {
      Report.find(query)
      .then(res => {
        if (res) console.log({ query }, "Lists Reports");
        return resolve(res);
      })
      .catch(error => reject(error));
    });
  },
  retrieve: query => {
    return new Promise((resolve, reject) => {
      Report.findOne(query)
      .then(res => {
        if (res) console.log({ query }, "Retrieves Report");
        return resolve(res);
      })
      .catch(error => reject(error));
    });
  },
  create: query => {
    return new Promise((resolve, reject) => {
      Report.create(query)
      .then(res => {
        if (res) console.log({ query }, "Creates Report");
        return resolve(res);
      })
      .catch(error => reject(error));
    });
  },
  update: (query, document) => {
    return new Promise((resolve, reject) => {
      Report.findOneAndUpdate(query, document)
      .then(res => {
        if (res) console.log({ query }, "Updates Report");
        return resolve(res);
      })
      .catch(error => reject(error));
    });
  }
}

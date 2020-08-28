import CampaignAssignment from "./../models/campaignAssignment";

export default {
  list: query => {
    return new Promise((resolve, reject) => {
      CampaignAssignment.find(query)
      .then(res => {
        if (res) console.log({ query }, "Lists CampaignAssignments");
        return resolve(res);
      })
      .catch(error => reject(error));
    });
  },  
  create: query => {
    return new Promise((resolve, reject) => {
      CampaignAssignment.create(query)
      .then(res => {
        if (res) console.log({ query }, "Creates CampaignAssignment");
        return resolve(res);
      })
      .catch(error => reject(error));
    });
  },
  delete: query => {
    return new Promise((resolve, reject) => {
      CampaignAssignment.deleteMany(query)
      .then(res => {
        if (res.deletedCount) console.log({ query }, "Deletes CampaignAssignment");
        return resolve(res);
      })
      .catch(error => reject(error));
    });
  }
}

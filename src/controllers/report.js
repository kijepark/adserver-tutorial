import moment from "moment";

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
  },
  overview: () => {
    return new Promise((resolve, reject) => {
      const query = {
        date: {
          $gte: moment().subtract(6, "d").format("YYYY-MM-DD"),
          $lte: moment().format("YYYY-MM-DD")
        }
      }

      Report.aggregate([
        { $match: query },
        {
          $project: {
            impressions: "$impressions",
            clicks: "$clicks",
            date: { $substr: ["$date", 5, 9] }
          }
        },
        {
          $group: {
            _id: { date: "$date" },
            date: { $first : "$date" },
            impressions: { $sum: "$impressions" },
            clicks: { $sum: "$clicks" }
          }
        }
      ])
      .then(reports => {
        const dateRanges = [];
        const impressions = [];
        const clicks = [];

        for (let i=6; i!=-1; i-=1) {
          dateRanges.push(moment().add(-i, "day").format("MM-DD"));
        }

        for (let i=0; i<dateRanges.length; i+=1) {
          const dateRange = dateRanges[i];

          for (let t=0; t<reports.length; t+=1) {
            const report = reports[t];

            if (dateRange === report.date) {
              impressions.push(report.impressions);
              clicks.push(report.clicks);
              break;
            }else if ((t+1) === reports.length) {
              impressions.push(0);
              clicks.push(0);
            }
          }
        }

        if (!reports.length) {
          for (let i=0; i<dateRanges.length; i+=1) {
            impressions.push(0);
            clicks.push(0);
          }
        }

        return resolve({
          labels: dateRanges,
          impressions: impressions,
          clicks: clicks
        });
      })
      .catch(error => reject(error));
    });
  }
}

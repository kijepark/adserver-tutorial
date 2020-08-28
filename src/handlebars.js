import Handlebars from "handlebars";

export default () => {
  Handlebars.registerHelper("publishersAndZones", publishers => {
    let navHtml = "<ul class='uk-nav-sub'>";

    for (let i=0; i<publishers.length; i+=1) {
      const publisher = publishers[i];

      navHtml += "<li>";
      navHtml += "  <a href='/publisher/view?publisher_id=" + publisher.id + "'> " + publisher.name + " </a>";

      let subNavHtml = "<ul class='uk-nav-sub'>";
      for (let t=0; t<publisher.zones.length; t+=1) {
        const zone = publisher.zones[t];
        
        subNavHtml += "<li>";
        subNavHtml += "  <a href='/zone/view?zone_id=" + zone.id + "'>";
        subNavHtml += "    <span uk-icon='move' class='uk-icon'></span>";
        subNavHtml += "    <span class='uk-text-middle'> " + zone.name + " </span>";
        subNavHtml += "  </a>";
        subNavHtml += "</li>";
      }
      subNavHtml += "</ul>";

      navHtml += subNavHtml;
      navHtml += "</li>";
    }

    navHtml += "</ul>";

    return new Handlebars.SafeString(navHtml);
  });

  Handlebars.registerHelper("publisherList", publishers => {
    let html = "";

    for (let i=0; i<publishers.length; i+=1) {
      const publisher = publishers[i];

      html += "<tr data-publisher-id=" + publisher.id + ">";
      html += "  <td> <input class='uk-checkbox' type='checkbox'></td> </td>";
      html += "  <td class='uk-text-nowrap'> " + publisher.name + " </td>";
      html += "  <td class='uk-text-nowrap'> " + publisher.zones.length + " </td>";
      html += "</tr>"
    }

    if (!publishers.length) {
      html += "<tr>";
      html += "  <td colspan='3' class='uk-text-center'> This administrator has no publishers </td>";
      html += "</tr>";
    }

    return new Handlebars.SafeString(html);
  });

  Handlebars.registerHelper("zoneList", (zones) => {
    let html = "";

    for (let i=0; i<zones.length; i+=1) {
      const zone = zones[i];

      html += "<tr data-zone-id=" + zone.id + ">";
      html += "  <td> <input class='uk-checkbox' type='checkbox'></td> </td>";
      html += "  <td class='uk-text-nowrap'> " + zone.name + " </td>";
      html += "  <td class='uk-text-nowrap'> " + (zone.width + "x" + zone.height) + " </td>";
      html += "  <td class='uk-text-nowrap'> " + zone.placements.length + " </td>";
      html += "</tr>"
    }

    if (!zones.length) {
      html += "<tr>";
      html += "  <td colspan='4' class='uk-text-center'> This publisher has no zones </td>";
      html += "</tr>";
    }

    return new Handlebars.SafeString(html);
  });

  Handlebars.registerHelper("assignedCampaignList", (assignedCampaigns) => {
    let html = "";

    for (let i=0; i<assignedCampaigns.length; i+=1) {
      const assignedCampaign = assignedCampaigns[i];

      html += "<tr data-campaign-id=" + assignedCampaign.id + ">";
      html += "  <td> <input class='uk-checkbox' type='checkbox'></td> </td>";
      html += "  <td class='uk-text-nowrap'> " + assignedCampaign.name + " </td>";
      html += "  <td class='uk-text-nowrap'> " + assignedCampaign.total_impressions + " </td>";
      html += "</tr>";
    }

    if (!assignedCampaigns.length) {
      html += "<tr>";
      html += "  <td colspan='3' class='uk-text-center'> This zone has no assigned campaigns </td>";
      html += "</tr>";
    }

    return new Handlebars.SafeString(html);
  });

  Handlebars.registerHelper("advertisersAndCampaigns", (advertisers) => {
    let navHtml = "<ul class='uk-nav-sub'>";

    for (let i=0; i<advertisers.length; i+=1) {
      const advertiser = advertisers[i];

      navHtml += "<li>";
      navHtml += "  <a href='/advertiser/view?advertiser_id=" + advertiser.id + "'> " + advertiser.name + " </a>";

      let subNavHtml = "<ul class='uk-nav-sub'>";
      for (let t=0; t<advertiser.campaigns.length; t+=1) {
        const campaign = advertiser.campaigns[t];
        
        subNavHtml += "<li>";
        subNavHtml += "  <a href='/campaign/view?campaign_id=" + campaign.id + "'>";
        subNavHtml += "    <span uk-icon='image' class='uk-icon'></span>";
        subNavHtml += "    <span class='uk-text-middle'> " + campaign.name + " </span>";
        subNavHtml += "  </a>";
        subNavHtml += "</li>";
      }
      subNavHtml += "</ul>";

      navHtml += subNavHtml;
      navHtml += "</li>";
    }

    navHtml += "</ul>";

    return new Handlebars.SafeString(navHtml);
  });

  Handlebars.registerHelper("advertiserList", (advertisers) => {
    let html = "";

    for (let i=0; i<advertisers.length; i+=1) {
      const advertiser = advertisers[i];

      html += "<tr data-advertiser-id=" + advertiser.id + ">";
      html += "  <td> <input class='uk-checkbox' type='checkbox'></td> </td>";
      html += "  <td class='uk-text-nowrap'> " + advertiser.name + " </td>";
      html += "  <td class='uk-text-nowrap'> " + advertiser.campaigns.length + " </td>";
      html += "</tr>"
    }

    if (!advertisers.length) {
      html += "<tr>";
      html += "  <td colspan='3' class='uk-text-center'> This administrator has no advertisers </td>";
      html += "</tr>";
    }

    return new Handlebars.SafeString(html);
  });

  Handlebars.registerHelper("campaignList", (campaigns) => {
    let html = "";

    for (let i=0; i<campaigns.length; i+=1) {
      const campaign = campaigns[i];

      html += "<tr data-campaign-id=" + campaign.id + ">";
      html += "  <td> <input class='uk-checkbox' type='checkbox'></td> </td>";
      html += "  <td class='uk-text-nowrap'> " + campaign.name + " </td>";
      html += "  <td class='uk-text-nowrap'> " + campaign.campaign_assignments.length + " </td>";
      html += "  <td class='uk-text-nowrap'> " + campaign.placements.length + " </td>";
      html += "</tr>"
    }

    if (!campaigns.length) {
      html += "<tr>";
      html += "  <td colspan='4' class='uk-text-center'> This advertiser has no campaigns </td>";
      html += "</tr>";
    }

    return new Handlebars.SafeString(html);
  });

  Handlebars.registerHelper("adItemList", (adItems) => {
    let html = "";

    for (let i=0; i<adItems.length; i+=1) {
      const adItem = adItems[i];

      html += "<tr data-ad-item-id=" + adItem.id + ">";
      html += "  <td> <input class='uk-checkbox' type='checkbox'></td> </td>";
      html += "  <td class='uk-text-nowrap'> " + adItem.name + " </td>";
      html += "  <td class='uk-text-nowrap'> " + adItem.total_impressions + " </td>";
      html += "  <td class='uk-text-nowrap'> " + adItem.clicks + " </td>";
      html += "</tr>"
    }

    if (!adItems.length) {
      html += "<tr>";
      html += "  <td colspan='4' class='uk-text-center'> This campaign has no ad items </td>";
      html += "</tr>";
    }

    return new Handlebars.SafeString(html);
  });

  Handlebars.registerHelper("zoneAssignmentList", (zones) => {
    let html = "";

    for (let i=0; i<zones.length; i+=1) {
      const zone = zones[i];

      html += "<tr data-zone-id=" + zone.id + ">";
      html += "  <td> <input class='uk-checkbox' type='checkbox'></td> </td>";
      html += "  <td class='uk-text-nowrap'> " + zone.name + " </td>";
      html += "  <td class='uk-text-nowrap'> " + zone.total_impressions + " </td>";
      html += "</tr>"
    }

    if (!zones.length) {
      html += "<tr>";
      html += "  <td colspan='3' class='uk-text-center'> This campaign has no zone assignments </td>";
      html += "</tr>";
    }

    return new Handlebars.SafeString(html);
  });
}

var Handlebars = require("handlebars");

module.exports = function() {
  Handlebars.registerHelper("publishersAndZones", function(publishers) {
    var navHtml = "<ul class='uk-nav-sub'>";

    for (var i=0; i<publishers.length; i+=1) {
      var publisher = publishers[i];

      navHtml += "<li>";
      navHtml += "  <a href='/publisher/view?publisher_id=" + publisher.id + "'> " + publisher.name + " </a>";

      var subNavHtml = "<ul class='uk-nav-sub'>";
      for (var t=0; t<publisher.zones.length; t+=1) {
        var zone = publisher.zones[t];
        
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

  Handlebars.registerHelper("publisherList", function(publishers) {
    var navHtml = "";

    for (var i=0; i<publishers.length; i+=1) {
      var publisher = publishers[i];

      navHtml += "<tr>";
      navHtml += "  <td> <input class='uk-checkbox' type='checkbox'></td> </td>";
      navHtml += "  <td class='uk-text-nowrap'> " + publisher.name + " </td>";
      navHtml += "  <td class='uk-text-nowrap'> " + publisher.zones.length + " </td>";
      navHtml += "</tr>"
    }

    return new Handlebars.SafeString(navHtml);
  });

  Handlebars.registerHelper("zoneList", function(zones) {
    var navHtml = "";

    for (var i=0; i<zones.length; i+=1) {
      var zone = zones[i];

      navHtml += "<tr>";
      navHtml += "  <td> <input class='uk-checkbox' type='checkbox'></td> </td>";
      navHtml += "  <td class='uk-text-nowrap'> " + zone.name + " </td>";
      navHtml += "  <td class='uk-text-nowrap'> " + (zone.width + "x" + zone.height) + " </td>";
      navHtml += "  <td class='uk-text-nowrap'> " + 0 + " </td>";
      navHtml += "</tr>"
    }

    return new Handlebars.SafeString(navHtml);
  });

  Handlebars.registerHelper("advertisersAndCampaigns", function(advertisers) {
    var navHtml = "<ul class='uk-nav-sub'>";

    for (var i=0; i<advertisers.length; i+=1) {
      var advertiser = advertisers[i];

      navHtml += "<li>";
      navHtml += "  <a href='/advertiser/view?advertiser_id=" + advertiser.id + "'> " + advertiser.name + " </a>";

      var subNavHtml = "<ul class='uk-nav-sub'>";
      for (var t=0; t<advertiser.campaigns.length; t+=1) {
        var campaign = advertiser.campaigns[t];
        
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

  Handlebars.registerHelper("advertiserList", function(advertisers) {
    var navHtml = "";

    for (var i=0; i<advertisers.length; i+=1) {
      var advertiser = advertisers[i];

      navHtml += "<tr>";
      navHtml += "  <td> <input class='uk-checkbox' type='checkbox'></td> </td>";
      navHtml += "  <td class='uk-text-nowrap'> " + advertiser.name + " </td>";
      navHtml += "  <td class='uk-text-nowrap'> " + advertiser.campaigns.length + " </td>";
      navHtml += "</tr>"
    }

    return new Handlebars.SafeString(navHtml);
  });

  Handlebars.registerHelper("campaignList", function(campaigns) {
    var navHtml = "";

    for (var i=0; i<campaigns.length; i+=1) {
      var campaign = campaigns[i];

      navHtml += "<tr>";
      navHtml += "  <td> <input class='uk-checkbox' type='checkbox'></td> </td>";
      navHtml += "  <td class='uk-text-nowrap'> " + campaign.name + " </td>";
      navHtml += "  <td class='uk-text-nowrap'> " + campaign.campaign_assignments.length + " </td>";
      navHtml += "  <td class='uk-text-nowrap'> " + 0 + " </td>";
      navHtml += "</tr>"
    }

    return new Handlebars.SafeString(navHtml);
  });
}

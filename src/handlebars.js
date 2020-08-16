var Handlebars = require("handlebars");

module.exports = function() {
  Handlebars.registerHelper("publishersAndZones", function(publishers) {
    var navHtml = "<ul class='uk-nav-sub'>";

    for (var i=0; i<publishers.length; i+=1) {
      var publisher = publishers[i];

      navHtml += "<li>";
      navHtml += "  <a href='/publisher/view'> " + publisher.name + " </a>";

      var subNavHtml = "<ul class='uk-nav-sub'>";
      for (var t=0; t<publisher.zones.length; t+=1) {
        var zone = publisher.zones[t];
        
        subNavHtml += "<li>";
        subNavHtml += "  <a href='/zone/view'>";
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

  Handlebars.registerHelper("advertisersAndCampaigns", function(advertisers) {
    var navHtml = "<ul class='uk-nav-sub'>";

    for (var i=0; i<advertisers.length; i+=1) {
      var advertiser = advertisers[i];

      navHtml += "<li>";
      navHtml += "  <a href='/advertiser/view'> " + advertiser.name + " </a>";

      var subNavHtml = "<ul class='uk-nav-sub'>";
      for (var t=0; t<advertiser.campaigns.length; t+=1) {
        var campaign = advertiser.campaigns[t];
        
        subNavHtml += "<li>";
        subNavHtml += "  <a href='/campaign/view'>";
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
}

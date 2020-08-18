/**
 * 1. Get Zone Tags
 * 2. Create Publisher
 * 3. Create Zone
 * 4. Create Advertiser
 * 5. Create Campaign
 * 6. Create Placement from Publisher
 * 7. Create Ad Item and assign it to Campaign
 * 8. Create Placement from Advertiser 
 */

// 1. Get Zone Tags
var zoneTagButton = document.getElementById("zone-tag-button");
var zoneTagArea = document.getElementById("zone-tag-area");
var zoneTagTypeSelect = document.getElementById("zone-tag-type-select");
var zoneTagModal = document.getElementById("zone-tag-modal");

if (zoneTagButton) {
  // Updates zone tag from textarea
  function updateClipboard() {
    var type = zoneTagTypeSelect.options[zoneTagTypeSelect.selectedIndex].value;
    var zoneID = new URLSearchParams(window.location.search).get("zone_id");
    var host = "http://" + window.location.hostname + ((window.location.port) ? (":" + window.location.port) : "");
    var zoneWidth = zoneTagModal.getAttribute("data-zone-width");
    var zoneHeight = zoneTagModal.getAttribute("data-zone-height");
    
    switch(type) {
      case "js": {
        zoneTagArea.innerHTML
        = '<script type="text/javascript">\n'
        + 'var absrc = "'+host+'/adserve?zone_id='+zoneID+'&type=js";\n'
        + 'document.write("<scr"+"ipt src="+absrc+" type=\'text/javascript\'></scr"+"ipt>");\n'
        + '</script>';
      }
      break;
      case "iframe": {
        zoneTagArea.innerHTML
        = '<iframe src="'+host+'/adserve?zone_id='+zoneID+'&type=iframe"'
        + ' width="'+zoneWidth+'" height="'+zoneHeight+'" marginwidth="0" marginheight="0"'
        + ' hspace="0" vspace="0" frameborder="0" scrolling="no">'
        + '</iframe>';
      }
      break;
      case "json": {
        zoneTagArea.innerHTML = host + '/adserve?zone_id='+zoneID+'&type=json';
      }
      break;
    }
  }
  
  zoneTagTypeSelect.addEventListener("change", function() {
    return updateClipboard();
  });

  updateClipboard();
}

// 2. Create Publisher
var publisherCreateButton = document.getElementById("publisher-create-button");
var publisherNameInput = document.getElementById("publisher-name-input");
var publisherDomainInput = document.getElementById("publisher-domain-input");

if (publisherCreateButton) {
  publisherCreateButton.addEventListener("click", function() {
    var publisherName = publisherNameInput.value;
    var publisherDomain = publisherDomainInput.value;

    $.ajax({
      method: "POST",
      url: "/publisher/create",
      data: {
        name: publisherName,
        domain: publisherDomain
      },
      success: function(data, status, xhr) {
        return window.location.reload();
      }
    });
  });
}

// 3. Create Zone
var zoneCreateButton = document.getElementById("zone-create-button");
var zoneNameInput = document.getElementById("zone-name-input");
var zoneSizeSelect = document.getElementById("zone-size-select");

if (zoneCreateButton) {
  zoneCreateButton.addEventListener("click", function() {
    var zoneName = zoneNameInput.value;
    var zoneSize = zoneSizeSelect.options[zoneSizeSelect.selectedIndex].value;
    var publisherID = new URLSearchParams(window.location.search).get("publisher_id");

    $.ajax({
      method: "POST",
      url: "/zone/create",
      data: {
        publisher_id: publisherID,
        name: zoneName,
        size: zoneSize
      },
      success: function(data, status, xhr) {
        return window.location.reload();
      }
    });    
  });
}

// 4. Create Advertiser
var advertiserCreateButton = document.getElementById("advertiser-create-button");
var advertiserNameInput = document.getElementById("advertiser-name-input");

if (advertiserCreateButton) {
  advertiserCreateButton.addEventListener("click", function() {
    var advertiserName = advertiserNameInput.value;

    $.ajax({
      method: "POST",
      url: "/advertiser/create",
      data: {
        name: advertiserName
      },
      success: function(data, status, xhr) {
        return window.location.reload();
      }
    });
  });
}

// 5. Create Campaign
var campaignCreateButton = document.getElementById("campaign-create-button");
var campaignNameInput = document.getElementById("campaign-name-input");

if (campaignCreateButton) {
  campaignCreateButton.addEventListener("click", function() {
    var campaignName = campaignNameInput.value;
    var advertiserID = new URLSearchParams(window.location.search).get("advertiser_id");

    $.ajax({
      method: "POST",
      url: "/campaign/create",
      data: {
        advertiser_id: advertiserID,
        name: campaignName
      },
      success: function(data, status, xhr) {
        return window.location.reload();
      }
    });    
  });
}

// 6. Create Placement from Publisher
var createCampaignAssignModalbutton = document.getElementById("campaign-assign-modal-button");

if (createCampaignAssignModalbutton) {
  var campaignAssignList = document.getElementById("campaign-assign-list");
  var campaignAssignListTBody = campaignAssignList.getElementsByTagName("tbody")[0];
  var zoneID = new URLSearchParams(window.location.search).get("zone_id");

  function addAssignButtonClickEvent() {
    var campaignAssignButtons = campaignAssignListTBody.querySelectorAll("tr");

    for (var i=0; i<campaignAssignButtons.length; i+=1) {
      var campaignAssignButton = campaignAssignButtons[i];
      
      campaignAssignButton.addEventListener("click", function() {
        var campaignID = this.getAttribute("data-campaign-id");

        $.ajax({
          method: "POST",
          url: "/placement/create",
          data: {
            zone_id: zoneID,
            campaign_id: campaignID
          },
          success: function(data, status, xhr) {
            return window.location.reload();
          }
        });
      });
    }
  }
  
  $.ajax({
    method: "POST",
    url: "/zone/campaign/assign",
    data: {
      zone_id: zoneID
      },
    success: function(campaigns, status, xhr) {
      var html = "";
      
      for (var i=0; i<campaigns.length; i+=1) {
        var campaign = campaigns[i];
          
        html += "<tr data-campaign-id='" + campaign.id + "'>";
        html += "  <td><button class='uk-button uk-button-default' type='button'> <span uk-icon='check' class='uk-icon'></span> </button></td>";
        html += "  <td class='uk-text-nowrap'>" + campaign.name + "</td>";
        html += "  <td class='uk-text-nowrap'>" + campaign.eligible_ad_items + "</td>";
        html += "  <td class='uk-text-nowrap'>" + campaign.advertiser + "</td>";
        html += "</tr>";
      }

      campaignAssignListTBody.innerHTML = html;
      return addAssignButtonClickEvent();
    }
  });
}

// 7. Create Ad Item and assign it to Campaign
var adItemCreateModal = document.getElementById("ad-item-create-modal");
var adItemCreateButton = document.getElementById("ad-item-create-button");

if (adItemCreateModal) {
  var campaignID = new URLSearchParams(window.location.search).get("campaign_id");
  var adItemNameInput = document.getElementById("ad-item-name-input");
  var adItemLinkInput = document.getElementById("ad-item-link-input");
  var adItemImageUrlInput = document.getElementById("ad-item-image-url-input");
  var adItemSizeSelect = document.getElementById("ad-item-size-select");

  adItemCreateButton.addEventListener("click", function() {
    var adItemName = adItemNameInput.value;
    var adItemLink = adItemLinkInput.value;
    var adItemImageUrl = adItemImageUrlInput.value;
    var adItemSize = adItemSizeSelect.options[adItemSizeSelect.selectedIndex].value;
    var adItemTarget = document.querySelector('input.uk-radio:checked').value || "";

    $.ajax({
      method: "POST",
      url: "/aditem/create",
      data: {
        campaign_id: campaignID,
        name: adItemName,
        link: adItemLink,
        image_url: adItemImageUrl,
        size: adItemSize,
        html_target: adItemTarget
      },
      success: function(campaigns, status, xhr) {
        return window.location.reload(); 
      }
    });
  });
}

// 8. Create Placement from Advertiser
var zoneAssignCreateModal = document.getElementById("zone-assign-create-modal");
var zoneAssignCreateModalButton = document.getElementById("zone-assign-create-modal-button");

if (zoneAssignCreateModal) {
  var campaignID = new URLSearchParams(window.location.search).get("campaign_id");
  var zoneAssignList = document.getElementById("zone-assign-list");
  var zoneAssignListTBody = zoneAssignList.getElementsByTagName("tbody")[0];

  function addAssignButtonClickEvent() {
    var zoneAssignButtons = zoneAssignListTBody.querySelectorAll("tr");

    for (var i=0; i<zoneAssignButtons.length; i+=1) {
      var zoneAssignButton = zoneAssignButtons[i];
      
      zoneAssignButton.addEventListener("click", function() {
        var zoneID = this.getAttribute("data-zone-id");

        $.ajax({
          method: "POST",
          url: "/placement/create",
          data: {
            zone_id: zoneID,
            campaign_id: campaignID
          },
          success: function(data, status, xhr) {
            return window.location.reload();
          }
        });
      });
    }
  }

  $.ajax({
    method: "POST",
    url: "/campaign/zone/assign",
    data: {
      campaign_id: campaignID
    },
    success: function(zones, status, xhr) {
      var html = "";
      
      for (var i=0; i<zones.length; i+=1) {
        var zone = zones[i];
          
        html += "<tr data-zone-id='" + zone.id + "'>";
        html += "  <td><button class='uk-button uk-button-default' type='button'> <span uk-icon='check' class='uk-icon'></span> </button></td>";
        html += "  <td class='uk-text-nowrap'>" + zone.name + "</td>";
        html += "  <td class='uk-text-nowrap'>" + zone.publisher + "</td>";
        html += "  <td class='uk-text-nowrap'>" + zone.size + "</td>";
        html += "</tr>";
      }

      zoneAssignListTBody.innerHTML = html;
      return addAssignButtonClickEvent();
    }
  });
}

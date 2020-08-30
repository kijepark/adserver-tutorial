/**
 * 1. Get Zone Tags
 * 2. Publisher
 * - create
 * - delete
 * 3. Zone
 * - create
 * - delete
 * 4. Advertiser
 * - create
 * - delete
 * 5. Campaign
 * - create
 * - delete
 * 6. Placement from Publisher
 * - create
 * - delete
 * 7. Ad Item
 * - Create and assign it to Campaign
 * - Delete
 * 8. Placement from Advertiser 
 * - create
 * - delete
 * 9. Chart
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

// 2. Publisher
// - create
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

// - delete
var publisherDeleteButton = document.getElementById("publisher-delete-button");

if (publisherDeleteButton) {
  publisherDeleteButton.addEventListener("click", function() {
    var checkboxes = document.getElementsByClassName("uk-checkbox");
    var publisherIDs = [];

    for (var i=0; i<checkboxes.length; i+=1) {
      var checkbox = checkboxes[i];

      if (checkbox.checked) {
        var row = checkbox.parentNode.parentNode;
        var zoneID = parseInt(row.getAttribute("data-publisher-id"));

        publisherIDs.push(zoneID);
      }
    }

    $.ajax({
      method: "POST",
      url: "/publisher/delete",
      data: {
        ids: publisherIDs
      },
      success: function(data, status, xhr) {
        return window.location.reload();
      }
    });
  });
}

// 3. Zone
// - create
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

// - delete
var zoneDeleteButton = document.getElementById("zone-delete-button");

if (zoneDeleteButton) {
  zoneDeleteButton.addEventListener("click", function() {
    var checkboxes = document.getElementsByClassName("uk-checkbox");
    var zoneIDs = [];

    for (var i=0; i<checkboxes.length; i+=1) {
      var checkbox = checkboxes[i];

      if (checkbox.checked) {
        var row = checkbox.parentNode.parentNode;
        var zoneID = parseInt(row.getAttribute("data-zone-id"));

        zoneIDs.push(zoneID);
      }
    }

    $.ajax({
      method: "POST",
      url: "/zone/delete",
      data: {
        ids: zoneIDs
      },
      success: function(data, status, xhr) {
        return window.location.reload();
      }
    });
  });
}

// 4. Advertiser
// - create
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

// - delete
var advertiserDeleteButton = document.getElementById("advertiser-delete-button");

if (advertiserDeleteButton) {
  advertiserDeleteButton.addEventListener("click", function() {
    var checkboxes = document.getElementsByClassName("uk-checkbox");
    var advertiserIDs = [];

    for (var i=0; i<checkboxes.length; i+=1) {
      var checkbox = checkboxes[i];

      if (checkbox.checked) {
        var row = checkbox.parentNode.parentNode;
        var advertiserID = parseInt(row.getAttribute("data-advertiser-id"));

        advertiserIDs.push(advertiserID);
      }
    }

    $.ajax({
      method: "POST",
      url: "/advertiser/delete",
      data: {
        ids: advertiserIDs
      },
      success: function(data, status, xhr) {
        return window.location.reload();
      }
    });
  });
}

// 5. Campaign
// - create
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

// - delete
var campaignDeleteButton = document.getElementById("campaign-delete-button");

if (campaignDeleteButton) {
  campaignDeleteButton.addEventListener("click", function() {
    var checkboxes = document.getElementsByClassName("uk-checkbox");
    var campaignIDs = [];

    for (var i=0; i<checkboxes.length; i+=1) {
      var checkbox = checkboxes[i];

      if (checkbox.checked) {
        var row = checkbox.parentNode.parentNode;
        var campaignID = parseInt(row.getAttribute("data-campaign-id"));

        campaignIDs.push(campaignID);
      }
    }

    $.ajax({
      method: "POST",
      url: "/campaign/delete",
      data: {
        ids: campaignIDs
      },
      success: function(data, status, xhr) {
        return window.location.reload();
      }
    });
  });
}

// 6. Placement from Publisher
// - create
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

// - delete
var campaignAssignDeleteButton = document.getElementById("campaign-assign-delete-button");

if (campaignAssignDeleteButton) {
  campaignAssignDeleteButton.addEventListener("click", function() {
    var zoneID = new URLSearchParams(window.location.search).get("zone_id");
    var campaignAssignList = document.getElementById("campaign-assigned-list");
    var checkboxes = campaignAssignList.getElementsByClassName("uk-checkbox");
    var campaignIDs = [];

    for (var i=0; i<checkboxes.length; i+=1) {
      var checkbox = checkboxes[i];

      if (checkbox.checked) {
        var tr = checkbox.parentNode.parentNode;
        var campaignID = parseInt(tr.getAttribute("data-campaign-id"));

        campaignIDs.push(campaignID);
      }
    }

    $.ajax({
      method: "POST",
      url: "/placement/delete",
      data: {
        zone_id: zoneID,
        ids: campaignIDs
      },
      success: function(data, status, xhr) {
        return window.location.reload();
      }
    });
  });
}

// 7. Ad Item
// - Create and assign it to Campaign
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

// - Delete
var adItemDeleteButton = document.getElementById("ad-item-delete-button");

if (adItemDeleteButton) {
  adItemDeleteButton.addEventListener("click", function() {
    var checkboxes = document.querySelectorAll("#ad-item-list .uk-checkbox");
    var adItemIDs = [];

    for (var i=0; i<checkboxes.length; i+=1) {
      var checkbox = checkboxes[i];
      
      if (checkbox.checked) {
        var row = checkbox.parentNode.parentNode;
        var adItemID = parseInt(row.getAttribute("data-ad-item-id"));

        adItemIDs.push(adItemID);
      }
    }

    $.ajax({
      method: "POST",
      url: "/aditem/delete",
      data: {
        ids: adItemIDs
      },
      success: function(data, status, xhr) {
        return window.location.reload();
      }
    });
  });
}

// 8. Placement from Advertiser 
// - create
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

// - delete
var zoneAssignDeleteButton = document.getElementById("zone-assign-delete-button");

if (zoneAssignDeleteButton) {
  zoneAssignDeleteButton.addEventListener("click", function() {
    var campaignID = new URLSearchParams(window.location.search).get("campaign_id");
    var checkboxes = document.querySelectorAll("#zone-assignment-list .uk-checkbox");
    var zoneIDsToUnassign = [];

    for (var i=0; i<checkboxes.length; i+=1) {
      var checkbox = checkboxes[i];
      
      if (checkbox.checked) {
        var row = checkbox.parentNode.parentNode;
        var zoneID = parseInt(row.getAttribute("data-zone-id"));

        zoneIDsToUnassign.push(zoneID);
      }
    }

    $.ajax({
      method: "POST",
      url: "/campaign/zone/unassign",
      data: {
        ids: zoneIDsToUnassign,
        campaign_id: campaignID
      },
      success: function(data, status, xhr) {
        return window.location.reload();
      }
    });
  });
}

// 9. Chart
var chart = document.getElementById("chart");

if (chart) {
  var reports = JSON.parse(reports.replace(/&quot;/g, '"'));
  var ctx = chart.getContext("2d");
  
  new Chart(ctx, {
    type: "line",
    data: {
      labels: reports.labels,
      datasets: [{
        label: "impressions",
        data: reports.impressions,
        backgroundColor: 'rgb(225,233,240,0.3)',
        borderColor: 'rgba(205,215,223,0.7)',
        pointBorderColor: "rgba(205,215,223)",
        pointBackgroundColor: "rgba(205,215,223)",
        pointBorderWidth: 3,
        borderWidth: 1
      },{
        label: "clicks",
        data: reports.clicks,
        backgroundColor: 'rgba(232,230,255,0.2)',
        borderColor: 'rgba(198,192,255,0.7)',
        pointBorderColor: "rgba(198,192,255)",
        pointBackgroundColor: "rgba(198,192,255)",
        pointBorderWidth: 3,
        borderWidth: 1
      }]
    },
    options: {
      legend: {
        display: true,
        position: "top",
        align: "start"
      },
      scales: {
        xAxes: [{
          ticks: {
            fontSize: '11',
            fontColor: '#969da5'
          },
          gridLines: {
            color: 'rgba(0,0,0,0.05)',
            zeroLineColor: 'rgba(0,0,0,0.05)'
          }
        }],
        yAxes: [{
          id: "A",
          display: true,
          position: "left",
          ticks: {
            beginAtZero: true,
            stepSize: 500
          },
          gridLines: {
            display: true
          }
        },{
          id: "B",
          display: true,
          position: "right",
          ticks: {
            beginAtZero: true,
            stepSize: 500
          },
          gridLines: {
            display: false
          }
        }]
      }
    }
  });
}

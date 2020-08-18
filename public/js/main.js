/**
 * 1. Get Zone Tags
 * 2. Create & Delete Publisher
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

// 2. Create & Delete Publisher
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

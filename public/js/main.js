// Use your server hostname for now it's localhost so get it from window
var hostname = window.location.hostname + ((window.location.port) ? (":" + window.location.port) : "");

/**
 * 1. Get Zone Tags
 */

// 1. Get Zone Tags
var zoneTagButton = document.getElementById("zone-tag-button");
var zoneTagModal = document.getElementById("zone-tag-modal");
var zoneTagArea = document.getElementById("zone-tag-area");

if (zoneTagButton) {
  var zoneSize = zoneTagModal.getAttribute("data-zone-size");

  zoneTagButton.addEventListener("click", function() {
    var urlParams = new URLSearchParams(window.location.search);
    var zoneID = urlParams.get('zone_id');

    // API
    var JSONAdAPI = hostname + "/adserve?size=" + zoneSize + "&zone_id=" + zoneID;

    zoneTagArea.innerHTML = JSONAdAPI;
  });
}

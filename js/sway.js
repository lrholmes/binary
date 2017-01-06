// Sample Data
var fruits = ['Bananas', 'Apples', 'Oranges', 'Raisins', 'Grapes'];

var initX = null;

$(document).ready(function() {
  // Map data to cards
  init();

  var canvas = document.querySelector('canvas');
  var video = document.querySelector('video');
  htracker.init(video,canvas);
  htracker.start();

});

var htracker = new headtrackr.Tracker({
  smoothing: true,
  detectionInterval: 20
});

document.addEventListener('facetrackingEvent',
  function (event) {

    var x = event.x;
    if (initX === null) {
      initX = x;
    }
    if (trackingNow) {
      if (x < (initX - 40)) {
        // right
        console.log(x, initX);
        stopTracking();
        swipe('right');
      } else if (x > (initX + 40)) {
        console.log(x, initX);
        stopTracking();
        swipe('left');
      }
    }
  }
);

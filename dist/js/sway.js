var initX = null;
var breakTime = 800;

$(document).ready(function() {
  // Map data to cards
  init();

  var canvas = document.querySelector('canvas');
  var video = document.querySelector('video');
  vidWidth = video.width;
  htracker.init(video,canvas);
  htracker.start();

});

var htracker = new headtrackr.Tracker({
  smoothing: true,
  detectionInterval: 20
});

document.addEventListener('facetrackingEvent',
  function (event) {
    var trackX = 0;
    var x = event.x;
    if (initX === null) {
      initX = x;
    } else {
      trackX = x - initX;
    }
    if (trackingNow) {
      $('.card.ready').css('transform', 'translate(' + -trackX + 'px,' + 0 + 'px)');
      if (x < (initX - 40)) {
        // right
        console.log(x, initX);
        stopTracking(breakTime);
        swipe('right', breakTime);
        window.setTimeout(function(){
          initX = null;
        }, breakTime);
      } else if (x > (initX + 40)) {
        console.log(x, initX);
        stopTracking(breakTime);
        swipe('left', breakTime);
        window.setTimeout(function(){
          initX = null;
        }, breakTime);
      }
    }
  }
);

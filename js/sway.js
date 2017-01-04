// Sample Data
var fruits = ['Bananas', 'Apples', 'Oranges', 'Raisins', 'Grapes'];

var initX = null;

$(document).ready(function() {
  // Map data to cards
  for (var i = 0; i < fruits.length; i++) {
    var cardClass = "card ";
    if (i === fruits.length - 1) {
      // Make the 'top' card (lowest in DOM) active
      cardClass += "active";
    }
    $('.deck').append('<div class="' + cardClass + '"><h3>' + fruits[i] + '</h3></div>');
  }

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
    if (tracking) {
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

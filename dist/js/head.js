// Sample Data
var fruits = ['Bananas', 'Apples', 'Oranges', 'Raisins', 'Grapes'];
var y, initY;
$(document).click(function(){
console.log(y, initY);
});

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

  // var initY = null;
  var initX = null;
  var gotBack = false;
  var gotLow = false;
  var wentSide = false;
  var wentBack = false;
  document.addEventListener('facetrackingEvent',
    function (event) {
      y = event.y;
      var x = event.x;
      if (initX === null) {
        initY = y;
        initX = x;
      }
      // LEFT/RIGHT
      if (x > (initX + 10) || x < (initX - 10)) {
        // user is moving head sidways
        wentSide = true;
      }
      if (x > (initX - 5) && x < (initX + 5) && wentSide) {
        // user is moving head upwards
        wentBack = true;
      }
      // UP/DOWN
      if (y > (initY - 5) && gotLow) {
        // user is moving head upwards
        gotBack = true;
      }
      if (y > (initY + 20)) {
        // user is moving head downwards
        gotLow = true;
      }

      if (gotBack === true && gotLow === true) {
        swipe('right');
        gotBack = false;
        gotLow = false;
        wentSide = false;
        wentBack = false;
      }
      if (wentSide === true && wentBack === true) {
        swipe('left');
        wentSide = false;
        wentBack = false;
        gotBack = false;
        gotLow = false;
      }
    }
  );
});

var htracker = new headtrackr.Tracker({
  smoothing: true,
  detectionInterval: 20
});

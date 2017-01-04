// Sample Data
var fruits = ['Bananas', 'Apples', 'Oranges', 'Raisins', 'Grapes'];
var video = document.querySelector("video");
var doTracking = true;

window.setInterval(function(){
  console.log('2 seconds');
}, 2000)

tracking.ColorTracker.registerColor('green', function(r, g, b) {

  if (r < 100 && g > 140 && b < 100) {
    return true;
  }
  return false;
});

tracking.ColorTracker.registerColor('red', function(r, g, b) {

  if (r > 140 && g < 100 && b < 100) {
    return true;
  }
  return false;
});

// tracking.ColorTracker.registerColor('red', function(r, g, b) {
//   if (r > 200 && g < 50 && b < 50) {
//     return true;
//   }
//   return false;
// });


var colours = new tracking.ColorTracker(['green', 'red']);

colours.on('track', function(event) {
  if (event.data.length === 0) {
    // No colors were detected in this frame.
  } else {
    event.data.forEach(function(rect) {
      console.log('detected');
      console.log(rect.color);
      // rect.x, rect.y, rect.height, rect.width, rect.color
    });
  }
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

  tracking.track('#vid', colours, {camera:true});

});

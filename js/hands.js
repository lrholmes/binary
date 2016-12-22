// Sample Data
var fruits = ['Bananas', 'Apples', 'Oranges', 'Raisins', 'Grapes'];

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
});


// Setup Leap loop with frame callback function
var controllerOptions = {};

var controller = Leap.loop({enableGestures: true}, function(frame){
});

controller.on("gesture", function(gesture){
  if (gesture.type === "swipe" && gesture.state == "stop") {
    console.log(gesture);
    if (gesture.direction[0] < gesture.direction[2]) {
      console.log('left');
      swipe('left');
    } else {
      console.log('right');
      swipe('right');
    }
  }
});

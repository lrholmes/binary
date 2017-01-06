// Sample Data
var fruits = ['Bananas', 'Apples', 'Oranges', 'Raisins', 'Grapes'];

$(document).ready(function() {
  // Map data to cards
  init();
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

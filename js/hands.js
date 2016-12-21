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
  // if(frame.valid && frame.gestures.length > 0){
  //   frame.gestures.forEach(function(gesture){
  //       switch (gesture.type){
  //         case "circle":
  //             console.log("Circle Gesture");
  //             break;
  //         case "keyTap":
  //             console.log("Key Tap Gesture");
  //             break;
  //         case "screenTap":
  //             console.log("Screen Tap Gesture");
  //             break;
  //         case "swipe":
  //             console.log("Swipe Gesture");
  //             break;
  //       }
  //   });
  // }
});

controller.on("gesture", function(gesture){
  if (gesture.type === "swipe" && gesture.state == "stop") {
    if (gesture.direction[0] < gesture.direction[2]) {
      console.log('left');
      swipe('left');
    } else {
      console.log('right');
      swipe('right');
    }
  }
});

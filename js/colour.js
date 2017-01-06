var width = 320;
var height = 240;
var video = document.querySelector('video');
video.width = width;
video.height = height;

navigator.getUserMedia = navigator.getUserMedia ||
                         navigator.webkitGetUserMedia ||
                         navigator.mozGetUserMedia;

if (navigator.getUserMedia) {
   navigator.getUserMedia({ audio: false, video: { width: 1280, height: 720 } },
      function(stream) {
         video.srcObject = stream;
         video.onloadedmetadata = function(e) {
           video.play();
         };
      },
      function(err) {
         console.log("The following error occurred: " + err.name);
      }
   );
} else {
   console.log("getUserMedia not supported");
}

var canvas = document.querySelector("#c");
canvas.width = width;
canvas.height = height;

var ctx = canvas.getContext('2d');
var green = false;
var red = false;

$('video').click(function(e){
  var x = e.pageX - $('video').offset().left;
  var y = e.pageY - $('video').offset().top;
  console.log(x,y);
  ctx.drawImage(video, 0, 0, width, height);

  var colour = ctx.getImageData(x, y, 1, 1).data;
  if (green !== false) {
    // we already have green colour so get red.
    red = {
      r: colour[0],
      g: colour[1],
      b: colour[2]
    };

    tracking.ColorTracker.registerColor('red', function(r, g, b) {

      if (r > (red.r - 10) && r < (red.r + 10) && g < (red.g + 10) && g > (red.g - 10) && b < (red.b + 10) && b > (red.b - 10)) {
        return true;
      }
      return false;
    });

    var colours = new tracking.ColorTracker(['green', 'red']);
    stopTracking(3000);
    colours.on('track', function(event) {
      if (trackingNow) {
        if (event.data.length === 0) {
          // No colors were detected in this frame.
        } else {
          event.data.forEach(function(rect) {
            console.log('detected');
            console.log(rect.color);
            swipe(rect.color == 'red' ? 'left' : 'right');
            stopTracking();
          });
        }
      }
    });

    tracking.track('#vid', colours, {camera:true});
    $('video').appendTo('body').addClass('float');
    init();
  } else {
    // it is false, so get green
    green = {
      r: colour[0],
      g: colour[1],
      b: colour[2]
    };

    tracking.ColorTracker.registerColor('green', function(r, g, b) {

      if (r > (green.r - 10) && r < (green.r + 10) && g < (green.g + 10) && g > (green.g - 10) && b < (green.b + 10) && b > (green.b - 10)) {
        return true;
      }
      return false;
    });

    $('.instructions b').text('red');
  }
  // var rgb = 'rgb('+colour[0]+','+colour[1]+','+colour[2]+')';
  // $('body').css('background-color', rgb);
});

window.setInterval(function(){
  console.log('2 seconds');
}, 2000)


//
// tracking.ColorTracker.registerColor('red', function(r, g, b) {
//
//   if (r > 140 && g < 60 && b < 90) {
//     return true;
//   }
//   return false;
// });

// tracking.ColorTracker.registerColor('red', function(r, g, b) {
//   if (r > 200 && g < 50 && b < 50) {
//     return true;
//   }
//   return false;
// });


//
//

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

  //tracking.track('#vid', colours, {camera:true});

});

// Sample Data
var clicks = 0;

var docWidth = $(document).width();

$(document).click(function() {
  if (clicks > 3) {
    $('#click-count').text('5');
    $('.buttons').fadeIn('400');
  } else {
    clicks++;
    $('#click-count').text(clicks);
  }
});

window.onload = function() {
    webgazer.setRegression('ridge') /* currently must set regression and tracker */
        .setTracker('clmtrackr')
        .setGazeListener(function(data, clock) {
         //   console.log(data); /* data is an object containing an x and y key which are the x and y prediction coordinates (no bounds limiting) */
         //   console.log(clock); /* elapsed time in milliseconds since webgazer.begin() was called */
          if (begin && trackingNow) {
            if (data.x > docWidth - 100) {
              stopTracking();
              swipe('right');
            }
            if (data.x < 100) {
              stopTracking();
              swipe('left');
            }
          }
        })
        .begin()
        .showPredictionPoints(true); /* shows a square every 100 milliseconds where current prediction is */

    var width = 320;
    var height = 240;
    var topDist = '0px';
    var leftDist = '0px';

    var setup = function() {
        var video = document.getElementById('vid');
        video.style.display = 'none';
        video.style.position = 'absolute';
        video.style.top = topDist;
        video.style.left = leftDist;
        video.width = width;
        video.height = height;
        video.style.margin = '0px';

        webgazer.params.imgWidth = width;
        webgazer.params.imgHeight = height;
    };

    function checkIfReady() {
        if (webgazer.isReady()) {
            setup();
        } else {
            setTimeout(checkIfReady, 100);
        }
    }
    setTimeout(checkIfReady,100);
};


window.onbeforeunload = function() {
    window.localStorage.clear(); //Comment out if you want to save data across different sessions
}

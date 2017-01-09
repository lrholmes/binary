// SETUP BEGIN

var lockEl = document.querySelector('.begin');

lockEl.requestPointerLock = lockEl.requestPointerLock ||
                            lockEl.mozRequestPointerLock ||
                            lockEl.webkitRequestPointerLock;

document.exitPointerLock = document.exitPointerLock ||
                           document.mozExitPointerLock ||
                           document.webkitExitPointerLock;


// Hook pointer lock state change events for different browsers
document.addEventListener('pointerlockchange', lockChangeAlert, false);
document.addEventListener('mozpointerlockchange', lockChangeAlert, false);

// SETUP END

var x = 0;
var y = 0;

$('.begin').click(function(){
  lockEl.requestPointerLock();

});

function updatePosition(e) {
  if (trackingNow) {
    x += e.movementX;
    y += e.movementY;
    $('.card.ready').css('transform', 'translate(' + x + 'px,' + y + 'px)');

    if (x > 200) {
      stopTracking(400);
      swipe('right', 400);
      checkEnd()
      x = 0;
      y = 0;
    }
    if (x < -200) {
      stopTracking(400);
      swipe('left', 400);
      checkEnd()
      x = 0;
      y = 0;
    }
  }
}

function checkEnd() {
  if ($('.deck .card').length === 1) {
    document.exitPointerLock();
  }
}

function lockChangeAlert() {
  if (document.pointerLockElement === lockEl ||
      document.mozPointerLockElement === lockEl ||
      document.webkitPointerLockElement === lockEl ) {
    console.log('The pointer lock status is now locked');
    init();
    document.addEventListener("mousemove", updatePosition, true);
  } else {
    console.log('The pointer lock status is now unlocked');
    document.removeEventListener("mousemove", updatePosition, true);
  }
}

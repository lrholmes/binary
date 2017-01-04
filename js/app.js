var trackingNow = true;
var begin = false;

var fruits = ['Bananas', 'Apples', 'Oranges', 'Raisins', 'Grapes'];

// Triggered by voice command, will send a card left or right
function swipe(direction) {
  var $card = $('.card:last-child');

  $card.addClass('exit-' + direction);
  // make next card in stack active
  $card.prev().addClass('active');
  window.setTimeout(function(){
    // remove self from dom after animation is complete
    $card.remove();
    console.log('new card active');
  }, 1000);
}


function stopTracking(time) {
  if (!time) {
    var time = 2000;
  }
  trackingNow = false;
  initX = null;
  window.setTimeout(function(){
    trackingNow = true;
  }, time);
}


function init() {
  begin = true;
  $('.pre-info').fadeOut('slow');
  $('.deck').fadeIn('slow');

  // Map data to cards
  for (var i = 0; i < fruits.length; i++) {
    var cardClass = "card ";
    if (i === fruits.length - 1) {
      // Make the 'top' card (lowest in DOM) active
      cardClass += "active";
    }
    $('.deck').append('<div class="' + cardClass + '"><h3>' + fruits[i] + '</h3></div>');
  }

}

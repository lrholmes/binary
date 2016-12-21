

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

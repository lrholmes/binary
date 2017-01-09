var trackingNow = true;
var begin = false;

var deckCookie = getCookie('deckType');
var deckType = 'tidy';
if (deckCookie !== "") {
  deckType = deckCookie;
  $('#'+deckType).addClass('button-primary');
} else {
  $('#tidy').addClass('button-primary');
}

var fruits = ['Bananas', 'Apples', 'Oranges', 'Strawberries', 'Grapes', 'Pineapple', 'Kiwi', 'Melon', 'Peaches'];

// Triggered by voice command, will send a card left or right
function swipe(direction, needsReady) {
  var $card = $('.card:last-child');

  $card.addClass('exit-' + direction);
  // make next card in stack active
  $card.prev().addClass('active').removeAttr('style');
  if (needsReady) {
    window.setTimeout(function(){
      $card.prev().addClass('ready');
    }, needsReady);
  }
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


function init(messy) {
  if (deckType === 'messy') {
    messy = true;
  }
  begin = true;
  $('.pre-info').fadeOut('slow');
  $('.deck').fadeIn('slow');

  if (messy) {
    $('.deck').addClass('messy');
  }
  // Map data to cards
  for (var i = 0; i < fruits.length; i++) {
    var cardClass = "card ";
    if (i === fruits.length - 1) {
      // Make the 'top' card (lowest in DOM) active
      cardClass += "active ready";
    }
    var style = {};
    if (messy && i !== fruits.length - 1) {
      var transform = 'translate(' + random(-150, 150) + '%, ' + random(-100, 100) + '%)'
      transform += ' rotate(' + random(20, 180) + 'deg)';
      style.transform = transform;
      console.log(style);
    }
    var el = $('<div class="' + cardClass + '"><h3>' + fruits[i] + '</h3></div>').css(style);
    $('.deck').append(el);
  }

}


function random(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

$('.messy-select .button').click(function(){
  deckType = $(this).attr('id');
  $('.messy-select .button').removeClass('button-primary');
  $('#'+deckType).addClass('button-primary');
  setCookie('deckType', deckType, 2);
});

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

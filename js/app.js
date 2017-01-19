var trackingNow = true;
var begin = false;

var deckCookie = getCookie('deckType');
var deckType = 'tidy';
console.log('deckcookie,', deckCookie);
if (deckCookie !== "") {
  deckType = deckCookie;
  $('#'+deckType).addClass('button-primary');
} else {
  $('#tidy').addClass('button-primary');
}

var fruits = ['Bananas', 'Apples', 'Oranges', 'Strawberries', 'Grapes', 'Pineapple', 'Kiwi', 'Melon', 'Peaches'];

var itemData = {
  'swipe': {
    title: 'Swipe',
    video: 'swipe.mp4',
    desc: 'This interaction aims to provide context to the audience by closely replicating the Tinder swiping experience. This is achieved by replacing the mouse cursor functionality with direct control of the cards, so as a user moves their finger on the computer’s trackpad, this movement is emulated on-screen. Once the user passes the card past the left or right threshold, it will continue to be dismissed off-screen in that direction. Despite not having the visual finger-to-element connection that a touchscreen enables, this interaction does work to provide a simple application of Mine’s concept - removing the need to interact with abstract interface elements can increase the sense of immersion.'
  },
  'voice': {
    title: 'Voice',
    video: 'swipe.mp4',
    desc: 'This interaction allows users to manipulate the direction of the card by using words. Following the positive/negative association with swiping left and right, words that are similar to ‘yes’ will cause the card to go right, and words similar to ‘no’ will do the opposite. This work is an interesting departure from physicality in the typical understanding of the word as it in some ways is less ‘physical’ than normal methods of input.'
  }
};

$('.modal--button').click(function() {
  var item = $(this).attr('data-modal');

  $('#modal #modal--title').text(itemData[item].title);
  $('#modal #modal--video').attr('src', '/videos/' + itemData[item].video);
  $('#modal #modal--description').text(itemData[item].desc);

  $('main').fadeOut(400);
  $('#modal').fadeIn(400);
});

$('#dismiss').click(function(){
  $('main').fadeIn(400);
  $('#modal').fadeOut(400);
});

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
    $('.tidy-deck-container').show();
    $('.deck').addClass('messy');
    $('#tidy-deck').click(function(){
      $('.deck').removeClass('messy');
      $('.card').each(function(){
        $(this).removeAttr('style');
      });
    });
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

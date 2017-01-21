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
    desc: 'This interaction aims to provide context to users by closely replicating the Tinder swiping experience. This is achieved by replacing the mouse cursor functionality with direct control of the cards, so as a user moves their finger on the computer’s trackpad, this movement is emulated on-screen. Once the user passes the card past the left or right threshold, it will continue to be dismissed off-screen in that direction. Despite not having the visual finger-to-element connection that a touchscreen enables, this interaction does work to provide a simple application of Mine’s concept - removing the need to interact with abstract interface elements can increase the sense of immersion.'
  },
  'voice': {
    title: 'Voice',
    video: 'swipe.mp4',
    desc: 'This interaction allows users to manipulate the direction of the card by using words. Following the positive/negative association with swiping left and right, words that are similar to ‘yes’ will cause the card to go right, and words similar to ‘no’ will do the opposite. This work is an interesting departure from physicality in the typical understanding of the word as it in some ways is less ‘physical’ than normal methods of input.'
  },
  'hands': {
    title: 'Hands',
    video: 'swipe.mp4',
    desc: 'This interaction takes users\' hands away from the computer, and allows them to \'flick\' the cards in either direction with a swipe-like gesture. This feels similar to Tinder\'s swiping in a way that is different to the \'Swipe\' interaction - from the point of view of the user, the hand crosses over the card in a way that is similar to using the finger in Tinder\'s swiping interface. This creates the perceived feeling that the user is directly interacting with the onscreen element, instead of an in-between interface (such as a trackpad).'
  },
  'sway': {
    title: 'Sway',
    video: 'swipe.mp4',
    desc: 'This interaction allows the user to embody the movement of the card itself, by mimicing the direction they\'d like it to go with the whole body. This interaction employs the concept of \'kinaesthetic correspondence\' as the card will follow the user as they sway in either direction.'
  },
  'head': {
    title: 'Head',
    video: 'swipe.mp4',
    desc: 'A head nod is widely regarded as a signal for acceptance, and similarly, a head shaking gesture signifies rejection. These are seemingly natural responses used in everyday conversation as a part of body language. This interaction enables users to utilise these gestures in decision-making, see if they feel equally natural in a human-computer interface as they do in a human-human interface.'
  },
  'eyes': {
    title: 'Eyes',
    video: 'swipe.mp4',
    desc: 'Eye tracking is often used as a means of analysing user behaviour by studying where users\' eyes are drawn while they are using an interface. In this interaction, rather, eye tracking is used as the method of control, allowing users to simply look in the direction they want the card to go. After adapting to the mechanism the user may be able to choose very quickly, by allowing instinct to direct their gaze after having seen the content on the card.'
  },
  'colour': {
    title: 'Colour',
    video: 'swipe.mp4',
    desc: 'In this interaction, the user is asked to identify two objects - one red to indicate a swipe left, and one green to indicate a swipe right. The user simply must present the object to make their decision, which in effect passes the physicality over to the user. There are no instructions on what to do, so a user can do anything they like with regards to their method of displaying the object.'
  },
  'guitar': {
    title: 'Guitar',
    video: 'swipe.mp4',
    desc: 'This interaction invites users to make their decision using a musical instrument. The frequency of sound is tracked, so in theory any instrument would work, but this has been tested with a guitar. Users can strike the top or bottom note in order to choose. The low frequency note has been associated with the left swipe, in accordance with the ominous connotation that it seems to hold, and because of that the high frequency note indicates a swipe right.'
  },
};

var itemArray = [];
// add names to array
for (var key in itemData) {
  itemArray.push(key);
}

$('.modal--button').click(function() {
  var item = $(this).attr('data-modal');
  var index = itemArray.indexOf(item);
  var prev = null;
  var next = null;
  if (index < itemArray.length && index > 0) {
    // there is one either side
    // grab names of prev and nex item
    prev = itemArray[index - 1];
    next = itemArray[index + 1];
  } else if (index === 0) {
    next = itemArray[1];
  } else {
    prev = itemArray[itemArray.length];
  }

  function doChanges() {
    if (prev) {
      $('#modal #prev')
      .attr('data-modal', prev)
      .css('display', 'block')
      .children('h5').text(itemData[prev].title);
    } else {
      $('#modal #prev').css('display', 'none');
    }

    if (next) {
      $('#modal #next')
      .attr('data-modal', next)
      .css('display', 'block')
      .children('h5').text(itemData[next].title);
    } else {
      $('#modal #next').css('display', 'none');
    }

    $('#counter').text((index + 1) + '/' + itemArray.length);
    $('#modal #modal--title').text(itemData[item].title);
    $('#modal #modal--video').attr('src', '/videos/' + itemData[item].video);
    $('#modal #modal--description').text(itemData[item].desc);
  }

  if ($('html').hasClass('fixed')) {
    // modal is already up
    $('#modal .modal--inner').fadeOut(200, function(){
      doChanges();
      $('#modal .modal--inner').fadeIn(200);
    });
  } else {
    doChanges();
  }

  $('html').addClass('fixed');
  $('#modal').fadeIn(400);
});

document.onkeyup = function(e) {
  if ($('html').hasClass('fixed')) {
    if (e.keyCode == '37') {
      // left arrow
      $('#modal #prev').click();
    } else if (e.keyCode == '39') {
      // right arrow
      $('#modal #next').click();
    } else if (e.keyCode == '27') {
      // esc
      $('#modal #dismiss').click();
    }
  }
}

$('#dismiss').click(function(){
  $('html').removeClass('fixed');
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

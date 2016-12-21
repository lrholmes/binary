// imports
var $ = require("jquery");

var fruits = ['Bananas', 'Apples', 'Oranges', 'Raisins', 'Grapes'];

$(document).ready(function() {
  for (var i = 0; i < fruits.length; i++) {
    var cardClass = "card ";
    if (i === fruits.length - 1) {
      cardClass += "active";
    }
    $('.deck').append('<div class="' + cardClass + '"><h3>' + fruits[i] + '</h3></div>');
  }
  // $('.card').click(function(){
  //   $this = $(this);
  //   $this.addClass('exit-right');
  //   $this.prev().addClass('active');
  //   window.setTimeout(function(){
  //     $this.remove();
  //   }, 1000);
  // });

  recognition.start();
  console.log('Ready to receive a command.');
});


function swipe(direction) {
  var $card = $('.card:last-child');

  $card.addClass('exit-' + direction);
  $card.prev().addClass('active');
  window.setTimeout(function(){
    $card.remove();
  }, 1000);
}



var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

var rights = ['yes', 'yeah', 'yep', 'yup'];
var lefts = ['no', 'nah', 'nope', 'never'];
var grammar = '#JSGF V1.0; grammar yes; public <yes> = ' + rights.join(' | ') + lefts.join(' | ')  +' ;'

var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.continuous = true;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;


recognition.onresult = function(event) {

  var last = event.results.length - 1;
  var speech = event.results[last][0].transcript;

  var speechArray = speech.split(" ");
  var wordMatch = false;
  var direction = 'right';
  for (var i = 0; i < speechArray.length; i++) {
    for (var j = 0; j < rights.length; j++) {
      if (speechArray[i] == rights[j]) {
        wordMatch = rights[j];
        break;
      }
      if (speechArray[i] == lefts[j]) {
        wordMatch = lefts[j];
        direction = 'left';
        break;
      }
    }
  }

  console.log('Result received: ' + speech + '.');
  if (wordMatch !== false) {
    console.log(wordMatch);
    swipe(direction);
  }
  //bg.style.backgroundColor = color;
  console.log('Confidence: ' + event.results[0][0].confidence);

  window.setTimeout(function(){
    // recognition.start();
    console.log('Ready to receive a color command.');
  }, 1000)
}

recognition.onend = function(event) {
  recognition.start();
  console.log('Ready to receive a color command.');
}

recognition.onnomatch = function(event) {
  console.log("I didn't recognise that color.");
}

recognition.onerror = function(event) {
  console.log('Error occurred in recognition: ' + event.error);
}


// VOICE RECOGNITION -- START

$(document).ready(function() {
  // Map data to cards

  //init(true);
  recognition.start();
});


// Setup Speech Recognition
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

// Arrays of positive/negative words to compare
var rights = ['yes', 'yeah', 'yep', 'yup'];
var lefts = ['no', 'nah', 'nope', 'never'];

var grammar = '#JSGF V1.0; grammar words; public <word> = ' + rights.join(' | ') + ' ;'

var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
//recognition.grammars = speechRecognitionList;
recognition.continuous = true;
recognition.lang = 'en-US';
recognition.interimResults = true;
recognition.maxAlternatives = 0;

console.log(recognition.grammars);


recognition.onresult = function(event) {

  var last = event.results.length - 1;
  var speech = event.results[last][0].transcript;

  // Split speech into array of words
  var speechArray = speech.split(" ");

  // Setup vars that will track matches and direction of result
  var wordMatch = false;
  var direction = 'right';

  // Loop through array of speech and match words
  for (var i = 0; i < speechArray.length; i++) {
    for (var j = 0; j < rights.length; j++) {
      if (speechArray[i] == rights[j]) {
        // there is a match if these are equal
        wordMatch = rights[j];
        break;
      }
      if (speechArray[i] == lefts[j]) {
        // check for a 'no', and change direction if so
        wordMatch = lefts[j];
        direction = 'left';
        break;
      }
      // jump out of this loop if match has occured
      if (wordMatch !== false) {
        break;
      }
    }
  }

  console.log('Result received: ' + speech + '.');

  // we got a match, deal with it
  if (wordMatch !== false) {
    // abort recognition to stop from multiple yes' occurring
    recognition.abort();

    console.log(wordMatch);
    swipe(direction);
  }

  console.log('Confidence: ' + event.results[0][0].confidence);

}

recognition.onend = function(event) {
  recognition.start();
}

recognition.onstart = function(event) {
  console.log('Ready to receive a command.');
}

recognition.onspeechend = function(event) {
  console.log('speechend');
}

recognition.onerror = function(event) {
  console.log('Error occurred in recognition: ' + event.error);
  if (event.error == 'aborted') {
  }
}

// VOICE RECOGNITION -- END

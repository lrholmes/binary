var fruits=["Bananas","Apples","Oranges","Raisins","Grapes"];$(document).ready(function(){for(var e=0;e<fruits.length;e++){var n="card ";e===fruits.length-1&&(n+="active"),$(".deck").append('<div class="'+n+'"><h3>'+fruits[e]+"</h3></div>")}recognition.start()});var SpeechRecognition=SpeechRecognition||webkitSpeechRecognition,SpeechGrammarList=SpeechGrammarList||webkitSpeechGrammarList,SpeechRecognitionEvent=SpeechRecognitionEvent||webkitSpeechRecognitionEvent,rights=["yes","yeah","yep","yup"],lefts=["no","nah","nope","never"],grammar="#JSGF V1.0; grammar words; public <word> = "+rights.join(" | ")+" ;",recognition=new SpeechRecognition,speechRecognitionList=new SpeechGrammarList;speechRecognitionList.addFromString(grammar,1),recognition.continuous=!0,recognition.lang="en-US",recognition.interimResults=!0,recognition.maxAlternatives=0,console.log(recognition.grammars),recognition.onresult=function(e){for(var n=e.results.length-1,o=e.results[n][0].transcript,i=o.split(" "),r=!1,t="right",c=0;c<i.length;c++)for(var s=0;s<rights.length;s++){if(i[c]==rights[s]){r=rights[s];break}if(i[c]==lefts[s]){r=lefts[s],t="left";break}if(r!==!1)break}console.log("Result received: "+o+"."),r!==!1&&(recognition.abort(),console.log(r),swipe(t)),console.log("Confidence: "+e.results[0][0].confidence)},recognition.onend=function(e){recognition.start()},recognition.onstart=function(e){console.log("Ready to receive a command.")},recognition.onspeechend=function(e){console.log("speechend")},recognition.onerror=function(e){console.log("Error occurred in recognition: "+e.error),"aborted"==e.error};
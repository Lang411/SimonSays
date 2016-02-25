$(document).ready(function(){

	function buttonChange(theButton,origionalColor,changeColor,theSound){

		//var bg = $(theButton).css('fill'); // store original background
		$(theButton).css({ fill: changeColor }); //change second element background
			setTimeout(function() {
				$(theButton).css({ fill: origionalColor }); // change it back after ...
				var sound = theSound;
				var audio = new Audio(sound);
				audio.play();
		}, 200); // waiting one second
	}
	
	function simonSpeed(b){
		var redChange = 'rgb(136,0,0)';
		var greenChange = 'rgb(0,170,0)';
		var yellowChange = 'rgb(164,131,0)';
		var blueChange = 'rgb(0,0,136)';
		if (b===1){
			buttonChange("#greenButton",'green',greenChange,'file:///C:/Users/lkenney/Desktop/CODE/Simon%20Says/Assets/sounds/mp3/sounds_01.mp3');
		}
		else if (b===2){
			buttonChange("#redButton",'red',redChange,'file:///C:/Users/lkenney/Desktop/CODE/Simon%20Says/Assets/sounds/mp3/sounds_02.mp3');
		}
		else if (b===3){
			buttonChange("#yellowButton",'yellow',yellowChange,'file:///C:/Users/lkenney/Desktop/CODE/Simon%20Says/Assets/sounds/mp3/sounds_03.mp3');
		}
		else if (b===4){
			buttonChange("#blueButton",'blue',blueChange,'file:///C:/Users/lkenney/Desktop/CODE/Simon%20Says/Assets/sounds/mp3/sounds_04.mp3');
		}
	}
			
	function simonsTurn(Sequence,turn){
		if (arguments.length===2){
		console.log('Simons Turn');	
		var a = SimonAdd();
		console.log('Simons pick:'+a);
		Sequence.push(a)
		console.log('Simons Sequence:'+Sequence);
		}
		
		var i = 0;                     
		function myLoop () {           
		   setTimeout(function () { 
			//console.log('i: '+i);
			  simonSpeed(Sequence[i]);          //  your code here
			  i++;                     //  increment the counter
			  if (i < turn) {            //  if the counter < 10, call the loop function
				myLoop();             //  ..  again which will trigger another 
			  }                        //  ..  setTimeout()
		   }, 500)
		}
		myLoop();                      //  start the loop
		
		return Sequence
	}
	
	function SimonAdd(){
		s_add = Math.floor(Math.random()*4)+1;
		return s_add
	}
	
	function wereYouCorrect(a,b){
		if (a.length != b.length){
			console.log('different lengths');
			console.log(a.length +' vs '+b.length);
			console.log(a);
			console.log(b);
			return false;
		}
		else {
		for (i=0;i<a.length;i++){
			if (a[i]!=b[i]){
				console.log('not the same');
				return false;
			}
		}
		return true;
		}
	}
	

	
//---------Game logic-------	
console.log('you loaded the page and JQuery Loaded');
$("#startBtn").click(function startfunction(){
	$("#startBtn").toggleClass( "disabled" );
	var redChange = 'rgb(136,0,0)';
	var greenChange = 'rgb(0,170,0)';
	var yellowChange = 'rgb(164,131,0)';
	var blueChange = 'rgb(0,0,136)';
	var simonSequence = [];
	var playerSequence = [];
	var turn = 1;
	var playerPressCount = 0;
	var remainingLives = 3;
	
	console.log('----Round: '+turn+'-----');
	roundCounter.innerHTML = 'Round: '+turn;
	lives.innerHTML = 'Lives: '+remainingLives;
	
	simonSequence = simonsTurn(simonSequence,turn);
	console.log('Players Turn');

	function play(boardButton)	{
	playerSequence.push(boardButton);
	playerPressCount++
	if (playerPressCount<turn){
			//console.log('turn: '+turn)
			//console.log('Player Press Count: '+playerPressCount)
		}
		else {
			console.log('Player Sequence: '+playerSequence);
			console.log('Correct round?:'+wereYouCorrect(playerSequence,simonSequence))
			if (wereYouCorrect(playerSequence,simonSequence)==true){
				turn++
				playerSequence = [];
				setTimeout(function myFunction(){
				var sound = 'file:///C:/Users/lkenney/Desktop/CODE/Simon%20Says/Assets/sounds/mp3/Correct-answer.mp3';
				var audio = new Audio(sound);
				audio.play();
				}, 550);
				console.log('----Round: '+turn+'-----');
				roundCounter.innerHTML = 'Round: '+turn;
				setTimeout(function myFunction(){
				playerPressCount=0;
				simonSequence = simonsTurn(simonSequence,turn);
				}, 2000);
				
			}
			else {
				console.log('You lost!')
				var sound = 'file:///C:/Users/lkenney/Desktop/CODE/Simon%20Says/Assets/sounds/mp3/Woop%20Woop-SoundBible.com-198943467.mp3';
				var audio = new Audio(sound);
				audio.play();
				playerSequence = [];
				playerPressCount=0;
				remainingLives=remainingLives-1;
				lives.innerHTML = 'Lives: '+remainingLives;
				if (remainingLives === 0){
					console.log('---GAME OVER---');
					roundCounter.innerHTML = 'GAME OVER';
					lives.innerHTML = 'PLAYER 1';
					setTimeout(function myFunction(){
						var sound = 'file:///C:/Users/lkenney/Desktop/CODE/Simon%20Says/Assets/sounds/mp3/Sad_Trombone-Joe_Lamb-665429450.mp3';
						var audio = new Audio(sound);
						audio.play();
						simonSequence = [];
						playerSequence = [];
						remainingLives = 3;
						turn = 1;
						playerPressCount = 0;
						remainingLives = 3;
						setTimeout(function myFunction(){
							location.reload(); 
							//startfunction();
							//break
						}, 3500);
					}, 2000);
					
				}
				else{
				setTimeout(function myFunction(){
					simonSequence = simonsTurn(simonSequence,turn,'repeat');
				}, 2000);
				}
			}
			
		}
		//console.log('Player Sequence: '+playerSequence);
		//return playerSequence
	}
	
	$("#greenButton").bind("click", function(){
		console.log('You clicked the green button = 1');
		buttonChange("#greenButton",'green',greenChange,'file:///C:/Users/lkenney/Desktop/CODE/Simon%20Says/Assets/sounds/mp3/sounds_01.mp3');
		boardButton = 1;
		play(boardButton);
	});

	$('#redButton').bind("click", function(){
		console.log('You clicked the red button = 2');

		buttonChange("#redButton",'red',redChange,'file:///C:/Users/lkenney/Desktop/CODE/Simon%20Says/Assets/sounds/mp3/sounds_02.mp3');
		boardButton = 2;
		play(boardButton);
	});

	$('#yellowButton').bind("click", function(){
		console.log('You clicked the yellow button = 3');
		
		buttonChange("#yellowButton",'yellow',yellowChange,'file:///C:/Users/lkenney/Desktop/CODE/Simon%20Says/Assets/sounds/mp3/sounds_03.mp3');
		boardButton = 3;
		play(boardButton);
	});

	$('#blueButton').click(function (){
		console.log('You clicked the blue button = 4');
		
		buttonChange("#blueButton",'blue',blueChange,'file:///C:/Users/lkenney/Desktop/CODE/Simon%20Says/Assets/sounds/mp3/sounds_04.mp3');
		boardButton = 4;
		play(boardButton);
		
	});
	
	$('#centerArea').bind("click", function(){
		console.log('You clicked the restart button = clear array');
		location.reload(); 
	});
	
	
});
//------Exiting game logic-----
});

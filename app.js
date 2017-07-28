window.onload = function() {

	var countMaster;


	var TriviaGame={

		time: 30,
		wins: 0,
		playagain: false,
		incorrect:0,
		currentQ:0,

		Questions: [
			Q1={
				question: "what does 2 + 2 = ?",
				correct: "4", 
				options: ["5", "3", "7", "4",],
			
			},
			Q2={
				question: "who let the dogs out?",
				correct: "who",
				options: ["who", "who", "who", "who",],
				
			},
			Q3={
				question: "what color is the sky?",
				correct: "blue",
				options: ["blue", "orange", "green","white",],
				
			},
			// Q4={
			// 	question: "what day is taco tuesday?",
			// 	correct: "tuesday",
			// 	options: ["monday", "tuesday", "wednesday","friday",],
			// 	pic: "assets/images/houses.jpg"


			
			],
			

		printQuestion: function(){
				// prints question
				$("#question").append("<h2>"+ TriviaGame.Questions[TriviaGame.currentQ].question+"</h2><br>");
					// Prints choices
				for (i=0; i<4; i++){
					$("#question").append("<p>"+ TriviaGame.Questions[TriviaGame.currentQ].options[i]+"</p><br>" );
				}


		},

		gameGetQuestion: function () {

				TriviaGame.gameCountStart();
				TriviaGame.printQuestion();

				 $("#question p").on("click",function () {

				 	var x = $(this).text();

				 	CurrentCorrectAnswer= TriviaGame.Questions[TriviaGame.currentQ].correct;

					if(x == CurrentCorrectAnswer){
				 		TriviaGame.wins++;
				 		$("#wins").text("Correct Answers: "+ TriviaGame.wins);
					 		if (TriviaGame.wins===3){
							 	$("#question").html("<div>"+"YOU WIN"+"</div>");
							 	clearInterval(countMaster);
							 	for(i=0; i<3;i++){
							 		$("#question").append("<br>"+TriviaGame.Questions[i].question+"<br>");
							 		$("#question").append("<br>YOU ANSWERED: "+TriviaGame.Questions[i].correct+"<br>");
							 	}
							 	$("#question").append("<br>"+"Number of Incorrect Answers: "+TriviaGame.incorrect);
							 	$("#question").append("<br><br><a>PLAY AGAIN</a>");
							 	$("#question a").on("click",function () {
							 		TriviaGame.playagain=true;
							 		if(TriviaGame.playagain){
							 			TriviaGame.masterReset();
							 		}
							 	});
					 		}
				 			else{
						 		TriviaGame.currentQ++;
						 		setTimeout(TriviaGame.gameGetQuestion, 2000);
						 		TriviaGame.reset();
				 			}
					}
					else{
						$("#question").append("<h3>"+"WRONG!"+"</h3><br>");
						TriviaGame.incorrect++;
						 var newSrc= TriviaGame.Questions[TriviaGame.currentQ].pic;
						 console.log("path to img: "+newSrc);
						 // adding image Hint
						$("#question").append("Hint: <br>");
						$("#question").append("<br><img>");
						$("img").attr("src", newSrc);

					}
				 });
		
		},

		masterReset: function () {

			clearInterval(countMaster);
			$("#question").html(" ");
			TriviaGame.time=30;
			TriviaGame.currentQ=0;
			TriviaGame.incorrect=0;
			TriviaGame.wins=0;
			TriviaGame.gameGetQuestion();
		},



		gameCountStart: function(){

			TriviaGame.reset();
			countMaster= setInterval(TriviaGame.count, 1000);

		},

		reset: function(){

			clearInterval(countMaster);
			$("#question").html(" ");
			TriviaGame.time=30;

		},

		count: function() {

		    TriviaGame.time--;

		    if(TriviaGame.time===0){

		    		clearInterval(countMaster);

				 	$("#question").html("<div>"+"TIME'S OUT - YOU LOSE"+"</div>");
				 }


	  	}


	};

	TriviaGame.gameGetQuestion();

};
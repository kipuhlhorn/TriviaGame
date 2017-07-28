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
				pic: "assets/images/dragons.jpg"
			},
			Q2={
				question: "who let the dogs out",
				correct: "who",
				options: ["who", "who", "who", "who",],
				pic: "assets/images/nothing.jpg"
			},
			Q3={
				question: "what color is the sky?",
				correct: "blue",
				options: ["blue", "orange", "green","white",],
				pic: "assets/images/houses.jpg"
			}
			Q4={
				question: "how many months are in one year?",
				correct: "12",
				options: ["12", "5", "11","9",],
				pic: "assets/images/houses.jpg"
			}	

			],
			

		printQuestion: function(){
				// prints question
				$("#question").append("<h2>"+ TriviaGame.Questions[TriviaGame.currentQ].question+"</h2><br>");
					// Prints choices
				for (i=0; i<3; i++){
					$("#question").append("<p>"+ TriviaGame.Questions[TriviaGame.currentQ].options[i]+"</p><br>" );
				}


				// ENDED UP NOT USING VALUES BUT JUST TEXT OF TAG

				// var v1= TriviaGame.Questions[TriviaGame.currentQ].options[0];
				// console.log(v1);
				// var v2= TriviaGame.Questions[TriviaGame.currentQ].options[1];
				// console.log(v2);
				// var v3= TriviaGame.Questions[TriviaGame.currentQ].options[2];
				// console.log(v3);

				// $("#question p:first-child").attr("value", v1);
				// $("#question p:nth-child(2)").attr("value", v2);
				// $("#question p:nth-child(3)").attr("value", v3);
				

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
			TriviaGame.time=15;
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
			TriviaGame.time=15;

		},

		count: function() {

		    TriviaGame.time--;

		    if(TriviaGame.time===0){

		    		clearInterval(countMaster);

				 	$("#question").html("<div>"+"TIME'S OUT - YOU LOSE"+"</div>");
				 }

			if(TriviaGame.time<10){
				  $(".display").addClass("yellow");
			}
			if(TriviaGame.time<7){
				  $(".display").addClass("orange");
			}
			if(TriviaGame.time<4){
				  $(".display").addClass("red");
			}

		    $(".display").text(TriviaGame.time);

	  	}


	};

	TriviaGame.gameGetQuestion();

};
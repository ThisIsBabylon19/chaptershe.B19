var theQuestions4all = [
	{ title: "What was your favorite scene and why?" },
	{ title: "How did the character change throughout the story?" },
	{ title: "Why did you think the author chose this setting? How did it relate to the plot?" },
	{ title: "What surprised you while reading this book? Were there hints for the plot twists?" },
	{ title: "What drew you into the book and made you keep reading?" },
	{ title: "What was your favorite quote or passage?" },
	{ title: "What themes or symbolism did you notice in the story?" },
	{ title: "How did this world/setting relate to your own?" },
	{ title: "Do you think the story was plot-based or character-driven?" },
	{ title: "What other books did this remind you of? In what ways was this book better or worse?" },
	{ title: "What was you initial impression of the book?" },
	{ title: "Who was your favorite character? Why?" },
	{ title: "Who was your least favorite character? Why?" },
	{ title: "If this book were to become a movie, who would you cast?" },
	{ title: "Did you have a favorite line or quote? Why?" },
	{ title: "What themes are most emphasized throughout the novel?" },
	{ title: "Do you think the author's life specifically influenced the novel?" },
	{ title: "If you could ask the author one question, what would it be?" },
	{ title: "If you could meet one of the characters, who would it be? Why?" },
	{ title: "Did the book's plot & ending meet your expectactions?" },
	{ title: "Could the novel be improved? What are your suggestions?" },
	{ title: "Which places mentioned in the novel would you like to visit?" },
	{ title: "Explain the author's purpose in writing this book?" },
	{ title: "How does the book's title tie in to the manuscript?" },
	{ title: "How would you rate the book on a scale of 1 to 10?" }
]
{% for file in site.data.books %}{% assign i = 0 %}{% capture i %}{{ forloop.index }}{% endcapture %}{% for data in file %}
var theQuestions4{% for content in data[1] %}{{ content.id }}{% endfor %} = [{% for content in data[1] %}{% for theQuestions in content.questions %}
	{ title: "{{ theQuestions }}" }{% if forloop.last %}{% else %},{% endif %}{% endfor %}{% endfor %}
]{% endfor %}{% endfor %}

var intobinary = $.noConflict();
intobinary(document).ready(function() {
	/*** GLOBAL VARIABLES & OBJECTS ***/
	var htmlTag = intobinary("html"),
		bookID = "theQuestions4all";

	var sctBooksTag = intobinary(".js-sctBooks");
	var activeBook = 1;

	var questionTag = document.querySelector(".js-quizQuestion"),
		questionIndexTag = document.querySelector(".js-quizQuestionIndex");
	
	var quiz = [], currentQuestion = [],
		qNoIndex = 0, qNoTotal = 100;
	/*** END GLOBAL VARIABLES & OBJECTS ***/
	
	/*** SETUP ***/
	setupQuiz();
	/*** END SETUP ***/

	/*** ACTIONS ***/
	intobinary(".js-btnBook").click(function() {
		var that = intobinary(this);
		var nextBook = that.parent("li").attr("activePosition");
		sctBooksTag.attr("activeBook", nextBook);

		swapBooks(nextBook);
	});
	intobinary(".js-btnBookNav.is-next").click(function() {
		switchBooks("right");
	});
	intobinary(".js-btnBookNav.is-prev").click(function() {
		switchBooks("left");
	});

	intobinary(".js-btnKit").click(function() {
		if(htmlTag.attr("appStyle") == "theClub") {
			htmlTag.attr("appStyle", "theKit");
			intobinary(".js-btnKit").html("[close the kit]");
			bookID = intobinary(this).attr("theBook");
			
//			alert(bookID);
		}
		else if(htmlTag.attr("appStyle") == "theKit") {
			htmlTag.attr("appStyle", "theClub");
			intobinary(".js-btnKit").html("[open the kit]");
			bookID = "theQuestions4all";
		}

		setupQuiz();
	});

	intobinary(".js-btnNextQuestion").click(function() {
//		resetQuestion();
		nextQuestion();
	});
	intobinary(".js-btnRefresh").click(function() {
		setupQuiz();
	});
	/*** END ACTIONS ***/

	/*** FUNCTIONS ***/
	function getItemPlacement(item, way) {
		var itemPlacement = 0;

		itemPlacement = item.attr("currentPlacement");

		if(way == "right") {
			itemPlacement--;
			if(itemPlacement == 0) { itemPlacement = 9; }
		}
		if(way == "left") {
			itemPlacement++;
			if(itemPlacement == 10) { itemPlacement = 1; }
		}

		item.attr("currentPlacement", itemPlacement);
	}

	function getQuestions(arr) {
		var randomQuestion = [];
		qNoTotal = arr.length;

		for (var i = arr.length; i >= 0; i--) {
			randomQuestion.push(arr[i]);
		}
		
		return randomQuestion;
	}

	function nextQuestion() {
		if(qNoIndex > 0 && qNoIndex < qNoTotal) { preparePage(); }
		
		if (qNoIndex < qNoTotal) {
			qNoIndex += 1;
			currentQuestion = quiz.pop();
			
			questionIndexTag.innerHTML = "Question " + qNoIndex + "/" + qNoTotal;
			
			questionTag.textContent = currentQuestion.title;
//			startSpeech(currentQuestion.title);
		} else {
//			resetApp("withChkbxQuiz");
		}
	}

	function playQuiz(questionSet) {
		quiz = getQuestions(questionSet);
		
		if (quiz.length === 0) {
			alert("[ERROR:] No questions available.");
			return;
		} else {
			nextQuestion();
//			qNoTotal = quiz.length + 1;
		}
	}
	
	function preparePage() {}

	function resetQuestion() {
		/*
		timerPaused = false;
		
		clearInterval(timerInterval);
		intobinary(".quiz .js-button").removeClass("is-active");
		
		var theTimeButtonTag = intobinary(".js-button_time"),
			thePauseButtonTag = intobinary(".js-button_pause"),
			theTimerTag = document.querySelector(".js-timerTag"),
			theQTimerTag = document.querySelector(".js-qTimerTag");
			
		thePauseButtonTag.removeClass("is-hidden");
		if(theTimeButtonTag.hasClass("is-active")) {
			theTimerTag.textContent = "01:00";
			theQTimerTag.textContent = "01:00";
		} else {
			theTimerTag.textContent = "--:--";
			theQTimerTag.textContent = "--:--";
			
			thePauseButtonTag.addClass("is-hidden");
		}
		*/
	}

	function setupQuiz() {
		qNoIndex = 0;
		if(bookID == "theQuestions4all") { playQuiz(theQuestions4all); }
		else if (bookID == "theQuestions4helloBeautiful") { playQuiz(theQuestions4helloBeautiful); }
		else if (bookID == "theQuestions4theCovenantOfWater") { playQuiz(theQuestions4theCovenantOfWater); }
		else if (bookID == "theQuestions4womenWhoRunWithTheWolves") { playQuiz(theQuestions4womenWhoRunWithTheWolves); }

		/*** alert(manual upload todo above.) ***/

		/*
		if(htmlTag.attr("appStyle") == "theClub") { playQuiz(theQuestions4all); }
		else if(htmlTag.attr("appStyle") == "theKit") {
			playQuiz(theQuestions4helloBeautiful);
		}
		*/
	}

	function switchBooks(way) {
		{% for i in (1..9) %}
		getItemPlacement(intobinary(".js-bookItem[activePosition='{{ i }}']"), way);{% endfor %}

		activeBook = intobinary(".js-bookItem[currentPlacement='1']").attr("activePosition");
		sctBooksTag.attr("activeBook", activeBook);
	}

	function swapBooks(nextBook) {
		var placementA,
			placementB,
			placementTemp;

		placementA = intobinary(".js-bookItem[activePosition='"+ activeBook +"']").attr("currentPlacement");
		placementB = intobinary(".js-bookItem[activePosition='"+ nextBook +"']").attr("currentPlacement");

		placementTemp = placementA;
		placementA = placementB;
		placementB = placementTemp;
		
		intobinary(".js-bookItem[activePosition='"+ activeBook +"']").attr("currentPlacement", placementA);
		intobinary(".js-bookItem[activePosition='"+ nextBook +"']").attr("currentPlacement", placementB);

		activeBook = nextBook;
	}
	/*** END FUNCTIONS ***/
});
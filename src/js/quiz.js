document.addEventListener("DOMContentLoaded", function () {
	const questionsData = JSON.parse(localStorage.getItem("questionsData"));
	const content = document.querySelector(".main-section__content");
	const questionCounter = document.querySelector(".main-footer__counter");
	const prevButton = document.getElementById("prevButton");
	const nextButton = document.getElementById("nextButton");

	localStorage.clear();

	console.log(questionsData);

	const correctAnswers = [];
	const choosenAnswers = [];

	for (const obj of questionsData)
		for (const [key, val] of Object.entries(obj.correct_answers))
			if (val === "true") {
				const keySplit = key.split("_correct");
				correctAnswers.push(keySplit[0]);
			}

	console.log(correctAnswers);

	let currentQuestionIndex = 0;
	let selectedElement = null; // Initialize selectedElement

	function displayQuestion(index) {
		const currentQuestionData = questionsData[index];
		const question = currentQuestionData.question;
		const answers = currentQuestionData.answers;
		const answersProperties = Object.keys(answers).filter(
			key => answers[key] !== null
		);

		const encodeHTML = str =>
			str ? str.replace(/</g, "&lt;").replace(/>/g, "&gt;") : "";

		const markup = `
			<p class="main-section__title">${encodeHTML(question)}</p>
			<div class="main-content__answers">
				${answersProperties
					.map(
						key => `
						<div class="main-content__answer--btn" data-ans="${key}">
							<code>${encodeHTML(answers[key])}</code>
						</div>
					`
					)
					.join("")}
			</div>
		`;

		content.innerHTML = markup;

		updateQuestionCounter(index + 1); // Update the question counter
		updateButtonsVisibility(index); // Update button visibility

		const answerButtons = document.querySelectorAll(
			".main-content__answer--btn"
		);

		answerButtons.forEach(button => {
			button.addEventListener("click", function () {
				highlight(this);
			});
		});
	}

	function updateQuestionCounter(currentIndex) {
		questionCounter.textContent = `${currentIndex} of ${questionsData.length} questions`;
	}

	function updateButtonsVisibility(index) {
		if (index > 0) {
			prevButton.style.display = "inline-block";
		} else {
			prevButton.style.display = "none";
		}
	}

	function highlight(element) {
		const answerButtons = document.querySelectorAll(
			".main-content__answer--btn"
		);
		if (selectedElement === element) {
			// If the clicked element is already selected, toggle the highlight
			element.classList.toggle("highlight");
			// If the element is not highlighted anymore, set selectedElement to null
			if (!element.classList.contains("highlight")) {
				selectedElement = null;
			}
		} else {
			// Remove highlight from all elements
			answerButtons.forEach(btn => btn.classList.remove("highlight"));

			// Highlight the selected element
			element.classList.add("highlight");
			// Update the selected element
			selectedElement = element;
		}
	}

	prevButton.addEventListener("click", function () {
		if (currentQuestionIndex > 0) {
			if (currentQuestionIndex <= 4) nextButton.textContent = "Next";
			currentQuestionIndex--;
			choosenAnswers.pop();
			displayQuestion(currentQuestionIndex);
		}
	});

	nextButton.addEventListener("click", function () {
		if (selectedElement !== null) {
			// Do something with the selected answer, for example, store it in an array or object
			console.log(selectedElement.dataset.ans);
			choosenAnswers.push(selectedElement.dataset.ans);

			// Clear the selection
			selectedElement.classList.remove("highlight");
			selectedElement = null;

			// Increment current question index
			currentQuestionIndex++;

			// Display next question
			if (currentQuestionIndex < questionsData.length) {
				if (currentQuestionIndex === 4)
					nextButton.textContent = "Submit";

				displayQuestion(currentQuestionIndex);
			} else {
				// Optionally, you can redirect the user or perform other actions when all questions are done.
				console.log(choosenAnswers);

				let countCorrect = 0;

				choosenAnswers.forEach((ans, i) => {
					console.log(ans, i);
					if (ans === correctAnswers[i]) countCorrect++;
				});

				const scoreData = {
					score: countCorrect,
					numberOfQuestions: questionsData.length,
				};

				localStorage.setItem("scoreData", JSON.stringify(scoreData));

				window.location.href = "score.html";
			}
		} else {
			alert(
				"Please select an answer before proceeding to the next question."
			);
		}
	});

	// Display the first question initially
	displayQuestion(currentQuestionIndex);
});

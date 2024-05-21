export class QuizView {
	constructor() {
		this.content = document.querySelector(".main-section__content");
		this.questionCounter = document.querySelector(".main-footer__counter");
		this.prevButton = document.getElementById("prevButton");
		this.nextButton = document.getElementById("nextButton");
	}

	displayQuestion(question, questionNumber, totalQuestions) {
		const encodeHTML = str =>
			str ? str.replace(/</g, "&lt;").replace(/>/g, "&gt;") : "";

		const answersMarkup = Object.keys(question.answers)
			.filter(key => question.answers[key] !== null)
			.map(
				key => `
				<div class="main-content__answer--btn" data-ans="${key}">
					<code>${encodeHTML(question.answers[key])}</code>
				</div>
			`
			)
			.join("");

		const markup = `
			<p class="main-section__title">${encodeHTML(question.question)}</p>
			<div class="main-content__answers">
				${answersMarkup}
			</div>
		`;

		this.content.innerHTML = markup;
		this.questionCounter.textContent = `${questionNumber} of ${totalQuestions} questions`;
		this.prevButton.style.display =
			questionNumber > 1 ? "inline-block" : "none";
		this.nextButton.textContent =
			questionNumber === totalQuestions ? "Submit" : "Next";
	}

	highlightAnswer(element) {
		const answerButtons = document.querySelectorAll(
			".main-content__answer--btn"
		);
		answerButtons.forEach(btn => btn.classList.remove("highlight"));
		element.classList.add("highlight");
	}

	bindAnswerSelection(handler) {
		this.content.addEventListener("click", function (event) {
			if (event.target.closest(".main-content__answer--btn")) {
				handler(event.target.closest(".main-content__answer--btn"));
			}
		});
	}

	bindPrevButton(handler) {
		this.prevButton.addEventListener("click", handler);
	}

	bindNextButton(handler) {
		this.nextButton.addEventListener("click", handler);
	}
}

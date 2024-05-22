import {
	fetchCategoryQuestions,
	saveQuestionsToLocalStorage,
	getQuestionsFromLocalStorage,
	saveScoreToLocalStorage,
	getScoreFromLocalStorage,
	clearLocalStorage,
} from "./model.js";

import { CategoriesView } from "./views/categoriesView.js";
import { QuizView } from "./views/quizView.js";
import { ScoreView } from "./views/scoreView.js";

class Controller {
	constructor() {
		if (window.location.pathname.endsWith("categories.html")) {
			this.view = new CategoriesView();
			this.initCategoriesPage();
		} else if (window.location.pathname.endsWith("quiz.html")) {
			this.view = new QuizView();
			this.initQuizPage();
		} else if (window.location.pathname.endsWith("score.html")) {
			this.view = new ScoreView();
			this.initScorePage();
		}
	}

	initCategoriesPage() {
		this.view.btnChoose.forEach(btn => {
			btn.addEventListener("click", this.handleChoose.bind(this));
		});
		this.view.modalBtnCancel.addEventListener(
			"click",
			this.handleCancel.bind(this)
		);
	}

	handleChoose(event) {
		const dataCategory = event.target.dataset.category;
		const dataTag = event.target.dataset.tag;
		this.view.showModal();
		this.view.bindContinue(
			this.handleContinue.bind(this, dataCategory, dataTag)
		);
	}

	handleContinue(category, tag) {
		this.handleCancel();
		this.view.showSpinner();

		fetchCategoryQuestions(category, tag).then(questions => {
			saveQuestionsToLocalStorage(questions);
			window.location.href = "quiz.html";
		});
	}

	handleCancel() {
		this.view.hideModal();
	}

	initQuizPage() {
		this.questionsData = getQuestionsFromLocalStorage();
		this.correctAnswers = this.extractCorrectAnswers(this.questionsData);
		this.currentQuestionIndex = 0;
		this.selectedAnswer = null;

		this.displayQuestion();

		this.view.bindAnswerSelection(this.handleAnswerSelection.bind(this));
		this.view.bindPrevButton(this.handlePrevQuestion.bind(this));
		this.view.bindNextButton(this.handleNextQuestion.bind(this));
	}

	handleAnswerSelection(element) {
		this.selectedAnswer = element.dataset.ans;
		this.view.highlightAnswer(element);
	}

	handlePrevQuestion() {
		if (this.currentQuestionIndex > 0) {
			this.currentQuestionIndex--;
			this.displayQuestion();
		}
	}

	handleNextQuestion() {
		if (this.selectedAnswer !== null) {
			this.choosenAnswers = this.choosenAnswers || [];
			this.choosenAnswers[this.currentQuestionIndex] =
				this.selectedAnswer;

			if (this.currentQuestionIndex < this.questionsData.length - 1) {
				this.currentQuestionIndex++;
				this.displayQuestion();
			} else {
				const score = this.calculateScore();
				const scoreData = {
					score: score,
					numberOfQuestions: this.questionsData.length,
				};
				saveScoreToLocalStorage(scoreData);
				window.location.href = "score.html";
			}
		} else {
			alert(
				"Please select an answer before proceeding to the next question."
			);
		}
	}

	displayQuestion() {
		this.selectedAnswer = null;
		this.view.displayQuestion(
			this.questionsData[this.currentQuestionIndex],
			this.currentQuestionIndex + 1,
			this.questionsData.length
		);
	}

	extractCorrectAnswers(questions) {
		const correctAnswers = [];
		questions.forEach(question => {
			for (const [key, val] of Object.entries(question.correct_answers)) {
				if (val === "true") {
					correctAnswers.push(key.split("_correct")[0]);
				}
			}
		});
		return correctAnswers;
	}

	calculateScore() {
		return this.choosenAnswers.reduce((score, answer, index) => {
			if (answer === this.correctAnswers[index]) {
				score++;
			}
			return score;
		}, 0);
	}

	initScorePage() {
		const scoreData = getScoreFromLocalStorage();
		this.view.displayScore(scoreData);
		this.view.bindTryAgainButton(this.handleTryAgain.bind(this));
	}

	handleTryAgain() {
		clearLocalStorage();
		window.location.href = "categories.html";
	}
}

new Controller();

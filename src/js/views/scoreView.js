export class ScoreView {
	constructor() {
		this.scoreParent = document.querySelector(".main-title__score");
		this.tryBtn = document.querySelector(".main-section__btn");
	}

	displayScore(scoreData) {
		this.scoreParent.textContent = `You scored ${scoreData.score} out of ${scoreData.numberOfQuestions}`;
	}

	bindTryAgainButton(handler) {
		this.tryBtn.addEventListener("click", handler);
	}
}

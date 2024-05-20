import { fetchCategoryQuestions } from "./model.js";
import { QuestionView } from "./view.js";

class Controller {
	constructor() {
		this.view = new QuestionView();
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
		fetchCategoryQuestions(category, tag).then(categories => {
			// Store the fetched data in local storage
			localStorage.setItem("questionsData", JSON.stringify(categories));
			// Redirect to quiz.html
			window.location.href = "quiz.html";
		});
	}

	handleCancel() {
		this.view.hideModal();
	}
}

new Controller();

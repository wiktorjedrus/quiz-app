export class CategoriesView {
	constructor() {
		this.modal = document.querySelector(".modal");
		this.modalBtnCancel = document.querySelector(".modal__btn--cancel");
		this.modalBtnContinue = document.querySelector(".modal__btn--continue");
		this.main = document.getElementsByTagName("main")[0];
		this.btnChoose = document.querySelectorAll(".category__item--btn");
	}

	showModal() {
		this.modal.classList.toggle("modal-active");
		this.main.style.filter = "blur(1rem)";
		this.btnChoose.forEach(btn => btn.setAttribute("disabled", true));
	}

	hideModal() {
		this.modal.classList.toggle("modal-active");
		this.main.style.filter = "blur(0rem)";
		this.btnChoose.forEach(btn => btn.removeAttribute("disabled"));
	}

	bindContinue(handler) {
		this.modalBtnContinue.addEventListener("click", handler);
	}
}

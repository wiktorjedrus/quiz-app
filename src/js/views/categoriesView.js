import icons from "url:../../img/icons.svg";

export class CategoriesView {
	constructor() {
		this.modal = document.querySelector(".modal");
		this.modalBtnCancel = document.querySelector(".modal__btn--cancel");
		this.modalBtnContinue = document.querySelector(".modal__btn--continue");
		this.main = document.getElementsByTagName("main")[0];
		this.btnChoose = document.querySelectorAll(".category__item--btn");

		this.backdrop = document.createElement("div");
		this.backdrop.classList.add("backdrop");
		this.spinnerContainer = document.createElement("div");
		this.spinnerContainer.classList.add("spinner");
		this.spinnerContainer.innerHTML = `
			<svg>
				<use href="${icons}#icon-loader"></use>
			</svg>
		`;
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

	showSpinner() {
		document.body.appendChild(this.backdrop);
		this.backdrop.appendChild(this.spinnerContainer);
	}

	hideSpinner() {
		if (this.spinnerContainer.parentElement)
			this.spinnerContainer.parentElement.removeChild(
				this.spinnerContainer
			);
	}
}

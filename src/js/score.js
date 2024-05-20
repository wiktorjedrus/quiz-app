document.addEventListener("DOMContentLoaded", function () {
	const scoreData = JSON.parse(localStorage.getItem("scoreData"));
	const scoreParent = document.querySelector(".main-title__score");
	const tryBtn = document.querySelector(".main-section__btn");

	console.log(tryBtn);

	// localStorage.clear();

	console.log(scoreData);

	scoreParent.textContent = `You scored ${scoreData.score} out of ${scoreData.numberOfQuestions}`;

	tryBtn.addEventListener("click", function () {
		localStorage.clear();
		window.location.href = "categories.html";
	});
});

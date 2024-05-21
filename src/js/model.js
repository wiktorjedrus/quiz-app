const API_KEY = "WjkH0p1AamUVV0LWUTYPGSk5iBgb3ULwOnNdjDkj";

export const fetchCategoryQuestions = async function (category, tag) {
	try {
		const response = await fetch(
			`https://quizapi.io/api/v1/questions?category=${category}&tags=${tag}&difficulty=Easy&apiKey=${API_KEY}`
		);

		const json = await response.json();

		const filteredQuestions = json.filter(
			question => question.multiple_correct_answers === "false"
		);

		return filteredQuestions.slice(0, 5);
	} catch (err) {
		throw new Error("Failed to fetch");
	}
};

export const saveQuestionsToLocalStorage = function (questions) {
	localStorage.setItem("questionsData", JSON.stringify(questions));
};

export const getQuestionsFromLocalStorage = function () {
	return JSON.parse(localStorage.getItem("questionsData"));
};

export const saveScoreToLocalStorage = function (scoreData) {
	localStorage.setItem("scoreData", JSON.stringify(scoreData));
};

export const getScoreFromLocalStorage = function () {
	return JSON.parse(localStorage.getItem("scoreData"));
};

export const clearLocalStorage = function () {
	localStorage.clear();
};

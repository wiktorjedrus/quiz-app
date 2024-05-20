const API_KEY = "WjkH0p1AamUVV0LWUTYPGSk5iBgb3ULwOnNdjDkj";

export const fetchCategoryQuestions = async function (category, tag) {
	try {
		// Fetch a larger set of questions initially
		const response = await fetch(
			`https://quizapi.io/api/v1/questions?category=${category}&tags=${tag}&difficulty=Easy&apiKey=${API_KEY}`
		);

		const json = await response.json();

		// Filter questions to include only those with multiple_correct_answers set to "false"
		const filteredQuestions = json.filter(
			question => question.multiple_correct_answers === "false"
		);

		// Return only the first 5 valid questions
		return filteredQuestions.slice(0, 5);
	} catch (err) {
		throw new Error("Failed to fetch");
	}
};

/** @format */
import axios from "axios";

export function formatReadableDate(dateString, lang) {
	const options = {
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	};
	const date = new Date(dateString);
	return date.toLocaleString(lang === "en" ? "en-US" : "es-ES", options);
}

export async function translateString(inputString) {
	const sourceLanguage = "en";
	const targetLanguage = "es";

	try {
		const response = await axios.get(
			`https://api.mymemory.translated.net/get?q=${encodeURIComponent(
				inputString
			)}&langpair=${sourceLanguage}|${targetLanguage}`
		);

		const translatedText =
			response.data.responseData.translatedText || inputString;
		return translatedText;
	} catch (error) {
		console.error("Error translating:", error);
		return inputString;
	}
}

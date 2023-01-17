const EMAIL_REGEX =
	/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const ALIAS_REGEX = /\+[^@]*@/;

const removeAlias = (email) => {
	return email.replace(ALIAS_REGEX, "@");
};

const existsInLocalStorage = (key) => {
	return !(localStorage.getItem(key) === null);
};

const setMessage = (messageComponent, message) => {
	messageComponent.textContent = message;
	messageComponent.classList.remove("hide");
};

const clearMessage = (messageComponent) => {
	messageComponent.textContent = "";
	messageComponent.classList.add("hide");
};

const clearForm = (form) => {
	const inputs = form.querySelectorAll("input");
	inputs.forEach((input) => (input.value = ""));

	const validationMessages = form.querySelectorAll(".validation-msg");
	validationMessages.forEach((validationMessage) =>
		clearMessage(validationMessage)
	);
};

const closeDialog = (dialog) => {
	dialog.classList.add("hide");
};

const removeDuplicates = (arr) => {
	return [...new Set(arr)];
};

const formatDate = (date) => {
	const dateObj = new Date(date);

	return dateObj.toLocaleDateString("pl-PL", {
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
	});
};

const getTransactionsDates = (transactions) => {
	let dates = transactions.map((transaction) => transaction.date);
	dates = removeDuplicates(dates);
	dates.sort();

	return dates;
};

const hash = (phrase) => {
	let phraseArr = [];

	for (let i = 0; i < phrase.length; i++) {
		phraseArr[i] = phrase.charCodeAt(i) * i * i;
	}

	const total = phraseArr.reduce((acc, value) => acc + value);

	return total.toString(16);
};

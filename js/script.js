let mockTransactions = [];
let mockTransactionTypes = [];
let transactionTypes = {};
let transactionsData = [];

const fetchMockData = async () => {
	try {
		const res = await fetch("../data.json");
		const data = await res.json();
		return data;
	} catch (error) {
		console.error(error);
	}
};

const setMockData = async () => {
	mockTransactions = [];
	mockTransactionTypes = [];
	try {
		const mockDataArr = await fetchMockData();
		mockDataArr.forEach((mockData) => {
			mockTransactions.push(mockData.transactions);
			mockTransactionTypes.push(mockData.transacationTypes);
		});
	} catch (error) {
		console.error(error);
	}
};

setMockData();

const contents = document.querySelectorAll("section");
const routes = [];
contents.forEach((content) => routes.push(content.id));

const navMain = document.querySelector(".nav-main");
const navLogged = document.querySelector(".nav-logged");
const userNameSpan = document.querySelector(".nav-logged span");
const logoutLink = document.querySelector("#logout-link");
const loginLink = document.querySelector("#login-link");
const registerLink = document.querySelector("#register-link");

const loggedUserId = localStorage.getItem("logged");
let loggedUser = JSON.parse(localStorage.getItem(loggedUserId));

// Login variables
let loginForm = document.querySelector("#login-form");
const loginBtn = document.querySelector("#login-btn");
let loginUserNameEmail = document.querySelector("#login-user-name-or-email");
let loginPassword = document.querySelector("#login-password");
const loginUserNameMsg = document.querySelector(
	"#login-user-name-validation-msg"
);
const loginPasswordMsg = document.querySelector(
	"#login-password-validation-msg"
);
const registerDialog = document.querySelector("#login .dialog");
const registerDialogText = registerDialog.querySelector("p");
const registerDialogCancelBtn = registerDialog.querySelector("#cancel");
const registerDialogRegisterBtn = registerDialog.querySelector("#register");

// Registration variables
let registerForm = document.querySelector("#register-form");
const registerBtn = document.querySelector("#register-btn");
let registrationUserName = document.querySelector("#registration-user-name");
let registrationPassword = document.querySelector("#registration-password");
let registrationEmail = document.querySelector("#registration-email");
let registrationConfirmEmail = document.querySelector(
	"#registration-confirm-email"
);
const registrationUserNameMsg = document.querySelector(
	"#registration-user-name-validation-msg"
);
const registrationPasswordMsg = document.querySelector(
	"#registration-password-validation-msg"
);
const registrationEmailMsg = document.querySelector(
	"#registration-email-validation-msg"
);
const registrationConfirmEmailMsg = document.querySelector(
	"#registration-confirm-email-validation-msg"
);

//user view variables
const userViewMessage = document.querySelector("#user h1");
const userCharts = document.querySelector(".charts");
const userTransactions = document.querySelector(".transactions");
let chart1 = document.querySelector("#chart1");
let chart2 = document.querySelector("#chart2");
const tableData = document.querySelector(".transactions tbody");
const transactionDetailsDialog = document.querySelector("section#user .dialog");
const transactionDetailsDialogExitBtn =
	transactionDetailsDialog.querySelector(".exit-btn");
const transactionDetailsDialogDate =
	transactionDetailsDialog.querySelector("#transaction-date");
const transactionDetailsDialogDescription =
	transactionDetailsDialog.querySelector("#transaction-description");
const transactionDetailsDialogAmount = transactionDetailsDialog.querySelector(
	"#transaction-amount"
);
const transactionDetailsDialogBalance = transactionDetailsDialog.querySelector(
	"#transaction-balance"
);
const transactionDetailsDialogType =
	transactionDetailsDialog.querySelector("#transaction-type");
const transactionDetailsDialogTypeIcon = transactionDetailsDialog.querySelector(
	"#transaction-type-icon"
);

// Setting views
const setContent = (id) => {
	contents.forEach((content) => {
		if (content.id === id) {
			content.classList.remove("hide");
		} else {
			content.classList.add("hide");
		}
	});
};

const setNavbar = (id) => {
	if (id === "user") {
		navMain.classList.add("hide");
		navLogged.classList.remove("hide");
	} else {
		navMain.classList.remove("hide");
		navLogged.classList.add("hide");

		switch (id) {
			case "login":
				loginLink.classList.add("hide");
				registerLink.classList.remove("hide");
				break;
			case "register":
				loginLink.classList.remove("hide");
				registerLink.classList.add("hide");
				break;
			default:
				loginLink.classList.remove("hide");
				registerLink.classList.remove("hide");
		}
	}
};

const setView = (id) => {
	if (!routes.includes(id) || (id === "user" && loggedUser === null)) {
		window.location.href = "#page-not-found";
	} else if (id === "user") {
		setUserData();
	}

	setContent(id);
	setNavbar(id);
};

const locationHandler = () => {
	let location = window.location.hash.replace("#", "");
	if (location === "") {
		location = "home";
	}

	if (loggedUser !== null && location === "home") {
		userNameSpan.textContent = loggedUser.userName;
		location = "user";
	}

	if (!registerDialog.classList.contains("hide")) {
		registerDialog.classList.add("hide");
	} else {
		clearForm(registerForm);
	}

	clearForm(loginForm);
	transactionDetailsDialog.classList.add("hide");

	setView(location);
};

// Message setting
const setMessage = (messageComponent, message) => {
	messageComponent.textContent = message;
	messageComponent.classList.remove("hide");
};

const clearMessage = (messageComponent) => {
	messageComponent.textContent = "";
	messageComponent.classList.add("hide");
};

// Validation
const validateRegistrationUserName = () => {
	const min = 6;
	const max = 16;

	if (registrationUserName.value === "") {
		setMessage(
			registrationUserNameMsg,
			"Nazwa użytkownika nie może być pusta."
		);
	} else if (registrationUserName.value.length < min) {
		setMessage(
			registrationUserNameMsg,
			"Nazwa użytkownika musi mieć przynajmniej 6 znaków."
		);
	} else if (registrationUserName.value.length > max) {
		setMessage(
			registrationUserNameMsg,
			"Nazwa użytkownika nie może być dłuższa niż 16 znaków."
		);
	} else if (!/^[A-Za-z0-9]*$/.test(registrationUserName.value)) {
		setMessage(
			registrationUserNameMsg,
			"Nazwa użytkownika może składać się tylko z liter lub cyfr."
		);
	} else if (isExistInLocalStorage(registrationUserName.value)) {
		setMessage(
			registrationUserNameMsg,
			"Ta nazwa użytkownika jest już zajęta."
		);
	} else {
		clearMessage(registrationUserNameMsg);
		return true;
	}

	return false;
};

const validateRegistrationPassword = () => {
	const min = 6;

	if (registrationPassword.value.length < min) {
		setMessage(
			registrationPasswordMsg,
			"Hasło musi mieć przynajmniej 6 znaków."
		);
	} else {
		clearMessage(registrationPasswordMsg);
		return true;
	}
};

const validateRegistrationEmail = () => {
	if (registrationEmail.value === "") {
		setMessage(registrationEmailMsg, "Email nie może być pusty.");
	} else if (
		!registrationEmail.value.match(
			/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		)
	) {
		setMessage(registrationEmailMsg, "Nieprawidłowy format email.");
	} else if (isExistInLocalStorage(registrationEmail.value)) {
		setMessage(registrationEmailMsg, "Ten adres email jest już zajęty");
	} else {
		clearMessage(registrationEmailMsg);
		return true;
	}

	return false;
};

const validateRegistrationConfirmEmail = () => {
	if (registrationConfirmEmail.value === "") {
		setMessage(
			registrationConfirmEmailMsg,
			"Pole potwierdź email nie może być puste."
		);
	} else if (registrationConfirmEmail.value !== registrationEmail.value) {
		setMessage(
			registrationConfirmEmailMsg,
			"Adresy email muszą być takie same."
		);
	} else {
		clearMessage(registrationConfirmEmailMsg);
		return true;
	}

	return false;
};

const validateLoginEmailorUserName = () => {
	if (loginUserNameEmail.value === "") {
		setMessage(
			loginUserNameMsg,
			"Pole email lub nazwa użytkownika nie może być puste."
		);
	} else if (!isExistInLocalStorage(loginUserNameEmail.value)) {
		setMessage(loginUserNameMsg, "Taki użytkownik nie istnieje.");
		if (
			loginUserNameEmail.value.match(
				/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			)
		) {
			registerDialog.classList.remove("hide");
			registerDialogText.textContent = `Na adres email ${loginUserNameEmail.value} nie ma zarejestrowanego żadnego użytkownika. Czy chcesz zarejestrować nowego użytkownika na ten adres?`;
		}
	} else {
		clearMessage(loginUserNameMsg);
		return true;
	}

	return false;
};

const validateLoginPassword = () => {
	if (loginPassword.value === "") {
		setMessage(loginPasswordMsg, "Hasło nie może być puste");
	} else {
		clearMessage(loginPasswordMsg);
		return true;
	}

	return false;
};

// Checikng if key exists in localStorage
const isExistInLocalStorage = (key) => {
	return !(localStorage.getItem(key) === null);
};

//Login/logout
const checkLoginPassword = (userId) => {
	const password = JSON.parse(localStorage.getItem(userId)).password;

	return password === loginPassword.value;
};

const login = (userId) => {
	localStorage.setItem("logged", userId);
	loggedUser = JSON.parse(localStorage.getItem(userId));
	userNameSpan.textContent = loggedUser.userName;

	window.location.href = "#user";
};

const logout = () => {
	loggedUser = null;
	localStorage.removeItem("logged");
	userNameSpan.textContent = "";
	transactionsData = [];
	transactionTypes = {};
	while (tableData.firstChild) {
		tableData.removeChild(element.firstChild);
	}
	console.log(transactionsData);
	console.log(tableData);
	window.location.href = "#";
};

const clearForm = (form) => {
	let inputs = form.querySelectorAll("input");
	inputs.forEach((input) => (input.value = ""));

	const validationMessages = form.querySelectorAll(".validation-msg");
	validationMessages.forEach((validationMessage) =>
		clearMessage(validationMessage)
	);
};

const closeDialog = (dialog) => {
	dialog.classList.add("hide");
};

const goToRegistration = () => {
	registrationEmail.value = loginUserNameEmail.value;
	window.location.href = "#register";
};

const handleRegisterBtn = () => {
	const validation = [];
	validation.push(validateRegistrationUserName());
	validation.push(validateRegistrationPassword());
	validation.push(validateRegistrationEmail());
	validation.push(validateRegistrationConfirmEmail());

	if (!validation.includes(false)) {
		const newUser = {
			userName: registrationUserName.value,
			email: registrationEmail.value,
			password: registrationPassword.value,
			dataId: "",
		};

		if (window.localStorage.length > 0) {
			newUser.dataId = 1;
			//newUser.dataId = Math.round(Math.random() * mockTransactions.length);
		} else {
			newUser.dataId = -1;
		}

		localStorage.setItem(newUser.email, JSON.stringify(newUser));
		localStorage.setItem(newUser.userName, newUser.email);
		login(newUser.email);
	}
};

const handleLoginBtn = () => {
	const validation = [];
	let userId;

	validation.push(validateLoginEmailorUserName());
	validation.push(validateLoginPassword());

	if (!validation.includes(false)) {
		if (
			loginUserNameEmail.value.match(
				/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			)
		) {
			userId = loginUserNameEmail.value;
		} else {
			userId = localStorage.getItem(loginUserNameEmail.value);
		}

		if (checkLoginPassword(userId)) {
			login(userId);
		} else {
			setMessage(loginPasswordMsg, "Hasło jest nieprawidłowe.");
		}
	}
};
// user data
const fetchUserData = async () => {
	try {
		const res = await fetch("https://api.npoint.io/38edf0c5f3eb9ac768bd");
		const data = await res.json();
		return data;
	} catch (error) {
		console.error(error);
	}
};

const setUserData = async () => {
	if (loggedUser.dataId < 0) {
		try {
			const data = await fetchUserData();
			transactionsData = data.transactions;
			transactionTypes = data.transacationTypes;
		} catch (error) {
			console.error(error);
		}
	} else {
		transactionsData = mockTransactions[loggedUser.dataId];
		transactionTypes = mockTransactionTypes[loggedUser.dataId];
	}

	if (transactionsData.length > 0) {
		createTableData(transactionsData);
		userViewMessage.classList.add("hide");
		userCharts.classList.remove("hide");
		tableData.classList.remove("hide");
	} else {
		userViewMessage.textContent = `Użytkownik ${loggedUser.userName} nie ma jeszcze żadnych transakcji.`;
		userViewMessage.classList.remove("hide");
		userCharts.classList.add("hide");
		tableData.classList.add("hide");
	}
};

// user View
const removeDuplicates = (arr) => {
	return [...new Set(arr)];
};

const formatDate = (date) => {
	const dateObjc = new Date(date);

	return dateObjc.toLocaleDateString("pl-PL", {
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
	});
};

const createTransactionCell = (transactionProperty, transaction) => {
	const transactionCell = document.createElement("td");
	transactionCell.classList.add(transactionProperty);
	if (transactionProperty === "date") {
		transactionCell.textContent = formatDate(transaction[transactionProperty]);
	} else if (transactionProperty === "type") {
		const icon = document.createElement("i");
		icon.classList.add("fa-solid");
		const type = transactionTypes[transaction[transactionProperty]];
		switch (type) {
			case "Wpływy - inne":
				icon.classList.add("fa-arrow-right-to-bracket");
				break;
			case "Wydatki - zakupy":
				icon.classList.add("fa-cart-shopping");
				break;
			case "Wpływy - wynagrodzenie":
				icon.classList.add("fa-money-bills");
				break;
			case "Wydatki - inne":
				icon.classList.add("fa-arrow-up-from-bracket");
				break;
		}

		transactionCell.appendChild(icon);
	} else if (
		transactionProperty === "amount" ||
		transactionProperty === "balance"
	) {
		transactionCell.textContent = `${transaction[transactionProperty]
			.toString()
			.replace(".", ",")} PLN`;
	} else if (transactionProperty === "description") {
		const descriptionP = document.createElement("p");
		descriptionP.textContent = transaction[transactionProperty];
		const descriptionTypeP = document.createElement("p");
		descriptionTypeP.classList.add("description-type");
		descriptionTypeP.textContent = transactionTypes[transaction.type];

		transactionCell.appendChild(descriptionP);
		transactionCell.appendChild(descriptionTypeP);
	}

	return transactionCell;
};

const createTransactionRow = (transaction) => {
	const transactionRow = document.createElement("tr");
	transactionRow.classList.add("transaction-row");
	const properties = ["date", "type", "description", "amount", "balance"];
	const cells = [];
	properties.forEach((property) =>
		cells.push(createTransactionCell(property, transaction))
	);

	cells.forEach((cell) => transactionRow.appendChild(cell));

	return transactionRow;
};

const createDateRow = (date) => {
	const dateRow = document.createElement("tr");
	const dateCell = document.createElement("th");
	dateCell.classList.add("mobile-date");
	dateCell.colSpan = "5";
	dateCell.textContent = formatDate(date);
	dateRow.appendChild(dateCell);

	return dateRow;
};

const createTableData = (transactions) => {
	let dates = transactions.map((transaction) => transaction.date);
	dates = removeDuplicates(dates);
	dates.sort().reverse();

	dates.forEach((date) => {
		tableData.appendChild(createDateRow(date));

		transactions.forEach((transaction) => {
			if (transaction.date === date) {
				const index = transactions.indexOf(transaction);
				const newRow = createTransactionRow(transaction);
				newRow.addEventListener("click", () => {
					if (window.innerWidth < 769) {
						showTransactionDetails(newRow);
					}
				});
				tableData.appendChild(newRow);
			}
		});
	});
};

const showTransactionDetails = (row) => {
	transactionDetailsDialogDate.textContent =
		row.querySelector("td.date").textContent;
	transactionDetailsDialogDescription.textContent =
		row.querySelector("td.description p").textContent;
	transactionDetailsDialogAmount.textContent =
		row.querySelector("td.amount").textContent;
	transactionDetailsDialogBalance.textContent =
		row.querySelector("td.balance").textContent;
	transactionDetailsDialogTypeIcon.className =
		row.querySelector("td.type i").className;
	transactionDetailsDialogType.textContent = row.querySelector(
		"td.description .description-type"
	).textContent;

	transactionDetailsDialog.classList.remove("hide");
};

window.addEventListener("hashchange", locationHandler);
//window.addEventListener("load", locationHandler);
window.addEventListener("DOMContentLoaded", locationHandler);

registerBtn.addEventListener("click", handleRegisterBtn);
loginBtn.addEventListener("click", handleLoginBtn);
logoutLink.addEventListener("click", logout);
registerDialogRegisterBtn.addEventListener("click", goToRegistration);
registerDialogCancelBtn.addEventListener("click", () =>
	closeDialog(registerDialog)
);
transactionDetailsDialogExitBtn.addEventListener("click", () =>
	closeDialog(transactionDetailsDialog)
);

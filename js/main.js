let mockTransactions = [];
let mockTransactionTypes = [];
let transactionTypes = {};
let transactionsData = [];

const setMockData = (dataArr) => {
	mockTransactions = [];
	mockTransactionTypes = [];

	dataArr.forEach((data) => {
		mockTransactions.push(data.transactions);
		mockTransactionTypes.push(data.transacationTypes);
	});
};

const routes = [];
contents.forEach((content) => routes.push(content.id));

const previousLoggedUserId = localStorage.getItem("logged");
let loggedUser = JSON.parse(localStorage.getItem(previousLoggedUserId));

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
		userNameSpan.textContent = loggedUser.userName;
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

const handleLocation = () => {
	let location = window.location.hash.replace("#", "");
	if (
		(location === "login" || location === "register") &&
		loggedUser !== null
	) {
		location = "user";
		window.location.href = "#user";
	}
	if (location === "") {
		location = "home";
	}

	if (loggedUser !== null && location === "home") {
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

//Login/logout
const login = (userId) => {
	if (loggedUser !== null) logout();
	loggedUser = JSON.parse(localStorage.getItem(userId));
	localStorage.setItem("logged", userId);

	window.location.href = "#user";
};

const logout = () => {
	localStorage.removeItem("logged");
	loggedUser = null;
	userNameSpan.textContent = "";
	transactionsData = [];
	transactionTypes = {};
	clearTableData();
	destroyCharts();
};

const checkLoginPassword = (userId) => {
	const password = JSON.parse(localStorage.getItem(userId)).password;

	return password === hash(loginPassword.value);
};

const goToRegistration = () => {
	registrationEmail.value = loginUserNameEmail.value;
	window.location.href = "#register";
};

const handleRegisterBtn = () => {
	const validation = [
		validateRegistrationUserName(),
		validateRegistrationPassword(),
		validateRegistrationEmail(),
		validateRegistrationConfirmEmail(),
	];

	if (!validation.includes(false)) {
		const newUser = {
			userName: registrationUserName.value,
			email: removeAlias(registrationEmail.value),
			password: hash(registrationPassword.value),
			dataId: "",
		};

		if (window.localStorage.length > 0) {
			newUser.dataId = Math.floor(Math.random() * mockTransactions.length);
		} else {
			newUser.dataId = -1;
		}

		localStorage.setItem(newUser.email, JSON.stringify(newUser));
		localStorage.setItem(newUser.userName, newUser.email);
		login(newUser.email);
	}
};

const handleLoginBtn = () => {
	const validation = [validateLoginEmailorUserName(), validateLoginPassword()];

	if (!validation.includes(false)) {
		let userId;
		if (loginUserNameEmail.value.match(EMAIL_REGEX)) {
			userId = removeAlias(loginUserNameEmail.value);
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
		createPieChart(transactionsData, transactionTypes);
		createBarChart(transactionsData);
		createTableData(transactionsData);
		userViewMessage.classList.add("hide");
		userCharts.classList.remove("hide");
		userTransactions.classList.remove("hide");
	} else {
		userViewMessage.textContent = `Użytkownik ${loggedUser.userName} nie ma jeszcze żadnych transakcji.`;
		userViewMessage.classList.remove("hide");
		userCharts.classList.add("hide");
		userTransactions.classList.add("hide");
		clearTableData();
		destroyCharts();
	}
};

window.addEventListener("hashchange", handleLocation);
window.addEventListener("DOMContentLoaded", handleLocation);

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

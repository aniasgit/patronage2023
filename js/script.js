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
if (loggedUserId !== null) {
	userNameSpan.textContent = loggedUser.userName;
	window.location.href = "#user";
}

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

// Setting views
const setContent = (id) => {
	contents.forEach((content) => {
		if (content.id === id) {
			if (id === "user" && loggedUser == null) {
				// dopisać coś ładniejszego
				console.log("brak zalogowanego użytkownika");
			} else {
				content.classList.remove("hide");
			}
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
	if (!routes.includes(id)) {
		id = "page-not-found";
	}

	setContent(id);
	setNavbar(id);
};

const locationHandler = () => {
	let location = window.location.hash.replace("#", "");
	if (location === "") {
		location = "home";
	}

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
		setMessage(registrationUserNameMsg, "Nazwa użytkownika nie może być pusta");
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
		registrationEmail.value.match(
			/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		)
	) {
		clearMessage(registrationEmailMsg);
		return true;
	} else {
		setMessage(registrationEmailMsg, "Nieprawidłowy format email.");
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
		// Dorób propozycje rejestracji
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
	localStorage.removeItem("logged");
	loggedUser = null;
	userNameSpan.textContent = "";
};

const clearForm = (form) => {
	let inputs = form.querySelectorAll("input");
	inputs.forEach((input) => (input.value = ""));

	const validationMessages = form.querySelectorAll(".validation-msg");
	validationMessages.forEach((validationMessage) =>
		clearMessage(validationMessage)
	);
};

const handleRegisterBtn = () => {
	const validation = [];
	validation.push(validateRegistrationUserName());
	validation.push(validateRegistrationPassword());
	validation.push(validateRegistrationEmail());
	validation.push(validateRegistrationConfirmEmail());

	if (isExistInLocalStorage(registrationEmail.value)) {
		setMessage(registrationEmailMsg, "Ten adres email jest już zajęty");
		validation.push(false);
	} else {
		clearMessage(registrationEmailMsg);
	}

	if (isExistInLocalStorage(registrationUserName.value)) {
		setMessage(
			registrationUserNameMsg,
			"Ta nazwa użytkownika jest już zajęta."
		);
		validation.push(false);
	} else {
		clearMessage(registrationUserNameMsg);
	}

	if (!validation.includes(false)) {
		const newUser = {
			userName: registrationUserName.value,
			email: registrationEmail.value,
			password: registrationPassword.value,
		};

		localStorage.setItem(newUser.email, JSON.stringify(newUser));
		localStorage.setItem(newUser.userName, newUser.email);
		login(newUser.email);
		clearForm(registerForm);
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
			clearForm(loginForm);
		} else {
			setMessage(loginPasswordMsg, "Hasło jest nieprawidłowe.");
		}
	}
};

window.addEventListener("hashchange", locationHandler);
window.addEventListener("load", locationHandler);

registerBtn.addEventListener("click", handleRegisterBtn);
loginBtn.addEventListener("click", handleLoginBtn);
logoutLink.addEventListener("click", logout);

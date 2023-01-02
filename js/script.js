const contents = document.querySelectorAll("section");
const routes = [];
contents.forEach((content) => routes.push(content.id));

const navMain = document.querySelector(".nav-main");
const navLogged = document.querySelector(".nav-logged");
const loginLink = document.querySelector("#login-link");
const registerLink = document.querySelector("#register-link");

// Registration variables
const registerBtn = document.querySelector("#register-btn");
const registrationUserName = document.querySelector("#registration-user-name");
const registrationUserNameMsg = document.querySelector(
	"#registration-user-name-validation-msg"
);
const registrationPassword = document.querySelector("#registration-password");
const registrationPasswordMsg = document.querySelector(
	"#registration-password-validation-msg"
);
const registrationEmail = document.querySelector("#registration-email");
const registrationEmailMsg = document.querySelector(
	"#registration-email-validation-msg"
);
const registrationConfirmEmail = document.querySelector(
	"#registration-confirm-email"
);
const registrationConfirmEmailMsg = document.querySelector(
	"#registration-confirm-email-validation-msg"
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

// Validation
const validateRegistrationUserName = () => {
	const min = 6;
	const max = 16;

	registrationUserNameMsg.classList.remove("hide");

	if (registrationUserName.value === "") {
		registrationUserNameMsg.textContent =
			"Nazwa użytkownika nie może być pusta.";
	} else if (registrationUserName.value.length < min) {
		registrationUserNameMsg.textContent =
			"Nazwa użytkownika musi mieć przynajmniej 6 znaków.";
	} else if (registrationUserName.value.length > max) {
		registrationUserNameMsg.textContent =
			"Nazwa użytkownika nie może być dłuższa niż 16 znaków.";
	} else if (!/^[A-Za-z0-9]*$/.test(registrationUserName.value)) {
		registrationUserNameMsg.textContent =
			"Nazwa użytkownika może składać się tylko z liter lub cyfr.";
	} else {
		registrationUserNameMsg.classList.add("hide");
		return true;
	}

	return false;
};

const validateRegistrationPassword = () => {
	const min = 6;

	if (registrationPassword.value.length < min) {
		registrationPasswordMsg.textContent =
			"Hasło musi mieć przynajmniej 6 znaków";
		registrationPasswordMsg.classList.remove("hide");
		return false;
	} else {
		registrationPasswordMsg.classList.add("hide");
		return true;
	}
};

const validateRegistrationEmail = () => {
	if (registrationEmail.value === "") {
		registrationEmailMsg.textContent = "Email nie może być pusty.";
		registrationEmailMsg.classList.remove("hide");
	} else if (
		registrationEmail.value.match(
			/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		)
	) {
		registrationEmailMsg.classList.add("hide");
		return true;
	} else {
		registrationEmailMsg.textContent = "Nieprawidłowy format email.";
		registrationEmailMsg.classList.remove("hide");
	}

	return false;
};

const validateRegistrationConfirmEmail = () => {
	if (registrationConfirmEmail.value === "") {
		registrationConfirmEmailMsg.textContent =
			"Pole potwierdź email nie może być puste.";
		registrationConfirmEmailMsg.classList.remove("hide");
	} else if (registrationConfirmEmail.value !== registrationEmail.value) {
		registrationConfirmEmailMsg.textContent =
			"Adresy email muszą być takie same.";
		registrationConfirmEmailMsg.classList.remove("hide");
	} else {
		registrationConfirmEmailMsg.classList.add("hide");
		return true;
	}

	return false;
};

const handleRegisterBtn = () => {
	const validation = [];
	validation.push(validateRegistrationUserName());
	validation.push(validateRegistrationPassword());
	validation.push(validateRegistrationEmail());
	validation.push(validateRegistrationConfirmEmail());

	console.log(validation);
	if (!validation.includes(false)) console.log("Idziemy dalej");
};

window.addEventListener("hashchange", locationHandler);
window.addEventListener("load", locationHandler);

registerBtn.addEventListener("click", handleRegisterBtn);

// login form validation
const validateLoginEmailorUserName = () => {
	if (loginUserNameEmail.value === "") {
		setMessage(
			loginUserNameMsg,
			"Pole email lub nazwa użytkownika nie może być puste."
		);
	} else if (!existsInLocalStorage(loginUserNameEmail.value)) {
		setMessage(loginUserNameMsg, "Taki użytkownik nie istnieje.");
		if (loginUserNameEmail.value.match(EMAIL_REGEX)) {
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

//register form validation
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
			`Nazwa użytkownika musi mieć przynajmniej ${min} znaków.`
		);
	} else if (registrationUserName.value.length > max) {
		setMessage(
			registrationUserNameMsg,
			`Nazwa użytkownika nie może być dłuższa niż ${max} znaków.`
		);
	} else if (!/^[A-Za-z0-9]*$/.test(registrationUserName.value)) {
		setMessage(
			registrationUserNameMsg,
			"Nazwa użytkownika może składać się tylko z liter lub cyfr."
		);
	} else if (existsInLocalStorage(registrationUserName.value)) {
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
			`Hasło musi mieć przynajmniej ${min} znaków.`
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
	} else if (existsInLocalStorage(registrationEmail.value)) {
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

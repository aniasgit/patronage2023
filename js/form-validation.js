// login form validation
const validateLoginEmailorUserName = () => {
	if (loginUserNameEmail.value === "") {
		setMessage(
			loginUserNameMsg,
			"Pole email lub nazwa użytkownika nie może być puste."
		);
	} else if (!existsInLocalStorage(removeAlias(loginUserNameEmail.value))) {
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
	} else if (!/^[A-Za-z0-9\-_[\]\\\/]*$/.test(registrationUserName.value)) {
		setMessage(
			registrationUserNameMsg,
			"Nazwa użytkownika może składać się tylko z liter lub cyfr lub znaków -_[]\\/."
		);
	} else if (!checkLetters(registrationUserName.value)) {
		setMessage(
			registrationUserNameMsg,
			"Nazwa użytkownika musi składać się przynajmniej z 5 liter."
		);
	} else if (!checkNumbers(registrationUserName.value)) {
		setMessage(
			registrationUserNameMsg,
			"Nazwa użytkownika musi składać się przynajmniej z 1 cyfry."
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
	} else if (!registrationEmail.value.match(EMAIL_REGEX)) {
		setMessage(registrationEmailMsg, "Nieprawidłowy format email.");
	} else if (existsInLocalStorage(removeAlias(registrationEmail.value))) {
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

const checkLetters = (phrase) => {
	const minLettersQuantity = 5;
	let lettersQuantity = 0;
	for (char of phrase) {
		if (char.match(/[a-zA-Z]/)) {
			lettersQuantity++;
		}
	}

	return lettersQuantity >= minLettersQuantity;
};

const checkNumbers = (phrase) => {
	const minNumbersQuantity = 1;
	let numbersQuantity = 0;

	for (char of phrase) {
		if (char.match(/[0-9]/)) {
			numbersQuantity++;
		}
	}

	return numbersQuantity >= minNumbersQuantity;
};

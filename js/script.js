const contents = document.querySelectorAll("section");

const navMain = document.querySelector(".nav-main");
const navLogged = document.querySelector(".nav-logged");

const setContent = (id) => {
	contents.forEach((content) => {
		if (content.id === id) {
			content.classList.remove("hide");
		} else {
			content.classList.add("hide");
		}
	});
};

const setNavbar = (location) => {
	if (location === "#user") {
		navMain.classList.add("hide");
		navLogged.classList.remove("hide");
	} else {
		navMain.classList.remove("hide");
		navLogged.classList.add("hide");
	}
};

const homeView = () => {
	setContent("home");
};

const loginView = () => {
	setContent("login");
};

const registerView = () => {
	setContent("register");
};

const userView = () => {
	setContent("user");
};

const pageNotFoundView = () => {
	setContent("page-not-found");
};

const locationHandler = () => {
	const location = window.location.hash;

	setNavbar(location);

	switch (location) {
		case "":
			homeView();
			break;
		case "#login":
			loginView();
			break;
		case "#register":
			registerView();
			break;
		case "#user":
			userView();
			break;
		default:
			pageNotFoundView();
	}

	console.log(location);
};

window.addEventListener("hashchange", locationHandler);

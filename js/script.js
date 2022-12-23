const contents = document.querySelectorAll("section");
const routes = [];
contents.forEach((content) => routes.push(content.id));

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

const setNavbar = (id) => {
	if (id === "user") {
		navMain.classList.add("hide");
		navLogged.classList.remove("hide");
	} else {
		navMain.classList.remove("hide");
		navLogged.classList.add("hide");
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

window.addEventListener("hashchange", locationHandler);
window.addEventListener("load", locationHandler);

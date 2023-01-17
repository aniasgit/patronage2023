const contents = document.querySelectorAll("section");

// navbar elements
const navMain = document.querySelector(".nav-main");
const navLogged = document.querySelector(".nav-logged");
const userNameSpan = document.querySelector(".nav-logged span");
const logoutLink = document.querySelector("#logout-link");
const loginLink = document.querySelector("#login-link");
const registerLink = document.querySelector("#register-link");

// login view elements
const loginForm = document.querySelector("#login-form");
const loginBtn = document.querySelector("#login-btn");
const loginUserNameEmail = document.querySelector("#login-user-name-or-email");
const loginPassword = document.querySelector("#login-password");
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

// registration view elements
const registerForm = document.querySelector("#register-form");
const registerBtn = document.querySelector("#register-btn");
const registrationUserName = document.querySelector("#registration-user-name");
const registrationPassword = document.querySelector("#registration-password");
const registrationEmail = document.querySelector("#registration-email");
const registrationConfirmEmail = document.querySelector(
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

//user view elements
const userViewMessage = document.querySelector("#user h1");
const userCharts = document.querySelector(".charts");
const userTransactions = document.querySelector(".transactions");
const pieChartCanvas = document.querySelector("#pie-chart");
const barChartCanvas = document.querySelector("#bar-chart");
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

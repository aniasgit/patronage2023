const MIN_DESKTOP_WIDTH = 769;

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
	} else {
		transactionCell.textContent = transaction[transactionProperty];
		console.log(transaction[transactionProperty]);
	}
	console.log(transactionCell);
	return transactionCell;
};

const createTransactionRow = (transaction) => {
	const transactionRow = document.createElement("tr");
	transactionRow.classList.add("transaction-row");
	const properties = [
		"date",
		"type",
		"sender-receiver",
		"description",
		"amount",
		"balance",
	];
	const cells = properties.map((property) => {
		if (transaction[property] !== undefined) {
			return createTransactionCell(property, transaction);
		} else {
			let temporaryTransaction = {};
			temporaryTransaction[property] = "nieznany";
			return createTransactionCell(property, temporaryTransaction);
		}
	});
	console.log(cells);

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
	const dates = getTransactionsDates(transactions).reverse();

	dates.forEach((date) => {
		tableData.appendChild(createDateRow(date));

		transactions.forEach((transaction) => {
			if (transaction.date === date) {
				const newRow = createTransactionRow(transaction);
				newRow.addEventListener("click", () => {
					if (window.innerWidth < MIN_DESKTOP_WIDTH) {
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
	transactionDetailsDialogSenderReceiver.textContent =
		row.querySelector("td.sender-receiver").textContent;
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

const clearTableData = () => {
	while (tableData.firstChild) {
		tableData.removeChild(tableData.firstChild);
	}
};

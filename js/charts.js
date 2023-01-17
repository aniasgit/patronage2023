let pieChart;
let barChart;

const setPieChartData = (transactions, transacationTypes) => {
	const typesColors = {
		1: "rgb(120, 222, 120)",
		2: "rgb(255, 105, 86)",
		3: "rgb(109, 200, 29)",
		4: "rgb(255, 99, 132)",
	};

	const types = Object.keys(transacationTypes);
	const labels = [];
	const colors = [];
	const data = [];

	let transactionsQuantities = {};
	types.forEach((type) => (transactionsQuantities[type] = 0));

	transactions.forEach((transaction) => {
		transactionsQuantities[transaction.type]++;
	});

	for (const property in transactionsQuantities) {
		if (transactionsQuantities[property] > 0) {
			labels.push(transacationTypes[property]);
			data.push(transactionsQuantities[property]);
			colors.push(typesColors[property]);
		}
	}

	return {
		labels: labels,
		datasets: [
			{
				label: "Liczba transakcji",
				data: data,
				backgroundColor: colors,

				hoverOffset: 4,
			},
		],
	};
};

const setPieChartConfig = (data) => {
	return {
		type: "pie",
		data: data,
		options: {
			layout: {
				padding: 15,
			},
			aspectRatio: 2,
			plugins: {
				title: {
					display: false,
					text: "Transakcje według typów",
					font: {
						size: 20,
					},
				},
				legend: {
					display: true,
					position: "right",
					align: "center",
					labels: {
						boxWidth: 15,
						font: {
							size: 10,
						},
					},
				},
			},
		},
	};
};
const createPieChart = (transactions, transactionTypes) => {
	const pieChartData = setPieChartData(transactions, transactionTypes);
	const pieChartConfig = setPieChartConfig(pieChartData);
	pieChart = new Chart(pieChartCanvas, pieChartConfig);
};

const setBarChartData = (transactions) => {
	const dates = getTransactionsDates(transactions);
	const formatDates = dates.map((date) => formatDate(date));

	dates.reverse();

	let nextTransactionIndex = 0;
	const balances = dates.map((date) => {
		for (let i = nextTransactionIndex; i < transactions.length; i++) {
			if (date === transactions[i].date) {
				nextTransactionIndex = i + 1;
				return transactions[i].balance;
			}
		}
	});
	balances.reverse();

	const backgroundColors = balances.map((balance) => {
		if (balance < 0) {
			return "rgba(255, 99, 132, 0.2)";
		} else if (balance > 0) {
			return "rgba(75, 192, 192, 0.2)";
		} else return "rgb(0, 0, 0)";
	});

	const borderColors = balances.map((balance) => {
		if (balance < 0) {
			return "rgb(255, 99, 132)";
		} else if (balance > 0) {
			return "rgb(75, 192, 192)";
		} else return "rgb(0, 0, 0)";
	});

	return {
		labels: formatDates,
		datasets: [
			{
				label: "Saldo w PLN",
				data: balances,
				backgroundColor: backgroundColors,
				borderColor: borderColors,
				borderWidth: 1,
			},
		],
	};
};

const setBarChartConfig = (data) => {
	return {
		type: "bar",
		data: data,
		options: {
			scales: {
				y: {
					beginAtZero: true,
					grid: {
						color: function (context) {
							if (context.tick.value === 0) {
								return "#000000";
							} else {
								return Chart.defaults.borderColor;
							}
						},
					},
				},
			},

			plugins: {
				legend: {
					display: false,
				},
			},
		},
	};
};

const createBarChart = (transactions) => {
	const barChartData = setBarChartData(transactions);
	const barChartConfig = setBarChartConfig(barChartData);
	barChart = new Chart(barChartCanvas, barChartConfig);
};

const destroyCharts = () => {
	pieChart.destroy();
	barChart.destroy();
};

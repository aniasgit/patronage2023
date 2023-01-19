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

	const dailyBalances = {};

	transactions.forEach((transaction) => {
		if (dailyBalances.hasOwnProperty(transaction.date)) {
			dailyBalances[transaction.date] += transaction.amount;
		} else {
			dailyBalances[transaction.date] = transaction.amount;
		}
	});

	console.log(dailyBalances);
	const data = dates.map((date) => dailyBalances[date]);
	console.log(data);

	const backgroundColors = data.map((balance) => {
		if (balance < 0) {
			return "rgba(255, 99, 132, 0.2)";
		} else if (balance > 0) {
			return "rgba(75, 192, 192, 0.2)";
		} else return "rgb(0, 0, 0)";
	});

	const borderColors = data.map((balance) => {
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
				label: "Bilans dzienny w PLN",
				data: data,
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
				x: {
					display: true,
					position: "bottom",
				},
				y: {
					display: true,
					grid: {
						color: function (context) {
							if (context.tick.value === 0) {
								return "#000000";
							} else {
								return Chart.defaults.borderColor;
							}
						},
						lineWidth: function (context) {
							if (context.tick.value === 0) {
								return 2;
							} else {
								return 1;
							}
						},
					},
					ticks: {
						beginAtZero: true,
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
	if (pieChart !== undefined) {
		pieChart.destroy();
	}
	if (barChart !== undefined) {
		barChart.destroy();
	}
};

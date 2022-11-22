"use strict"

// Выход из личного кабинета
const logOut = new LogoutButton();
logOut.action = () => {
	ApiConnector.logout(() => {
		if (true) {
			location.reload();
		}
	});
}

// Получение информации о пользователе
ApiConnector.current(response => {
	if (response.success) {
		ProfileWidget.showProfile(response.data);
	}
});

// Получение текущих курсов валюты
const ratesBoard = new RatesBoard();
function currencyExchange() {
	ApiConnector.getStocks(response => {
		if (response.success) {
			ratesBoard.clearTable();
			ratesBoard.fillTable(response.data);
		}
	});
}
currencyExchange();
setInterval(() => {
	currencyExchange();
}, 60000);


/* Операции с деньгами */
const moneyManage = new MoneyManager();

// пополнение баланса
moneyManage.addMoneyCallback = data => {
	ApiConnector.addMoney(data, response => {
		if (response.success) {
			ProfileWidget.showProfile(response.data);
			moneyManage.setMessage(response.success, 'Пополнение счета прошло успешно');
		}
		else {
			moneyManage.setMessage(response.success, response.error);
		}
	});
}

//  конвертирование валюты
moneyManage.conversionMoneyCallback = data => {
	ApiConnector.convertMoney(data, response => {
		if (response.success) {
			ProfileWidget.showProfile(response.data);
			moneyManage.setMessage(response.success, 'конвертация денежных средств прошла успешно');
		}
		else {
			moneyManage.setMessage(response.success, response.error);
		}
	});
}

// перевод валюты
moneyManage.sendMoneyCallback = data => {
	ApiConnector.transferMoney(data, response => {
		console.log(data);
		if (response.success) {
			ProfileWidget.showProfile(response.data);
			moneyManage.setMessage(response.success, 'перевод денежных средств прошел успешно');
		}
		else {
			moneyManage.setMessage(response.success, response.error);
		}
	});
}

/* Работа с избранным */
const favorite = new FavoritesWidget();

// начальный список избранного
ApiConnector.getFavorites(response => {
	if (response.success) {
		favorite.clearTable();
		favorite.fillTable(response.data);
		moneyManage.updateUsersList(response.data);
	}
})

// добавление пользователя в список избранных
favorite.addUserCallback = data => {
	ApiConnector.addUserToFavorites(data, response => {
		if (response.success) {
			favorite.clearTable();
			favorite.fillTable(response.data);
			moneyManage.updateUsersList(response.data);
		}
	});
}

// удаление пользователя из избранного
favorite.removeUserCallback = data => {
	ApiConnector.removeUserFromFavorites(data, response => {
		if (response.success) {
			favorite.clearTable();
			favorite.fillTable(response.data);
			moneyManage.updateUsersList(response.data);
		}
	});
}
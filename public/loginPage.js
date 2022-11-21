"use strict"
const userForm = new UserForm();
userForm.loginFormCallback = data => {
	let login = data.login;
	let password = data.password;

	ApiConnector.login({ login, password }, response => {
		if (response.success) {
			location.reload()
		}
		else {
			userForm.setLoginErrorMessage(response.error);
		}
	});
}

// не совсем понял что значит "деструктурировать объект data на поля" поиск в гугл привел на статью в learnjavascript по Деструктуризации объекта
// и теперь выполнил так
// userForm.registerFormCallback = data => {
// 	let {login, password} = data;

// 	ApiConnector.register(login, password, response => {
// 		if (response.success) {
// 			location.reload()
// 		}
// 		else {
// 			userForm.setRegisterErrorMessage(response.error);
// 		}
// 	});
// }

// а еще так
userForm.registerFormCallback = data => {

	ApiConnector.register(data.login, data.password, response => {
		if (response.success) {
			location.reload()
		}
		else {
			userForm.setRegisterErrorMessage(response.error);
		}
	});
}




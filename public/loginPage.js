"use strict"
const userForm = new UserForm();

// авторизация пользователя
userForm.loginFormCallback = data => {
	ApiConnector.login(data, response => {
		response.success ? location.reload() : userForm.setLoginErrorMessage(response.error);
	});
}

// регистрация пользователя
userForm.registerFormCallback = data => {
	ApiConnector.register(data, response => {
		response.success ? location.reload() : userForm.setRegisterErrorMessage(response.error);
	});
}




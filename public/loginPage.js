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

userForm.registerFormCallback = data => {
	let login = data.login;
	let password = data.password;

	ApiConnector.register({ login, password }, response => {
		if (response.success) {
			location.reload()
		}
		else {
			userForm.setRegisterErrorMessage(response.error);
		}
	});
}




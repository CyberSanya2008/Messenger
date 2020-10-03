const request = require("request");
const requests = require("request-promise");
const fs = require("fs");

// Получение данных пользователя из формы с регистрацией и отправка на сервер
function SignUp() {
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  // Отправка данных для регистарции на сервер
  request.post(
    "http://127.0.0.1:5000/registration",
    {
      json: {
        name: name,
        email: email,
        password: password,
      },
    },
    (error, res, body) => {
      if (error) {
        console.error(error);
        return;
      }
      console.log(`statusCode: ${res.statusCode}`);
      console.log(body);
      if (body == "Error") {
      } else {
        let name = document.getElementById("name").value;
        
        let current_user = {
          email: email,
          name: name,
          password: password,
        };

        let data = JSON.stringify(current_user);
        fs.writeFileSync("current_user.json", data);
        window.location.href = "../main_page/Profile/profile.html";
      }
    }
  );
}

// Функция отправки данных для авторизации
function Login() {
  let email = document.getElementById("email_login").value;
  let password = document.getElementById("password_login").value;

  const options = {
    method: "GET",
    uri: "http://127.0.0.1:5000/profile/" + email + "/" + password,
  };
  requests(options)
    .then(function (response) {
      // Запрос на сервер
      if (response == "error") {
        console.log("error");
      } else {
        // Запись данных пользователя в файл после авторизации
        // в случае успешной авторизации

        let current_user = {
          email: email,
          name: response,
          password: password,
        };

        let data = JSON.stringify(current_user);
        fs.writeFileSync("current_user.json", data);

        // Переход на страницу пользователя
        window.location.href = "../main_page/Profile/profile.html";
      }
    })
    .catch(function (err) {
      // Произошло что-то плохое, обработка ошибки
    });
}

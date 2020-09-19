const request = require("request");
const requests = require("request-promise");
const fs = require("fs");

// Получение данных пользователя из формы с регистрацией и отправка на сервер
function GetUserRegistrationData() {
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
    }
  );
}

// Функция отправки данных для авторизации
function LoginUser() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

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
        let current_user = {
          email: email,
          password: password,
        };

        let data = JSON.stringify(current_user);
        fs.writeFileSync("current_user.json", data);
      }
    })
    .catch(function (err) {
      // Произошло что-то плохое, обработка ошибки
    });
}

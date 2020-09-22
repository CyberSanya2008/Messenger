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
        // в случае успешной авторизации
        let current_user = {
          email: email,
          name: response,
          password: password,
        };

        let data = JSON.stringify(current_user);
        fs.writeFileSync("current_user.json", data);

        // Переход на страницу пользователя
        window.location.href = "profile.html";
      }
    })
    .catch(function (err) {
      // Произошло что-то плохое, обработка ошибки
    });
}

function CheckAuth() {
  if (fs.readFileSync("current_user.json")) {
    window.location.href = "profile.html";
  }
}

function ShowProfileName() {
  let rawdata = fs.readFileSync("current_user.json");
  let user = JSON.parse(rawdata);
  let username = document.getElementById("UserName");
  let username2 = document.getElementById("UserName2");
  username.innerHTML = user.name;
  username2.innerHTML = user.name;
}

function SendMessage() {
  let rawdata = fs.readFileSync("current_user.json");
  let user = JSON.parse(rawdata);

  let reciever = document.getElementById("reciever").value;
  let message_text = document.getElementById("message_text").value;

  request.post(
    "http://127.0.0.1:5000/sendmessage",
    {
      json: {
        sender: user.email,
        reciever: reciever,
        message_text: message_text,
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

function ShowMessages() {
  let rawdata = fs.readFileSync("current_user.json");
  let user = JSON.parse(rawdata);

  const options = {
    method: "GET",
    uri:
      "http://127.0.0.1:5000/profile/" +
      user.email +
      "/" +
      user.password +
      "/messages",
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
        window.location.href = "profile.html";
      }
    })
    .catch(function (err) {
      // Произошло что-то плохое, обработка ошибки
    });
}

function ShowDialogs() {
  let rawdata = fs.readFileSync("current_user.json");
  let user = JSON.parse(rawdata);

  const options = {
    method: "GET",
    uri:
      "http://127.0.0.1:5000/profile/dialogs/" +
      user.email +
      "/" +
      user.password,
  };
  requests(options)
    .then(function (response) {
      // Запрос на сервер
      if (response == "error") {
        console.log("error");
      } else {
        // Запись данных пользователя в файл после авторизации
        // в случае успешной авторизации

        let data = JSON.parse(response)

        let username = document.getElementById("leftbox");
        username.innerHTML = "<h1>" + data[1];
        

        console.log(JSON.parse(response));
      }
    })
    .catch(function (err) {
      // Произошло что-то плохое, обработка ошибки
    });
}

const request = require("request");

// Получение данных пользователя из формы с регистрацией и отправка на сервер
function GetUserRegistrationData() {
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  

  // Отправка данных на сервер
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

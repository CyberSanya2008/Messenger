function showDialogs() {
  let rawdata = fs.readFileSync("current_user.json");
  let user = JSON.parse(rawdata);

  let users = document.getElementById("users");

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
        let data = JSON.parse(response);
        for (let i = 0; i < data.length; i++) {
          console.log(data[i]);
          let element = document.createElement("div");
          element.innerHTML = `<h1>${data[i]}</h1>`;
          users.append(element);
        }
      }
    })
    .catch(function (err) {
      // Произошло что-то плохое, обработка ошибки
    });
}

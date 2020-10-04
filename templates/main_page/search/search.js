const requests = require("request-promise");

let delayTimer;

function Search() {
  let search = document.getElementById("search");
  let rawdata = fs.readFileSync("current_user.json");
  let user = JSON.parse(rawdata);
  const options = {
    method: "GET",
    uri:
      "http://127.0.0.1:5000/" +
      user.email +
      "/" +
      user.password +
      "/users/" +
      search.value,
  };
  clearTimeout(delayTimer);
  delayTimer = setTimeout(function () {
    requests(options)
      .then(function (response) {
        // Запрос на сервер
        if (response == "error") {
          console.log("error");
        } else {
          let data = JSON.parse(response);

          console.log(data);
        }
      })
      .catch(function (err) {
        // Произошло что-то плохое, обработка ошибки
      });
  }, 500);
}

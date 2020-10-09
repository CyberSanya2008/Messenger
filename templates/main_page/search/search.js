const requests = require("request-promise");

let delayTimer;
function Search() {
  let search = document.getElementById("search");
  let rawdata = fs.readFileSync("current_user.json");
  let list = document.getElementById("list");

  let btn = document.getElementById("more");
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
          list.innerHTML = "";
          let i = 0;
          let more = 9;
          

          for (i; i < 10; i++) {
            let liFirst = document.createElement("li");
            liFirst.innerHTML = `<a href="#" id="modal">${data[i]}<br><div class="send_msg">Написать Сообщение</div></a>`;

            if (data[i] != undefined) {
              list.append(liFirst);
            }
          }

          document.getElementById("more").onclick = function () {
            for (let i = 0; i < 10; i++) {
              more++;
              let show_more = document.createElement("li");
              show_more.innerHTML = `<a href="#" >${data[more]}</a><h1>JOPA</h1>`;
              if (data[more] != undefined) {
                list.append(show_more);
              }
            }
          };
        }
      })
      .catch(function (err) {
        // Произошло что-то плохое, обработка ошибки
      });
  }, 500);
}

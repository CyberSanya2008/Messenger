const requests = require("request-promise");
const request = require("request");


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
            liFirst.innerHTML = `<a href="#" id="modal" value=${data[i]} onclick=Create_Dialog('${data[i]}')>${data[i]} <br><div class="send_msg">Написать Сообщение</div></a>`;

            if (data[i] != undefined) {
              list.append(liFirst);
            }
          }

          document.getElementById("more").onclick = function () {
            for (let i = 0; i < 10; i++) {
              more++;
              let show_more = document.createElement("li");
              show_more.innerHTML = `<a href="#" >${data[more]}</a>`;
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

function Create_Dialog(e) {
  let rawdata = fs.readFileSync("current_user.json");
  let user = JSON.parse(rawdata);

  // Отправка данных для регистарции на сервер
  request.post(
    "http://127.0.0.1:5000/create-dialog",
    {
      json: {
        user1: user.email,
        user2: e,
      },
    },
    (error, res, body) => {
      if (error) {
        console.error(error);
        return;
      }
      if (body == "Error") {
      } else {
        window.location.href = "../messages/messages.html";
      }
    }
  );

  console.log(e);
}

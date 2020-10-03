const fs = require("fs");

function CheckAuth() {
  let rawdata = fs.readFileSync("current_user.json");
  let user = JSON.parse(rawdata);
  if (user.name == 0) {
    window.location.href = "../login_signup/login_signup.html";
  } else {
    window.location.href = "../main_page/Profile/profile.html";
  }
}

const fs = require("fs");

function logout() {
  let logout = {
    email: 0,
    name: 0,
    password: 0,
  };

  let data = JSON.stringify(logout);
  fs.writeFileSync("current_user.json", data);
  window.location.href = "../../login_signup/login_signup.html";
}

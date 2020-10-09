function ShowProfileName() {
  let rawdata = fs.readFileSync("current_user.json");
  let user = JSON.parse(rawdata);
  let username = document.getElementById("UserName");
  username.innerHTML = user.name;
  
}

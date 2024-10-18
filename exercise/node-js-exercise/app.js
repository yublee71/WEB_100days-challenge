// const userName = "Yubeen";
// console.log(userName);

/* ------without express ------*/

// function handleRequest(request, response) {
//   if (request.url == "/currenttime") {
//     response.statusCode = 200;
//     response.end("<h1>" + new Date().toISOString() + "</h1>");
//   } else {
//     response.statusCode = 200;
//     response.end("<h1>Hello World</h1>");
//   }
// }

// const http = require("http");
// const server = http.createServer(handleRequest);
// server.listen(3000);

/* ------with express ------*/
const fs = require("fs");
const path = require("path");
const express = require("express"); //returns a function
const app = express(); //returns an object, conventional name app for nodejs server
app.use(express.urlencoded({ extended: false })); //translate requests form data to js objects

app.get("/currenttime", function (req, res) {
  res.send("<h1>" + new Date().toISOString() + "</h1>");
}); //handles localhost:3000/currenttime

app.get("/", function (req, res) {
  res.send(
    '<form action="/store-user" method="POST"><label>Your Name: </label><input type="text" name="username"><button>submit</button></form>'
  );
}); //handles localhost:3000/

app.post("/store-user", function (req, res) {
  const userName = req.body.username;
  const filePath = path.join(__dirname, "data", "users.json"); //built-in variable
  const fileData = fs.readFileSync(filePath); //text
  const existingUsers = JSON.parse(fileData); //to js object or array
  existingUsers.push(userName);
  fs.writeFileSync(filePath, JSON.stringify(existingUsers)); //perform write action instantly, back to text
  res.send("<h1>Username stored!</h1>");
});

app.get("/stored-users", function (req, res) {
  const filePath = path.join(__dirname, "data", "users.json");
  const fileData = fs.readFileSync(filePath);
  const users = JSON.parse(fileData);
  let responseData = "<ul>";
  for (const user of users) {
    responseData += "<li>" + user + "</li>";
  }
  responseData += "</ul>";
  res.send(responseData);
});

app.listen(3000);

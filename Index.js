// const http = require("http");
// const fs = require("fs");

// const express = require("express");

// const app = express();

// app.get("/", (res, req) => {
//   return res.send(`Hello  ${req.query.name} + this is home page`);
// });

// app.get("/about", (res, req) => {
//   return res.send(`Hy this is ${req.query.name} + this is about page`);
// });

// app.listen(8000, () => {
//   console.log("server started");
// });

// // (req, res) => {
// //   const log = `${Date.now()} : ${req.url} New Req Recevied\n`;
// //   console.log("server responsS");
// //   fs.appendFile("log.txt", log, (err, date) => {
// //     switch (req.url) {
// //       case "/":
// //         res.end("This is Home Page");
// //         break;
// //       case "/about":
// //         res.end("This is About Page");
// //         break;
// //       case "/contact":
// //         res.end("This is contact Page");
// //         break;
// //       default:
// //         res.end("404 Not found");
// //     }
// //   });
// // }

// // const Server = http.createServer(app);

// // Server.listen(8000, () => console.log("Server Started"));

const express = require("express");
const app = express();
const users = require("./MOCK_DATA.json");
const fs = require("fs");

const PORT = 8000;

app.use(express.urlencoded({ extended: false }));

// Route

app.get("/api/users/", (req, res) => {
  return res.json(users);
});

app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const finduser = users.find((user) => user.id === id);
    return res.json(finduser);
  })
  .patch((req, res) => {
    // const body = req.body
    return res.json({ status: "Pending" });
  })
  .delete((req, res) => {
    const deletuser = req.body;
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
      return res.json();
    });
    return res.json({ status: "Pending" });
  });

app.post("/api/users", (req, res) => {
  const body = req.body;
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.json(users);
  });
  // console.log("added data", body);
});

app.listen(PORT, () => {
  console.log("server get started");
});

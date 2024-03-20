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

// const users = require("./MOCK_DATA.json");

const userRouter = require("./Routes/user");

const { connectMongoDb } = require("./connection");
const express = require("express");
const { logReqres } = require("./midlewares");
const app = express();

const PORT = 8000;

// middleware plugin
app.use(express.urlencoded({ extended: false }));
// connect

app.use(logReqres("log.txt"));

connectMongoDb("mongodb://127.0.0.1:27017/first-database").then(() =>
  console.log("mongodb connected")
);
// mongoose
//   .connect("mongodb://127.0.0.1:27017/first-database")
//   .then(() => console.log("mongodb connected"))
//   .catch((err) => console.log("Mongo Error", err));

app.use("/api/users", userRouter);

app.listen(PORT, () => {
  console.log("server get started");
});

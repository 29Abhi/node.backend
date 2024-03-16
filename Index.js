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
// const users = require("./MOCK_DATA.json");
const fs = require("fs");

const mongoose = require("mongoose");

const PORT = 8000;

app.use(express.urlencoded({ extended: false }));
// connect
mongoose
  .connect("mongodb://127.0.0.1:27017/first-database")
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log("Mongo Error", err));

// schema
const useSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      require: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    jobTitle: {
      type: String,
    },
    gender: {
      type: String,
    },
  },
  { timestamps: true }
);

// modal
const User = mongoose.model("user", useSchema);

// Route

app.get("/users", async (req, res) => {
  const allDbuser = await User.find({});
  const html = `
  <ul>
  ${allDbuser.map((user) => `<li>${user.firstName}</li>`).join("")}
  </ul>
  `;
  return res.send(html);
});

app
  .route("/api/users/:id")
  .get(async (req, res) => {
    // const id = Number(req.params.id);
    // const finduser = users.find((user) => user.id === id);
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "user not found" });
    return res.json(user);
  })
  .patch(async (req, res) => {
    // const body = req.body
    await User.findByIdAndUpdate(req.params.id, {
      lastName: "BSDK",
    });
    return res.json(user);
  })
  .delete((req, res) => {
    const deletuser = req.body;
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
      return res.json();
    });
    return res.json({ status: "Pending" });
  });

app.post("/api/users", async (req, res) => {
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.job_title
  ) {
    return req.status(400).json({ msg: "All field are req.." });
  }
  const result = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    gender: body.gender,
    jobTitle: body.job_title,
  });
  console.log("result", result);
  return res.status(201).json({ msg: "Succes" });
});

// app.post("/api/users", (req, res) => {
//   const body = req.body;
//   users.push({ ...body, id: users.length + 1 });
//   fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
//     return res.json(users);
//   });
//   // console.log("added data", body);
// });

app.listen(PORT, () => {
  console.log("server get started");
});

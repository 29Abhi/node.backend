const express = require("express");

const router = express.Router();
const {
  handelgetallusers,
  Getuserbyid,
  Handelgetupdate,
  Deletuser,
  Createnewuser,
} = require("../Controllers/user");

// Route

router.route("/").get(handelgetallusers).post(Createnewuser);

router.route("/:id").get(Getuserbyid).patch(Handelgetupdate).delete(Deletuser);

module.exports = router;

// app.post("/api/users", (req, res) => {
//   const body = req.body;
//   users.push({ ...body, id: users.length + 1 });
//   fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
//     return res.json(users);
//   });
//   // console.log("added data", body);
// });

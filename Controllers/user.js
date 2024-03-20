const User = require("../Models/user");

async function handelgetallusers(req, res) {
  const allDbuser = await User.find({});
  const html = `
      <ul>
      ${allDbuser.map((user) => `<li>${user.firstName}</li>`).join("")}
      </ul>
      `;
  return res.send(html);
}

async function Getuserbyid(req, res) {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ error: "user not found" });
  return res.json(user);
}

async function Handelgetupdate(req, res) {
  await User.findByIdAndUpdate(req.params.id, {
    lastName: "BSDK",
  });
  return res.json(user);
}

async function Deletuser(req, res) {
  // const deletuser = req.body;
  // fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
  //   return res.json();
  // });
  await User.findByIdAndDelete(req.params.id);
  return res.json({ status: "succes" });
}

async function Createnewuser(req, res) {
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
  return res.status(201).json({ msg: "Succes", id: result._id });
}

module.exports = {
  handelgetallusers,
  Getuserbyid,
  Handelgetupdate,
  Deletuser,
  Createnewuser,
};

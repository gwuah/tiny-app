const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const User = require("./models/User");
const Role = require("./models/Role");

const app = express();

app.use(bodyParser.json());

async function AdminAuthorization(req, res, next) {
  const adminEmail = req.body.adminEmail;
  const user = await User.findOne({ email: adminEmail }).populate("role");

  if (user && user.role.name === "admin") {
    return next();
  } else {
    return res.json({ status: 401, message: "unauthorized" }).status(401);
  }
}

async function SeedDBWithUsers() {
  const adminEmail = "tonga@yahoo.com";
  let roleId = null;

  const role = await Role.findOne({ name: "admin" });

  if (!role) {
    let adminRole = new Role({
      name: "admin",
    });
    await adminRole.save();
    roleId = adminRole._id;
  } else {
    roleId = role._id;
  }

  const normalUserRole = await Role.findOne({ name: "normal_user" });

  if (!normalUserRole) {
    let normalUserRole = new Role({
      name: "normal_user",
    });
    await normalUserRole.save();
  }

  const user = await User.findOne({ email: adminEmail });

  if (!user) {
    let new_user = new User({
      name: "Mr Tonga",
      email: adminEmail,
      role: roleId,
    });
    await new_user.save();
  }
}

app.get("/users", async (req, res) => {
  const users = await User.find({});
  res.json(users).status(200);
});

app.post("/users", AdminAuthorization, async (req, res) => {
  const { body } = req;

  const normalUserRole = await Role.findOne({ name: "normal_user" });

  const new_user = await new User({
    name: body.name,
    role: normalUserRole.id,
  });

  await new_user.save();

  res.json({ user: new_user }).status(200);
});

mongoose
  .connect("mongodb://gwuah:gwuah2018@ds253871.mlab.com:53871/watcher", {
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("Connected to db");
    await SeedDBWithUsers();
    app.listen(4545, () => {
      console.log("server running on 4545");
    });
  })
  .catch((err) => {
    console.log(err);
  });

const User = require("../models/user");

exports.createOrUpdateUser = async (req, res) => {
  console.log(res.user,"crate update user")
  const { name, picture, email } = req.user;

  const user = await User.findOneAndUpdate(
    { email },
    { name: email.split("@")[0], picture },
    { new: true }
  );

  if (user) {
    console.log(user, "updated user");
    res.json(user);
  } else {
    const newUser = await new User({
      name: email.split("@")[0],
      picture,
      email,
    }).save();
    console.log(newUser, "save new user");
    res.json(newUser);
  }
};

exports.currentUser = async (req, res) => {
  User.findOne({ email: req.user.email }).exec((err, user) => {
    if (err) throw new Error(err);
    res.json(user);
  });
};

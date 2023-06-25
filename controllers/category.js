const Category = require("../models/category");
const Subs = require("../models/sub");
const slugify = require("slugify");
exports.create = async (req, res) => {
  try {
    console.log(req.body, "hellloooo>>>>>>>>");
    const { name } = req.body;
    const category = await Category({ name, slug: slugify(name) }).save();
    res.json(category);
  } catch (err) {
    res.status(400).send("create category failed");
  }
};
exports.list = async (req, res) => {
  const category = await Category.find({}).sort({ createAt: -1 }).exec();
  res.json(category);
};
exports.read = async (req, res) => {
  const category = await Category.findOne({ slug: req.params.slug }).exec();

  res.json(category);
};
exports.update = async (req, res) => {
  try {
    const { name } = req.body;
    // for updateing we use findoneandupdate, it check in database as req.params.slug and put name which we get as req.body from frontend , update its name and slug name inside the database
    const updated = await Category.findOneAndUpdate(
      { slug: req.params.slug },
      { name, slug: slugify(name) },
      { new: true }
    ).exec();
    res.json(updated);
  } catch (err) {
    console.log(err);
    res.status(400).send("Create update failed");
  }
};
exports.remove = async (req, res) => {
  try {
    const deleted = await Category.findOneAndDelete({
      slug: req.params.slug,
    }).exec();
    res.json(deleted);
  } catch (err) {
    console.log(err);
    res.status(400).send("Create delete failed");
  }
};

exports.getSubs = (req, res) => {
  Subs.find({ parent: req.params._id }).exec((err, subs) => {
    if (err) console.log(err);

    res.json(subs);
  });
};

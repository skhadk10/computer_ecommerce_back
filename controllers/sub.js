const Sub = require("../models/sub");
const slugify = require("slugify");
exports.create = async (req, res) => {
  try {
    console.log(req.body, "hellloooo>>>>>>>>");
    const { name,parent } = req.body;
    const sub = await Sub({ name,parent, slug: slugify(name) }).save();
    res.json(sub);
  } catch (err) {
    console.log("find me error on create sub>>>>>>>>>", err)
    res.status(400).send("create sub failed");
  }
};
exports.list = async (req, res) => {
  const sub = await Sub.find({}).sort({ createAt: -1 }).exec();
  res.json(sub);
};
exports.read = async (req, res) => {
  const sub = await Sub.findOne({ slug: req.params.slug }).exec();

  res.json(sub);
};
exports.update = async (req, res) => {
  try {
    const { name,parent } = req.body;
    // for updateing we use findoneandupdate, it check in database as req.params.slug and put name which we get as req.body from frontend , update its name and slug name inside the database
    const updated = await Sub.findOneAndUpdate(
      { slug: req.params.slug },
      { name,parent, slug: slugify(name) },
      { new: true }
    ).exec();
    res.json(updated);
  } catch (err) {
    console.log(err);
    res.status(400).send("Sub update failed");
  }
};
exports.remove = async (req, res) => {
  try {
    const deleted = await Sub.findOneAndDelete({
      slug: req.params.slug,
    }).exec();
    res.json(deleted);
  } catch (err) {
    console.log(err);
    res.status(400).send("Sub delete failed");
  }
};

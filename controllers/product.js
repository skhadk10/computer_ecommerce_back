const Product = require("../models/product");
const slugify = require("slugify");

exports.create = async (req, res) => {
  console.log("first");
  try {
    console.log(req.body, "hellooooo>>>>>>>>>>");
    req.body.slug = slugify(req.body.title);
    const newProduct = await new Product(req.body).save();
    res.json(newProduct);
  } catch (err) {
    console.log(err);
    // res.status(400).send("Create product failed");
    res.status(400).json({
      err: err.messages,
    });
  }
};

exports.listAll = async (req, res) => {
  let product = await Product.find({})
    .limit(parseInt(req.params.count))
    .populate("category")
    .populate("subs")
    .sort([["createdAt", "desc"]])
    .exec();
  res.json(product);
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Product.findOneAndRemove({
      slug: req.params.slug,
    }).exec();

    res.json(deleted);
  } catch (err) {
    return res.status(400).send("Product delete failed");
  }
};

exports.read = async (req, res) => {
  const product = await Product.findOne({
    slug: req.params.slug,
  })
    .populate("category")
    .populate("subs")
    .exec();

  res.json(product);
};

const { Schema, model } = require("mongoose");

const ArticleSchema = new Schema({
  headLine: String,
  subHead: String,
  content: String,
  category: String,
  author: {
    name: String,
    img: String,
  },
  cover: String,
});

module.exports = model("Article", ArticleSchema);

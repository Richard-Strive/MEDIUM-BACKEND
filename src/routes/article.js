const express = require("express");
const Article = require("./schema");
const route = express.Router();

/*

 GET /articles => returns the list of articles
    GET /articles/:id => returns a single article
    POST /articles => create a new article
    PUT /articles/:id => edit the article with the given id
    DELETE /articles/:id => delete the article with the given id

*/

route.get("/", async (req, res, next) => {
  try {
  } catch (error) {}
});
route.get("/:id", async (req, res, next) => {
  try {
  } catch (error) {}
});

route.post("/", async (req, res, next) => {
  try {
    const newArticle = new Article(req.body);
    await newArticle.save();

    const { _id } = newArticle;
    res.status(201).send(_id);
  } catch (error) {
    console.log(error);
  }
});
route.put("/:id", async (req, res, next) => {
  try {
  } catch (error) {}
});
route.delete("/:id", async (req, res, next) => {
  try {
  } catch (error) {}
});

module.exports = route;

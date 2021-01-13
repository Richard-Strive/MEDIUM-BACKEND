const express = require("express");
const mongoose = require("mongoose");
const Article = require("./schema");
const route = express.Router();

/*
    Your backend should now have the possibility to add a review to an
    article. Mongo's preferred data design should be to embed reviews into
    articles, therefore you should implement the following endpoints

    GET /articles/:id/reviews => returns all the reviews for the specified article OK
    GET /articles/:id/reviews/:reviewId => returns a single review for the specified article OK
    POST /articles/:id => adds a new review for the specified article OK
    PUT /articles/:id/reviews/:reviewId => edit the review belonging to the specified article OK
    DELETE /articles/:id/reviews/:reviewId => delete the review belonging to the specified article OK

*/

route.get("/", async (req, res, next) => {
  try {
    const artics = await Article.find();

    res.status(201).send(artics);
  } catch (error) {
    console.log(error);
  }
});
route.get("/:id", async (req, res, next) => {
  try {
    const artic = await Article.findById(req.params.id);

    res.status(201).send(artic);
  } catch (error) {
    console.log(error);
  }
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
    const modifiedArtic = await Article.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        runValidators: true,
        new: true,
      }
    );

    res.status(200).send(modifiedArtic);
  } catch (error) {
    console.log(error);
  }
});
route.delete("/:id", async (req, res, next) => {
  try {
    const deletedArtic = await Article.findByIdAndDelete(req.params.id);
    res.status(200).send("DELETED");
  } catch (error) {
    console.log(error);
  }
});

/*<------------------------------------------------- ----------------------------------- --------------------------------------> */

route.get("/:id/reviews", async (req, res, next) => {
  try {
    // Accedere articolo e poi prendere reviews
    const { reviews } = await Article.findById(req.params.id);

    res.status(201).send(reviews);
  } catch (error) {
    console.log(error);
  }
});

route.get("/:id/reviews/:id2", async (req, res, next) => {
  const reviewId = req.params.id2;
  try {
    // Accedere articolo e poi prendere reviews
    const { reviews } = await Article.findById(req.params.id, {
      _id: 0,
      reviews: {
        $elemMatch: { _id: mongoose.Types.ObjectId(req.params.id2) },
      },
    });

    if (reviews) {
      res.status(201).send(reviews);
    } else {
      console.log("error");
    }
  } catch (error) {
    console.log(error);
  }
});

route.delete("/:id/reviews/:id2", async (req, res, next) => {
  try {
    const reviewToDelete = await Article.findByIdAndUpdate(
      req.params.id,
      {
        $pull: {
          reviews: { _id: mongoose.Types.ObjectId(req.params.id2) },
        },
      },
      {
        new: true,
      }
    );

    res.send(reviewToDelete);
  } catch (error) {
    console.log(error);
  }
});
route.put("/:id/reviews/:id2", async (req, res, next) => {
  const reviewId = req.params.id2;
  try {
    // Accedere articolo e poi prendere reviews
    const { reviews } = await Article.findById(req.params.id, {
      _id: 0,
      reviews: {
        $elemMatch: { _id: mongoose.Types.ObjectId(req.params.id2) },
      },
    });

    if (reviews) {
      const updatedReview = { ...reviews[0].toObject(), ...req.body };

      modifiedReview = await Article.findByIdAndUpdate(
        {
          _id: mongoose.Types.ObjectId(req.params.id1),
          "reviews._id": mongoose.Types.ObjectId(req.params.id2),
        },
        { $set: { "reviews.$": updatedReview } },
        {
          runValidators: true,
          new: true,
        }
      );
      res.status(201).send(updatedReview);
    } else {
      console.log("error");
    }
  } catch (error) {
    console.log(error);
  }
});

route.post("/:id/reviews", async (req, res, next) => {
  try {
    // Prendo l'articolo by ID e push all'interno dell array corrispondente a reviews il mio req. body
    updateArticles = await Article.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          reviews: req.body,
        },
      },
      {
        runValidators: true,
        new: true,
      }
    );

    res.status(201).send(updateArticles);
  } catch (error) {
    console.log(error);
  }
});

module.exports = route;

/*

try {
    const modifiedBook = await UserModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: {
          purchaseHistory: { _id: mongoose.Types.ObjectId(req.params.bookId) },
        },
      },
      {
        new: true,
      }
    )
    res.send(modifiedBook)
  } catch (error) {
    console.log(error)
    next(error)
  }

*/

const express = require("express");
const router = express.Router();
const MyRecipe = require("../Models/recipe");
const recipeReview = require("../Models/recipereview");
const User = require("../Models/user");

router.get("/recipe", async (req, res) => {
  try {
    let {searcheddata} =req.query;
    // console.log(searcheddata)

    const filter = searcheddata||"";

    const recipe = await MyRecipe.find({
      $or: [
        { title: { "$regex": filter, "$options": "i" } }, 
        { author: { "$regex": filter, "$options": "i" } } 
      ]
    })
    
    res.status(200).json(recipe);
  } catch (e) {
    res.status(400).json({ msg: "Something Went Wrong!!!" });
  }
});

router.post("/recipe/add", async (req, res) => {
  try {
    const userid = req.user._id;

    console.log("Current user id:", req.user._id);
    const currentUser = await User.findById(req.user._id);

    if (!currentUser) {
      return res.status(404).json({ msg: "User not found" });
    }

    // console.log("Current user:", currentUser);

    const {
      recipeName,
      img,
      desc,
      cookingTime,
      calorie,
      ingredient,
      procedure,
    } = req.body;

    // console.log(req.body);

    const author = currentUser.username;
    const usermail = currentUser.email;

    const newRecipe = await MyRecipe.create({
      title: recipeName,
      image: img,
      body: desc,
      CookingTime: cookingTime,
      Calories: calorie,
      Ingredients: ingredient,
      Procedure: procedure,
      author,
      usermail,
      userid,
    });

    currentUser.recipes.push(newRecipe);

    await currentUser.save();

    // console.log("recipe saved to user recipe array")
    res.status(200).json({ msg: "Added Data Successfully" });
  } catch (e) {
    // console.log("hi");
    res.status(400).json({ msg: "Something Went Wrong!!!" });
  }
});

router.get("/recipe/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await MyRecipe.findById(id).populate("comment");
    res.status(200).json(recipe);
  } catch (e) {
    res.status(400).json({ msg: "Something Went Wrong!!!" });
  }
});

router.get("/recipe/:id/updaterecipe", async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await MyRecipe.findById(id);
    console.log("sare recipes aa jynge");
    res.status(200).json(recipe);
  } catch (e) {
    res.status(400).json({ msg: "somthing went wrong" });
  }
});
router.post("/recipe/:id/updaterecipe", (req, res) => {
  try {
    const { id } = req.params;
    const { title, image, CookingTime, Calories, Ingredients, Instruction } =
      req.body;
    const recipe = MyRecipe.findByIdAndUpdate(id, {
      title,
      image,
      CookingTime,
      Calories,
      Ingredients,
      Instruction,
    });
    console.log("sare recipes aa jynge");
    res.status(200).json(recipe);
  } catch (e) {
    res.status(400).json({ msg: "somthing went wrong" });
  }
});

router.post("/recipe/:id/review", async (req, res) => {
  try {
    const { id } = req.params;
    const recipee = await MyRecipe.findById(id);
    console.log(recipee);
    const { comment } = req.body;

    const newReview = await recipeReview.create({
      comment,
      user_id: req.user._id,
      username: req.user.username,
    });
    console.log(newReview);
    recipee.comment.push(newReview);
    recipee.save();

    res.status(201).json({ msg: "review added sucess" });
  } catch (e) {
    res.status(400).json({ msg: "error in adding Review" });
  }
});

module.exports = router;

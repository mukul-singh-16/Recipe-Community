const express = require("express");
const router = express.Router();
const MyBlog = require("../Models/blog");
const BlogComment = require("../Models/blogComment");
const User = require("../Models/user")




router.get("/blog", async (req, res) => {
  try {


    let {searcheddata} =req.query;


    // console.log("blogs finder")
    // console.log(searcheddata)



    const filter = searcheddata||"";


    const blog = await MyBlog.find({
      $or: [
        { title: { "$regex": filter, "$options": "i" } }, 
        { author: { "$regex": filter, "$options": "i" } } 
      ]
    });
    // const blog = await MyBlog.find();
    // console.log("sare blogs aa jynge");
    res.status(200).json(blog);
  } catch (e) {
    res.status(400).json({ msg: "Something Went Wrong!!!" });
  }
});

router.post("/blog/add", async (req, res) => {
  try {
    // console.log("Current user id:", req.user._id);
    const userid = req.user._id;
    const currentUser = await User.findById(req.user._id);

    if (!currentUser) {
      return res.status(404).json({ msg: "User not found" });
    }

    // console.log("Current user:", currentUser);

    const { blogName, img, desc } = req.body;
    const author = req.user.username;

    // Check if MyBlog model is imported correctly and defined
    console.log("Creating new blog...");
    const newBlog = await MyBlog.create({
      title: blogName,
      image: img,
      body: desc,
      author,
      userid,
    });

    // console.log("New blog created:", newBlog);

    // Push the new blog ID to the currentUser's blogs array
    currentUser.blogs.push(newBlog);

    // Save the currentUser to update the blogs array
    await currentUser.save();

    // console.log("Blog added to current user's blogs array.");

    res.status(201).json({ _id: newBlog._id });
  } catch (err) {
    console.error("Error adding blog:", err);
    res.status(400).json({ msg: "Something went wrong" });
  }
});




router.get("/blog/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await MyBlog.findById(id).populate("comment");
    res.status(200).json(blog);
  } catch (e) {
    res.status(400).json({ msg: "Something Went Wrong!!!" });
  }
});

router.get("/blog/:id/updateblog", async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await MyBlog.findById(id);
    console.log("sare blogs aa jynge");
    res.status(200).json(blog);
  } catch (e) {
    res.status(400).json({ msg: "somthing went wrong" });
  }
});
router.post("/blog/:id/updateblog", (req, res) => {
  try {
    const { id } = req.params;
    const { title, image, body } = req.body();
    const blog = MyBlog.findByIdAndUpdate(id, {
      title: title,
      image: image,
      body: body,
    });
    console.log("sare blogs aa jynge");
    res.status(200).json(blog);
  } catch (e) {
    res.status(400).json({ msg: "somthing went wrong" });
  }
});

router.post("/blog/:id/comment", async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await MyBlog.findById(id);
    const { comment } = req.body;

    const newComment = await BlogComment.create({
      comment,
      user_id: req.user._id,
      username: req.user.username,
    });

    // console.log(newComment)

    blog.comment.push(newComment);
    blog.save();

    res.status(201).json({ msg: "comment added sucess" });
  } catch (e) {
    res.status(400).json({ msg: "error in adding comments" });
  }
});

module.exports = router;

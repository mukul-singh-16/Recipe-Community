const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const seedDB = require("./seed");
const cookieSession = require("cookie-session");
const dotenv = require("dotenv").config();
const passport = require("passport");
const passportsetup = require("./passoprt");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mongourl = process.env.MONGO_URL;
// const mongourl = "mongodb://localhost:27017/recipeeee";
const port = process.env.PORT;

mongoose
  .connect(mongourl)
  .then(() => console.log("Connection Open!"))
  .catch((err) => console.log(err));

app.use(
  cookieSession({
    name: "session",
    keys: ["helloji"],
    maxAge: 24 * 60 * 60 * 100,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(cors({
  origin: 'https://recipe-community-frontend.vercel.app',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Credentials'],
  credentials: true // Allow cookies and credentials in cross-origin requests
}));


app.use((req, res, next) => {
  // console.log("req.user");
  // console.log(req.user);
  next();
});

//all routes
const BlogRoutes = require("./Routes/BlogRoutes");
const NormalRoutes = require("./Routes/NormalRoutes");
const RecipeRoutes = require("./Routes/RecipeRoutes");
const UserRoutes = require("./Routes/UserRoutes");

app.use(BlogRoutes);
app.use(NormalRoutes);
app.use(RecipeRoutes);
app.use(UserRoutes);

// seedDB();
app.listen(port, () => {
  console.log("conected to port 5000");
});

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv").config();
const cookieSession = require("cookie-session");
const passport = require("passport");
const passportSetup = require("./passport"); 
const seedDB = require("./seed");
const session = require('express-session');



// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Connect to MongoDB
const mongourl = process.env.MONGO_URL;
const port = process.env.PORT || 5000;

mongoose.connect(mongourl)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));



// const mongooseConnection = mongoose.connection;







// app.use(session({
//   secret: 'keyboard cat',
//   resave: false,
//   saveUninitialized: true,
//   maxAge: 24 * 60 * 60 * 100,
//   // cookie: { secure: true }
//   "cookie": {
//     "originalMaxAge": null,
//     "expires": null,
//     "httpOnly": true,
//     "path": "/"
//   }
// }))



// Session configuration with cookie settings
// app.use(session({
//   secret: 'keyboard cat',
//   resave: false,
//   saveUninitialized: true,
//   cookie: {
//     // domain: 'recipe-community-frontend.vercel.app', // Set the domain for the cookie
//     // path: '/',
//     // httpOnly: true, // Prevent access from JavaScript
//     // secure: true, // Ensures the cookie is only sent over HTTPS
//     // maxAge: 24 * 60 * 60 * 1000, // 24 hours
//     // sameSite: 'Strict', // CSRF protection
//   }
// }));


app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {
    domain: 'recipe-community-frontend.vercel.app',
    path: '/',
    httpOnly: true,
    secure: true, // Cookie only sent over HTTPS
    sameSite: 'Strict', // or 'Lax' if needed
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  }
}));



 



// Initialize passport
app.use(passport.initialize());
app.use(passport.session());



const allowedOrigins = [
  'https://recipe-community-frontend.vercel.app',
  'http://localhost:5173'
];


app.use(cors({
  origin: allowedOrigins,
  methods: "GET,POST,PUT,DELETE",
  credentials: true 
}));




// Example middleware for debugging or additional processing
app.use((req, res, next) => {
  console.log("Request user:", req.user); 
  next();
});



app.get('/sd', (req, res) => {
  // console.log('Session:', req.session);
  res.send(req.session);
});

// Import and use routes
const BlogRoutes = require("./Routes/BlogRoutes");
const NormalRoutes = require("./Routes/NormalRoutes");
const RecipeRoutes = require("./Routes/RecipeRoutes");
const UserRoutes = require("./Routes/UserRoutes");

app.use(BlogRoutes);
app.use(NormalRoutes);
app.use(RecipeRoutes);
app.use(UserRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
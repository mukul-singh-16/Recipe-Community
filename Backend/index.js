const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv").config();
const passport = require("passport");
const passportSetup = require("./passport"); // Corrected import statement
const seedDB = require("./seed");
const session = require('express-session');
const MongoStore = require('connect-mongo');


// Connect to MongoDB
const mongourl = process.env.MONGO_URL;
const port = process.env.PORT || 5000;

mongoose.connect(mongourl)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));



const mongooseConnection = mongoose.connection;


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // 1 week
    maxAge: 1000 * 60 * 60 * 24 * 7 * 1
  },
  store: new MongoStore({ 
    mongoUrl: mongourl, 
    mongooseConnection,
    useNewUrlParser: true,
    useUnifiedTopology: true
  }), // Use MongoDB to store sessions
}));



 



// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

const allowedOrigins = [
  'https://recipe-community-frontend.vercel.app',
  'http://localhost:5173'
];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  }
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200); // End the preflight request
  }

  next();
});


// Example middleware for debugging or additional processing
app.use((req, res, next) => {
  console.log("Request user:", req.user); 
  next();
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

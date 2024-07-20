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



// Configure cookie-session for session management
// app.use(cookieSession({
//   name: "session",
//   keys: ["bestsecrete"], // Use environment variable for security
//   maxAge: 24 * 60 * 60 * 1000, // Example: 1 day in milliseconds
// }));



// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Configure CORS
app.use(cors({
  origin: 'https://recipe-community-frontend.vercel.app',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true // Allow cookies and credentials in cross-origin requests
}));

// Example middleware for debugging or additional processing
app.use((req, res, next) => {
  console.log("Request user:", req.user); // Log the current user (if using passport)
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

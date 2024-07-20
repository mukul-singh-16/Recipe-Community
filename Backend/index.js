const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const dotenv = require("dotenv").config();
const passport = require("passport");
const passportSetup = require("./passport"); // Corrected import statement
const seedDB = require("./seed");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
const mongourl = process.env.MONGO_URL;
const port = process.env.PORT || 5000;

mongoose.connect(mongourl)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Configure express-session for session management
app.use(session({
  secret: process.env.SESSION_SECRET || "bestsecrete", // Use environment variable for security
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: mongourl }),
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, // Example: 1 day in milliseconds
    secure: process.env.NODE_ENV === 'production' // Set secure cookies in production
  }
}));

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

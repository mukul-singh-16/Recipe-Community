const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv").config();
const passport = require("passport");
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passportSetup = require("./passport"); // Ensure passport strategies are correctly configured
const app = express();

// Environment variables
const mongourl = process.env.MONGO_URL;
const port = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(mongourl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS Configuration
const allowedOrigins = [
  'https://recipe-community-frontend.vercel.app',
  'http://localhost:5173'
];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Allow credentials (cookies) to be sent
};

app.use(cors(corsOptions));

// Session Configuration
app.use(session({
  secret: 'your-secret-key', // Replace with your secret
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: mongourl }), // Persist sessions in MongoDB
  cookie: {
    secure: false, // Set to true if using https in production
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24, // 1 day
  }
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Debugging middleware to check user session
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

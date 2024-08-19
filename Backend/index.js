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
const cookieParser = require('cookie-parser');







app.use(cookieParser());
// const MongoStore = require('connect-mongo');


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



app.use(
  cookieSession({
    name: "session",
    keys: ["helloji"],
    maxAge: 24 * 60 * 60 * 100, // 24 hours
    secure: true, // Set to true for HTTPS on Vercel
    sameSite: "Lax", // Adjust according to your needs
    httpOnly: true,
  })
);

// app.use((req, res, next) => {
//   res.set("Cache-Control", "no-cache, no-store, must-revalidate");
//   next();
// });


// app.use(session({
//   secret: 'yourSecretKey',
//   resave: false,
//   saveUninitialized: false,
//   cookie: {
//     secure: false, // Set to true if using HTTPS in production
//     sameSite: 'None', // Set to 'Lax' if not cross-origin
//     httpOnly: true,
//     maxAge: 24 * 60 * 60 * 1000 // 1 day in milliseconds
//   }
// }));


// try {
//   app.use(session({
//     secret: 'yourSecretKey',
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       secure: false, // Set to true if using HTTPS in production
//       sameSite: 'Lax', // Set to 'None' if cross-origin
//       httpOnly: true,
//       maxAge: 24 * 60 * 60 * 1000 // 1 day in milliseconds
//     }
//   }));
// } catch (err) {
//   console.error('Error setting up session:', err);
// }



 



// Initialize passport
app.use(passport.initialize());
app.use(passport.session());



const allowedOrigins = [
  'https://recipe-community-frontend.vercel.app',
  'http://localhost:5173'
];


app.use(cors({
  origin: allowedOrigins,
  credentials: true 
}));


// Example middleware for debugging or additional processing
app.use((req, res, next) => {
  console.log("Request user:", req.user); 
  next();
});



app.get('/', (req, res) => {
  console.log('Session:', req.session);
  res.send('Hello World!');
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
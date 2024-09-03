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
const MongoStore = require('connect-mongo');



// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Connect to MongoDB
const mongourl = process.env.MONGO_URL;
const port = process.env.PORT || 5000;

mongoose.connect(mongourl)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));
  
 



// const mongooseConnection = mongoose.connection;











app.use(session({
  store: MongoStore.create({
    mongoUrl:mongourl,
    ttl: 24 * 60 * 60 
  }),
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true,  // Cookie will only be sent over HTTPS
    sameSite: 'None',  // Allows cross-site cookies
    httpOnly: false,  // Cookie cannot be accessed via JavaScript
  },
  proxy: true  // Trust the `X-Forwarded-*` headers set by the reverse proxy
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
  
  // res.cookie('siid', req.sessionID)
  next();
});



app.get('/set-cookie', (req, res) => {
  req.session.user = { id: 123, name: 'Test User' };
  // res.cookie('setcookies', '123445', {
  //   httpOnly: true,
  //   secure: process.env.NODE_ENV === 'production', // Set to true in production
  //   sameSite: 'None' // Required for cross-site cookies
  // });
  res.send('Session and cookie set');
});



app.get('/sd', (req, res) => {
  console.log('Session:', req.session);
  res.send(req.sessionID);
});


app.get('/showcookies', (req, res) => {
  console.log('Session:', req.session);
  res.send(req.session);
});
// Import and use routes
const BlogRoutes = require("./Routes/BlogRoutes");
const NormalRoutes = require("./Routes/NormalRoutes");
const RecipeRoutes = require("./Routes/RecipeRoutes");
const UserRoutes = require("./Routes/UserRoutes");

app.use(UserRoutes);
app.use(BlogRoutes);
app.use(NormalRoutes);
app.use(RecipeRoutes);


// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});





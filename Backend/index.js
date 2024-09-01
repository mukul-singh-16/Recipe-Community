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
app.use(express.urlencoded({ extended: true }));


// Connect to MongoDB
const mongourl = process.env.MONGO_URL;
const port = process.env.PORT || 5000;

mongoose.connect(mongourl)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));
  
 



// const mongooseConnection = mongoose.connection;







// app.use(session({
//   store: MongoStore.create({ mongoUrl: mongourl, 
//     ttl: 24 * 60 * 60 // Session TTL in seconds (24 hours)
//      }),
//   secret: 'keyboard cat',
//   resave: false,
//   saveUninitialized: true,
//   maxAge: 24 * 60 * 60 * 100,
//   // cookie: { secure: true }
  
// }))



app.use(session({
  store: MongoStore.create({
    mongoUrl:mongourl,
    ttl: 24 * 60 * 60 
  }),
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true, 
    // sameSite: 'None'
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
  
  // res.cookie('siid', req.sessionID)
  next();
});



app.get('/set-cookie', (req, res) => {
  // Ensure session is set and cookie is sent
  req.session.user = { id: 123, name: 'Test User' };
  // res.cookie('test_cookie', 'test_value', { httpOnly: true, secure: true, sameSite: 'none' });
  res.send('Session and cookie set');
});



app.get('/sd', (req, res) => {
  console.log('Session:', req.session);
  res.send(req.sessionID);
});


app.get('/showcookies', (req, res) => {
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
















// const express = require("express");
// const fs = require("fs");
// const https = require("https");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const dotenv = require("dotenv").config();
// const session = require("express-session");
// const passport = require("passport");
// const passportSetup = require("./passport"); 
// const seedDB = require("./seed");

// // Create an Express application
// const app = express();

// // Read SSL certificate and key
// const options = {
//   key: fs.readFileSync('./key.pem'),
//   cert: fs.readFileSync('./cert.pem')
// };

// // Middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Connect to MongoDB
// const mongourl = process.env.MONGO_URL;
// const port = process.env.PORT || 5000;

// mongoose.connect(mongourl)
//   .then(() => console.log("MongoDB connected"))
//   .catch(err => console.error("MongoDB connection error:", err));

// // Session configuration
// app.use(session({
//   secret: 'keyboard cat',
//   resave: false,
//   saveUninitialized: true,
//   cookie: { 
//     secure: true, // Ensure HTTPS is used in production
//     httpOnly: true,
//     sameSite: 'none' // Required if your site is using a different domain for frontend/backend
//   }
// }));

// // Initialize passport
// app.use(passport.initialize());
// app.use(passport.session());

// // CORS configuration
// const allowedOrigins = [
//   'https://recipe-community-frontend.vercel.app',
//   'http://localhost:5173'
// ];

// app.use(cors({
//   origin: allowedOrigins,
//   methods: "GET,POST,PUT,DELETE",
//   credentials: true 
// }));

// // Example middleware for debugging or additional processing
// app.use((req, res, next) => {
//   console.log("Request user:", req.user); 
//   next();
// });

// app.get('/sd', (req, res) => {
//   // console.log('Session:', req.session);
//   // console.log();
//   res.send({'Session Cookie:': req.cookies});
// });

// // Import and use routes
// const BlogRoutes = require("./Routes/BlogRoutes");
// const NormalRoutes = require("./Routes/NormalRoutes");
// const RecipeRoutes = require("./Routes/RecipeRoutes");
// const UserRoutes = require("./Routes/UserRoutes");

// app.use(BlogRoutes);
// app.use(NormalRoutes);
// app.use(RecipeRoutes);
// app.use(UserRoutes);

// // Create an HTTPS server
// https.createServer(options, app).listen(port, () => {
//   console.log(`Server is running on https://localhost:${port}`);
// });

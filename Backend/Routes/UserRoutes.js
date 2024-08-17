const express = require('express')
const router = express.Router();
const passport=require('passport');
const path = require("path");
const User =require('../Models/user');
const { findById } = require('../Models/blogComment');





router.post("/follow/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const loggedin = await User.findById(req.body._id);
    const profileperson = await User.findById(userId);

    loggedin.sendrequest.push(profileperson);
    profileperson.recivedrequest.push(loggedin);

    loggedin.save();
    profileperson.save();

    res.status(200).json({ success: true, message: "Follow request sent." });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
});




router.post("/unfollow/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const loggedin = await User.findById(req.body._id);
    const profileperson = await User.findById(userId);

    profileperson.follower.remove(loggedin);
    loggedin.following.remove(profileperson);

    loggedin.save();
    profileperson.save();

    res.status(200).json({ success: true, message: "Follow request sent." });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
});




// Accept follow request
router.post("/accept/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { user } = req; // Assuming you're using Passport.js for authentication

    // Add the follower ID to the follower array of the current user
    await User.findByIdAndUpdate(user._id, { $addToSet: { follower: followerId } });

    // Add the current user ID to the following array of the follower
    await User.findByIdAndUpdate(followerId, { $addToSet: { following: user._id } });

    // Remove the follower ID from the recivedrequest array of the current user
    await User.findByIdAndUpdate(user._id, { $pull: { recivedrequest: followerId } });

    // Remove the current user ID from the sendrequest array of the follower
    await User.findByIdAndUpdate(followerId, { $pull: { sendrequest: user._id } });

    res.status(200).json({ success: true, message: "Follow request accepted." });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
});


router.get("/requesteduser", async (req, res) => {
  try {
    const allRequests = await User.findById(req.user._id).populate("recivedrequest");
    res.status(200).json({ msg: "request", allRequests });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



router.get("/follow/accept/:id", async (req, res) => {
  try {
    const requestedUser = await User.findById(req.params.id);
    const currentUser = await User.findById(req.user._id);

    // Add requested user to the current user's followers and vice versa
    currentUser.follower.push(requestedUser);
    requestedUser.following.push(currentUser);

    // Save changes to both users
    await currentUser.save();
    await requestedUser.save();

    // Remove the request from both users' pending request lists
    currentUser.recivedrequest.remove(requestedUser);
    requestedUser.sendrequest.remove(currentUser);

    // Save changes again
    await currentUser.save();
    await requestedUser.save();

    console.log("Request accepted successfully");
    res.status(200).json({ msg: "Request accepted" });
  } catch (error) {
    console.error("Error accepting request:", error);
    res.status(400).json({ msg: "Problem in request acceptance" });
  }
});








router.get("/follow/decline/:id", async (req, res) => {
  try {
    const requestedUser = await User.findById(req.params.id);
    const currentUser = await User.findById(req.user._id);

    // Remove the request from both users' pending request lists
    currentUser.recivedrequest.remove(requestedUser);
    requestedUser.sendrequest.remove(currentUser);

    // Save changes again
    await currentUser.save();
    await requestedUser.save();

    console.log("Request declined successfully");
    res.status(200).json({ msg: "Request accepted" });
  } catch (error) {
    console.error("Error accepting request:", error);
    res.status(400).json({ msg: "Problem in request decline" });
  }
});













router.post('/login', passport.authenticate('local',{ 
}), 
(req, res) => {
  try
    {
      // console.log("inside login routs  " + req.user);
      console.log("req.user in login")
      console.log(req.user)
      return res.status(200).json({ message: 'Logged in successfully', user:req.user });   
    }
    catch(e)
    {
      return res.status(500).json({ message: {e}});
    }
}
);


router.post('/register', async (req,res)=>{
  try {

    

    const { username, password, email, role } = req.body;
    const newuser = new User({ username, email,role });
    const user = await User.register( newuser, password);

    req.login(user, function(err) {
        if (err){
            return next(err);
        }
        
        return res.status(200).json({ message: 'sign up successfully', user:user });
    });
}
catch (e) {
    console.log(e.message);
    res.send('Signup unsucessfull');
}
})


router.get("/profile/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const userDetailById = await User.findById(id)
      .populate("blogs")
      .populate("recipes")


    if (!userDetailById) {
      return res.status(404).json({ msg: "User not found" });
    }

    return res.status(200).json({
      msg: "Successfully fetched user detail",
      userDetailById,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ msg: "Internal server error" });
  }
});




// const CLIENT_URL = "https://recipe-community-frontend.vercel.app/";

router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successfull",
      user: req.user,
    });
  }
});

router.get("/login/failed", (req, res) => {
   return res.status(401).json({
    success: false,
    message: "failure",
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(process.env.CLIENT_URL);
});


router.get("/google", passport.authenticate("google", { scope: ["email","profile"] }));

router.get(
  "/google/callback",

  passport.authenticate("google", {
    // successRedirect: process.env.CLIENT_URL,
    // failureRedirect: "/login/failed",
  })
);




module.exports = router;
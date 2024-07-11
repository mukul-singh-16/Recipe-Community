import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Recipe from "./pages/Recipe/Recipe";
import Login from "./pages/Login/Login";
import "./App.css";
import ShowRecipe from "./pages/Show Recipe/ShowRecipe";
import { MyBlogs } from "./pages/Blogs/MyBlogs";
import { ShowBlogs } from "./pages/Show Blogs/ShowBlogs";
import { Contact } from "./pages/contactUs/Contact";
import Home from "./pages/Home/Home";
import AddRecipe from "../src/Components/Form/AddRecipe";
import AddBlog from "../src/Components/Form/AddBlog";
import Profile from "./pages/Profile/Profile";
import MyNav from "./Components/Navbar/MyNav";
// import Navv from "./Components/Navbar/Navv";

import { useEffect, useState } from "react";
import axios from "axios";
import Wrongurl from "./Components/Wrongurl/Wrongurl";
const App = () => {
  // const user=true;

  const [user, setuser] = useState(null);

  useEffect(() => {
    const fetchuserinfo = () => {
      fetch("https://recipe-community-server-jxfz3bhrh-mukul-singh-16s-projects.vercel.app/auth/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("authentication has been failed!");
        })
        .then((resObject) => {
          setuser(resObject.user);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchuserinfo();
  }, []);
  return (
    <>
      <Router>
        <MyNav user={user} />
        {/* <Navv /> */}
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/recipe" element={<Recipe />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/showRecipe/:id"
            element={user ? <ShowRecipe /> : <Login />}
          />
          <Route path="/blogs" element={<MyBlogs />} />
          <Route
            path="/showBlogs/:id"
            element={user ? <ShowBlogs /> : <Login />}
          />
          <Route path="/contact" element={<Contact />} />
          <Route path="/addrecipe" element={user ?<AddRecipe /> :<Login/>} />
          <Route path="/addblog" element={user ? <AddBlog /> : <Login/> } />
          <Route path="profile/:id" element={<Profile  user = {user}/>} />
          <Route path="*" element={<Wrongurl/>} />
        </Routes>
      </Router>
    </>
  );
};

export default App;

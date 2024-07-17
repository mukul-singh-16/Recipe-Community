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

import { useEffect, useState } from "react";
import Wrongurl from "./Components/Wrongurl/Wrongurl";
const App = () => {
  // const user=true;

  const [user, setuser] = useState(null);

  useEffect(() => {
    const fetchuserinfo = () => {
      fetch("https://recipe-community-server.vercel.app/login/success", {
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
        <Routes>
          <Route path="https://recipe-community-frontend.vercel.app/" element={<Home/>} />
          <Route path="https://recipe-community-frontend.vercel.app/recipe" element={<Recipe />} />
          <Route path="https://recipe-community-frontend.vercel.app/login" element={<Login />} />
          <Route
            path="https://recipe-community-frontend.vercel.app/showRecipe/:id"
            element={user ? <ShowRecipe /> : <Login />}
          />
          <Route path="https://recipe-community-frontend.vercel.app/blogs" element={<MyBlogs />} />
          <Route
            path="https://recipe-community-frontend.vercel.app/showBlogs/:id"
            element={user ? <ShowBlogs /> : <Login />}
          />
          <Route path="https://recipe-community-frontend.vercel.app/contact" element={<Contact />} />
          <Route path="https://recipe-community-frontend.vercel.app/addrecipe" element={user ?<AddRecipe /> :<Login/>} />
          <Route path="https://recipe-community-frontend.vercel.app/addblog" element={user ? <AddBlog /> : <Login/> } />
          <Route path="https://recipe-community-frontend.vercel.app/profile/:id" element={<Profile  user = {user}/>} />
          <Route path="https://recipe-community-frontend.vercel.app/*" element={<Wrongurl/>} />
        </Routes>
      </Router>
    </>
  );
};

export default App;

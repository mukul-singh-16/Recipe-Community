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
import Message from "./Components/Message/Message";
const App = () => {
  // const user=true;

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchuserinfo = async () => {
      
        const response = await fetch(import.meta.env.VITE_SERVER_URL+"/login/success", {
          method: "GET",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
    
        if (!response.ok) {
          return;
        }
        else{
        const data = await response.json();
        // console.log(data); // Log the response data for debugging
        setUser(data.user); // Assuming data structure { success: true, message: "successfull", user: {...} }
      
        }
    };
    
    fetchuserinfo();
  }, []);
  return (
    <>
      <Router>
        <MyNav user={user} />
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
          <Route path="/messege" element={<Message/>} />
          <Route path="*" element={<Wrongurl/>} />
        </Routes>
      </Router>
    </>
  );
};

export default App;

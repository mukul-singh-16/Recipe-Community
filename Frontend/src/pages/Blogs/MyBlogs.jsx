/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import MyNav from "../../Components/Navbar/MyNav";
import SearchForm from "../../Components/Search Bar/SearchForm";
import MyCard from "../../Components/Cards/MyCard";
import Footer from "../../Components/footer/Footer";
import BCard from "../../Components/Cards/BCard";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { BlogSearched } from "../../atom";

export const MyBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();
  const searchedItem = useRecoilValue(BlogSearched)

  function Redirect() {
    navigate("/addblog");
  }

  

  useEffect(() => {

    async function getAllBlogs() {
      try {
        // console.log(import.meta.env.VITE_SERVER_URL+"/blog");
        const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/blog`, {
          params: {
            searcheddata: searchedItem
          }
        });
        // console.log(res.data);
  
        setBlogs(res.data);
      } catch (e) {
        console.log("unable to fetch all blogs data");
      }
    }



    getAllBlogs();
  }, [searchedItem]);



  const flexbox = {
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
  };

  return (
    <>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "end",
          paddingRight: "20px",
          marginBottom: "5px",
          alignContent: "center",
          marginTop: "30px",
        }}
      >
        <button
          style={{ right: "0" }}
          className="btn btn-primary"
          onClick={Redirect}
        >
          Add
          <IoIosAddCircleOutline
            color="#ffff"
            style={{
              marginLeft: "5px",
              fontSize: "20px",
              paddingBottom: "2px",
            }}
          />
        </button>
      </div>

      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <h1>Explore's The Blogs</h1>
      </div>
      
      

      <div
        style={{
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          margin: "20px",
        }}
      >
        <SearchForm  searchfrom="BLOG"/>
        



        {blogs.length === 0 && (
        <h2 style={{textAlign:"center"}}>Loading...</h2>
      )}
      </div>
      
      <div className="container" style={flexbox}>
        {blogs.map((blog) => (
          <BCard key={blog._id} blog={blog} />
        ))}
      </div>

      <Footer />
    </>
  );
};

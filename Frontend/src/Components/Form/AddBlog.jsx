import React, { useState, useRef } from "react";
import MyNav from "../Navbar/MyNav";
import Footer from "../footer/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddBlog = () => {
  const navigate = useNavigate();
  
  function Redirect() {
    navigate("/blogs");
  }
  const [formData, setFormData] = useState({
    blogName: "",
    img: "",
    desc: "",
  });
  const formref = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_SERVER_URL}/blog/add`, formData, {
      withCredentials: true,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      }
    });
    console.log("blogs added successfully!");
    } catch (err) {
      console.log(err);
    }
    formref.current.reset();
    Redirect();
  };

  

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          margin: "50px",
        }}
      >
        <form
          style={{
            border: "2px solid black",
            width: "50vw",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
          }}
          onSubmit={onSubmitHandler}
          ref={formref}
        >
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Blog Name
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="blogName"
              aria-describedby="emailHelp"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="img" className="form-label">
              Img
            </label>
            <input
              type="text"
              name="img"
              className="form-control"
              id="img"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              name="desc"
              className="form-control"
              id="description"
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default AddBlog;

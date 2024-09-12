/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { MdOutlineStar } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import axios from "axios";

const ReviewRecipe = (props) => {
  const id = props.recipe._id;
  const [comment, setComment] = useState("");

  // backend call
  function onSubmitHandler() {
    const postComment = async () => {
      if (comment.trim() === "") return;

      try {
        await axios.post(`${import.meta.env.VITE_SERVER_URL}/recipe/${id}/review`, {
          comment,
        },{
          withCredentials: true,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          }});
        setComment("");
      } catch (e) {
        console.log("Unable to post comment");
      }
    };
    postComment();
  }

  let arr1 = props.recipe.comment;

  return (
    <div>
      <div
        className="container"
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          marginTop: "100px",
          marginBottom: "100px",
          borderTop: "3px solid #E5E7EB",
          paddingTop: "40px",
        }}
      >
        <div>
          {/* <h3>Add A Review</h3>
          <div style={{ display: "flex", alignItems: "center" }}>
            <MdOutlineStar style={{ fontSize: "40px", color: "#FFEE32" }} />
            <MdOutlineStar style={{ fontSize: "40px", color: "#FFEE32" }} />
            <MdOutlineStar style={{ fontSize: "40px", color: "#FFEE32" }} />
            <MdOutlineStar style={{ fontSize: "40px", color: "#FFEE32" }} />
            <MdOutlineStar style={{ fontSize: "40px", color: "#FFEE32" }} />
          </div> */}
        </div>
        <div>
          <div>
            <label htmlFor="review">
              <h4>Add A Comment</h4>
              <textarea
                value={comment}
                onChange={(e) => {
                  setComment(e.target.value);
                }}
                id="review"
                cols="30"
                rows="3"
                placeholder="Write a comment...."
                style={{
                  padding: "10px",
                  marginBottom: "10px",
                  width: "100%",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                }}
              ></textarea>
            </label>
          </div>
          <button
            className="btn btn-success"
            onClick={onSubmitHandler}
            style={{ width: "100%", padding: "10px", borderRadius: "5px" }}
          >
            ADD
          </button>
        </div>
      </div>
      <div className="container" style={{ marginTop: "20px" }}>
        <h1>Comments</h1>
        {arr1 &&
          arr1.map((ele, idx) => (
            <div
              key={idx}
              style={{
                marginBottom: "15px",
                backgroundColor: "#f9f9f9",
                padding: "15px",
                borderRadius: "8px",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
              }}
            >
              <h5
                style={{
                  marginBottom: "10px",
                  color: "#333",
                  fontWeight: "bold",
                }}
              >
                <FaUser style={{ marginRight: "5px" }} />
                {ele.username.toUpperCase()}
              </h5>
              <p style={{ margin: "0", color: "#555", fontSize: "16px" }}>
                {ele.comment}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ReviewRecipe;

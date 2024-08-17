/* eslint-disable react/prop-types */
import { FaUser } from "react-icons/fa";
import React, { useState } from "react";
import { MdOutlineStar } from "react-icons/md";
import axios from "axios";

const Review = (props) => {
  const id = props.data._id;

  const [comment, setComment] = useState("");

  //backend call

  function onSubmitHandler() {
    const postcomment = async () => {
      if (comment.trim() == "") return;

      try {
        await axios.post(import.meta.env.VITE_SERVER_URL+`blog/${id}/comment`, {
          comment,
        },{
          withCredentials: true,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          }});
        setComment("");
      } catch (e) {
        console.log("unable to fetch post comments");
      }
    };
    postcomment();
  }
  let arr1 = props.data.comment;
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
        {/* <div>
          <h3>Add A Review</h3>
          <MdOutlineStar style={{ fontSize: "40px", color: "#FFEE32" }} />
          <MdOutlineStar style={{ fontSize: "40px", color: "#FFEE32" }} />
          <MdOutlineStar style={{ fontSize: "40px", color: "#FFEE32" }} />
          <MdOutlineStar style={{ fontSize: "40px", color: "#FFEE32" }} />
          <MdOutlineStar style={{ fontSize: "40px", color: "#FFEE32" }} />
        </div> */}
        <div>
          <div>
            <label id="review">
              <h4>Add A Comment</h4>
              <textarea
                value={comment}
                onChange={(e) => {
                  setComment(e.target.value);
                }}
                name=""
                id="review"
                cols="30"
                rows="3"
                placeholder="Write a comment...."
                style={{ padding: "10px" }}
              ></textarea>
            </label>
          </div>
          <button className="btn btn-success" onClick={onSubmitHandler}>
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

export default Review;

import  { useEffect, useState } from "react";
import MyNav from "../../Components/Navbar/MyNav";
import Footer from "../../Components/footer/Footer";
import AboutBlogs from "../../Components/About Blogs/AboutBlogs";
import Review from "../../Components/Reviews/Review";
import axios from "axios";
import { useParams } from "react-router-dom";

export const ShowBlogs = () => {


  const { id } = useParams();
  const [data, setData] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!id) return;
        const res = await axios.get(`http://localhost:5000/blog/${id}`);
        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div>
     
        
        <AboutBlogs data={data} />
        <Review data={data} />
        <Footer />
  
    </div>
  );
};

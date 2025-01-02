import React from "react";
import MyNav from "../../Components/Navbar/MyNav";
import MyCarousels from "../../Components/Carousel/MyCarousel";
import Footer from "../../Components/footer/Footer";
import HCard from "../../Components/Cards/HCard";
import Herotitle from "../../Components/Hero Text/Herotitle";

const Home = (props) => {
  return (
    <>
      <Herotitle />
      <MyCarousels />
      <HCard />
      <Footer />
      

    </>
  );
};

export default Home;

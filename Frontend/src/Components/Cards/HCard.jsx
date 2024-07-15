import React from "react";
import MyCard from "./MyCard";
import HomeCard from "./HomeCard";

const HCard = () => {
  return (
    <>
      <h4 className="mt-5 text-center">Recipes</h4>
      <div className="container card-container d-flex justify-content-around flex-wrap">
        <HomeCard
          image="https://t4.ftcdn.net/jpg/04/14/41/77/360_F_414417747_PncWOAXpLSMPuQSae7uXLmJGlGV41EOH.jpg"
          name="poha"
          text="Poha, also known as flattened rice or beaten rice, is a popular Indian breakfast...."
          url="https://recipe-community-frontend.vercel.app/showRecipe/6629307841b78ef1eef138ad"
        />
        <HomeCard
          image="https://vismaifood.com/storage/app/uploads/public/8b4/19e/427/thumb__1200_0_0_0_auto.jpg"
          name="Dosa"
          text="Dosa is a popular South Indian dish that's enjoyed not only in India but around the world."
          url="https://recipe-community-frontend.vercel.app/showRecipe/6629307841b78ef1eef138b0"
        />
        <HomeCard
          image="https://content.jdmagicbox.com/comp/noida/v8/011pxx11.xx11.190925042619.e8v8/catalogue/punjabi-chole-bhature-noida-sector-34-noida-north-indian-restaurants-2whbntunqe.jpg"
          name="Chole Bhature"
          text="Chole Bhature is a beloved North Indian dish that consists of spicy ..."
          url="https://recipe-community-frontend.vercel.app/showRecipe/6629307841b78ef1eef138ae"
        />
        <HomeCard
          image="https://maayeka.com/wp-content/uploads/2023/12/broccoli-paneer-paratha-recipe-a.jpg"
          name="Special Paneer Parantha"
          text="Paneer Paratha is a delicious and popular Indian stuffed flatbread made with .."
          url="https://recipe-community-frontend.vercel.app/showRecipe/6629307841b78ef1eef138af"
        />
      </div>
    </>
  );
};

export default HCard;

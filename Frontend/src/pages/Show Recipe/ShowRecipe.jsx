import { useEffect, useState } from "react";
import AboutRecipe from "../../Components/About Recipe/AboutRecipe";
import RecipeMenu from "../../Components/Menu/RecipeMenu";
import Footer from "../../Components/footer/Footer";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReviewRecipe from "../../Components/Reviews/ReviewRecipe";

const ShowRecipe = () => {
  const params = useParams();

  const [recipe, setRecipe] = useState([]);

  async function recipeDataFetcher() {
    const res = await axios.get(import.meta.env.VITE_SERVER_URL+`/recipe/${params.id}`);
    console.log(res.data);
    setRecipe(res.data);
  }

  useEffect(() => {
    recipeDataFetcher();
  }, []);

  return (
    <>
      
      <AboutRecipe recipe={recipe} />
      <RecipeMenu recipe={recipe} />
      <ReviewRecipe recipe={recipe} />
      <Footer />
    </>
  );
};

export default ShowRecipe;

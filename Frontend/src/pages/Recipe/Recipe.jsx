import { useState, useEffect } from "react";
import Footer from "../../Components/footer/Footer";
import MyCard from "../../Components/Cards/MyCard";
import SearchForm from "../../Components/Search Bar/SearchForm";
import axios from "axios";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { RecipeSearched } from "../../atom";

const Recipe = () => {
  const navigate = useNavigate();

  function Redirect() {
    navigate("/addrecipe");
  }
  //data fetch from api to get the content of cards

  const [recipes, setrecipe] = useState([]);


  const searchedItem = useRecoilValue(RecipeSearched)
  async function getAllRecipes() {
    try {
      const res = await axios.get(import.meta.env.VITE_SERVER_URL+"/recipe",{
        params: {
          searcheddata: searchedItem
        }
      });
      setrecipe(res.data);
    } catch (e) {
      console.log("bhai recipe fetch nhi ho pa rhi url se");
    }
  }

  // getAllRecipes();
  

  useEffect(() => {

    
    getAllRecipes();
  }, [searchedItem]);

  const flexbox = {
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
  };

  return (
    <>

      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "end",
            paddingRight: "20px",
            marginBottom: "5px",
            alignContent: "center",
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
        <h1>Discover Flavorful Creations</h1>
      </div>
      <div
        style={{
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          margin: "20px",
        }}
      >
        <SearchForm  searchfrom="RECIPE"/>
      </div>

      {recipes.length === 0 && (
        <h2 style={{textAlign:"center"}}>Loading...</h2>
      )}

      <div className="container" style={flexbox}>
        {recipes.map((recipe) => {
          return <MyCard key={recipe._id} item={recipe} />;
        })}
      </div>

      <Footer />
    </>
  );
};

export default Recipe;

import { useState, useEffect } from "react";
import MyNav from "../../Components/Navbar/MyNav";
import Footer from "../../Components/footer/Footer";
import MyCard from "../../Components/Cards/MyCard";
import SearchForm from "../../Components/Search Bar/SearchForm";
import axios from "axios";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Recipe = () => {
  const navigate = useNavigate();

  function Redirect() {
    navigate("/addrecipe");
  }
  //data fetch from api to get the content of cards

  const [recipes, setrecipe] = useState([]);

  async function getAllRecipes() {
    try {
      const res = await axios.get("https://recipe-community-server-jxfz3bhrh-mukul-singh-16s-projects.vercel.app/recipe/");
      setrecipe(res.data);
    } catch (e) {
      console.log("bhai recipe fetch nhi ho pa rhi url se");
    }
  }

  useEffect(() => {
    getAllRecipes();
  }, []);

  const flexbox = {
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
  };

  return (
    <>
      {/* <MyNav /> */}

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
        <SearchForm />
      </div>

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

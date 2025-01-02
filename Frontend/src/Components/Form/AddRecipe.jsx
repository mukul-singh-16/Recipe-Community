import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import MyNav from "../Navbar/MyNav";
import Footer from "../footer/Footer";
import axios from "axios";

const AddRecipe = () => {
  const [countIng, setCountIng] = useState(2);
  const [countIns, setCountIns] = useState(2);
  const [formData, setFormData] = useState({
    recipeName: "",
    img: "",
    desc: "",
    cookingTime: "",
    calorie: "",
    ingredient: [],
    procedure: [],
  });
  const formRef = useRef();
  const navigate = useNavigate();

  function Redirect() {
    navigate("/recipe");
  }

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
      await axios.post(`${import.meta.env.VITE_SERVER_URL}/recipe/add`, formData, {

      withCredentials: true,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      }
    });
    console.log("Recipe added successfully!");
    formRef.current.reset();
    } catch (err) {
      console.log(err);
    }

    Redirect();
  };

  const addIngredientInput = () => {
    setCountIng(countIng + 1);
    setFormData({
      ...formData,
      ingredient: [...formData.ingredient, ""],
    });
  };

  const addProcedureInput = () => {
    setCountIns(countIns + 1);
    setFormData({
      ...formData,
      procedure: [...formData.procedure, ""],
    });
  };

  const handleIngredientChange = (e, index) => {
    const newIngredients = [...formData.ingredient];
    newIngredients[index] = e.target.value;
    setFormData({
      ...formData,
      ingredient: newIngredients,
    });
  };

  const handleProcedureChange = (e, index) => {
    const newProcedures = [...formData.procedure];
    newProcedures[index] = e.target.value;
    setFormData({
      ...formData,
      procedure: newProcedures,
    });
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
          ref={formRef}
        >
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Recipe Name
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="recipeName"
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
          <div className="mb-3">
            <label htmlFor="cookingtime" className="form-label">
              Cooking Time
            </label>
            <input
              type="text"
              name="cookingTime"
              className="form-control"
              id="cookingtime"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="calorie" className="form-label">
              Calorie
            </label>
            <input
              type="text"
              name="calorie"
              className="form-control"
              id="calorie"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Ingredient</label>
            <div className="steps">
              {formData.ingredient.map((ingredient, index) => (
                <input
                  key={index}
                  type="text"
                  name="ingredient"
                  className="form-control mb-2"
                  placeholder={`Step ${index + 1}`}
                  value={ingredient}
                  onChange={(e) => handleIngredientChange(e, index)}
                />
              ))}
            </div>
            <p
              className="btn text-muted addInput"
              style={{ border: "0.5px solid black" }}
              onClick={addIngredientInput}
            >
              Add
            </p>
          </div>
          <div className="mb-3">
            <label className="form-label">Procedure</label>
            <div className="procedure">
              {formData.procedure.map((step, index) => (
                <input
                  key={index}
                  type="text"
                  name="procedure"
                  className="form-control mb-2"
                  placeholder={`Step ${index + 1}`}
                  value={step}
                  onChange={(e) => handleProcedureChange(e, index)}
                />
              ))}
            </div>
            <p
              className="btn text-muted addInput"
              style={{ border: "0.5px solid black" }}
              onClick={addProcedureInput}
            >
              Add
            </p>
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

export default AddRecipe;

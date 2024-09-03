import React from "react";
import style from "./SearchForm.module.css";
import { IoSearch } from "react-icons/io5";
import {  useRecoilState, useSetRecoilState } from "recoil";
import { BlogSearched, RecipeSearched,  } from "../../atom";


const SearchForm = ({searchfrom}) => {

  let [recipe , setQueryRecipe] = useRecoilState(RecipeSearched)
  let [blog , setQueryBlog] = useRecoilState(BlogSearched)

  //debounsing logic  
  let timeout;

  const HandelSearching = (e)=>{
    clearInterval(timeout)
    timeout = setTimeout(() => {
      (searchfrom==="BLOG")?setQueryBlog(e.target.value):setQueryRecipe(e.target.value);
      
    }, 1000); 
  }

  return (
    
    <div style={{ textAlign: "center" }}>
      <div className={style.searchBox}>
        <button className={style.btnSearch}>
          <IoSearch />
        </button>
        <input onChange={HandelSearching}
          type="text"
          // value={(searchfrom==="BLOG")?blog:recipe}
          className={style.inputSearch}
          placeholder="Search ..."
        />
      </div>
    </div>
  );
};

export default SearchForm;

import Axios from "axios";
import { useState } from "react";
import "./app.css";
import RecipeTile from "./components/recipe-tile";

function App() {
  const [query, setquery] = useState("");
  const [recipes, setrecipes] = useState([]);

  const YOUR_APP_ID = `a848191e`;
  const YOUR_APP_KEY = "b44eb4f4da2e135a15e04e3b00e06872";

  const url = `https://api.edamam.com/search?q=${query}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}`;
  
  const getRecipeInfo = async () => {
    var result = await Axios.get(url);
    setrecipes(result.data.hits);
    console.log(result.data.hits);
    console.log(result);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    getRecipeInfo();
  };

  return (
    <div className="app">
      <h1 onClick={getRecipeInfo}>Food Recipe Plaza 🍔</h1>
      <form className="app__searchForm" onSubmit={onSubmit}>
        <input
          className="app__input"
          type="text"
          placeholder="Enter any recipe name to see results"
          autoComplete="Off"
          value={query}
          onChange={(e) => setquery(e.target.value)}
        />
        <input className="app__submit" type="submit" value="Search" />
      </form>

      <div className="app__recipes">
        {recipes !== [] &&
          recipes.map((recipe) => {
            return <RecipeTile recipe={recipe} />;
          })}
      </div>
    </div>
  );
}

export default App;

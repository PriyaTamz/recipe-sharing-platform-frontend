import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import RecipeList from "./components/RecipeList";
import RecipeDetails from "./components/RecipeDetails";
import RecipeForm from "./components/RecipeForm";
import SearchBar from "./components/SearchBar";
import "./App.css";

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  // Fetch all recipes
  useEffect(() => {
    const fetchRecipes = async () => {
      const response = await fetch("http://localhost:3001/api/recipes");
      const data = await response.json();
      setRecipes(data);
      setFilteredRecipes(data);
    };
    fetchRecipes();
  }, []);

  // Add a new recipe
  const addRecipe = async (newRecipe) => {
    const response = await fetch("http://localhost:3001/api/recipes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newRecipe),
    });
    const savedRecipe = await response.json();
    setRecipes((prev) => [...prev, savedRecipe]);
    setFilteredRecipes((prev) => [...prev, savedRecipe]);
  };

  // Search recipes by name
  const searchRecipes = (searchTerm) => {
    const filtered = recipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRecipes(filtered);
  };

  return (
    <Router>
      <div className="app">
        <h1>Love and Lemon</h1>
        
        {/* Add Recipe Button on Home Page */}
        <div className="add-recipe-button">
          <Link to="/add-recipe">
            <button className="add-recipe-btn">Add Recipe</button>
          </Link>
        </div>

        <Routes>
          {/* Home Route: Recipe List */}
          <Route
            path="/"
            element={
              <>
                <SearchBar onSearch={searchRecipes} />
                <RecipeList recipes={filteredRecipes} />
              </>
            }
          />
          {/* Add Recipe Page */}
          <Route
            path="/add-recipe"
            element={<RecipeForm onAddRecipe={addRecipe} />}
          />
          {/* Recipe Details Route */}
          <Route path="/recipe/:id" element={<RecipeDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

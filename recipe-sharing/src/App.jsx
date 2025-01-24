import React, { useState, useEffect } from "react";
import RecipeList from "./components/RecipeList";
import RecipeForm from "./components/RecipeForm";
import SearchBar from "./components/SearchBar";
import "./App.css"; 

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  // Fetch all recipes
  useEffect(() => {
    const fetchRecipes = async () => {
      const response = await fetch("http://localhost:5000/api/recipes");
      const data = await response.json();
      setRecipes(data);
      setFilteredRecipes(data);
    };
    fetchRecipes();
  }, []);

  // Add a new recipe
  const addRecipe = async (newRecipe) => {
    const response = await fetch("http://localhost:5000/api/recipes", {
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
    <div className="app">
      <h1>Recipe Sharing Platform</h1>
      <SearchBar onSearch={searchRecipes} />
      <RecipeForm onAddRecipe={addRecipe} />
      <RecipeList recipes={filteredRecipes} />
    </div>
  );
};

export default App;

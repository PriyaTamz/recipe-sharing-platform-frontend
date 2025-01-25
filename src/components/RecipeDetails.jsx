import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./RecipeDetails.css"; 
import foodImage from "./food.jpg";  // Import the image

const RecipeDetails = () => {
  const { id } = useParams();  // Get the recipe ID from URL parameters
  const [recipe, setRecipe] = useState(null);
  const navigate = useNavigate();  // Hook to navigate programmatically

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      const response = await fetch(`http://localhost:3001/api/recipes/${id}`);
      const data = await response.json();
      setRecipe(data);
    };

    fetchRecipeDetails();
  }, [id]);

  if (!recipe) return <p>Loading...</p>;

  return (
    <div className="recipe-details">
      <h2>{recipe.title}</h2>
      <img
        src={foodImage}
        alt={recipe.title}
        className="recipe-image"
      />
      <p><strong>Ingredients:</strong> {recipe.ingredients.join(", ")}</p>
      <p><strong>Steps:</strong> {recipe.steps}</p>
      {/* Back button to go to home page */}
      <button onClick={() => navigate("/")} className="back-button">Back to Home</button>
    </div>
  );
};

export default RecipeDetails;

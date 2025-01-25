import React from "react";
import { Link } from "react-router-dom";
import "./RecipeList.css";
import foodImage from "./food.jpg";  // Import the image

const RecipeList = ({ recipes }) => {

  return (
    <div className="recipe-list">
      {recipes.length > 0 ? (
        recipes.map((recipe) => (
          <div key={recipe._id} className="recipe-card">
            <h3>{recipe.title}</h3>
            <img
              src={foodImage}  // Use foodImage as fallback
              alt={recipe.title}
              className="recipe-image"
            />
            <div>
              <Link to={`/recipe/${recipe._id}`}>
                <button className="view-details-button">View Details</button>
              </Link>
            </div>
          </div>
        ))
      ) : (
        <p>No recipes found!</p>
      )}
    </div>
  );
};

export default RecipeList;

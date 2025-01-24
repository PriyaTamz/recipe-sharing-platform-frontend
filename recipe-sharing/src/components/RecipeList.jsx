import React from "react";
import "./RecipeList.css"; 

const RecipeList = ({ recipes }) => {
  return (
    <div className="recipe-list">
      {recipes.length > 0 ? (
        recipes.map((recipe) => (
          <div key={recipe._id} className="recipe-card">
            <h3>{recipe.title}</h3>
            <img
              src={recipe.image || "https://via.placeholder.com/150"}
              alt={recipe.title}
              className="recipe-image"
            />
            <p><strong>Ingredients:</strong> {recipe.ingredients.join(", ")}</p>
            <p><strong>Steps:</strong> {recipe.steps}</p>
          </div>
        ))
      ) : (
        <p>No recipes found!</p>
      )}
    </div>
  );
};

export default RecipeList;

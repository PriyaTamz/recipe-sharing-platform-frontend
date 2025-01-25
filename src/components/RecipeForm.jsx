import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./RecipeForm.css";

const RecipeForm = ({ onAddRecipe }) => {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [image, setImage] = useState(null);  // Change to store file

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !ingredients || !steps || !image) {
      alert("Please fill in all fields and choose an image!");
      return;
    }

    // Prepare the new recipe data
    const newRecipe = {
      title,
      ingredients: ingredients.split(","),
      steps,
      image,
    };

    onAddRecipe(newRecipe);

    // Clear the form
    setTitle("");
    setIngredients("");
    setSteps("");
    setImage(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the first selected file
    if (file) {
      setImage(URL.createObjectURL(file)); // Store the image URL temporarily
    }
  };

  return (
    <div className="recipe-form-container">
      <form className="recipe-form" onSubmit={handleSubmit}>
        <h2>Add a New Recipe</h2>
        <input
          type="text"
          placeholder="Recipe Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Ingredients (comma-separated)"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        />
        <textarea
          placeholder="Steps"
          value={steps}
          onChange={(e) => setSteps(e.target.value)}
        ></textarea>
        
        {/* Image upload input */}
        <input
          type="file"
          accept="image/*" // Only accept image files
          onChange={handleImageChange}
        />
        
        {image && <img src={image} alt="Recipe Preview" className="recipe-image-preview" />}
        
        <button type="submit">Add Recipe</button>
      </form>

      {/* Back to Home Button */}
      <div className="back-to-home">
        <Link to="/">
          <button className="back-home-btn">Back to Home</button>
        </Link>
      </div>
    </div>
  );
};

export default RecipeForm;

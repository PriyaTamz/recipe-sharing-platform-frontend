import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./CreateRecipe.css";
import Navbar from "./Navbar";

function CreateRecipe() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [steps, setSteps] = useState("");
  const [image, setImage] = useState(null); // Changed to handle file uploads
  const navigate = useNavigate();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Ensure ingredients is a string (comma-separated)
    const ingredientString = ingredients.join(",");  // Join ingredients array to a string
    
    // Debugging: Check values before appending to FormData
    console.log("Title:", title);
    console.log("Description:", description);
    console.log("Ingredients:", ingredientString);  // Log the string form of ingredients
    console.log("Steps:", steps);
    console.log("Image:", image);
  
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("ingredients", ingredientString); // Send ingredients as a string
    formData.append("steps", steps);
  
    if (image) {
      formData.append("image", image);
    }
  
    // Debugging: Check the FormData content
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }
  
    try {
      const response = await axios.post("https://recipe-sharing-platform-yjed.onrender.com/api/recipes", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Response data:", response.data); // Debugging: Check the server's response
      navigate("/dashboard"); // Redirect to dashboard after success
    } catch (error) {
      // Debugging: Log detailed error information
      console.error("Error creating recipe:", error.response?.data || error.message);
    }
  };  
  

  return (
    <div className="create-recipe-container">
      <Navbar />
      <h1 className="title">Create New Recipe</h1>
      <form onSubmit={handleSubmit} className="recipe-form">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="form-input"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="form-textarea"
        />
        <textarea
          placeholder="Ingredients (comma separated)"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          required
          className="form-textarea"
        />
        <textarea
          placeholder="Steps"
          value={steps}
          onChange={(e) => setSteps(e.target.value)}
          required
          className="form-textarea"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="form-input"
        />
        <button type="submit" className="submit-button">Submit Recipe</button>
      </form>
    </div>
  );
}

export default CreateRecipe;

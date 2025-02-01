// src/components/Dashboard.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import './Dashboard.css';  // Import the CSS file
import defaultImage from './images/mushroombiryani_F.webp';
import Navbar from "./Navbar";

function Dashboard() {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null); // State to track the selected recipe
  const [isModalOpen, setIsModalOpen] = useState(false); // State to track if the modal is open

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await axios.get("https://recipe-sharing-platform-yjed.onrender.com/api/recipes");
      setRecipes(response.data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  const openModal = (recipe) => {
    setSelectedRecipe({
      ...recipe,
      ingredients: recipe.ingredients || [],  // Ensure ingredients is always an array
    });
    setIsModalOpen(true);
  };  

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
    setSelectedRecipe(null); // Clear the selected recipe
  };

  return (
    <div className="dashboard-container">
      <Navbar />
      <h1 className="header">All Recipes</h1>
      <div className="cards-container">
        {recipes.map((recipe) => (
          <div className="recipe-card" key={recipe._id}>
            <img src={defaultImage} alt="default" />
            <h2 className="recipe-title">{recipe.title}</h2>
            <p className="recipe-description">{recipe.description}</p>
            <button className="view-recipe-link" onClick={() => openModal(recipe)}>
              View Recipe
            </button>
          </div>
        ))}
      </div>

      {/* Modal Popup */}
      {isModalOpen && selectedRecipe && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-btn" onClick={closeModal}>X</button>
            <h2>{selectedRecipe.title}</h2>
            <img src={defaultImage} alt="default" className="model-image" />
            <p>{selectedRecipe.description}</p>
            <h3>Steps:</h3>
            <p>{selectedRecipe.steps}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./History.css"; // Import the CSS file
import Navbar from "./Navbar";

function History() {
  const [recipes, setRecipes] = useState([]);
  const [editRecipe, setEditRecipe] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Fetch all recipes
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

  // Handle delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://recipe-sharing-platform-yjed.onrender.com/api/recipes/${id}`);
      setRecipes((prevRecipes) => prevRecipes.filter((recipe) => recipe.id !== id));
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  // Handle edit (open modal with selected recipe)
  const handleEdit = (recipe) => {
    setEditRecipe(recipe); // Set the recipe to be edited
    setModalVisible(true); // Show the modal
  };

  // Handle form submission to update recipe
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://recipe-sharing-platform-yjed.onrender.com/api/recipes/${editRecipe.id}`, editRecipe);
      setModalVisible(false); // Hide modal after successful update
      fetchRecipes(); // Refresh recipe list
    } catch (error) {
      console.error("Error updating recipe:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditRecipe((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="history-container">
      <Navbar />
      <h1>Recipe History</h1>
      <ul className="recipe-list">
        {recipes.map((recipe) => (
          <li key={recipe.id} className="recipe-item">
            <h2>{recipe.title}</h2>
            <p>{recipe.description}</p>
            <button onClick={() => handleEdit(recipe)}>Edit</button>
            <button className="delete" onClick={() => handleDelete(recipe.id)}>Delete</button>
          </li>
        ))}
      </ul>

      {/* Modal for editing */}
      {modalVisible && editRecipe && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-btn" onClick={() => setModalVisible(false)}>X</button>
            <h2>Update Recipe</h2>
            <form onSubmit={handleUpdate}>
              <input
                type="text"
                name="title"
                value={editRecipe.title || ""}
                onChange={handleChange}
                required
              />
              <textarea
                name="description"
                value={editRecipe.description || ""}
                onChange={handleChange}
                required
              />
              <textarea
                name="ingredients"
                value={editRecipe.ingredients?.join(",") || ""}
                onChange={(e) =>
                  setEditRecipe((prev) => ({
                    ...prev,
                    ingredients: e.target.value.split(","),
                  }))
                }
                required
              />
              <textarea
                name="steps"
                value={editRecipe.steps || ""}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="image"
                value={editRecipe.image || ""}
                onChange={handleChange}
              />
              <button type="submit">Update Recipe</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default History;

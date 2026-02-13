import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const Products = () => {
  const [title, setTitle] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [description, setDescription] = useState("");
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const loginToken = localStorage.getItem("loginToken");
        if (!loginToken) {
          alert("You must be logged in to view products.");
          navigate("/login");
          return;
        }
        const response = await axios.get(
          `http://localhost:5050/user/products?token=${loginToken}`,
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("loginToken");
      if (!token) {
        alert("You must be logged in to add a product.");
        navigate("/login");
        return;
      }
      const response = await axios.post(
        "http://localhost:5050/user/addproduct",
        {
          title,
          imageURL,
          description,
          token: token,
        },
      );
      alert("Product added successfully!");
      setTitle("");
      setImageURL("");
      setDescription("");
      setProducts((prevProducts) => [...prevProducts, response.data]);
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product. Please try again.");
    }
  };

  return (
    <div>
      <h2>Products</h2>
      <form onSubmit={handleAddProduct}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="imageURL">Image URL:</label>
          <input
            type="text"
            id="imageURL"
            value={imageURL}
            onChange={(e) => setImageURL(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">Add Product</button>
      </form>

      <h3>Product List</h3>
      <ul>
        {products.map((product, index) => (
          <li key={index}>
            <h4>{product.title}</h4>
            <img
              src={product.imageURL}
              alt={product.title}
              style={{ width: "100px" }}
            />
            <p>{product.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;

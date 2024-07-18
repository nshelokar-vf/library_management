import { useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { API_URL } from "../../constants";
import './NewBook.css';

function NewPostForm() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    console.log("Retrieved Token:", storedToken);
    if (storedToken) {
      setToken(storedToken);
    } else {
      console.log("No token found. Redirecting to login.");
      navigate('/login');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = { title, author, description };

    try {
      console.log("Token being sent:", token);
      console.log('API URL:', API_URL);
      
      const response = await fetch(`${API_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        },
        body: JSON.stringify(postData)
      });
      // debugger

      console.log('Response status:', response.status);

      if (response.ok) {
        const { id } = await response.json();
        navigate(`/books/${id}`);
      } else {
        const errorText = await response.text();
        console.log("An error occurred:", errorText);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className="form-container">
      <h3>Create a New Book</h3>
      <form onSubmit={handleSubmit} className="title-form">
        <div className="form-group">
          <label htmlFor="titleInput">Title:</label>
          <input
            id="titleInput"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="authorInput">Author:</label>
          <input
            id="authorInput"
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="descrInput">Description:</label>
          <textarea
            id="descrInput"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <button type="submit" className="submit-button">Create Title</button>
        </div>

        <Link to="/">Cancel</Link>
      </form>
    </div>
  );
}

export default NewPostForm;

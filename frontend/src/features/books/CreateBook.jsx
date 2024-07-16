import { useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_URL } from "../../constants";
import './NewBook.css';

function CreateBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = { title, author, description };

    try {
      const response = await fetch(`${API_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        },
        body: JSON.stringify(postData)
      });
      if (response.ok) {
        const { id } = await response.json();
        navigate(`/books/${id}`);
      }
    } catch (error) {
      toast.error(`Login error: ${error.message || error}`);
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
          <button type="submit" className="submit-button">Create Book</button>
        </div>
        <Link to="/">Cancel</Link>
      </form>
      <ToastContainer/>
      <Link to="/">Back to Books List</Link>
    </div>
  );
}

export default CreateBook;

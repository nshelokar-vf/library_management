import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { API_URL } from "../../constants";

function NewPostForm() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = { title,author, description };

    try {
      const response = await fetch(`${API_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(postData)
      });

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
    <div>
      <h5>Create a New Title</h5>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="titleInput">Title:</label>
          <input
            id="titleInput"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="authorInput">Author:</label>
          <textarea
            id="authorInput"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="descrInput">Description:</label>
          <textarea
            id="descrInput"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <button type="submit">Create Title</button>
        </div>
      </form>
    </div>
  );
}

export default NewPostForm;

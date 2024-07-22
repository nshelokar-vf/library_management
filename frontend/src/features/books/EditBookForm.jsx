import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { API_URL } from '../../constants';

function EditBookForm() {
  const [book, setBook] = useState(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const { id } = useParams();
  const [, setLoading] = useState(true);
  const [, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCurrentBook = async () => {
      try {
        const response = await fetch(`${API_URL}/${id}`);
        if (response.ok) {
          const json = await response.json();
          setBook(json);
          setTitle(json.title);
          setAuthor(json.author);
          setDescription(json.description);
        } else {
            throw response;
        }
        } catch (e) {
            console.log("an error occurred");
        } finally {
            setLoading(false);
        }
        }
        fetchCurrentBook();
    }, [id]);

  const handleSubmit = async (e) => {
      e.preventDefault();
      const updatedBook = {
          ...book,
          title,
          author,
          description
      };
      try {
        const response = await fetch(`${API_URL}/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(updatedBook)
          });
          if (response.ok) {
            const json = await response.json();
            console.log("Success: ", json);
            navigate(`/books/${id}`);
          } else {
              throw response;
          }
        } catch (e) {
          console.log("an error occurred", e);
        }
    }

    if (!book) return <h3>Loading...</h3>

    return (
      <div>
        <h3>Edit your book here</h3>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor='book-title'>Title</label>
              <br/>
              <input
              type='text'
              id='book-title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              ></input>
              </div>
              <div>
                <label htmlFor='book-author'>Author</label>
                <br/>
                <input
                type='text'
                id='book-author'
                value={author}
                onChange={(e) => setAuthor(e.target.value)}>
                </input>
              </div>
              <div>
                <label htmlFor='book-description'>Description</label>
                <br/>
                <input
                type='text'
                id='book-description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}>
                </input>
                </div>
                <div>
                    <button type='submit'>Save</button>
                </div>
          </form>
      </div>
    )
}

export default EditBookForm

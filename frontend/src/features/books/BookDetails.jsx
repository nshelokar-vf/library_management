import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { API_URL } from '../../constants';

function BookDetails() {
  const [title, setTitle] = useState(null);
  const [author, setAuthor] = useState(null);
  const [description, setDescription] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchCurrentBook = async () => {
      try {
        const response = await fetch(`${API_URL}/${id}`);
        console.log('Response status:', response.status);
        if (response.ok) {
          const json = await response.json();
          console.log('Response JSON:', json);
          setTitle(json.title);       
          setAuthor(json.author);
          setDescription(json.description);       
        } else {
          const errorText = await response.text();
          throw new Error(`Error ${response.status}: ${errorText}`);
        }
      } catch (e) {
        console.log("An error occurred", e);
      }
    }
    fetchCurrentBook();
  }, [id]);

  if (!title) return <h3>Loading...</h3>

  return (
    <div>
      <h3>{title}</h3>
      <p>Author: {author}</p>
      <p>Description: {description}</p>
      <Link to="/">Back to Books List</Link>
    </div>
  )
}

export default BookDetails

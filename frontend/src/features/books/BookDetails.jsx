import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_URL } from '../../constants';

function BookDetails() {
  const [title, setTitle] = useState(null);
  const [author, setAuthor] = useState(null);
  const [description, setDescription] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchCurrentBook = async () => {
      const token = localStorage.getItem('token'); 
      if (!token) {
        throw new Error('Authentication token not found');
      }

      try {
        const response = await fetch(`${API_URL}/${id}`,{
          headers: {
            'Authorization':token,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        })
        console.log('Response status:', response.status);
        if (response.ok) {
          const json = await response.json()
          console.log('Response JSON:', json);
          setTitle(json.title)       
          setAuthor(json.author)
          setDescription(json.description)       
        } else {
          const errorText = await response.text();
          throw new Error(`Error ${response.status}: ${errorText}`);
        }
      } catch (e) {
        toast.error(`Login error: ${e.message || e}`);
      }
    }
    fetchCurrentBook()
  }, [id])

  return (
    <div>
      <h3>{title}</h3>
      <p>Author: {author}</p>
      <p>Description: {description}</p>
      <Link to="/">Back to Books List</Link>
      <ToastContainer />
    </div>
  )
}

export default BookDetails

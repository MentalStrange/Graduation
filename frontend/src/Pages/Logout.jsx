import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear the user token from local storage
    localStorage.removeItem('userToken');

    // Redirect to the login page or home page
    navigate('/auth');
  }, [navigate]);

  return null;
}

export default Logout;
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';

const Header = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe(); 
  }, []);

  const handleLogout = () => {
    signOut(auth)
        .then(() => {
            console.log("User signed out successfully");
            
            auth.onAuthStateChanged((user) => {
                if (user) {
                    console.log("User is signed in");
                } else {
                    console.log("User is signed out");
                }
            });
            navigate('/login'); 
        })
        .catch((error) => {
            console.error("Error signing out:", error);
        });
};

  return (
    <nav className='nav bg-dark border-bottom border-bottom-dark p-2' data-base-theme="dark">
      <div className='container d-flex justify-content-between'>
        <h3 style={{ color: 'white' }}>Task Management</h3>
        {user ? (
          <button className='btn btn-outline-danger' onClick={handleLogout}>Logout</button>
        ) : (
          <Link to='/login'>
            <button className='btn btn-outline-success' type='button'>Login</button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Header;

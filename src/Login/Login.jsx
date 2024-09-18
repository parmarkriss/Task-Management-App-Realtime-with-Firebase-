import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth"; 
import { auth } from '../../firebase';

const Login = () => {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const email = e.target.elements.email.value;
        const password = e.target.elements.password.value;
            
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user);
                alert("Successfully Logged in");
                e.target.reset(); 
                    
               
                auth.onAuthStateChanged((user) => {
                    if (user) {
                        console.log("User is signed in");
                        
                        navigate('/');
                    } else {
                        console.log("User is signed out");
                    }
                });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error('Error:', errorCode, errorMessage);
            });
    }
    return (
        <div className='d-flex align-items-center justify-content-center' style={{ height: '600px' }}>
            <form onSubmit={handleSubmit}> 
            <h3 className='text-center'>User Login</h3>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" name="email" className="form-control" id="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" name="password" className="form-control" id="password" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button> 
                <div className='mt-1'>
                    <Link to={'/register'}>New user? Register</Link> 
                </div>
            </form>
        </div>
    );
}

export default Login;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../../firebase';
import { db } from '../../firebase';
import { ref, set } from 'firebase/database';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!name || !email || !password) {
            setError('Please fill all fields');
            return;
        }
            
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user);
                alert("User created successfully!");
                
                // Save user data in Firebase Realtime Database
                const userId = user.uid;
                const userData = {
                    id: userId,
                    name: name,
                    email: email,
                };
                set(ref(db, 'users/' + userId), userData)
                    .then(() => {
                        console.log("User data saved in Firebase Realtime Database");
                    })
                    .catch((error) => {
                        console.error("Error saving user data:", error);
                    });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error('Error:', errorCode, errorMessage);
            });
    }

    return (
        <div>
            <div className='d-flex align-items-center justify-content-center' style={{ height: '600px' }}>
                <form onSubmit={handleSubmit}>
                <h3 className='text-center'>User Register</h3>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" name="name" className="form-control" id="name" aria-describedby="nameHelp" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" name="email" className="form-control" id="email" aria-describedby="emailHelp" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" name="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    {error && <div className="alert alert-danger" role="alert">{error}</div>}
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <div className='mt-1'>
                        <Link to={'/login'}>Existing user? Login</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;
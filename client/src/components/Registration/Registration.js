import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { registration } from '../../actions/user';
import { useDispatch} from 'react-redux';
import { regUser} from '../../reducers/userReducer';
import './registration.css';

function Registration() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const clearInput = () => {
    setEmail('');
    setUsername('');
    setPassword('');
  }

  const dispatch = useDispatch();

  return (
	<section className="vh-100 registaration">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card shadow-2-strong" style={{borderRadius: '1rem'}}>
                <div className="card-body p-5 text-center">
                    <form 
                      onSubmit={
                        (e) => {e.preventDefault(); 
                          registration(username, email, password);
                          dispatch(regUser()); 
                          clearInput()}}
                    >
                        <h3 className="mb-5">Sign up please</h3>
                        <div className="form-outline mb-4">
                            <input 
                                placeholder='Username'
                                type="text"  
                                className="form-control form-control-lg" 
                                value={username}
                                onChange={(e)=> setUsername(e.target.value)} 
                            /> 
                        </div>
                        <div className="form-outline mb-4">
                            <input
                                placeholder='Email' 
                                required
                                type="email" 
                                id="typeEmailX-2" 
                                className="form-control form-control-lg input"
                                value={email}
                                onChange={(e)=> setEmail(e.target.value)}  
                            />
                        </div>
                        <div className="form-outline mb-4">
                            <input 
                                placeholder='Password' 
                                type="password" 
                                id="typePasswordX-2" 
                                className="form-control form-control-lg" 
                                value={password}
                                onChange={(e)=> setPassword(e.target.value)}
                            />
                        </div>
                        <button 
                            className="btn btn-primary btn-lg btn-block" 
                            type="submit"
                        >
                            Sign up
                        </button>
                        <hr className="my-4" />
                        <Link to="/login">
                            <button className="btn btn-danger btn-sm btn-block" type="submit">Back to sign in</button>
                        </Link>
                    </form>
                </div>
                </div>
            </div>
          </div>
        </div>
      </section>
    );
}

export default Registration;
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { login } from '../../actions/user';
import { useDispatch } from 'react-redux';
import './authorisation.css';

function Authorisation() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const clearInput = () => {
    setEmail('');
    setPassword('');
  }

  return (
	<section className="vh-100 login">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card shadow-2-strong" style={{borderRadius: '1rem'}}>
                <div className="card-body p-5 text-center">
                  <h3 className="mb-5">Sign in</h3>
                  <div className="form-outline mb-4">
                    <input 
                      required
                      type="email" 
                      id="typeEmailX-2" 
                      className="form-control form-control-lg"
                      value={email}
                      onChange={(e)=> setEmail(e.target.value)} 
                    />
                    <label className="form-label" htmlFor="typeEmailX-2">Email</label>
                  </div>
                  <div className="form-outline mb-4">
                    <input 
                      required
                      type="password" 
                      id="typePasswordX-2" 
                      className="form-control form-control-lg"
                      value={password}
                      onChange={(e)=> setPassword(e.target.value)} 
                    />
                    <label className="form-label" htmlFor="typePasswordX-2">Password</label>
                  </div>
                  <button 
                    className="btn btn-primary btn-lg btn-block" 
                    type="submit"
                    onClick={() => {dispatch(login(email, password)); clearInput()}}
                  >
                      Login
                  </button>
                  <hr className="my-4" />
					<p>Not a member? <Link className='link' to="/registration">Register</Link></p>
                </div>
              </div>
            </div>
          </div>
        </div>
    </section>
  );
}

export default Authorisation;
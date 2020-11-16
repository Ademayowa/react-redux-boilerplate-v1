import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { setAlert } from '../actions/alert';
import { login } from '../actions/auth';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === '' || password === '') {
      setAlert('Fill the required fields', 'danger');
    } else {
      login(email, password);
    }
  };

  // Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <div className='container mt-4'>
      <div className='row'>
        <div className='col-md-6 mx-auto'>
          <form
            className='text-center border border-light p-5'
            onSubmit={(e) => handleSubmit(e)}
          >
            <p className='h4 mb-4'>Login</p>
            <input
              className='form-control form-control-lg mb-4'
              placeholder='Email Address'
              type='email'
              name='email'
              value={email}
              onChange={(e) => onChange(e)}
            />
            <input
              className='form-control form-control-lg mb-4'
              placeholder='Password'
              type='password'
              name='password'
              value={password}
              onChange={(e) => onChange(e)}
            />
            <button className='btn btn-info btn-block my-4' type='submit'>
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);

// Bring in React, useState, connect, Link, Navigate,
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Navigate } from 'react-router-dom'; //Link for routes, Navigate for redirecting to different page
import { setAlert } from '../../actions/alert'; //setAlert for notification
import { register } from '../../actions/auth'; //action to post formdata to the backend
import PropTypes from 'prop-types';

// isAuthenticated from the state, from the reducer. It is in the state so it found everywhere
const Register = ({ setAlert, register, isAuthenticated }) => {
  // Initialise the local state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  // Destructure formData retrived from the screen to the local state
  const { name, email, password, password2 } = formData;

  // Update local state with the formData when you move from one inputbox to another
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit calls the action to send form data to backend, and supply the action with the form data from the screen.
  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      register({ name, email, password });
    }
  };

  // When user is authenticated, the user is redirected to the dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <section
      className="container"
      style={{
        textAlign: 'center',
      }}
    >
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user" /> Create Your Account
      </p>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={onChange}
          />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            onChange={onChange}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </section>
  );
};
// React.js type checking to avoid mistakes
Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

// A small porting of state is retrieved to check if user is authenticated or not.
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

// connect binds state and functions to the component
export default connect(mapStateToProps, { setAlert, register })(Register);

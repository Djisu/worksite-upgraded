import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// import { Navigate } from 'react-router-dom'
// import Profiles from '../../components/profiles/Profiles'
import PropTypes from 'prop-types';
import { getProfileByStatus } from '../../actions/profile';

function SearchText() {
  const navigate = useNavigate();
  //   require('react-dom')
  //   window.React2 = require('react')
  //   console.log(window.React1 === window.React2)

  const [inputText, setInputText] = useState('');

  //   const statusItem = JSON.parse(localStorage.getItem('status'))
  //
  //   console.log('statusItem==', statusItem)
  //
  //   if (statusItem) {
  //     //redirect to profiles to display the selected profiles
  //     return <Navigate to="../../components/profiles/Profiles" />
  //   }
  //   if (isAuthenticated) {
  //     return <Navigate to="/Profiles" />
  //   }

  var lowerCase;
  let inputHandler = (e) => {
    //convert input text to lower case
    lowerCase = e.target.value; //.toLowerCase()
    setInputText(lowerCase);

    console.log('lowerCase', lowerCase);
  };

  const dispatch = useDispatch();

  let onSubmit = (e) => {
    e.preventDefault();
    console.log('in onSubmit', inputText);

    dispatch(getProfileByStatus(inputText));
  };

  useEffect(() => {
    const statusItem = JSON.parse(localStorage.getItem('status'));

    console.log('statusItem==', statusItem);

    if (statusItem) {
      //redirect to profiles to display the selected profiles
      navigate('/Profiles');
    }
  }, []);

  return (
    <div id="container" style={{ whiteSpace: 'nowrap' }}>
      <form className="form" onSubmit={onSubmit}>
        <div style={{ display: 'inline' }}>
          <input
            style={{ height: '60px' }}
            type="search"
            className="form-control"
            placeholder="Search for profession"
            onChange={inputHandler}
          ></input>
          <button
            style={{ height: '60px' }}
            className="primary small"
            type="submit"
          >
            <i className="fa fa-search"></i>
          </button>
        </div>
      </form>
    </div>
  );
}

SearchText.propTypes = {
  getProfileByStatus: PropTypes.func,
};

export default SearchText;

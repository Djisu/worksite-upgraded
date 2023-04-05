import React, { useState, useEffect } from 'react';
import { Link, useMatch, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';
import { storage } from '../../firebase';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

/*
  NOTE: declare initialState outside of component
  so that it doesn't trigger a useEffect,
  we can then safely use this to construct our profileData
 */
const initialState = {
  company: '',
  website: '',
  location: '',
  status: '',
  skills: '',
  bio: '',
  images: '',
  // transDate: '',
  // endDate: '',
  telno: '',
  name: '',
  avatar: '',
};

const ProfileForm = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
}) => {
  const [formData, setFormData] = useState(initialState);
  const creatingProfile = useMatch('/create-profile');
  // const [displaySocialInputs, toggleSocialInputs] = useState(false)
  const [documents, setDocuments] = useState([]);

  const [endDate, setEndDate] = useState(new Date());
  const [transDate, setTransDate] = useState(new Date());

  const navigate = useNavigate();

  const state = {
    button: 1,
  };

  // Image codes
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  useEffect(() => {
    // if there is no profile, attempt to fetch one
    if (!profile) getCurrentProfile();

    // if we finished loading and we do have a profile
    // then build our profileData
    if (!loading && profile) {
      const profileData = { ...initialState };
      for (const key in profile) {
        if (key in profileData) profileData[key] = profile[key];
      }
      // for (const key in profile.social) {
      //   if (key in profileData) profileData[key] = profile.social[key]
      // }
      // the skills may be an array from our API response
      if (Array.isArray(profileData.skills))
        profileData.skills = profileData.skills.join(', ');
      // set local state with the profileData
      setFormData(profileData);
    }
  }, [loading, getCurrentProfile, profile]);

  const {
    company,
    status,
    skills,
    bio,
    // images,
    // transDate,
    // endDate,
    location,
    telno,
    //name,
    //avatar,
  } = formData;

  formData.endDate = endDate;
  formData.transDate = transDate;

  formData.images = documents;

  const onChange = (e) => {
    formData.transDate = new Date();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    const editing = profile ? true : false;

    e.preventDefault();

    // Loading image with progress bar
    if (state.button === 1) {
      console.log('instate.button === 1 uploadImage');

      const uploadTask = storage.ref(`images/${image.name}`).put(image);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => {
          console.log(error);
        },
        () => {
          storage
            .ref('images')
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              setUrl(url);
            });
        }
      );

      setFormData({ ...formData, images: documents });
      // formData.images = documents
      console.log('After waiting', documents);
    }

    // Adding image to list
    if (state.button === 3) {
      console.log('in state.button === 3');

      if (
        documents.includes(document.querySelector('img').src) !==
        'http://via.placeholder.com/40X40'
      ) {
        setDocuments((documents) => [
          ...documents,
          document.querySelector('img').src,
        ]);
        console.log('documents====', documents);
      } else {
        console.warn('document already selected. select another document');
      }
    }

    // Adding form data to the database
    if (state.button === 2) {
      console.log('in state.button === 2 ', formData);

      createProfile(formData, editing).then(() => {
        if (!editing) navigate('/dashboard');
      });
    }
  };

  return (
    <section className="container">
      <h1 className="large text-primary">
        {creatingProfile ? 'Create Your Profile' : 'Edit Your Profile'}
      </h1>
      <p className="lead">
        <i className="fas fa-user" />
        {creatingProfile
          ? ` Let's get some information to make your`
          : ' Add some changes to your profile'}
      </p>

      <small>* = required field</small>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <select name="status" value={status} onChange={onChange}>
            <option>* Select Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor">Instructor or Teacher</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-text">
            Give us an idea of where you are at in your career
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Company"
            name="company"
            value={company}
            onChange={onChange}
          />
          <small className="form-text">
            Could be your own company or one you work for
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Mobile Phone Number"
            name="telno"
            value={telno}
            onChange={onChange}
          />
          <small className="form-text">Your Mobile Phone Number</small>
        </div>

        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={location}
            onChange={onChange}
          />
          <small className="form-text">
            City & suburb suggested (eg. Kaneshie, Accra)
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Skills"
            name="skills"
            value={skills}
            onChange={onChange}
          />
          <small className="form-text">
            Please use comma separated values (eg. Painting, Plumbing,Carpentry)
          </small>
        </div>
        <div className="form-group">
          <textarea
            placeholder="A short bio of yourself"
            name="bio"
            value={bio}
            onChange={onChange}
          />
          <small className="form-text">Tell us a little about yourself</small>
        </div>
        <div>
          <label>
            When will Service End?
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
            />
          </label>
          <label>
            Select today's date
            <DatePicker
              selected={transDate}
              onChange={(date) => setTransDate(date)}
            />
          </label>
        </div>

        <div>
          <div>
            <progress value={progress} max="100" />
            <br />
            <input
              type="file"
              placeholder="Select and drag image url here."
              onChange={handleChange}
              // value={images}
            />

            {/* <input
              type="file"
              placeholder="Select and drag image url here."
              onChange={handleChange}
            /> */}

            <button
              className="primary my-1"
              type="submit"
              onClick={() => (state.button = 1)}
            >
              Upload Your Photo
            </button>
            <br />
            {url}
            <br />
            <button
              className="primary my-1"
              type="submit"
              onClick={() => (state.button = 3)}
            >
              Add Image to Image List
            </button>
            <br />
            <br />
            <img
              className="small"
              src={url || 'http://via.placeholder.com/20'}
              alt="firebase-images"
            />
            <br />
            {/* Copy image link and paste it in upload work documents */}
          </div>
        </div>

        {/* <input type="submit" className="primary my-1" /> */}
        <div>
          <Link to="/dashboard" className="primary m-3">
            Go Back
          </Link>
          <br />
          <button
            className="primary my-1"
            type="submit"
            onClick={() => (state.button = 2)}
          >
            Edit Profile
          </button>
        </div>
        <div>
          <h4>Documents List:</h4>
          {documents.map((document) => (
            <p key={document}>{document}</p>
          ))}
        </div>
      </form>
    </section>
  );
};

ProfileForm.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  ProfileForm
);

import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProfileItem = ({
  profile: {
    user: { _id, name, avatar },
    status,
    company,
    location,
    skills,
    images,
    telno,
  },
}) => {
  return (
    <div className="profile bg-light">
      {avatar && <img src={avatar} alt="" className="round-img" />}
      {!avatar && <img src={images[0]} alt="" className="round-img" />}
      <div>
        <h2>{name}</h2>
        <p>{telno}</p>
        <p>{status}</p>
        <p>{company && <span> at {company}</span>}</p>
        <p className="my-1">{location && <span>{location}</span>}</p>
        <Link to={`/profile/${_id}`} className="btn btn-primary">
          View Profile
        </Link>
      </div>
      <ul>
        {skills.slice(0, 4).map((skill, index) => (
          <li key={index} className="text-primary">
            <i className="fas fa-check" /> {skill}
          </li>
        ))}
      </ul>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileItem;

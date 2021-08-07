import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { useHistory } from 'react-router-dom'
import Rating from './Rating'

export default function Service(props) {
  const { service } = props

  const userSignin = useSelector((state) => state.userSignin)
  const { userInfo } = userSignin

  const [readMore, setReadMore] = useState(false)

  const history = useHistory()

  const handleClick = (e) => {
    e.preventDefault()

    //console.log('in  service.js handleClick')

    console.log('service._id==', service._id, service.name)

    if (!userInfo) {
      history.push('/signin')
    } else {
      console.log('service =', service)
      history.push('/contract', service)
    }
  }

  const handleReviewCreate = (e) => {
    e.preventDefault()

    console.log('about to /rateService service===========', service)

    history.push({ pathname: '/rateService', state: service })
  }

  //console.log('history=', history)  //'/rateService', service

  //console.log('userInfo', userInfo)
  /*  const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/' */

  return (
    <div>
      {!userInfo && (
        <div>
          <h4 style={{ color: 'red' }}>KIndly sign in to continue</h4>
          <Link to="/signin">Sign In</Link>
        </div>
      )}
      <div key={service._id} className="card">
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <img className="medium" src={service.image} alt={service.name} />
        </div>

        <div className="card-body">
          <h2>{service.name}</h2>
          {service.description}
          <p>
            {readMore
              ? service.description
              : `${service.description.substring(0, 20)}...`}
            <button onClick={() => setReadMore(!readMore)}>
              {readMore ? 'show less' : 'read more'}
            </button>
          </p>
          Owner's Email: {service.email}
          <Rating
            rating={service.rating}
            numReviews={service.numReviews}
          ></Rating>
          <div className="price">${service.unitPrice}</div>
          <button className="primary block" onClick={handleClick}>
            Request for Service
          </button>
          <button className="primary block" onClick={handleReviewCreate}>
            Rate this Service
          </button>
        </div>
      </div>
    </div>
  )
}
//() => history.push('/contract'){handleClick}

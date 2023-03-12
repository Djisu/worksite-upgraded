
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { createReview, detailsService } from '../actions/serviceActions'
import Rating from '../components/Rating'
import MessageBox from '../components/MessageBox'
//import LoadingBox from '../components/LoadingBox'
import { SERVICE_REVIEW_CREATE_RESET } from '../constants/serviceConstants'

function RateServiceScreen(props) {
  const dispatch = useDispatch()
  const location = useLocation()
  const serviceId = location.state._id
  const service = location.state
  console.log('service=', service)

  const userSignin = useSelector((state) => state.userSignin)
  const { userInfo } = userSignin

  const serviceReviewCreate = useSelector((state) => state.serviceReviewCreate)
  const {
   /*  loading: loadingReviewCreate,
    error: errorReviewCreate, */
    success: successReviewCreate,
  } = serviceReviewCreate

   console.log('serviceReviewCreate=====', serviceReviewCreate)

  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  useEffect(() => {
    dispatch(detailsService(userInfo.email))
  }, [dispatch, userInfo.email])

  useEffect(() => {
    if (successReviewCreate) {
      window.alert('Review Submitted Successfully')
      setRating('')
      setComment('')
      dispatch({ type: SERVICE_REVIEW_CREATE_RESET })
    }
  }, [dispatch, successReviewCreate])

  const submitHandler = (e) => {
    e.preventDefault()

    if (comment && rating) {
      dispatch(
        createReview(serviceId, { rating, comment, name: userInfo.name }),
      )
    } else {
      alert('Please enter comment and rating')
    }
  }

  return (
    <div>
      <div>
         <Link to="/">Back to results</Link>
        <h2 id="reviews">Reviews</h2>
        <ul>
          {service.reviews.map((review) => (
            <li key={review._id}>
              <strong>{review.name}</strong>
              <Rating rating={review.rating} caption=""></Rating>
              <p>{review.createdAt.substring(0, 10)}</p>
              <p>{review.comment}</p>
            </li>
          ))}
          <li>
            {userInfo ? (
              <form className="form" onSubmit={submitHandler}>
                <div>
                  <h2>Write a customer review</h2>
                </div>
                <div>
                  <label htmlFor="rating">Rating</label>
                  <select
                    id="rating"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                  >
                    <option value="">Select...</option>
                    <option value="1">1- Poor</option>
                    <option value="2">2- Fair</option>
                    <option value="3">3- Good</option>
                    <option value="4">4- Very Good</option>
                    <option value="5">5- Excellent</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="comment">Comment</label>
                  <textarea
                    id="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  ></textarea>
                </div>
                <div>
                  <div>
                    <labe />
                    <button className="primary" type="submit">
                      Submit
                    </button>
                  </div>
                </div>
                <div>
                </div>
              </form>
            ) : (
              <MessageBox>
                Please <Link to="/signin">Sign In</Link> to write a review
              </MessageBox>
            )}
          </li>
        </ul>
      </div>
    </div>
  )
}

export default RateServiceScreen

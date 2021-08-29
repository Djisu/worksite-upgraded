import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addToServicefees } from '../actions/servicefeesActions'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'

function ServicefeesScreen(props) {
  const [serviceFees, setServiceFees] = useState(0)

  const userSignin = useSelector((state) => state.userSignin)
  const { userInfo, loading, error } = userSignin

  const dispatch = useDispatch()

  const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/'

  const submitHandler = (e) => {
    e.preventDefault()

    console.log('in submitHandler', serviceFees)

    dispatch(addToServicefees(serviceFees))
    props.history.push('/')
  }

  useEffect(() => {
    if (!userInfo) {
      props.history.push(redirect)
    }
  }, [props.history, redirect, userInfo])

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Enter Service Fees Per One Day</h1>
        </div>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            <div>
              <label htmlFor="servicefees">Service Fees</label>
              <input
                type="number"
                id="servicefees"
                placeholder="Enter service fees"
                requires
                onChange={(e) => setServiceFees(e.target.value)}
              ></input>
            </div>
            <div>
              <label />
              <button className="primary" type="submit">
                Add Service Fees
              </button>
            </div>
            <div>
              <label />
              {/*   <div>
                New customer?{' '}
                <Link to={`/register?redirect=${redirect}`}>
                  Create your account
                </Link>
              </div> */}
            </div>
          </>
        )}
      </form>
    </div>
  )
}

export default ServicefeesScreen

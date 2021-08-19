import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { register } from '../actions/userActions.js'
import LoadingBox from '../components/LoadingBox.js'
import MessageBox from '../components/MessageBox.js'
import countryList from '../countryList'

function RegisterScreen(props) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [address, setAddress] = useState('')
  const [telno, setTelno] = useState('')
  const [employmentStatus, setEmploymentStatus] = useState('')
  const [country, setCountry] = useState('')

  const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/'

  const userRegister = useSelector((state) => state.userRegister)
  const { userInfo, loading, error } = userRegister

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()

    if (!name) {
      alert('Enter your name')
    } else if (!email) {
      alert('Enter email address')
    } else if (!telno) {
      alert('Enter your mobile number')
    } else if (employmentStatus === 'select') {
      alert('Select employment option: either employer or employee')
    }

    if (password !== confirmPassword) {
      alert('Password and confirm password are not match')
    } else {
      dispatch(
        register(
          name,
          email,
          password,
          address,
          telno,
          employmentStatus,
          country,
        ),
      )
    }
  }

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect)
    }
  }, [props.history, redirect, userInfo])

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Create Account</h1>
        </div>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Enter name"
            requires
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            requires
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            requires
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>

        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Enter confirm password"
            requires
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></input>
        </div>

        <div>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            placeholder="Enter Post Office Address"
            requires
            onChange={(e) => setAddress(e.target.value)}
          ></input>
        </div>

        <div>
          <label htmlFor="telno">Mobile Number</label>
          <input
            type="text"
            id="telno"
            placeholder="Enter mobile number"
            requires
            onChange={(e) => setTelno(e.target.value)}
          ></input>
        </div>

        <div>
          <label htmlFor="employmentStatus">Employer or Employee</label>

          <select
            className="browser-default custom-select"
            value={employmentStatus}
            onChange={(e) => setEmploymentStatus(e.target.value)}
          >
            <option value="select">Select an Option</option>
            <option value="Employer">
              Employer-I want to hire someone's service
            </option>
            <option value="Employee">
              Employee-I want to advertise my services
            </option>
          </select>
        </div>

        <div>
          <label htmlFor="country">Select your country</label>

          <select
            onChange={(e) => setCountry(e.target.value)}
            className="browser-default custom-select"
          >
            {countryList.map((item) => (
              <option key={item.index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label />
          <button className="primary" type="submit">
            Register
          </button>
        </div>
        <div>
          <label />
          <div>
            Already have an account?{' '}
            <Link to={`/signin?redirect=${redirect}`}>Sign-In</Link>
          </div>
        </div>
      </form>
    </div>
  )
}

export default RegisterScreen

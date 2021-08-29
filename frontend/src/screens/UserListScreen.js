import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { listUsers } from '../actions/userActions'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { signout } from '../actions/userActions'
import { Link } from 'react-router-dom'

function UserListScreen(props) {
  const dispatch = useDispatch()

  //const history = useHistory()

  console.log('in UserListScreen(props) ')

  const userSignin = useSelector((state) => state.userSignin)
  const { userInfo } = userSignin || ''

  const userList = useSelector((state) => state.userList)
  const { loading, error, users } = userList || ''

  console.log('users=========', users)

  useEffect(() => {
    if (!userInfo.email) {
      dispatch(signout())
    }
  }, [dispatch, userInfo.email])

  useEffect(() => {
    console.log('userInfo.email==', userInfo.email)

    if (!userInfo.email) {
      return
    }
    dispatch(listUsers())
  }, [dispatch, userInfo.email])

  return (
    <div>
      <Link to="/">Back to results</Link>
      <br />
      <br />
      List of Services for {userInfo.email}
      {!userInfo.email && <h3>Kindly re-sign in</h3>}
      {!users && <h3>No users found</h3>}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">This is error: {error}</MessageBox>
      ) : (
        users && (
          <div className="row center">
            {users.map((item) => (
              <div key={item._id} className="card">
                <div className="card-body">
                  <br />
                  <br />
                  <span style={{ color: 'blue', fontWeight: 'bold' }}>
                    {item.name}
                  </span>
                  <br />
                  <br />
                  <span>{item.email}</span>
                  <br />
                  <br />
                  <span>{item.address}</span>
                  <br />
                  <br />
                  <span>{item.telno}</span>
                  <br />
                  <span>{item.employmentStatus}</span>
                  <br />
                </div>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  )
}

export default UserListScreen

import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { detailsService } from '../actions/serviceActions'

import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { deleteService } from '../actions/serviceActions'
import { signout } from '../actions/userActions'

function ServiceListScreen(props) {
  const dispatch = useDispatch()

  const history = useHistory()

  console.log('in ServiceListScreen(props) ')

  const userSignin = useSelector((state) => state.userSignin)
  const { userInfo } = userSignin || ''

  const serviceDetails = useSelector((state) => state.serviceDetails)
  const { loading, error, service } = serviceDetails || ''

  console.log('service=========', service)

  const removeFromServiceHandler = (id) => {
    //delete action
    console.log('in  removeFromServiceHandler = (id)', id)
    dispatch(deleteService(id))
    dispatch(detailsService(userInfo.email))
  }

  const editServiceHandler = (id, name, description, unitPrice, image) => {
    console.log(
      'in  editServiceHandler = (id)',
      id,
      name,
      description,
      unitPrice,
      image,
    )

    const newService = { id, name, description, unitPrice, image }
    history.push({ pathname: '/editService', state: newService })
  }

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
    dispatch(detailsService(userInfo.email))
  }, [dispatch, userInfo.email])

  return (
    <div>
      <div className="row">List of Services for {userInfo.email}</div>

      {!userInfo.email && <h3>Kindly re-sign in</h3>}
      {!service && <h3>No services here!!</h3>}

      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">This is error: {error}</MessageBox>
      ) : (
        service && (
          <table className="table">
            <thead>
              <tr>
                <th>IMAGE</th>
                <th>NAME</th>
                <th>DESCRIPTION</th>
                <th>EMAIL</th>
                <th>UNIT PRICE</th>
                <th>EXPIRE DATE</th>
                <th>ACTIVITY</th>
              </tr>
            </thead>
            <tbody>
              {service.map((item) => (
                <tr key={item._id}>
                  <td style={{ textAlign: 'center', padding: '2rem' }}>
                    <img className="small" src={item.image} alt={item.name} />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>{item.email}</td>
                  <td>{item.unitPrice}</td>
                  <td>{item.expireDate}</td>
                  <td>
                    <button
                      className="small delete"
                      onClick={() => removeFromServiceHandler(item._id)}
                    >
                      Delete
                    </button>
                    <button
                      className="small "
                      onClick={() =>
                        editServiceHandler(
                          item._id,
                          item.name,
                          item.description,
                          item.unitPrice,
                          item.image,
                        )
                      }
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )
      )}
    </div>
  )
}

export default ServiceListScreen

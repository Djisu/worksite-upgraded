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
      List of Services for {userInfo.email}
      {!userInfo.email && <h3>Kindly re-sign in</h3>}
      {!service && <h3>No services here!!</h3>}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">This is error: {error}</MessageBox>
      ) : (
        service && (
          <div className="row center">
            {service.map((item) => (
              <div key={item._id} className="card">
                <div style={{ textAlign: 'center', padding: '2rem' }}>
                  <img className="medium" src={item.image} alt={item.name} />
                </div>

                <div className="card-body">
                  <br />
                  <br />
                  <span>{item.name}</span>
                  <br />
                  <br />
                  <span>{item.description}</span>
                  <br />
                  <br />
                  <span>{item.email}</span>
                  <br />
                  <br />
                  <span>{item.unitPrice}</span>
                  <br />
                  <span>{item.expireDate}</span>
                  <br />
                  <div>
                    <button
                      className="primary block delete"
                      onClick={() => removeFromServiceHandler(item._id)}
                    >
                      Delete
                    </button>
                    <br />
                    <br />
                    <button
                      className="primary block"
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
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  )
}

export default ServiceListScreen

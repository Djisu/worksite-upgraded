import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
//import { Link } from 'react-router-dom'
import { detailsService } from '../actions/serviceActions'
//import ServiceList from '../components/ServiceList'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { deleteService, editService } from '../actions/serviceActions'
import { signout } from '../actions/userActions'

function ServiceListScreen(props) {
  const dispatch = useDispatch()

  const userSignin = useSelector((state) => state.userSignin)
  const { userInfo } = userSignin || ''

  // console.log('userInfo:', userInfo)

  const serviceDetails = useSelector((state) => state.serviceDetails)

  //console.log('serviceDetails========================', serviceDetails)

  const { loading, error, service } = serviceDetails || ''

  // console.log('loading, error==', loading, error)  //Object.keys(service)
  //console.log('services:XXXXXX', service)

  const removeFromServiceHandler = (id) => {
    //delete action
    console.log('in  removeFromServiceHandler = (id)', id)
    dispatch(deleteService(id))

    dispatch(detailsService(userInfo.email))
  }

  const editServiceHandler = (id) => {
    //delete action
    console.log('in  editServiceHandler = (id)', id)
    dispatch(editService(id))

    dispatch(detailsService(userInfo.email))
  }

  useEffect(() => {
    if (!userInfo.email) {
      dispatch(signout())
    }
  }, [dispatch, userInfo.email])

  useEffect(() => {
    console.log('in dispatch(detailsService(userInfo.email))')

    if (!userInfo.email) {
      //console.log('No email found')
      return
    }
    dispatch(detailsService(userInfo.email))
  }, [dispatch, userInfo.email])

  return (
    <div>
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
                {/*   <img
                  style={{
                    textAlign: 'center',
                    padding: '2rem',
                    width: '100%',
                    height: '50%',
                  }}
                  className="medium"
                  src={item.image}
                  alt={item.name}
                /> */}
                <div className="card-body">
                  {/* <span>{category}</span> */}
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
                  <br />
                  <div>
                    <button
                      className="primary block"
                      onClick={() => removeFromServiceHandler(item._id)}
                    >
                      Delete
                    </button>
                    <br />
                    <br />
                    <button
                      className="primary block"
                      onClick={() => editServiceHandler(item._id)}
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

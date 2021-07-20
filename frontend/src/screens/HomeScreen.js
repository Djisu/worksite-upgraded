import React, { useEffect } from 'react'

import Service from '../components/Service'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { useDispatch, useSelector } from 'react-redux'
import { listServices } from '../actions/serviceActions'

export default function HomeScreen() {
  const dispatch = useDispatch()
  const serviceList = useSelector((state) => state.serviceList)

  if (!serviceList) {
    console.log('No services found')
  }
  const { loading, error, services } = serviceList

  useEffect(() => {
    dispatch(listServices())
  }, [dispatch])
  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">This is error: {error}</MessageBox>
      ) : (
        <div className="row center">
          {services.map((service) => (
            <Service key={service._id} service={service}></Service>
          ))}
        </div>
      )}
    </div>
  )
}

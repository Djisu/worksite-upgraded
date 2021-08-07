import Axios from 'axios'
//import { bindActionCreators } from '../../node_modules/redux/index'
import {
  SERVICE_DETAILS_REQUEST,
  SERVICE_DETAILS_SUCCESS,
  SERVICE_DETAILS_FAIL,
  SERVICE_LIST_FAIL,
  SERVICE_LIST_REQUEST,
  SERVICE_LIST_SUCCESS,
  SERVICE_ENTRY_REQUEST,
  SERVICE_ENTRY_FAIL,
  SERVICE_ENTRY_SUCCESS,
  SERVICE_DELETE_REQUEST,
  SERVICE_DELETE_SUCCESS,
  SERVICE_DELETE_FAIL,
  SERVICE_REVIEW_CREATE_REQUEST,
  SERVICE_REVIEW_CREATE_SUCCESS,
  SERVICE_REVIEW_CREATE_FAIL,
  SERVICE_UPDATE_REQUEST,
  SERVICE_UPDATE_SUCCESS,
  SERVICE_UPDATE_FAIL,
  SERVICE_ADD_SUCCESS,
  SERVICE_GET_REQUEST,
  SERVICE_GET_SUCCESS,
  SERVICE_GET_FAIL,
} from '../constants/serviceConstants'

export const enterServiceDetails = (service) => async (dispatch, getState) => {
  dispatch({ type: SERVICE_ENTRY_REQUEST, payload: service })

  try {
    const {
      userSignin: { userInfo },
    } = getState()
    const { data } = await Axios.post('/api/services', service, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    })
    dispatch({ type: SERVICE_ENTRY_SUCCESS, payload: data.service })
  } catch (error) {
    dispatch({
      type: SERVICE_ENTRY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listServices = () => async (dispatch) => {
  //console.log('in listServices')
  dispatch({
    type: SERVICE_LIST_REQUEST,
  })
  try {
    //console.log('in serviceActions before')
    const { data } = await Axios.get('/api/services')

    //console.log('in serviceActions after====data.length' + data.length)  //

    if (!data) {
      console.log('no service 000000000')
    }
    dispatch({
      type: SERVICE_LIST_SUCCESS,
      payload: data,
    })
    localStorage.setItem('serviceItems', JSON.stringify(data.service))
  } catch (error) {
    dispatch({
      type: SERVICE_LIST_FAIL,
      payload: error.message,
    })
  }
}
export const addToService = (
  category,
  email,
  name,
  image,
  unitPrice,
  rating,
  numReviews,
  description,
  telno,
  delay,
  transDate,
  expireDate,
  serviceFees,
) => async (dispatch, getState) => {
  console.log('in addToService')

  dispatch({ type: SERVICE_ENTRY_REQUEST })

  try {
    const {
      userSignin: { userInfo },
    } = getState()

    const { data } = await Axios.post(
      '/api/services',
      {
        category,
        email,
        name,
        image,
        unitPrice,
        rating,
        numReviews,
        description,
        telno,
        delay,
        transDate,
        expireDate,
        serviceFees,
      },
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      },
    )
    dispatch({ type: SERVICE_ENTRY_SUCCESS, payload: data }) // data.service
    dispatch({ type: SERVICE_ADD_SUCCESS, payload: data })

    localStorage.setItem('serviceItems', JSON.stringify(data)) // data.service
  } catch (error) {
    dispatch({
      type: SERVICE_ENTRY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const detailsService = (serviceEmail) => async (dispatch) => {
  dispatch({ type: SERVICE_DETAILS_REQUEST, payload: serviceEmail })
  try {
    // console.log('in detailsService serviceEmail==', serviceEmail)

    const { data } = await Axios.get(`/api/services/${serviceEmail}`)

    // console.log('serviceEmail==' + serviceEmail)
    // console.log('detailsService data=====', data)

    dispatch({
      type: SERVICE_DETAILS_SUCCESS,
      payload: data,
    })
    localStorage.setItem('serviceItems', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: SERVICE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteService = (id) => async (dispatch, getState) => {
  console.log('in deleteService' + id)

  dispatch({ type: SERVICE_DELETE_REQUEST, payload: id })

  try {
    const { data } = await Axios.delete(`/api/services/${id}`)

    dispatch({ type: SERVICE_DELETE_SUCCESS, payload: data })
    localStorage.removeItem('serviceItems', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: SERVICE_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getService = (id) => async (dispatch, getState) => {
  console.log('in getService ' + id)

  dispatch({
    type: SERVICE_GET_REQUEST,
  })

  console.log(
    '  after dispatch({ type: SERVICE_LIST_REQUEST, payload: id }) ' + id,
  )

  try {
    const { data } = await Axios.get(`/api/services/${id}`)

    console.log('data=', data)

    dispatch({ type: SERVICE_GET_SUCCESS, payload: data })
    localStorage.setItem('serviceItems', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: SERVICE_GET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createReview = (serviceId, review) => async (
  dispatch,
  getState,
) => {
  console.log('in createReview')

  dispatch({ type: SERVICE_REVIEW_CREATE_REQUEST })

  try {
    const {
      userSignin: { userInfo },
    } = getState()

    const { data } = await Axios.post(
      `/api/services/${serviceId}/reviews`,
      review,
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      },
    )
    dispatch({ type: SERVICE_REVIEW_CREATE_SUCCESS, payload: data.review })
    localStorage.setItem('serviceReviewCreate', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: SERVICE_REVIEW_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateService = (service) => async (dispatch, getState) => {
  console.log('in updateService service===', service)

  dispatch({ type: SERVICE_UPDATE_REQUEST, payload: service })
  const {
    userSignin: { userInfo },
  } = getState()

  console.log('userInfo.token=', userInfo.token)

  try {
    const { data } = await Axios.put(`/api/services/${service._id}`, service, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    })

    dispatch({ type: SERVICE_UPDATE_SUCCESS, payload: data })

    console.log(
      'After  dispatch({ type: SERVICE_UPDATE_SUCCESS, payload: data })',
      data,
    )

    localStorage.setItem('serviceItems', JSON.stringify(service))
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message

    dispatch({ type: SERVICE_UPDATE_FAIL, payload: message })
  }
}
